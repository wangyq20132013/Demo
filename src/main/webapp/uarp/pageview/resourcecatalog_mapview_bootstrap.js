var tileUrl="http://172.172.5.180:9088/gwc/service/wms";

var map = null;//地图对象
var busiLayerMap = {};//记录业务图层 
var baseLayerArr = [];//记录当前底图，用来实现底图切换
var columnmeta = [];//记录表头

var mapConfig = {
	"initextent" : mapData.initextent,	
	"maxextent" : mapData.maxextent,	
	"resolutions" : mapData.resolutions,	
	"projectioncode" : mapData.projectioncode,	
	"projectionunits" : mapData.projectionunits,
	"center" : mapData.center,
	"baselayer" : mapData.baselayer,
	"busilayer" : mapData.busilayer
}



$(function() {
	require.config({
		paths : {
			echarts : ctx + '/resources/echarts/js'
		}
	});
	
	initMap();//初始化地图对象
	
	initBaseLayers();//加载底图
	
	switchMapClick();//初始化底图切换点击
	
	initBusiLayers();//初始化业务图层
	
	initBottomDivStatus();//显示/隐藏底部div

	//initChartAndTable();//初始化图表
	
	//initForm();//初始化条件查询FORM
	
	//initSelectOptions();//初始化查询区域的select控件数据
});

function initMap(){
	var projection = new ol.proj.Projection({
        code: mapConfig.projectioncode,
        units: mapConfig.projectionunits
    });
	var view = new ol.View({
		projection: projection,
		center: mapConfig.center,
		zoom: 0,
		maxResolution: mapConfig.resolutions[0],
		minResolution: mapConfig.resolutions[9]
	});
	
	map = new ol.Map({
		target: "mainmap",
		layers: [],
		view: view,
		controls:ol.control.defaults({
			attribution : false
		})
	});
}
/**
 * 初始化底图
 * */
function initBaseLayers(){
	var baseLayerInfoArr = mapConfig.baselayer;
	for(var i=0;i<baseLayerInfoArr.length;i++){
		var layername = baseLayerInfoArr[i].name;
		var layertitle = baseLayerInfoArr[i].title;
		var baseLayer = new ol.layer.Tile({
			visible: false,
			source: new ol.source.TileWMS({
				url: tileUrl,
				params: {
	                'FORMAT': 'image/png',
	                'VERSION': '1.1.1',
	                'LAYERS': layername,
	                'STYLES': '',
	                'SRS':mapConfig.projectioncode
	            },
				tileGrid: new ol.tilegrid.TileGrid({
					origin: ol.extent.getTopLeft(mapConfig.initextent),
					resolutions: mapConfig.resolutions
				}),
				style: 'default',
				wrapX: true
			})
		});
		baseLayer.setZIndex(999);
		map.addLayer(baseLayer);
		baseLayerArr.push(baseLayer);
		//切换列表
		var li_tag = '<li style="text-align: center;" datatype="'+i+'">';
		li_tag = li_tag + '<a href="javascript:void(0);"> \
							<img src='+ctx+'/resources/commons/map/css/icons/yingxiang.png /> \
						</a><br />'+layertitle;
		li_tag = li_tag + "</li>";
		$("#switchmapwrapper").append($(li_tag));
	}
	
	baseLayerArr[0].setVisible(true);//默认显示第一个
	
}
/**
 *添加业务图层 
 * */
function addBusiLayer(layername){
	var source = new ol.source.TileWMS({
		url: tileUrl,
		params: {
            'FORMAT': 'image/png',
            'VERSION': '1.1.1',
            'LAYERS': layername,
            'STYLES': '',
            'SRS':mapConfig.projectioncode
        },
		tileGrid: new ol.tilegrid.TileGrid({
			origin: ol.extent.getTopLeft(mapConfig.initextent),
			resolutions: mapConfig.resolutions
		}),
		style: 'default',
		wrapX: true
	})
	var layer = new ol.layer.Tile({
		visible: true,
		source:source
	});
	layer.setZIndex(1000);
	map.addLayer(layer);
	busiLayerMap[name] = layer;
}

/**
 * 底图切换
 * */
function switchMap(datatype) {
	for ( var i in baseLayerArr) {
		if(i==datatype){
			baseLayerArr[i].setVisible(true);
		}else{
			baseLayerArr[i].setVisible(false);
		}
	}
}

/**
 * 初始化底图切换相关组件点击事件
 * */
function switchMapClick(){
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

/**
 * 初始化业务图层
 * */
function initBusiLayers(){
	var busiLayerArr = mapConfig.busilayer;
	for(var i=0;i<busiLayerArr.length;i++){
		var layername = busiLayerArr[i].name;
		addBusiLayer(layername);
	}
}
/**
 * 初始化底部div显示和隐藏
 * */
function initBottomDivStatus(){
	$("#up_down_btn").click(function(){
		if($(this).hasClass("glyphicon-chevron-down")){
			$(this).removeClass("glyphicon-chevron-down");
			$(this).addClass("glyphicon-chevron-up");
			$(this).attr("title","显示")
			$("#titlebottom").animate({bottom:'0px'},500);
		}else if($(this).hasClass("glyphicon-chevron-up")){
			$(this).removeClass("glyphicon-chevron-up");
			$(this).addClass("glyphicon-chevron-down");
			$(this).attr("title","隐藏")
			$("#titlebottom").animate({bottom:'300px'},500);
		}
	})
}
/**
 * 初始化图表和表格
 * */
function initChartAndTable(){
	var dataArr = charttable;
	for(var i=0;i<dataArr.length;i++){
		var id = dataArr[i].id;
		var name = dataArr[i].name;
		var title = dataArr[i].title;
		var type = dataArr[i].type;
		var datainterface = dataArr[i].datainterface;
		if(i==0){
			$("#titlebottom").find("ul").append($("<li role='presentation'><a href='#"+id+"' data-toggle='tab'>"+title+"</a></li>"));
			$("#tabContent").append($("<div class='tab-pane fade' id='"+id+"'>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>"));
		}else{
			$("#titlebottom").find("ul").append($("<li role='presentation'><a href='#"+id+"' data-toggle='tab'>"+title+"</a></li>"));
			$("#tabContent").append($("<div class='tab-pane fade' id='"+id+"'>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>"));
		}
		//默认选中第一个标签
		$("#titlebottom").find("ul").find("li").eq(0).find("a").click();
		
		
		switch(type){
			case 'table':
				initColumnmeta();
				initTable(id,datainterface, columnmeta);
				break;
			case 'line':
				
				break;	
		}
		
	}
}

/**
 * 将form表单转为json对象
 * @param {Object} form form对象
 */
function serializeJsonObject(form) {
	var data = $(form).serializeArray();
	var jsonObj = {};
	$(data).each(function(i, obj) {
		jsonObj[obj.name] = obj.value;
	});

	return jsonObj;
}

/**
 * 初始化列表表头信息
 */
function initColumnmeta() {
	var metadata = datainterface.metadata;
	$.each(metadata, function(i, meta) {
		var col = {};
		col.field = meta.name;
		col.title = meta.title;
		columnmeta.push(col);
	});
}

/**
 * 初始化表格
 */
function initTable(id,sqlfilter,columnmeta) {
	$('#'+id).bootstrapTable("destroy");
	$('#'+id).bootstrapTable({
		height: 200,
		url: ctx+'/datainterface/getdata/list/'+sqlfilter, //请求后台的URL（*）
		method: 'POST', //请求方式（*）
		striped: true, //是否显示行间隔色
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true, //是否显示分页（*）
		smartDisplay:false,
		sortable: false, //是否启用排序
		sortOrder: "asc", //排序方式
		paginationLoop: false,
		contentType: "application/json",
		queryParamsType: "undefined",
		queryParams: function queryParams(params) { //设置查询参数
			var param = {
				page: params.pageNumber,
				rows: params.pageSize,
				order: params.sortOrder
			};
			return JSON.stringify(param);
		},
		sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
		pageNumber: 1, //初始化加载第一页，默认第一页
		pageSize: 10, //每页的记录行数（*）
		pageList: [10, 15, 20], //可供选择的每页的行数（*）
		search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
		strictSearch: true,
		clickToSelect: true, //是否启用点击选中行
		columns: columnmeta,
		onDblClickRow: function(row, $row, field) {
			showdetail(name, row); //双击查看详情
		}
	});
}

/**
 * 初始化条件查询FORM
 * */
function initForm(){
	var conditionArr = datainterface.query;
	for(var i=0;i<conditionArr.length;i++){
		var data_interface = conditionArr[i].datainterface;
		var id = conditionArr[i].id;
		var name = conditionArr[i].name;
		var title = conditionArr[i].title;
		var type = conditionArr[i].type;
		var initdata = conditionArr[i].initdata;
		var onchange = conditionArr[i].onchange;
		if(data_interface){
			//查询条件下拉框
			var _html = "<div class='form-group'> \
							<label for="+id+">"+title+"：</label> \
							<select class='form-control' id=sel"+id+" name='"+name+"' dataset='"+data_interface+"' initdata="+initdata+" onchange='"+onchange+"'></select>\
						</div>"; 
		}else{
			//查询条件文本框
			var _html = "<div class='form-group'> \
							<label for="+id+">"+title+"：</label> \
							<input type='text' class='form-control' id="+id+" placeholder=请输入"+title+"> \
						</div>";
		}
		
		$("#queryForm").append($(_html));
	}
	$("#queryForm").append($("<button id='submit_btn' class='btn btn-default'>查询</button>"));
}

/**
 * 初始化查询区域的select控件数据
 */
function initSelectOptions() {
	var querySelect = $("#queryForm select")
	$.each(querySelect, function(i, select) {
		var dataset = $(select).attr("dataset");
		var name = $(select).attr("name");
		var id = $(select).attr("id");
		var initdata = $(select).attr("initdata");
		if(initdata && dataset && id) {
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: ctx + "/datainterface/getdata/list/" + dataset,
				async: true,
				success: function(data) {
					var html = "";
					$(data.data).each(function(i, option) {
						html += "<option value='" + option.ID + "'>" + option.TITLE + "</option>";
					});
					$("#" + id).append($("<option value=''>--请选择--</option>"));
					$("#" + id).append(html);
				}
			});
		}
	});
}

/**
 * 级联 
 */
function getSelectOptions(opt, id) {
	var url = ctx + "/datainterface/getdata/list/" + $("#sel" + id).attr("dataset");
	var data = {};
	data["id"] = $(opt).val();
	$.ajax({
		type: "POST",
		dataType: "json",
		data: JSON.stringify(data),
		contentType: "application/json",
		url: url,
		success: function(data) {
			var html = "<option value=''>--请选择--</option>";
			$(data.data).each(function(i, option) {
				html += "<option value='" + option.ID + "'>" + option.TITLE + "</option>";
			});
			$("#sel" + id).empty();
			$("#sel" + id).append(html);
		}
	});
}

