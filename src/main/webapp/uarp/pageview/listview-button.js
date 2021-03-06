/*核心操作JS-zhaijj*/
/**
 * 编辑一条记录
 */
function editRecord(pageviewtype, priviewtitle, pageview, opentype, _params, w, h) {
	if(typeof(_params) != 'object'){//兼容之前json配置
		h = w;
		w = _params;
		_params = {};
	}
	var rows = getCheckedRows();
	if(rows.length && rows.length == 1) {
		var data = {};
		var row = rows[0];
		if($("#queryForm").length && $("#queryForm").length > 0) {
			var querydata = $("#queryForm").serializeJsonObject();
			if(querydata != undefined) {
				data.querydata = querydata;
			}
		}
		
		var obj = $.extend(data, row, _params);
		popupPage(pageviewtype, priviewtitle, pageview, opentype, obj, w, h);
	} else if(rows.length > 1) {
		layer.msg("只选择一条记录！", {
			icon: 0,
			time: 2000
		});
	} else {
		layer.msg("请选择一条记录！", {
			icon: 0,
			time: 2000
		});
	}
}
/**
 * 编辑多条记录
 */
function editRecords(pageviewtype, priviewtitle, pageview, opentype, _params, w, h) {
	if(typeof(_params) != 'object'){//兼容之前json配置
		h = w;
		w = _params;
		_params = {};
	}
	var rows = getCheckedRows();
	if(rows.length > 0) {
		var data = {};
		data.list = rows;
		popupPage(pageviewtype, priviewtitle, pageview, opentype, data, w, h);
	} else {
		layer.msg("请至少选择一条记录！", {
			icon: 0,
			time: 2000
		});
	}
}
/**
 * 添加记录
 */
function addRecord(pageviewtype, priviewtitle, pageview, opentype, _params, w, h) {
	
	if(typeof(_params) != 'object'){//兼容之前json配置
		h = w;
		w = _params;
		_params = {};
	}
	//如果json不为空，对其参量进行值域替换
	_params = replaceParams(_params);
	
	if(type == 'treelist' || type == 'treelistview'){
		var node = getSelectNode();
		if(node){
			var obj = $.extend(node.attributes, _params);
			popupPage(pageviewtype, priviewtitle, pageview, opentype, obj, w, h);
		}else{
			layer.msg("请选择一个节点进行操作", {icon: 5});
		}
	}else{
		popupPage(pageviewtype, priviewtitle, pageview, opentype, _params, w, h);
	}
}
/**
 * 替换 变量参数   例如：{"id":"$id$"}
 * @param {Object} _params
 */
function replaceParams(_params){
	for(var key in _params){
		if(_params[key].match(/\$([^\s]+)\$/)){
			_params[key] = params[_params[key].match(/\$([^\s]+)\$/)[1]];
		}
	}
	
	return _params;
}


/**
 * 删除记录
 */
function deleteRecords(dataset, title) {
	executeDataInterfaceForRows(dataset, title);
}


/**
 * 树结构右侧表格添加记录（同级)tree
 */
function addRecordtreelist(pageviewtype, priviewtitle, pageview, opentype, params, w, h) {
	if($('#tree').treeview('getSelected').length != 0 && $('#tree').treeview('getSelected').nodes == null) {
		var node = getSelectNode();
		var data = {
			PARENTID: node.attributes.UUID,
			ISGROUP: 0
		};
		var obj = $.extend(params, data);
		popupPage(pageviewtype, priviewtitle, pageview, opentype, obj, w, h);
	} else {
		layer.msg("请选择叶子节点进行操作", {
			icon: 5
		});
	};
}

/**
 * 保存表单数据
 */
function saveFormData(dataset, title) {
	var beforeFlag = false;
	try{
		var beforefunctionname = eval('beforeExecuteDataInterface_'+dataset);
		if(beforefunctionname && typeof(beforefunctionname) == 'function'){
			beforeFlag = beforefunctionname();
		}
	}catch(e){
		console.log('beforefunction not defined;');
	}
	if(beforeFlag){
		
		if($("form").validate()) {
			if($("form").valid()) {
				parent.parent.layer.confirm("您确定保存" + title + "吗？", {
					btn: ["确定", "取消"]
				}, function() {
					var data = new FormData($("form")[0]);
					if(params) {
						for(var key in params) {
							if(typeof(params[key]) == 'object'){
								var jsonStr = JSON.stringify(params[key]);
								data.append(key, jsonStr);
							}else{
								data.append(key, params[key]);
							}
						}
					}
					$.ajax({
						type: "post",
						dataType: "json",
						contentType: false,
						data: data,
						cache: false,
						processData: false,
						url: cxt + "/datainterface/savedata/" + dataset,
						success: function(data) {
							if(data.success == true) {
								parent.layer.msg("保存成功", {
									icon: 1
								});
								closeModal();
								parent.queryTable();
								if(typeof(refreshTree) !='undefined'){
									refreshTree('selectNode');
								}
							} else {
								layer.msg("保存失败", {
									icon: 5
								});
							}
						}
					});
				});
			}
		}
		
		//保存完执行
		try{
			var afterfunctionname = eval('afterExecuteDataInterface_'+dataset);
			if(afterfunctionname && typeof(afterfunctionname) == 'function'){
				afterfunctionname();
			}
		}catch(e){
			console.log('afterfunction not defined;');
		}
	}
}

/**
 * 返回上一页
 */
function pageBack() {
//	window.history.back(-1);
	var jqDom = $('#menu', window.parent.document).find('.menu_active');
	var url = null;
	if(jqDom) {
		url = $(jqDom).attr('data-href');
	} else {
		jqDom = $('#menu', window.parent.document).find('.selected');
		if(jqDom) {
			url = $(jqDom).attr('data-href');
		}
	}
	if(url) {
		var subUrl = url.substring(url.lastIndexOf('/') + 1);
		popupPage('list','', subUrl,'in');
	}
}


/**
 * 获取单行记录执行数据接口
 */
function executeDataInterfaceForRow(dataset, title) {
	var rows = getCheckedRows();
	if(rows.length == 1) {
		executeDataInterface(dataset, title, rows[0]);
	} else {
		layer.msg("只能选择一条！", {
			icon: 0,
			time: 2000
		});
	}
}

/**
 * 获取多行记录执行数据接口
 */
function executeDataInterfaceForRows(dataset, title, params) {
	var rows = getCheckedRows(params);
	if(rows.length && rows.length > 0) {
		executeDataInterface(dataset, title, rows);
	} else {
		layer.msg("请选择要" + title + "的记录！", {
			icon: 0,
			time: 2000
		});
	}
}

/**
 * 执行数据接口，不从页面获取参数，由内置关键位最为参数
 */
function executeDataInterface(dataset, title, params, callback) {
	var source = {};
	//解决参数为json对象后台报错的问题
	if(typeof params === 'object' && !isNaN(params.length)){
		source["list"] = params;
	}else{
		source = params;
	}
	layer.confirm("您确定要进行" + title + "操作吗?", {
		btn: ["确定", "取消"]
	}, function(index, layero) {
		layer.close(index);
		index = layer.load();
		$.ajax({
			type: "post",
			dataType: "json",
			data: JSON.stringify(source),
			contentType: "application/json",
			url: cxt + "/datainterface/savedata/" + dataset,
			success: function(data) {
				layer.close(index);
				if(data.success == true) {
					layer.msg(title+"成功", {
						icon: 1
					});
					//listview
					typeof(queryTable) == 'function'?queryTable():false;
					typeof(callback) == 'function'?callback():false;
				} else {
					layer.msg(title+"失败", {
						icon: 5
					});
				}
			},
			error: function() {
				layer.msg("保存失败", {
					icon: 5
				});
			}
		});
	});
}

/**
 * 数据导入
 */
function importData(title, importtype, tablename, datainterface) {
	//弹出文件上传框，提交后端进行文件解析，把参数入库
	$("#importTitle").html(title + "(" + importtype + ")");
	$("#wizard form").hide();
	$("#" + importtype + "form").show();
	//	$("#importForm1").validate();
	if($("#wizard").hasClass("wizard")) {
		$("#wizard").steps('destroy');
	}
	$("#wizard").steps({
		headerTag: "h1",
		bodyTag: "section",
		transitionEffect: "slideLeft",
		forceMoveForward: true,
		onStepChanging: function(event, currentIndex, newIndex) {
			if(currentIndex == 0) {
				if(importtype == 'shp') {
					var shp = $("#shpfile").val().split('.')[0];
					var dbf = $("#dbffile").val().split('.')[0];
					var shx = $("#shxfile").val().split('.')[0];
					if(!(shp == dbf && shp == shx && dbf == shx)) {
						layer.msg("所选文件前缀不一致，请重新选择", {
							icon: 0,
							time: 2000
						});
						return;
					}
				}
				var formData = new FormData($("#" + importtype + "form")[0]);
				$.ajax({
					type: "POST",
					data: formData,
					url: cxt + "/datainterface/parseFile/" + importtype + "/" + tablename,
					processData: false,
					contentType: false,
					success: function(json) {
						var fileColumn = json.obj.fileColumn;
						var tableColumn = json.obj.tableColumn;
						$("#columntbody").empty();
						for(var i = 0; i < tableColumn.length; i++) {
							if(tableColumn[i] != 'uuid' && tableColumn[i] != 'createtime' && tableColumn[i] != 'modifytime' && tableColumn[i] != 'optuser') {
								$("#columntbody").append('<tr><td align="center">' + tableColumn[i] + '</td><td ><select id="fileColumn' + tableColumn[i] + '" class="form-control"></select></td><tr>');
								$("#fileColumn" + tableColumn[i]).empty();
								$("#fileColumn" + tableColumn[i]).append('<option value="">请选择</option>');
								for(var j = 0; j < fileColumn.length; j++) {
									$("#fileColumn" + tableColumn[i]).append('<option>' + fileColumn[j] + '</option>');
								}
							}
						}
					}
				});
			} else if(currentIndex == 1) {
				var obj = {};
				var trs = $("#columntbody>tr:nth-child(odd)");
				for(var i = 0; i < trs.length; i++) {
					var td = $(trs[i]).find('td:first').html();
					obj[td] = $("#fileColumn" + td).val();
				}
				var type = $("#importType").val();
				$.ajax({
					type: "POST",
					contentType: "application/json",
					url: cxt + "/datainterface/importdata/" + type + "/" + datainterface + "/" + tablename,
					dataType: 'json',
					data: JSON.stringify(obj),
					success: function(json) {
						$("#wizard section:eq(2)").html("成功导入" + json.obj + "条数据");
					}
				});
			}
			return true;
		},
		onStepChanged: function(event, currentIndex, priorIndex) {},
		onFinishing: function(event, currentIndex) {
			$("#importModal").modal('hide');
		},
		onFinished: function(event, currentIndex) {
			$("#importModal").modal('hide');
		},
		labels: {
			cancel: "取消",
			finish: "完成",
			next: "下一步",
			previous: "上一步",
			loading: "加载中 ..."
		}
	});

	$('.modal-dialog').css({
		"height": innerHeight / 3,
		"width": innerWidth * 3 / 6,
	});
	$(".wizard > .content ").css("min-height", "30em")
	$("#importModal").modal({
		show: true,
		backdrop: false
	})
}

function clearForm() {
	$("#importModal input").val('');
}

/**
 * excel导出服务端数据
 */
function exportExcel2Server(excelid,filename) {
	var url = new Array();
	url.push(cxt + "/export/excel?");
	url.push("excelConditionModel.sqlkey=" + eval('('+dataset+')').listview[0].name);
	url.push("&excelConditionModel.excelid=" + excelid);
	url.push("&excelConditionModel.filename=" + encodeURIComponent(filename));
	jQuery("#outputframe").attr("src", url.join(''));
}

function translateURLParam(param) {
	param = encodeURI(param).replace(new RegExp("\\#", "g"), "%23");
	param = param.replace(new RegExp("\\/", "g"), "%2F");
	param = param.replace(new RegExp("\\?", "g"), "%3F");
	param = param.replace(new RegExp("\\&", "g"), "%26");
	param = param.replace(new RegExp("\\=", "g"), "%3D");
	return encodeURIComponent(param);
}
/**
 * excel导出客户端
 */
function exportExcel2Client() {
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: cxt + "/datainterface/getdata/datatables/" + dataset,
		dataType: 'json',
		data: function(data) {
			data.page = (data.start / data.length) + 1;
			data.rows = data.length;
			return JSON.stringify(data)
		},
		success: function(json) {
			var option = {};
			var excel = $.parseJSON(exceldata);
			option.data = json.data;
			option.fileName = excel.filename;
			var toExcel = new ExportJsonExcel(option);
			toExcel.saveExcel();
		}
	});
}
/*
excel 导出*/
function exportExcel(filename,isspan){
	var url = new Array();
	url.push(cxt + "/datainterface/exportExcel?");
	url.push("filename=" + encodeURIComponent(filename));
	url.push("&key=" + dataset.listview[0].name);
	var querydata = $("#queryForm").serializeJsonObject();
	if(querydata != undefined){
		params = JSON.stringify(querydata);	
	}
	url.push("&params=" + encodeURIComponent(params));
	url.push("&metadata=" + encodeURIComponent(JSON.stringify(dataset.listview[0].metadata)));
	url.push("&isspan="+((isspan != undefined)?isspan:""));
	jQuery("#outputframe").attr("src", url.join(''));
}

/**
 * 导出Table表格
 */
function exportTable(filename){
	var html = "<table>"+$("#table")[0].innerHTML+"</table>";	
	/*$.ajax({
		type:"post",
		url: cxt +　"/datainterface/exportTable?",
		data: {"filename":filename,"htmlStr":html}
	});*/
	/*var url = new Array();
	url.push(cxt + "/datainterface/exportTable?");
	url.push("filename=" + encodeURIComponent(filename));
	url.push("&htmlStr=" + encodeURIComponent(html));
	$("#outputframe").attr("src", url.join(''));*/
	
	var form = $("<form action='"+ cxt + "/datainterface/exportTable'  method='post'><input name='filename' value='"+filename+"'/><textarea name='htmlStr'>"+html+"</textarea></form>");
	$("body").append(form);
	form.submit();
}
/**
 * word导出
 */
function exportWord(filename,isspan) {
	if(isspan){
		$('#table').tableExport({type:'word',fileName:filename});
	}else{
		var datasetData = dataset;
		var sqlkey;
		var metadata;
		if(datasetData.listview != undefined && datasetData.echartsview == undefined){//只有表格
			sqlkey = datasetData.listview[0].name;
			var url = new Array();
			url.push(cxt + "/datainterface/exportWord?");
			url.push("filename=" + encodeURI(filename));
			url.push("&key=" + sqlkey);
			var querydata = $("#queryForm").serializeJsonObject();
			if(querydata != undefined){
				params = JSON.stringify(querydata);	
			}
			url.push("&params=" + encodeURI(params));
			url.push("&metadata=" + encodeURI(JSON.stringify(datasetData.listview[0].metadata)));
			jQuery("#outputframe").attr("src", url.join(''));
		}else{
			if(datasetData.listview == undefined && datasetData.echartsview != undefined){//只有图片
				sqlkey = datasetData.echartsview[0].name;
				metadata = "";
			}else if(datasetData.listview != undefined && datasetData.echartsview != undefined){//表格 图片都有
				sqlkey = datasetData.listview[0].name;	
				metadata = JSON.stringify(datasetData.listview[0].metadata);
			}
			$.ajax({
				type:"post",
				url: cxt + "/datainterface/exportWord",
				async:false,
				data: {'pic':myChart.getDataURL({type:'png'})},
				dataType:"JSON",
				success:function(data){
					var url = new Array();
					url.push(cxt + "/datainterface/exportWord?");
					url.push("filename=" + encodeURI(filename));
					url.push("&key=" + sqlkey);
					url.push("&picname=" + data.picname);
					var querydata = $("#queryForm").serializeJsonObject();
					if(querydata != undefined){
						params = JSON.stringify(querydata);	
					}
					url.push("&params=" + encodeURI(params));
					if(metadata != ""){
						url.push("&metadata=" + encodeURI(metadata));
					}
					jQuery("#outputframe").attr("src", url.join(''));
				}
			});
		}
	}	
}


/**
 * 文件下载
 */
function downloadFile(fileid) {

}

/**
 * 文件上传
 */
function uploadFile(buisid, appcode) {
	
}


/**
 * 获取列表中选中的行的数据
 */
function getCheckedRows(params) {
	if(theme == 'bootstrap') {
		var rows = $('#table').bootstrapTable('getSelections');
		return (params == undefined)?rows:getRowsByField(rows,params);
	} else if(theme == 'easyui') {
		var rows = $('#table').datagrid('getSelections');
		return (params == undefined)?rows:getRowsByField(rows,params);
	}
	
	return [];
}
/**
 *	获取列表中选中的行的数据
 */
function getRowsByField(rows, params) {
	var rowsData = [];
	for(var i = 0;i<rows.length;i++){
		if(typeof(params) == 'string'){
			var row = {};
			row[params] = rows[i][params];
			rowsData.push(row);
		}else if(typeof(params) == 'object'){
			var row = {};
			for(var j = 0;j<params.length;j++){
				row[params[j]] = rows[i][params[j]];
			}
			rowsData.push(row);
		}
	}

	return rowsData;
}
/**
 * 将form表单转为json对象
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
 * 级联 -zfs
 */
function getSelectOptionsForBfdw(opt, id) {
	var value = $(opt).val();
	if(value != null && value != "") {
		var url = cxt + "/datainterface/getdata/list/" + $("#sel" + id).attr("dataset");
		var data = {};
		data[$(opt).attr("name")] = value;
		if($(opt).attr("name")!="xz"){
			$.ajax({
				type: "POST",
				dataType: "json",
				data: JSON.stringify(data),
				contentType: "application/json",
				url: url,
				async: false,
				success: function(data) {
					var html = "<option value=''>--请选择--</option>";
					if($("#sel" + id).attr("isSelected") == 'false'){
						html = "";
					}
					$(data.data).each(function(i, option) {
						html += "<option value='" + option.ID + "'>" + option.TITLE + "</option>";
					});
					$("#sel" + id).empty();
					$("#sel" + id).append(html);
				}
			});
		}
		var url1 = cxt + "/datainterface/getdata/list/" + $("#sel" + 5).attr("dataset");
		var data1 = {};
		data1[$("#sel" + 2).attr("name")] = $("#sel" + 2).val();
		data1[$("#sel" + 3).attr("name")] = $("#sel" + 3).val();
		data1[$("#sel" + 4).attr("name")] = $("#sel" + 4).val();
		$.ajax({
			type: "POST",
			dataType: "json",
			data: JSON.stringify(data1),
			contentType: "application/json",
			url: url1,
			async: false,
			success: function(data) {
				var html = "<option value=''>--请选择--</option>";
				if($("#sel" + 5).attr("isSelected") == 'false'){
					html = "";
				}
				$(data.data).each(function(i, option) {
					html += "<option value='" + option.ID + "'>" + option.TITLE + "</option>";
				});
				$("#sel" + 5).empty();
				$("#sel" + 5).append(html);
			}
		});
	} else {
			$("#sel" + id).html("<option value=''>--请选择--</option>");
			$("#sel" + id).trigger("change");
	}
}


/**
 * 查看详细信息
 */
function showdetail(name, params, opentype, pageview) {
	var querydata = $("#queryForm").serializeJsonObject();
	params.querydata = querydata;
	if(pageview != undefined) {
		previewid = pageview;
	}
	if(opentype == undefined) {
		popupPage("detail", name + '--详情展示', previewid, "new", params)
	} else {
		popupPage("detail", name + '--详情展示', previewid, opentype, params)
	}

}
/**
 * 单击列值 查看详细信息
 */
function showcell(opentype, cellname, name, params, field, pageview) {
	if(field == cellname) {
		if(pageview != undefined) {
			previewid = pageview;
		}
		if(opentype == undefined) {
			popupPage("detail", name + '--详情展示', previewid, "new", params)
		} else {
			popupPage("detail", name + '--详情展示', previewid, opentype, params)
		}
	}
}
/**
 * 执行数据接口
 * 保存一对多的数据
 */
function saveOne_Many(dataset, datas) {
	var rowlist = getCheckedRows();
	var data = serializeJsonObject($("#queryForm"));
	if(rowlist.length > 0) {
		var map = {};
		map['data'] = data;
		map['datas'] = datas;
		if(params != null && params != '') {
			map['one'] = params;
			map['many'] = rowlist;
			map['data'] = data;
		} else {
			map = rowlist;
		}
		layer.confirm("您确定保存吗？", {
			btn: ["确定", "取消"]
		}, function() {
			$.ajax({
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify(map),
				url: cxt + "/datainterface/savedata/" + dataset,
				success: function(data) {
					if(data.success == true) {
						layer.msg("保存成功", {
							icon: 1
						});
						queryTable();
					} else {
						layer.msg("保存失败", {
							icon: 5
						});
					}
				}
			});
		});
	} else {
		layer.msg("您好没有选择信息！", {
			icon: 0,
			time: 2000
		});
	}

}

//审批养护方案
function yhfasp(item, reason) {
	var rows = $('#table').bootstrapTable('getSelections');
	var myDate = new Date();
	var month = ((myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1));
	var date = (myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate());
	var hour = (myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours());
	var pici = myDate.getFullYear() + "" + month + date + hour; //批次号 年 + 月 + 日 + 小时
	var dataset = $(item).attr('name');
	if(rows.length >= 1) {
		layer.confirm("您确定要" + (dataset == "throughYHFA" ? "通过" : "拒绝") + rows.length + "条记录吗?", {
			btn: ["确定", "取消"]
		}, function() {
			var refusereason = ""
			if(reason != undefined) {
				refusereason = reason;
			}
			var source = {};
			var yhgsids = "";
			var yhyear = rows[0].YHYEAR;
			for(var i in rows) {
				yhgsids += rows[i].YHGSID + ",";
				rows[i].pici = pici;
				rows[i].refusereason = refusereason;
			};
			source["list"] = rows;
			var result = false;
			$.ajax({
				type: "post",
				url: cxt + "/datainterface/getdata/list/queryYHFAID",
				async: false,
				contentType: 'application/json',
				data: JSON.stringify({
					yhgsids: yhgsids.substring(0, yhgsids.length - 1),
					yhyear: yhyear
				}),
				dataType: "JSON",
				success: function(data) {
					var spstatus;
					if(dataset == "throughYHFA") {
						spstatus = '1';
					} else {
						spstatus = '0';
					}
					var data = data.data;
					for(var i in data) {
						data[i].spstatus = spstatus;
						data[i].pici = pici;
					}
					addSPJL(data, result); //添加审批记录
					$.ajax({
						type: "post",
						url: cxt + "/datainterface/savedata/" + dataset,
						async: false,
						contentType: 'application/json',
						data: JSON.stringify(source),
						dataType: "JSON",
						success: function(data) {
							if(data.success && 　dataset == "throughYHFA") {
								$.ajax({
									type: "post",
									url: cxt + "/datainterface/savedata/addSPJG",
									async: false,
									contentType: 'application/json',
									data: JSON.stringify({
										pici: pici
									}),
									dataType: "JSON",
									success: function(data) {
										layer.msg("审批成功", {
											icon: 1
										});
										queryTable();
									}
								});
							} else if(data.success) {
								layer.msg("审批成功", {
									icon: 1
								});
								$('#modal').modal('hide');
								queryTable();
							} else {
								layer.msg("审批失败", {
									icon: 5
								});
								$('#modal').modal('hide');
							}
						}
					});
				}
			});
		});
	} else {
		layer.msg("请选择一条记录！", {
			icon: 0,
			time: 2000
		});
	}
}

function addSPJL(data, result) {
	var source = {};
	source["list"] = data;
	$.ajax({
		type: "post",
		url: cxt + "/datainterface/savedata/addSPJL",
		async: false,
		contentType: 'application/json',
		data: JSON.stringify(source),
		dataType: "JSON",
		success: function(data) {
			if(data.success) {
				result = true;
			}
		}
	});
}

/**
 * 工作流办理，从行记录里面必须拿到processinstance
 */
function dealwithWorkflowTask() {

}

/**
 * 工作流，提交
 */
function completeWorkflowTask() {

}

/**
 * 工作流，退回
 */
function backWorkflowTask() {

}

/**
 * 工作流，签收
 */
function claimWorkflowTask() {

}

/**
 * 工作流，拒签
 */
function unclaimWorkflowTask() {

}

/**
 * 切换表格视图与统计视图
 */
function changeView(opt){
	var viewType = $(opt).attr("viewtype");
	if(viewType == undefined || viewType == "listview"){
		$("#listview").hide();
		$("#echartsview").show();
		$("#querybtn").unbind( "click" );
		$("#querybtn").bind("click",queryEcharts);
		$("#sample").height(getTableHeight());
		queryEcharts();
		$(opt).attr("viewtype","echartsview")
		$(opt).html('<i class="glyphicon glyphicon-th-list"></i>&nbsp;&nbsp;查看表格数据');
	}else if(viewType == "echartsview"){
		$("#echartsview").hide();
		$("#listview").show();
		$("#querybtn").unbind( "click" );
		$("#querybtn").bind("click",queryTable);
		queryTable();
		
		$(opt).attr("viewtype","listview")
		$(opt).html('<i class="glyphicon glyphicon-stats"></i>&nbsp;&nbsp;查看统计数据');
	}
}

/**
 * 表格 单元格的合并
 */
var mergeRowIndex = [];
function tableMerge(data, dataset){
	var dataArray = data.rows;
	var mergeCells = dataset.mergeCells?dataset.mergeCells:[];
	var mergeMap = {};
	//计算 合并单元格数据 及 小计数据
	for(var j = 0;j < mergeCells.length;j++){
		var mergeData = [];
		//合并字段
		var field = "";
		//合计字段
		var sumfield = [];
		if(typeof mergeCells[j] == 'string'){
			field = mergeCells[j];
		}else if(typeof mergeCells[j] == 'object'){
			field = mergeCells[j].field;
			sumfield = mergeCells[j].sumfield;
		}
		var node = {};
		var _node = null;
		for(var i = 0 ; i < dataArray.length ; i ++){
			if(i == 0){
				node = {"index":i,"rowspan":1,"row":{}};
				if(sumfield && sumfield.length>0){
					node["row"][field] = "小计";
					_node = {"index":i,"rowspan":1,"row":{}};
					_node["row"][field] = "合计";
					for(var k = 0;k < sumfield.length;k++){
						node["row"][sumfield[k]] = dataArray[i][sumfield[k]];
						_node["row"][sumfield[k]] = dataArray[i][sumfield[k]];
					}
				}
			}else{
				if(dataArray[i][field] == dataArray[i-1][field]){
					node.rowspan += 1;
					if(sumfield && sumfield.length>0){
						_node.rowspan += 1;
						for(var k = 0;k < sumfield.length;k++){
							node["row"][sumfield[k]] += dataArray[i][sumfield[k]];
							_node["row"][sumfield[k]] += dataArray[i][sumfield[k]];
						}
					}
					if(i == dataArray.length-1){
						mergeData.push(node);
					}
				}else{
					mergeData.push(node);
					node = {"index":i,"rowspan":1,"row":{}};
					if(sumfield && sumfield.length>0){
						_node.index = i;
						_node.rowspan = 1;
						node["row"][field] = "小计";
						for(var k = 0;k < sumfield.length;k++){
							node["row"][sumfield[k]] = dataArray[i][sumfield[k]];
							_node["row"][sumfield[k]] += dataArray[i][sumfield[k]];
						}
					}
				}
			}
		}
		if(_node != null){
			mergeData.push(_node);
		}
		
		mergeMap[field] = mergeData;
	}
	
	//插入小计
	for(var key in mergeMap){
		var mergeData = mergeMap[key];
		if(mergeData && mergeData.length > 0 &&Object.keys(mergeData[0]["row"]).length > 0){
			for(var j = 0;j < mergeData.length;j++){
				var index = mergeData[j]["index"]+mergeData[j]["rowspan"]+j;
				var row =  mergeData[j]["row"];
				mergeRowIndex.push(index);
				$table.bootstrapTable('insertRow',{
					index: index,
					row: mergeData[j]["row"],
				});
			}
		}
	}

	//合并单元格
	var tmp_key = null;
	for(var key in mergeMap){
		var mergeData = mergeMap[key];
		if(mergeData && mergeData.length > 0 && Object.keys(mergeData[0]["row"]).length > 0){
			for(var j = 0;j < mergeData.length-1;j++){
				$table.bootstrapTable('mergeCells',{
					index: mergeData[j]["index"]+j,
					field: key,
					rowspan: mergeData[j]["rowspan"],
				});
			}
		}else{
			for(var j = 0;j < mergeData.length;j++){
				var rowspan = mergeData[j]["rowspan"];
				if(tmp_key && Object.keys(mergeData[0]["row"]).length > 0){
					rowspan += mergeMap[tmp_key].length+1;
				};
				if(sumfield!=undefined){
					$table.bootstrapTable('mergeCells',{
						index: mergeData[j]["index"]+j,
						field: key,
						rowspan: rowspan ,
					});
				}else{
					$table.bootstrapTable('mergeCells',{
						index: mergeData[j]["index"],
						field: key,
						rowspan: rowspan ,
					});
				}
			}
		}
	}
}

/*
 * 列表前添加自增序号一列
 */
var serialNumber = function (value,row,index,field){
	var pageSize=$table.bootstrapTable('getOptions').pageSize;
	var pageNumber=$table.bootstrapTable('getOptions').pageNumber;
	return pageSize * (pageNumber-1) + index+1;
}
