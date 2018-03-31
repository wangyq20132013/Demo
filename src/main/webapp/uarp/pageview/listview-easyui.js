var height = innerHeight - 70;
var width = innerWidth;
$(function() {
	$('#mb').menubutton({
		menu: '#mm'
	});
	query();
	initSelectOptions();

	
});

function query() {
	var data = $("#queryForm").serializeArray();
	datagrid(data);
}
/**
 * 初始化查询区域的select控件数据
 */
function initSelectOptions() {
	var querySelect = $("#queryForm select");
	$.each(querySelect, function(i, select) {
		var dataset = $(select).attr("dataset");
		var id = $(select).attr("id");
		var initdata = $(select).attr("initdata");
		if(initdata && dataset && id) {
			$.ajax({
				type: "get",
				dataType: "json",
				url: cxt + "/datainterface/getdata/list/" + dataset,
				async: true,
				success: function(data) {
					var html = "";
					$(data.data).each(function(i, option) {
						html += "<option value='" + option.ID + "'>" + option.TITLE + "</option>";
					});
					$("#" + id).append(html);
				}
			});
		}
	});
}
/**
 * 表格查询
 */
function datagrid(data) {
	$('#listview').datagrid({
		loadMsg: '正在加载，请稍后...',
		method: 'post',
		nowrap: true,
		height: height,
		width:width,
		fitColumns: true,
		striped: true,
		collapsible: true,
		loader:function(param,success,error){
			$.ajax({
				type: "POST",
				dataType: "json",
				url: cxt + "/datainterface/getdata/easyui/" + dataset,
				contentType:"application/json",
				data:JSON.stringify(param),
				success:function(data){
					success(data);
				}
			});
		},
		columns:[$.parseJSON(metadata)],
		pagination: true,
		rownumbers: true,
	});

}