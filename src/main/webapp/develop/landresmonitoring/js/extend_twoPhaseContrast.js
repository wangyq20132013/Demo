$(function(){
	initViewExtent();
	
	//加载中国边界线遮罩
	for(var i=0;i<mapObject.mapId_Arr.length;i++){
		initChinaBorder(map[mapObject.mapId_Arr[i]]);
	};
	
	initMonitoringDate(params.TREESTATUS);
})

//初始化地图视图四至
function initViewExtent(){
	//如果初始化页面有extent参数
	if(params.wkt){
		var wktFormat = new ol.format.WKT();
		var extent = wktFormat.readGeometry(params.wkt).getExtent();
		view.fit(extent, map["left_map"].getSize());
	}else if(params.center && params.zoom){
		view.setCenter(params.center);
		view.setZoom(params.zoom);
	}
}

//初始化监测期数
function initMonitoringDate(type){
	uadp.getData("list","getMonitoringDate",{type:type},function(data){
		var html = "";
		$(data.data).each(function(i,node){
			html += "<option value='"+node.ID+"'>"+node.NAME+"</option>";
			MonitoringDateLayerOption[node.ID] = node;
		});
		for(var i=0;i<mapObject.mapId_Arr.length;i++){
			var select = $("<select mapid="+mapObject.mapId_Arr[i]+" class='form-control'>"+html+"</select>");
			
			$("#"+mapObject.mapId_Arr[i]).append($("<div class='monitordate_box'></div>").append(select));
			
			if(i == 0 && params.hdatatime){
				select.val(params.hdatatime).attr("disabled",true);
				var mapid = mapObject.mapId_Arr[i];
				var value = params.hdatatime;
				switchMonitorImgFleckLayer(map[mapid], value);
			}else if(i == 1 && params.qdatatime){
				switchMonitorFleckLayer(map[mapObject.mapId_Arr[i]], params.hdatatime);
				
				select.val(params.qdatatime).on("change",function(){
					var mapid = $(this).attr("mapid");
					var value = $(this).val();
					switchMonitorImgLayer(map[mapid], value);
				}).trigger("change");
			}
		}
	});
}
//切换监测影像图层
function switchMonitorImgLayer(map,value){
	
	var node = MonitoringDateLayerOption[value];
	
	var imgService  = node.IMGSERVICE;
	var imgLayerName  = node.IMGLAYERNAME;
	
	for(var key in layers){
		var layer = layers[key];
		if(key.indexOf("img") > -1){
			map.removeLayer(layer);
		}
	}
	
	var layerurl = mapOption.maps[0].layerurl;
	var imgLayer = getXYZImageLayer(cxt+layerurl, imgLayerName);
	layers[imgLayerName] = imgLayer;
	map.addLayer(imgLayer);
	
}

//切换监测图斑图层
function switchMonitorFleckLayer(map,value){
	
	var node = MonitoringDateLayerOption[value];
	
	var imgService  = node.IMGSERVICE;
	var imgLayerName  = node.IMGLAYERNAME;
	var landService  = node.LANDSERVICE;
	var landLayerName  = node.LANDLAYERNAME;
	
	for(var key in layers){
		var layer = layers[key];
		map.removeLayer(layer);
	}
	var wmsurl =  mapOption.maps[0].wmsurl;
	var wmsLayer = 	getWmsLayer(cxt + wmsurl, landLayerName);
	wmsLayer.setZIndex(1);
	layers[landLayerName] = wmsLayer;
	map.addLayer(wmsLayer);
}


//切换监测影像图斑图层
function switchMonitorImgFleckLayer(map,value){
	var node = MonitoringDateLayerOption[value];
	
	var imgService  = node.IMGSERVICE;
	var imgLayerName  = node.IMGLAYERNAME;
	var landService  = node.LANDSERVICE;
	var landLayerName  = node.LANDLAYERNAME;
	
	var imgLayerVisible = false;
	var landLayerVisible = false;
	for(var key in layers){
		var layer = layers[key];
		if(key == imgLayerName){
			layer.setVisible(true);
			imgLayerVisible = true;
		}else if(key == landLayerName){
			layer.setVisible(true);
			landLayerVisible = true;
		}else{
			layer.setVisible(false);
		}
	}

	if(imgLayerVisible == false){
		var layerurl = mapOption.maps[0].layerurl;
		var imgLayer = getXYZImageLayer(cxt+layerurl, imgLayerName);
		layers[imgLayerName] = imgLayer;
		map.addLayer(imgLayer);
	}
	if(landLayerVisible == false){
		var wmsurl =  mapOption.maps[0].wmsurl;
		var wmsLayer = 	getWmsLayer(cxt + wmsurl, landLayerName);
		wmsLayer.setZIndex(1);
		layers[landLayerName] = wmsLayer;
		map.addLayer(wmsLayer);
	}
	
}
