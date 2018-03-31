<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>

<!--[if IEMobile 7]><html class="no-js iem7 oldie"><![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html class="no-js ie7 oldie" lang="en"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html class="no-js ie8 oldie" lang="en"><![endif]-->
<!--[if (IE 9)&!(IEMobile)]><html class="no-js ie9" lang="en"><![endif]-->
<!--[if (gt IE 9)|(gt IEMobile 7)]><!--><html class="no-js" lang="en"><!--<![endif]-->

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title></title>
	<meta name="description" content="">
	<meta name="author" content="">

	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

	<style>
		.error_title span {
		    font-family: 微软雅黑;
		    font-size: 16px;
		    font-weight: bold;
		}
	</style>
</head>
<body>
	<div style=" width:50%; margin:0px auto; float:none; border:none;margin-top:200px;" >     
      <!----错误页面---->
      <div class="errorpage">
          <div class="error_title" style="width:300px;float:left;"><p><span>该用户没有此功能的权限，请联系管理员。</span> <br></p></div>
          <div class="error_img" style="float:right;"><img src="<%=path %>/images/errorbg.png" /></div>
          
      </div>
  	</div>
</body>
</html>