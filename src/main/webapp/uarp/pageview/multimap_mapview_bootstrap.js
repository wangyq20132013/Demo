//参数加载

var	mapOption = readMapOption(dataset.mapview);

/**
 * mapObject  
 * view map layers tools 未来开发将都添加到这个对象中,避免过多的全局变量
 */
var mapObject = {};
var view = null;
var map = null;
var switchmapwrapper = {};
var layers = {};

//基础数据加载

$(function(){
	
	//底图切换初始化
	initChangeMap();
	
	//初始化ol map
	map = initMap();
	
	for(var i in mapObject.mapId_Arr){
		//createSwitchLayerPanel(mapObject.mapId_Arr[i],dataset.listview[0].data,'aaa');
		//createSwitchLayerPanel(mapObject.mapId_Arr[i],dataset.listview[1].data,'ccc');
	}
	
	
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
	
});

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
/*//地图工具加载
var map_tools_olchart,map_tools_choose,map_tools_ledit,map_tools_pedit,map_tools_share,
map_tools_globe,map_tools_fullScreen,map_tools_clear,map_tools_export,map_tools_save,map_tools_mapo,
map_tools_pointsearch,map_tools_boxsearch,map_tools_polygon,search,map_tools_move,map_tools_measureline,map_tools_measurearea;*/
var toolsMap = {};
var mainbar;
var editbar;

/**
 * 读取 mapview 配置参数
 * @param {Object} config
 */
function readMapOption(mapOption){
	var _mapOption = {};
	if(!mapOption.type){  //兼容json配置
		mapOption = mapOption[mapType];
		_mapOption.type = mapType;
		_mapOption.view = {};
		
		_mapOption.view.extent = mapOption.extent;
		_mapOption.view.projection = mapOption.projection;
		_mapOption.view.resolutions = mapOption.resolutions;
		_mapOption.view.center = mapOption.center;
		_mapOption.view.zoom = mapOption.initzoom;
		_mapOption.view.minResolution = mapOption.minResolution;
		_mapOption.view.maxResolution = mapOption.maxResolution;
		_mapOption.view.format = mapOption.format;
		_mapOption.view.matrixset = mapOption.matrixset;
		
		_mapOption.maps = [];
		var map = {};
		map.wmtsurl = mapOption.wmtsurl;
		map.wmtslayers = mapOption.wmtslayers;
		map.baselayer_vector = mapOption.baselayer_vector;
		map.baselayer_satellite = mapOption.baselayer_satellite;
		map.defaultlayer = mapOption.defaultlayer;
		_mapOption.maps.push(map);
		
		return _mapOption;
	}else{
		return mapOption;
	}
	
	if(mapOption.type == 'gwc'){
		
	}else if(mapOption.type == 'tianditu'){
		
	}
	
	return mapOption;
}

//初始化 ol view
function initView(){
	var type = mapOption.type;
	var viewOption = mapOption.view;
	
	var view = null;
	
	
	//gwc viw 配置
	var gwc_viewOption = function(viewOption){
		var option = {};
		
		var projectionOption = viewOption.projection;
		if (projectionOption.proj4) {
			proj4.defs(projectionOption.code,projectionOption.proj4);
		};
		var projectionExtent = projectionOption.extent;
		
		option.projection = new ol.proj.Projection({
			"code":projectionOption.code, 
			"units":projectionOption.units, 
			"extent": projectionOption.extent
		});
		
		option.center = viewOption.center;
		option.zoom = viewOption.center;
		option.minResolution = viewOption.minResolution;
		option.maxResolution = viewOption.maxResolution;
		
		return option;
	}
	
	//天地图 view 配置
	var tianditu_viewOption = function(viewOption){
		var option = {};
		var projectionOption =  viewOption.projection ? viewOption.projection : "EPSG:4326";
		
		option.projection = new ol.proj.Projection({
			code : "EPSG:4326",
			units : 'degrees'
		});
		
		option.projection = new ol.proj.Projection({
			"code":projectionOption.code, 
			"units":projectionOption.units
		});
		
		option.center = viewOption.center ? viewOption.center : [ 95, 30 ];
		
		option.zoom = viewOption.initzoom ? viewOption.initzoom : 4;
		option.maxZoom = viewOption.maxZoom ? viewOption.maxZoom :15;
		option.minZoom = viewOption.minZoom ? viewOption.minZoom :2;
		/*option.tileSize = 256;
		option.tilenum = 16;
		option.visible = true;*/
		
		return option;
	}
	
	if(type == 'gwc'){
		view = new ol.View(gwc_viewOption(viewOption));
	}else if(type == 'tianditu'){
		view = new ol.View(tianditu_viewOption(viewOption));
	}
	mapObject.view = view;
	
	return view;
}
/**
 * 初始化map容器
 * @param int number map数量
 * 返回  mapId_Arr
 */
function initmapContainer(number){
	if(number == 1){
		var $map = $("<div id='map' class='map onemap'></div>");
		$("#mapview").find(".map").remove(".map").end().append($map);
		return ['map'];
	}else if(number == 2){
		var $left_map = $("<div id='left_map' class='map left_map'></div>");
		var $right_map = $("<div id='right_map' class='map right_map'></div>");
		$("#mapview").find(".map").remove(".map").end().append($left_map).append($right_map);
		return ['left_map','right_map'];
	}else if(number > 2 && number <=4){
		var $top_left_map = $("<div id='top_left_map' class='map top_left_map'></div>");
		var $top_right_map = $("<div id='top_right_map' class='map top_right_map'></div>");
		var $bottom_left_map = $("<div id='bottom_left_map' class='map bottom_left_map'></div>");
		var $bottom_right_map = $("<div id='bottom_right_map' class='map bottom_right_map'></div>");
		$("#mapview").find(".map").remove(".map").end().append($top_left_map).append($top_right_map).append($bottom_left_map).append($bottom_right_map);
		return ['top_left_map','top_right_map','bottom_left_map','bottom_right_map'];
	}else{
		console.error('不支持的地图容器数量！！！！');
		return false;
	}
	
	return ['map'];
}
//底图初始化
function initMap() {
	view = initView();
	var _map = null;
	
	if(mapOption.maps){
		_map = {};
		var maps = mapOption.maps;
		var mapId_Arr = initmapContainer(mapOption.mapNumber);
		mapObject.mapId_Arr = mapId_Arr;
		
		for(var i = 0;i < maps.length;i++){
			var map = new ol.Map({
				target: mapId_Arr[i],
				controls: ol.control.defaults({
					attribution : false
				}),
				layers: [],
				view: view
			});
			
			var scaleLineControl = new ol.control.ScaleLine({});
			scaleLineControl.setUnits('metric'); //'degrees', 'imperial', 'nautical', 'metric', 'us'.
			map.addControl(scaleLineControl);
			
			var layerUrl = maps[i].layerurl;
			if(layerUrl == undefined){
				layerUrl = mapOption.layerurl;
			}else if(layerUrl && layerUrl.indexOf("http://") == -1){
				try{
					layerUrl = gwcwmtsurl + layerUrl;
				}catch(e){
					layerUrl = cxt + layerUrl;
				}
			}
			
			var layertype = maps[i].layertype;
			
			if(!layertype){
				continue;
			}
			var layernames = maps[i].layernames;
			var baselayer_vector = maps[i].baselayer_vector;
			var baselayer_satellite = maps[i].baselayer_satellite;
			var defaultlayer = maps[i].defaultlayer;
			var originFlag = maps[i].originFlag;
			
			for(var j = 0;j < layernames.length;j++){
				var map_layer = layers[layernames[j]];
				if(!map_layer){
					if(layertype == "wmts"){
						map_layer = getWmtsLayer(layerUrl, layernames[j],originFlag);
					}else if(layertype == "tianditu"){
						map_layer = getXYZImageLayer(layerUrl, layernames[j],originFlag);
					}
					layers[layernames[j]] = map_layer;
				}
				if(layernames[j] == baselayer_vector) {
					switchmapwrapper["baselayer_vector"] = map_layer;
				}else if(layernames[j] == baselayer_satellite) {
					switchmapwrapper["baselayer_satellite"] = map_layer;
				}
				
				map.addLayer(map_layer);
				
			}
			
			switchMap(defaultlayer);
			
			_map[mapId_Arr[i]] = map;
		}
		if(maps.length > mapId_Arr.length){
			for(var i = 0;i < mapObject.mapId_Arr.length;i++){
				createSwitchLayerPanel(mapObject.mapId_Arr[i], maps,'base');
			}
		}
	}
	
	return (Object.getOwnPropertyNames(_map).length == 1?_map['map']:_map);
}

function getWmtsLayer(wmtsUrl, wmtsLayer){
	var matrixSet = mapOption.view.matrixset;
	var projection = view.getProjection();
	var resolutions = mapOption.view.resolutions;
	var format = mapOption.view.format;
	var extent = mapOption.view.extent;
	var style = mapOption.view.style;
	var matrixIds = [];
	for (var i = 0; i < resolutions.length; i++) {
		matrixIds.push(matrixSet + ":" + i);
	}
	
	var wmtsSource = new ol.source.WMTS({
        url: wmtsUrl,
        layer: wmtsLayer,
        matrixSet: matrixSet,
        format: format,
        projection: projection,
        tileGrid: new ol.tilegrid.WMTS({
          origin: ol.extent.getTopLeft(extent),
          resolutions: resolutions,
          matrixIds: matrixIds
        }),
        style: style,
        wrapX: true
    });
    
	//创建wmts图层
	var wmtsLayer = new ol.layer.Tile({
		opacity: 1,
	    source: wmtsSource
	});
	
	return wmtsLayer;
}
function getXYZImageLayer(url, layername, originFlag) {
	debugger;
	url = url.replace('{layername}', layername)
	
	var projection = view.getProjection();
	var extent = mapOption.view.extent;
	var projectionExtent = mapOption.view.extent;
	
	var resolutions = mapOption.view.resolutions;
	
	var maxResolution = mapOption.view.maxResolution ? mapOption.view.maxResolution
			: (ol.extent.getWidth(projectionExtent) / (mapOption.view.tileSize * 2));
	var resolutions = new Array(mapOption.view.tilenum);
	var z;
	for (z = 0; z < mapOption.view.tilenum; ++z) {
		resolutions[z] = maxResolution / Math.pow(2, z);
	}
	var tileOrigin = ol.extent.getTopLeft(projectionExtent);
	if (originFlag) {
		if (originFlag == "bottomleft") {
			tileOrigin = ol.extent.getBottomLeft(projectionExtent);
		} else if (originFlag == "bottomright") {
			tileOrigin = ol.extent.getBottomRight(projectionExtent);
		} else if (originFlag == "topright") {
			tileOrigin = ol.extent.getTopRight(projectionExtent);
		}
	}
	
	var tilelayer = new ol.layer.Tile({
		visible : mapOption.view.visible,
		extent : mapOption.view.extent,
		name:"天地图",
		source : new ol.source.TileImage({
			tileUrlFunction : function(tileCoord, pixelRatio, projection) {
				var z = tileCoord[0] + 1;
				var x = tileCoord[1];
				var y = -tileCoord[2] - 1;
				if (originFlag && originFlag == "bottomleft") {
					y = tileCoord[2];
				}
				var n = Math.pow(2, z + 1);
				x = x % n;
				if (x * n < 0) {
					x = x + n;
				}
				return url.replace('{z}', z.toString()).replace('{y}',
						y.toString()).replace('{x}', x.toString());
			},
			projection : projection,
			tileGrid : new ol.tilegrid.TileGrid({
				origin : tileOrigin,
				resolutions : resolutions,
				tileSize : mapOption.view.tileSize
			})
		})
	});
	
	return tilelayer;
}
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
		if(i == datatype) {
			switchmapwrapper[i].setVisible(true);
		} else {
			switchmapwrapper[i].setVisible(false);
		}
	}
}
/**
 * 创建切换图层面板
 */
function createSwitchLayerPanel(mapId, data, title){
	var num = (Math.random()*100).toFixed(0);
	var $panel = $("#"+mapId).find(".switchLayer-panel");
	var $panel_body = null;
	if($panel.length == 0){
		//如果没有则创建 列表
		$panel = $("<div class='popover right tabpanel switchLayer-panel'></div>");
		$panel_body = $("<div id='"+title+num+"' title='"+title+"' class='panel-body'></div>");
		$panel.append($panel_body);
	}else{
		var $tab_list = $panel.find(".nav-tabs");
		var $tab_content = $panel.find(".tab-content");
		title = (title == undefined?'对比':title);
		//如果再次创建 则把单列表转化为tab标签页
		if($tab_list.length == 0){
			$panel_body = $panel.find(".panel-body");
			var $tab_list = $("<ul class='nav nav-tabs'></ul>");
			var $tab_content = $("<div class='tab-content'></div>");
			$tab_list.append("<li class='active'><a href='#"+$panel_body.attr("id")+"' aria-controls='"+$panel_body.attr("id")+"' data-toggle='tab'>"+$panel_body.attr("title")+"</a></li>");
			$tab_list.append("<li><a href='#"+title+num+"' aria-controls='"+title+num+"' data-toggle='tab'>"+title+"</a></li>");
			
			$panel_body.addClass("tab-pane active");
			$tab_content.append($panel_body);
			$panel_body = $("<div id='"+title+num+"' class='panel-body tab-pane'></div>")
			$tab_content.append($panel_body);
			
			$panel.append($tab_list).append($tab_content);
		}else{
			//如果继续创建 则追加tab标签页
			$tab_list.append("<li><a href='#"+title+num+"' aria-controls='"+title+num+"' data-toggle='tab'>"+title+"</a></li>");
			$panel_body = $("<div id='"+title+num+"' class='panel-body tab-pane'></div>")
			$tab_content.append($panel_body);
		}
	}
	
	$.each(data, function(i,item) {
		var $input = $("<input type='checkbox' class='"+(item.title?item.title:item.TITLE)+"' />").data("data",item);
		$input.on("click",function(){
			var data = $(this).data("data");
			data.checked = $(this).is(":checked");
			var mapId = $($(this).parentsUntil(".map").parent()[0]).attr("id");
			if(data.checked == true){
				$("."+$(this).attr("class")).attr("disabled",true);
				$(this).parent().parent().parent().find("input[type='checkbox']").attr("disabled",true);
				$(this).attr("disabled",false);
			}else{
				$(this).parentsUntil(".panel-body").parent().find("input[type='checkbox']").attr("disabled",false);
				$("."+$(this).attr("class")).attr("disabled",false);
			}
			switchLayer(map[mapId],data);
		});
		
		var $item = $("<div class='checkbox'><label></label></div>");
		$item.find("label").append($input).append((item.title?item.title:item.TITLE));
		$panel_body.append($item);
	});
	$("#"+ mapId).append($panel);
	
	return $panel_body;
}
/**
 * 切换 图层
 * @param {Object} map   ol map对象
 * @param {Object} data   
 */
function switchLayer(map, data){
	var layername = data.layername;
	var layerurl = data.layerurl;
	var layertype = data.layertype;
	if(data.checked == true){
		if(layerurl.indexOf("http://") == -1){
			layerurl = gwcwmtsurl + layerurl;
		}
		var layer = getWmtsLayer(layerurl, data.name);
		map.addLayer(layer);
		layers[layername] = layer;
	}else{
		map.removeLayer(layers[layername]);
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
