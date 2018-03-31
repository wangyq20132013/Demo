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
<link rel="stylesheet" type="text/css" href="<c:url value='/uadp/dataSource/dataSource.css'/>"></link>
<script type="text/javascript">
	var cxt = '${pageContext.request.contextPath}';
</script>
</head>

<body>
	<div id="mainDiv" class="col-sm-12">
		<div id="leftDiv" class="col-sm-2">
			<h3 class="text-left">数据连接</h3>
			<button id="addConnection" href="#" class="btn btn-primary" onclick="addConnection()">添加连接</button>
	   		<div class="row">
				<div class="col-lg-12">
				    <div class="input-group">
						<div class="input-group-btn">
							<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">名称<span class="caret"></span></button>
							<ul class="dropdown-menu" role="menu">
								<li><a>创建人</a></li>
								<li><a>类型</a></li>
							</ul>
						</div>
						<input type="text" class="form-control" placeholder="&nbsp;&nbsp;输入关键词搜索">
				    </div>
				</div>
			</div><!-- /.row -->
			<ul id="tree" class="ztree"></ul>	
		</div>
		<div id="rightDiv" class="col-sm-10">
			
		</div>
		<iframe id="rightIframe" name="rightIframe" src="" class="col-sm-10" frameborder="0" scrolling="no" height="100%"></iframe>
	</div>
	<div class="modal fade" id="dataBaseModal" tabindex="-1" role="dialog" aria-labelledby="dataBaseModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				    <h4 class="modal-title" id="dataBaseModalLabel">添加数据连接</h4>
				</div>
				<div class="modal-body">
					<ul id="dataBaseUl">
						<li class="dataBaseLi" onclick="dataBaseClickEvt(this)"><img alt="Excel" src="../uadp/dataSource/Excel.png"><div class="txt">Excel</div></li>
						<li class="dataBaseLi" onclick="dataBaseClickEvt(this)"><img alt="MySQL" src="../uadp/dataSource/MySQL.png"><div class="txt">MySQL</div></li>
						<li class="dataBaseLi" onclick="dataBaseClickEvt(this)"><img alt="Oracle" src="../uadp/dataSource/Oracle.png"><div class="txt">Oracle</div></li>
						<li class="dataBaseLi" onclick="dataBaseClickEvt(this)"><img alt="PostgreSQL" src="../uadp/dataSource/PostgreSQL.png"><div class="txt">PostgreSQL</div></li>
						<li class="dataBaseLi" onclick="dataBaseClickEvt(this)"><img alt="SQL Server" src="../uadp/dataSource/SQL Server.png"><div class="txt">SQL Server</div></li>
						<li class="dataBaseLi" onclick="dataBaseClickEvt(this)"><img alt="DB2" src="../uadp/dataSource/DB2.png"><div class="txt">DB2</div></li>
						<li class="dataBaseLi" onclick="dataBaseClickEvt(this)"><img alt="Spark SQL" src="../uadp/dataSource/Spark SQL.png"><div class="txt">Spark SQL</div></li>
						<li class="dataBaseLi" onclick="dataBaseClickEvt(this)"><img alt="Cheetah" src="../uadp/dataSource/Cheetah.png"><div class="txt">Cheetah</div></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</body>

<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
<script src="<c:url value='/resources/ztree/js/jquery.ztree.core.js' />"></script>	
<script src="<c:url value='/uadp/dataSource/dataSource.js' />"></script>

</html>