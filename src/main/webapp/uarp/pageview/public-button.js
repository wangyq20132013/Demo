/**
 * UADP
 * public-button.js
 * wangyq
 */
var $modal;
var $layer;
/**
 * 打开一个视图
 */
function popupPage(pageviewtype, priviewtitle, pageview, opentype, params, w, h, close) {
	if(opentype == 'modal') {
		popupModalPage(pageviewtype, priviewtitle, pageview, params, w, h, close);
	} else if(opentype == 'new') {
		openWindowPage(pageviewtype, priviewtitle, pageview, params);
	} else if(opentype == 'tab') {
		openTabPage(pageviewtype, priviewtitle, pageview, params);
	} else if(opentype == 'in') {
		openInPage(pageviewtype, priviewtitle, pageview, params);
	}else if(opentype == 'layer') {
		popupLayerPage(pageviewtype, priviewtitle, pageview, params, w, h, close);
	}
}
function popupLayerPage(pageviewtype, priviewtitle, pageview, params, w, h, close){
	var url = cxt + "/pageview/" + pageviewtype + "/" + appname + "/" + pageview;
	if(params) {
		url += "?params=" + encodeURIComponent(JSON.stringify(params));
	}
	if(pageview.indexOf("/")>-1){
		url = cxt + pageview;
	}
	var width = (w == undefined || w == null || w == '') ? innerWidth / 10 * 8 : innerWidth / 100 * (w>100?100:w);
	var height = (w == undefined || w == null || w == '') ? innerHeight / 10 * 8 : innerHeight / 100 * (h>100?100:h);
	$layer = layer.open({
		type: (pageviewtype == 'html'?1:2),
		title: (priviewtitle==''?false:priviewtitle),
		closeBtn: 1,
		move: false,
		shade: 0.6,
		shadeClose: (close && typeof close == 'object')?false:true,
		area:[ width+'px' , height+'px'],
		anim: 2,
		content: (pageviewtype == 'html'?pageview:[ url , 'no']),
		cancel: function(index, layero){
			if(close && typeof close == 'object'){
				layer.confirm("您确定" + close.title + "吗？", {
						btn: ["确定", "取消"]
				}, function(index, layero) {
					layer.close(index);
					layer.close($layer);
					if(close.callback) close.callback();
				},function(index, layero){
					layer.close(index);
					layer.close($layer);
				});
				return false;
			}
		}
	});
}
/**
 * 弹出页面视图（模态框）
 */

function popupModalPage(pageviewtype, priviewtitle, pageview, params, w, h) {
	var url = cxt + "/pageview/" + pageviewtype + "/" + appname + "/" + pageview;
	if(params) {
		url += "?params=" + encodeURIComponent(JSON.stringify(params));
	}
	if(pageview.indexOf("/")>-1){
		url = cxt + pageview;
	}
	var width = (w == undefined || w == null || w == '') ? innerWidth / 10 * 8 : innerWidth / 100 * (w>100?100:w);
	var height = (w == undefined || w == null || w == '') ? innerHeight / 10 * 8 : innerHeight / 100 * (h>100?100:h);
	if(theme == "bootstrap") {
		$('#modal').off("show.bs.modal").off("hidden.bs.modal");
		$modal = $('#modal').on("shown.bs.modal",function(){
			$("#modaliframe").attr("src", url);
		}).on("hidden.bs.modal",function(){
			$modal = undefined;
			$("#modaliframe").attr("src","");
		});
		if(priviewtitle == ''){
			$modal.find(".modal-header").hide();
			$modal.find(".modal-body").height("100%");
		}else{
			$modal.find(".modal-header div").html(priviewtitle);
		}
		
		var $modal_dialog = $modal.find('.modal-dialog');
		var m_top = ($(document.body).height() - height) / 2;
		$modal_dialog.css({
			'margin': m_top + 'px auto',
			"height": height,
			"width": width
		});
		$modal.modal({
			keyboard: true,
		});
	} else if(theme == "easyui") {
		modal = $('#win').window({
			title: priviewtitle,
			"height": height,
			"width": width,
			cache: false,
			href: url,
		});
	}
}

/**
 * 打开页面视图（浏览器新窗口）
 */
function openWindowPage(pageviewtype, priviewtitle, pageview, params) {
	var url = cxt + "/pageview/" + pageviewtype + "/" + appname + "/" + pageview;
	if(pageview.indexOf("/")>-1){
		url = cxt + pageview;
	}
	if(params) {
		url += "?params=" + encodeURIComponent(JSON.stringify(params));
	}
	window.open(url);
}

/**
 * 打开页面视图（新页签窗口）
 */
function openTabPage(pageviewtype, priviewtitle, pageview, params) {
	var url = cxt + "/pageview/" + pageviewtype + "/" + appname + "/" + pageview;
	if(pageview.indexOf("/")>-1){
		url = cxt + pageview;
	}
	if(params) {
		url += "?params=" + encodeURIComponent(JSON.stringify(params));
	}
	parent.Hui_admin_tab({
		"data-href": url,
		"data-title": priviewtitle
	});
}
/**
 * 打开页面视图（当前窗口）
 */
function openInPage(pageviewtype, priviewtitle, pageview, params) {
	var url = cxt + "/pageview/" + pageviewtype + "/" + appname + "/" + pageview
	if(pageview.indexOf("/")>-1){
		url = cxt + pageview;
	}
	if(params) {
		url += "?params=" + encodeURIComponent(JSON.stringify(params));
	}
	window.location.href = url;
}
/**
 * 关闭模态框
 */
function closeModal() {
	if(theme == "bootstrap") {
		if($modal){
			$modal.modal('hide');
			$modal = undefined;
		}else if($layer){
			layer.close($layer);
			$layer = undefined;
		}
		
	} else if(theme == "easyui") {
		$('#win').window('close');
	}

}
/**
 * form表单序列化为json对象
 */
$.fn.serializeJsonObject = function(option) {
	var jsonObj = {};
	var inputs = this.find("input");
	for(var i = 0; i < inputs.length; i++) {
		if(inputs[i].name != null && inputs[i].name != ""){
			if(inputs[i].type == 'checkbox') {
				if(inputs[i].checked && jsonObj[inputs[i].name] != undefined) {
					jsonObj[inputs[i].name] = jsonObj[inputs[i].name] + "," + inputs[i].value;
				}else{
					jsonObj[inputs[i].name] = inputs[i].value;
				}
			} else if(inputs[i].type == 'radio') {
				if(inputs[i].checked && !jsonObj[inputs[i].name]) {
					jsonObj[inputs[i].name] = inputs[i].value;
				}
			} else if(inputs[i].type == 'text' || inputs[i].type == 'password' || inputs[i].type == 'hidden') {
				if(option && option.isfuzzy == true && $(inputs[i]).attr("isfuzzy")) {
					if(inputs[i].value != '') {
						jsonObj[inputs[i].name] = "%" + inputs[i].value + "%";
					} else {
						jsonObj[inputs[i].name] = inputs[i].value;
					}
				} else {
					jsonObj[inputs[i].name] = inputs[i].value;
				}
			}
		}
	}
	var selects = this.find("select");
	for(var i = 0; i < selects.length; i++) {
		jsonObj[selects[i].name] = selects[i].value;
	}
	var textareas = this.find("textarea");
	for(var i = 0; i < textareas.length; i++) {
		jsonObj[textareas[i].name] = textareas[i].value;
	}
	
	return jsonObj;
}
/**
 * 保存数据
 * dataset 数据集
 * data json对象
 * callback  数据保存成功后回调函数
 */
function saveData(dataset, title, data, callback) {
	if(dataset && title && data){
		var parentlayer = parent.layer;
		if(!parentlayer){
			parentlayer = layer;
		}
		parentlayer.confirm("您确定保存" + title + "吗？", {
				btn: ["确定", "取消"]
		}, function(index, layero) {
			parentlayer.close(index);
			index = parentlayer.load();
			$.ajax({
				type: "post",
				dataType: "json",
				contentType: false,
				data: data,
				cache: false,
				processData: false,
				url: cxt + "/datainterface/savedata/" + dataset,
				success: function(data) {
					parentlayer.close(index);
					if(data.success == true) {
						parentlayer.msg("保存成功", {
							icon: 1
						});
						if(typeof(callback) == 'function'){
							callback(data);
						}
					} else {
						parentlayer.msg("保存失败！ "+data.msg, {
							icon: 5
						});
					}
				}
			});
			
		});
	}
}


//格式化 查询参数 附加userArea参数
function formatQueryParams(data){
	var _data = {};
	var defaultQueryValue = getDefaultQueryValue();
	if(typeof initState == "boolean" && initState){
		data = $.extend(data, defaultQueryValue);
		initState = false;
	}
	
	_data = $.extend(_data, data, params, userArea);
	
	return _data;
}

/*
 * 获取 默认查询条件参数
 */
function getDefaultQueryValue(){
	var data  = {};
	for(var i = 0; i< query.length;i++){
		if(query[i].value && query[i].value != ''){
			data[query[i].name] = query[i].value;
		}
	}
	
	return data;
}

/**
 * 初始化列表表头信息
 */
function initColumnmeta(metadata, querycondition) {
	//获取远程数据
	var getMetaData = function(param,querycondition){
		var _data = [];
		uadp.getData("list", param.key, querycondition, false, function(data){
			if(data.data){
				for(var i in data.data){
					var row = {};
					for(var key in data.data[i]){
						row[key.toLowerCase()] = data.data[i][key];
					}
					_data.push(row);
				}
			}
		});
		return _data;
	}
	
	if(typeof metadata == 'string'){
		metadata = getMetaData(metadata, querycondition);
	}else if(metadata.key){
		var data = getMetaData(metadata, querycondition);
		if(metadata.callback){
			metadata = eval(metadata.callback)
		}else if(metadata.data && data){
			metadata = metadata.data.concat(data);
		}else{
			metadata = data;
		}
	}
	if(theme == "bootstrap") {
		$.each(metadata, function(i, meta) {
			if(meta.length){
				$.each(meta, function(i, node) {
					if(node.hidden){
						node.visible = !node.hidden;
					}
					if(node.cellStyle != undefined){
						node.cellStyle = eval("("+node.cellStyle+")");
					}
					if(node.formatter != undefined){
						node.formatter = eval("("+node.formatter+")");
					}
				});
			}else{
				if(meta.hidden){
					meta.visible = !meta.hidden;
				}
				if(meta.cellStyle != undefined){
					meta.cellStyle = eval("("+meta.cellStyle+")");
				}
				if(meta.formatter != undefined){
					meta.formatter = eval("("+meta.formatter+")");
				}
			}
		});
	}
	
	return metadata;
}

/**
 * 设置双日历的起止年份
 */
function setDoubleDateYear(option){
	var year = $(option).val();
	if(year != ""){
		$("#startstopdate").data("daterangepicker").setMinDate(year+"-01-01");
		$("#startstopdate").data("daterangepicker").setMaxDate(year+"-12-31");
		$("#startstopdate").data("daterangepicker").setStartDate(year+"-01-01");
		$("#startstopdate").data("daterangepicker").setEndDate(year+"-12-31");
	}else{
		$("#startstopdate").data("daterangepicker").setMinDate(null);
		$("#startstopdate").data("daterangepicker").setMaxDate(null);
	}
}

/**
 * 设置开始、结束时间（互相约束）
 * @param startid:开始时间ID
 * @param endid:结束时间ID
 * @param type:当前的类型（开始、结束）
 * */
function setStartdateAndEnddate(date,startid,endid,type){
	var start_date = $("#date"+startid).find("input").val();
	var end_date = $("#date"+endid).find("input").val();
	if(type=="start"){
		$("#date"+endid).find("input").data('daterangepicker').setMinDate(date);
		if(start_date>end_date){
			$("#date"+endid).find("input").data('daterangepicker').setEndDate(date);
		}
	}else if(type=="end"){
		$("#date"+startid).find("input").data('daterangepicker').setMaxDate(date);
		if(start_date>end_date){
			$("#date"+startid).find("input").data('daterangepicker').setStartDate(date);
		}
	}
}

/**
 * 初始化select
 * 
 */
$.fn.initSelectOptions = function(data){
	if(data == undefined){
		data = {};
	}
	var obj = $.extend(data,params, userArea);
	this.each(function(i,select){
		var id = $(select).attr("id");
		var name = $(select).attr("name");
		var dataset = $(select).attr("dataset");
		var initdata = $(select).attr("initdata");
		var selectType = $(select).attr("data-type");
		if(id && name && dataset && initdata === 'true'){
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: cxt + "/datainterface/getdata/list/" + dataset,
				async: true,
				data: JSON.stringify(obj),
				success: function(data) {
					var data = data.data;
					$(data).each(function(i, option) {
						$(select).append("<option value='" + option.ID + "'>" + option.TITLE + "</option>")
					});
					var val = $(select).attr("val");
					if(val){
						$(select).data("data",data).val(val)
					}
					
					if(userArea[name] != null && userArea[name] != '') {
						$(select).val(userArea[name]).parentsUntil(".form-group").parent().css('display', 'none');
					}
					switch(selectType){
						case "liveselect":
							$(select).selectpicker();
							$(select).trigger("change");
							break;
						case "treeselect":
							$(select).TreeSelect({
								height: "350px",
								data: data
							});
							break;
						default:
							$(select).trigger("change");
					}
					
				}
			});
		}else if(selectType == 'liveselect'){
			$(select).selectpicker();
		}else if(selectType == 'treeselect'){
			$(select).TreeSelect({data:[]});
		}else{
			var val = $(select).attr("val");
			$(select).val(val)
			if(initdata != 'false'){
				$(select).trigger("change");
			}
		}
	});
}


/**
 * 级联 
 */
function getSelectOptions(opt, id) {
	var name = $(opt).attr("name");
	var value = $(opt).val();
	
	var id_Arr = [];
	if(typeof id == "string" || typeof id == "number"){
		id_Arr.push(id);
	}else if(typeof id == 'object'){
		id_Arr = id;
	}
	
	var data = {};
	data[name] = value;
	var obj  = $.extend(data, userArea);
	
	for(var i = 0;i < id_Arr.length;i++){
		var id = id_Arr[i];
			var dataset = $("#sel" + id).attr("dataset");
			if(dataset && dataset != ''){
				$.ajax({
					type: "POST",
					dataType: "json",
					data: JSON.stringify(obj),
					contentType: "application/json",
					url: cxt + "/datainterface/getdata/list/" + dataset,
					async: false,
					success: function(data) {
						var select = $("#sel" + id);
						
						var html = select.find("option:first")[0];
						var html = html?html.outerHTML:"<option value=''>--请选择--</option>";
						
						if(select.attr("isSelected") == 'false'){
							html = "";
						}
						
						$(data.data).each(function(i, option) {
							html += "<option value='" + option.ID + "'>" + option.TITLE + "</option>";
						});
						
						$(select).html(html);
						
						var val = $(select).attr("val");
						if(val){
							$(select).val(val);
							$(select).removeAttr("val");
						}
						
						var name = $(select).attr("name");
						if(userArea[name] != null && userArea[name] != '') {
							$(select).val(userArea[name]).parentsUntil(".form-group").parent().css('display', 'none');
						}
						
						if(select.attr("data-type") == "liveselect"){
							$(select).selectpicker('refresh');
							$(select).trigger("change");
						}else if(select.attr("data-type") == "treeselect"){
							$(select).TreeSelect({data:data.data});
						}else{
							$(select).trigger("change");
						}
					}
				});
			}
		
	}
}

/**
 * 初始化表单验证规则
 */
$.fn.initValidata = function(){
	var rules = {};
	var messages = {};
	$(this).find("input,select,textarea").each(function(i,node){
		var id = $(this).attr("id");
		var name = $(this).attr("name");
		var type = $(this).attr("type");
		var dataset = $(this).attr("dataset");
		if(name && !rules[name]){
			var isnull = $(this).attr("isnull");
			var min = $(this).attr("_min");
			var max = $(this).attr("_max");
			var rule = $(this).attr("rule");
			var _rule = {};
			var _msg = {};
			if(isnull == 'false'){
				_rule.required = true;
			}
			if(min){
				if(type == "number") _rule.min = parseInt(min);
				else _rule.minlength = min;
			}if(max){
				if(type == "number") _rule.max = parseInt(max);
				else _rule.maxlength = max;
			}if(rule){
				rule = rule.split(",");
				for(var i = 0;i < rule.length;i++){
					if(rule[i] == 'remote'){
						//远程验证唯一性
						if(dataset){
							_rule['remote'] = function(){
								return {
									url: cxt + "/datainterface/verify/"+dataset,
									type:"post",
									data: $("#commonform").serializeJsonObject()
								}
							}
							_msg['remote'] = $(this).attr("placeholder") + "已存在";
						}else{
							console.log("datainterface is not undefined");
						}
					}else if(rule[i] == 'accept'){
						_rule[rule[i]] = $(this).attr("accept");
					}else{
						_rule[rule[i]] = true;
					}
				}
			}
			if(!$.isEmptyObject(_rule)){
				rules[name] = _rule;
				messages[name] = _msg;
			}
			
		}
	});
	$(this).validate({
		rules: rules,
		messages: messages,
		errorPlacement: function(error, element){
			if(element.is(':radio') || element.is(':checkbox')){
				error.appendTo(element.parent().parent());
			}else{
				error.insertAfter(element);
			}
		},
		onkeyup: false,
		focusCleanup: true,
		success: "valid"
	});
}


/**
 * 初始化datetimepicker
 */
function initDatePicker() {
	$(".date").each(function(i, date) {
		var id = $(date).attr("id");
		var type = $(date).attr("type");
		if(type == 'year') {
			$(date).find("input").datetimepicker({
				language: 'zh-CN',
				format: 'yyyy',
				autoclose: true,
				startView: 4,
				minView: 4,
				maxView: 4,
			});
		 $(date).find("input").val(new Date().getFullYear());
		} else if(type == 'date') {
			$(date).find("input").daterangepicker({
				singleDatePicker: true,
				showDropdowns: true,
				timePicker: false, //是否显示小时和分钟  
				timePickerIncrement: 5, //时间的增量，单位为分钟  
				timePicker24Hour: true, //是否使用12小时制来显示时间  
				opens: 'right', //日期选择框的弹出位置  
				separator: ' to ',
				locale: {
					format: 'YYYY-MM-DD',
					applyLabel: '确定',
					cancelLabel: '取消',
					daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
					
					firstDay: 0
				}
			}).on('hide.daterangepicker', function(ev){
				var startid = $(this).attr("startid");
				var endid = $(this).attr("endid");
				var currentType = $(this).attr("currentType");
				var date = $(this).val();
				setStartdateAndEnddate(date,startid,endid,currentType);
			});
		} else if(type == 'datetime') {
			$(date).find("input").daterangepicker({
				singleDatePicker: true,
				showDropdowns: true,
				timePicker: true, //是否显示小时和分钟  
				timePickerIncrement: 5, //时间的增量，单位为分钟  
				timePicker24Hour: true, //是否使用12小时制来显示时间  
				timePickerSeconds:true,
				opens: 'right', //日期选择框的弹出位置  
				separator: ' to ',
				autoApply: false,
				locale: {
					format: 'YYYY-MM-DD HH:mm:ss',
					applyLabel: '确定',
					cancelLabel: '取消',
					daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
					
					firstDay: 0
				}
			});
		} else if(type == 'doubledate') {
			$(date).find("input").daterangepicker({
				startDate: moment().startOf('year'),
				endDate: moment(),
				autoUpdateInput: true,
				showDropdowns: true,
				showWeekNumbers: false, //是否显示第几周  
				timePicker: false, //是否显示小时和分钟  
				timePickerIncrement: 60, //时间的增量，单位为分钟  
				timePicker24Hour: true, //是否使用12小时制来显示时间  
				alwaysShowCalendars: true,
				/*ranges: {
					'今日': [moment().startOf('day'), moment()],
					'昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
					'最近7日': [moment().subtract('days', 6), moment()],
					'最近30日': [moment().subtract('days', 29), moment()],
					'今年':[moment().startOf('year'), moment()]
				},*/
				autoApply: true,
				linkedCalendars: false,
				opens: 'center', //日期选择框的弹出位置  
				buttonClasses: ['btn btn-default'],
				applyClass: 'btn-small btn-success blue',
				cancelClass: 'btn-small',
				format: 'YYYY-MM-DD', //控件中from和to 显示的日期格式  
				separator: ' to ',
				locale: {
					format: 'YYYY-MM-DD',
					separator: ' - ',
					applyLabel: '确定',
					cancelLabel: '清空',
					customRangeLabel: '自定义',
					firstDay: 0
				}
			}).on("apply.daterangepicker",function(ev, picker){
				$(this).val(picker.startDate.format("YYYY-MM-DD") + ' - ' +　picker.endDate.format("YYYY-MM-DD"));
			}).on("cancel.daterangepicker",function(ev, picker){
				$(this).val("");
			});
			
		} else if(type == 'month'){
			$("#"+id).find("input").datetimepicker({
				language: 'zh-CN',
				format: 'm',
				autoclose: true,
				startView: 3,
				minView: 3,
				maxView: 3,
			});
		 	$("#"+id).find("input").val(new Date().getMonth()+1);
			$('.datetimepicker-months').find("thead tr").css("visibility","hidden");
	 		$('.datetimepicker-months').find("thead span").removeClass();
			$('.table-condensed').css('width','202px');	
		}
	});
}

var uadp = {
	getData: function (type, dateset , data, async, callback){
		var resultData = [];
		if(typeof async == "function"){
			callback = async;
			async = true;
		}
		$.ajax({
			type:"post",
			url:cxt+"/datainterface/getdata/"+type+"/"+dateset,
			contentType: "application/json",
			data : JSON.stringify(data),
			dataType:"JSON",
			async: async,
			success: function(result){
				resultData = result
				callback(result);
			}
		});
		
		return resultData;
	},
	saveData: function(dataset, title, data, callback){
		if(dataset && title && data){
			parent.layer.confirm("您确定保存" + title + "吗？", {
					btn: ["确定", "取消"]
			}, function(index, layero) {
				parent.layer.close(index);
				index = parent.layer.load();
				$.ajax({
					type: "post",
					dataType: "json",
					contentType: "application/json",
					data : JSON.stringify(data),
					url: cxt + "/datainterface/savedata/" + dataset,
					success: function(data) {
						parent.layer.close(index);
						if(data.success == true) {
							parent.layer.msg("保存成功", {
								icon: 1
							});
							if(typeof(callback) == 'function'){
								callback(data);
							}
						} else {
							layer.msg("保存失败！ "+data.msg, {
								icon: 5
							});
						}
					}
				});
				
			});
		}
	}
}

