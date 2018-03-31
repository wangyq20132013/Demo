$(function(){
	
});

function loadPieChartLayer(layername,dataset,params,piedataset){
	//var dataset = 'queryCluter';
	if(dataset){
		var opt = {};
		opt.name = layername;
		opt.url = cxt + "/datainterface/getdata/list/" + dataset;
		opt.dataparams = params;
		opt.piedataset = piedataset;
		addPieChartLayer(opt);
	}
}

function loadClusterLayer(layername,dataset,params){
	if(dataset){
		var opt = {};
		opt.name = layername;
		opt.url = cxt + "/datainterface/getdata/list/" + dataset;
		opt.dataparams = params;
		addClusterLayer(opt);
	}
}

function loadHeatmapLayer(layername,dataset,params){
	//var dataset = 'queryCluter';
	if(dataset){
		var opt = {};
		opt.name = layername;
		opt.url = cxt + "/datainterface/getdata/list/" + dataset;
		opt.dataparams = params;
		addHeatMapLayer(opt);
	}
}
function loadFlightLayer(params){
	var opt = params;
	var flightLayer = getFlightLayer(opt);
	map.addLayer(flightLayer);
}
function loadFlashLayer(params){
	var opt = params;
	var flashLayer = getFlashLayer(opt);
	map.addLayer(flashLayer);
}
function loadEchartFlightOverlay(params){
	var opt = params;
	var echartFlightsOverlay=getEchartFlightOverlay(opt);
	console.log(echartFlightsOverlay);
	map.addOverlay(echartFlightsOverlay);
}
function loadPOILayer(params){
	var opt = params;
	var poiLayer = getPOILayer(opt);
	map.addLayer(poiLayer);
}