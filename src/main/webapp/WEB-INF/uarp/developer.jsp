<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>二次开发手册</title>
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ztree/css/metroStyle/metroStyle.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/awesome/assets/font-awesome/css/font-awesome.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ueditor/third-party/codemirror/codemirror.css'/>"></link>
		
		<style>
			html,body{
				overflow: hidden;
				font-family:'微软雅黑';
				font-size: 14px;
			}
			
			.panel {
				height: 100%;
				margin-bottom: 0px;
			}
			.panel-body {
				height: calc(100% - 50px);
			}
			
			#tree li span{
				font-family:'微软雅黑';
				font-size: 12px;
			}
			.CodeMirror{
				font-family:'微软雅黑';
				font-size: 12px;
				border: 1px solid #E0E0E0;
			}
			
			textarea{
				font-family:'微软雅黑';
				font-size: 12px;
				border: 1px solid #E0E0E0;
			}
		</style>
		<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
		</script>
	</head>

	<body>
		<div id="treepanel" class="panel panel-default" style="width: 300px;height: 100%;position: absolute;">
			<div class="panel-heading">
				<div id="treetitle" class="panel-header"></div>
			</div>
			<div class="panel-body" style="overflow: auto;padding: 15px;">
				<div class="input-group">
				      <input type="text" class="form-control" id="searchInput" placeholder="输入名称进行查询">
				      <span class="input-group-btn">
				        <button class="btn btn-default" type="button" onclick="searchTree()"><img src="${pageContext.request.contextPath}/resources/onemap/img/btn_find.png" ></button>
				      </span>
				</div>
				<ul id="tree" class="ztree" style="margin-top: 5px;height:calc(100% - 39px);overflow-y: overlay"></ul>
			</div>
		</div>
		<div id="listpanel" class="panel panel-default" style="height:100%;width:calc(100% - 300px);position: absolute;left: 300px;">
			<div class="panel-heading">
				<div id="nodedesc" class="panel-header">节点描述</div>
			</div>
			<div class="panel-body" style="height: 100%">
			<textarea id="nodecontent" name="nodecontent" style="height:calc(96%);width:calc(100%);"></textarea>
			<iframe id="htmlframe" style="height:calc(100%);width:calc(100%);" frameborder="0px" name="outputframe" src=""></iframe>
			</div>
		</div>
	</body>

	<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
	<script src="<c:url value='/resources/ztree/js/jquery.ztree.all.min.js' />"></script>
	<!-- 
	<script src="<c:url value='/resources/ueditor/third-party/codemirror/codemirror.js' />"></script>
	<script src="<c:url value='/resources/ueditor/third-party/codemirror/sql.js' />"></script>
	<script src="<c:url value='/resources/ueditor/third-party/codemirror/xml.js' />"></script>
	<script src="<c:url value='/resources/ueditor/third-party/codemirror/javascript.js' />"></script>
	 -->
	<script src="<c:url value='/develop/common/constants.js' />"></script>
	<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
	<script src="<c:url value='/uarp/pageview/developer${online}.js' />"></script>
</html>