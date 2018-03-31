<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String appName = (String) request.getAttribute("appname");
	String apptitle = (String) request.getAttribute("apptitle");
	String copyright = (String) request.getAttribute("copyright");
%>
<html>
<head>
<meta charset=UTF-8">
<title><%=apptitle%></title>
<!-- 样式引入 -->
<link rel="stylesheet" type="text/css"
	href="<%=path%>/resources/bootstrap/css/sweetalert.css">
<link rel="stylesheet" type="text/css"
	href="<%=path%>/develop/landresmonitoring/login/style/style.css" />
<link rel="stylesheet" type="text/css"
	href="<%=path%>/develop/landresmonitoring/login/style/app.css" />
<!-- JS引入 -->
<script type="">
	var rootpath = '<%=path%>';
	var appName = '<%=appName%>';
    var apptitle = '<%=apptitle%>';
    var copyright = '<%=copyright%>';
</script>

<script src="<%=path%>/resources/jquery/jquery-1.11.3.min.js"></script>
<script type="text/javascript"
	src="<%=path%>/resources/bootstrap/js/sweetalert.min.js"></script>
<script type="text/javascript"
	src="<%=path%>/resources/js/util/encrypt.js"></script>
<script type="text/javascript"
	src="<%=path%>/develop/common/login/login.js"></script>
<script type="text/javascript"
	src="<%=path%>/resources/easyui/jquery.easyui.min.js"></script>
<style type="text/css">
.loginbox {
	width: 230px;
	height: 213px;
	border-radius: 6px;
	-webkit-border-radius: 6px;
	background: rgba(3, 72, 107, 0.9);
	font-family: '微软雅黑';
	padding: 20px 20px 30px 20px;
	border: 1px solid #617c87;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
}

.loginbox ul {
	list-style: none;
	margin: 0px auto;
	padding: 0px;
}

.loginbox ul li {
	color: white;
	font-size: 12px;
	margin-bottom: 10px;
}

.loginbox ul li input {
	height: 28px;
	background: #002c43;
	border-radius: 4px;
	-webkit-border-radius: 4px;
	border: none;
	margin-top: 4px;
	width: 100%;
	color: white;
}

.loginbox .loginBtn {
	background: #1186ca;
	color: white;
	width: 100%;
	height: 30px;
	border: none;
	-webkit-border-radius: 4px;
	margin-top: 10px;
	font-family: '微软雅黑';
	font-size: 14px;
	cursor: pointer;
}

.loginbox ul li:last-child input {
	width: 50% !important;
}
div.copyright {
    bottom: 15px;
    position: absolute;
    float: left;
    width: 100%;
    color: white;
    text-align: center;
}
p.loginLogo {
	color: white;
    text-align: center;
    font-size: 45px;
}
</style>
</head>
<body>

	<div class="wanda-global">
		<p class="loginLogo"><!-- <%=apptitle%> --></p>
		<div class="bg-start bg-pic"></div>
		<div class="stage">
			<div class="earth-basic">
				<div class="map"></div>
				<div class="fg"></div>
			</div>
			<div class="spots-set">
				<div class="spots">
					<div class="net net-china"></div>
					<div class="net net-usa"></div>
					<div class="net net-eu"></div>
					<div class="net net-au"></div>
				</div>
			</div>
		</div>
		<div class="loginbox"
			style="position: absolute; right: 14%; top: 275px;">
			<ul>
				<li>用户名：<br />
				<input name="" type="text" id="loginName" name="loginName" autocomplete="off"/></li>
				<li>密 码：<br />
				<input name="" type="password" id="password" name="loginName" autocomplete="off" /></li>
				<li>验证码：<br />
				<input name="" type="text" class="yzm" id="verificationCode" /> <img
					src="" id="rrandom" title="看不清，换张图片" class="verifyImg"
					style="cursor: pointer; width: 100px; height: 25px; vertical-align: middle;" /></li>

			</ul>
			<input class="loginBtn lbtn" type="button" onclick="login()" value="登录"
				id="loginBtn" />
		</div>
	</div>
	<div class="copyright" id="versionId"><%=copyright%></div>
</body>
<script
	src="<%=path%>/develop/landresmonitoring/login/libs/jquery/dist/jquery.min.js"></script>
<script
	src="<%=path%>/develop/landresmonitoring/login/libs/underscore/underscore-min.js"></script>
<script
	src="<%=path%>/develop/landresmonitoring/login/libs/raphael/raphael-min.js"></script>
<script
	src="<%=path%>/develop/landresmonitoring/login/libs/gsap/src/minified/TweenMax.min.js"></script>
<script
	src="<%=path%>/develop/landresmonitoring/login/libs/gsap/src/minified/plugins/RaphaelPlugin.min.js"></script>
<script
	src="<%=path%>/develop/landresmonitoring/login/libs/PxLoader/PxLoader.js"></script>
<script
	src="<%=path%>/develop/landresmonitoring/login/libs/PxLoader/PxLoaderImage.js"></script>
<script src="<%=path%>/develop/landresmonitoring/login/js/loadImg.js"></script>
<script src="<%=path%>/develop/landresmonitoring/login/js/earth.js"></script>
<script src="<%=path%>/develop/landresmonitoring/login/js/start.js"></script>
</html>