<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>通用设备专题</title>
<meta
	content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
	name='viewport'>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/develop/${appname}/css/style.css'/>" />
	<script type="text/javascript">
		var cxt = '${pageContext.request.contextPath}';
		var user = '${user.getLoginname()}';
		var loginid = '${user.getLoginid()}';
		var sysname = '${app.SYSENNAME}';
		var appname = '${appname}';
		var theme = 'bootstrap';
		var params = ${empty params?'{}':params};
		var navitems = ${empty navitems?[]:navitems.children};
	</script>
	<style type="text/css">
		.top_left_main{
			position: absolute;
			left: 10px;
			top: 10px;
			width: calc(50% - 15px);
			height: calc(50% - 20px);
			border:solid 1px rgba(34,242,255,0.27);
		}
		.top_right_main{
			position: absolute;
			right: 10px;
			top: 10px;
			width: calc(50% - 15px);
			height: calc(50% - 20px);
			border:solid 1px rgba(34,242,255,0.27);
		}
		.bottom_left_main{
			position: absolute;
			width: calc(50% - 15px);
			height: calc(50% - 10px);
			left: 10px;
			bottom: 10px;
			border:solid 1px rgba(34,242,255,0.27);
		}
		.bottom_right_main{
			position: absolute;
			width: calc(50% - 15px);
			height: calc(50% - 10px);
			right: 10px;
			bottom: 10px;
			border:solid 1px rgba(34,242,255,0.27);
		}
	</style>
</head>

<body>
    <div class="main_data">
		<div class="top_left_main" id="top_left_main"></div>
		<div class="top_right_main" id="top_right_main"></div>
		<div class="bottom_left_main" id="bottom_left_main"></div>
		<div class="bottom_right_main" id="bottom_right_main"></div>
    </div>
	<script
		src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
	<script
		src="<c:url value='/resources/jquery.validation/1.16.0/jquery.validate.min.js' />"></script>
	<script
		src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
	<script
		src="<c:url value='/resources/bootstrap/js/bootstrap-table.js' />"></script>
	<script
		src="<c:url value='/resources/bootstrap/js/bootstrap-table-zh-CN.js' />"></script>
	<script
		src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.js' />"></script>
	<script
		src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.zh-CN.js' />"></script>
	<script
		src="<c:url value='/resources/bootstrap/js/bootstrap-select.min.js' />"></script>
	<script
		src="<c:url value='/resources/bootstrap/js/bootstrap-table-export.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/tableExport.js' />"></script>

	<script src="<c:url value='/resources/echarts/3.3.2/echarts.min.js'/>"></script>

	<script src="<c:url value='/resources/bootstrap/js/moment.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/daterangepicker.js' />"></script>

	<script src="<c:url value='/resources/json/JsonExportExcel.min.js' />"></script>
	<script src="<c:url value='/resources/jquery/jquery.steps.min.js' />"></script>
	<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
	<script src="<c:url value='/uarp/pageview/public-button${online}.js' />"></script>
	<script src="<c:url value='/uarp/pageview/echarts-public${online}.js' />"></script>
	
	<script src="<c:url value='/develop/${appname}/js/extend_echartssample.js' />"></script>
</body>

</html>