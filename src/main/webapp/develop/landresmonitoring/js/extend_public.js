//初始化左侧树
function initTree(id,dataset) {
	var setting = {
		isSimpleData: false, //数据是否采用简单 Array 格式，默认false  
		showLine: true, //是否显示节点间的连线  
		check: {
			enable: false
		},
		async: {
			enable: true,
			type: 'POST',
			url: cxt + "/datainterface/getdata/ztree/" + dataset,
			contentType: "application/json",
			dataType: "json",
			autoParam: ["TREEID","TREEPARENTID","TREESTATUS"],
			otherParam: {
				initall: false
			}
		},
		view: {
			dblClickExpand: true,
			showLine: true,
			selectedMulti: true
		},
		data: {
			keep: {
				leaf: true,
				parent: true
			},
			key: {
				name: "TREENAME",
			},
			simpleData: {
				enable: true,
				idKey: "TREEID",
				pIdKey: "TREEPARENTID",
			}
		},
		callback: {
			beforeClick: zTreeBeforeClick,
			onClick: zTreeOnClick,
			onAsyncSuccess: onZtreeSuccess
		}
	}
	zTree = $.fn.zTree.init($("#"+id), setting);
	
	return zTree;
}

function zTreeBeforeClick(treeId, treeNode, clickFlag){
	return (treeNode.TREEID !== '0');
}

function zTreeOnClick(event, treeId, node){
	//点击节点执行nodeOnClick方法
	typeof nodeOnClick == 'function'?nodeOnClick(node.attributes):false;
}

function onZtreeSuccess(event, treeId, treeNode, data){
	//默认选中第一个节点值，执行点击事件
	typeof nodeSuccessClick == 'function'?nodeSuccessClick(data):false;
}
//初始化表格
function initTable(id, dataset, querycondition){
	var bootstrapTableOpttions = {
		height: dataset.height,
		url:  dataset.url?dataset.url:cxt + "/datainterface/getdata/bootstraptable/" + dataset.name, //请求后台的URL（*）
		method: dataset.method?dataset.method:'POST', //请求方式（*）
		striped: true, //是否显示行间隔色
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: dataset.pagination?dataset.pagination:false,
		paginationLoop: false,
		undefinedText: '',
		smartDisplay:false,
		contentType: "application/json",
		queryParamsType: "undefined",
		idFieId: dataset.keyid,
	    uniqueId: dataset.keyid,
		queryParams: dataset.queryParams?dataset.queryParams:function queryParams(param) { //设置查询参数
			var data = {
				page: param.pageNumber,
				rows: param.pageSize,
				sortName: param.sortName,
				sortOrder: param.sortOrder,
				searchText: param.searchText
			};
			var obj = $.extend(data,querycondition);
			return JSON.stringify(obj);
		},
		sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
		pageNumber: 1, //初始化加载第一页，默认第一页
		pageSize: 30, //每页的记录行数（*）
		pageList: dataset.pageList?dataset.pageList:[30, 50, 100], //可供选择的s每页的行数（*）
		clickToSelect: false, //是否启用点击选中行
		singleSelect: false, //单选
		columns: initColumnmeta(dataset.metadata),
		onDblClickRow: dataset.onDblClickRow,
		onClickCell: dataset.onClickCell,
		onClickRow: dataset.onClickRow,
		onCheck: dataset.onCheck,			
		onLoadSuccess: dataset.onLoadSuccess,
		responseHandler: dataset.responseHandler,
		formatShowingRows: dataset.formatShowingRows,
		formatRecordsPerPage: dataset.formatRecordsPerPage,
		showPaginationSwitch: dataset.showPaginationSwitch
	}
	$("#"+id).bootstrapTable("destroy");
	$("#"+id).bootstrapTable(bootstrapTableOpttions);
}

//初始化图层组
function initLayerGroup(){
	//影像图层组
	var imageLayerGroup = new ol.layer.Group({
		layers: []
	});
	layers["imageLayerGroup"] = imageLayerGroup;
	map.addLayer(imageLayerGroup);
	
	//白色底板图层
	var baseVectorLayer = new ol.layer.Vector({
		visable: false,
		style: new ol.style.Style({
			stroke: new ol.style.Stroke({
				width: 0
			}),
			fill: new ol.style.Fill({
				color: [255,255,255,0]
			})
		}),
		zIndex: 0
	});
	layers["baseVectorLayer"] = baseVectorLayer;
	map.addLayer(baseVectorLayer);
	
	//历史影像图层组
	var historyLayerGroup = new ol.layer.Group({
		layers: [],
		visable: false
	});
	layers["historyLayerGroup"] = historyLayerGroup;
	map.addLayer(historyLayerGroup);
	
	//监测图斑图层组
	var jctbLayerGroup = new ol.layer.Group({
		layers: []
	});
	layers["jctbLayerGroup"] = jctbLayerGroup;
	map.addLayer(jctbLayerGroup);
}

//切换影像图层
function switchMonitorImgLayer(map, value, node){
	if(!node){
		node = MonitoringDateLayerOption[value];
	}
	var imgService  = node.IMGSERVICE;
	var imgLayerName  = node.IMGLAYERNAME;
	
	var imgLayerVisible = false;
	
	layers["imageLayerGroup"].getLayers().forEach(function(layer, index){
		var key = layer.get("name");
		if(key == imgLayerName){
			layer.setVisible(true);
			imgLayerVisible = true;
		}else{
			layer.setVisible(false);
		}
	})

	if(imgLayerVisible == false && imgLayerName){
		var layerurl = mapOption.maps[0].layerurl;
		var imgLayer = getXYZImageLayer(cxt+layerurl, imgLayerName);
		layers["imageLayerGroup"].getLayers().push(imgLayer);
	}
}
//切换监测图斑图层
function switchMonitorJctbLayer(map, value, node){
	if(!node){
		node = MonitoringDateLayerOption[value];
	}
	var landService  = node.LANDSERVICE;
	var landLayerName  = node.LANDLAYERNAME;
	
	var landLayerVisible = false;
	layers["jctbLayerGroup"].getLayers().forEach(function(layer, index){
		var key = layer.get("name");
		if(key == landLayerName){
			layer.setVisible(true);
			landLayerVisible = true;
		}else{
			layer.setVisible(false);
		}
	})
	if(landLayerVisible == false && landLayerName){
		var wmsurl =  mapOption.maps[0].wmsurl;
		var wmsLayer = 	getWmsLayer(cxt + wmsurl, landLayerName);
		layers["jctbLayerGroup"].getLayers().push(wmsLayer);
	}
}

function switchHistoryImageLayer(map, value, node){
	if(!node){
		node = MonitoringDateLayerOption[value];
	}
	var imgService  = node.IMGSERVICE;
	var imgLayerName  = node.IMGLAYERNAME;
	
	var imgLayerVisible = false;
	
	var animation = function(layer){
		setTimeout(function(){
			layer.setOpacity(0.6)
		},200);
		setTimeout(function(){
			layer.setOpacity(0.7)
		},400);
		setTimeout(function(){
			layer.setOpacity(0.8)
		},600);
		setTimeout(function(){
			layer.setOpacity(0.9)
		},800);
		setTimeout(function(){
			layer.setOpacity(1)
		},1000);
	}
	
	var status = false;
	layers["historyLayerGroup"].getLayers().forEach(function(layer, index){
		var key = layer.get("name");
		
		if(key == imgLayerName){
			imgLayerVisible = true;
			layer.setOpacity(0)
			layer.setVisible(true);
			animation(layer);
			status = true;
			return;
		}
		if(status){
			layer.setVisible(false);
		}
	})
	
	if(imgLayerVisible == false && imgLayerName){
		var layerurl = mapOption.maps[0].layerurl;
		var imgLayer = getXYZImageLayer(cxt+layerurl, imgLayerName);
		layers["historyLayerGroup"].getLayers().push(imgLayer);
		imgLayer.setOpacity(0)
		animation(imgLayer)
	}
}



//添加省边界线
function addProvinceBorder(map){
	var landLayerName = "dissolve_provchina_albers";
	var wmsurl =  mapOption.maps[0].wmsurl;
	var wmsLayer = 	getWmsLayer(cxt + wmsurl, landLayerName);
	wmsLayer.setZIndex(2);
	layers[landLayerName] = wmsLayer;
	map.addLayer(wmsLayer);
}

//初始化监测期数
var MonitoringDateLayerOption = {}
function initMonitoringDate(type){
	uadp.getData("list","getMonitoringDate",{type:type},function(data){
		var html = "";
		$(data.data).each(function(i,node){
			html += "<option value='"+node.ID+"'>"+node.NAME+"</option>"
			MonitoringDateLayerOption[node.ID] = node;
		})
		$("#monitoringDate").html(html).on("change",function(){
			var value = $(this).val();
			var title = $(this).find("option:selected").text();
			typeof refreshData == 'function'?refreshData(value,title):false;
		}).trigger("change");
	});
}
//添加 中国边界 遮罩
function initChinaBorder(map){
	uadp.getData("list","getMapGeometry_ById",{id:"1"},function(data){
		var wkt = data.data[0].MAPGEOMETRY;
		
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
			filterVector.setZIndex(1);
			
			
			var extent = feature.getGeometry().getExtent();
			//map.getView().fit(extent, map.getSize());
		}
	});
}

//添加行政区划边界高亮
function addBoder(node){
	if(mapObject.layers == undefined){
		mapObject.layers = {};
	}
	var vectorLayer =  mapObject.layers["行政区划边界"];
	if(vectorLayer){
		vectorLayer.getSource().clear();
	}
	uadp.getData("list","getMapGeometry_ById",{id:node.REFID},function(data){
		if(data.data.length == 1){
			var wkt = data.data[0].MAPGEOMETRY;
			var vectorLayer =  mapObject.layers["行政区划边界"];
			if(vectorLayer == undefined){
				vectorLayer = new ol.layer.Vector({
					style: new ol.style.Style({
			            fill: new ol.style.Fill({
			                color: 'rgba(0, 0, 0, 0)'
			            }),
			            stroke: new ol.style.Stroke({
			                color: '#f90000',
			                width: 2
			            })
			        })
				});
				map.addLayer(vectorLayer);
				mapObject.layers["行政区划边界"] = vectorLayer;
			}
			var feature =  new ol.format.WKT().readFeature(wkt);
			
			var vectorSource = new ol.source.Vector();
			vectorSource.addFeature(feature);
			vectorLayer.setSource(vectorSource);
			vectorLayer.setZIndex(1);
			
			var extent = feature.getGeometry().getExtent();
			moveIn(null,null,extent);
		}
	});
}

//地图添加范围过滤，并设定四至范围
function maskFilter(map, geometry){
	if(geometry){
		feature = new ol.Feature({
			geometry: geometry
		})
		filterVector = new ol.layer.Vector({
			source : new ol.source.Vector({
				features : [feature]
			}),
			style: new ol.style.Style({
	            fill: new ol.style.Fill({
	                color: 'rgba(0, 0, 0, 0)'
	            }),
	            stroke: new ol.style.Stroke({
	                color: '#f90000',
	                width: 0
	            })
	        })
		});
		map.addLayer(filterVector);
		
		debugger;
		
		var mask = new ol.filter.Mask({ feature: feature, inner:false, fill: new ol.style.Fill({ color:[255,255,255,0.5]}) });
		filterVector.addFilter(mask);
		filterVector.setZIndex(10);
		var extent = feature.getGeometry().getExtent();
		map.getView().fit(extent, map.getSize());
	}
}