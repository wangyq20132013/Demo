var getTableHeight = function(){
	return $("body").height() - $("#opt").outerHeight(true) - $("#query").outerHeight(true)- 50;
}
var datainterface = dataset;
var tableData;
var $table;
$(function() {
	if(type == 'listview' || type == 'listtreeview'){
		if(dataset.listview[0].init== undefined || dataset.listview[0].init == true){
			queryTable();
		}
	}
});

function queryData(){
	if($("form").valid()) {
		queryTable();
	}
}

/**
 * 表格查询
 */
function bootstrapTable(querycondition, dataset) {
	getTableHeight = $(window).height() - $("#opt").outerHeight(true) - $("#query").outerHeight(true)- 50;
	var $querybtn = $("#querybtn").button("loading");
	$("#resetbtn").attr("disabled", true);
	
	if($table){
		$table.bootstrapTable("refreshOptions",{
			columns:initColumnmeta(dataset.metadata,querycondition),
			queryParams: function (param){
				var data = {
					page: param.pageNumber,
					rows: param.pageSize,
					sortName: param.sortName,
					sortOrder: param.sortOrder,
					searchText: param.searchText
				};
				var obj = $.extend(data,querycondition,params);
				if(typeof initTableBefore == 'function'){
					var result = initTableBefore();
					obj = $.extend(obj, result);
				}
				return JSON.stringify(obj);
			}
		});
	}else{
		var bootstrapTableOptions = {
			height: getTableHeight,
			url: cxt + "/datainterface/getdata/bootstraptable/" + dataset.name, //请求后台的URL（*）
			method: 'POST', //请求方式（*）
			striped: true, //是否显示行间隔色
			cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination: (dataset.pagination==undefined?true:dataset.pagination), //是否显示分页（*）
			sortable: true, //是否启用排序
			sortOrder: "asc", //排序方式
			paginationLoop: false,
			undefinedText: '',
			smartDisplay:false,
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
				var obj = $.extend(data,querycondition,params);
				
				if(typeof initTableBefore == 'function'){
					var result = initTableBefore(this);
					obj = $.extend(obj, result);
					console.log(obj);
				}
				
				return JSON.stringify(obj);
			},
			sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
			pageNumber: 1, //初始化加载第一页，默认第一页
			pageSize: 30, //每页的记录行数（*）
			pageList: dataset.pageList?dataset.pageList:[30, 50, 100], //可供选择的s每页的行数（*）
			clickToSelect: false, //是否启用点击选中行
			singleSelect: false, //单选
			columns: initColumnmeta(dataset.metadata,querycondition),
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
			responseHandler: function(res){
				if(dataset.responseHandler){
					return eval(dataset.responseHandler)
				}else{
					return res;
				}
			},
			onCheck:function(row, $row, cell){
				var check = dataset.check;
				if(check != undefined && check != "") {
					eval(check);
				}
			},			
			onLoadSuccess:function(data){
				$("td,th").addClass("text-center");
				$querybtn.button("reset");
				$("#resetbtn").attr("disabled",false);
				typeof(tableMarge) == 'function'?tableMarge():false;
				typeof(tableMerge) == 'function'?tableMerge(data,dataset):false;
				typeof(loadSuccess) == 'function'?loadSuccess(data,dataset):false;
				(datainterface.listview[0].pagination == false)?$('.fixed-table-pagination').hide():$('.fixed-table-pagination').show();
				(datainterface.listview[0].paginationinfo == false)?$('.pagination-info').hide():$('.pagination-info').show();
				
				if(params.dom_id){getParentValueSelectRow(params.dom_id,params.dom_name);}
			}
		};
		$table = $('#table').bootstrapTable(bootstrapTableOptions);
	}
}




/**
 * 表格查询
 */
function bootstrapTable1(querycondition, dataset) {
	$('#table').bootstrapTable("destroy");
	getTableHeight = $(window).height() - $("#opt").outerHeight(true) - $("#query").outerHeight(true)- 50;
	var $querybtn = $("#querybtn").button("loading");
	$("#resetbtn").attr("disabled", true);
	$table = $('#table').bootstrapTable({
		height: getTableHeight,
		url: cxt + "/datainterface/getdata/bootstarptable/" + dataset.name, //请求后台的URL（*）
		method: 'POST', //请求方式（*）
		striped: true, //是否显示行间隔色
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: (dataset.pagination==undefined?true:dataset.pagination), //是否显示分页（*）
		sortable: true, //是否启用排序
		sortOrder: "asc", //排序方式
		paginationLoop: false,
		undefinedText: '',
		smartDisplay:false,
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
		pageList: dataset.pageList?dataset.pageList:[30, 50, 100], //可供选择的s每页的行数（*）
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
		onCheck:function(row, $row, cell){
			var check = dataset.check;
			if(check != undefined && check != "") {
				eval(check);
			}
		},			
		onPageChange:function(number, size){
			typeof(tableMarge) == 'function'?tableMarge():false;
		},
		onLoadSuccess:function(data){
			$("td,th").addClass("text-center");
			$querybtn.button("reset");
			$("#resetbtn").attr("disabled",false);
			typeof(tableMarge) == 'function'?tableMarge():false;
			typeof(tableMerge) == 'function'?tableMerge(data,dataset):false;
			typeof(loadSuccess) == 'function'?loadSuccess(data,dataset):false;
			(datainterface.listview[0].pagination == false)?$('.fixed-table-pagination').hide():$('.fixed-table-pagination').show();
			(datainterface.listview[0].paginationinfo == false)?$('.pagination-info').hide():$('.pagination-info').show();
			
			if(params.dom_id){getParentValueSelectRow(params.dom_id,params.dom_name);}
		},
	});
}

//将value写入父页面的指定位置
function setParentForm(row){
	parent.setFormValue(row);
	parent.closeModal();
}
//获取父页面的参数 勾选中行
function getParentValueSelectRow(id, name){
	var value = $("#"+id, window.parent.document).val();
	var params = {};
	params["field"] = name;
	params["values"] = [value];
	
	selectRows(params);
}
//勾选中 相应的行
function selectRows(data){
	$table.bootstrapTable('checkBy', data);
}

