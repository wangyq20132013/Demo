<%@page language="java" contentType="text/html; charset=utf-8" import="com.at21.util.ConfigReader"%>
<%@page import="java.util.*"%>
<%@page import="com.at21.configtool.util.ConfigRealTimeReader"%>
<%@page import="com.at21.configtool.service.ConfigToolService"%>
<%@page import="java.io.File"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.PrintStream"%>
<%@page import="java.io.FileOutputStream"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.Reader"%>
<%
	String path = request.getContextPath();
	String classpath = request.getSession().getServletContext().getRealPath("/");

	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	//String verifycode = ConfigReader.getValueByXPath("urp/verifycode");
	String verifycode = ConfigRealTimeReader
			.getMapValueByXPath(request.getSession().getServletContext().getRealPath("/")).get("code");
	String encoding = "GBK";
	File file = new File(classpath + "WEB-INF\\classes\\VERSION");
	InputStreamReader read = new InputStreamReader(new FileInputStream(file), encoding);
	BufferedReader bufferdreader = new BufferedReader(read);
	String version = bufferdreader.readLine();
%>
<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath%>">
<title>统一应用开发平台</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link rel="stylesheet" type="text/css" href="<%=basePath%>resources/ext/resources/css/ext-patch.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>resources/ext/resources/css/ext-all.css" />
<style>
html, body {
	height: 100%;
	margin: 0px;
	padding: 0px;
	background: url(plugins/frame/images/loginbg.png) repeat-x center center;
	font-family: '微软雅黑';
}

img {
	border: 0;
}

ul, li {
	list-style: none;
}

a {
	color: #fff;
	text-decoration: none;
	outline: none;
}

a:link {
	color: #fff;
	text-decoration: none;
}

a:visited {
	color: #fff;
	text-decoration: none;
}

a:hover {
	color: #fe9715;
	text-decoration: underline;
}

#main {
	width: 960px;
	margin: 0 auto;
	color: #555;
}

#wrapper {
	width: 1280px;
	background: url(plugins/frame/images/loginboxbg.png) no-repeat;
	height: 562px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -320px;
	margin-left: -640px;
}

#logo {
	position: absolute;
	top: 47px;
	left: 60px;
	height: 65px;
	width: 242px;
}

#sys_name {
	position: relative;
	top: 150px;
	right: 110px;
	font-size: 39px;
	font-family: "华文楷体";
	float: right;
	color: white;
}

#cont {
	position: absolute;
	right: 350px;
	top: 230px;
}

#cont li {
	line-height: 38px;
	color: white;
	font-size: 16px;
}

#cont li input {
	height: 26px;
	background: #FFF;
	border: 1px solid #1ea1ea;
	vertical-align: middle;
	width: 240px;
	line-height: 26px;
}

#cont li label.lb {
	float: left;
	width: 50px;
	padding: 0 5px;
	line-height: 35px;
	text-align: right;
}
/**
*#cont li input.ip{width:185px;border:#41a1be 1px solid;font-size:12px;background:url(plugins/frame/images/inputstyle.gif) repeat-x;color:#898989;font-family:,"verdana";height:20px;line-height:20px;padding:2px;}
*/
#cont li input.ip {
	width: 185px;
	border: #41a1be 1px solid;
	font-size: 12px;
	color: #898989;
	font-family: , "verdana";
	height: 20px;
	line-height: 20px;
	padding: 2px;
}

#cont li span {
	display: block;
	padding-left: 60px;
}

#cont span {
	padding-left: 3px;
	padding-top: 6px;
}

.entestyle {
	background: url(plugins/frame/images/login_logo.gif) no-repeat;
	width: 115px;
	height: 36px;
}

#copy {
	position: absolute;
	height: 32px;
	width: 100%;
	background: #00bdf4;
	line-height: 32px;
	color: white;
	font-size: 12px;
	text-align: center;
	left: 0px;
	bottom: 0px;
}

a.submit_bt {
	border: 2px solid #1AA8F8;
	margin-left: 4px;
	padding: 4px 26px;
	border-radius: 4px;
	color: white;
	background: -webkit-linear-gradient(top, #1AA8F8, #1499E3);
}

.submit_bt:hover {
	text-decoration: none;
	color: white;
}

div#help {
	position: relative;
	right: 150px;
	top: 100px;
	float: right;
	color: white;
}

a.helphref {
	color: white;
	text-decoration: none;
	cursor: pointer;
}

font#helpfont {
	font-family: "微软雅黑";
}
</style>
<script type="text/javascript" src="<%=basePath%>resources/js/Context.js"></script>
<script type="text/javascript" src="<%=basePath%>resources/js/util/encrypt.js"></script>
<script type="text/javascript" src="<%=basePath%>resources/jquery/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=basePath%>resources/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=basePath%>resources/ext/ext-all.js"></script>
<script type="text/javascript">
	    var CONTEXT_PATH = '<%=basePath%>';
	    function pro_submitForm(loginform) {
	        var password = loginform.password.value;
	        
	        var loginname = loginform.loginname.value;
	        if(loginname == '' || loginname == null){
	        	//Utils.showMsg("用户名或密码不正确，请重新输入！");
				Ext.Msg.show({
					title : '提示',
					msg : '用户名或密码不正确，请重新输入！',
					width : 250,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.WARNING
				});
				clearAll();
				return;
			}
			if (password == '' || password == null) {
				//Utils.showMsg("用户名或密码不正确，请重新输入！");
			
				Ext.Msg.show({
					title : '提示',
					msg : '用户名或密码不正确，请重新输入！',
					width : 250,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.WARNING
				});
				clearAll();
				return;
			}
			var verificationCode = 0;
			<%if ("1".equals(verifycode)) {%>
	        	verificationCode = loginform.verificationCode.value;
	        <%}%>

	        var pwdEncrypt = encode64(password);
	        jQuery.ajax({
				type : "post",
				url : CONTEXT_PATH + "login/login",
				async : false,
				data : {
					"loginname" : loginname,
					"password" : pwdEncrypt,
					"verificationCode" : verificationCode
				},
				success : function(data) {
					var dataObj = eval("("+data+")");
					if (dataObj.success) {
	                    //setCookie("userName", loginname, 240, "/");//用户名保存十天时间
	                    window.location.href = CONTEXT_PATH + "login/work-window";
	                } else if (dataObj.info == 'password-wrong') {
	                    //Utils.showMsg("用户名或密码错误!");
	                    Ext.Msg.show({
								title : '提示',
								msg : '用户名或密码错误!',
								width : 250,
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.ERROR
							});
	                    clearAll();
	                    loginform.password.focus();
	                } else {
	                    //Utils.showMsg(dataObj.info);
	                     Ext.Msg.show({
								title : '提示',
								msg : dataObj.info,
								width : 250,
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.ERROR
							});
	                    clearAll();
	                    loginform.loginname.focus();
	                }
				}
			});
	    }
	
	    document.onkeydown = keyDown;//回车
	    function keyDown() {
	        var key = window.event.keyCode;
	        if (key == 0xD) { //判断是否按下回车键
	            pro_submitForm(loginform)
	        }
	    }
	    //打开全屏窗口
	    function openfull(url) {
	        var width = window.screen.availWidth;
	        var height = window.screen.availHeight - 25;
	        //full = window.open(url);
	        full = window.open(url, "fullwindow" + (new Date().getTime()), "width=" + width + ",height=" + height + ",top=0,left=0,toolbar=no,menubar=no, scrollbars=no, resizable=no, location=no, status=no");
	        //full = window.open(url, "_self", "width=" + width + ",height=" + height + ",top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no");
	
	    }
	
	    function $(objStr) {
	        return document.getElementById(objStr);
	    }
	
	    window.onload = function() {
	        //分析cookie值，显示上次的登录信息
	        //var userNameValue = getCookieValue("userName");
	        //$("loginname").value = userNameValue;
	    };
	
	    function setupCell() {
	    }
	    var inText = false;
	    function setInText(bool) {
	        inText = bool;
	    }
	    function fnTrapKD() {
	        if (!inText) {
	            event.returnValue = false;
	        }
	    }
	    function refreshVerificationCode(obj) {
	        //获取当前的时间作为参数，无具体意义
	        var timenow = new Date().getTime();
	        //每次请求需要一个不同的参数，否则可能会返回同样的验证码
	        //这和浏览器的缓存机制有关系，也可以把页面设置为不缓存，这样就不用这个参数了。
	        obj.src="plugins/urp/verificationcodeimage.jsp?d="+timenow;
	    }
	    function help() {
	    	var width = window.screen.availWidth;
	        var height = window.screen.availHeight - 25;
	        var url = "<%=basePath%>plugins/urp/help/help_sisp.jsp";
			window.open(url,"fullwindow" + (new Date().getTime()),
						"width="
						+ width
						+ ",height="
						+ height
						+ ",top=0,left=0,toolbar=no,menubar=no, scrollbars=no, resizable=no, location=no, status=no");
		}
	    function clearAll() {
	    	jQuery("#loginname").val("");
	    	jQuery("#password").val("");
	    	jQuery("#verifycodeInput").val("");
	    	refreshVerificationCode(document.getElementById("verifycodeImg"));
	    }
</script>
</head>
<body style="margin: 0px; overflow-x: hidden; overflow-y: hidden;">
	<div id="main">
		<div id="wrapper">
			<div id="help">
				<span id="version">VERSION:<%=version%>&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<a href="javascript:help()" class="helphref"><font id="helpfont">帮助</font></a>
			</div>
			<form action="login/login" name="loginform" method="post" target="_top" id="form1">
				<div id="logo"></div>
				<div id="sys_name">统一应用开发平台</div>
				<ul id="cont">
					<li>
						<label class="lb" for="uname">用户名</label> 
						<input name="loginname" id="loginname" type="text" class="ip" value=""
							maxlength="32" autocomplete="off" />
					</li>
					<li>
						<label class="lb" for="pwd">密码</label> 
						<input name="password" id="password" type="password" class="ip" value=""
							maxlength="32" autocomplete="off" />
					</li>
					<%
					if ("1".equals(verifycode)) {
					%>
					<li>
						<label class="lb" for="pwd">验证码</label> 
						<input id="verifycodeInput" type="text" name="verificationCode"
							maxlength="30" value="" notNull='true' vdisp='验证码'
							vtype='NumAndStr' onblur="setInText(false)"
							onfocus="setInText(true)" autocomplete="off" class="ip"
							style="width: 80px;"/> 
						<img id="verifycodeImg"
							src="plugins/urp/verificationcodeimage.jsp" width="100"
							height="25" onclick="refreshVerificationCode(this)" alt="验证图标"
							title="点击图片刷新验证码"
							style="cursor: pointer; position: relative; top: 8px;" />
					</li>
					<%
					}
					%>
					<li>
						<span> 
							<a href="javascript:pro_submitForm(loginform);" class="submit_bt"> 登录 </a> 
							<a href="<%=basePath%>redirect/registeruser" class="submit_bt"> 注册 </a>
						</span>
					</li>

				</ul>
			</form>
		</div>
	</div>
	<div id="copy">Copyright &copy; 2017 二十一世纪空间技术应用股份有限公司</div>
</body>
</html>


