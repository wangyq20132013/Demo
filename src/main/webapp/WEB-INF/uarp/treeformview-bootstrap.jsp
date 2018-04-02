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
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/daterangepicker.css'/>"></link>

		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/awesome/assets/font-awesome/css/font-awesome.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ol3/css/ol.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ol3-ext/dist/ol3-ext.css'/>"></link>

		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-select.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-treeselect.css'/>"></link>
		
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/jquery/jquery.steps.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/H-ui/Hui-iconfont/1.0.8/iconfont.css'/>" />
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/layer/2.4/skin/layer.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/uarp/pageview/css/formview-bootstrap.css'/>" />
		<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/style.css'/>" />
		
		<c:forEach items="${extend_css}" var="css" varStatus="status">
			<c:if test="${fn:indexOf(css,'/') > -1}">
				<link rel="stylesheet" type="text/css" href="<c:url value='${css}' />" />
			</c:if>
			<c:if test="${fn:indexOf(css,'/') == -1}">
				<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/extend_${css}.css' />"/>
			</c:if>
		</c:forEach>
		
		<style>
			html,
			body {
				width: 100%;
				height: 100%;
			}
			.panel {
				height: 100%;
				margin-bottom: 0px;
			}
			.panel-body {
				height: calc(100% - 50px);
			}
			#table{
				border-bottom-color: rgb(221, 221, 221);
		   	 	border-bottom-style: solid;
		   	 	border-bottom-width: 1px;
			}
			#tree ul{
				padding-top: 5px;
			}
			
		</style>
		<script type="text/javascript">
			var a = '${extend_js}';
			var cxt = '${pageContext.request.contextPath}';
			var name = '${name}';
			var appname = '${appname}';
			var type = '${type}';
			var previewid = '${pageviewid}';
			var theme = '${theme}';
			var params = ${empty params?"{}":params};
			var userArea = ${empty userarea?"{}":userarea};
			var dataset = ${empty dataset?"{}":dataset};
		</script>
	</head>

	<body>
		<div id="treepanel" class="panel panel-default" style="width: 300px;height: 100%;position: absolute;">
			<div class="panel-heading">
				<div id="treetitle" class="panel-header"></div>
			</div>
			<div class="panel-body" style="overflow: auto;padding: 15px;">
				<div class="input-group">
				      <input type="text" class="form-control" id="searchInput" placeholder="输入名称进行查询">
				      <span class="input-group-btn">
				        <button class="btn btn-default" type="button" onclick="searchTree()"><img src="${pageContext.request.contextPath}/resources/onemap/img/btn_find.png" ></button>
				      </span>
				</div>
				<ul id="tree" class="ztree" style="margin-top: 5px;height:calc(100% - 39px);overflow-y: overlay"></ul>
			</div>
			<c:import url="treeview-bootstrap-button.jsp" />
		</div>
		<div id="listpanel" class="panel panel-default" style="height:100%;width:calc(100% - 300px);position: absolute;left: 300px;">
			<div class="panel-body" style="height: 100%">
				<c:import url="listview-bootstrap-button.jsp" />
				<div class="col-xs-12">
					<c:import url="formview-content-bootstrap.jsp" />
				</div>
			</div>
		</div>
		
		<div id="modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content" style="width: 100%;height:100%;">
					<div class="modal-header">
						<div class="modal-title col-sm-5"></div>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="modal-body" style="padding:0px;height: calc(100% - 53px);border-bottom-right-radius: 4px;border-bottom-left-radius: 4px;">
						<iframe id="modaliframe" style="width: 100%;height: 100%;border-radius: 5px;" frameborder="0" scrolling="no"></iframe>
					</div>
				</div>
			</div>
		</div>
	</body>
	
	<iframe id="outputframe" height="0px;" name="outputframe" src="" style="visibility:hidden;border: 0px;"></iframe>

	<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
	<script src="<c:url value='/resources/ztree/js/jquery.ztree.all.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.16.0/jquery.validate.min.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.14.0/validate-methods.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.14.0/additional-methods.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.14.0/messages_zh.js' />"></script>
	<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>

	<script src="<c:url value='/resources/ueditor/ueditor.config.js' />"></script>
	<script src="<c:url value='/resources/ueditor/ueditor.all.min.js' />"></script>
	<script src="<c:url value='/resources/ueditor/lang/zh-cn/zh-cn.js' />"></script>
	

	<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.zh-CN.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-select.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-treeselect.js' />"></script>
	
	
	<script src="<c:url value='/resources/bootstrap/js/moment.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/daterangepicker.js' />"></script>
	
	
	<script src="<c:url value='/resources/jquery/jquery.steps.min.js' />"></script>
	<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
	<script src="<c:url value='/uarp/pageview/public-button${online}.js' />"></script>
	<script src="<c:url value='/uarp/pageview/listview-button${online}.js' />"></script>
	
	<script src="<c:url value='/uarp/pageview/treeview-bootstrap${online}.js' />"></script>
	<script src="<c:url value='/uarp/pageview/treeview-button${online}.js' />"></script>
	
	<script src="<c:url value='/uarp/pageview/formview-button.js' />"></script>
	<script src="<c:url value='/uarp/pageview/formview-bootstrap${online}.js' />"></script>
	<script src="<c:url value='/uarp/pageview/treeformview-bootstrap${online}.js' />"></script>
	
	<c:forEach items="${extend_js}" var="js" varStatus="status">
		<c:if test="${fn:indexOf(js,'/') > -1}">
			<script src="<c:url value='${js}' />"></script>
		</c:if>
		<c:if test="${fn:indexOf(js,'/') == -1}">
			<script src="<c:url value='/develop/${appname}/js/extend_${js}.js' />"></script>
		</c:if>
	</c:forEach>

</html>