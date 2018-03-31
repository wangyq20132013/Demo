var getTableHeight = function(){
	return $("body").height() - $("#opt").outerHeight(true) - $("#query").outerHeight(true)- 50;
}
$("#mapview").height(getTableHeight());
var interface = dataset;
var tableData;
var $table;
$(function() {
	queryData();
});
function queryData(){
	queryTable();
}
/**
 * 表格查询
 */
function bootstrapTable(querycondition, dataset) {
	var width = $("#listview").outerWidth()/2;
	$('#table').bootstrapTable("destroy");
	var $querybtn = $("#querybtn").button("loading");
	$("#resetbtn").attr("disabled", true);
	$table = $('#table').bootstrapTable({
		height: getTableHeight(),
		url: cxt + "/datainterface/getdata/bootstarptable/" + dataset.name, //请求后台的URL（*）
		method: 'POST', //请求方式（*）
		striped: true, //是否显示行间隔色
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true, //是否显示分页（*）
		smartDisplay:false,
		sortable: false, //是否启用排序
		sortOrder: "asc", //排序方式
		paginationLoop: false,
		undefinedText: '',
		contentType: "application/json",
		queryParamsType: "undefined",
		queryParams: function queryParams(param) { //设置查询参数
			var data = {
				page: param.pageNumber,
				rows: param.pageSize,
				order: param.sortOrder,
				searchText: param.searchText == undefined?'':param.searchText
			};
			var obj = $.extend(data,querycondition);
			
			return JSON.stringify(obj);
		},
		sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
		pageNumber: 1, //初始化加载第一页，默认第一页
		pageSize: 30, //每页的记录行数（*）
		pageList: [30, 50, 100, '全部'], //可供选择的每页的行数（*）
		search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
		clickToSelect: false, //是否启用点击选中行
		columns: initColumnmeta(dataset.metadata),
		onClickCell: function(field, value, row, $cell) {
			var clickcell = dataset.clickcell;
			if(clickcell != undefined && clickcell != "") {
				eval(clickcell);
			}
		},
		onPageChange:function(number, size){
			tableMarge();
			
			onPageChangeMap();
		},
		onLoadSuccess:function(data){
			$querybtn.button("reset");
			$("#resetbtn").attr("disabled",false);
			if(type == 'listmap' || type == 'maplist'){
//				window.frames[0].aa(data);
			}
			tableMarge();
			//if(interface.listview[0].paginationinfo == false) $('.pagination-info').hide();
			
			onPageChangeMap();
			
//			if(mapOption.linstring&&mapOption.linstring.show == true) lineString(mapOption.linstring);
		},
		onClickRow:function(row,$row,cell){
			$table.bootstrapTable('uncheckAll');
			$table.bootstrapTable('check',$row.attr("data-index"));
			
			if(mapOption.poilight&&mapOption.poilight == true) lightMapLayer(row);
			if(mapOption.popup&&mapOption.popup == true) popupAnim(row);
			if(mapOption.click&&mapOption.click == true){ map.getView().setCenter([Number(row.X),Number(row.Y)]); map.getView().setZoom(22);}
			if(mapOption.globalheight&&mapOption.globalheight["show"] == true) globalHeight(mapOption.globalheight,row);
		},
		
	});
	
}
/*
 * 翻页地图绘制
 */
function onPageChangeMap(){
	//添加 linestring 参数
	var rows = $('#table').bootstrapTable("getData");
	mapOption.linstring["params"]["rows"] = [];
	for(var i = 0 ; i < rows.length ; i ++){
		mapOption.linstring["params"]["rows"].push($('#table').bootstrapTable("getData")[i]);
	}
	if(mapOption.linstring&&mapOption.linstring.show == true) lineString(mapOption.linstring);
}
