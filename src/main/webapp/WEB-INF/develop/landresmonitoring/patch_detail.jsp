<%@page import="com.at21.db.JdbcTemplate"%>
<%@page import="com.at21.util.GenerateTreeCode"%>
<%@page import="java.util.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ztree/css/metroStyle/metroStyle.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-table.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ztree/css/metroStyle/metroStyle.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-treeselect.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-select.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/awesome/assets/font-awesome/css/font-awesome.min.css'/>"></link>
		<!-- myself.css -->
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/layer/2.4/skin/layer.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/style.css'/>" />
	<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/extend_ztdu.css' />"/>
	</head>
	<div class="left_data">
		<div class="panel panel-primary" style="margin-bottom: 0px;height: 100%">
				<ul id="tree" class="ztree" style="height: 100%;overflow-y: auto;"></ul>
		</div>
	</div>
	<div class="main_data">
	<!-- <div>动态添加类型radio按钮，默认选中第一个<div> -->
	 <div id="radioType" style="display:inline"></div>
	<div id="mapchart" style="height:100%"></div>
	 
		
	</div>
	<div class="right_data">
		<div id="table"></div>
	</div>
	
	<!-- add js -->
	<!-- jQuery 2.0.2 -->
	<script src="<c:url value='/resources/adminlte/js/jquery.min.js' />"></script>
	<!-- Bootstrap -->
	<script src="<c:url value='/resources/adminlte/js/bootstrap.min.js' />"
		type="text/javascript"></script>
	<script
		src="<c:url value='/resources/bootstrap/js/bootstrap-table.js' />"></script>
	<script
		src="<c:url value='/resources/bootstrap/js/bootstrap-table-zh-CN.js'/>"></script>
	<!-- ztree.js -->
	<script src="<c:url value='/resources/ztree/js/jquery.ztree.all.min.js' />" type="text/javascript"></script>
	
	<script src="<c:url value='/resources/echarts/3.3.2/echarts.min.js'/>"></script>
	<!-- myself.javascript -->
	<script src="<c:url value='/develop/${appname}/js/extend_ztduMap.js' />" type="text/javascript"></script>
	<script src="<c:url value='/develop/${appname}/js/extend_patchDetail.js' />" type="text/javascript"></script>
	<script src="<c:url value='/develop/${appname}/js/extend_public.js' />" type="text/javascript"></script>
	 <script src="<c:url value='/uarp/pageview/public-button.js' />" type="text/javascript"></script> 
	<script>
		var patchType=[];//全部的图斑类型或属性
    var patchSelectType=[];//选中的图斑类型或属性；
	var cxt = '${pageContext.request.contextPath}';
	//var name = '${name}';
	//var appname = '${appname}';
	//var previewid = '${pageviewid}';
	var theme = '${theme}';
	//var exceldata = '${dataset[0].excel}';
	var params = ${empty params?"{}":params};
	//var userArea = ${empty userarea?"{}":userarea};
	//var dataset = ${empty dataset?"{}":dataset};
	// var query = ${empty query?"{}":query};
	var detailPro=params.key;  //这个是穿过的详情页面的属性；1.detailtype ：类型2.detailproperty：性质；3.detailchange ：历史变化；
	</script>

</html>


