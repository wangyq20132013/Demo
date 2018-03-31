var zTree;
var radioval = "1";
var id = "";
var type = 0;
$(function(){
	initTree("tree","queryAllPeriod");
	
})

function zTreeBeforeClick(treeId, treeNode, clickFlag){
	return (treeNode.level >1);
}

function nodeSuccessClick(data){
	$("#tree_3_a").click();
}

//节点点击
function nodeOnClick(node) {
	id = node.TREEID
	type = node.TYPE;
	
	refreshData();
}
//情况分类
function radiochange(){
	radioval=$('input:radio:checked').val();
	refreshData();
}

//刷新数据
function refreshData(){
	queryInfoText();
	queryAllImgCoverage();
	switchCoverageLayer();
	tabledata({
		id : id,
		type : type,
		radioval : radioval
	});
}


function queryInfoText(){
	uadp.getData("list","queryInfoText",{period: id,navtype: type, infotype: radioval},function(data){
		if(data.data.length>0){
			$("#text").text(data.data[0].TEXT);
		}else{
			$("#text").text("");
		}
	});
}

function queryAllImgCoverage(){
	uadp.getData("list","queryAllImgCoverage",{period: id,navtype: type, infotype: radioval},function(data){
		var myChart=echarts.init(document.getElementById("chart"));
		if(data.data[0].COUNT>0){
			var legendData = ["全国有效影像覆盖率","全国有效影像未覆盖率"]
			var seriesData = [{name:"全国有效影像覆盖率",value:data.data[0].IMGOVER},{name:"全国有效影像未覆盖率",value: (1-data.data[0].IMGOVER).toFixed(6)}];
		}else{
			var legendData = ["全国有效影像覆盖率","全国有效影像未覆盖率"]
			var seriesData = [{name:"全国有效影像覆盖率",value: 0},{name:"全国有效影像未覆盖率",value: 1}];
		}
		myChart.setOption({
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data: legendData
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: function(v){
		        	return v.name+":"+v.value+"("+v.value*100+"%)";
		        }
		    },
		    series : [
		        {	name: '覆盖率',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data: seriesData,
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		},true);
		window.onresize = myChart.resize;
	});
}
//切换覆盖率图层
function switchCoverageLayer(){
	var node = zTree.getSelectedNodes()[0].attributes;
	
	//影像
	var imgService  = node.IMGSERVICE;
	var imgLayerName  = node.IMGLAYERNAME;
	//图斑
	var landService  = node.LANDSERVICE;
	var landLayerName  = node.LANDLAYERNAME;
	//原始影像覆盖
	var coverageService = node.COVERAGESERVICE;
	var coverageLayerName = node.COVERAGELAYERNAME;
	//云雪区域
	var cloudsnowService = node.CLOUDSNOWSERVICE;
	var cloudsnowLayerName = node.CLOUDSNOWLAYERNAME;
	
	
	var imgLayerVisible = false;
	var landLayerVisible = false;
	for(var key in layers){
		var layer = layers[key];
		//layer.setVisible(false);
		map.removeLayer(layer);
	}
	
	var addLayer = function (layerService, layerName, layerType,index){
		if(false){
			layers[layerName].setVisible(true);
		}else{
			var layer = null;
			if(layerType == 'img'){
				var layerurl = mapOption.maps[0].layerurl;
				layerurl = layerurl.replace('{layerService}',layerService);
				layer = getXYZImageLayer(cxt+layerurl, layerName);
			}else if(layerType == 'wms'){
				var layerurl =  mapOption.maps[0].wmsurl;
				layerurl = layerurl.replace('{layerService}',layerService);
				layer = getWmsLayer(cxt+layerurl, layerName);
			}
			
			layers[layerName] = layer;
			layer.setZIndex(index);
			map.addLayer(layer);
		}
	}
	
	
	if (radioval == "1") {
		if(coverageService && coverageLayerName){
			addLayer(coverageService, coverageLayerName, "wms");
		}
		if(cloudsnowService && cloudsnowLayerName){
			addLayer(cloudsnowService, cloudsnowLayerName, "wms");
		}
	}else if(radioval == "2"){
		if(imgService && imgLayerName){
			addLayer(imgService, imgLayerName, "img");
		}
	}else if(radioval == "3"){
		if(landService && landLayerName){
			addLayer(landService, landLayerName, "wms");
		}
	}
	
	addLayer("qth", "dissolve_provchina_albers", "wms",2);
}

function tabledata(param) {
	var metadata = [];
	if (radioval == 1) {
		metadata = [ {
			"field" : "PRONAME",
			"title" : "行政区划"
		}, {
			"field" : "IMGAREA",
			"title" : "影像面积"
		}, {
			"field" : "CITYAREA",
			"title" : "总面积"
		}, {
			"field" : "BFB",
			"title" : "覆盖率"
		} ];
	}
	if (radioval == 2) {
		metadata = [ {
			"field" : "XZQH",
			"title" : "行政区划"
		}, {
			"field" : "TBLX",
			"title" : "图斑类型"
		}, {
			"field" : "TYPENUM",
			"title" : "图斑数量(个)"
		}, {
			"field" : "TYPEAREA",
			"title" : "覆盖率"
		} ];
	}
	if (radioval == 3) {
		metadata = [ {
			"field" : "PRONAME",
			"title" : "行政区划"
		}, {
			"field" : "LANDNUM",
			"title" : "图斑个数(个)"
		}, {
			"field" : "LANDAREA",
			"title" : "图斑面积(亩)"
		}, {
			"field" : "BFB",
			"title" : "图斑覆盖率"
		} ];
	}
	initTable("table", {
		name : "queryPROTableData",
		metadata : metadata,
		// onLoadSuccess: tableLoadSuccess,
		height : 400
	}, param);
}
