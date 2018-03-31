var datainterface = dataset;
var tableData = null;
var $table = null;
var initState = true;
$(function() {
	initInput();
	//初始化datetimepicker
	initDatePicker();
	
	//初始化查询区域的select控件数据
	$("#queryForm select").initSelectOptions()
	
	//初始化验证规则
	$("#queryForm").initValidata();

	$("#querybtn").on("click",queryData);
	
});
/**
 * 搜索条件表格数据查询
 */
function queryTable(data) {
	if(type == 'treelist' || type == 'treelistview'){
		var node = getSelectNode();
		params = $.extend(params, node.attributes);
	}
	var data = $("#queryForm").serializeJsonObject({
		isfuzzy: true
	});
	
	data = formatQueryParams(data);
	
	var queryObjs = $("#queryForm .input-group");
	for(var i = queryObjs.length; i >= 0; i--) {
		var node = $(queryObjs[i]).children()[0];
		var querydataset = $(node).attr("querydataset");
		if(querydataset != undefined && querydataset != "" && data[$(node).attr("name")] != "") {
			bootstrapTable(data, datainterface.listview[querydataset]);
			return false;
		} else if(i == 0) {
			bootstrapTable(data, datainterface.listview[0]);
		}
	}
}
/**
*  初始化查询区域的select控件数据
* 
*   ---弃用----请使用public-button.js中initSelectOptions()
*/
function initSelectOptions() {
	var upname = "";
	var querySelect = $("#queryForm select");
	$.each(querySelect, function(i, select) {
		var dataset = $(select).attr("dataset");
		var name = $(select).attr("name");
		var id = $(select).attr("id");
		var value = $(select).attr("value");
		var initdata = $(select).attr("initdata");
		var selectType = $(select).attr("data-type");
		if(initdata || (!$.isEmptyObject(userArea) && userArea[upname] !=null &&　userArea[upname]　!= "") && dataset && id) {
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: cxt + "/datainterface/getdata/list/" + dataset,
				async: false,
				data: JSON.stringify(userArea),
				success: function(data) {
					
					var html = "";
					$(data.data).each(function(i, option) {
						html += "<option value='" + option.ID + "'>" + option.TITLE + "</option>";
					});
					$("#" + id).append(html);
					
					if(selectType == 'treeselect'){
						$("#" + id).TreeSelect({
							height: "400px",
							data: data.data
						});
					}
					if(value != "") {
						$("#" + id).val(value);
					}
					if(userArea[name] != null) {
						$("#" + id).val(userArea[name]);
					}
					if(userArea[name] != null && userArea[name] != '') {
						$("#" + id).parent().parent().css('display', 'none');
					}
					data[name] = userArea[name];
					$("#" + id).trigger("change");
				}
			});
		}
		upname = name;
		if(selectType == 'liveselect'){
			$(select).addClass("selectpicker show-tick show-menu-arrow");
			$(select).css("min-width","");
		}else if(selectType == 'treeselect'){
			$(select).addClass("show-tick show-menu-arrow");
			$(select).css("min-width","");
		}
	});
	
}

function initInput(){
	var queryInputs = $("#queryForm input[type='text']");
	for(var i=0;i<queryInputs.length;i++){
		var name = $(queryInputs[i]).attr("name");
		if($(queryInputs[i]).attr("dynval")){
			$(queryInputs[i]).val(eval("("+$(queryInputs[i]).attr("dynval")+")"));
		}
		if(params[name]){
			$(queryInputs[i]).val(params[name]);
		}
	}
}


/**
 * 重置查询表单数据
 */
function resetForm() {
	$("#queryForm .form-group").each(function(i, obj) {
		if($(obj).css('display') != 'none') {
			var node = $(obj).find("input[name],select[name]");
			var name = $(node).attr("name");
			if(name){
				$(node).val('');
				for(var i=0;i<query.length;i++){
					if(query[i].name == name && query[i].value){
						$(node).val(query[i].value)
					}
				}
				$(node).trigger("change");
			}
		}
		initDatePicker();
	});
	queryData();
}

