$(function(){
	//初始化excel上传组件
	initUpload("excelFile", cxt + "/");
});



function initUpload(ctrlName, uploadUrl) {
    var control = $('#' + ctrlName);
    control.fileinput({
        language: 'zh', //设置语言
        uploadUrl: uploadUrl, //上传的地址
        uploadAsync: true, //默认异步上传
        showCaption: true,//是否显示标题
        showUpload: true, //是否显示上传按钮
        showRemove: true, //是否显示移除按钮
        showPreview: true, //是否显示预览
        browseClass: "btn btn-primary", //按钮样式
        dropZoneEnabled: true,//是否显示拖拽区域
        allowedFileExtensions: ["xls", "xlsx"], //接收的文件后缀   "docx","pptx","jpg","pdf","zip"
        maxFileCount: 5,//最大上传文件数限制
        previewFileIcon: '<i class="glyphicon glyphicon-file"></i>',
        allowedPreviewTypes: ["image","text","html","video","audio","object"],
        previewFileIconSettings: {
            'docx': '<i ass="fa fa-file-word-o text-primary"></i>',
            'xlsx': '<i class="fa fa-file-excel-o text-success"></i>',
            'xls': '<i class="fa fa-file-excel-o text-success"></i>',
            'pptx': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
            'jpg': '<i class="fa fa-file-photo-o text-warning"></i>',
            'pdf': '<i class="fa fa-file-archive-o text-muted"></i>',
            'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
        },
        uploadExtraData: {//上传的时候，增加的附加参数
            folder: '数据导入文件'
        }
    })
    //上传监听
	.on("fileuploaded", function (event, data, previewId, index) {
	    console.log(data);
	    if(data.response.success == true)
	    {
	        alert(data.files[index].name + "上传成功!");
	    //关闭
	        $(".close").click();
	    }
	    else{
	        alert(data.files[index].name + "上传失败!" + data.response.message);
	    //重置
	    $("#excelFile").fileinput("clear");
	    $("#excelFile").fileinput("reset");
	    $('#excelFile').fileinput('refresh');
	    $('#excelFile').fileinput('enable');
	    }
	});
}