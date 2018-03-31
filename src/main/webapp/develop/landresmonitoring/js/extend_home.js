var zTree;
var vectorLayer;
var mask;
$(function(){
	
	//初始化右侧区域dom元素
	initRightBox();
	
	initLayerGroup();
	
	//加载中国边界线遮罩
	initChinaBorder(map);
	
	//初始化左侧树
	initTree("tree","queryAllMonitoring");

	initPopup();
	
});


//初始化右侧区域dom元素
function initRightBox(){
	//添加监测期数下拉框
	$("#map").append('<div class="monitoringDate_box"><select id="monitoringDate" class="form-control"></select></div>');
	
	//添加弹出表格框
	$("#map").append('<div class="ol-control popupTable_box">'+
						'<button id="toggle_TableBtn" class="fa fa-hand-o-right popupTable_open" type="button" title="展开" onclick="popupTable_Open()"></button>'+
						'<div class="panel panel-primary">'+
							'<div class="panel-heading ">'+
								'<span>图斑列表</span>'+
								'<span id="toggle_TableBtn" type="button" class="fa fa-times-circle popupTable_close right" onclick="popupTable_Close()"></span>'+
							'</div>'+
							'<table id="tb_table" class="table"></table>'+  	
			    		'</div>'+
					'</div>');
	
	$("#right_box").empty();
	
	var header = '<div class="panel-heading"><div class="panel-title">变化图斑</div>';
	var listgroup = $('<ul class="list-group fx-list"></ul>');
	$("#right_box").append(header).append(listgroup);
	
	//总体分析
	listgroup.append('<li class="list-group-item ztfx"><h4 class="text-primary">总体分析</h4><p class="indent">2017年10月与2017年9月对比，分析出变化图斑总计<span id="tbzs">132</span>处，涉及到<span id="jzzs">56</span>个街镇。</p></li>');
	
	//区域分析
	listgroup.append('<li class="list-group-item qyfx"><h4 class="text-primary">区域分析</h4><table id="qyfx_table" class="table"></li>');
	
	//地类分析
	listgroup.append('<li class="list-group-item dlfx"><h4 class="text-primary">地类分析</h4><table id="dlfx_table" class="table"></li>');
}


function nodeSuccessClick(data){
	var nodes = zTree.getNodesByParam("TREEID", data[0].TREEID);
	if(nodes.length == 1){
		zTree.selectNode(nodes[0]);
		nodeOnClick(nodes[0].attributes);
	}
}

//点击左侧书节点定位；
function nodeOnClick(node){
	var type = node.TREESTATUS;
	
	if(type != $("#monitoringDate").attr("navtype")){
		//初始化左上角select 监测期数数据
		initMonitoringDate(type);
		$("#monitoringDate").attr("navtype",type);
	}else{
		var param = {};
		var value = $("#monitoringDate").val();
		
		param.monitoringdate = value;
		
		param = $.extend(param, node);
		
		ztfx(param);
		qyfxTable(param);
		dlfxTable(param);
		queryJctb(param);
	}
	
	if(popup){
		popup.hide();
	}
	if(swipeCtrl && swipeCtrlStatus){
		map.removeControl(swipeCtrl);
		swipeCtrlStatus = false;
	}
	mapClear();
	
	//添加行政区划边界高亮
	addBoder(node);
}



//切换监测日期 刷新地图及右侧数据
function refreshData(value, title){
	var param = {};
	
	var node = zTree.getSelectedNodes()[0].attributes;
	
	param.monitoringdate = value;
	
	param = $.extend(param, node);
	
	if(popup){
		popup.hide();
	}
	if(swipeCtrl && swipeCtrlStatus){
		map.removeControl(swipeCtrl);
		swipeCtrlStatus = false;
	}
	
	mapClear();
	
	switchMonitorImgLayer(map, value);
	switchMonitorJctbLayer(map, value);
	
	ztfx(param);
	qyfxTable(param);
	dlfxTable(param);
	//queryJctb(param);
}


var swipeCtrl;
var swipeCtrlStatus = false;
function swipeLayer(){
	if(swipeCtrlStatus){
		map.removeControl(swipeCtrl);
		swipeCtrlStatus = false;
	}else{
		swipeCtrl = new ol.control.Swipe();
		map.addControl(swipeCtrl);
	    
	    layers["jctbLayerGroup"].getLayers().forEach(function(layer,i){
	    	 swipeCtrl.addLayer(layer);
	    })
	    
	    swipeCtrlStatus = true;
	}
}



//查询监测图斑
function queryJctb(param){
	
	var view = map.getView();
    var viewResolution = view.getResolution();
    
    var value = $("#monitoringDate").val();
    
    var node = MonitoringDateLayerOption[value];
    
    var landLayerName  = node.LANDLAYERNAME;
    
   
    if(landLayerName){
    	
    	var landLayer = null;
	    layers["jctbLayerGroup"].getLayers().forEach(function(layer,i){
	    	if(layer.get("name") == landLayerName){
	    		landLayer = layer;
	    	}
	    })
	    
    	var url = landLayer.getSource().getUrls()[0];
    	if(url){
    		var propertyNames = ['JCBH','BHHDLMC'];
    		
    		url += "?service=WFS&version=1.0.0&request=GetFeature&typeName="+landLayerName
    		+ "&outputFormat="+encodeURIComponent("application/json")+"&propertyname="+propertyNames.join(",")+ "&CQL_FILTER= "+ encodeURIComponent("where XZQDM like '"+param.CODE+"%'");
    		
	      	initTable("tb_table",{
				url: url,
				pagination:true,
				method: 'get',
				queryParams:function(param){
					return {
						startindex: (param.pageNumber-1)*param.pageSize,
						maxFeatures: param.pageSize,
					}
				},
				metadata:[
					{field: "ID",title:"ID",hidden: true},
					{field:"JCBH",title:"编号",hidden: false},
					{field:"BHHDLMC",title:"地类名称"}
				],
				onClickRow: function(row){
					if(popup){
						popup.hide();
					}
					var value = $("#monitoringDate").val();
				    var node = MonitoringDateLayerOption[value];
				    var landLayerName  = node.LANDLAYERNAME;
				    
				    if(landLayerName){
				    	var landLayer = null;
					    layers["jctbLayerGroup"].getLayers().forEach(function(layer,i){
					    	if(layer.get("name") == landLayerName){
					    		landLayer = layer;
					    	}
					    })
					    var url = landLayer.getSource().getUrls()[0];
				    	if(url){
				    		url += "?service=WFS&version=1.0.0&request=GetFeature&typeName="+landLayerName
				    		+ "&outputFormat="+encodeURIComponent("application/json")+ "&maxFeatures=10&featureid= "+row.ID;
				    		$.ajax({
				    			type: "get",
								dataType: "json",
								url: url,
								success: function(data) {
									if(data.features.length>0){
										var geometry = data.features[0].geometry;
										var properties = data.features[0].properties;
										
										geometry = new ol.format.GeoJSON().readGeometry(geometry);
										
										var coordinate = [properties.XZB,properties.YZB];
										
										popupTable_Close();
										
										var content = createPopupContent(data.features[0]);
										
										popup.show(coordinate, content);
										
										moveIn(null,null,geometry);
									}
								}
				    		});
				    	}
				    }
				},
				responseHandler: function(data){
					var rows = [];
					for(var i = 0;i < data.features.length;i++){
						rows.push($.extend({ID: data.features[i].id}, data.features[i].properties));
					}
					return {
						total: data.totalFeatures,
						rows: rows
					}
				},
				showPaginationSwitch: false,
				formatRecordsPerPage: function (pageNumber) {
		            return '每页 ' + pageNumber + ' 条';
		        },
		        formatShowingRows: function (pageFrom, pageTo, totalRows) {
		            return '第 ' + pageFrom*(pageTo==0?0:1) + ' - ' + pageTo + ' 条，共 ' + totalRows + ' 条';
		        },
				height: 325
			},param);
			//popupTable_Open();
    	}
	}else{
		$("#tb_table").bootstrapTable("destroy");
	}
}


//初始化popup
var popup = null;
function initPopup(){
	popup = new ol.Overlay.Popup({
		popupClass : "black", 
		closeBox : true,
		positioning : 'bottom-left',
		autoPan : true,
		autoPanAnimation : {
			duration : 50
		}
	});
	map.addOverlay(popup);
	map.on('singleclick', function(evt) {
        var view = map.getView();
        var viewResolution = view.getResolution();
        
        var value = $("#monitoringDate").val();
        
        var node = MonitoringDateLayerOption[value];
        
        var landLayerName  = node.LANDLAYERNAME;
        
        if(landLayerName){
        	var landLayer = null;
		    layers["jctbLayerGroup"].getLayers().forEach(function(layer,i){
		    	if(layer.get("name") == landLayerName){
		    		landLayer = layer;
		    	}
		    })
        	
    		var source = landLayer.getSource();
    		var url = source.getGetFeatureInfoUrl(
		          evt.coordinate, viewResolution, view.getProjection(),
		          {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50});
			$.getJSON(url, function(data){
				if(data.features.length>0){
					popup.show(evt.coordinate, createPopupContent(data.features[0]));
				}
			});
    	}
      });
}
//构造图斑详情内容
function createPopupContent(feature){
	var geometry = feature.geometry;
	var properties = feature.properties;
	var id = feature.id;
	var content = $("<div class='ol-popup-content' style='width:200px;'></div>");
	
	var popupText = mapOption.popupText
	for(var i = 0;i < popupText.length;i++){
		content.append("<h6>"+popupText[i].title+"："+properties[popupText[i].name]+"</h6>");
	}
	
	
	var btn = $("<button type='button' class='btn btn-default btn-xs' onclick='showtwoPhaseContrast(this)'>对比</button>").data("feature",feature);
	content.append($("<div class='' style='position: absolute;right:25px;bottom:25px;'></div>").append(btn))
	
	return content;
}


//总体分析
function ztfx(param){
	uadp.getData("list","query_ztfx",param,function(data){
		data = data.data;
		if(data && data.length == 2){
			var text  = "{hdatatime}与{qdatatime}对比，分析出个数{changeNum}个、面积{changeArea}亩。";
			var changeNum = ((data[1].NUM-data[0].NUM) > 0 ? "增加":"减少") + Math.abs(data[1].NUM-data[0].NUM);
			var changeArea = ((data[1].AREA-data[0].AREA) > 0 ? "增加":"减少") + Math.abs(data[1].AREA-data[0].AREA).toFixed(1);
			text = text.replace('{hdatatime}',data[1].NAME).replace('{qdatatime}',data[0].NAME).replace('{changeNum}',changeNum).replace('{changeArea}',changeArea);
			$(".ztfx p").html(text);
		}else{
			$(".ztfx p").html("暂无数据");
		}
	});
}

//区域分析
function qyfxTable(param){
	initTable("qyfx_table",{
		name:"query_qyfx",
		metadata:[
			{field:"CODE",title:"地类编码",hidden:true},
			{field:"INDEX",title:"序号"},
			{field:"NAME",title:"区域"},
			{field:"NUM",title:"个数(处)"},
			{field:"AREA",title:"面积(亩)"}
		],
		height: $(".qyfx").height() - 50
	},param);
}
//地类分析
function dlfxTable(param){
	initTable("dlfx_table",{
		name:"query_dlfx",
		metadata:[
			{field:"CODE",title:"地类编码",hidden:true},
			{field:"INDEX",title:"序号"},
			{field:"NAME",title:"地类"},
			{field:"NUM",title:"个数(处)"},
			{field:"AREA",title:"面积(亩)"}
		],
		height: $(".qyfx").height() - 50
	},param);
}

//查看两期数据对比
function showtwoPhaseContrast(opt){
	var feature = $(opt).data("feature");
	var wkt = undefined;
	if(feature){
		wkt = new ol.format.WKT().writeGeometry(new ol.format.GeoJSON().readGeometry(feature.geometry));
	}
	
	var node = zTree.getSelectedNodes()[0].attributes;
	
	var center = map.getView().getCenter()
	var zoom = map.getView().getZoom();
	
	var hdatatime = $("#monitoringDate").val();
	
	var qdatatime = $("#monitoringDate").find("option:selected").next().attr("value");
	
	var param = $.extend({
		qdatatime:qdatatime,
		hdatatime:hdatatime,
		center:center,
		zoom:zoom,
		wkt: wkt
	},node);
	
	popupPage('map','','twoPhaseContrast', "layer", param, 80, 80);
}


//查看历史
function showHistory(){
	setToolActive('boxSearch');
	
	$("#monitoringDate").attr("disabled",true)
	$("#toggle_TableBtn").attr("disabled",true)
	$("#contrast").attr("disabled",true)
	$("#swipe").attr("disabled",true)
	$("#select").attr("disabled",true)
	$("#history").attr("disabled",true)

	
	if(!layers.boxSerchLayer){
		vectorLayer = new ol.layer.Vector({
			source: new ol.source.Vector(),
			style: new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: '#c90505',
					width: 2
				}),
				fill:new ol.style.Fill({
					color: [0,0,0,0]
				})
			})
		});
		mask = new ol.filter.Mask({
			inner: false,
			fill: new ol.style.Fill({
				color: [0,0,0,0.6]
			})
		})
		vectorLayer.addFilter(mask);
		vectorLayer.setZIndex(6)
		map.addLayer(vectorLayer);
		layers.boxSerchLayer = vectorLayer;
	}
	
    dragBoxSearch = new ol.interaction.DragBox({
    	source : vectorLayer.getSource(),
		//Ctrl + Drag
		//condition: ol.events.condition.platformModifierKeyOnly
	});

	map.addInteraction(dragBoxSearch);

	dragBoxSearch.on('boxend', function(e) {
		var geometry = e.target.getGeometry();
		var extent = geometry.getExtent();
		mask.feature_ = new ol.Feature({
			geometry: geometry
		});
		
		layers["baseVectorLayer"].setVisible(true);
		layers["historyLayerGroup"].setVisible(true);
		layers["boxSerchLayer"].setVisible(true);
		
		addMask($(".left_data"))
		addMask($(".right_data"))
		$(".timeline_box").remove();
		$(".main_data").append('<div class="timeline_box animated bounceInUp">'+
								'<div id="timeline" class="animated bounceInUp">'+
									'<ul id="dates"></ul>'+
									'<div class="timeline_play"><a class="btn btn-link playState"></a></div>'+
								'</div>'+
							'</div>')
		initHistoryMonitoringDate(extent);
		
		var feature = new ol.Feature();
		feature.setGeometry(geometry)
		
		var feature1 = new ol.Feature();
		feature1.setGeometry(geometry)
		
		vectorLayer.getSource().clear();
		layers["baseVectorLayer"].setVisible(true);
		vectorLayer.getSource().addFeature(feature);
		
		
		//添加box周围显示文本信息
		var createOverlayInfo = function(geometry){
			var extent = geometry.getExtent();
			var area = geometry.getArea();
			var width = extent[2] - extent[0]
			var height = extent[3] - extent[1]
			
			var areaText = "<p >面积: <span id='boxArea'/>m<sup>2</sup></p>"
			var widthText = "<p>宽： <span id='boxWidth'/>m</p>";
			var heightText = "<p>高： <span id='boxHeight'/>m</p>";
			
			if(!map.getOverlayById("topOverlay")){
				var topOverlay = new ol.Overlay({
					id: "topOverlay",
					positioning: 'bottom-center',
					stopEvent: false,
					element: $('<div class="boxSerchInfo">'+ areaText + "</div>")[0]
				});
				map.addOverlay(topOverlay);
				
				var rightOverlay = new ol.Overlay({
					id: "rightOverlay",
					positioning: 'right-center',
					stopEvent: false,
					element: $('<div class="boxSerchInfo">'+ widthText + "</div>")[0]
				});
				map.addOverlay(rightOverlay);
				
				var leftOverlay = new ol.Overlay({
					id: "leftOverlay",
					positioning: 'center-right',
					stopEvent: false,
					element: $('<div class="boxSerchInfo">'+ heightText + "</div>")[0]
				});
				map.addOverlay(leftOverlay);
				
				var bottomOverlay = new ol.Overlay({
					id: "bottomOverlay",
					positioning: 'top-center',
					stopEvent: false,
					element: $('<div class="boxSerchInfo">'+ widthText + "</div>")[0]
				});
				map.addOverlay(bottomOverlay);
			}
			var topOverlay = map.getOverlayById("topOverlay");
			var rightOverlay = map.getOverlayById("rightOverlay");
			var leftOverlay = map.getOverlayById("leftOverlay");
			var bottomOverlay = map.getOverlayById("bottomOverlay");
			
			topOverlay.setPosition([(extent[2]+extent[0])/2,extent[3]]);
			leftOverlay.setPosition([extent[0],(extent[3]+extent[1])/2]);
			bottomOverlay.setPosition([(extent[2]+extent[0])/2,extent[1]]);
			
			new CountUp("boxArea", 0, area, 0, 1).start();
			new CountUp("boxWidth", 0, width, 0, 1).start();
			new CountUp("boxHeight", 0, height, 0, 1).start();
		}
		createOverlayInfo(geometry)
	});
	
	dragBoxSearch.on('boxstart', function(e) {
		vectorLayer.getSource().clear();
		layers["baseVectorLayer"].setSource(vectorLayer.getSource())
		
		var topOverlay = map.getOverlayById("topOverlay");
		var rightOverlay = map.getOverlayById("rightOverlay");
		var leftOverlay = map.getOverlayById("leftOverlay");
		var bottomOverlay = map.getOverlayById("bottomOverlay");
		
		if(topOverlay){
			map.removeOverlay(topOverlay);
			map.removeOverlay(rightOverlay);
			map.removeOverlay(leftOverlay);
			map.removeOverlay(bottomOverlay);
		}
	});
	
}

//初始化监测期数
function initHistoryMonitoringDate(extent){
		var lis = "";
		var keyArray = Object.getOwnPropertyNames(MonitoringDateLayerOption);
		
		var historyLayerGroup = layers["historyLayerGroup"];
		historyLayerGroup.setExtent(extent);
		historyLayerGroup.setVisible(true);
		
		var history_layerArray = [];
		for(var i = keyArray.length-1;i>=0;i--){
			var node = MonitoringDateLayerOption[keyArray[i]];
			lis += '<li><a value='+'"'+node.ID+ '"'+   '>'+node.NAME+'年'+'</a></li>';
		};
		
		$("#dates").html(lis);
		
		//监测日期时间轴  滚动
		var timeline = $("#timeline").slide({
	    	titCell: "#dates li",
	    	mainCell: "ul",
	    	vis: 5,
	    	effect: "left",
	    	playStateCell: ".playState",
			autoPlay: true,
			defaultPlay: true,
			mouseOverStop: false,
			returnDefault: false,
			interTime:2000,
			titOnClassName: "selected",
			trigger: "click",
			pnLoop: false,
			startFun: function(i,c){
				var value = $("#dates li").eq(i+1).find("a").attr("value");
				//根据监测日期切换图层
				if(value){
					switchHistoryImageLayer(map, value);
				}
			}
		});
}
function clearAll(){
	removeMask();
	$(".timeline_box").remove();
	
	$("#monitoringDate").attr("disabled",false);
	$("#toggle_TableBtn").attr("disabled",false);
	$("#contrast").attr("disabled",false);
	$("#swipe").attr("disabled",false);
	$("#select").attr("disabled",false);
	$("#history").attr("disabled",false);
	
	layers["baseVectorLayer"].setVisible(false);
	layers["historyLayerGroup"].setVisible(false);
	if(layers.boxSerchLayer){
		layers.boxSerchLayer.setVisible(false);
	}
	
	var topOverlay = map.getOverlayById("topOverlay");
	var rightOverlay = map.getOverlayById("rightOverlay");
	var leftOverlay = map.getOverlayById("leftOverlay");
	var bottomOverlay = map.getOverlayById("bottomOverlay");
	
	if(topOverlay){
		map.removeOverlay(topOverlay);
		map.removeOverlay(rightOverlay);
		map.removeOverlay(leftOverlay);
		map.removeOverlay(bottomOverlay);
	}
}

function popupTable_Open(){
	$(".popupTable_open").hide().next().animate({
		left: "0px",
	},500);
}
function popupTable_Close(){
	$(".popupTable_close").parent().parent().animate({
		left: "-350px",
	},500);
	$(".popupTable_open").show();
}


function addMask(doc){
	if($(doc).find(".mask").length == 0){
		$(doc).append("<div class='mask'></div>")
	}
}
function removeMask(doc){
	$(".mask").remove();
}
