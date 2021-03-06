var height = innerHeight;
$(function() {
	$('[data-toggle="popover"]').on("show.bs.popover",function(){
		setTimeout(function(){
			$(".popover").popover("hide");
		}, 2000);
	}).popover();
	
	$("select").initSelectOptions();
	
	initDatePicker();
	
	//初始化radio内容
	initFormRadio();
	
	//初始化checkbox内容
	initFormCheckbox();
	
	//初始化编辑器
	initEditor();
	
	//初始化表单数据
	initFormData();
	
	//初始化验证规则
	$("#commonform").initValidata();
	
});


function initFormRadio(){
	$(".radio_region").each(function(){
		var div_region = $(this);
		var dataset = div_region.attr("dataset");
		var name = div_region.attr("radio-name");
		var isnull = div_region.attr("isnull")?div_region.attr("isnull"):"";
		var min = div_region.attr("min")?div_region.attr("min"):"";
		var max = div_region.attr("max")?div_region.attr("max"):"";
		var rule = div_region.attr("rule")?div_region.attr("rule"):"";
		if(dataset){
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: cxt + "/datainterface/getdata/list/" + dataset,
				async: false,
				success: function(data) {
					var html = "";
					$(data.data).each(function(i, option) {
						if(i == 0){
							html += "<div class='radio-inline  radio-primary'><input type='radio' id='"+name+i+"' name='" + name + "' value='" + option.ID + "' isnull='"+isnull+"' _min='"+min+"' _max='"+max+"' rule='"+rule+"' checked/><lable for='"+name+i+"'>" + option.TITLE +"</lable></div>";
						}else{
							html += "<div class='radio-inline  radio-primary'><input type='radio' id='"+name+i+"' name='" + name + "' value='" + option.ID + "' /><lable for='"+name+i+"'>" + option.TITLE +"</lable></div>";
						}
					});
					div_region.empty();
					div_region.append(html);
				}
			});
		}
	});
}

function initFormCheckbox(){
	$(".checkbox_region").each(function(){
		var div_region = $(this);
		var dataset = div_region.attr("dataset");
		var name = div_region.attr("checkbox-name");
		var isnull = div_region.attr("isnull");
		var min = div_region.attr("min");
		var max = div_region.attr("max");
		var rule = div_region.attr("rule");
		if(dataset){
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: cxt + "/datainterface/getdata/list/" + dataset,
				async: false,
				success: function(data) {
					var html = "";
					$(data.data).each(function(i, option) {
						if(i == 0){
							html += "<lable class='checkbox'><input type='checkbox' name='" + name + "' value='" + option.ID + "' isnull='"+isnull+"' _min='"+min+"' _max='"+max+"' rule='"+rule+"' />" + option.TITLE+"</lable>";
						}else{
							html += "<lable class='checkbox'><input type='checkbox' name='" + name + "' value='" + option.ID + "'/>" + option.TITLE+"</lable>";
						}
					});
					
					div_region.empty();
					div_region.append(html);
				}
			});
		}
	});
}
function initEditor(){
	$(".editor").each(function(){
		var id =  $(this).attr("id");
		var height = $(this).height();
		var ue = UE.getEditor(id,{
			initialFrameHeight: height,
			autoHeightEnabled: false,
			elementPathEnabled:false
		});
	});
}

function resetFormData(){
	/*$("#commonform input[readonly!='readonly']").each(function(){
		var controlid = $(this).attr("id");
		var controlname = $(this).attr("name");
		var controltype = $(this).attr("type");
		var data_type = $(this).attr("data-type");
		if(controlname){
			if(controltype == 'hidden' || controltype == 'serial' || controltype == 'text' || controltype == 'number' || controltype == 'date' || controltype == 'datetime'){
				$(this).val('');
			}else if(controltype == 'radio' || controltype == 'checkbox'){
				$(this).attr("checked",false);
			}
		}
	});
	$("#commonform select").each(function(){
		$(this).val('').trigger("change");
	});
	$("#commonform textarea").each(function(){
		$(this).val('');
	});
	initFormData();*/
	window.location.reload();
}

function initFormData(data){
	$("#commonform input").each(function(){
		var controlid = $(this).attr("id");
		var controlname = $(this).attr("name");
		var controltype = $(this).attr("type");
		var data_type = $(this).attr("data-type");
		if(controlname){
			var key = controlname.toUpperCase();
			var controlvalue = data?data[key]:params[key];
			if(controlvalue != undefined){
				if(controltype == 'hidden' || controltype == 'text' || controltype == 'number' || controltype == 'date' || controltype == 'datetime'){
					$(this).val(controlvalue);
				}else if(controltype == 'radio' || controltype == 'checkbox'){
					if($(this).val() == controlvalue){
						$(this).attr("checked",true);
					}
				}
			}
			if(data_type == 'serial'){
				var value = $(this).val();
				var dataset = $(this).attr("dataset");
				if(dataset && value == ''){
					$.ajax({
						type: "post",
						dataType: "json",
						url: cxt + "/approval/code/"+ dataset,
						success: function(data) {
							if(data.success){
								$("#"+controlid).val(data.msg);
							}
						}
					});
				}
			}
			if(controltype == 'file'){
				getAttach(params.ID);
			}if(data_type == 'mapselect'){
				var dataset = $(this).attr("dataset");
				var pageview = $(this).attr("pageview");
				var value = $(this).attr("value");
				if(dataset && value == ''){
					uadp.getData("list",dataset, params, function(data){
						if(data.data.length>0){
							$("#"+controlid).val(data.data[0].MAPGEOMETRY);
						}
					});
				}
			}
			if(data_type == 'map'){
				var dataset = $(this).attr("dataset");
				var pageview = $(this).attr("pageview");
				var value = $(this).val();
				var _url = cxt+"/pageview/map/"+appname+"/"+pageview+"?params=" + encodeURIComponent("{dom_id:'"+controlid+"'}");
				if(dataset && value == ''){
					uadp.getData("list",dataset, params, function(data){
						if(data.data && data.data.length>0){
							$("#"+controlid).val(data.data[0].MAPGEOMETRY);
						}
						$("#"+controlid).parent().find("iframe").attr("src", _url);
					});
				}else{
					$("#"+controlid).parent().find("iframe").attr("src", _url);
				}
			}
			
			if(data_type == 'table'){
				var pageview = $(this).attr("pageview");
				if(pageview){
					var listviewUrl = cxt+"/pageview/list/"+appname+"/"+pageview;
					if(params) {
						listviewUrl += "?params=" + encodeURIComponent(JSON.stringify(params));
					}
					$("#"+controlid).parent().find("iframe").attr("src", listviewUrl);
				}
			}
		}
	});
	$("#commonform select").each(function(){
		var controlname = $(this).attr("name");
		var controltype = $(this).attr("data-type");
		var key = controlname.toUpperCase();
		var controlvalue = params[key];
		if(controlvalue && controlvalue != ''){
			if(controltype == 'liveselect'  || controltype == 'treeselect' ){
				if($(this).find("option").length > 1){
					$(this).val(controlvalue).trigger("change");
				}else{
					$(this).attr("val", controlvalue);
				}
			}else {
				if($(this).find("option").length > 1){
					$(this).val(controlvalue).trigger("change");
				}else{
					$(this).attr("val", controlvalue);
				}
			}
		}
	});
	$("#commonform textarea").each(function(){
		var controlname = $(this).attr("name");
		var controltype = $(this).attr("data-type");
		var key = controlname.toUpperCase();
		var controlvalue = params[key];
		if(controlvalue && controlvalue != ''){
			$(this).val(controlvalue);
		}
	});
}
//构造checkbox提交格式数据
function formatCheckboxData(data){
	var tmp_arr = [];
	var tmp_name = "";
	$("#commonform input[type='checkbox']:checked").each(function(i){
		var name = $(this).attr("name");
		if(name != tmp_name){
			tmp_arr.push(name);
			tmp_name = name;
		}
	});
	$(tmp_arr).each(function(i, name){
		var value = data.getAll(name);
		data.delete(name);
		data.append(name, value);
	})
}

/**
 * 保存表单数据
 */
function saveFormData(dataset, title, callback) {
	if($("form").valid()) {
		//保存之前，提供二次开发接口，目前treeform需要
		if(typeof(preSaveFormData) !='undefined'){
			if(preSaveFormData() == false){
				return false;
			}
		}

		var data = new FormData($("form")[0]);
		//构造checkbox提交格式数据
		formatCheckboxData(data);
		
		if(false) {
			if(typeof(params) != 'object'){
				params = $.parseJSON(params);
			}
			for(var key in params){
				if(typeof(params[key]) == 'object'){
					var jsonStr = JSON.stringify(params[key]);
					data.append(key, jsonStr);
				}else{
					data.append(key, params[key]);
				}
			}
		}

		saveData(dataset, title, data, function(){
			if(typeof parent.queryTable == 'function'){
				parent.queryTable();
				parent.closeModal();
			}
			//treelistview编辑树节点，刷新树
			if(typeof(parent.refreshTree) == 'function'){
				parent.refreshTree();
				parent.closeModal();
			}
			
			//treefromview
			if(typeof(refreshLeftTree) == 'function'){
				refreshLeftTree();
			}
			
		});
	}
}

