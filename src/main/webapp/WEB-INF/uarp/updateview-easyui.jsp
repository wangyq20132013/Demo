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
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/easyui/themes/default/easyui.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/easyui/themes/icon.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/layer/2.4/skin/layer.css'/>"></link>
		<style>
			.btn a {
				width: 100px;
				margin: 15px;
			}
		</style>
		<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
			var name = '${name}';
			var theme = '${theme}';
			var appname = '${appname}';
			var params  = '${params}';
		</script>
	</head>

	<body>
		<div class="easyui-layout" style="width: 100%; height: auto;">
			<div style="width: 90%;margin-left: 5%;">
				<form id="formadd">
					<c:forEach items="${formpage}" var="form">
						<c:import url="../${form.type}/${appname}/${form.name}.jsp" />
					</c:forEach>

					<div style="padding: 10px;text-align: center;" class="btn">
						<c:forEach items="${button}" var="btn">
							<a href="javascript:void(0)" id="${btn.id}" name="${btn.name}" class="easyui-linkbutton" onclick="${btn.clickevent}">${btn.title}</a>
						</c:forEach>
						<a href="javascript:void(0)" class="easyui-linkbutton" onclick="close()">取消</a>
					</div>
				</form>
			</div>
		</div>
	</body>
	<script src="<c:url value='/resources/easyui/jquery.min.js' />"></script>
	<script src="<c:url value='/resources/easyui/jquery.easyui.min.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.14.0/jquery.validate.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.14.0/validate-methods.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.14.0/messages_zh.js' />"></script>
	<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
	<script src="<c:url value='/uadp/pageview/updateview-easyui.js' />"></script>
	<script src="<c:url value='/uadp/pageview/listview-button${online}.js' />"></script>
	
</html>