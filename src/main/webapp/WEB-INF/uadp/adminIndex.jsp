<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="favicon.ico">
<title>统一应用配置平台</title>

<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/font-awesome/css/font-awesome.min.css'/>"></link>

<link rel="stylesheet" type="text/css"
	href="<c:url value='/uadp/index/index.css'/>"></link>

<script type="text/javascript">
	var cxt = '${pageContext.request.contextPath}';
	var appname = '${appname}';
	var theme = 'bootstrap';
</script>
</head>

<body>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">统一应用配置平台</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="">
				<ul class="nav navbar-nav navbar-right">
					<li><a href="#" onclick="fullScreen()"><i class="fa fa-arrows-alt"></i> 全屏</a></li>
					<li><a href="#" ><i class="fa fa-question"></i> 问题中心</a></li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="true">
							<i class="fa fa-user"></i> 超级管理员<i class="caret"></i>
						</a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="#"><i class="fa fa-cog"></i> 设置</a></li>
							<li><a href="${pageContext.request.contextPath}/logout"><i class="fa fa-sign-out"></i> 退出</a></li>
						</ul>
					</li>
				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>

	<div class="main_iframe">
		<iframe id="main" scrolling="yes" frameborder="0" src="main"
			style="height: 100%; width: 100%;"></iframe>
	</div>

	<div id="modal" class="modal fade bs-example-modal-lg" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg" style="z-index: 10000;">
			<div class="modal-content" style="width: 100%; height: 100%;">
				<div class="modal-header">
					<div class="modal-title col-sm-5" style="padding: 0px;"></div>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body"
					style="padding: 0px; height: calc(100% - 50px);">
					<iframe id="modaliframe"
						style="width: 100%; height: 100%; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;"
						frameborder="0" scrolling="no"></iframe>
				</div>
			</div>
		</div>
	</div>
</body>
<script
	src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
<script src="<c:url value='/uadp/index/index.js' />"></script>

</html>