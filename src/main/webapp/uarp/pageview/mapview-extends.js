var clusterSelect = null;
//var listenerKey = null;
function addWMTSLayer(opt){
	
}

function addWMSLayer(opt){
	
}
/**
	增加POi图层
 * @param {Object} opt
 *举例：
	{
		source:{
			url:null,
			dataparam:null,
			data:[{
				x:454955.418,
				y:351403.298,
				title:"测试POI点1",
				params:{
					id:"test01"
					name:"测试POI点01"
				}				
				style:{
					icon:"http://XXXX"
				}
			},{
				x:456955.418,
				y:381403.298,
				title:"测试POI点2",
				param:{
					id:"test02"
					name:"测试POI点02"
				}
			}]
		},
		name:"testPOILayer",
		params:{
			interval:0,
			duration:2000,
			repeat:true,
			renderer:{
				color:"blue",
				width:5
			}
		}
	}
 */	
function getPOILayer(opt){
	var featureList = [];
	for (var i = 0; i < opt.source.data.length; i++) {
		var _data = opt.source.data[i];
		var iconFeature = new ol.Feature({
			geometry:new ol.geom.Point([_data.x,_data.y]),
			title:_data.title
		})
		for (key in _data.params) {
			iconFeature.set(key,_data.params[key],true);
		};
		var _style = _data.style;
		var iconStyle = new ol.style.Style({
			image:new ol.style.Icon({
				anchor:[0.6,46],
				anchorXUnits:"fraction",
				anchorYUnits:"fraction",
				src:_style.icon
			})
		});
		iconFeature.setStyle(iconStyle);
		featureList.push(iconFeature);
	};

	var poiSource = new ol.source.Vector({
		features:featureList
	});

	var poiLayer = new ol.layer.Vector({
		source:poiSource
	})

	return poiLayer;

	// if(features != undefined && features.length == undefined){
	// 	vectorSource.addFeature(features);
	// }else if(features != undefined && features.length >0){
	// 	for(var i=0;i<features.length;i++){
	// 		vectorSource.addFeature(features[i]);
	// 	}
	// }
	// var poiLayer = new ol.layer.Vector({
	// 	source: vectorSource,
	// 	style: new ol.style.Style({
	// 		fill: new ol.style.Fill({
 //                color: 'rgba(255, 0, 0, 0.1)'
 //            }),
 //            stroke: new ol.style.Stroke({
 //                color: '#ffcc33',
 //                width: 2
 //            }),
	// 		image: new ol.style.Icon(({
	// 			anchor: [0.5, 1],
	// 			scale: 1,
	// 			src:  cxt+"/images/marker0.png"
	// 		})),
	// 	})
	// });
	// map.addLayer(vectorLayer);
	
	// addresult = {
	// 	source: vectorSource,
	// 	layer: vectorLayer
	// };	
}

/**
 * 添加聚类图层
 * @param {Object} opt
 *举例：
 {
	url:"http://****",
	bbox:"12,13,14,15",
	name:"XXXX",
	params:{
		distance:30,
		column:"COUNT",
		color:"#1b36f5",
		radius:30
	}
}
 */
function addPieChartLayer(opt){
	//数据请求URL
	var _url = opt.url;
	if (!_url) {
		return;
	};
	
	//饼图数据集
	var _piedataset = opt.piedataset;
	if (!_piedataset) {
		return;
	};
	
	$.ajax({
		type: "POST",
		dataType: "json",
		contentType: "application/json",
		url: _url,
		async: false,
		success: function(data) {
			var data = data.data;
			//data数据类型为对象数组[{X:75,Y:36,业务字段:125},{X:73,Y:34,业务字段:177},...]
			for(var i = 0 ; i < data.length ; i ++){
				var _centerArr = new Array(parseFloat(data[i].X),parseFloat(data[i].Y));
				var _geom = new ol.geom.Point(_centerArr);				
				var _feature = new ol.Feature(_geom);
				var name = data[i].NAME;
				$("body").append('<div class="mapchart" id="chart'+i+'">'+name+'饼图渲染中...</div>');
				//var position = new ol.Coordinate(_centerArr);
				var pie = new ol.Overlay({
			        position: _feature.getGeometry().getCoordinates(),
			        //positioning: 'center-center',
			        element: document.getElementById('chart'+i)
				});
				map.addOverlay(pie);
				
				drawPieChart(i,name,_piedataset)
			}
		}
	});

}

function drawPieChart(id,name,dataset){
	var condition =  {};
	condition.id = id;
	condition.name = name;
	
	$.ajax({
		type: "POST",
		dataType: "json",
		contentType: "application/json",
		url: cxt + "/datainterface/getdata/list/" + dataset,
		data: JSON.stringify(condition),
		success: function(data) {
			var data = data.data;
			
			for(var i = 0 ; i < data.length ; i ++){
				var name = data[i].NAME;
				var value = data[i].VALUE;
			}
			var myChart = echarts.init(document.getElementById("chart"+id));
			
			var option = {
			    series : [
			        {
			            type: 'pie',
			            radius : '75%',
			            data : data,
			            label : {
			                normal :{
			                    show: false,
			                    position : 'inner'
			                }
			            }
			        }
			    ]
			};
			
			myChart.setOption(option);
		}
	});
}
/**
 * 添加聚类图层
 * @param {Object} opt
 *举例：
 {
	url:"http://****",
	bbox:"12,13,14,15",
	name:"XXXX",
	params:{
		distance:30,
		column:"COUNT",
		color:"#1b36f5",
		radius:30
	}
}
 */
function addHeatMapLayer(opt){
	
	
	//数据请求URL
	var _url = opt.url;
	if (!_url) {
		return;
	};
	
	var _params = opt.dataparams;
	
	//图层名称
	var _layerName = opt.name; 
	if (!_layerName) {
		_layerName = new Date().getTime();
	};

	//默认聚合距离
	var _blur = 20;
	//默认聚合点大小
	var _radius = 20;

	var params = opt.params;
	//读取非必填参数，更新聚合展示参数
	if (params) {
		if (params.distance) {
			_distance = opt.distance;
		};
		if (params.column) {
			_displayColumn = opt.column;
		};
		if (params.color) {
			_color = opt.color;
		};
		if (params.radius) {
			_radius = opt.radius;
		};		
	};
	var features = new Array();

	$.ajax({
		type: "POST",
		dataType: "json",
		contentType: "application/json",
		url: _url,
		data:JSON.stringify(_params),	
		async: false,
		success: function(data) {
			var data = data.data;
			//data数据类型为对象数组[{X:75,Y:36,业务字段:125},{X:73,Y:34,业务字段:177},...]
			for(var i = 0 ; i < data.length ; i ++){
				var _centerArr = null;
				if(data[i].CENTER){
					var center = data[i].CENTER.split(",");
					_centerArr = new Array(parseFloat(center[0]),parseFloat(center[1]));
				}else{
					_centerArr = new Array(parseFloat(data[i].X),parseFloat(data[i].Y));
				}
				if(_centerArr != null){
					var _geom = new ol.geom.Point(_centerArr);				
					var _feature = new ol.Feature(_geom);
					features.push(_feature);
				}
			}
		}
	});
	var _source = new ol.source.Vector({
		features:features
	});	
	
	var heatmaplayer = new ol.layer.Heatmap({
		  source: _source,
		  blur: parseInt(_blur, 10),
		  radius: parseInt(_radius, 10)
	});
	
	map.addLayer(heatmaplayer);
	layers[_layerName] = heatmaplayer;
	//四至
	var _bbox = opt.bbox;	
	if (_bbox) {
		map.getView().fit(opt.bbox.split(","), map.getdisplayNum());
	};	
}

function removeClusterLayer(){
	if(clusterVector!=null){
		map.removeLayer(clusterVector);
	}
	if(clusterSelect!=null){
		map.removeInteraction(clusterSelect);
	}
	if(hoverSelect!=null){
		map.removeInteraction(hoverSelect);
	}
}

/**
 * 添加聚类图层
 * @param {Object} opt
 *举例：
	{
		url:"http://172.172.3.71:8181/waterassets/datainterface/getdata/list/testCluster",
		data:{
			data:[
				{
					CENTER:,
					COUNT:,
					COUNTYNAME:,
					VECTORID:
				},
				{

				}
			]
		}
		bbox:null,
		name:"testCluster",
		params:{
			distance:100,
			column: {
				name: null,
				unit: ''
			},
			renderer:{
				colors:["green","blue","yellow","orange","red"],
				radius:{
					minradius:20,
					maxradius:100
				}
			}
		}
	}
 */
function addClusterLayer(opt){
	
	removeClusterLayer();
	//数据请求URL
	var _url = opt.url;
	if (!_url&&!opt.data.data) {
		return;
	};
	
	var _params = opt.dataparams;
	//图层名称
	var _layerName = opt.name; 
	if (!_layerName) {
		_layerName = new Date().getTime();
	};

	//默认聚合距离
	var _distance = 100;
	//默认聚合点展示字段
	var _displayColumn = null;
	//默认聚合点展示字段
	var _labelColumn = null;
	//默认聚合颜色
	var _colors = ['#1b36f5'];
	//默认聚合点大小
	var _radius = {
		minradius:20,
		maxradius:20		
	};
	//业务分类
	var _busitype = '';

	var params = opt.params;
	//读取非必填参数，更新聚合展示参数
	if (params) {
		if (params.distance) {
			_distance = params.distance;
		};
		if (params.busitype) {
			_busitype = params.busitype;
		};
		if (params.column) {
			if(typeof params.column == 'string'){
				_displayColumn = params.column;
			}
			if(typeof params.column == 'object'){
				_displayColumn = params.column.name;
			}
		};
		
		if (params.labelcolumn) {
			if(typeof params.labelcolumn == 'string'){
				_labelColumn = params.labelcolumn;
			}
			if(typeof params.labelcolumn == 'object'){
				_labelColumn = params.labelcolumn.name;
			}
		};
		if(params.renderer){
			if (params.renderer.colors) {
				_colors = params.renderer.colors;
			};
			if (params.renderer.radius) {
				_radius = params.renderer.radius;
			};		
		}
	};
	//展示数量总和
	var totalNum = 0;
	var features = new Array();
	var featuresConstructor = function(data){
		//data.data数据类型为对象数组[{X:75,Y:36,业务字段:125},{X:73,Y:34,业务字段:177},...]			
		for(var i = 0 ; i < data.length ; i ++){
			var _centerArr = null;
			if(data[i].CENTER){
				var center = data[i].CENTER.split(",");
				_centerArr = new Array(parseFloat(center[0]),parseFloat(center[1]));
			}else{
				_centerArr = new Array(parseFloat(data[i].X),parseFloat(data[i].Y));
			}
			if(_centerArr != null){
				var _geom = new ol.geom.Point(_centerArr);				
				var _feature = new ol.Feature(_geom);
				if (_displayColumn) {
					_feature.set(_displayColumn,data[i][_displayColumn],true);
					totalNum += data[i][_displayColumn];
				}else{
					totalNum++;
				}				
				if (_labelColumn) {
					_feature.set(_labelColumn,data[i][_labelColumn],true);
				}
				if (data[i]['MINX']&&data[i]['MINY']&&data[i]['MAXX']&&data[i]['MAXY']) {
					var maxExtent = [data[i]['MINX'],data[i]['MINY'],data[i]['MAXX'],data[i]['MAXY']];
					_feature.set('MAXEXTENT',maxExtent,true);
				};
				_feature.set('VECTORID',data[i]['VECTORID'],true);		
				_feature.set("VECTORTYPE","CLUSTERLAYER",true);
				_feature.set("BUSITYPE",_busitype,true);
				features.push(_feature);
			}
		}		
	}	
	if (opt.data.data) {
		featuresConstructor(opt.data.data);
	}else{
		$.ajax({
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			url: _url,
			data:JSON.stringify(_params),	
			async: false,
			success: function(data) {
				var data = data.data;
				//data.data数据类型为对象数组[{X:75,Y:36,业务字段:125},{X:73,Y:34,业务字段:177},...]			
				featuresConstructor(data);
			}
		});
	}

	var _source = new ol.source.Vector({
		features:features
	});	
	//构造cluster	
	var clusterSource = new ol.source.Cluster({
		distance : _distance,
		source : _source
	});	
	
	//构造vector layer
	clusterVector  = new ol.layer.Vector({
		name:_layerName,
		source : clusterSource,
		style : function(feature){
			//该feature需要展示的数字
			var displayNum = 0;
			var displayLabel = '';
			var features = feature.get('features');
			if (_displayColumn) {
				$(features).each(function(index,value){
					var labelValue = value.get(_displayColumn);
					if(labelValue){
						var intValue = parseInt(labelValue);
						if(!isNaN(intValue)){
							displayNum+= intValue;
						}
					}
				});
			}else{
				displayNum = features.length;
			}
			
			if (_labelColumn) {
				$(features).each(function(index,value){
					var labelName = value.get(_labelColumn);
					if(labelName){
						displayLabel += labelName + ',';
					}
				});
			}

			var circleLable = displayNum.toString();
			if(displayLabel.endsWith(',')){
				displayLabel = displayLabel.substring(0,displayLabel.length -1);
			}
			if(_labelColumn){
				circleLable = circleLable + '\n' + displayLabel;
			}
			//样式策略
			var style = new ol.style.Style({
				image : new ol.style.Circle({
					radius : getClusterRadius(displayNum),
					fill : new ol.style.Fill({
						color : getClusterColor(displayNum)
					})
				}),
				text : new ol.style.Text({
					font : '12px 微软雅黑',
					text :  circleLable,
					fill : new ol.style.Fill({
						color : '#fff'
					})
				})
			})
			return style;
		} 
	});	
	//动态获取聚合点半径
    var getClusterRadius = function(displayNum){
    	var radiusRange = _radius.maxradius - _radius.minradius;
    	if (radiusRange<=0) {
    		return _radius.maxradius
    	}else{
    		var displayInterval = totalNum/radiusRange;
    		var radius = Math.floor(displayNum/displayInterval)+ _radius.minradius;
    		return radius;
    	}
    }
    //动态获取聚合点颜色
    var getClusterColor = function(displayNum){
    	var colorGroupNum = _colors.length;
    	if (colorGroupNum<=1) {
    		return _colors[0];
    	}else{
    		var _interval = totalNum/colorGroupNum;
    		var colorIndex = Math.floor(displayNum/_interval);
    		return _colors[colorIndex];
    	}
    }    
	map.addLayer(clusterVector);
	
	// 地图点击交互
	clusterSelect = new ol.interaction.Select({
		condition: ol.events.condition.click,
		style : function(feature) {
			return getSelectedStyle(feature,true);
		} 
	});
	map.addInteraction(clusterSelect);
	
	var getSelectedStyle = function(feature,ifStroke){
		var displayNum = 0;
		var displayLabel = '';
		var circleLable = '';
		var features = feature.get('features');
		$(features).each(function(index,value){
			if (_displayColumn) {
				var labelValue = value.get(_displayColumn);
				if(labelValue){
					var intValue = parseInt(labelValue);
					if(!isNaN(intValue)){
						displayNum+= intValue;
					}
				}
			}else{
				displayNum = features.length;
			}
			
			if (_labelColumn) {
				var labelName = value.get(_labelColumn);
				if(labelName){
					displayLabel += labelName+",";
				}
			}

		});
		
		circleLable = displayNum.toString();
		if(displayLabel.endsWith(',')){
			displayLabel = displayLabel.substring(0,displayLabel.length -1);
		}
		if(_labelColumn){
			circleLable = circleLable + '\n' + displayLabel;
		}
		
		// 当显示聚合数量为1时，点击没有样式bug修改  日期：2017-11-30 wuhl
//		if(displayNum == 0){
//			return;
//		}
		
		if(ifStroke){
			style = new ol.style.Style({
				image : new ol.style.Circle({
					radius : getClusterRadius(displayNum)*1.2,
					stroke : new ol.style.Stroke({
						color : 'rgba(255,69,0,1)',
						width : '3'
					}),
					fill : new ol.style.Fill({
						color : 'rgba(255,69,0,0.6)'
					})
				}),
				text : new ol.style.Text({
					font : '12px 微软雅黑',
					text : circleLable,
					fill : new ol.style.Fill({
						color : '#fff'
					})
				})
			})
		}else{
			style = new ol.style.Style({
				image : new ol.style.Circle({
					radius : getClusterRadius(displayNum),
					fill : new ol.style.Fill({
						color : getClusterColor(displayNum)
					})
				}),
				text : new ol.style.Text({
					font : '12px 微软雅黑',
					text : circleLable,
					fill : new ol.style.Fill({
						color : '#fff'
					})
				})
			})
		}
		
		return style;
	} 
	
	clusterSelect.getFeatures().on([ 'add', 'remove' ],function(e) {
		if (e.type == "add"){
			try{
				var selectedFeatures = e.element.getProperties().features;
				if(typeof(featrueClick(selectedFeatures)) == 'function'){
					featrueClick(selectedFeatures);
				}
			}catch(e){
				console.log('featrueClick not defined;');
			}
		}else{
			//console.log('remove');
			try{
				if(typeof(featrueRemoveClick()) == 'function'){
					featrueRemoveClick();
				}
			}catch(e){
				console.log('featrueRemoveClick not defined;');
			}
		}
	})
	
	//addHoverSelect();
	
	layers[_layerName] = clusterVector;
	//四至
	var _bbox = opt.bbox;	
	if (_bbox) {
		map.getView().fit(opt.bbox.split(","), map.getdisplayNum());
	};	
}

//添加hover效果
var hoverSelect = null;
function addHoverSelect(){
	if(hoverSelect!=null){
		map.removeInteraction(hoverSelect);
	}
	hoverSelect = new ol.interaction.Select({
		condition: ol.events.condition.pointerMove,
		style : function(feature) {
			var vectortype = "";
			if(feature.get("features")){
				vectortype = feature.get("features")[0].get("VECTORTYPE");
			}else{
				vectortype = feature.get("VECTORTYPE");
			}
			if(vectortype=="BUFFER"){
				var style = new ol.style.Style({
					fill : new ol.style.Fill({
						color : 'rgba(255,141,0,0.5)'
					}),
					stroke : new ol.style.Stroke({
						color : '#ff884c',
						width : 3,
						lineDash : [5]
					}),
					image : new ol.style.Circle({
						radius : 7,
						fill : new ol.style.Fill({
							color : 'rgba(204,204,204,0.5)'
						})
					})
				});
				return style;
			}else if(vectortype=="CLUSTER"){
				return getSelectedStyle(feature,false);
			//mapview-button和mapview-extends不兼容，需解决
			}else if(vectortype=="CLUSTERLAYER"){
				var style = new ol.style.Style({
					fill : new ol.style.Fill({
						color : 'rgba(255,141,0,0.5)'
					}),
					stroke : new ol.style.Stroke({
						color : '#ff884c',
						width : 3,
						lineDash : [5]
					}),
					image : new ol.style.Circle({
						radius : 7,
						fill : new ol.style.Fill({
							color : 'rgba(204,204,204,0.5)'
						})
					})
				});
				return style;
			}else if(vectortype=="BUFFERTOOL"){
				var style = new ol.style.Style({
		            fill: new ol.style.Fill({
		                color: 'rgba(255, 0, 0, 0.2)'
		            }),
		            stroke: new ol.style.Stroke({
		                color: '#ffcc33',
		                width: 2
		            })
		        });
				return style;
			}else{
				//测绘图层样式
				return measureStyle;
			}
		} 
	});
	map.addInteraction(hoverSelect);
	hoverSelect.getFeatures().on([ 'add', 'remove' ],function(e) {
		var id = e.element.getProperties().ID;
		var zicmc = e.element.getProperties().ZICMC;
		var vectortype = e.element.getProperties().VECTORTYPE;
		if (e.type == "add"){
			$("#map")[0].style.cursor="pointer";
			if(vectortype=="POI"){
				$("#map")[0].title = zicmc;
				$("#map")[0].style.cursor = "pointer";
				$("#"+id).addClass("li_active1");
			}else if (vectortype == "flash") {
				var _title = e.element.getProperties().title;
				$("#map")[0].title = _title;
				$("#map")[0].style.cursor = "pointer";
			};
		}else{
			$("#assets_list").find("li").removeClass("li_active1");
			$("#assets_list1").find("li").removeClass("li_active1");
			$("#map")[0].style.cursor = "default";
			$("#map")[0].title = "";
		}
	})
}
/**
	增加迁徙图层
 * @param {Object} opt
 *举例：
	{
		source:{
			url:null,
			dataparam:null,
			data:[{
				start:"454955.418,351403.298",
				end:"536235.581,295629.020"
			},{
				start:"444266.230,290019.842",
				end:"548088.938,368865.833"
			}]
		},
		name:"testFlight",
		params:{
			interval:0,
			duration:2000,
			repeat:true,
			renderer:{
				color:"blue",
				width:5
			}
		}
	}
 */	
function getFlightLayer(opt){
	/**
		数据源初始化，source中data与url属性至少指定一项，两者同时存在时，优先读取data属性
	**/
	//获取数据url
	var _source = opt.source;
	var _url = _source.url;
	//url请求参数
	var _dataparams = _source.dataparams;
	//js传递数据对象，优先级>url动态获取data
	var _data = _source.data;
	if (!_data||_data.length<=0) {
		if (!_url||_url==""||_url=="null"||_url=="undefined") {
			return;
		}else{
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: _url,
				data:JSON.stringify(_dataparams),	
				async: false,
				success: function(data) {
					_data = data.data;
				}
			});			
		}
	}
//=====================================================================================
	//渲染参数初始化
	var _params = opt.params;
	var _repeat = true;
	if (_params.repeat==false) {
		_repeat = false;
	};	
	var _interval = 0;	
	if (_params.interval) {
		_interval = _params.interval;
	};
	var _duration = 2000;
	if (_params.duration) {
		_duration = _params.duration;
	};	
	var _renderer = {
		color:"red",
		width:2
	}
	if (_params.renderer) {
		_renderer = _params.renderer;
	};
	//迁移线矢量样式
	var style = new ol.style.Style({
		stroke: new ol.style.Stroke({
		  color: _renderer.color,
		  width: _renderer.width
		})
	});
	//迁徙路线矢量数据源构建
	flightsSource = new ol.source.Vector({
		wrapX: false,
		loader: function() {
			//字符串处理为float数组
	        var strComma2floatArray = function(str){
	        	var strArray = str.split(",");
	        	var floatArray = [];
	        	for (var i = 0; i < strArray.length; i++) {
	        		var _float = parseFloat(strArray[i]);
	        		floatArray.push(_float);
	        	};
	        	return floatArray
	        }
	        //根据起始点位置，构造迁移弧线（均匀生成100个点的曲线）
		    var flightsData = _data;
		    for (var i = 0; i < flightsData.length; i++) {
		        var flight = flightsData[i];
		        var from=ol.proj.transform(strComma2floatArray(flight.start),map.getView().getProjection(), ol.proj.get('EPSG:4326'));
		        var to=ol.proj.transform(strComma2floatArray(flight.end),map.getView().getProjection(), ol.proj.get('EPSG:4326'));
		        var arcGenerator = new arc.GreatCircle(
                  {x: from[0], y: from[1]},
                  {x: to[0], y: to[1]}
                );
                var arcLine = arcGenerator.Arc(100, {offset: 0});
                if (arcLine.geometries.length === 1) {
	 		      	var line =  new ol.geom.LineString(arcLine.geometries[0].coords);
			        line.transform(ol.proj.get('EPSG:4326'), map.getView().getProjection());
			        var feature = new ol.Feature({
			            geometry: line,
			            finished: false
			        });
			        addLater(feature, i * _interval);
                } 	
            }
		    map.on('postcompose', animateFlights);
		}
	});
	//动态加载函数
	var addLater = function(feature, timeout) {
		window.setTimeout(function() {
		  feature.set('start', new Date().getTime());
		  flightsSource.addFeature(feature);
		}, timeout);
	};
	//每毫秒行进的点位数
	var pointsPerMs = 100/_duration;
	var animateFlights = function(event) {
		var vectorContext = event.vectorContext;
		var frameState = event.frameState;
		vectorContext.setStyle(style);
		var features = flightsSource.getFeatures();
		for (var i = 0; i < features.length; i++) {
		    var feature = features[i];
		    if (!feature.get('finished')) {
			    var coords = feature.getGeometry().getCoordinates();
			    var elapsedTime = frameState.time - feature.get('start');
			    var elapsedPoints = elapsedTime * pointsPerMs;

			    if (elapsedPoints >= coords.length) {
			        feature.set('finished', true);
			    }
			    var maxIndex = Math.min(elapsedPoints, coords.length);
			    var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex));
			    vectorContext.drawGeometry(currentLine);
		    }else{
		    	if (_repeat) {
			    	//点位全部行进完成后，重新初始化循环渲染
			    	var _features = flightsSource.getFeatures();
			    	flightsSource.clear();
			    	for (var i = 0; i < _features.length; i++) {
			    		_features[i].set("finished",false);
			    		addLater(_features[i], i * 0);
			    	}
		    	};
		    }
		}
		map.render();
	};
	flightsLayer = new ol.layer.Vector({
		source: flightsSource,
		style: function(feature) {
			if (feature.get("finished")) {
				return style;
			};
			return null;
		}
	});
	return flightsLayer;
}
/**
	增加点动画图层
 * @param {Object} opt
 *举例：
	{
		source:{
			url:null,
			dataparam:null,
			data:[{
				x:470070,
				y:316827,
				title:"test1"
			},{
				x:539709,
				y:333231,
				title:"test2"
			},{
				x:524892,
				y:274388,
				title:"test3"
			}]
		},
		name:"testFlash",
		params:{
			duration:2000,
			repeat:true,
			renderer:{
				pointcolor:"blue",
				pointradius:5,
				flashcolor:"blue",
				flashradius:30,
				fontcolor:"red",
				fontsize:"14"
			}
		}
	}
 */

var keyListernerArray = [];
function getFlashLayer(opt){
	/**
		数据源初始化，source中data与url属性至少指定一项，两者同时存在时，优先读取data属性
	**/
	//获取数据url
	var _source = opt.source;
	var _url = _source.url;
	//url请求参数
	var _dataparams = _source.dataparams;
	//js传递数据对象，优先级>url动态获取data
	var _data = _source.data;
	if (!_data||_data.length<=0) {
		if (!_url||_url==""||_url=="null"||_url=="undefined") {
			return;
		}else{
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: _url,
				data:JSON.stringify(_dataparams),	
				async: false,
				success: function(data) {
					_data = data.data;
				}
			});			
		}
	}
//================================================================	

	//渲染参数初始化
	var _params = opt.params;
	var _repeat = true;
	if (_params.repeat==false) {
		_repeat = false;
	};	
	var _duration = 2000;
	if (_params.duration) {
		_duration = _params.duration;
	};	
	var _renderer = {
		pointcolor:"blue",
		pointradius:5,
		flashcolor:"blue",
		flashradius:30,
		fontcolor:"red",
		fontsize:"14"
	}
	if (_params.renderer) {
		_renderer = _params.renderer;
	};

	var flashSource = new ol.source.Vector({
		wrapX: false
	});
	var flashVector = new ol.layer.Vector({
		source: flashSource,
		style:function(){
			var _style = new ol.style.Style({
				image: new ol.style.Circle({
					radius: _renderer.pointradius,
					snapToPixel: false,
					fill : new ol.style.Fill({
						color : _renderer.pointcolor
					})		
				})
			});
			return _style;
		}
	});

	var flash = function(feature){
		var listenerKey;
		var start = new Date().getTime();
		var animate = function(event){
			var vectorContext = event.vectorContext;
			var frameState = event.frameState;
			var flashGeom = feature.getGeometry();
			var elapsed = frameState.time - start;
			var elapsedRatio = elapsed / _duration;
			// radius will be 5 at start and 30 at end.
			var _radius = ol.easing.easeOut(elapsedRatio) * (_renderer.flashradius-_renderer.pointradius)+_renderer.pointradius;
			var opacity = ol.easing.easeOut(1 - elapsedRatio);
			var style = new ol.style.Style({
				image: new ol.style.Circle({
					radius: _radius,
					snapToPixel: false,
					stroke: new ol.style.Stroke({
						color: _renderer.flashcolor,
						width: 0.25 + opacity
					})		
				}),
				text : new ol.style.Text({
					font : _renderer.fontsize+'px 微软雅黑',
					text : feature.get("title"),
					fill : new ol.style.Fill({
						color : _renderer.fontcolor
					})
				})
			});

			vectorContext.setStyle(style);
			vectorContext.drawGeometry(feature.getGeometry());
			if (elapsed > _duration) {
				if (_repeat) {
					start = new Date().getTime();
				}else{
					ol.Observable.unByKey(listenerKey);
					return;					
				}				
			}
			map.render();
		}
		listenerKey = map.on('postcompose', animate);
		keyListernerArray.push(listenerKey);
	}
	flashSource.on('addfeature', function(e) {
		flash(e.feature);
	});
	flashSource.on('clear', function(e) {
		for (var i = 0; i < keyListernerArray.length; i++) {
			ol.Observable.unByKey(keyListernerArray[i]);
		};
		keyListernerArray = [];
	});	
	var pointsArray = _data;
	for (var i = 0; i < pointsArray.length; i++) {
		var geom = new ol.geom.Point([pointsArray[i].x,pointsArray[i].y]);
		var feature = new ol.Feature(geom);
		feature.set('title', pointsArray[i].title);
		feature.set('VECTORTYPE', "flash");
		flashSource.addFeature(feature);
	};
	return flashVector;
}

var globalHeightVector;//高亮vector

function hignLight(option,row){
	if(globalHeightVector) map.removeLayer(globalHeightVector);
	var lightWkt = [];
	var dataset = option.dataset;
	if(dataset){
		$.ajax({
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			url: cxt + "/datainterface/getdata/list/" + dataset,
			async: false,
			data: JSON.stringify(row),
			success: function(data) {
				lightWkt.push(data.data[0].MAPWKT);
			}
		})
	}
	var wktformat = new ol.format.WKT();
	var features = new Array();
	for (var i = 0; i < lightWkt.length; i++) {
		var feature = wktformat.readFeature(lightWkt[i]);
		features.push(feature);
	}
	globalHeightVector = new ol.layer.Vector({
		name : "单选高亮图层",
		source : new ol.source.Vector({
			features : features
		}),
		style : new ol.style.Style({
			stroke : new ol.style.Stroke({
				color : '#0bb7f9',
				width : 3,
				//					lineDash : [ 10, 10 ]
			}),
		})
	});
	map.addLayer(globalHeightVector);
	map.getView().setCenter(ol.extent.getCenter(features[0].getGeometry().getExtent()));
	map.getView().setZoom(16);
}

/**
 * 点击聚合点，地图放大到最大四至——————一次冒泡
 * @param features 
 * @author wuhl
 * @createDate 2017-11-28
 * */
function fitMaxExtent(features){
	//定义四至
	var minX,minY,maxX,maxY;
	//遍历获取所有feature的最大四至范围
	for(var i=0;i<features.length;i++){
		var extent = features[i].getGeometry().getExtent();
		if(i==0){
			minX = extent[0];
			minY = extent[1];
			maxX = extent[2];
			maxY = extent[3];
		}else{
			minX_temp = extent[0];
			minY_temp = extent[1];
			maxX_temp = extent[2];
			maxY_temp = extent[3];
			
			if(minX_temp<minX){
				minX = minX_temp;
			}
			if(minY_temp<minY){
				minY = minY_temp;
			}
			if(maxX_temp>maxX){
				maxX = maxX_temp;
			}
			if(maxY_temp>maxY){
				maxY = maxY_temp;
			}
		}
	}
	
	var max_extent = [minX,minY,maxX,maxY];
	//动画渲染
	var view = map.getView();
	var beforeZoom = ol.animation.zoom({
		duration: 2000,
		resolution: view.getResolution()
	});
	var pan = ol.animation.pan({
		duration: 2000,
		source: (view.getCenter())
	});
	
	map.beforeRender(pan);
	map.beforeRender(beforeZoom);
	//适配最大四至
	map.getView().fit(max_extent,map.getSize());
}

/**
 * echarts迁徙图图层
 * @param opt 
 * @author liuzw
 * @createDate 2017-12-06
 * 举例：
	{
		source:{
			url:null,
			dataparam:null,
			data:[
				{
					from:{
						name:"北京市水文总站",
						coords:[494925.980703,307936.671707]
					},
					to:[{
						name:"北京市密云水库管理处",
						coords:[540656.52104,367867.184251],
						value:"调拨信息1-1"
					},{
						name:"北京市永定河管理处",
						coords:[489690.055286,297186.060742],
						value:"调拨信息1-2"
					}],
					renderer:{
						//轨迹底线样式
						trace:{
							color: '#ffa022',
							width:1,
							curveness:0.2,
							opacity: 0.6,
						},
						//移动滑块样式
						slider:{
							//时长
							duration:6,
							icon:'path://M308.3,177.5 253.9,347.7 308.2,315 362.5,347.7',
							iconcolor:'#ffa022',
							iconsize:13,
							//尾部效果
							tailcolor:'#fff',
							//尾部宽度
							tailwidth:5,
							//尾部占轨迹长度比例,0-1
							taillength:0.5,

						},
						//起点样式
						starting:{
							size:10,
							color: "#ffa022"
						},			
						//终点样式
						destination:{
							size:10,
							color: "#ffa022"
						}
					}
				},{
					from:{
						name:"北京市水利自动化研究所",
						coords:[495213.794875,304643.979581]
					},
					to:[{
						name:"北京市东水西调管理处",
						coords:[500045.896748,317880.113714],
						value:"调拨信息2-1"
					},{
						name:"北京水务局幼儿园",
						coords:[497025.471653,305209.866046],
						value:"调拨信息2-2"
					},{
						name:"北京市北运河管理处",
						coords:[526392.178674,307174.758242],
						value:"调拨信息2-3"
					}],
					renderer:{
						//轨迹底线样式
						trace:{
							color: '#fff',
							width:1,
							curveness:0.2,
							opacity: 0.6,
						},
						//移动滑块样式
						slider:{
							//时长
							duration:6,
							icon:'path://M308.3,177.5 253.9,347.7 308.2,315 362.5,347.7',
							//尾部效果
							tailcolor:'#fff',
							//尾部宽度
							tailwidth:5,
							//尾部占轨迹长度比例,0-1
							taillength:0.5,

						},
						//起点样式
						starting:{
							size:10,
							color: "#ffa022",
							label:false
						},			
						//终点样式
						destination:{
							size:10,
							color: "#ffa022",
							label:false
						}
					}					
				}
			]
		},
		name:"echartFlight"
	}
 */


function getEchartFlightOverlay(opt){
	/**
		数据源初始化，source中data与url属性至少指定一项，两者同时存在时，优先读取data属性
	**/
	var _source = opt.source;
	var _url = _source.url;
	//url请求参数
	var _dataparams = _source.dataparams;
	//js传递数据对象，优先级>url动态获取data
	var _data = _source.data;
	if (!_data||_data.length<=0) {
		if (!_url||_url==""||_url=="null"||_url=="undefined") {
			return;
		}else{
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: _url,
				data:JSON.stringify(_dataparams),	
				async: false,
				success: function(data) {
					_data = data.data;
				}
			});			
		}
	}
	//获取屏幕坐标
	var getScrCoord=function  (lonLatCoord){
        var scrPoint = map.getPixelFromCoordinate(lonLatCoord);
        return scrPoint;
	}
	//echart格式数据转化
	var convertData = function(data) {
		var endArray = data.to;
		var start = data.from;
	    var res = [];
	    for (var i = 0; i < endArray.length; i++) {
	        var end = endArray[i];
	        if (start.coords && end.coords) {
	            res.push({
	                fromName: start.name,
	                toName: end.name,
	                coords: [getScrCoord(start.coords), getScrCoord(end.coords)],
	                value: end.value
	            });
	        }
	    }
	    return res;
	};

	map.on("moveend",function(){
		initEchart(_data);
	});
	map.on("change:size",function(){
		initEchart(_data);
	});

	var initEchart = function(_data){
		var _flightDom = $("#flightchartOverlay");
		if (_flightDom.length<=0) {
			var _width = map.getSize()[0] + "px";
			var _height = map.getSize()[1] + "px";
			var _html = '<div id = "flightchartOverlay" style = "height:'+_height+';width:'+_width+'"></div>';
			var mapDomID = map.getTarget();
			$("#"+mapDomID).append(_html);
		}else{
			_flightDom.height(map.getSize()[1]);
			_flightDom.width(map.getSize()[0]);
		}

		var series = [];
		for (var i = 0; i < _data.length; i++) {

			var _flightObj = convertData(_data[i]);
			var _renderer = _data[i].renderer;
			var planePath = _renderer.slider.icon?_renderer.slider.icon:'path://M308.3,177.5 253.9,347.7 308.2,315 362.5,347.7';
		    series.push({
		    	//底色线
		        name: _flightObj[0].fromName+"-"+_flightObj[0].toName,
		        //name: "1",
		        type: 'lines',
		        zlevel: 1,
		        effect: {
		            show: true,
		            period: _renderer.slider.duration?_renderer.slider.duration:6,
		            trailLength:  _renderer.slider.taillength?_renderer.slider.taillength:0.5,
		            color: _renderer.slider.tailcolor?_renderer.slider.tailcolor:'#fff',
		            symbolSize: _renderer.slider.tailwidth?_renderer.slider.tailwidth:5
		        },
		        lineStyle: {
		            normal: {
		                //color: "#ffa022",
		                color: _renderer.trace.color?_renderer.trace.color:"#ffa022",
		                width: _renderer.trace.width?_renderer.trace.width:0,
		                curveness: _renderer.trace.curveness?_renderer.trace.curveness:0.2
		            }
		        },
		        data: _flightObj
		    },
		    //移动点线
		    {
		        name: _flightObj[0].fromName+"-"+_flightObj[0].toName,
		        //name: "2",
		        type: 'lines',
		        zlevel: 2,
		        symbol: ['none', 'arrow'],
		        symbolSize: 10,
			    tooltip : {
			        trigger: 'item',
			        formatter: function(obj){
			        	return obj.data.fromName+"-"+obj.data.toName+": </br>"+obj.data.value;
			        }
			    },	        
		        effect: {
		            show: true,
		            period: _renderer.slider.duration?_renderer.slider.duration:6,
		            trailLength: 0,
		            symbol: planePath,
		            symbolSize: _renderer.slider.iconsize?_renderer.slider.iconsize:13,
		            color: _renderer.slider.iconcolor?_renderer.slider.iconcolor:"#ffa022"
		        },
		        lineStyle: {
		            normal: {
		                color: _renderer.trace.color?_renderer.trace.color:"#ffa022",
		                width: 1,
		                opacity: _renderer.trace.opacity?_renderer.trace.opacity:0.6,
		                curveness: _renderer.trace.curveness?_renderer.trace.curveness:0.2
		            }
		        },
		        data: _flightObj
		    },
		    //接收点样式
		    {
		        name: _flightObj[0].toName,
		        //name: "3",
		        type: 'effectScatter',
		        coordinateSystem: 'geo',
		        zlevel: 2,
		        rippleEffect: {
		            brushType: 'stroke'
		        },
		        label: {
		            normal: {
		                show: _renderer.destination.label?_renderer.destination.label:false,
		                position: 'right',
		                formatter: '{b}'
		            }
		        },
		        symbolSize: _renderer.destination.size?_renderer.destination.size:10,
			    tooltip : {
			        trigger: 'item',
			        formatter: function(obj){
			        	return obj.name
			        }
			        //"{b}： {c}[2]"
			    },	        
		        itemStyle: {
		            normal: {
		                color: _renderer.destination.color?_renderer.destination.color:"#ffa022"
		            }
		        }
		        ,
		        data: _data[i].to.map(function (dataItem) {
		        	var screenCoord = getScrCoord(dataItem.coords);
		            return {
		                name: dataItem.name,
		                value:screenCoord.concat(dataItem.value)
		            };
		        })
		    },	    
		    //出发点
		    {
		        name: _flightObj[0].fromName,
		        //name: "3",
		        type: 'effectScatter',
		        coordinateSystem: 'geo',
		        zlevel: 2,
		        rippleEffect: {
		            brushType: 'stroke'
		        },
		        label: {
		            normal: {
		                show: _renderer.starting.label?_renderer.starting.label:false,
		                position: 'right',
		                formatter: '{b}'
		            }
		        },
		        symbolSize: _renderer.starting.size?_renderer.starting.size:10,
			    tooltip : {
			        trigger: 'item',
			        formatter: function(obj){
			        	return obj.name
			        }
			        //"{b}： {c}[2]"
			    },	        
		        itemStyle: {
		            normal: {
		                color: _renderer.starting.color?_renderer.starting.color:"#ffa022"
		            }
		        }
		        ,
		        data: [_data[i].from].map(function (dataItem) {

		            return {
		                name: dataItem.name,
		                value: getScrCoord(dataItem.coords)
		            };
		        })
		    });

		};
		var option = {
		    //backgroundColor: '#404a59',
		    // title : {
		    //     text: '模拟迁徙',
		    //     subtext: '数据纯属虚构',
		    //     left: 'center',
		    //     textStyle : {
		    //         color: '#fff'
		    //     }
		    // },
		    tooltip : {
		        trigger: 'item'
		    },
		    // legend: {
		    //     orient: 'vertical',
		    //     top: 'bottom',
		    //     left: 'right',
		    //     data:['北京市东水西调管理处'],
		    //     textStyle: {
		    //         color: '#fff'
		    //     },
		    //     selectedMode: 'single'
		    // }
		    // ,
		    geo: {
		        // map: 'china',
		        label: {
		            emphasis: {
		                show: false
		            }
		        },
		        roam: true,
		        itemStyle: {
		            normal: {
		                areaColor: '#323c48',
		                borderColor: '#404a59'
		            },
		            emphasis: {
		                areaColor: '#2a333d'
		            }
		        }
		    },
		    series: series
		};

		var myChart = echarts.init(document.getElementById("flightchartOverlay"));
		myChart.clear();
		myChart.setOption(option);
		map.render();
		if (_chartOverlay) {
			_chartOverlay.setPosition(map.getView().getCenter());
		};
	}
	if ($("#flightchartOverlay").length<=0) {
		initEchart(_data);
	};
	var _chartOverlay = new ol.Overlay({
		position:map.getView().getCenter(),
		positioning:"center-center",
		element:document.getElementById("flightchartOverlay"),
		stopEvent:false
	});	
	map.render();
	_chartOverlay.setPosition(map.getView().getCenter());
	
	return _chartOverlay;
}
