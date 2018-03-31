function layerControl(){
	var layer_div = $("<div class='ol-control'></div>");
	var btn = $("<button type='button' class='ol-bottom'></button>");
	layer_div.append(btn);
	$(".ol-overlaycontainer-stopevent").append(layer_div);
}

var convertData = function(geoCoordMap, data) {
	var res = [];
	for(var i = 0; i < data.length; i++) {
		var geoCoord = geoCoordMap[data[i].name];
		if(geoCoord) {
			res.push({
				name: data[i].name,
				value: geoCoord.concat(data[i].value)
			});
		}
	}
	return res;
};
/*
 * 移动到指定位置
 */
function moveIn(center, zoom, extent,callback){
	var view = map.getView();
	var beforeZoom = ol.animation.zoom({
		duration: 1000,
		resolution: view.getResolution()
	});
	var pan = ol.animation.pan({
		duration: 1000,
		source: (view.getCenter())
	});
	
	map.beforeRender(pan);
	map.beforeRender(beforeZoom);
	if(center) view.setCenter(center);
	if(zoom) view.setZoom(zoom);
	if(extent) view.fit(extent, map.getSize());
	
	if(callback&&typeof callback == 'function') callback();
}
/**
 * 图层叠加
 */
function mapo() {
	var status = $("#type_div", window.parent.document).find("span").attr("title");
	if(status == '隐藏') {
		$("#switch-panel", window.parent.document).animate({
			left: '-500px',
			opacity: '0'
		}, 500);
		$("#switch-panel", window.parent.document).css('display', 'none');
		$("#type_div", window.parent.document).find("span").attr(
			"title", "显示");
		$("#type_div", window.parent.document).find("span")
			.removeClass("glyphicon-chevron-left");
		$("#type_div", window.parent.document).find("span").addClass(
			"glyphicon-chevron-right");
	} else {
		$("#switch-panel", window.parent.document).css('display', 'block');
		$("#switch-panel", window.parent.document).animate({
			left: '22%',
			opacity: '1'
		}, 500);
		$("#type_div", window.parent.document).find("span").attr(
			"title", "隐藏");
		$("#type_div", window.parent.document).find("span")
			.removeClass("glyphicon-chevron-right");
		$("#type_div", window.parent.document).find("span").addClass(
			"glyphicon-chevron-left");
	}
}

function test1() {
	$.get(cxt + "/develop/sco3/tes_ol3echarts.json", function(data) {
		option = {
			backgroundColor : '#404a59',
			title: {
				text: '模拟迁徙',
				subtext: '数据纯属虚构',
				left: 'center',
				textStyle: {
					color: '#fff'
				}
			},
			openlayers: {
				// 百度地图中心经纬度
				center: [120.13066322374, 30.240018034923],
				// 百度地图缩放
				zoom: 2,
				// 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
				roam: true,
				//地图对象字符串，echart默认不接受复杂对象
				//mapobj: 'map'
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				y: 'bottom',
				x: 'right',
				data: ['pm2.5', 'pm2.5'],
				textStyle: {
					color: '#fff'
				}
			},
			  visualMap: {
			    min: 0,
			    max: 500,
			    splitNumber: 5,
			    inRange: {
			        color: ['#d94e5d','#eac736','#50a3ba'].reverse()
			    },
			    textStyle: {
			        color: '#000'
			    }
			},
			series: [{
				name: 'pm2.5',
				type: 'scatter',
				coordinateSystem: 'openlayers',
				data: convertData(data.geoCoordMap, data.data),
				symbolSize: function(val) {
					return val[2] / 10;
				},
				showEffectOn: 'emphasis',
				rippleEffect: {
					brushType: 'stroke'
				},
				hoverAnimation: true,
				label: {
					normal: {
						formatter: '{b}',
						position: 'right',
						show: false
					},
					emphasis: {
						show: true
					}
				},
				itemStyle: {
					normal: {
						color: 'red',
						shadowBlur: 10,
						shadowColor: '#333'
					}
				},
				zlevel: 1
			}]
		};
		addEchartsLayer(option)
	});

}
/**
 * 添加echarts统计图层
 * @param {Object} option
 */
function addEchartsLayer(option){
	map_dom = document.getElementById("map");
	var dom = document.createElement('div');
	dom.style.position = 'absolute';
	dom.style.top = "0px";
	dom.style.left = "0px";
	dom.style.zIndex = "98";
	dom.style.width = map_dom.offsetWidth + "px";
	dom.style.height = map_dom.offsetHeight + "px";
	map_dom.children[map_dom.children.length-1].appendChild(dom);
	myChart = echarts.init(dom);
	myChart.setOption(option);
}

/**
 * 绘点通用方法
 */
var draw = null;
function drawPoint(option){
	if(draw == null){
		addIcon(option.feature);
		if(option.type== undefined || option.type == 'MultiPoint'){
			draw = new ol.interaction.Draw({
				source: addresult.source,
				type:'MultiPoint',
				style:new ol.style.Style({
					fill: new ol.style.Fill({
	                    color: 'rgba(255, 0, 0, 0.2)'
	                }),
	                stroke: new ol.style.Stroke({
	                    color: '#ffcc33',
	                    width: 2
	                }),
					image: new ol.style.Icon(({
						anchor: [0.5, 1],
						scale: 1,
						src:  cxt+"/images/marker0.png"
					}))
				})
			});
		}else if(option.type == 'MultiPolygon'){
			draw = new ol.interaction.Draw({
				source: addresult.source,
				type:'MultiPolygon',
				style: new ol.style.Style({
					fill: new ol.style.Fill({
	                    color: 'rgba(255, 0, 0, 0.2)'
	                }),
	                stroke: new ol.style.Stroke({
	                    color: '#f90000',
	                    width: 2
	                }),	
					image: new ol.style.Circle({
	                    radius: 5,
	                    fill: new ol.style.Fill({
	                        color: '#f90000'
		                })
	                })
				})
			});
			draw.on("drawstart",function(evt){
				addresult.source.clear();
			})
		}
		draw.on("drawend",function(evt){
			addresult.source.clear();
			var feature = evt.feature;
			typeof(option.callback == "function")?option.callback(feature):false;
		})
		map.addInteraction(draw);
		draw.setActive(option.active != undefined?option.active:true);
	}else{
		var status = draw.getActive();
		draw.setActive(!status);
	}
}

/**
 * 添加定位图标
 */
var addresult = null;
function addIcon(features) {
	if(addresult == null){
		var vectorSource = new ol.source.Vector();
		if(features != undefined && features.length == undefined){
			vectorSource.addFeature(features);
		}else if(features != undefined && features.length >0){
			for(var i=0;i<features.length;i++){
				vectorSource.addFeature(features[i]);
			}
		}
		var vectorLayer = new ol.layer.Vector({
			source: vectorSource,
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
		map.addLayer(vectorLayer);
		
		addresult = {
			source: vectorSource,
			layer: vectorLayer
		};
	}else{
		if(features != undefined && features.length == undefined){
			addresult.source.addFeature(features);
		}else if(features != undefined && features.length >0){
			for(var i=0;i<features.length;i++){
				addresult.source.addFeature(features[i]);
			}
		}
	}
}

//-----------------------------------------------------------------------------------------------------------------
/**
 * @param points  like [[116,39],[116,39],...]  参数格式以实际数据为准
 * @author wu
 * @description 地图点聚合
 * */
var clusterSelect = null;
var hoverSelect = null;
clusterVector = null;
var chartPopup = null;
//var radiusArr = [10,15,20,25,30,35,40];  

//2017-11-29 修改 by wuhl
var radiusArr = [15,18,24,28,30,35,40];  
var sizeArr = [1000,2000,5000,10000,15000,18000];
//var colorArr = ["#e6782a","#ff7800","#e76464","#dd5050","#d40909","#a70505","#A52A2A"];
var colorArr = ["red","red","red","red","red","red","red"];
function addCluster(dataArr,legendshow){
	sizeArr = [1000,2000,5000,10000,15000,18000];
	if(clusterVector!=null){
		map.removeLayer(clusterVector);
	}
	if(clusterSelect!=null){
		map.removeInteraction(clusterSelect);
	}
	if(hoverSelect!=null){
		map.removeInteraction(hoverSelect);
	}
	var features = new Array();
	var totalcount = 0;
	$.each(dataArr,function(index,value){
		var centerArr = new Array();
		var Arr = null;
		if(value.CENTER!=""&&value.CENTER!=null){
			Arr = value.CENTER.split(",");
			centerArr.push(parseFloat(Arr[0]));
			centerArr.push(parseFloat(Arr[1]));
		}
		if(centerArr.length>0){
			var geom = new ol.geom.Point(centerArr);
			var feature1 = new ol.Feature(geom);
			feature1.set("ID",value.ID,true);
			feature1.set("VECTORID",value.VECTORID,true);
			feature1.set("COUNT",value.COUNT,true);
			feature1.set("VECTORTYPE","CLUSTER",true);
			features.push(feature1);
			totalcount += value.COUNT;
		}
	});
	var source = new ol.source.Vector({
		features:features
	});
	
	var clusterSource = new ol.source.Cluster({
		distance : 100,
		source : source
	});
	
	clusterVector = new ol.layer.Vector({
		name:"clusterVector",
		source : clusterSource,
		style : function(feature){
			return getSelectedStyle(feature,false,totalcount);
		} 
	});
	var colorlen = colorArr.length;
	if(totalcount && totalcount != 0 && totalcount > colorlen){
		sizeArr = [];
		var len = parseInt(totalcount/(colorlen - 1));
		if(len != 0){
			for(var i=0;i <= totalcount;i +=len){
				sizeArr.push(i);
			}
		}
	}
	
	map.addLayer(clusterVector);
	
	if(legendshow == true){
		renderLayerLengend('资产数量','COUNT',radiusArr,sizeArr,colorArr);
	}
}

//聚合点选中样式
function getSelectedStyle(feature,ifStroke){
	if(clusterVector == null){
		return;
	}
	var size = 0;
	var features = feature.get('features');
	$(features).each(function(index,value){
		size+= value.get('COUNT');
	});
	if (size.toString().indexOf(".")>=0) {
		size = size.toFixed(2);
	};
	if(size == 0){
		return;
	}
	var color = "";
	var radius = 0;
	var style;
	
	//zhaijj,可以更细粒度区分，通过配置值个数，增加色系
	for(var i = 1; i < sizeArr.length; i++){
		var leftv = 0;
		var rightv = 0;
		if(i == 0){
			leftv = 0;
			rightv = sizeArr[i];
		}else if(i == sizeArr.length - 1){
			leftv = sizeArr[i-1];
		}else{
			leftv = sizeArr[i-1];
			rightv = sizeArr[i];
		}
		
		if(i == sizeArr.length - 1){
			if(size > rightv){
				color = colorArr[i];
				radius = radiusArr[i];
				break;
			}
		}else{
			if(size > leftv && size <= rightv){
				color = colorArr[i];
				radius = radiusArr[i];
				break;
			}else if(size < leftv){
				color = colorArr[1];
				radius = radiusArr[1];
				break;
			}
		}
		
	};

	
	if(ifStroke){
		style = new ol.style.Style({
			image : new ol.style.Circle({
				radius : radius * 1.2,
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
				text : size.toString(),
				fill : new ol.style.Fill({
					color : '#fff'
				})
			})
		})
	}else{
		style = new ol.style.Style({
			image : new ol.style.Circle({
				radius : radius,
				fill : new ol.style.Fill({
					color : color
				})
			}),
			text : new ol.style.Text({
				font : '12px 微软雅黑',
				text : size.toString(),
				fill : new ol.style.Fill({
					color : '#fff'
				})
			}),
		})
	}
	style.getImage().setOpacity(0.75);
	
	return style;
} 

/**
 * zhaijj,渲染图例
 * <div id="clusterLegend"></div>
 * @param fieldtitle
 * @param fieldname
 * @param radiusArr
 * @param sizeArr
 * @param colorArr
 */
function renderLayerLengend(fieldtitle,fieldname,radiusArr,sizeArr,colorArr){
	
	var clusterLegend = $('#clusterLegend');
    if(clusterLegend.length == 0){
    	var lengendstyle = 'position:absolute;width:150px;left:5px;bottom:5px;background:#fff;border-radius:4px;font-size:12px;padding:3px;';
    	$("#map").append('<div id="clusterLegend" style="'+lengendstyle+'"></div>');
    }
	
    $("#clusterLegend").empty();
	
	$("#clusterLegend").append('<ul style="margin:0px;"><li class="list-group-item active" style="padding: 5px;">'+fieldtitle+'<span class="glyphicon glyphicon-minus" id="changeLegend" aria-hidden="true" style="float:right;cursor:pointer;line-height:16px;"></span></li></ul>');
	
	for(var i = 1; i < sizeArr.length; i++){
		var leftv = 0;
		var rightv = 0;
		if(i == 0){
			leftv = 0;
			rightv = sizeArr[i];
		}else{
			leftv = sizeArr[i-1];
			rightv = sizeArr[i];
		}
		
		var circlestyle = 'display:inline-block;width:'+radiusArr[i]/2+'px;height:'+radiusArr[i]/2+'px;background-color:'+colorArr[i]+';border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;';
		
		$("#clusterLegend ul").append('<li class="list-group-item" style="line-height:'+radiusArr[i]/2+'px;"><div style="float:right;">'+leftv+'-'+rightv+'</div><div style="'+circlestyle+'"></div></li>');
		
	};
	
	$("#changeLegend").click(function(){
		$("#clusterLegend ul li[class='list-group-item']").toggle();
		if($(this).hasClass("glyphicon-minus")){
			$(this).removeClass("glyphicon-minus");
			$(this).addClass("glyphicon-plus");
		}else if($(this).hasClass("glyphicon-plus")){
			$(this).removeClass("glyphicon-plus");
			$(this).addClass("glyphicon-minus");
		}
	});
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