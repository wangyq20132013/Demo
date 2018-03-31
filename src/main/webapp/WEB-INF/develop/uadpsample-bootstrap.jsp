<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${app.SYSNAME}</title>
<link rel="Bookmark" href="/favicon.ico">
<link rel="Shortcut Icon" href="/favicon.ico" />

<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/bootstrap/css/sweetalert.css'/>"></link>

<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/H-ui/Hui-iconfont/1.0.8/iconfont.css'/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value='/develop/${app.SYSENNAME}/index/index.css'/>" />

<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
			var user = '${user.getLoginname()}';
			var loginid = '${user.getLoginid()}';
			var sysname = '${app.SYSENNAME}';
			var appname = '${appname}';
			var theme = 'bootstrap';
			var params = ${empty params?'{}':params};
			var navitems = [];
		</script>
</head>

<body>
	<nav class="navbar navbar-default" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">
					<img src="${pageContext.request.contextPath}/develop/${appname}/image/logo.png" />&nbsp;<span style="font-size:32px;">${app.SYSNAME}</span>
				</a>
			</div>
	
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse"
				id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
					<c:if test="${not empty navitems}">
						<c:forEach items="${navitems.children}" var="nav">
							<li class="nav-tab">
								<a href="#" id="${nav.ID}" url="${nav.HREF}?pvgresid=${nav.ID}" isgroup="${nav.ISGROUP}"
								isActive='${nav.ISACTIVE}'>
								<img src="${pageContext.request.contextPath}/develop/${appname}/${nav.ICON}"/></br>
								${nav.NAME}</a>
							</li>
						</c:forEach>
					</c:if>
				</ul>
			</div>
			<!-- /.navbar-collapse -->
			<div class="exit">
				<span class="welcome">
					<p style="float: left;margin: 0px;font-size: 12px;">欢迎您</p>
					<div class="dropdown" style="width: auto;float: left;">
						<a id="dLabel" href="#" data-toggle="dropdown" aria-haspopup="true" >【${user.logintitle}】</a>
						<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
							<li>
								<a href="#" onclick="popupPage('update', '个人信息', 'userinfo', 'modal', {}, 50, 50)">用户个人信息</a>
							</li>
							<li>
								<a href="#" onclick="popupPage('extend', '修改密码', 'updatePwd', 'modal',{},50,50)">修改密码</a>
							</li>
							<li>
								<a href="#" onclick="logoutSys()">退出</a>
							</li>
						</ul>
					</div>
					<a href="#" onclick="logoutSys()">【退出】</a>
				</span>
				<span id="currentTime" class="time"></span>
			</div>
		</div>
		<!-- /.container-fluid -->
	</nav>

	<div class="main_iframe">
		<iframe id="main" scrolling="yes" frameborder="0" src=""
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

	<script
		src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
	<script
		src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
	<script
		src="<c:url value='/resources/bootstrap/js/sweetalert.min.js' />"></script>

	<script type="text/javascript"
		src="<c:url value='/resources/jquery.validation/1.14.0/jquery.validate.js' />"></script>
	<script type="text/javascript"
		src="<c:url value='/resources/jquery.validation/1.14.0/validate-methods.js' />"></script>
	<script type="text/javascript"
		src="<c:url value='/resources/jquery.validation/1.14.0/messages_zh.js' />"></script>
	<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
	<script
		src="<c:url value='/develop/${app.SYSENNAME}/index/index.js' />"></script>

	<script src="<c:url value='/uarp/pageview/public-button.js' />"></script>

</body>

</html>