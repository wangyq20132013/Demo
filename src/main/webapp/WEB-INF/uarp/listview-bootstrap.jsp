<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>${name}</title>
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-table.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ztree/css/metroStyle/metroStyle.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-datetimepicker.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-select.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-treeselect.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/daterangepicker.css'/>"></link>
		
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/jquery/jquery.steps.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/H-ui/Hui-iconfont/1.0.8/iconfont.css'/>" />
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/layer/2.4/skin/layer.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/uarp/pageview/css/listview-bootstrap.css'/>" />
		<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/style.css'/>" />
		
		<c:forEach items="${extend_css}" var="css" varStatus="status">
			<c:if test="${fn:indexOf(css,'/') > -1}">
				<link rel="stylesheet" type="text/css" href="<c:url value='${css}' />" />
			</c:if>
			<c:if test="${fn:indexOf(css,'/') == -1}">
				<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/extend_${css}.css' />"/>
			</c:if>
		</c:forEach>
		
		<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
			var name = '${name}';
			var appname = '${appname}';
			var type= '${type}';
			var previewid = '${pageviewid}';
			var theme = '${theme}';
			var exceldata = '${dataset[0].excel}';
			var params = ${empty params?"{}":params};
			var userArea = ${empty userarea?"{}":userarea};
			var dataset = ${empty dataset?"{}":dataset};
			var query = ${empty query?"{}":query};
		</script>
	</head>

	<body style="min-width: 769px;height: 100%;width:100%;overflow-y: hidden;">

		<div class="panel-body">
			<c:import url="listview-bootstrap-button.jsp" />
			
			<c:import url="listview-bootstrap-query.jsp" />
				
			<div id="listview" class="col-xs-12">
				<table id="table" class="table table-striped table-bordered table-hover"></table>
			</div>
			
			<div id="echartsview" class="col-xs-12">
				<div class="wrapper">
					<div id="sample"></div>
				</div>
			</div>
		</div>
		
		<c:forEach items="${formpage}" var="page" varStatus="status">
			<c:if test="${page.type == 'develop'}">
				<c:import url="../${page.type}/${appname}/${page.name}.jsp" />
			</c:if>
		</c:forEach>

		<div id="modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content" style="width: 100%;height:100%;">
					<div class="modal-header">
						<div class="modal-title col-sm-5"></div>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="modal-body" style="padding:0px;height: calc(100% - 48px);">
						<iframe id="modaliframe" style="width: 100%;height: 100%;border-bottom-right-radius: 4px;border-bottom-left-radius: 4px;" frameborder="0" scrolling="no"></iframe>
					</div>
				</div>
			</div>
		</div>
		
		<iframe id="outputframe" height="0px;" name="outputframe" src="" style="visibility:hidden;border: 0px;"></iframe>
		
		<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
		<script src="<c:url value='/resources/jquery.validation/1.14.0/jquery.validate.js' />"></script>
		<script src="<c:url value='/resources/jquery.validation/1.14.0/validate-methods.js' />"></script>
		<script src="<c:url value='/resources/jquery.validation/1.14.0/additional-methods.js' />"></script>
		<script src="<c:url value='/resources/jquery.validation/1.14.0/messages_zh.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-table.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-table-zh-CN.js' />"></script>
		<script src="<c:url value='/resources/ztree/js/jquery.ztree.all.min.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.zh-CN.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-select.min.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-treeselect.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-table-export.js' />"></script>
		
		<script src="<c:url value='/resources/bootstrap/js/tableExport.js' />"></script>
		
		<script src="<c:url value='/resources/bootstrap/js/moment.min.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/daterangepicker.js' />"></script>
		
		<script src="<c:url value='/resources/json/JsonExportExcel.min.js' />"></script>
		<script src="<c:url value='/resources/jquery/jquery.steps.min.js' />"></script>
		<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
		<script src="<c:url value='/uarp/pageview/public-button${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/listview-button${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/listview-query${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/listview-bootstrap${online}.js' />"></script>
		
		<c:forEach items="${extend_js}" var="js" varStatus="status">
			<c:if test="${fn:indexOf(js,'/') > -1}">
				<script src="<c:url value='${js}' />"></script>
			</c:if>
			<c:if test="${fn:indexOf(js,'/') == -1}">
				<script src="<c:url value='/develop/${appname}/js/extend_${js}.js' />"></script>
			</c:if>
		</c:forEach>
	</body>

</html>