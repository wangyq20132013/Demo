<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>${pageview}</title>
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-table.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/awesome/assets/font-awesome/css/font-awesome.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-datetimepicker.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/daterangepicker.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ol3/css/ol.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/ol3-ext/dist/ol3-ext.css'/>"></link>
		
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/jquery/jquery.steps.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/H-ui/Hui-iconfont/1.0.8/iconfont.css'/>" />
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/layer/2.4/skin/layer.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/style.css'/>" />
		
		<c:forEach items="${extend_css}" var="css" varStatus="status">
			<c:if test="${fn:indexOf(css,'/') > -1}">
				<link rel="stylesheet" type="text/css" href="<c:url value='${css}' />" />
			</c:if>
			<c:if test="${fn:indexOf(css,'/') == -1}">
				<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/extend_${css}.css' />"/>
			</c:if>
		</c:forEach>
		
		<style type="text/css">
			a{ text-decoration:none; color:#454545;}
			img{ border:none;}
			ul,p{ margin:0px; padding:0px; list-style:none;}
			.tucengkz{ z-index:1042;background:url(${pageContext.request.contextPath}/resources/commons/map/css/icons/tcctorlicon.png); width:38px; height:37px; position:absolute; top:10px; right:15px;}
			.tucengkongzhi{ position:absolute; right:0px; top:0px;}
			.tucengkongzhi ul{}
			.tucengkongzhi ul li{ float:left;  margin-left:24px; margin-top:30px;}
			.tucengkongzhi ul li img{ border:2px solid #dddddd;}
			.tucengkongzhi ul li img:hover{border:2px solid #09F;}
			.tucengkongzhi ul li img.active{border:2px solid #09F;}
			.ol-popup-content::-webkit-scrollbar { width: 10px; height: 10px; }
			.ol-popup-content::-webkit-scrollbar-button { background-color: #FF7677; display: none; }
			.ol-popup-content::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.15); }
			.ol-popup-content::-webkit-scrollbar-track-piece { background: rgba(255, 255, 255, .1); }
			.ol-popup-content::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
			.ol-popup-content::-webkit-scrollbar-corner { background: #82AFFF; }
			.ol-popup-content::-webkit-scrollbar-resizer { background: #FF0BEE; }
		</style>
		<!--<link rel="stylesheet" type="text/css" href="<c:url value='/resources/uarp/default/style.css'/>"></link>-->
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

	<body>

		<div class="panel-body">
			<c:import url="listview-bootstrap-button.jsp" />
			
			<c:import url="listview-bootstrap-query.jsp" />
			
			<c:if test="${type == 'maplist'}">
				<div id="mapview" class="col-xs-6">
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
				<div id="listview" class="col-xs-6">
					<div id="listInfo"></div>	
					<table id="table" class="table table-striped table-bordered table-hover"></table>
				</div>
			</c:if>
		</div>
		

		<div id="modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content" style="width: 100%;height:100%;">
					<div class="modal-header">
						<div class="modal-title col-sm-5"></div>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="modal-body" style="padding:0px;height: 100%;">
						<iframe id="modaliframe" style="width: 100%;height: 100%;border-radius: 5px;" frameborder="0" scrolling="no"></iframe>
					</div>
				</div>
			</div>
		</div>
		
		
		<div class="modal" id="importModal" tabindex="-1" role="dialog" aria-labelledby="importTitle" aria-hidden="true">
			<div class="modal-dialog" id="importdialog" style="height: 500px;width: 400px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
						<h4 class="modal-title" id="importTitle">
    				</h4>
					</div>
					<div class="modal-body" id="modalbody" style="padding-top: 10px;">
						<div id="wizard">
							<h1>上传文件</h1>
							<section>
								<form class="form-horizontal" id="shpform" style="display: none;">
									<p>请上传前缀名相同的三个文件</p>
									<div class="form-group">
										<label for="shpfile" class="col-sm-3 control-label">shp文件：</label>
										<div class="col-sm-9">
											<input type="file" id="shpfile" class="form-control required" name="files" accept=".shp">
										</div>
									</div>
									<div class="form-group">
										<label for="dbffile" class="col-sm-3 control-label">dbf文件：</label>
										<div class="col-sm-9">
											<input type="file" id="dbffile" name="files" class="form-control required" name="files" accept=".dbf">
										</div>
									</div>
									<div class="form-group">
										<label for="shxfile" class="col-sm-3 control-label">shx文件：</label>
										<div class="col-sm-9">
											<input type="file" id="shxfile" name="files" class="form-control required" name="files" accept=".shx">
										</div>
									</div>
								</form>
								<form class="form-horizontal" id="excelform" style="display: none;">
									<p>请上传excel文件</p>
									<div class="form-group">
										<label for="shpfile" class="col-sm-3 control-label">excel文件：</label>
										<div class="col-sm-9">
											<input type="file" id="excelfile" class="form-control required" name="files" accept=".xls,.xlsx">
										</div>
									</div>
								</form>

								<form class="form-horizontal" id="xmlform" style="display: none;">
									<p>请上传xml文件</p>
									<div class="form-group">
										<label for="shpfile" class="col-sm-3 control-label">xml文件：</label>
										<div class="col-sm-9">
											<input type="file" id="xmlfile" class="form-control required" name="files" accept=".xml">
										</div>
									</div>
								</form>
							</section>

							<h1>匹配字段</h1>
							<section style="overflow-y: auto;">
								<div class="form-group">
									<label class="col-sm-4 control-label" style="margin-top: 0.5em;">请选择导入方式：</label>
									<div class="col-sm-8">
										<select class="form-control" id="importType">
											<option value="0">增量导入</option>
											<option value="1">覆盖导入</option>
										</select>
									</div>
								</div>

								<table class="table table-bordered" style="margin-top: 40px">
									<thead>
										<tr>
											<td>
												数据表字段
											</td>
											<td>
												上传文件字段
											</td>
										</tr>
									</thead>
									<tbody id="columntbody">

									</tbody>
								</table>
							</section>

							<h1>导入成功</h1>
							<section id="thirdSection">
								正在进行导入，请稍等......
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>
		<iframe id="outputframe" height="0px;" name="outputframe" src="" style="visibility:hidden;border: 0px;"></iframe>
		
		<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
		<script src="<c:url value='/resources/jquery.validation/1.16.0/jquery.validate.min.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-table.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-table-zh-CN.js' />"></script>
		<script src="<c:url value='/resources/ol3/ol.js' />"></script>
		<script src="<c:url value='/resources/ol3-ext/dist/ol3-ext.js' />"></script>
		
		<script src="<c:url value='/resources/echarts/3.3.2/echarts.min.js'/>"></script>
		
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.zh-CN.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/moment.min.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/daterangepicker.js' />"></script>
		
		<script src="<c:url value='/resources/json/JsonExportExcel.min.js' />"></script>
		<script src="<c:url value='/resources/jquery/jquery.steps.min.js' />"></script>
		<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
		<script src="<c:url value='/uarp/pageview/public-button${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/listview-button${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/listview-query${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/maplist-bootstrap${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/basemap${online}.js' />"></script>
		
		<c:forEach items="${extend_js}" var="js" varStatus="status">
			<c:if test="${fn:indexOf(js,'/') > -1}">
				<script src="<c:url value='${js}' />"></script>
			</c:if>
			<c:if test="${fn:indexOf(js,'/') == -1}">
				<script src="<c:url value='/develop/${appname}/js/extend_${js}.js' />"></script>
			</c:if>
		</c:forEach>
		
		<jsp:include page="/WEB-INF/develop/${appname}/include_script.jsp" />
	</body>

</html>