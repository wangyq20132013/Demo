<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<link rel="icon" href="img/favicon.ico">
<title>统一应用配置平台</title>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/uadp/css/style.css'/>"></link>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/uadp/login/login.css'/>"></link>
<script type="text/javascript">
	var cxt = '${pageContext.request.contextPath}';
</script>
</head>



<body class="signin">
	<div class="signinpanel">
		<div class="header">
			<h1 class="text-center">统一应用配置平台</h1>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<form class="form-horizontal">
					<div class="form-group">
						<div class="col-sm-12">
							<input type="text" id="account" class="form-control uname"
								placeholder="用户名" data-toggle="tooltip" data-placement="right"
								title="用户名或密码错误" required="">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-12">
							<input type="password" id="pwd" class="form-control pword"
								placeholder="密码" required="">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-12">
							<div class="input-group">
								<input type="text" id="checkcode" name="checkcode"
									class="form-control" placeholder="输入验证码" />
								<div class="input-group-addon" class="checkcode" style="padding: 0px;">
									<img id="checkcodeimg"
										src="${pageContext.request.contextPath}/checkcode.jsp?t=101223544435" />
								</div>
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-xs-4">
							<label class="control-label">
								<input type="checkbox" name="online" id="" value="">记住密码
							</label>
						</div>
						<div class="col-xs-8">
							<label id="info" class="control-label" style="float: right; color: red;"></label>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-12">
							<button id="login" class="btn btn-primary btn-block"
								type="button">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="signup-footer">
			<div class="text-center">&copy; 二十一世纪空间技术应用股份有限公司</div>
		</div>
	</div>
</body>


<script
	src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
<script src="<c:url value='/resources/jquery.validation/1.16.0/jquery.validate.min.js' />"></script>
<script src="<c:url value='/uadp/login/login.js' />"></script>

</html>
