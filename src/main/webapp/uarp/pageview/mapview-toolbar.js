var draw; // global so we can remove it later
//draw-vector
var drawsource = null;
var drawvector = null;

//buffer-vector
var buffersource = null;
var buffervector = null;

var measurevector;
var measureSource;
var measureResult;

//拉框查询
var dragBoxSelect = null;
var dragBoxSearch = null;

var toolstatus = '';

var measureLineDraw = null;
var measureAreaDraw = null;

var measureStyle = new ol.style.Style({// 绘制几何图形的样式
	fill : new ol.style.Fill({
		color : 'rgba(255, 255, 255, 0.2)'
	}),
	stroke : new ol.style.Stroke({
		color : 'rgba(0, 0, 0, 0.5)',
		lineDash : [ 10, 10 ],
		width : 2
	}),
	text : new ol.style.Text({
		font : '12px 微软雅黑',
		fill : new ol.style.Fill({
			color : '#fff'
		})
	})
});


function addMeasureSourceVector(){
	measureSource = new ol.source.Vector({
		projection:map.getView().getProjection()
	});
	// 地图绘制vector 测距，测面
	measurevector = new ol.layer.Vector({
		name : '测绘图层',
		source : measureSource,
		style : measureStyle
	});
	map.addLayer(measurevector);
}


function zoomToExtent() {
	var _extent = mapOption.extent;
//	var _projection = ol.proj.get(_projection);
//	var globe = new ol.control.ZoomToExtent();
//	map.addControl(globe);
	map.getView().fit(new ol.geom.Polygon.fromExtent(_extent),map.getSize());
}

var fullScreen = function() {
	var elem = document.body;
	if (elem.webkitRequestFullScreen) {
		elem.webkitRequestFullScreen()
	} else {
		if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen()
		} else {
			if (elem.msRequestFullscreen) {
				elem.msRequestFullscreen()
			} else {
				if (elem.requestFullScreen) {
					elem.requestFullscreen()
				} else {
					alert("浏览器不支持全屏")
				}
			}
		}
	}
};

var move = function(){
	$("#map").css('cursor','-webkit-grabbing');
}

var zoomin = function(){
	var zoom = map.getView().getZoom();
	zoom += 1;
	//$("#map").css('cursor','-webkit-zoom-in');
	map.getView().setZoom(zoom);
	
	map.interaction
}

var zoomout = function(){
	//$("#map").css('cursor','-webkit-zoom-out');
	var zoom = map.getView().getZoom();
	if(zoom-- >= 0){
		map.getView().setZoom(zoom);
	}
}

function measureLine(){
	$("#map").css('cursor','pointer');
	if(measureSource == null && measurevector == null){
		addMeasureSourceVector();
	}
	measureLineDraw = new ol.interaction.Draw({
		type : 'LineString',
		source : measurevector.getSource(),
		style : measureStyle
	});
	
	map.addInteraction(measureLineDraw);
	
	var _unit = map.getView().getProjection().getUnits();

	measureLineDraw.on('drawstart', function(evt) {
		//如果平移地图结束
		if(evt.dragging){
			return;
		}
		
		$("#measureResult").remove(); // 计算结果---empty()会存在多个
		measureSource.clear(); // 绘制结果
		sketch = evt.feature;
		var geom = evt.feature.getGeometry(); // 得到绘制Geometry
		// 添加计算结果Div
		$("#map").append('<div id="measureResult"></div>');
		measureResult = new ol.Overlay({
			position : geom.getCoordinates()[0],
			positioning : 'bottom-center',
			element : document.getElementById('measureResult')
		});
		map.addOverlay(measureResult);
		geom.on('change', function(e) {
			if (_unit == "m") {
				var length = geom.getLength();
			}else if(_unit == "degrees"){
				//经纬度坐标构建椭球体，根据经纬度求球面距离
				var length = 0;
				var wgs84Sphere = new ol.Sphere(6378137);
				var coordinates = geom.getCoordinates();
				for (var i = 0; i < coordinates.length-1; i++) {
					var p1 = coordinates[i];
					var p2 = coordinates[i+1];
					length += wgs84Sphere.haversineDistance(p1,p2);
				};
			}else{
				/**
					其它坐标待扩展测试
				**/				
				var length = geom.getLength();			
			}
			// 填充计算结果
			if (length > 1000) {
				$("#measureResult").html((length / 1000).toFixed(2) + "千米");
			} else if (1 < length) {
				$("#measureResult").html(length.toFixed(2) + "米");
			} else if (0 < length) {
				$("#measureResult").html(length.toFixed(2) * 1000 + "毫米");
			}
			measureResult.setPosition(geom.getLastCoordinate());
		});
	}, this);
	
	measureLineDraw.on('drawend', function(evt) {
		
	});
}

function measureArea(){
	$("#map").css('cursor','pointer');
	if(measureSource == null && measurevector == null){
		addMeasureSourceVector();
	}
	
	measureAreaDraw = new ol.interaction.Draw({
		type : 'Polygon',
		source : measurevector.getSource(),
		style : measureStyle
	});

	map.addInteraction(measureAreaDraw);
	
	measureAreaDraw.on('drawstart', function(evt) {
		//如果平移地图结束
		if(evt.dragging){
			return;
		}
		
		$("#measureResult").remove();
		measureSource.clear();
		sketch = evt.feature;
		var geom = evt.feature.getGeometry(); // 得到绘制Geometry
		var _unit = map.getView().getProjection().getUnits();
		// 添加计算结果Div
		$("#map").append('<div id="measureResult"></div>');
		measureResult = new ol.Overlay({
			offset : [ 0, -15 ],
			positioning : 'bottom-center',
			element : document.getElementById('measureResult')
		});
		map.addOverlay(measureResult);
		geom.on('change',
				function(e) {
					// 面
					if (_unit == "m") {
						var area = geom.getArea();
					}else if(_unit == "degrees"){
						//经纬度坐标构建椭球体，根据经纬度求球面面积
						var wgs84Sphere = new ol.Sphere(6378137);						
						var coordinates = geom.getLinearRing(0).getCoordinates();
						var area = wgs84Sphere.geodesicArea(coordinates);					
					}else{
						/**
							其它坐标待扩展测试
						**/
						var area = geom.getArea();					
					}
					if (area<10000) {
						$("#measureResult").html(area.toFixed(2) + "平方米");
					}else if(area<1000000){
						$("#measureResult").html((area/10000).toFixed(2) + "公顷");
					}else{
						$("#measureResult").html((area/1000000).toFixed(2) + "平方公里");
					}
					measureResult.setPosition(geom.getInteriorPoint()
							.getCoordinates());
				});
	}, this);
}


function mapClear(){
	$("#map").css('cursor','pointer');
	// 隐藏距离面积测算div
	$("#measureResult").remove();
	
	if(measurevector){
		//map.addLayer(measurevector);
	}
	
	if(globalHeightVector){
		map.removeLayer(globalHeightVector);
	}
	// 测算绘制图形清除
	if(measureSource){
		measureSource.clear();
	}
	if(buffersource){
		buffersource.clear();
	}
	if(drawsource){
		drawsource.clear();
	}
	
	// 移除OverLayers
	if(measureResult){
		map.removeOverlay(measureResult);
	}
	
	// 
	if(dragBoxSelect){
		map.removeInteraction(dragBoxSelect);
	}
	if(dragBoxSearch){
		map.removeInteraction(dragBoxSearch);
	}
	
	if(measureLineDraw){
		map.removeInteraction(measureLineDraw);
	}
	
	if(measureAreaDraw){
		map.removeInteraction(measureAreaDraw);
	}
	
	if(draw){
		map.removeInteraction(draw);
	}
}

function boxSearch(options){
	$("#map").css('cursor','crosshair');
	//dragBoxSelect = new ol.interaction.Select();
   // map.addInteraction(dragBoxSelect);

   // var selectedFeatures = dragBoxSelect.getFeatures();

    dragBoxSearch = new ol.interaction.DragBox({
		//Ctrl + Drag
		//condition: ol.events.condition.platformModifierKeyOnly
	});

	map.addInteraction(dragBoxSearch);

	dragBoxSearch.on('boxend', function(e) {
		// features that intersect the box are added to the collection of
		// selected features, and their names are displayed in the "info"
		// div
		var info = [];
		//var extent = dragBox.getGeometry().getExtent();
		
		var geom = dragBoxSearch.getGeometry();
		var wktFormat = new ol.format.WKT();
		var extentwkt = wktFormat.writeGeometry(geom);
				
		if(options && options.callback){
			options.callback(e, geom, extentwkt);
		}else{
			try{
				addGeometry(geom);
				
				boxSearchEnd(extentwkt);
			
			}catch(e){
				console.log('boxSearchEnd not defined;');
			}
		}
	});

	// clear selection when drawing a new box and when clicking on the map
	dragBoxSearch.on('boxstart', function() {
		if(drawsource){
			drawsource.clear();
		}
		//selectedFeatures.clear();
	});
}

/**
 * 绘制面缓存，检索
 * @returns
 */
function polygonSearch(){
	$("#map").css('cursor','pointer');
	if(drawsource == null && drawvector == null){
    	addDrawSourceVector();
    }
	
	draw = new ol.interaction.Draw({
		source: drawsource,
		type: 'Polygon'
	});
	map.addInteraction(draw);
	
	draw.on('drawstart',function(evt){
		if(drawsource){
			drawsource.clear();
		}
		if(drawvector){
			//map.removeLayer(drawvector);
		}
	});
	
	draw.on('drawend',function(evt){
		//调用业务自定义方法，传递缓存范围
		var feature = evt.feature;
		var geom = feature.getGeometry();

		var wktFormat = new ol.format.WKT();
		var polygonwkt = wktFormat.writeGeometry(geom);
		
   		map.removeInteraction(draw);
		
		try{
   			if(typeof(polygonSearchEnd) == 'function'){
   				polygonSearchEnd(polygonwkt);
   			}
   		}catch(e){
   			console.log('polygonsearchEnd not defined;');
   		}
	});
}

function pointSearch(){
     map.on('singleclick',function(e){
    	var pixel = map.getEventPixel(e.originalEvent);
    	var coordinate = map.getCoordinateFromPixel(pixel);
    	
    	var geom = new ol.geom.Point(coordinate);
 		
 		var wktFormat = new ol.format.WKT();
 		var pointwkt = wktFormat.writeGeometry(geom);
 		
    	try{
   			if(typeof(pointSearchEnd) == 'function'){
   				pointSearchEnd(pointwkt);
   			}
   		}catch(e){
   			console.log('pointSearchEnd not defined;');
   		}
  });
}

function exportMap(){
	 map.once('postcompose', function(event) {
		 var canvas = event.context.canvas;
		/**
		跨域图层无法导出问题待解决
		**/
     	canvas.toBlob(function(blob) {
    	 saveAs(blob, 'map.png');
     	});
	 });
	 map.renderSync();
}

function addDrawSourceVector(){
	drawsource = new ol.source.Vector();
	drawvector = new ol.layer.Vector({
        source: drawsource,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#f90000',
                width: 2
            }),	
			image: new ol.style.Icon(({
				anchor: [0.5, 1],
				scale: 0.8,
				src:  cxt+"/uarp/pageview/image/marker.png"
			})),
        })
    });

    map.addLayer(drawvector);
}

function addBufferSourceVector(){
	buffersource = new ol.source.Vector();
	buffervector = new ol.layer.Vector({
        source: buffersource,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            })
        })
    });
    map.addLayer(buffervector);
}

function initBufferDistanceControl(){
	var top = $(".ol-control.ol-bar").css("top");
	var left = $(".ol-control.ol-bar").css("left");
	if(!left){
		left = $("#maptoolbar_bootstrap").css("left");
	}
	var bufferinput = '<div id="distancecontrol" class="input-group input-group-sm" style="width:200px;position:absolute;top:45px;left:'+left+'">';
	bufferinput += '<span class="input-group-addon">单位：米</span>';
	bufferinput += '<input type="number" class="form-control" id="bufferdistance" placeholder="缓冲半径" value="1000" onblur="checkNum()">';
	bufferinput += '<span class="input-group-addon"><i class="fa fa-close" onclick="closeBufferDistanceControl()"></i></span>';
	bufferinput += '</div>';
	
	$("#map").append(bufferinput);
}

function initLayerSelectControl(dataset){
	var top = $(".ol-control.ol-bar").css("top");
	var left = $(".ol-control.ol-bar").css("left");
	if(!left){
		left = $("#maptoolbar_bootstrap").css("left");
	}
	var bufferinput = '<div id="layerselectcontrol" class="list-group" style="width:345px;position:absolute;top:80px;left:'+left+';max-height: 247px;overflow-y: auto;">';
	bufferinput += '</div>';
	$("#map").append(bufferinput);
	$.ajax({
		type:"post",
		url: cxt + "/datainterface/getdata/list/"+dataset,
		contentType: "application/json",
		async:false,
		dataType:"JSON",
		success:function(data){
			var dataArr = data.data;
			var closeBtn = '<i class="btn btn-primary btn-sm" title="关闭" onclick="closeLayerSelectControl(this)"><span class="fa fa-angle-double-up" aria-hidden="true"></span></i>';
			$("#layerselectcontrol").append(closeBtn);
			for(var i=0;i<dataArr.length;i++){
				var atag = '<a href="#" onclick="addBufferVectorByID(\''+dataArr[i].ID+'\')" class="list-group-item">'+dataArr[i].NAME+'</a>';
				$("#layerselectcontrol").append(atag);
			}
		}
	});
}

function addBufferVectorByID(id){
	var wkt = null;
	$.ajax({
		type:"post",
		url: cxt + "/datainterface/getdata/list/getRiverWktByID",
		contentType: "application/json",
		async:false,
		dataType:"JSON",
		data : JSON.stringify({
			id : id
		}),
		success:function(data){
			var dataArr = data.data;
			wkt = dataArr[0].WKT;
		}
	});
	
	if(buffersource == null && buffervector == null){
    	addBufferSourceVector();
    }else{
		buffersource.clear();
    }
	var bufferdistance = $('#bufferdistance').val();
	if(bufferdistance){
		//根据geometry生产缓存geometry
		var bufferwkt = createBuffer(wkt,bufferdistance);
		
		if(bufferwkt){
			var features = new Array();
			var wktFormat = new ol.format.WKT();
			var layerFeature = wktFormat.readFeature(wkt);
			var bufferFeature = wktFormat.readFeature(bufferwkt);
			bufferFeature.set("VECTORTYPE","BUFFERTOOL",true);
			features.push(layerFeature);
			features.push(bufferFeature);
			
			buffersource.addFeatures(features);
		}
		try{
			if(typeof(selectBufferEnd) == 'function'){
				//返回执行回调方法
				var extent = bufferFeature.getGeometry().getExtent();
				moveIn(null, null, extent,function(){
					setTimeout(function(){
						selectBufferEnd(bufferwkt);
					},1100);
				});
			}
		}catch(e){
			console.log('selectBufferEnd not defined;');
		}
	}else{
		alert("请输入缓冲半径！");
	}
}

function closeBufferDistanceControl(){
	var distanceinput = $('#distancecontrol');
	distanceinput.remove();
}

function closeLayerSelectControl(opt){
	var layerSelectList = $('#layerselectcontrol');
	layerSelectList.remove();
	$(opt).remove();
}

function createBuffer(wkt,distance){
	var _unit = map.getView().getProjection().getUnits();
	//如果为经纬度坐标，将坐标转化为米制构建缓冲多边形
	if (_unit == "m") {
		wkt = wkt;
	}else if(_unit == "degrees"){
		var wktFormat = new ol.format.WKT();
		var geom =wktFormat.readFeature(wkt);
		geom.getGeometry().transform(map.getView().getProjection(),ol.proj.get("EPSG:3857"));
		wkt = wktFormat.writeGeometry(geom.getGeometry());
	}else{
		wkt = wkt;
	}

	var bufferwkt = null;
	$.ajax({
		type: "POST",
		dataType: "json",
		contentType: "application/json",
		url: cxt + '/atservices/geometry',
		async: false,
		data:{
			SERVICE : 'buffer',
			geometry : wkt,
			distance : distance
		},
		success: function(data) {
			if(data.success){
				bufferwkt =  data.features[0].geometry;
			}
		},
		error:function(){
			alert('getBuffer error!');
		}
	});
	if (_unit == "m") {
		bufferwkt = bufferwkt;
	}else if(_unit == "degrees"){
		//将米制多边形转换为地理坐标系
		var wktFormat = new ol.format.WKT();
		var geom =wktFormat.readFeature(bufferwkt);
		geom.getGeometry().transform(ol.proj.get("EPSG:3857"),map.getView().getProjection());
		bufferwkt = wktFormat.writeGeometry(geom.getGeometry());
	}else{
		bufferwkt = bufferwkt;
	}	
	return bufferwkt;
}

/**
 * 绘制点缓存，检索
 * @returns
 */
function pointbuffer(){
    if(buffersource == null && buffervector == null){
    	addBufferSourceVector();
    }
    //如果不存在，追加input框
    var distanceinput = $('#distancecontrol');
    if(distanceinput.length == 0){
    	initBufferDistanceControl();
    }
    var bufferdistance = $('#bufferdistance').val();
	if(bufferdistance){
		
		draw = new ol.interaction.Draw({
			source: buffersource,
			type: 'Point'
		});
		map.addInteraction(draw);
		
		draw.on('drawstart',function(evt){
			if(buffersource){
				buffersource.clear();
			}
		});
		
		draw.on('drawend',function(evt){
			//调用业务自定义方法，传递缓存范围
			var feature = evt.feature;
			var geom = feature.getGeometry();

			var wktFormat = new ol.format.WKT();
			var geomwkt = wktFormat.writeGeometry(geom);
			
			//获取缓存范围（圆），并绘制
			var bufferwkt = createBuffer(geomwkt,bufferdistance);
			if(bufferwkt){
				var features = new Array();
				var bufferFeature = wktFormat.readFeature(bufferwkt);
				bufferFeature.set("VECTORTYPE","BUFFERTOOL",true);
				features.push(bufferFeature);
				
				buffersource.addFeatures(features);
			}
	   		
	   		map.removeInteraction(draw);
	   		try{
	   			if(typeof(pointbufferEnd) == 'function'){
	   				pointbufferEnd(bufferwkt);
	   			}
	   		}catch(e){
	   			console.log('pointSearchEnd not defined;');
	   		}
		});
	}else{
		alert('请输入缓存半径');
	}
}


/**
 * 绘制线缓存，检索
 * @returns
 */
function linebuffer(){
	if(buffersource == null && buffervector == null){
    	addBufferSourceVector();
    }
	//如果不存在，追加input框
    var distanceinput = $('#distancecontrol');
    if(distanceinput.length == 0){
    	initBufferDistanceControl();
    }
    var bufferdistance = $('#bufferdistance').val();
	if(bufferdistance){
		
		draw = new ol.interaction.Draw({
			source: buffersource,
			type: 'LineString'
		});
		map.addInteraction(draw);
		
		draw.on('drawstart',function(evt){
			if(buffersource){
				buffersource.clear();
			}
		});
		
		draw.on('drawend',function(evt){
			//调用业务自定义方法，传递缓存范围
			var feature = evt.feature;
			var geom = feature.getGeometry();

			var wktFormat = new ol.format.WKT();
			var geomwkt = wktFormat.writeGeometry(geom);
			
			//获取缓存范围（圆），并绘制
			var bufferwkt = createBuffer(geomwkt,bufferdistance);
			if(bufferwkt){
				var features = new Array();
				var bufferFeature = wktFormat.readFeature(bufferwkt);
				bufferFeature.set("VECTORTYPE","BUFFERTOOL",true);
				features.push(bufferFeature);
				
				buffersource.addFeatures(features);
			}
	   		
	   		map.removeInteraction(draw);
			
			try{
	   			if(typeof(linebufferEnd) == 'function'){
	   				linebufferEnd(bufferwkt);
	   			}
	   		}catch(e){
	   			console.log('pointSearchEnd not defined;');
	   		}
		});
	}else{
		alert('请输入缓存半径');
	}
}

/**
 * 绘制面缓存，检索
 * @returns
 */
function polygonbuffer(){
	if(buffersource == null && buffervector == null){
    	addBufferSourceVector();
    }
	//如果不存在，追加input框
    var distanceinput = $('#distancecontrol');
    if(distanceinput.length == 0){
    	initBufferDistanceControl();
    }
    var bufferdistance = $('#bufferdistance').val();
	if(bufferdistance){

		draw = new ol.interaction.Draw({
			source: buffersource,
			type: 'Polygon'
		});
		map.addInteraction(draw);
		
		draw.on('drawstart',function(evt){
			if(buffersource){
				buffersource.clear();
			}
		});
		
		draw.on('drawend',function(evt){
			//调用业务自定义方法，传递缓存范围
			var feature = evt.feature;
			var geom = feature.getGeometry();

			var wktFormat = new ol.format.WKT();
			var geomwkt = wktFormat.writeGeometry(geom);
			
			//获取缓存范围（圆），并绘制
			var bufferwkt = createBuffer(geomwkt,bufferdistance);
			if(bufferwkt){
				var features = new Array();
				var bufferFeature = wktFormat.readFeature(bufferwkt);
				bufferFeature.set("VECTORTYPE","BUFFERTOOL",true);
				features.push(bufferFeature);
				
				buffersource.addFeatures(features);
			}
	   		
	   		map.removeInteraction(draw);
			
			try{
	   			if(typeof(polygonbufferEnd) == 'function'){
	   				polygonbufferEnd(bufferwkt);
	   			}
	   		}catch(e){
	   			console.log('pointSearchEnd not defined;');
	   		}
		});
	}else{
		alert('请输入缓存半径');
	}
}

/**
 * 选择要素缓存，检索
 * @returns
 */
function selectbuffer(dataset){
	//如果不存在，追加input框
    var distanceinput = $('#distancecontrol');
    if(distanceinput.length == 0){
    	initBufferDistanceControl();
    }
    //根据dataset查询数据列表
    var layerSelectList = $('#layerselectcontrol');
    if(layerSelectList.length == 0){
    	initLayerSelectControl(dataset);
    }
}

/**
 * 绘制点，返回空间对象
 * @returns
 */
function drawpoint(callback){
	if(drawsource == null && drawvector == null){
    	addDrawSourceVector();
    }
    
    draw = new ol.interaction.Draw({
        source: drawsource,
        type: 'Point',
        style :new ol.style.Style({
        	fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#f90000',
                width: 2
            }),	
			image: new ol.style.Icon(({
				anchor: [0,1],
				scale: 1,
				src:  cxt+"/uarp/pageview/image/pin.png"
			}))
		})
    });
    map.addInteraction(draw);
    
    draw.on('drawstart',function(evt){
    	if(drawsource){
    		drawsource.clear();
		}
    });
    
    draw.on('drawend',function(evt){
    	//调用业务自定义方法，传递缓存范围
    	if(callback && typeof callback == 'function') callback(getDrawGeometry(evt));
    	else setParentGeometry(getDrawGeometry(evt))
    });
}

/**
 * 绘制线，返回空间对象
 * @returns
 */
function drawline(callback){
	if(drawsource == null && drawvector == null){
    	addDrawSourceVector();
    }
    
    draw = new ol.interaction.Draw({
        source: drawsource,
        type: 'LineString',
        style :new ol.style.Style({
        	fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#f90000',
                width: 2
            }),	
			image: new ol.style.Icon(({
				anchor: [0,1],
				scale: 1,
				src:  cxt+"/images/pin.png"
			}))
		})
    });
    map.addInteraction(draw);
    
    draw.on('drawstart',function(evt){
    	if(drawsource){
    		drawsource.clear();
		}
    });
    
    draw.on('drawend',function(evt){
    	//调用业务自定义方法，传递缓存范围
    	if(callback && typeof callback == 'function') callback(getDrawGeometry(evt));
    	else setParentGeometry(getDrawGeometry(evt))
    });
}

/**
 * 绘制面，返回空间对象
 * @returns
 */
function drawpolygon(callback){
	if(drawsource == null && drawvector == null){
    	addDrawSourceVector();
    }
    
    draw = new ol.interaction.Draw({
        source: drawsource,
        type: 'Polygon',
        style :new ol.style.Style({
        	fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#f90000',
                width: 2
            }),	
			image: new ol.style.Icon(({
				anchor: [0,1],
				scale: 1,
				src:  cxt+"/images/pin.png"
			}))
		})
    });
    map.addInteraction(draw);
    
    draw.on('drawstart',function(evt){
    	if(drawsource){
    		drawsource.clear();
		}
    });
    
    draw.on('drawend',function(evt){
    	//调用业务自定义方法，传递缓存范围
    	if(callback && typeof callback == 'function') callback(getDrawGeometry(evt));
    	else setParentGeometry(getDrawGeometry(evt))
    });
}
//获取绘制的geometry
function getDrawGeometry(evt){
	var feature = evt.feature;
	var geom = feature.getGeometry();

	var wktFormat = new ol.format.WKT();
	var geomwkt = wktFormat.writeGeometry(geom);
	
	return geomwkt;
}


//将geometry写入父页面的指定位置
function setParentGeometry(geomwkt){
	$("#"+params.dom_id, window.parent.document).val(geomwkt);
}
//将父页面的geometry加入地图
function addParentGeometry(id){
	var geomwkt = $("#"+id, window.parent.document).val();
	if(geomwkt){
		addGeometry(geomwkt);
	}else{
		if(drawsource){
    		drawsource.clear();
		}
	}
}

function addGeometry(geometry){
	if(typeof geometry == 'string'){
		geometry = new ol.format.WKT().readGeometry(geometry);
	}
	var feture = new ol.Feature({
		geometry: geometry,
	});
	if(drawsource == null && drawvector == null){
    	addDrawSourceVector();
    }
	drawsource.addFeature(feture);
	
	//moveIn(null,null,geometry.getExtent())
	map.getView().fit(geometry.getExtent(), map.getSize())
}
//检验缓冲半径的正确性
function checkNum(){
	var patrn = /^\d+(\.\d+)?$/;
	var bufferdistance = $('#bufferdistance').val();
	if((!patrn.test(bufferdistance))&&bufferdistance!=""){
		parent.layer.msg("缓冲半径只能为正数或零，请输入正确的数字！", {
			icon: 3
		});
		$('#bufferdistance').val("");
		return [];
	}
}
