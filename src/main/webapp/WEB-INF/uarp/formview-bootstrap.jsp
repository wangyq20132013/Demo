<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>${name}</title>
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrapValidator.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ztree/css/metroStyle/metroStyle.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-datetimepicker.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-select.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-treeselect.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/daterangepicker.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/webuploader/0.1.5/webuploader.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/layer/2.4/skin/layer.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/uarp/pageview/css/formview-bootstrap.css'/>" />
		<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/style.css'/>" />
		
		<c:forEach items="${extend_css}" var="css" varStatus="status">
			<c:if test="${fn:indexOf(css,'/') > -1}">
				<link rel="stylesheet" type="text/css" href="<c:url value='${css}' />" />
			</c:if>
			<c:if test="${fn:indexOf(css,'/') == -1}">
				<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/extend_${css}.css' />"/>
			</c:if>
		</c:forEach>
		
		<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
			var name = '${name}';
			var type = '${type}';
			var theme = '${theme}';
			var appname = '${appname}';
			var userArea = {};
			var params = ${empty params?"{}":params};
			var dataset = ${empty dataset?"{}":dataset};
		</script>
		
	</head>

	<body>
		<div style="height: calc(100% - 55px);overflow-x: hidden;">
			<c:import url="formview-content-bootstrap.jsp"></c:import>
		</div>
		<div class="panel-footer" style="text-align: center;">
			<c:forEach items="${button}" var="btn">
				<button type="button" class="btn btn-primary" name="${btn.name}" onclick="${btn.clickevent}">
					<span class="${btn.icon}" aria-hidden="true"></span>&nbsp;&nbsp;${btn.title}
				</button>
			</c:forEach>
			<button type="button" class="btn btn-default" onclick="resetFormData();">
			<span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>&nbsp;&nbsp;重置</button>
		</div>
		
		<div id="modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content" style="width: 100%;height:100%;">
					<div class="modal-header">
						<div class="modal-title col-sm-5"></div>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="modal-body" style="padding:0px;height: calc(100% - 48px);">
						<iframe id="modaliframe" style="width: 100%;height: 100%;border-bottom-right-radius: 4px;border-bottom-left-radius: 4px;" frameborder="0" scrolling="no"></iframe>
					</div>
				</div>
			</div>
		</div>
		
	</body>
	
	<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.14.0/jquery.validate.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.14.0/validate-methods.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.14.0/additional-methods.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.14.0/messages_zh.js' />"></script>
	<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
	<script src="<c:url value='/resources/ztree/js/jquery.ztree.all.min.js' />"></script>
	
	<script src="<c:url value='/resources/ueditor/ueditor.config.js' />"></script>
	<script src="<c:url value='/resources/ueditor/ueditor.all.min.js' />"></script>
	<script src="<c:url value='/resources/ueditor/lang/zh-cn/zh-cn.js' />"></script>
	
	<script src="<c:url value='/resources/webuploader/0.1.5/webuploader.min.js' />"></script>
	
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.zh-CN.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-select.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-treeselect.js' />"></script>
	
	
	<script src="<c:url value='/resources/bootstrap/js/moment.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/daterangepicker.js' />"></script>
	
	<script src="<c:url value='/uarp/pageview/public-button${online}.js' />"></script>
	<script src="<c:url value='/uarp/pageview/formview-button.js' />"></script>
	<script src="<c:url value='/uarp/pageview/formview-bootstrap.js' />"></script>
	
	<c:forEach items="${extend_js}" var="js" varStatus="status">
		<c:if test="${fn:indexOf(js,'/') > -1}">
			<script src="<c:url value='${js}' />"></script>
		</c:if>
		<c:if test="${fn:indexOf(js,'/') == -1}">
			<script src="<c:url value='/develop/${appname}/js/extend_${js}.js' />"></script>
		</c:if>
	</c:forEach>
</html>