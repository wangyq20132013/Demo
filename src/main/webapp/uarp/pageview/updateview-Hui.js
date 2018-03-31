var height = innerHeight;
$(function() {
	$("form").validate({
		rules: {
			fhyj: {
				required: true,
				minlength: 2,
				maxlength: 16
			},
			sex: {
				required: true,
			},
			mobile: {
				required: true,
				isMobile: true,
			},
			email: {
				required: true,
				email: true,
			},
			uploadfile: {
				required: true,
			},
			qx: {
				required: true
			},
			yhdwmc: {
				required: true
			},
			loginname: {
				required: true
			},
			logintitle: {
				required: true
			},
			password: {
				required: true
			}

		},
		onkeyup: false,
		focusCleanup: true,
		success: "valid",
	});
});
/**
 * 关闭模态框
 */
function closeModal() {
	parent.modal.modal('hide');
}
/**
 * 初始化查询区域的select控件数据
 */
function initSelectOptions() {
	var querySelect = $("form select");
	$.each(querySelect, function(i, select) {
		var dataset = $(select).attr("dataset");
		var id = $(select).attr("id");
		if(dataset && id) {
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: cxt + "/datainterface/getdata/list/" + dataset,
				async: true,
				data: JSON.stringify(userArea),
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