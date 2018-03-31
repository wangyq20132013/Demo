<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>统一应用管理系统</title>
		<link rel="icon" href="img/favicon.ico">
		
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/font-awesome/css/font-awesome.min.css'/>"></link>
		
		<link rel="stylesheet" type="text/css" href="<c:url value='/uadp/main/main.css'/>"></link>

		<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
			var params = ${empty params?'{}':params};
			var id = '${id}';
		</script>
	</head>

	<body>
		<div id="menu" class="menu">
			<div class="dislpayBtn"><a href="javascript:void(0);" class="btn" onClick="displaynavbar(this)"><span class=" fa fa-navicon"></span></a></div>
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
	<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
	<script src="<c:url value='/uadp/main/main.js' />"></script>

</html>