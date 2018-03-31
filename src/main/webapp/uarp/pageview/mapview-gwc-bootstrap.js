//参数加载
var mapOption = dataset.mapview["gwc"];
//基础数据加载
var map = null;
var mapObject = {};
var switchmapwrapper = {};
var layers = {};
INCHES_PER_UNIT = {
		'inches' : 1.0,
		'ft' : 12.0,
		'mi' : 63360.0,
		'm' : 39.3701,
		'km' : 39370.1,
		'dd' : 4374754,
		'yd' : 36
	};

//空间服务解析arcgisJSON
var esrijsonFormat = new ol.format.EsriJSON();
var linestringVector;//轨迹vector
var linerMap = {};
var tableLightLayer;
var chartVector;
var filterVector;
var projectionOption;
//地图工具加载
var map_tools_olchart,map_tools_choose,map_tools_ledit,map_tools_pedit,map_tools_share,
map_tools_globe,map_tools_fullScreen,map_tools_clear,map_tools_export,map_tools_save,map_tools_mapo,
map_tools_pointsearch,map_tools_boxsearch,map_tools_polygon,search,map_tools_move,map_tools_measureline,map_tools_measurearea;
var toolsMap = {};
var mainbar;
var editbar;
$(function() {
	//底图初始化加载
	initMap();
	//底图切换初始化
	initChangeMap();
	
	if(typeof(initBootstrapTools) == 'function'){
		initBootstrapTools(mapOption.tools);
		initBootstrapExtendTools(mapOption.exttools);
	}else{
		//地图默认工具加载
		initDefaultTools(mapOption.tools);
		//地图扩展工具加载
		initExtendTools(mapOption.exttools);
	}
	
	//加载位置
	if(mapOption.poioption&&mapOption.pointpoi == true) addpoi(mapOption.poioption);//pointPoi();
	//是否显示地图切换
	if(mapOption.basechange&&mapOption.basechange == true) $('.tucengkz').show();
	//是否回调位置
	if(mapOption.callbackPosition&&mapOption.callbackPosition["start"] == true) callbackPosition(mapOption.callbackPosition);
	
	if(params.dom_id && params.dom_id != "") addParentGeometry(params.dom_id);
	//地图缩放控件汉化
	$(".ol-zoom").find(".ol-zoom-in")[0].title = "放大";
	$(".ol-zoom").find(".ol-zoom-out")[0].title = "缩小";
});
//地图切换
function initChangeMap(){
	$("#SwitchMapOnOff").click(function() {
		var status = $(this).attr("src");
		var url = status;
		if (status.indexOf("switchmapon.png") != -1) {
			url = url.replace("switchmapon.png", "switchmapoff.png");
			$("#switchmapwrapper").show("slow");
		} else {
			url = url.replace("switchmapoff.png", "switchmapon.png");
			$("#switchmapwrapper").hide("slow");
		}
		$(this).attr("src", url);
	});

	// 地图切换底图控制
	$("#switchmapwrapper").find("li").click(function() {
		if (!$(this).find("img").hasClass("active")) {
			$("#switchmapwrapper").find("img").removeClass("active");
			$(this).find("img").addClass("active");
			var datatype = $(this).attr("datatype");
			switchMap(datatype);
		}
		$("#SwitchMapOnOff").click();
	});
	
	$("li[datatype="+mapOption.defaultlayer+"]").find("img").addClass("active");
}

function switchMap(datatype) {
	for(var i in switchmapwrapper) {
		if (switchmapwrapper[i] instanceof Array) {
			if (datatype == i) {
				for (var j = 0; j < switchmapwrapper[i].length; j++) {
					var _layer=switchmapwrapper[i][j];
					_layer.setVisible(true);
				};
			}else{
				for (var j = 0; j < switchmapwrapper[i].length; j++) {
					var _layer=switchmapwrapper[i][j];
					_layer.setVisible(false);
				};
			};
			layerArray = switchmapwrapper[i];
			for (var i = 0; i < layerArray.length; i++) {
				layerArray[i]
			};
		}else{
			if(i == datatype) {
				switchmapwrapper[i].setVisible(true);
			} else {
				switchmapwrapper[i].setVisible(false);
			}			
		};
	}
}

//底图初始化
function initMap() {
	projectionOption = mapOption.projection;
	if (projectionOption.proj4) {
		proj4.defs(projectionOption.code,projectionOption.proj4);
	};
	var projectionExtent = projectionOption.extent;
	var projection = new ol.proj.Projection({
		"code":projectionOption.code, 
		"units":projectionOption.units, 
		"extent": projectionOption.extent
	});
	
	var matrixSet = mapOption.matrixset;
	
	var resolutions = mapOption.resolutions;
	
	var matrixIds = [];
	for (var i = 0; i < resolutions.length; i++) {
		matrixIds.push(matrixSet + ":" + i);
	}
	
	var view = new ol.View({
		projection:projection,
		center:mapOption.center,
		zoom:mapOption.initzoom,
		maxResolution:mapOption.maxResolution,
		minResolution:mapOption.minResolution
	});
	
	var scaleLineControl = new ol.control.ScaleLine({});
	scaleLineControl.setUnits('metric');//'degrees', 'imperial', 'nautical', 'metric', 'us'.
	
	//初始化地图，将初始化的wmtsLayer和view赋值给新建的地图
	map=new ol.Map({
		target:'map',
		controls : ol.control.defaults({
			attribution : false
		}),
		layers:[],
		view:view
	});
	
	map.addControl(scaleLineControl);
	var wmtsUrl = mapOption.wmtsurl;
	
	if(wmtsUrl.indexOf("http://") == -1){
		wmtsUrl = gwcwmtsurl + wmtsUrl;
	}
	//自定义地图图层切换
	var baselayer_cusomize = mapOption.baselayer_cusomize;
	if (baselayer_cusomize) {
		var defaultlayer = mapOption.defaultlayer;
		$("#switchmapwrapper").empty();
		var _wrapperWidth = 0;
		for (var layoutName in baselayer_cusomize) {
			switchmapwrapper[layoutName] = []
			var _layout = baselayer_cusomize[layoutName];		
			var _name = _layout.name;
			var _icon = _layout.icon;
			_liHtml = '<li style="text-align: center;" datatype="'+layoutName+'">';
			_liHtml+='<a href="javascript:void(0);"><img src="'+cxt+'/resources/commons/map/css/icons/'+_icon+'"';
			_liHtml+= '/></a><br />'+_name+'</li>';			
			$("#switchmapwrapper").append(_liHtml);
			_wrapperWidth+=110;

			var _layers = _layout.layers;
			for (var i = 0; i < _layers.length; i++) {

				var _layerInfo = _layers[i];
				var layerName = null;
				var minResolution = null;
				var maxResolution = null;
				if (typeof _layerInfo==="object") {
					layerName = _layerInfo.name;
					if (_layerInfo.minResolution) {
						minResolution = _layerInfo.minResolution;
					};
					if (_layerInfo.maxResolution) {
						maxResolution = _layerInfo.maxResolution;
					};				
				}else if(typeof _layerInfo==="string"){
					layerName = _layerInfo;
				};

				var wmtsSource=new ol.source.WMTS({
			        url: wmtsUrl,
			        layer: layerName,
			        matrixSet: matrixSet,
			        format: mapOption.format,
			        projection: projection,
			        tileGrid: new ol.tilegrid.WMTS({
			          origin: ol.extent.getTopLeft(mapOption.extent),
			          resolutions: resolutions,
			          matrixIds: matrixIds
			        }),
			        style: mapOption.style,
			        wrapX: true
			    });

				//创建wmts图层
				var wmtsLayer=new ol.layer.Tile({
					opacity: 1,
				    source:wmtsSource
				});

				if (minResolution) {
					wmtsLayer.setMinResolution(minResolution);
				};
				if (maxResolution) {
					wmtsLayer.setMaxResolution(maxResolution);
				};				
				map.addLayer(wmtsLayer);
				switchmapwrapper[layoutName].push(wmtsLayer);
			};			
		};

		$("#switchmapwrapper").css("background","grey");
		$("#switchmapwrapper").width(_wrapperWidth);
		switchMap(defaultlayer);
	}else{
		var wmtsLayers = mapOption.wmtslayers;
		var baselayer_vector = mapOption.baselayer_vector;
		var baselayer_satellite = mapOption.baselayer_satellite;
		var defaultlayer = mapOption.defaultlayer;
		for ( var i in wmtsLayers) {
			var _layer = wmtsLayers[i];
			var layerName = null;
			var minResolution = null;
			var maxResolution = null;
			if (typeof _layer==="object") {
				layerName = _layer.name;
				if (_layer.minResolution) {
					minResolution = _layer.minResolution;
				};
				if (_layer.maxResolution) {
					maxResolution = _layer.maxResolution;
				};				
			}else if(typeof _layer==="string"){
				layerName = _layer;
			};
			var wmtsSource=new ol.source.WMTS({
		        url: wmtsUrl,
		        layer: layerName,
		        matrixSet: matrixSet,
		        format: mapOption.format,
		        projection: projection,
		        tileGrid: new ol.tilegrid.WMTS({
		          origin: ol.extent.getTopLeft(mapOption.extent),
		          resolutions: resolutions,
		          matrixIds: matrixIds
		        }),
		        style: mapOption.style,
		        wrapX: true
		    });

			//创建wmts图层
			var wmtsLayer=new ol.layer.Tile({
				opacity: 1,
			    source:wmtsSource
			});
			
			if (minResolution) {
				wmtsLayer.setMinResolution(minResolution);
			};
			if (maxResolution) {
				wmtsLayer.setMaxResolution(maxResolution);
			};
			map.addLayer(wmtsLayer);
			
			if(layerName == baselayer_vector) {
				switchmapwrapper["baselayer_vector"] = wmtsLayer;
			}
			
			if(layerName == baselayer_satellite) {
				switchmapwrapper["baselayer_satellite"] = wmtsLayer;
			}
		}
		
		switchMap(defaultlayer);
	}


}


/**
 * 初始化默认工具栏
 */
function initDefaultTools(tools){
	if(tools == undefined)return;
	// 可编辑bar
	editbar = new ol.control.Bar({
		toggleOne : true, // true可以确保单一激活
		group : false
	});
	// 地图bar
	if(mapOption.tools["mainbar"] == true){
		mainbar = new ol.control.Bar();
		map.addControl(mainbar);
		mainbar.addControl(editbar);
	}
	
	var bounds = projectionOption.extent;
	
	//全屏
	map_tools_fullScreen = new ol.control.FullScreen({
		html : '<i class="fa fa-tv"></i>',
		tipLabel : "全屏"
	});
	toolsMap['fullscreen'] = map_tools_fullScreen;

	//全图
	map_tools_globe = new ol.control.ZoomToExtent({
		tipLabel : "全图",
		className : 'ol-zoom-extent',
		extent : bounds
	});
	toolsMap['globe'] = map_tools_globe;
	
	//移动地图
	map_tools_move = new ol.control.Button({
		html : '<i class="fa fa-arrows"></i>',
		title : "平移",
		handleClick : function() {
			mapClear();
			$("#map").css('cursor','-webkit-grab');
		}
	});
	toolsMap['move'] = map_tools_move;
	
	map_tools_measureline = new ol.control.Button({
		html : '<i class="fa fa-magic"></i>',
		title : "测距",
		handleClick : function() {
			measureLine();
		}
	});
	toolsMap['measureline'] = map_tools_measureline;
	
	map_tools_measurearea = new ol.control.Button({
		html : '<i class="fa fa-bookmark-o fa-rotate-270"></i>',
		title : "测面",
		handleClick : function() {
			measureArea();
		}
	});
	toolsMap['measurearea'] = map_tools_measurearea;
	
	map_tools_pointsearch = new ol.control.Button({
		html : '<i class="fa fa-hand-pointer-o"></i>',
		title : "点查询",
		handleClick : function() {
			$("#map").css('cursor','default');
			pointSearch();
		}
	});
	toolsMap['pointsearch'] = map_tools_pointsearch;
	
	map_tools_boxsearch = new ol.control.Button({
		html : '<i class="fa fa-square-o"></i>',
		title : "拉框查询",
		handleClick : function() {
			$("#map").css('cursor','default');
			boxSearch();
		}
	});
	toolsMap['boxsearch'] = map_tools_boxsearch;
	
	map_tools_polygonsearch = new ol.control.Button({
		html : '<i class="fa fa-bookmark-o fa-rotate-180"></i>',
		title : "多边形查询",
		handleClick : function() {
			polygonSearch();
		}
	});
	toolsMap['polygonsearch'] = map_tools_polygonsearch;
	
	//清除
	map_tools_clear = new ol.control.Button({
		name : 'clear',
		html : '<i class="fa fa-trash"></i>',
		title : '清除',
		handleClick : function() {
			$("#map").css('cursor','default');
			mapClear();
		}
	});
	toolsMap['clear'] = map_tools_clear;
	
	map_tools_exportmap = new ol.control.Button({
		html : '<i class="fa fa-download"></i>',
		title : "导出",
		handleClick : function() {
			exportMap();
		}
	});
	toolsMap['export'] = map_tools_exportmap;
	
	for(var key in tools){
		if(tools[key] == true&&key != "mainbar") editbar.addControl(toolsMap[key]);
	}
}


/**
 * 初始化工具栏
 * @param {Array} toolbar
 */
function initExtendTools(exttools){
	if(toolbar == undefined)return;
	for(var i=0;i<toolbar.length;i++){
		var click = toolbar[i].click;
		toolsMap[toolbar[i].name] = new ol.control.Button({
			name : toolbar[i].name,
			html : '<i class="'+toolbar[i].icon+'"></i>',
			title : toolbar[i].title,
			clickEvent: toolbar[i].click,
			handleClick : function(e, options) {
				if(options.clickEvent && options.clickEvent != ''){
					eval(options.clickEvent);
				}
			}
		});
		editbar.addControl(toolsMap[toolbar[i].name]);
	}
}




function pointPoi(dataset){
	$.ajax({
		type: "POST",
		dataType: "json",
		contentType: "application/json",
		url: cxt + "/datainterface/getdata/list/" + dataset,
		async: false,
		success: function(data) {
			for(var i = 0 ; i < data.data.length ; i ++){
				var _src = cxt+"/resources/commons/ext/images/poi.png";
				var coord = [data.data[i].X,data.data[i].Y];
				var iconFeature = new ol.Feature({ 
					geometry: new ol.geom.Point(coord), 
					name: 'POI Test',
					type: 'pois', 
					population: 4000, 
					rainfall: 500,
					params:data.data 
				}); 
				
				var iconStyle = new ol.style.Style({ 
					image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({ 
						anchor: [0.5, 1], 
						//anchorXUnits: 'fraction', 
						//anchorYUnits: 'pixels', 
						src: _src,
					}))
				}); 
				//图片大小
				iconStyle.getImage().setScale(1);
				iconFeature.setStyle(iconStyle); 
				var vectorSource = new ol.source.Vector({
					features: [iconFeature] 
				});
				
				var vectorLayer = new ol.layer.Vector({
					source: vectorSource 
				});
				map.addLayer(vectorLayer); 
				vectorLayer.setZIndex(40);
			}
		}
	})
}

function lineString(option){
	var dataset = option.dataset;
	var rows = option.params["rows"];
	for(var i = 0 ; i < rows.length ; i ++){
		$.ajax({
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			url: cxt + "/datainterface/getdata/list/" + dataset,
			async: false,
			data:JSON.stringify(rows[i]),
			success: function(data) {
				var lightWkt = [];
				var lightMap = {};
				for(var i = 0 ; i < data.data.length ; i++){
					//点生成
					//			var wkt = 'POINT('+data.data[i].X+' '+data.data[i].Y+')';
					//			lightWkt.push(wkt);
					if(i==0){
						lightMap[data.data[i].NAME] = [];
						lightMap[data.data[i].NAME].push([data.data[i].X,data.data[i].Y]);
					}else{
						if(data.data[i-1].NAME == data.data[i].NAME){
							lightMap[data.data[i-1].NAME].push([data.data[i].X,data.data[i].Y]);
						}else{
							lightMap[data.data[i].NAME] = [];
							lightMap[data.data[i].NAME].push([data.data[i].X,data.data[i].Y]);
						}
					}
				}
				for(var key in lightMap){
					var wkt = "LINESTRING(";
					for(var j = 0 ; j < lightMap[key].length ; j ++){
						wkt += lightMap[key][j][0]+' '+lightMap[key][j][1]+',';
					}
					wkt = wkt.substr(0,wkt.length-1);
					wkt += ')';
					lightWkt.push(wkt);
					linerMap[key] = wkt;
				}
				var wktformat = new ol.format.WKT();
				var features = new Array();
				for (var i = 0; i < lightWkt.length; i++) {
					var feature = wktformat.readFeature(lightWkt[i]);
					features.push(feature);
				}
				linestringVector = new ol.layer.Vector({
					name : "轨迹图层",
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
				map.addLayer(linestringVector);
			}
		})
		
	}
}

function lightMapLayer(row){
	if(tableLightLayer) map.removeLayer(tableLightLayer);
	var lightWkt = [linerMap[row.NAME]];
	var wktformat = new ol.format.WKT();
	var features = new Array();
	for (var i = 0; i < lightWkt.length; i++) {
		var feature = wktformat.readFeature(lightWkt[i]);
		features.push(feature);
	}
	tableLightLayer = new ol.layer.Vector({
		name : "高亮图层",
		source : new ol.source.Vector({
			features : features
		}),
		style : new ol.style.Style({
			fill : new ol.style.Fill({
				color : '#333'
			}),
			stroke : new ol.style.Stroke({
				color : '#333',
				width : 3,
				lineDash : [ 10, 10 ]
			}),
			image : new ol.style.Circle({
				radius : 7,
				fill : new ol.style.Fill({
					color : '#333'
				})
			})
		})
	});
	map.addLayer(tableLightLayer);
	map.getView().setCenter(ol.extent.getCenter(feature.getGeometry().getExtent()));
	map.getView().setZoom(22);
}
var poiVector;
function addpoi(option){
	var dataset = option.dataset;
	if(option.clear == true){if(poiVector) map.removeLayer(poiVector)}
// Get font glyph
	var theGlyph = "";
	function setFont(g)
	{	if (typeof(g)=='string') theGlyph = g;
	else theGlyph = $(this).data("glyph");
	vector.changed();
	}
	
// Fill font glyphs
	var glyph = ol.style.FontSymbol.prototype.defs.glyphs;
	
// Style function
	function getFeatureStyle (feature)
	{	var st= [];
	// Shadow style
	if (mapOption.poishadow&&mapOption.poishadow == true) st.push ( new ol.style.Style(
			{	image: new ol.style.Shadow(
					{	radius: 15,
						blur: 5,
						offsetX: 0,
						offsetY: 0,
						fill: new ol.style.Fill(
								{	color: "rgba(0,0,0,0.5)"
								})
					})
			}));
	// Font style
	st.push ( new ol.style.Style(
			{	image: new ol.style.FontSymbol(
					{	form: option.poiform?option.poiform:"none", //"hexagone", 
							gradient: option.poigradient?option.poigradient:"false",
									glyph: theGlyph,//car[Math.floor(Math.random()*car.length)], 
									fontSize: Number(option.poifontsize?option.poifontsize:"1"),
									radius: Number(option.poiradius?option.poiradius:"15"), 
									//offsetX: -15,
									rotation: Number(option.poirotation?option.poirotation:"15")*Math.PI/180,
									rotateWithView: $("#rwview").prop('checked'),
									offsetY: $("#offset").prop('checked') ? -Number($("#radius").val()):0 ,
											color: option.poicolor?option.poicolor:"",
													fill: new ol.style.Fill(
															{	color: option.poifillcolor?option.poifillcolor:"navy"
															}),
															stroke: new ol.style.Stroke(
																	{	color: option.poistrokecolor?option.poistrokecolor:"white",
																			width: Number(option.poiborder?option.poiborder:"3")
																	})
					}),
					stroke: new ol.style.Stroke(
							{	width: 2,
								color: '#f80'
							}),
							fill: new ol.style.Fill(
									{	color: [255, 136, 0, 0.6]
									})
			}));
	return st;
	}
	
	function getStyle(feature, resolution) 
	{	var s = getFeatureStyle(feature);
	// Ne pas recalculer
	//feature.setStyle(s);
	return s;
	
	};
	var lightWkt = [];
	if(dataset&&dataset!=""){
		$.ajax({
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			url: cxt + "/datainterface/getdata/list/" + dataset,
			async: false,
			data:JSON.stringify(option.params),
			success: function(data) {
				for(var i = 0 ; i < data.data.length ; i ++){
					lightWkt.push('POINT('+data.data[i].X+' '+data.data[i].Y+')');
				}
			}
		})
	}else if(cbkPositionMap){
		lightWkt.push('POINT('+cbkPositionMap["x"]+' '+cbkPositionMap["y"]+')');
	}
	var wktformat = new ol.format.WKT();
	var features = new Array();
	for (var i = 0; i < lightWkt.length; i++) {
		var feature = wktformat.readFeature(lightWkt[i]);
		features.push(feature);
	}
	
	poiVector = new ol.layer.Vector(
			{	name: '1914-18',
//				preview: "logo-70x70.png",
				source: new ol.source.Vector({
					features : features
				}),
				// y ordering
				renderOrder: ol.ordering.yOrdering(),
				style: getStyle
			})
	
	map.addLayer(poiVector);
	setFont(option.poifont?option.poifont:"fa-pied-piper-alt");
	vector.changed();
}

/**
 * 
 * 描述：动画popup
 * 
 * @version
 */
var popup = null;
var popupVector = null;
var popupSelect = null;
function popupAnim(row) {
	// Rm vector
	if(popupVector) map.removeLayer(popupVector);
	// Rm overlay
	if(popup) map.removeOverlay(popup);
	// 去除阴影
	if(popupSelect) map.removeInteraction(popupSelect);
	// Popup overlay
	popup = new ol.Overlay.Popup({
		popupClass : "black", // "tooltips", "warning" "black" "default",
								// "tips", "shadow",
		closeBox : true,
		onclose : function() {
			// 去除阴影
			map.removeInteraction(popupSelect);
			// 去除高亮点
			map.removeLayer(popupVector);
		},
		positioning : 'bottom-center',
		autoPan : true,
		autoPanAnimation : {
			duration : 100
		}
	});
	// Add overlay
	map.addOverlay(popup);
	/**/
	var wkts = [ 'POINT(' + row.X + ' ' + row.Y + ')' ];
	var wktformat = new ol.format.WKT();
	var features = new Array();
	for (var i = 0; i < wkts.length; i++) {
		var feature = wktformat.readFeature(wkts[i]);
		features.push(feature);
	}
	popupVector = new ol.layer.Vector({
		source : new ol.source.Vector({
			features : features
		}),
		style : new ol.style.Style({
			fill : new ol.style.Fill({
				color : 'rgba(204, 204, 204, 1)'
			}),
			stroke : new ol.style.Stroke({
				color : 'rgba(204, 204, 204, 1)',
				width : 3
			}),
			image : new ol.style.Circle({
				radius : 5,
				fill : new ol.style.Fill({
					color : 'rgba(204, 204, 204, 1)'
				})
			})
		})
	});
	map.addLayer(popupVector);
	map.getView().setCenter(ol.extent.getCenter(features[0].getGeometry().getExtent()));
	// Control Select
	popupSelect = new ol.interaction.Select({
		style : new ol.style.Style({
			fill : new ol.style.Fill({
				color : 'rgba(204, 204, 204, 0)'
			}),
			stroke : new ol.style.Stroke({
				color : 'rgba(204, 204, 204, 0)',
				width : 0
			}),
			image : new ol.style.Circle({
				radius : 7,
				fill : new ol.style.Fill({
					color : 'rgba(204, 204, 204, 0)'
				})
			})
		})
	});
	map.addInteraction(popupSelect);

	// On selected => show/hide popup
	var dataset = mapOption.popupoption["dataset"];
	var popParams = mapOption.popupoption["params"];
	var metadata = listOption["metadata"];
	var labelTextMap = {};
	
	for(var i = 0 ; i < metadata.length ; i ++){
		if(metadata[i].checkbox != true) labelTextMap[metadata[i].field] = metadata[i].title;
	}
	
	var content = "<div class='ol-popup-content' style='padding: 10px;height:250px;overflow-y:auto;min-width:210px;'><p>";
	for(var key in labelTextMap){
		if(row[key]&&row[key] != "null"){
			content += '<label for="con">'+labelTextMap[key]+'：</label><span>'+row[key]+'</span><br/>';
		}else{
			content += '<label for="con">'+labelTextMap[key]+'：</label><span>未知</span><br/>';
		}
	}
	content += '</p></div>';
		popup.show([ row.X,row.Y ], content);
		$('.closeBox.hasclosebox').css('margin','5px 20px -11px -30px');
		$('.closeBox.hasclosebox').next().css('margin-right','0');
	popupSelect.getFeatures().on([ 'remove' ], function(e) {
		popup.hide();
	})
}
var cbkPositionMap = {};
var beforePositionVector,afterPositionVector;
function callbackPosition(option){
	map.on('click',function(){
		var position = $('.ol-mouse-position').text().split(",");
		cbkPositionMap = {"x":Number(position[0]),"y":Number(position[1])};
		if(option.clear == true) {if(afterPositionVector) map.removeLayer(afterPositionVector);}
		var dataset = option.dataset;
		// Get font glyph
			var theGlyph = "";
			function setFont(g)
			{	if (typeof(g)=='string') theGlyph = g;
			else theGlyph = $(this).data("glyph");
			vector.changed();
			}
			
		// Fill font glyphs
			var glyph = ol.style.FontSymbol.prototype.defs.glyphs;
			
		// Style function
			function getFeatureStyle (feature)
			{	var st= [];
			// Shadow style
			if (mapOption.poishadow&&mapOption.poishadow == true) st.push ( new ol.style.Style(
					{	image: new ol.style.Shadow(
							{	radius: 15,
								blur: 5,
								offsetX: 0,
								offsetY: 0,
								fill: new ol.style.Fill(
										{	color: "rgba(0,0,0,0.5)"
										})
							})
					}));
			// Font style
			st.push ( new ol.style.Style(
					{	image: new ol.style.FontSymbol(
							{	form: option.poiform?option.poiform:"none", //"hexagone", 
									gradient: option.poigradient?option.poigradient:"false",
											glyph: theGlyph,//car[Math.floor(Math.random()*car.length)], 
											fontSize: Number(option.poifontsize?option.poifontsize:"1"),
											radius: Number(option.poiradius?option.poiradius:"15"), 
											//offsetX: -15,
											rotation: Number(option.poirotation?option.poirotation:"15")*Math.PI/180,
											rotateWithView: $("#rwview").prop('checked'),
											offsetY: $("#offset").prop('checked') ? -Number($("#radius").val()):0 ,
													color: option.poicolor?option.poicolor:"",
															fill: new ol.style.Fill(
																	{	color: option.poifillcolor?option.poifillcolor:"navy"
																	}),
																	stroke: new ol.style.Stroke(
																			{	color: option.poistrokecolor?option.poistrokecolor:"white",
																					width: Number(option.poiborder?option.poiborder:"3")
																			})
							}),
							stroke: new ol.style.Stroke(
									{	width: 2,
										color: '#f80'
									}),
									fill: new ol.style.Fill(
											{	color: [255, 136, 0, 0.6]
											})
					}));
			return st;
			}
			
			function getStyle(feature, resolution) 
			{	var s = getFeatureStyle(feature);
			// Ne pas recalculer
			//feature.setStyle(s);
			return s;
			
			};
			var lightWkt = [];
			if(dataset&&dataset!=""){
				$.ajax({
					type: "POST",
					dataType: "json",
					contentType: "application/json",
					url: cxt + "/datainterface/getdata/list/" + dataset,
					async: false,
					success: function(data) {
						for(var i = 0 ; i < data.data.length ; i ++){
							lightWkt.push('POINT('+data.data[i].X+' '+data.data[i].Y+')');
						}
					}
				})
			}else if(cbkPositionMap){
				lightWkt.push('POINT('+cbkPositionMap["x"]+' '+cbkPositionMap["y"]+')');
			}
			var wktformat = new ol.format.WKT();
			var features = new Array();
			for (var i = 0; i < lightWkt.length; i++) {
				var feature = wktformat.readFeature(lightWkt[i]);
				features.push(feature);
			}
			
			afterPositionVector = new ol.layer.Vector(
					{	name: '1914-18',
//						preview: "logo-70x70.png",
						source: new ol.source.Vector({
							features : features
						}),
						// y ordering
						renderOrder: ol.ordering.yOrdering(),
						style: getStyle
					})
			
			map.addLayer(afterPositionVector);
			setFont(option.poifont?option.poifont:"fa-pied-piper-alt");
			vector.changed();
			
			//回调-相交更新行政区划
			switch (option.callback) {
			case "queryXZQHByXY":
				queryXZQHByXY(cbkPositionMap["x"],cbkPositionMap["y"]);
				break;
			case "saveposition":
				saveposition(cbkPositionMap["x"],cbkPositionMap["y"]);
				break;

			default:
				break;
			}
			
	});
}

function clearPoi(){
	var mappArr = [];
	mapArr = map.getLayers().array_;
	for(var i = 0 ; i < mapArr.length ; i ++){
		if(mapArr[i].values_.name != '天地图'&&mapArr[i].values_.name != '测绘图层'&&mapArr[i].values_.name != '单选高亮图层'){
			map.removeLayer(mapArr[i]);
		}
	}
	map.renderSync();
}

//地图添加范围过滤，并设定四至范围
function maskFilter(wkt){
	if(wkt){
		var wktformat = new ol.format.WKT();
		var features = new Array();
		var centerArr = null;
		var feature = wktformat.readFeature(wkt);
		centerArr = new ol.extent.getCenter(feature.getGeometry().getExtent());
		features.push(feature);
		filterVector = new ol.layer.Vector({
			name:"Mask Fileter County Vector",
			source : new ol.source.Vector({
				features : features
			}),
			style : new ol.style.Style({
				fill : new ol.style.Fill({
					color : 'rgba(204,204,204,0)'
				}),
				stroke : new ol.style.Stroke({
					color : 'rgba(204,204,204,0)',//red
					width : 0
				})
			})
		});
		map.addLayer(filterVector);
		
		var mask = new ol.filter.Mask({ feature: feature, inner:false, fill: new ol.style.Fill({ color:[255,255,255,1]}) });
		filterVector.addFilter(mask);
		
		var extent = feature.getGeometry().getExtent();
		map.getView().fit(extent, map.getSize());
	}
}
