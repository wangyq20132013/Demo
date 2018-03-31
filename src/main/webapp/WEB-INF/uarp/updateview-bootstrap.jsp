<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>${buisname}</title>
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrapValidator.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ztree/css/metroStyle/metroStyle.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-treeselect.css'/>"></link>
				<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ol3/css/ol.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ol3-ext/dist/ol3-ext.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/layer/2.4/skin/layer.css'/>"></link>
			<link rel="stylesheet" type="text/css" href="<c:url value='/uarp/pageview/css/mapview-bootstrap.css'/>" />
		<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/style.css'/>"></link>
		
		<c:forEach items="${extend_css}" var="css" varStatus="status">
			<c:if test="${fn:indexOf(css,'/') > -1}">
				<link rel="stylesheet" type="text/css" href="<c:url value='${css}' />" />
			</c:if>
			<c:if test="${fn:indexOf(css,'/') == -1}">
				<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/extend_${css}.css' />"/>
			</c:if>
		</c:forEach>
		
		<style type="text/css">
			.panel-body{
				padding: 15px 0px 15px 0px!important;
				height: calc(100% - 56px);
			}
			#formview{
				height: 100%;;
				overflow-y: auto;
				overflow-x: hidden;
			}
			#map{
				height: 100%;
			}
		</style>
		<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
			var name = '${name}';
			var type = '${type}';
			var theme = '${theme}';
			var appname = '${appname}';
			var params = ${empty params?"{}":params};
			var userArea = ${empty userArea?"{}":userArea};
			var dataset = ${empty dataset?"{}":dataset};
		</script>
		
	</head>

	<body>
		<div class="panel-body">

			<c:if test="${type == 'updateview'}">
				<div id="formview">
					<div class="col-sm-12">
						<form class="form-horizontal" role="form" id="formadd" enctype="multipart/form-data">
							<c:forEach items="${formpage}" var="form">
								<c:import url="../${form.type}/${appname}/${form.name}.jsp" />
							</c:forEach>
						</form>
					</div>
				</div>
			</c:if>
				

			<c:if test="${type == 'updatemap'}">
				<div id="map" class="col-sm-6"">
					<div class="tucengkz hidden-print" style="display:none;">
						<div class="tucengkongzhi">
							<p style="text-align: right;">
								<img title="地图切换" src="${pageContext.request.contextPath}/resources/commons/map/css/icons/switchmapon.png" id="SwitchMapOnOff" />
							</p>
							<ul id="switchmapwrapper" style="background: url(${pageContext.request.contextPath}/resources/commons/map/css/icons/tckzbg.png); display: none; width: 230px; height: 129px; border-radius: 5px;">
								<li style="text-align: center;" datatype="baselayer_vector"><a href="javascript:void(0);"><img src="${pageContext.request.contextPath}/resources/commons/map/css/icons/ditu.png" /></a><br />矢量地图</li>
								<li style="text-align: center;" datatype="baselayer_satellite"><a href="javascript:void(0);"><img src="${pageContext.request.contextPath}/resources/commons/map/css/icons/yingxiang.png" /></a><br />影像地图</li>
							</ul>
						</div>
					</div>
					<div id="popup" class="ol-popup" style="position: absolute; width: 300px; height: 200px;">
						<div id="pop_title" class="pop_title"></div>
						<a href="#" id="pop_closer" class="ol-pop_closer"></a>
						<div id="pop_content" class="pop_content" style="height: 168px; overflow-y: auto;"></div>
					</div>
				</div>
				<div id="formview" class="col-sm-6">
					<form class="form-horizontal" role="form" id="formadd" enctype="multipart/form-data">
						<c:forEach items="${formpage}" var="form">
							<c:import url="../${form.type}/${appname}/${form.name}.jsp" />
						</c:forEach>
					</form>
				</div>
			</c:if>
		</div>
		<div class="panel-footer" style="position: absolute;text-align: center;width: 100%;">
			<c:forEach items="${button}" var="btn">
				<button type="button" class="btn btn-primary" name="${btn.name}" onclick="${btn.clickevent}" style="width: 15%;">
					<span class="glyphicon" aria-hidden="true"></span>${btn.title}
				</button>
			</c:forEach>
			<button type="button" class="btn btn-default" onclick="parent.closeModal()" style="width: 15%;">取消</button>
		</div>
		
		<iframe id="outputframe" height="0px;" name="outputframe" src="" style="visibility:hidden;border: 0px;"></iframe>
	</body>
	
	<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.14.0/jquery.validate.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.14.0/validate-methods.js' />"></script>
	<script src="<c:url value='/resources/jquery.validation/1.14.0/messages_zh.js' />"></script>
	<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
	
	<script src="<c:url value='/resources/ztree/js/jquery.ztree.all.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-treeselect.js' />"></script>
	
	<script src="<c:url value='/develop/common/constants.js' />"></script>
	<script src="<c:url value='/uarp/pageview/public-button${online}.js' />"></script>
	<script src="<c:url value='/uarp/pageview/updateview-bootstrap${online}.js' />"></script>
	
	<c:if test="${type == 'updatemap'}">
		<script src="<c:url value='/resources/ol3/proj4.js' />"></script>
		<script src="<c:url value='/resources/ol3/ol.js' />"></script>
		<script src="<c:url value='/resources/ol3-ext/dist/ol3-ext.js' />"></script>
		<script src="<c:url value='/uarp/pageview/mapview-button${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/mapview-${mapType}-bootstrap${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/mapview-toolbar${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/mapview-toolbar-bootstrap${online}.js' />"></script>
	</c:if>
	
	<c:forEach items="${extend_js}" var="js" varStatus="status">
		<c:if test="${fn:indexOf(js,'/') > -1}">
			<script src="<c:url value='${js}' />"></script>
		</c:if>
		<c:if test="${fn:indexOf(js,'/') == -1}">
			<script src="<c:url value='/develop/${appname}/js/extend_${js}.js' />"></script>
		</c:if>
	</c:forEach>
</html>