<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<link rel="icon" href="img/favicon.ico">
<title>统一应用配置平台</title>
<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ztree/css/metroStyle/metroStyle.css'/>">
<link rel="stylesheet" type="text/css" href="<c:url value='/uadp/css/style.css'/>"></link>
<link rel="stylesheet" type="text/css" href="<c:url value='/uadp/dataSource/dbSource.css'/>"></link>
<script type="text/javascript">
	var cxt = '${pageContext.request.contextPath}';
</script>
</head>

<body>
	<div id="main" class="col-sm-12">
		<div class="titlebar">
			<h2>未命名数据连接(类型：Excel)</h2>
		</div>
		<div class="content">
			<ul class="nav nav-tabs">
				<li role="presentation" class="active"><a href="#baseInfo" role="tab" data-toggle="tab">基本信息</a></li>
				<li role="presentation"><a href="#tableInfo" role="tab" data-toggle="tab">表信息</a></li>
				<li role="presentation"><a href="#operateRecord" role="tab" data-toggle="tab">操作记录</a></li>
			</ul>
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane active" id="baseInfo">
					<form role="form" id="conn_info_form">
						<div class="form-group">
							<label for="dataSourceName">数据源名称</label>
							<input type="text" class="form-control" id="dataSourceName" placeholder="未命名数据连接">
						</div>
						<div class="form-group">
							<label for="server">服务器</label>
							<input type="text" class="form-control" id="server" placeholder="服务器">
						</div>
						<div class="form-group">
							<label for="port">端口</label>
							<input type="text" class="form-control" id="port" placeholder="端口">
						</div>
						<div class="form-group">
							<label for="username">用户名</label>
							<input type="text" class="form-control" id="username" placeholder="用户名">
						</div>
						<div class="form-group">
							<label for="password">密码</label>
							<input type="password" class="form-control" id="password" placeholder="密码">
						</div>
						<button class="btn btn-primary" onclick="connectDb()">连接</button>
					</form>
				</div>
				<div role="tabpanel" class="tab-pane" id="tableInfo">1</div>
				<div role="tabpanel" class="tab-pane" id="operateRecord">3</div>
			</div>
		</div>
	</div>
</body>

<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
<script src="<c:url value='/uadp/dataSource/dbSource.js' />"></script>

</html>