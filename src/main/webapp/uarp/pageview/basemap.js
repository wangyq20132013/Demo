//参数加载
var mapOption = dataset.mapview[0];
var listOption = (dataset.listview && dataset.listview.length > 0)?dataset.listview[0]:{};

//基础数据加载
var map = null;
var tileUrl = cxt + "/tileServerProxy";
var format = 'image/png';
INCHES_PER_UNIT = {
		'inches' : 1.0,
		'ft' : 12.0,
		'mi' : 63360.0,
		'm' : 39.3701,
		'km' : 39370.1,
		'dd' : 4374754,
		'yd' : 36
	};
var mapParams = {
	"center" : mapOption.center ? mapOption.center : [ 95, 30 ],
	"maxExtent" : mapOption.maxextent ? mapOption.maxextent : [ -180, -90, 180, 90 ],
	"maxViewExtent" : mapOption.maxviewextent ? mapOption.maxviewextent : [ -120, -60, 120, 60 ],
	"bestExtent" : [ 67, 17, 140, 57 ],
	"projection" : mapOption.projection ? mapOption.projection : "EPSG:4326",
	"initZoom" : mapOption.initzoom ? mapOption.initzoom : 4,
	"maxZoom" : mapOption.maxzoom ? mapOption.maxzoom : 15,
	"minZoom" : mapOption.minzoom ? mapOption.minzoom : 2,
	"tileSize" : 256,
	"tilenum" : 16,
	"visible" : false
};
var layerConfig = {
	"baselayer_vector" : [
			addXYZImageLayer( tileUrl + "?T=vec_c&l={l}&x={x}&y={y}", mapParams ),
			addXYZImageLayer( tileUrl + "?T=cva_c&l={l}&x={x}&y={y}", mapParams ) ],
	"baselayer_satellite" : [
			addXYZImageLayer( tileUrl + "?T=img_c&l={l}&x={x}&y={y}", mapParams ),
			addXYZImageLayer( tileUrl + "?T=cia_c&l={l}&x={x}&y={y}", mapParams ) ],
	"baselayer_terrain" : [
			addXYZImageLayer( tileUrl + "?T=ter_c&l={l}&x={x}&y={y}", mapParams ),
			addXYZImageLayer( tileUrl + "?T=cta_c&l={l}&x={x}&y={y}", mapParams ) ]
};
var lastLayer = [];
var defaultLayer = mapOption.defaultlayer ? layerConfig[mapOption.defaultlayer] : layerConfig["baselayer_vector"];
for ( var i=0;i<defaultLayer.length;i++) {
	defaultLayer[i].setVisible(true);
	lastLayer.push(defaultLayer[i]);
}

//空间服务解析arcgisJSON
var esrijsonFormat = new ol.format.EsriJSON();
var linestringVector;//轨迹vector
var globalHeightVector;//高亮vector
var linerMap = {};
var tableLightLayer;
var chartVector;
var filterVector;
$(function() {
	//底图切换初始化
	initChangeMap();
	//底图初始化加载
	initMap();
	//地图工具加载
	initTools();
	//加载位置
	if(mapOption.poioption&&mapOption.pointpoi == true) addpoi(mapOption.poioption);//pointPoi();
	//加载轨迹
//	if(mapOption.linstring&&mapOption.linstring.show == true) lineString(mapOption.linstring);
	//popup
//	if(mapOption.popup&&mapOption.popup != '') popupAnim();
	//是否显示地图切换
	if(mapOption.basechange&&mapOption.basechange == true) $('.tucengkz').show();
	//是否回调位置
	if(mapOption.callbackPosition&&mapOption.callbackPosition["start"] == true) callbackPosition(mapOption.callbackPosition);
	
	
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
}
function switchMap(datatype) {
	for ( var i in lastLayer) {
		lastLayer[i].setVisible(false);
	}
	lastLayer.length = 0;
	var tmpLayer = layerConfig[datatype];
	for ( var i in tmpLayer) {
		tmpLayer[i].setVisible(true);
		lastLayer.push(tmpLayer[i]);
	}
}
//底图初始化
function initMap() {
	var projection = new ol.proj.Projection({
		code : mapParams["projection"],
		units : mapOption.units ? mapOption.units : 'degrees'
	});
	
	var view = new ol.View({
		projection : projection,
		center : mapParams["center"],
		zoom : mapParams["initZoom"],
		maxZoom : mapParams["maxZoom"],
		minZoom : mapParams["minZoom"],
	});
	
	map = new ol.Map({
		controls : ol.control.defaults({
			attribution : false
		}),
		target : 'mapview',
		layers : [],
		view : view
	});
	
	for ( var i in layerConfig) {
		map.addLayer(layerConfig[i][0]);
		map.addLayer(layerConfig[i][1]);
	}
	
//	map.setLayerGroup(new ol.layer.Group({
//		opacity:1,
//		visible:true,
//		zIndex:100,
//		layers:[layerConfig["baselayer_vector"][0],layerConfig["baselayer_vector"][1]]
//	}));
	
}
function addXYZImageLayer(url, mapParams) {
	var projection = ol.proj.get(mapParams.projection);
	var projectionExtent = mapParams.maxExtent ? mapParams.maxExtent : projection
			.getExtent();
	var maxResolution = mapParams.maxResolution ? mapParams.maxResolution
			: (ol.extent.getWidth(projectionExtent) / (mapParams.tileSize * 2));
	var resolutions = new Array(mapParams.tilenum);
	var z;
	for (z = 0; z < mapParams.tilenum; ++z) {
		resolutions[z] = maxResolution / Math.pow(2, z);
	}
	var tileOrigin = ol.extent.getTopLeft(projectionExtent);
	var originFlag = mapParams["originFlag"];
	if (originFlag) {
		if (originFlag == "bottomleft") {
			tileOrigin = ol.extent.getBottomLeft(projectionExtent);
		} else if (originFlag == "bottomright") {
			tileOrigin = ol.extent.getBottomRight(projectionExtent);
		} else if (originFlag == "topright") {
			tileOrigin = ol.extent.getTopRight(projectionExtent);
		}
	}
	var layer = new ol.layer.Tile({
		visible : mapParams.visible,
		extent : mapParams.maxExtent,
		name:"天地图",
		source : new ol.source.TileImage({
			tileUrlFunction : function(tileCoord, pixelRatio, projection) {
				var l = tileCoord[0] + 1;
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
				return url.replace('{l}', l.toString()).replace('{y}',
						y.toString()).replace('{x}', x.toString());
			},
			projection : projection,
			tileGrid : new ol.tilegrid.TileGrid({
				origin : tileOrigin,
				resolutions : resolutions,
				tileSize : mapParams.tileSize
			})
		})
	});
	return layer;
}
//地图工具加载
var map_tools_choose,map_tools_point,map_tools_ledit,map_tools_pedit,map_tools_share,map_tools_globe,map_tools_clear,map_tools_save,map_tools_mapo,map_tools_pointsearch;
var toolsMap = {};
var mainbar;
function initTools() {
	measureSource = new ol.source.Vector({});
	// 地图绘制vector 测距，测面
	vector = new ol.layer.Vector({
		name : '测绘图层',
		source : measureSource,
		style : new ol.style.Style({
			fill : new ol.style.Fill({
				color : 'rgba(238, 238, 238, 0.36)'
			}),
			stroke : new ol.style.Stroke({
				color : '#646464',
				width : 2
			}),
			image : new ol.style.Circle({
				radius : 7,
				fill : new ol.style.Fill({
					color : '#ffcc33'
				})
			})
		})
	});
	map.addLayer(vector);
	// 二维码分享
	map_tools_share = new ol.control.Permalink({ // shareLink
		title : "养护助手",
		onclick : function(url) {
			$('#modal .modal-body').html('<img src="http://172.172.3.108:8080/uadp/qrcodecnt/checkassistant" />');
			$('#modal .modal-title').html('养护助手');
			$('#modal .modal-body').css('text-align','center');
			$('#modal').modal('show');
		}
	});
	toolsMap['share'] = map_tools_share;
	// 全图
	map_tools_globe = new ol.control.ZoomToExtent({
		label : $('.fa-globe')[0],
		tipLabel : "全图",
		extent : [ 115.05716, 39.18131, 117.79651, 41.21872 ]
	});
	toolsMap['globe'] = map_tools_globe;
	// Canvas比例尺
	var canvasScaleline = new ol.control.CanvasScaleLine();
	map.addControl(new ol.control.CanvasScaleLine({
		style:new ol.style.Style({
			fill : new ol.style.Fill({
				color : 'rgba(238, 238, 238, 0.36)'
			}),
			stroke : new ol.style.Stroke({
				color : '#646464',
				width : 2
			}),
			image : new ol.style.Circle({
				radius : 7,
				fill : new ol.style.Fill({
					color : '#ffcc33'
				})
			})
		})
	}));
	// 可编辑bar
	var editbar = new ol.control.Bar({
		toggleOne : true, // true可以确保单一激活
		group : false
	});
	// 地图bar
	if(mapOption.tools["mainbar"] == true){
		mainbar = new ol.control.Bar();
		map.addControl(mainbar);
		mainbar.addControl(editbar);
	}
	
	var sbar = new ol.control.Bar();
	sbar.addControl(new ol.control.TextButton({
		html : '<i class="fa fa-times"></i>',
		title : "删除",
		handleClick : function() {
			var features = selectCtrl.getInteraction().getFeatures();
			if (!features.getLength())
				console.log("Select an object first...");
			else
				console.log(features.getLength() + " object(s) deleted.");
			for (var i = 0, f; f = features.item(i); i++) {
				vector.getSource().removeFeature(f);
			}
			selectCtrl.getInteraction().getFeatures().clear();
		}
	}));
	sbar.addControl(new ol.control.TextButton({
		html : '<i class="fa fa-info"></i>',
		title : "信息展示",
		handleClick : function() {
			switch (selectCtrl.getInteraction().getFeatures().getLength()) {
			case 0:
				console.log("必须先选择一个...");
				break;
			case 1:
				var f = selectCtrl.getInteraction().getFeatures().item(0);
				console.log("Selection is a " + f.getGeometry().getType());
				console.log("Selection's geometry is " + f.getGeometry());
				console.log("Selection's extent is " + f.getGeometry().getExtent());
				break;
			default:
				console.log(selectCtrl.getInteraction().getFeatures().getLength() + " objects seleted.");
				break;
			}
		}
	}));

	map_tools_choose = new ol.control.Toggle({
		html : '<i class="fa fa-hand-pointer-o"></i>',
		title : "选择",
		interaction : new ol.interaction.Select(),
		bar : sbar,
		active : false
	});
	toolsMap['choose'] = map_tools_choose;

	// 绘制工具
	map_tools_point = new ol.control.Toggle({
		html : '<i class="fa fa-map-marker" ></i>',
		title : '绘点',
		interaction : new ol.interaction.Draw({
			type : 'Point',
			source : vector.getSource()
		})
	});
	toolsMap['point'] = map_tools_point;
	
	var drawStyle = new ol.style.Style({// 绘制几何图形的样式
		fill : new ol.style.Fill({
			color : 'rgba(255, 255, 255, 0.2)'
		}),
		stroke : new ol.style.Stroke({
			color : 'rgba(0, 0, 0, 0.5)',
			lineDash : [ 10, 10 ],
			width : 2
		}),
		image : new ol.style.Circle({
			radius : 5,
			stroke : new ol.style.Stroke({
				color : 'rgba(0, 0, 0, 0.7)'
			}),
			fill : new ol.style.Fill({
				color : 'rgba(255, 255, 255, 0.2)'
			})
		})
	});

	var lineDraw = new ol.interaction.Draw({
		type : 'LineString',
		source : vector.getSource(),
		style : drawStyle
	});
	lineDraw.on('drawstart', function(evt) {
		$("#measureResult").remove(); // 计算结果---empty()会存在多个
		measureSource.clear(); // 绘制结果
		sketch = evt.feature;
		var geom = evt.feature.getGeometry(); // 得到绘制Geometry
		// 添加计算结果Div
		$("#mapview").append('<div id="measureResult"></div>');
		measureResult = new ol.Overlay({
			position : geom.getCoordinates()[0],
			positioning : 'bottom-center',
			element : document.getElementById('measureResult')
		});
		map.addOverlay(measureResult);
		geom.on('change', function(e) {
			console.log(e);
			var inPerDisplayUnit = INCHES_PER_UNIT['m'];
			var length = geom.getLength();
			if (inPerDisplayUnit) {
				var inPerMapUnit = INCHES_PER_UNIT['dd'];
				length *= (inPerMapUnit / inPerDisplayUnit);
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

	map_tools_ledit = new ol.control.Toggle({
		html : '<i class="fa fa-magic" ></i>',
		title : '测距',
		interaction : lineDraw,
		bar : new ol.control.Bar({
			controls : [ new ol.control.TextButton({
				html : '×',
				title : "撤销",
				handleClick : function() {
					if (map_tools_ledit.getInteraction().sketchCoords_.length <= 2) {
						$("#measureResult").html('');
					}
					map_tools_ledit.getInteraction().removeLastPoint();
				}
			}), new ol.control.TextButton({
				html : '√',
				title : "完成",
				handleClick : function() { 
					var drawi = map_tools_ledit.getInteraction();
					var lkey = drawi.on('drawend', function(e) {
						drawi.unByKey(lkey);
						var c = e.feature.getGeometry().getCoordinates();
						if (c.length < 2) {
							throw "Bad LineString";
						}
					});
					try {
						drawi.finishDrawing();
					} catch (e) {
						drawi.unByKey(lkey);
					}
				}
			}) ]
		})
	});
	toolsMap['ledit'] = map_tools_ledit;
	var polygonDraw = new ol.interaction.Draw({
		type : 'Polygon',
		source : vector.getSource(),
		style : drawStyle
	});

	polygonDraw.on('drawstart', function(evt) {
		$("#measureResult").remove();
		measureSource.clear();
		sketch = evt.feature;
		var geom = evt.feature.getGeometry(); // 得到绘制Geometry
		// 添加计算结果Div
		$("#mapview").append('<div id="measureResult"></div>');
		measureResult = new ol.Overlay({
			offset : [ 0, -15 ],
			positioning : 'bottom-center',
			element : document.getElementById('measureResult')
		});
		map.addOverlay(measureResult);
		geom.on('change',
				function(e) {
					console.log(e);
					// 面
					var inPerDisplayUnit = INCHES_PER_UNIT['m'];
					var area = geom.getArea();
					if (inPerDisplayUnit) {
						var inPerMapUnit = INCHES_PER_UNIT['dd'];
						area *= Math.pow((inPerMapUnit / inPerDisplayUnit), 2);
						area = area * 0.0015;
					}
					// 填充计算结果
					if (area < 1000) {
						$("#measureResult").html(area.toFixed(2) + "亩");
					} else if (area < 10000) {
						$("#measureResult").html(
								(area / 1000).toFixed(2) + "千亩");
					} else if (area < 100000) {
						$("#measureResult").html(
								(area / 10E5).toFixed(2) + "万亩");
					} else {
						$("#measureResult").html(
								(area / 10E5).toFixed(2) + "万亩");
					}
					measureResult.setPosition(geom.getInteriorPoint()
							.getCoordinates());
				});
	}, this);

	map_tools_pedit = new ol.control.Toggle({
		html : '<i class="fa fa-bookmark-o fa-rotate-270" ></i>',
		title : '测面',
		interaction : polygonDraw,
		bar : new ol.control.Bar({
			controls : [ new ol.control.TextButton({
				html : '×',// '<i class="fa fa-mail-reply"></i>',
				title : "撤销",
				handleClick : function() {
					map_tools_pedit.getInteraction().removeLastPoint();
				}
			}), new ol.control.TextButton({
				html : '√',
				title : "完成",
				handleClick : function() { // Prevent null objects on
											// finishDrawing
					var drawi = map_tools_pedit.getInteraction();
					var lkey = drawi.on('drawend', function(e) {
						drawi.unByKey(lkey);
						var c = e.feature.getGeometry().getCoordinates();
						if (c[0].length < 4) {
							throw "Bad Polygon";
						}
					});
					try {
						drawi.finishDrawing();
					} catch (e) {
						drawi.unByKey(lkey);
					}
				}
			}) ]
		})
	});
	toolsMap['pedit'] = map_tools_pedit;
	
	map_tools_save = new ol.control.Button({
		html : '<i class="fa fa-download"></i>',
		title : "保存",
		handleClick : function(e) {
			var json = new ol.format.GeoJSON().writeFeatures(vector.getSource()
					.getFeatures());
			console.log(json);
		}
	});
	toolsMap['save'] = map_tools_save;

	map_tools_mapo = new ol.control.Button({
		html : '<i class="fa fa-map-o"></i>',
		title : "图层叠加",
		handleClick : function(e) {
			var status = $("#type_div", window.parent.document).find("span")
					.attr("title");
			if (status == '隐藏') {
				$("#switch-panel", window.parent.document).animate({
					left : '-500px',
					opacity : '0'
				}, 500);
				$("#switch-panel", window.parent.document).css('display','none');
				$("#type_div", window.parent.document).find("span").attr(
						"title", "显示");
				$("#type_div", window.parent.document).find("span")
						.removeClass("glyphicon-chevron-left");
				$("#type_div", window.parent.document).find("span").addClass(
						"glyphicon-chevron-right");
			} else {
				$("#switch-panel", window.parent.document).css('display','block');
				$("#switch-panel", window.parent.document).animate({
					left : '22%',
					opacity : '1'
				}, 500);
				$("#type_div", window.parent.document).find("span").attr(
						"title", "隐藏");
				$("#type_div", window.parent.document).find("span")
						.removeClass("glyphicon-chevron-right");
				$("#type_div", window.parent.document).find("span").addClass(
						"glyphicon-chevron-left");
			}
		}
	});
	toolsMap['mapo'] = map_tools_mapo;

	map_tools_clear = new ol.control.Button({
		html : '<i class="fa fa-trash"></i>',
		title : "清除",
		handleClick : function() {
			$("#mapview").css('cursor', '-webkit-grab');
			type_ = "clear";
			$("#measureResult").remove();
			measureSource.clear();
			map.removeLayer(linestringVector);
			map.removeLayer(chartVector);
		}
	});
	toolsMap['clear'] = map_tools_clear;
	
	map_tools_pointsearch = new ol.control.Button({
		html : '<i class="fa fa-hand-o-down"></i>',
		title : "点查询",
		handleClick : function() {
			pointSearch();
		}
	});
	toolsMap['pointsearch'] = map_tools_pointsearch;
	
	var charts = new ol.control.Button({
				html : '<i class="fa fa-search"></i>',
				title : "地图标点图",
				handleClick : function() {
					if (chartVector)
						map.removeLayer(chartVector);
					var animation = false;
					var styleCache = {};
					var chartType = 'pie3D';
					function getFeatureStyle(feature, sel) {
						var k = chartType + "-" + "Classic" + "-" + (sel ? "1-" : "") + feature.get("data");
						var style = styleCache[k];
						if (!style) {
							var radius = 15;
							if (chartType != "bar") {
								radius = 8 * Math.sqrt(feature.get("size")/ Math.PI);
							}
							var c = "Classic";
							styleCache[k] = style = new ol.style.Style({
										image : new ol.style.Chart({
											type : chartType,
											radius : (sel ? 1.2 : 1)* radius,
											offsetY : chartType == 'pie' ? 0 : (sel ? -1.2 : -1)* feature.get("radius"),
											data : feature.get("data") || [ 10, 30, 20 ],
											colors : /,/.test(c) ? c.split(",") : c,
											rotateWithView : true,
											animation : animation,
											stroke : new ol.style.Stroke({
												color : "Classic" != "neon" ? "#fff" : "#000",
												width : 2
											}),
										})
									});
						}
						style.getImage().setAnimation(animation);
						return [ style ];
					}

					// 随机产生feature拼凑geometry
					var ext = map.getView().calculateExtent(map.getSize());
					var features = [];
					for (var i = 0; i < 16; ++i) {
						var n, nb = 0, data = [];
						for (var k = 0; k < 4; k++) {
							n = Math.round(8 * Math.random());
							data.push(n);
							nb += n;
						}
						features[i] = new ol.Feature({
							geometry : new ol.geom.Point([
											ext[0] + (ext[2] - ext[0])
													* Math.random(),
											ext[1] + (ext[3] - ext[1])
													* Math.random() 
										]),
							data : data,
							size : nb
						});
					}
					chartVector = new ol.layer.Vector({
						name : "echart图层",
						source : new ol.source.Vector({
							features : features
						}),
						renderOrder : ol.ordering.yOrdering(),
						style : function(f) {
							return getFeatureStyle(f, true);
						}
					})
					map.addLayer(chartVector);

					// Control Select
					var select = new ol.interaction.Select({
						style : function(f) {
							return getFeatureStyle(f, true);
						}
					});
					map.addInteraction(select);

					select.getFeatures().on([ 'add', 'remove' ],function(e) {
						if (e.type == "add")
							console.log("Selection data: "+ e.element.get("data").toString());
						// else $("#select").console.log("No
						// selection");
					})

					// Animate function
					var listenerKey;
					function doAnimate() {
						if (listenerKey)
							return;
						var start = new Date().getTime();
						var duration = 1000;
						animation = 0;
						listenerKey = vector.on('precompose', function(event) {
							var frameState = event.frameState;
							var elapsed = frameState.time - start;
							if (elapsed > duration) {
								ol.Observable.unByKey(listenerKey);
								listenerKey = null;
								animation = false;
							} else {
								animation = ol.easing.easeOut(elapsed
										/ duration);
								frameState.animate = true;
							}
							chartVector.changed();
						});
						chartVector.changed();
						// map.renderSync();
					}

					doAnimate();
				}
			});
	
	map.addControl(new ol.control.MousePosition({
		undefinedHTML : 'outside',
		projection : 'EPSG:4326',
		// 鼠标移动获取位置
		coordinateFormat : function(coordinate) {
			return ol.coordinate.format(coordinate, '{x}, {y}', 5);
		},
	}));
	$(".ol-mouse-position").css('opacity', '0');
	
	if(mapOption.tools){
		for(var key in mapOption["tools"]){
			if(mapOption["tools"][key] == true&&key != "mainbar") editbar.addControl(toolsMap[key]);
		}
		
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
	console.log(labelTextMap);
	
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

function globalHeight(option,row){
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
				lightWkt.push(data.data[0].WKT);
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
	if(features && features.length > 0) {
		map.addLayer(globalHeightVector);
		map.getView().setCenter(ol.extent.getCenter(features[0].getGeometry().getExtent()));
		map.getView().setZoom(16);
	}
}

function clearPoi(){
	var mappArr = [];
	mapArr = map.getLayers().a;
	for(var i = 0 ; i < mapArr.length ; i ++){
		if(mapArr[i].T.name != '天地图'&&mapArr[i].T.name != '测绘图层'&&mapArr[i].T.name != '单选高亮图层'){
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