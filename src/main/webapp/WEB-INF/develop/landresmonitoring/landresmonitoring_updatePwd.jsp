<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${buisname}</title>
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/develop/${appname}/css/style.css'/>"></link>
<style>
.panel-body {
	padding: 15px 0px 15px 0px !important;
	height: calc(100% - 55px);
}
</style>
<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
		</script>
</head>

<body>
	<div class="panel-body" id="bodyform">
		<div class="col-xs-12" style="height:">
			<form class="form-horizontal" role="form" id="form"
				enctype="multipart/form-data">
				<div class="col-sm-10 col-sm-offset-1">
					<div class="col-sm-12 text-center">
						<div class="form-group">
							<label class="col-xs-4 control-label">请输入旧密码<span
								style="color: red;">*</span>：
							</label>
							<div class="col-xs-8">
								<input type="password" class="form-control" name="oldpwd"
									id="oldpwd" value="" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-4 control-label">请输入新密码<span
								style="color: red;">*</span>：
							</label>
							<div class="col-xs-8">
								<input type="password" class="form-control" name="newpwd"
									id="newpwd" value="" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-4 control-label">重新输入新密码<span
								style="color: red;">*</span>：
							</label>
							<div class="col-xs-8">
								<input type="password" class="form-control" name="newpwdagain"
									id="newpwdagain" value="" />
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="panel-footer" style="text-align: center;">
		<button type="button" class="btn btn-${style}" name="${btn.name}"
			onclick="savePwd()" style="width: 15%;">
			<span class="glyphicon" aria-hidden="true"></span>确定
		</button>
		<button type="button" class="btn btn-default" onclick="closeModal()"
			style="width: 15%;">取消</button>
	</div>

</body>
<script
	src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
<script
	src="<c:url value='/resources/jquery.validation/1.14.0/jquery.validate.js' />"></script>
<script
	src="<c:url value='/resources/jquery.validation/1.14.0/validate-methods.js' />"></script>
<script
	src="<c:url value='/resources/jquery.validation/1.14.0/messages_zh.js' />"></script>
<script src="<c:url value='/resources/json/JsonExportExcel.min.js' />"></script>
<script src="<c:url value='/resources/jquery/jquery.steps.min.js' />"></script>
<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
<script>
		$(function(){
			$("form").validate({
				rules: {
					oldpwd: {
						required: true,
						maxlength: 16
					},
					newpwd: {
						required: true,
						isPwd: true,
					},
					newpwdagain: {
						equalTo: '#newpwd'
					}
				},
				onkeyup: false,
				focusCleanup: true,
				success: "valid"
			});
			jQuery.validator.addMethod("password",function(value,element){
				if($("#lid").val()!= undefined && $("#lid").val() != ""&& $("#lid").val() != null&& $("#lid").val() != "null"){
					return true;
				}else{
					if(value == ""){
						return false;
					}else{
						return true;
					}
				}
			},"请输入密码");
		});
		function savePwd() {
			var oldpwd = $("#oldpwd").val();
			var newpwd = $("#newpwd").val();
			var newpwdagain = $("#newpwdagain").val();
			if($("form").validate()) {
				if($("form").valid()) {
					layer.confirm("您确定修改密码吗？", {
						btn: ["确定", "取消"]
					}, function() {
						$.ajax({
							type: "post",
							url: cxt + "/login/changePassword",
							async: false,
							dataType: "text",
							data: {
								"password": oldpwd,
								"newPassword": newpwd
							},
							success: function(data) {
								var data = eval("("+data+")");
								if(data.success == true) {
									parent.layer.msg("密码修改成功", {
										icon: 1
									});
									closeModal();
								} else {
									layer.msg(""+data.info+"", {
										icon: 5
									});
								}
							}
						});
					});
				}
			}
		}

		/**
		 * 关闭模态框
		 */
		function closeModal() {
			parent.closeModal();

		}
	</script>

</html>