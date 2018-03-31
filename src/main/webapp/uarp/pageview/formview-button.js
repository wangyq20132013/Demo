//弹出一个地图选择数据
function mapselect(opt){
	var _input = $(opt).parent().parent().find("input");
	var dom_id = $(_input).attr("id");
	var pageview = $(_input).attr("pageview");
	if(pageview){
		popupPage('map', '', pageview, 'layer', {dom_id:dom_id});
	}
	
}
//弹出一张表选择数据
function tableselect(opt){
	var _input = $(opt).parent().parent().find("input");
	var dom_id = $(_input).attr("id");
	var dom_name = $(_input).attr("name");
	var pageview = $(_input).attr("pageview");
	if(pageview){
		popupPage('list', '', pageview, 'layer', {dom_id:dom_id, dom_name:dom_name});
	}
}
//弹出一棵树选择数据
function treeopenselect(opt){
	var _input = $(opt).parent().parent().find("input");
	var dom_id = $(_input).attr("id");
	var pageview = $(_input).attr("pageview");
	if(pageview){
		popupPage('tree', '', pageview, 'layer', {dom_id:dom_id});
	}
}
//刷新map控件地图wkt绘制
function refreshmapwkt(opt){
	var id = $(opt).attr("id");
	$(opt).parent().find('iframe')[0].contentWindow.addParentGeometry(id);
}

function setFormValue(row){
	var commonform = $("#commonform");
	if(row){
		for(var key in row){
			commonform.find("[name='"+key.toLocaleLowerCase()+"']").val(row[key]);
		}
	}
}

//删除附件
function delAttach(option){
	var id = $(option).attr("id");
	if(id != null && id != ""){
		$.ajax({
			type: "post",
			dataType: "json",
			data: {id:id},
			url: cxt + "/attach/delAttach",
			success: function(data) {
				if(data.success){
					removeAttach(option);
				}
			}
		});
	}else{
		removeAttach(option);
	}
}
//添加附件
function addAttach(option){
	var attach_box = $('<div class="input-group" style="padding-top: 15px;"></div>');
	var accept = $(option).parentsUntil(".input-group").parent().find("input").attr("accept");
	var file_tag = $('<input type="file" class="form-control" name="file" />').attr("accept",accept);
	if($(option).parent().parent().find("[name='filetype']")){
		attach_box.append($(option).parent().parent().find("span")[0].outerHTML);
	}
	attach_box.append(file_tag);
	attach_box.append('<span class="input-group-btn"><a class="btn btn-link" onclick="removeAttach(this)"><span class="glyphicon glyphicon-minus-sign"></span></a></span>')

	$(option).parentsUntil(".form-group").last().append(attach_box);
}
//移除附件
function removeAttach(option){
	
	$(option).parentsUntil(".input-group").parent().last().remove();
}
//获取附件
function getAttach(id){
	if(id && id != ''){
		$.ajax({
				type:"post",
				url:cxt+"/datainterface/getdata/list/getZiCAttachById",
				async:false,
				contentType: "application/json",
				data : JSON.stringify({"id":id}),
				dataType:"JSON",
				success:function(data){
					var data = data.data;
					if(data.length > 0){
						var Attach_div = $("#attach");
						$(data).each(function(i,attach){
							var id = attach.ID;
							var name = attach.NAME;
							var path = attach.PATHURL;
							var type = attach.TYPE;
							var attachtype = attach.ATTACHTYPE;
							if(type == 'office' || path.indexOf(".pdf")>-1){
								
								apath = path.substring(0, path.indexOf("."));
								
								var html = '<div class="input-group" style="padding-bottom: 10px;">';
									html += '<label class="control-label"><a href="#" onclick="openAttach(\'/attach/showPDF?path='+apath+'.pdf\')">'+(attachtype!=null?attachtype+':':'')+name+'</a></label>';
									html += '<span class="input-group-btn"><a href="#" onclick="openAttach(\'/attach/showPDF?path='+apath+'.pdf\')" class="btn btn-link" title="预览"><span class="glyphicon glyphicon-eye-open"></span></a></span>';
									html += '<span class="input-group-btn"><a href="'+ cxt +'/attach/download?filepath='+path+'&filename='+name+'" target="outputframe" class="btn btn-link" title="下载" ><span class="glyphicon glyphicon-download-alt"></span></a></span>';
									html += '<span class="input-group-btn"><a id="'+id+'" class="btn btn-link" onclick="delAttach(this)" title="删除"><span class="glyphicon glyphicon-minus-sign"></span></a></span>';
									html += '</div>';
									
								Attach_div.prepend(html);
								
							}else{
								
								var html = '<div class="input-group" style="padding-bottom: 10px;">';
									html += '<label class="control-label"><a href="#" onclick="openAttach(\'/attach/showImg?path='+path+'\')" >'+(attachtype!=null?attachtype+':':'')+name+'</a></label>';
									html += '<span class="input-group-btn"><a href="#" onclick="openAttach(\'/attach/showImg?path='+path+'\')" class="btn btn-link" title="预览"><span class="glyphicon glyphicon-eye-open"></span></a></span>';
									html += '<span class="input-group-btn"><a href="'+ cxt +'/attach/download?filepath='+path+'&filename='+name+'" target="outputframe" class="btn btn-link" title="下载" ><span class="glyphicon glyphicon-download-alt"></span></a></span>';
									html += '<span class="input-group-btn"><a id="'+id+'" class="btn btn-link" onclick="delAttach(this)" title="删除"><span class="glyphicon glyphicon-minus-sign"></span></a></span>';
									html += '</div>';
									
								Attach_div.prepend(html);
							}
						});
					}
				}
			});
	}
}
function openAttach(url){
	popupPage('', '', url, 'layer',{},80,90);
}
