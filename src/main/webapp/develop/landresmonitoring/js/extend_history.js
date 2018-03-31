$(function() {
	initChinaBorder(map);
	initViewExtent();
	initMonitoringDate(params.TREESTATUS);
});


//初始化地图视图四至
function initViewExtent(){
	//如果初始化页面有extent参数
	if(params.wkt){
		var wktFormat = new ol.format.WKT();
		var extent = wktFormat.readGeometry(params.wkt).getExtent();
		map.getView().fit(extent, map.getSize());
	}else if(params.center && params.zoom){
		var view = map.getView();
		view.setCenter(params.center);
		view.setZoom(params.zoom);
	}
}

//初始化监测期数
var MonitoringDateLayerOption = {}
function initMonitoringDate(type){
	uadp.getData("list","getMonitoringDate",{type:type},function(data){
		var lis = "";
		var items= "";
		$(data.data).each(function(i,node){
			if(i == 0){
				lis += "<li class='act' value='"+node.ID+"'><span></span>"+node.NAME+"</li>"
			}else{
				lis += "<li class='' value='"+node.ID+"'><span></span>"+node.NAME+"</li>"
			}
			items += '<div class="item"></div>';
			MonitoringDateLayerOption[node.ID] = node;
		});
		$("#monitoringDate").html(lis);

		
		//监测日期时间轴  滚动
		$("#monitoringDate_box").slide({
			titCell: ".parHd li", 
			mainCell: ".parBd",
			autoPlay: true,
			defaultPlay: true,
			interTime:2000,
			titOnClassName: "act",
			prevCell: ".sPrev", 
			nextCell: ".sNext",
			startFun: function(i,c){
				var value = $("#monitoringDate li").eq(i+1).attr("value");
				//根据监测日期切换图层
				switchMonitorImgLayer(value);
			}
		});
		$(".parHd").slide({ mainCell: "ul", vis: 7, effect: "leftLoop", defaultPlay: true, prevCell: ".sPrev", nextCell: ".sNext" });
	});
}