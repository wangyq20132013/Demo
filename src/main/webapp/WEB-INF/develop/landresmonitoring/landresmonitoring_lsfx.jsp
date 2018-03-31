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
		<div class="panel-heading">${name}</div>
				<ul id="tree" class="ztree" style="height:94%; calc(100% - 30px);overflow-y: auto;"></ul>
		</div>
	</div>
	   <div class="main_data">
	   <ul class="list-group fx-list">
	     <li class="list-group-item lishi"><p id="echarttitle" style="font-size: 18px;font-weight: 700;">经济法的施工</p>
	       <div id="radioType" style="margin-top: -29px"> 
	       <label style="    width: 100%;text-align: center;">
	       <input type="radio" id="radioSL" onclick="radiochange('sl')" name="radio" value="1" checked>数量
	       <input type="radio" id="radioMJ" onclick="radiochange('mj')" name="radio" value="2">面积
	       </label>
	       </div>
	      <div id="patchchange"></div>
	     </li >
	     <li class="list-group-item lishi"><table id="table" class="table"></table></li>
	   </ul>
	 
	
		
	</div>
	<div class="right_data" style="display:none">
	</div>
	
	<!-- add js -->
	
	<!-- jQuery 2.0.2 -->
	<script src="<c:url value='/resources/adminlte/js/jquery.min.js' />"></script>
	
	<script
		src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
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
	
	<script src="<c:url value='/develop/${appname}/js/extend_public.js' />" type="text/javascript"></script>
	 <script src="<c:url value='/uarp/pageview/public-button.js' />" type="text/javascript"></script> 
	 <script src="<c:url value='/develop/${appname}/js/extend_lsfx.js' />" type="text/javascript"></script>
	<script>
	var patchType=[];//全部的图斑类型或属性
    var patchSelectType=[];//选中的图斑类型或属性；
	var cxt = '${pageContext.request.contextPath}';
	var params = ${empty params?"{}":params};
	var theme = params.theme;  //获取主题；
	var detailPro=params.key;  //这个是穿过的详情页面的属性；1.detailtype ：类型2.detailproperty：性质；3.detailchange ：历史变化；
	</script>

</html>


