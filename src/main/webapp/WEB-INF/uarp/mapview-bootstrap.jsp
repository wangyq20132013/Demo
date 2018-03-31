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
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-treeselect.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-select.min.css'/>"></link>

		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/awesome/assets/font-awesome/css/font-awesome.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ol3/css/ol.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ol3-ext/dist/ol3-ext.css'/>"></link>

		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/jquery/jquery.steps.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/layer/2.4/skin/layer.css'/>"></link>
		
		<link rel="stylesheet" type="text/css" href="<c:url value='/uarp/pageview/css/mapview-bootstrap.css'/>" />
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
			var type = '${type}';
			var mapType = '${mapType}';
			var previewid = '${pageviewid}';
			var theme = '${theme}';
			var params = ${empty params ? "{}" : params};
			var userArea = ${empty userarea ? "{}" : userarea};
			var dataset = ${empty dataset ? "{}" : dataset};
		</script>
	</head>

	<body>
		<c:if test="${type == 'mapview'}">
			<div id="mapview" class="mapview">
				<div id="map" class="map onemap" style="background-color:rgb(218, 245, 253);background-image:url('${pageContext.request.contextPath}/uarp/pageview/image/blankimg_zh.png')">
					<div id="echart-overlay"></div>
				</div>
				<div class="tucengkz hidden-print">
						<div class="tucengkongzhi">
							<p style="text-align: right;">
								<img title="地图切换" src="${pageContext.request.contextPath}/resources/commons/map/css/icons/switchmapon.png" id="SwitchMapOnOff" />
							</p>
							<ul id="switchmapwrapper" style="background: url(${pageContext.request.contextPath}/resources/commons/map/css/icons/tckzbg.png); display: none; width: 230px; height: 129px; border-radius: 5px;">
								<li style="text-align: center;" datatype="baselayer_vector">
									<a href="javascript:void(0);"><img src="${pageContext.request.contextPath}/resources/commons/map/css/icons/ditu.png" /></a><br />矢量地图</li>
								<li style="text-align: center;" datatype="baselayer_satellite">
									<a href="javascript:void(0);"><img src="${pageContext.request.contextPath}/resources/commons/map/css/icons/yingxiang.png" /></a><br />影像地图</li>
							</ul>
						</div>
					</div>
					<div id="popup" class="ol-popup" style="position: absolute; width: 300px; height: 200px;">
						<div id="pop_title" class="pop_title"></div>
						<a href="#" id="pop_closer" class="ol-pop_closer"></a>
						<div id="pop_content" class="pop_content" style="height: 168px; overflow-y: auto;"></div>
					</div>
			</div>

		</c:if>
		
		<c:forEach items="${formpage}" var="page" varStatus="status">
			<c:if test="${page.type == 'develop'}">
				<c:import url="../${page.type}/${appname}/${page.name}.jsp" />
			</c:if>
		</c:forEach>
		
		<div id="modal" class="modal fade bs-example-modal-lg" tabindex="1000" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content" style="width: 100%;height:100%;">
					<div class="modal-header">
						<div class="modal-title col-sm-5"></div>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="modal-body" style="padding:0px;height: calc(100% - 50px);">
						<iframe id="modaliframe" style="width: 100%;height: 100%;border-radius: 5px;" frameborder="0" scrolling="no"></iframe>
					</div>
				</div>
			</div>
		</div>
		<iframe id="outputframe" height="0px;" name="outputframe" src="" style="visibility:hidden;border: 0px;"></iframe>
	</body>

	
	
	<script src="<c:url value='/resources/jquery/jquery-1.11.3.min.js'/>"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
	<script src="<c:url value='/resources/ztree/js/jquery.ztree.all.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-treeselect.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-table.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-table-zh-CN.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-table-export.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-paginator.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-select.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.zh-CN.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/moment.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/daterangepicker.js' />"></script>
	<script src="<c:url value='/resources/json/JsonExportExcel.min.js' />"></script>
	<script src="<c:url value='/resources/jquery/jquery.steps.min.js' />"></script>
	<script src="<c:url value='/resources/html2canvas/dist/html2canvas.js' />"></script>
	<script src="<c:url value='/resources/commons/ext/js/jQuery.print.js' />"></script>
	
	<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
	<script src="<c:url value='/resources/echarts/3.3.2/echarts.min.js' />"></script>
	<script src="<c:url value='/resources/echarts/3.3.2/extenion/olCoordSys.js' />"></script>
	<script src="<c:url value='/resources/echarts/3.3.2/extenion/olmap.js' />"></script>
	<script src="<c:url value='/resources/echarts/3.3.2/extenion/olModel.js' />"></script>
	<script src="<c:url value='/resources/echarts/3.3.2/extenion/olView.js' />"></script>
	<script src="<c:url value='/resources/arc/arc.js' />"></script>
	<script src="<c:url value='/resources/ol3/ol.js' />"></script>
	<script src="<c:url value='/resources/ol3-ext/dist/ol3-ext.js' />"></script>
	<script src="<c:url value='/resources/ol3-ext/dist/swipecontrol.js' />"></script>
	<script src="<c:url value='/resources/ol3/proj4.js' />"></script>
	
	
	
	<script src="<c:url value='/develop/common/constants.js' />"></script>
	<script src="<c:url value='/uarp/pageview/public-button${online}.js' />"></script>
	<script src="<c:url value='/uarp/pageview/mapview-${mapType}-bootstrap${online}.js' />"></script>
	<script src="<c:url value='/uarp/pageview/mapview-button${online}.js' />"></script>
	<script src="<c:url value='/uarp/pageview/mapview-toolbar${online}.js' />"></script>
	<script src="<c:url value='/uarp/pageview/mapview-toolbar-bootstrap${online}.js' />"></script>
	<script src="<c:url value='/uarp/pageview/mapview-extends${online}.js' />"></script>
	
	
	<c:forEach items="${extend_js}" var="js" varStatus="status">
		<c:if test="${fn:indexOf(js,'/') > -1}">
			<script src="<c:url value='${js}' />"></script>
		</c:if>
		<c:if test="${fn:indexOf(js,'/') == -1}">
			<script src="<c:url value='/develop/${appname}/js/extend_${js}.js' />"></script>
		</c:if>
	</c:forEach>
</html>