var getTableHeight = function(){
	return $("body").height() - $("#opt").outerHeight(true) - $("#query").outerHeight(true)- 50;
}
var myChart = null;
var interface = dataset;
var tableData;
var $table;
var initState = true;
$(function() {
	$("#listview").hide();
	$("#sample").height(getTableHeight);
	//先清空div内的统计图
	$("#sample").html("");
	myChart = echarts.init(document.getElementById('sample'));
	//重写图例点击事件
	myChart.on('legendselectchanged',function(obj){
		var selected = obj.selected;
		var name = obj.name;
		if( isAllunselected(selected)){
			triggerAction(myChart,'legendSelect',name);
		}
	});
	queryData();
});

function queryData(){
	queryEcharts();
	if(queryTable){
		queryTable();
	}
}
//判断是否图例全部关闭
function isAllunselected(selected){
	var selectedCount = 0;
	for (name in selected){
		if(!selected.hasOwnProperty(name)){
			continue;
		}
		if(selected[name] == true){
			++selectedCount;
		}
	}
	return selectedCount ==0;
}
//打开一个图例
function triggerAction(myChart,action,name){
	var legend = [];
	legend.push({name : name});
	myChart.dispatchAction({
		type:action,
		batch:legend
	});
}
/**
 * 搜索条件统计图查询
 */
function queryEcharts() {
	var data = $("#queryForm").serializeJsonObject({
		isfuzzy: true
	});
	data = formatQueryParams(data);
	
	var queryObjs = $("#queryForm .input-group");
	for(var i = queryObjs.length;i >= 0;i--){
		var node = $(queryObjs[i]).children()[0];
		var querydataset = $(node).attr("querydataset");
		if(querydataset != undefined && querydataset != "" && data[$(node).attr("name")] != ""){
			initSimpleEcharts(data, interface.echartsview[querydataset]);
			return false;
		}else if(i == 0){
			initSimpleEcharts(data, interface.echartsview[0]);
		}
	}
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
		pagination:false,// (dataset.pagination==undefined?true:dataset.pagination), //是否显示分页（*）
		sortable: true, //是否启用排序
		sortOrder: "asc", //排序方式
		smartDisplay:false,
		paginationLoop: true,
		undefinedText: '',
		contentType: "application/json",
		queryParamsType: "undefined",
		idFieId: dataset.keyid,
		uniqueId: dataset.keyid,
		queryParams: function queryParams(param) { //设置查询参数
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
		pageList: [30, 50, 100], //可供选择的s每页的行数（*）
		search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
		clickToSelect: false, //是否启用点击选中行
		singleSelect: false, //单选
		columns: initColumnmeta(dataset.metadata),
		rowStyle: function(row, index){
			for(var j = 0;j < mergeRowIndex.length;j++){
				if(mergeRowIndex[j] == index){
					return {classes:"total-row"};
				}
			}
			
			return {};
		},
		onDblClickRow: function(row, $row, field) {
			var dblclick = dataset.dblclick;
			if(dblclick != undefined && dblclick != "") {
				eval(dblclick);
			}
		},
		onClickCell: function(field, value, row, $cell) {
			var clickcell = dataset.clickcell;
			if(clickcell != undefined && clickcell != "") {
				eval(clickcell);
			}
		},
		onClickRow:function(row, $row, cell){
			$table.bootstrapTable('uncheckAll');
			$table.bootstrapTable('check',$row.attr("data-index"));
			var click = dataset.click;
			if(click != undefined && click != "") {
				eval(click);
			}
			
			if(type == 'listtreeview'){
				typeof(loadTree) == "function"?loadTree(row):false;
			}
		},
		onPageChange:function(number, size){
			typeof(tableMarge) == 'function'?tableMarge():false;
		},
		onLoadSuccess:function(data){
			$querybtn.button("reset");
			$("#resetbtn").attr("disabled",false);
			typeof(tableMarge) == 'function'?tableMarge():false;
			typeof(tableMerge) == 'function'?tableMerge(data,dataset):false;
			typeof(loadSuccess) == 'function'?loadSuccess(data,dataset):false;
			(interface.listview[0].pagination == false)?$('.fixed-table-pagination').hide():$('.fixed-table-pagination').show();
			(interface.listview[0].paginationinfo == false)?$('.pagination-info').hide():$('.pagination-info').show();
		},
		
	});
	
}


/**
 * 生成统计图
 */
function initSimpleEcharts(querycondition, dataset){
	
	var metadata = dataset.metadata;
	var metadatasize = dataset.metadata.length;
	var series=[];
	//异步加载数据
	$.ajax({
		type:"post",
		url:cxt + "/datainterface/getdata/simpleecharts/" + dataset.name,
		async:false,
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify(querycondition),
		success: function(data) {
			var dataArray = data.data;
			/*var series = [];*/
			var legends = [];
			var selectedMap = {};
			var xAxis = [];
			for(var i = 0;i < metadatasize; i++){
				legends.push(metadata[i].title);
				if( i!= 0){
					selectedMap[metadata[i].title] = false;
				}
				var dataName = metadata[i].name;
				var dataArrV = [];
				for(var x = 0;x < dataArray.length; x++){
					dataArrV.push(data.data[x][dataName]);
					
					xAxis.push(data.data[x].KEY);
				}
				var serie = {};
				serie.name = metadata[i].title;
				//serie.type = charttype;
				serie.type = 'bar';
				serie.data = dataArrV;
				series.push(serie);
			}
			// 填入数据
			
			myChart.setOption({
				title : {
					text : name
					//subtext  : '数据来源:数据库'
				},
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			    	data : legends,
			    	selected:dataset.selected== undefined ? selectedMap:dataset.selected,
			    	selectedMode:dataset.selectedMode== undefined ? 'single':dataset.selectedMode,//巡检 春检 秋检
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            /*mark : {show: true},
			            dataView : {show: true, readOnly: false},*/
			            magicType : {show: true, type: ['line', 'bar']},
			            //restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : false,
			    grid : {
			    	y2:140
			    },
			    xAxis : [
			        {
			            type : 'category',
			            axisLabel:{
			            	interval:0,
			            	rotate:30,
			            	margin:2,
			            	textStyle:{color:"#222"}
			            	/*formatter:function(val){
			            		return val.split("").join("\n");
			            	}*/
			            },
			            data : xAxis
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : series//巡检的具体成绩
			},true);
		}
	});
}
/**
 * 切换表格视图与统计视图
 */
function changeView(opt){
	var viewType = $(opt).attr("viewtype");
	if(viewType == "listview"){
		$("#listview").hide();
		$("#echartsview").show();
		$("#querybtn").unbind( "click" );
		$("#querybtn").bind("click",queryEcharts);
		$("#sample").height(getTableHeight);
		queryEcharts();
		$("#querybtn").bind("click",queryTable);
		queryTable();
		$(opt).attr("viewtype","echartsview")
		$(opt).html('<i class="glyphicon glyphicon-th-list"></i>&nbsp;&nbsp;查看表格数据');
	}else if(viewType == undefined || viewType == "echartsview"){
		$("#echartsview").hide();
		$("#listview").show();
		$("#querybtn").unbind( "click" );
		$("#querybtn").bind("click",queryTable);
		queryTable();
		$("#querybtn").bind("click",queryEcharts);
		queryEcharts();
		$(opt).attr("viewtype","listview")
		$(opt).html('<i class="glyphicon glyphicon-stats"></i>&nbsp;&nbsp;查看统计数据');
	}
}
