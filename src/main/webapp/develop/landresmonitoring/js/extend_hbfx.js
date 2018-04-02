/**
 * 同比分析
 */
var zTree;
var myChart;
$(function(){
	myChart = echarts.init($("#chart")[0]);
	
	//监测类型单选框绑定事件
	$("#monitoringType").find("input[type='radio']").on('click',function(){
		refreshData();
	})
	
	//初始化左侧树
	initTree("tree","queryAllMonitoring");
});



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
		
		param.monitoringType = $("#monitoringType").find("input[name='monitoringType']:checked").val();
		param.monitoringdateArr = [];
		
		var hdatatime = $("#monitoringDate").val();
		var qdatatime = $("#monitoringDate").find("option:selected").next().attr("value");
		
		if(qdatatime){
			param.monitoringdateArr.push(qdatatime);
		}else{
			layer.msg("没有上一期数据！",{
				icon: 0
			});
		}
		
		
		if(hdatatime){
			param.monitoringdateArr.push(hdatatime);
		}
		
		param = $.extend(param, node);
		
		refreshTable(param);
		refreshChart(param);
	}
	
}

var param = {};

//切换监测日期 刷新地图及右侧数据
function refreshData(value, title){
	
	
	var node = zTree.getSelectedNodes()[0].attributes;
	param.monitoringType = $("#monitoringType").find("input[name='monitoringType']:checked").val();
	
	param.monitoringdateArr = [];
		
	var hdatatime = $("#monitoringDate").val();
	var qdatatime = $("#monitoringDate").find("option:selected").next().attr("value");
	
	if(qdatatime){
		param.monitoringdateArr.push(qdatatime);
	}else{
		layer.msg("没有上一期数据！",{
			icon: 0
		});
	}
	
	if(hdatatime){
		param.monitoringdateArr.push(hdatatime);
	}
	
	param = $.extend(param, node);
	
	
	refreshTable(param)
	//refreshChart(param);
}
