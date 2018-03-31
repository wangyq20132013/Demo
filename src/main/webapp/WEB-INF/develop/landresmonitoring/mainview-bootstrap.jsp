<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>${app.TITLE}</title>

		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/H-ui/Hui-iconfont/1.0.8/iconfont.css'/>" />
		<link rel="stylesheet" type="text/css" href="<c:url value='/uarp/pageview/css/mainview-bootstrap.css'/>" />
		<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/style.css'/>" />

		<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
			var appname = '${appname}';
			var id = '${id}';
			var params = ${empty params?'{}':params};
		</script>
	</head>

	<body>
		<div id="menu" class="menu">
			<div class="menu_dropdown"></div>
		</div>

		<div class="dislpayArrow hidden-xs">
			<a class="pngfix" href="javascript:void(0);" onClick="displaynavbar(this)"></a>
		</div>

		<div class="page-box">
			<iframe id="page" src=""></iframe>
		</div>

	</body>
	
	<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-table.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-table-zh-CN.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.zh-CN.js' />"></script>
	<script src="<c:url value='/resources/echarts/3.3.2/echarts.min.js'/>"></script>
	<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
	<script src="<c:url value='/uarp/pageview/mainview-bootstrap.js' />"></script>

</html>