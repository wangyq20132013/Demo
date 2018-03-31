<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>${name}</title>
<link href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value='/resources/bootstrap/css/bootstrap-table.css'/>"
	rel="stylesheet" type="text/css" />
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/onemap/css/main.css'/>" />
<link href="<c:url value='/resources/ol3/css/ol.css'/>" rel="stylesheet" />
<link href="<c:url value='/resources/querymap/css/default.css'/>"
	rel="stylesheet" type="text/css" />
<link href="<c:url value='/resources/ol3-ext/dist/ol3-ext.css'/>"
	rel="stylesheet" type="text/css" />
<link href="<c:url value='/resources/commons/ext/css/map.css'/>"
	rel="stylesheet" type="text/css" />
<link href="<c:url value='/resources/commons/ext/css/portalmap.css'/>"
	rel="stylesheet" type="text/css" />
<link href="<c:url value='/resources/commons/ext/css/control.css'/>"
	rel="stylesheet" type="text/css" />
<style>
body {
	font-family: '微软雅黑';
}

.ol-overview button:before {
	content: ''
}

.ol-overview.ol-collapsed button:before {
	content: ''
}

.ol-control button:focus, .ol-control button:hover {
	background-color: rgba(43, 55, 68, 0.8);
}

.modal-body img {
	width: 80%;
	margin: 10%;
}

.tucengkongzhi ul li {
	float: left;
	margin-left: 21px;
	margin-top: 25px;
}

a{color:#fff;}

</style>

<script src="<c:url value='/resources/jquery/jquery-1.11.3.min.js'/>"></script>
<script src="<c:url value='/resources/jquery.validation/1.14.0/jquery.validate.js' />"></script>
<script src="<c:url value='/resources/jquery.validation/1.14.0/validate-methods.js' />"></script>
<script src="<c:url value='/resources/jquery.validation/1.14.0/messages_zh.js' />"></script>
<script type="text/javascript">
	var ctx = '${pageContext.request.contextPath}';
	var datainterface = $.parseJSON('${datainterface[0]}');
	var mapData = $.parseJSON('${map[0]}');
	var charttable = $.parseJSON('${charttable}');
</script>
<script src="<c:url value='/resources/ol3/proj4.js'/>"></script>
<script src="<c:url value='/resources/ol3/ol.js'/>"></script>
<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js'/>"></script>
<script src="<c:url value='/resources/bootstrap/js/bootstrap-treeview.js'/>"></script>
<script src="<c:url value='/resources/bootstrap/js/bootstrap-slider.min.js'/>"></script>
<script src="<c:url value='/resources/bootstrap/js/bootstrap-table.js'/>"></script>
<script src="<c:url value='/resources/bootstrap/js/bootstrap-table-zh-CN.js'/>"></script>
<script src="<c:url value='/resources/echarts/js/echarts.js'/>"></script>
<script src="<c:url value='/resources/ol3-ext/dist/ol3-ext.js'/>"></script>
<script src="<c:url value='/uarp/pageview/query_mapview_bootstrap.js'/>"></script>
</head>
<body>
	<!--left-->
	<div class="titleleft" style="overflow: none;">
		<ul class="daohang">
			<li><i class="glyphicon glyphicon-globe"></i> <a href="#"
				style="cursor: default;">调查工程查询</a></li>
		</ul>

		<form role="form" id="queryForm">
			
		</form>

	</div>

	<!--map-->
	<div class="titlemiddle" id="mainmap">
		<div id="mapBar" class="map_tool hidden-print" style="right:50px;top:5px;">
			<div class="map_tool_bg" style="border-radius: 5px; opacity: 0.9;">
				<a title="最优" href="javascript:void(0);" id=""
					control="mapbar_control_qt" class="" onclick="mapBarControl(this);">
					<img
					src="<c:url value='/resources/commons/ext/images/map_icon_qt.png'/>" />
					<span style="float: right;"></span>
				</a> <a title="平移" href="javascript:void(0);" id=""
					control="toollist_control_py" class=""
					onclick="mapBarControl(this);"> <img
					src="<c:url value='/resources/commons/ext/images/map_icon_py.png'/>" />

				</a> <a title="放大" href="javascript:void(0);" id=""
					control="toollist_control_fd" class=""
					onclick="mapBarControl(this);"> <img
					src="<c:url value='/resources/commons/ext/images/map_icon_fd.png'/>" />

				</a> <a title="缩小" href="javascript:void(0);" id=""
					control="toollist_control_sx" class=""
					onclick="mapBarControl(this);"> <img
					src="<c:url value='/resources/commons/ext/images/map_icon_sx.png'/>" />

				</a> </a> <%-- <a title="点查" href="javascript:void(0);" id=""
					control="toollist_control_poi" class="turn-down"
					onclick="mapBarControl(this);"> <img
					src="<c:url value='/resources/commons/ext/images/map_icon_ck.png'/>" />

				</a> --%>
			</div>
		</div>
		<div class="toolBg hidden-print" style="display: none;">
			<div class="toolContent" id="map_toollist">
				<a href="javascript:void(0);" id="" control="print" class=""
					onclick="mapPrint(this);"> <i class="fa fa-print"></i>打印地图
				</a> <a href="javascript:void(0);" id="mapJpg" control="img" class=""
					onclick="mapPrint(this);"> <i class="fa fa-image"></i>导出图片
				</a> <a href="javascript:void(0);" id="" control="word" class=""
					onclick="mapPrint(this);"> <i class="fa fa-file-word-o"></i>导出报告
				</a>
			</div>
		</div>
		<div id="location"></div>
		<div id="mapToolBar"></div>

		<div id="popup" class="ol-popup"
			style="position: absolute; width: 300px; height: 200px;">
			<div id="pop_title" class="pop_title"></div>
			<a href="#" id="pop_closer" class="ol-pop_closer"></a>
			<div id="pop_content" class="pop_content"
				style="height: 168px; overflow-y: auto;"></div>
		</div>
	</div>
	<div class="tucengkz hidden-print">
		<div class="tucengkongzhi">
			<p style="text-align: right;">
				<img title="地图切换"
					src="<c:url value='/resources/commons/map/css/icons/switchmapon.png'/>"
					id="SwitchMapOnOff" />
			</p>
			<ul id="switchmapwrapper">

			</ul>
		</div>
	</div>
	

	<div id="titlebottom">
		<ul class="nav nav-pills" style="width:99.2%;background: #46B9C2;border-radius: 4px;">
			<!-- <li role="presentation" class="active"><a href="#table" data-toggle="tab">统计图</a></li>
			<li role="presentation"><a href="#chart" data-toggle="tab">统计表</a></li>
			<li role="presentation"><a href="#messages" data-toggle="tab">啊啊啊</a></li> -->
		</ul>
		<div id="tabContent" class="tab-content">
			<i id="up_down_btn" class="glyphicon glyphicon-chevron-down" title="隐藏"></i>
		
			<!-- <div class="tab-pane fade in active" id="chart">
				xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
			</div>
			<div class="tab-pane fade" id="table">
				xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
			</div>
			<div class="tab-pane fade" id="messages">
				xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
			</div> -->
		</div>
	</div>
	<!--详细信息弹出框-->
	<div id="modal_info" class="modal fade">
		<div class="modal-dialog">
			<div id="" class="modal-content">
				<div id="" class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true" style="color: black">&times;</span>
					</button>
					<h4 class="modal-title">详细信息</h4>
				</div>
				<div id="modal_info_body" class="modal-body">
					<table class="table">
						<caption>详细信息列表</caption>
						<tbody>
							<!-- <tr>
								<td>Tanmay</td>
								<td>Bangalore</td>
							</tr>
							<tr>
								<td>Sachin</td>
								<td>Mumbai</td>
							</tr> -->
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<!--图层控制、图例-->
	<div id="Capabilities" class="panel panel-primary">
		<div id="legends" class="panel-body">
			<ul>
				<%-- <li><input type="checkbox" name="a" value="a"><img src="<c:url value='/resources/querymap/img/legend/zlgc_2012.png'/>"></li>
				<li><input type="checkbox" name="b" value="b"><img src="<c:url value='/resources/querymap/img/legend/zlgc_2012.png'/>"></li>
				<li><input type="checkbox" name="c" value="c"><img src="<c:url value='/resources/querymap/img/legend/zlgc_2012.png'/>"></li> --%>
			</ul>
		</div>
		<i id="hide_legend" class="glyphicon glyphicon-remove" title="隐藏"></i>
	</div>
	<!--图层图例控制按钮-->
	<div id="tctl_div" class="hidden-print">
		<span style="color:black;" class="glyphicon glyphicon-tasks" title="图层图例"></span>
	</div>
</body>

</html>