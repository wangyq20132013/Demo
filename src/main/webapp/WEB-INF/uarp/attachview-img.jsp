<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String state = request.getParameter("state");
%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="google" content="notranslate">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>图片预览</title>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
		<style type="text/css">
			html,body{height:100%}
			.panel{height:100%}
			.panel-body{height:calc(100% - 42px);}
		</style>
		<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
			var path = '${path}';
		</script>
		
	</head>

	<body >
		<div class="panel panel-default">
			<div class="panel-heading" style="padding: 10px;">
				<a type="button" class="btn btn-defult" onclick="back();" style="padding:0px;"><span class="glyphicon glyphicon-chevron-left" ></span>返回</a>
			</div>
			<div class="panel-body" style="text-align: center;">
				<img src="${pageContext.request.contextPath}${path}" style="margin: 0 auto;padding:0px 15px 0px 15px;max-width:100%;max-height:100%;"/>
			</div>
		</div>
	</body>
<script type="text/javascript">
		var state = '<%=state%>';
		function back(){
			console.log(state);
			if(state == '1'){
				parent.closeModal();
			}else{
				window.history.back(-1);
			}
		}
	</script>
</html>