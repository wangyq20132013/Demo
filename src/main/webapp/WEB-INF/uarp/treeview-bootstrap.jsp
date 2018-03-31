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

		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/jquery/jquery.steps.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/H-ui/Hui-iconfont/1.0.8/iconfont.css'/>" />
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/layer/2.4/skin/layer.css'/>"></link>
		<!-- 兼容已有模块 -->
		<c:if test="${type == 'treemap'}">
		<link rel="stylesheet" type="text/css" href="<c:url value='/uarp/pageview/css/mapview-bootstrap.css'/>" />
		</c:if>
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
			html,body{
				overflow: hidden;
			}
			#tree li span{
				font-size: 15px;
			}
			.mapview{
				padding: 0px;
			}
		</style>
		<style type="text/css">
			a{ text-decoration:none; color:#454545;}
			img{ border:none;}
			ul,p{ margin:0px; padding:0px; list-style:none;}
			.tucengkz{ z-index:1042;width:38px; height:37px; position:absolute; top:10px; right:15px;}
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
		<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
			var name = '${name}';
			var appname = '${appname}';
			var type = '${type}';
			var previewid = '${pageviewid}';
			var theme = '${theme}';
			var params = ${empty params?"{}":params};
			var userArea = ${empty userarea?"{}":userarea};
			var dataset = ${empty dataset?"{}":dataset};
			var query = ${empty query?"{}":query};
		</script>
		<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
	</head>

	<body>
		<div id="treepanel" class="panel panel-default" style="width: 300px;height: inherit;float: left;">
			<div class="panel-heading">
				<div id="treetitle" class="panel-header"></div>
			</div>  
			<div class="panel-body" style="height: calc(100% - 40px);overflow: auto;">
				<div class="input-group"  >
			      <input type="text" class="form-control" id="searchInput" placeholder="输入名称进行查询">
			      <span class="input-group-btn">
			        <button class="btn btn-default" type="button" onclick="searchTree()"><img src="${pageContext.request.contextPath}/resources/onemap/img/btn_find.png" ></button>
			      </span>
			    </div>
				<ul id="tree" class="ztree" style="margin-top: 5px;height:calc(100% - 39px);overflow-y: overlay"></ul>
			</div>
			<div id="tree_context-menu">
				<ul class="dropdown-menu" role="menu">
					<c:forEach items="${dataset.treeview[0].treecontextMenu}" var="btn" varStatus="status">
						<li>
							<a href="#" onclick="${btn.clickevent}"><span class="${btn.iconClass}"></span>&nbsp;${btn.name}</a>
						</li>
					</c:forEach>
				</ul>
			</div>
			<div id="blank_context-menu">
				<ul class="dropdown-menu" role="menu">
					<c:forEach items="${dataset.treeview[0].treecontextMenu}" var="btn" varStatus="status">
						<c:if test="${empty btn.blackhidden || btn.blackhidden == 'false'}">
							<li><a href="#" onclick="${btn.clickevent}"><span class="${btn.iconClass}"></span>&nbsp;${btn.name}</a></li>
						</c:if>
					</c:forEach>
				</ul>
			</div>
		</div>
		<c:if test="${type == 'treeview'}">
			<div id="pagepanel" class="panel" style="height: 100%;width:calc(100% - 300px);float:left;">
				<c:forEach items="${formpage}" var="page" varStatus="status">
					<c:if test="${page.type == 'develop'}">
						<c:import url="../${page.type}/${appname}/${page.name}.jsp" />
					</c:if>
				</c:forEach>
			</div>
		</c:if>
		
		<c:if test="${type == 'treetree'}">
			<div id="treepanel" class="panel panel-default" style="height: 100%;width:calc(100% - 300px);float:left;">
				<div class="panel-heading">
					<div id="treetitle" class="panel-header">dsa</div>
				</div>  
				<div class="panel-body" style="overflow: auto;">
					<div class="input-group"  >
				      <input type="text" class="form-control" id="searchInput" placeholder="输入名称进行查询">
				      <span class="input-group-btn">
				        <button class="btn btn-default" type="button" onclick="searchTree()"><img src="${pageContext.request.contextPath}/resources/onemap/img/btn_find.png" ></button>
				      </span>
				    </div>
					<ul id="tree2" class="ztree" style="margin-top: 5px;height:calc(100% - 39px);overflow-y: overlay"></ul>
				</div>
				<div id="tree_context-menu" style="z-index: 999;">
					<ul class="dropdown-menu" role="menu">
						<c:forEach items="${dataset.treeview[0].treecontextMenu}" var="btn" varStatus="status">
							<li>
								<a href="#" onclick="${btn.clickevent}"><span class="${btn.iconClass}"></span>&nbsp;${btn.name}</a>
							</li>
						</c:forEach>
					</ul>
				</div>
				<div id="blank_context-menu">
					<ul class="dropdown-menu" role="menu">
						<c:forEach items="${dataset.treeview[0].treecontextMenu}" var="btn" varStatus="status">
							<c:if test="${empty btn.blackhidden || btn.blackhidden == 'false'}">
								<li><a href="#" onclick="${btn.clickevent}"><span class="${btn.iconClass}"></span>&nbsp;${btn.name}</a></li>
							</c:if>
						</c:forEach>
					</ul>
				</div>
			</div>
		</c:if>
	
		<c:if test="${type == 'treemap'}">
			<div id="mappanel" class="panel" style="height: 100%;width:calc(100% - 300px);float:left;">
				<div class="panel-body" style="padding: 0px 0px 0px 0px;">
					<c:if test="${!empty button}">
					<c:if test="${fn:length(button) != 0}">
					<div id="opt" class="col-xs-12 text-left panel-group">
						<c:forEach items="${button}" var="btn" varStatus="status">
							<c:choose>
								<c:when test="${fn:length(button) <= '6'}">
									<button type="button" class="btn btn-primary " id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}">
													<i class="${btn.icon}"></i>&nbsp;&nbsp;${btn.title}
												</button>
								</c:when>
								<c:otherwise>
									<c:choose>
										<c:when test="${status.index < '6'}">
											<button type="button" class="btn btn-primary " id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}">
														<span class="${btn.icon}" aria-hidden="true"></span>&nbsp;&nbsp;${btn.title}
													</button>
										</c:when>
										<c:when test="${status.index == '6'}">
											<div class="btn-group">
												<button type="button" class="btn btn-primary  dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
												    	&nbsp;&nbsp;更多&nbsp;&nbsp;<span class="caret"></span>
												    	<span class="sr-only"></span>
												 			</button>
												<ul class="dropdown-menu" role="menu">
													<li>
														<a id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}"><i class="${btn.icon}"></i>&nbsp;${btn.title}</a>
													</li>
										</c:when>
										<c:when test="${status.index >'6' && status.index < fn:length(button)-1 }">
											<li>
												<a id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}"><i class="${btn.icon}"></i>&nbsp;${btn.title}</a>
											</li>
										</c:when>
										<c:otherwise>
												<li>
													<a id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}"><i class="${btn.icon}"></i>&nbsp;${btn.title}</a>
												</li>
											</ul>
											</div>
										</c:otherwise>
									</c:choose>
								</c:otherwise>
							</c:choose>
						</c:forEach>
					</div>
					</c:if>
				</c:if>
				<c:if test="${!empty query}">
				<c:if test="${fn:length(query) != 0}">
				<div id="query" class="col-xs-12 text-right panel-group">
					<form class="form-inline" role="form" id="queryForm">
						<c:forEach items="${query}" var="region" varStatus="status">
							<div class="form-group" style="padding: 3px;">
								<c:if test="${region.type == 'hidden'}">
										<input type="hidden" class="form-control" id="text${region.id}" value="${region.value}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" list="list_${region.id}" onkeydown="${region.onkeydown}" style="${region.style}" querydataset="${region.querydataset}" />
										<datalist id="list_${region.id}"></datalist>
								</c:if>
								<c:if test="${region.type == 'text'}">
									<label class="control-label">${region.title}:</label>
									<div class="input-group">
										<input type="text" class="form-control" id="text${region.id}" value="${region.value}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" isfuzzy="${region.isfuzzy}" list="list_${region.id}" onkeydown="${region.onkeydown}" style="${region.style}" querydataset="${region.querydataset}" />
										<datalist id="list_${region.id}"></datalist>
									</div>
								</c:if>
								<c:if test="${region.type == 'select'}">
									<label class="control-label">${region.title}:</label>
									<div class="input-group">
										<select class="form-control" id="sel${region.id}" value="${region.value}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" onchange="${region.onchange}" style="min-width: 80px;${region.style}" querydataset="${region.querydataset}">
											<c:if test="${empty region.isSelected || region.isSelected == true}">
												<option value="">--请选择--</option>
											</c:if>
										</select>
									</div>
								</c:if>
								<c:if test="${region.type == 'date'}">
									<label class="control-label">${region.title}:</label>
									<div id="date${region.id}" type="${region.type}" class="input-group date" style="width:120px;">
										<input type="text" class="form-control" name="${region.name}" value="${region.value}"/>
									</div>
								</c:if>
								<c:if test="${region.type == 'datetime'}">
									<label class="control-label">${region.title}:</label>
									<div id="date${region.id}" type="${region.type}" class="input-group date" style="width:180px;">
										<input type="text" class="form-control" name="${region.name}" value="${region.value}" />
									</div>
								</c:if>
								<c:if test="${region.type == 'doubledate'}">
									<label class="control-label">${region.title}:</label>
									<div id="date${region.id}" type="${region.type}" class="input-group date" style="width:200px;">
										<input type="text" class="form-control" name="startstopdate" value="${region.value}"/>
									</div>
								</c:if>
								<c:if test="${region.type == 'year'}">
									<label class="control-label">${region.title}:</label>
									<div id="date${region.id}" type="${region.type}" class="input-group date" style="width:70px;">
										<input type="text" class="form-control" name="${region.name}" value="${region.value}" size="16"/>
									</div>
								</c:if>
	
							</div>
						</c:forEach>
						<c:if test="${fn:length(query) > '0'}">
							<button type="button" id="querybtn" class="btn btn-success"  data-loading-text='<span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索..' style="width: 90px;">
							<span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索
						</button>
						<button type="button" id="resetbtn" class="btn btn-default" onclick="resetForm()">
							 <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>重置
						</button>
						</c:if>
					</form>
				</div>
				</c:if>
				</c:if>
					<div id="map" class="col-xs-12 mapview">
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
						<div id="timeline" style="display: none;position: absolute;z-index:99;width: 60%;left: 20%; height: 80px;margin: 0;bottom: 100px;" >
							<ul id="dates"></ul>
							<ul id="issues" style="height: 0px;"></ul>
						</div>
					</div>
				</div>
			</div>
		</c:if>
		<c:if test="${type == 'treelist'}">
			<div id="listpanel" class="panel panel-primary " style="height: 100%;width:calc(100% - 300px);float:left;">
				<div class="panel-body">
					<c:if test="${!empty button}">
					<c:if test="${fn:length(button) != 0}">
					<div id="opt" class="col-xs-12 text-left panel-group">
						<c:forEach items="${button}" var="btn" varStatus="status">
							<c:choose>
								<c:when test="${fn:length(button) <= '6'}">
									<button type="button" class="btn btn-primary " id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}">
													<i class="${btn.icon}"></i>&nbsp;&nbsp;${btn.title}
												</button>
								</c:when>
								<c:otherwise>
									<c:choose>
										<c:when test="${status.index < '6'}">
											<button type="button" class="btn btn-primary " id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}">
														<span class="${btn.icon}" aria-hidden="true"></span>&nbsp;&nbsp;${btn.title}
													</button>
										</c:when>
										<c:when test="${status.index == '6'}">
											<div class="btn-group">
												<button type="button" class="btn btn-primary  dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
												    	&nbsp;&nbsp;更多&nbsp;&nbsp;<span class="caret"></span>
												    	<span class="sr-only"></span>
												 			</button>
												<ul class="dropdown-menu" role="menu">
													<li>
														<a id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}"><i class="${btn.icon}"></i>&nbsp;${btn.title}</a>
													</li>
										</c:when>
										<c:when test="${status.index >'6' && status.index < fn:length(button)-1 }">
											<li>
												<a id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}"><i class="${btn.icon}"></i>&nbsp;${btn.title}</a>
											</li>
										</c:when>
										<c:otherwise>
												<li>
													<a id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}"><i class="${btn.icon}"></i>&nbsp;${btn.title}</a>
												</li>
											</ul>
											</div>
										</c:otherwise>
									</c:choose>
								</c:otherwise>
							</c:choose>
						</c:forEach>
					</div>
					</c:if>
				</c:if>
				<c:if test="${!empty query}">
				<c:if test="${fn:length(query) != 0}">
				<div id="query" class="col-xs-12 text-right panel-group">
					<form class="form-inline" role="form" id="queryForm">
						<c:forEach items="${query}" var="region" varStatus="status">
							<div class="form-group" style="padding: 3px;">
								<c:if test="${region.type == 'hidden'}">
										<input type="hidden" class="form-control" id="text${region.id}" value="${region.value}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" list="list_${region.id}" onkeydown="${region.onkeydown}" style="${region.style}" querydataset="${region.querydataset}" />
										<datalist id="list_${region.id}"></datalist>
								</c:if>
								<c:if test="${region.type == 'text'}">
									<label class="control-label">${region.title}:</label>
									<div class="input-group">
										<input type="text" class="form-control" id="text${region.id}" value="${region.value}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" isfuzzy="${region.isfuzzy}" list="list_${region.id}" onkeydown="${region.onkeydown}" style="${region.style}" querydataset="${region.querydataset}" />
										<datalist id="list_${region.id}"></datalist>
									</div>
								</c:if>
								<c:if test="${region.type == 'select'}">
									<label class="control-label">${region.title}:</label>
									<div class="input-group">
										<select class="form-control" id="sel${region.id}" value="${region.value}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" onchange="${region.onchange}" style="min-width: 80px;${region.style}" querydataset="${region.querydataset}">
											<c:if test="${empty region.isSelected || region.isSelected == true}">
												<option value="">--请选择--</option>
											</c:if>
										</select>
									</div>
								</c:if>
								<c:if test="${region.type == 'date'}">
									<label class="control-label">${region.title}:</label>
									<div id="date${region.id}" type="${region.type}" class="input-group date" style="width:120px;">
										<input type="text" class="form-control" name="${region.name}" value="${region.value}"/>
									</div>
								</c:if>
								<c:if test="${region.type == 'datetime'}">
									<label class="control-label">${region.title}:</label>
									<div id="date${region.id}" type="${region.type}" class="input-group date" style="width:180px;">
										<input type="text" class="form-control" name="${region.name}" value="${region.value}" />
									</div>
								</c:if>
								<c:if test="${region.type == 'doubledate'}">
									<label class="control-label">${region.title}:</label>
									<div id="date${region.id}" type="${region.type}" class="input-group date" style="width:200px;">
										<input type="text" class="form-control" name="startstopdate" value="${region.value}"/>
									</div>
								</c:if>
								<c:if test="${region.type == 'year'}">
									<label class="control-label">${region.title}:</label>
									<div id="date${region.id}" type="${region.type}" class="input-group date" style="width:70px;">
										<input type="text" class="form-control" name="${region.name}" value="${region.value}" size="16"/>
									</div>
								</c:if>
	
							</div>
						</c:forEach>
						<c:if test="${fn:length(query) > '0'}">
							<button type="button" id="querybtn" class="btn btn-success"  data-loading-text='<span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索..' style="width: 90px;">
							<span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索
						</button>
						<button type="button" id="resetbtn" class="btn btn-default" onclick="resetForm()">
							 <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>重置
						</button>
						</c:if>
					</form>
				</div>
				</c:if>
				</c:if>
					<table id="table"></table>
				</div>
			</div>
		</c:if>
		
		<div id="modal" class="modal fade bs-example-modal-lg" tabindex="1000" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
	</body>
	
	<iframe id="outputframe" height="0px;" name="outputframe" src="" style="visibility:hidden;border: 0px;"></iframe>


	<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
	
	<script src="<c:url value='/resources/ztree/js/jquery.ztree.all.min.js' />"></script>
	
	<script src="<c:url value='/resources/echarts/3.3.2/echarts.min.js' />"></script>
	<script src="<c:url value='/resources/echarts/3.3.2/extenion/olCoordSys.js' />"></script>
	<script src="<c:url value='/resources/echarts/3.3.2/extenion/olmap.js' />"></script>
	<script src="<c:url value='/resources/echarts/3.3.2/extenion/olModel.js' />"></script>
	<script src="<c:url value='/resources/echarts/3.3.2/extenion/olView.js' />"></script>
	
	
	<script src="<c:url value='/resources/json/JsonExportExcel.min.js' />"></script>
	<script src="<c:url value='/resources/jquery/jquery.steps.min.js' />"></script>
	<script src="<c:url value='/develop/common/constants.js' />"></script>
	<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
	<script src="<c:url value='/uarp/pageview/public-button${online}.js' />"></script>
	<script src="<c:url value='/uarp/pageview/treeview-button.js' />"></script>
	<script src="<c:url value='/uarp/pageview/treeview-bootstrap${online}.js' />"></script>
	
	<c:if test="${type == 'treelist'}">
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-table.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-table-zh-CN.js' />"></script>
		<script src="<c:url value='/uarp/pageview/listview-button${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/listview-bootstrap${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/listview-query${online}.js' />"></script>
	</c:if>
	<c:if test="${type == 'treemap'}">
		<script src="<c:url value='/resources/ol3/ol.js' />"></script>
		<script src="<c:url value='/resources/ol3-ext/dist/ol3-ext.js' />"></script>
		<script src="<c:url value='/uarp/pageview/mapview-${mapType}-bootstrap.js' />"></script>
		<script src="<c:url value='/uarp/pageview/mapview-button.js' />"></script>
		<script src="<c:url value='/uarp/pageview/mapview-toolbar.js' />"></script>
		<script src="<c:url value='/uarp/pageview/mapview-toolbar-bootstrap.js' />"></script>
		<script src="<c:url value='/uarp/pageview/mapview-extends.js' />"></script>
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