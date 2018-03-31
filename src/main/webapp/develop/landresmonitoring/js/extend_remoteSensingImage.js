var zTree;
var lv;
$(function() {
	$("#map").append('<div class="monitoringDate_box"><select id="monitoringDate" class="form-control"></select></div>');
	// 加载中国边界线遮罩
	
	initLayerGroup();
	
	initChinaBorder(map);
	
	// 初始化左上角select 监测期数数据
	initMonitoringDate();

	// 初始化左侧树
	initTree("tree", "queryAllMonitoring");
	//setTimeout(function(){$("#tree_2_a").click()},1000)
});

function nodeSuccessClick(data){
	$("#tree_2_a").click();
}


// 初始化右侧区域dom元素
function initRightBox(param) {
	param.lv=lv;
	if(param.propertyIsEnumerable("CODE")){
		param.CODE=param.REFID;
	}else{
		param.CODE=param.attributes.REFID;
	}
	$("#right_box").empty();
	$("#right_box").append('<table id="table"></table>');
	initTable("table", {
		name : "queryImageNumAndSize",
		metadata : [ {
			field : "XZQMC",
			title : "行政区名称"
		}, {
			field : "IMGCOUNT",
			title : "影像数量(个)"
		}, {
			field : "IMGSIZE",
			title : "数据量(MB)"
		} ],
		height:$("#right_box").height()
	}, param);
}


//切换监测日期 刷新地图及右侧数据
function refreshData(value, title){
	var param = {};
	var node = zTree.getSelectedNodes()[0].attributes;
	
	param.monitoringdate = value;
	
	param = $.extend(param, node);
	
	switchMonitorImgLayer(map, value);
	switchMonitorJctbLayer(map, value);
	
	initRightBox(param);
}



// 点击左侧书节点定位；
function zTreeOnClick(event, treeId, node) {
	/*var lv=(node.level).toString();
	treestatus=node.TREESTATUS;
	node = node.attributes;
	var id = node.CODE;*/
	lv=(node.level).toString();
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
		
		initRightBox(param);
	}
	
	// 添加行政区划边界高亮
	addBoder(node.attributes);

}
