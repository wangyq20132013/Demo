var height = innerHeight;
$(function() {
	initSelectOptions();
	$("form").validate({
		rules: {
			fhyj: {
				required: true,
				minlength: 2,
				maxlength: 16
			},
			czwt: {
				required: true,
				minlength: 2,
				maxlength: 16
			}
		},
		onkeyup: false,
		focusCleanup: true,
		success: "valid"
	});
	
});
/**
 * 关闭模态框
 */
function close() {
	parent.closeModal();
}
/**
 * 初始化查询区域的select控件数据
 */
function initSelectOptions() {
	var Select = $("form select");
	$.each(Select, function(i, select) {
		var dataset = $(select).attr("dataset");
		var value = $(select).attr("value");
		var id = $(select).attr("id");
		if(dataset && id) {
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: cxt + "/datainterface/getdata/list/" + dataset,
				async: true,
				success: function(data) {
					var html = "";
					$(data.data).each(function(i, option) {
						html += "<option value='" + option.ID + "'>" + option.TITLE + "</option>";
					});
					$("#" + id).append(html);
					$("#" + id).val(value);
				}
			});
		}else{
			$(select).val(value);
		}
	});
}