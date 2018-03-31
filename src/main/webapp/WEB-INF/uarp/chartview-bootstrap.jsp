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
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap-datetimepicker.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/daterangepicker.css'/>"></link>
		
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
		
		<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
			var name = '${name}';
			var appname = '${appname}';
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
			<c:if test="${!empty button}">
			<c:if test="${fn:length(button) != 0}">
			<div id="opt" class="col-xs-12 text-left panel-group">
				<c:forEach items="${button}" var="btn" varStatus="status">
					<c:choose>
						<c:when test="${fn:length(button) <= '6'}">
							<button type="button" class="btn btn-success" id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}">
											<i class="${btn.icon}"></i>&nbsp;&nbsp;${btn.title}
										</button>
						</c:when>
						<c:otherwise>
							<c:choose>
								<c:when test="${status.index < '6'}">
									<button type="button" class="btn btn-success" id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}">
												<span class="${btn.icon}" aria-hidden="true"></span>&nbsp;&nbsp;${btn.title}
											</button>
								</c:when>
								<c:when test="${status.index == '6'}">
									<div class="btn-group">
										<button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
										    	&nbsp;&nbsp;更多&nbsp;&nbsp;<span class="caret"></span>
										    	<span class="sr-only"></span>
										 			</button>
										<ul class="dropdown-menu" role="menu">
											<li>
												<a href="#" id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}"><i class="${btn.icon}"></i>&nbsp;${btn.title}</a>
											</li>
								</c:when>
								<c:when test="${status.index > '6'}">
									<li>
										<a href="#" id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}"><i class="${btn.icon}"></i>&nbsp;${btn.title}</a>
									</li>
								</c:when>
								
							</c:choose>
							<c:choose>
								<c:when test="${status.index >= '6' && status.index == fn:length(button)-1 }">
									</ul>
									</div>
								</c:when>
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
									<input type="text" class="form-control" id="text${region.id}" value="${region.value}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" isfuzzy="${region.isfuzzy}" list="list_${region.id}" onkeydown="${region.onkeydown}" onblur="${region.onblur}" style="${region.style}" querydataset="${region.querydataset}" />
									<datalist id="list_${region.id}"></datalist>
								</div>
							</c:if>
							<c:if test="${region.type == 'select'}">
								<label class="control-label">${region.title}:</label>
								<div class="input-group">
									<select class="form-control" id="sel${region.id}" value="${region.value}" name="${region.name}" data-type="${region.type}" dataset="${region.datainterface}" initdata="${region.initdata}" onchange="${region.onchange}" style="min-width: 80px;${region.style}" querydataset="${region.querydataset}">
										<c:if test="${empty region.isSelected || region.isSelected == 'true'}">
											<option value="">--请选择--</option>
										</c:if>
									</select>
								</div>
							</c:if>
							<c:if test="${region.type == 'liveselect'}">
								<label class="control-label">${region.title}:</label>
								<div class="input-group">
									<select class="form-control" id="sel${region.id}" value="${region.value}" name="${region.name}" min-width="0" data-live-search="true" data-size="10" data-width="auto" data-type="${region.type}" dataset="${region.datainterface}" initdata="${region.initdata}" onchange="${region.onchange}" style="min-width: 80px;${region.style}" querydataset="${region.querydataset}">
										<c:if test="${empty region.isSelected || region.isSelected == 'true'}">
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
									<input type="text" class="form-control" id="startstopdate" name="startstopdate" value="${region.value}"/>
								</div>
							</c:if>
							<c:if test="${region.type == 'year'}">
								<label class="control-label">${region.title}:</label>
								<div id="date${region.id}" type="${region.type}" class="input-group date" style="width:70px;">
									<input type="text" class="form-control" name="${region.name}" value="${region.value}" onchange="${region.onchange}"  size="16"/>
								</div>
							</c:if>
							<c:if test="${region.type == 'month'}">
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
			
			<div id="echartsview" class="col-xs-12 col-lg-12">
				<div class="wrapper">
					<div id="sample"></div>
				</div>
			</div>
			<div id="listview" class="col-xs-12 col-lg-12">
				<table id="table" class="table table-striped table-bordered table-hover"></table>
			</div>
			
		</div>
		<iframe id="outputframe" height="0px;" name="outputframe" src="" style="visibility:hidden;border: 0px;"></iframe>
		
		<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
		<script src="<c:url value='/resources/jquery.validation/1.16.0/jquery.validate.min.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-table.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-table-zh-CN.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.zh-CN.js' />"></script>
		<script src="<c:url value='/resources/echarts/3.3.2/echarts.min.js'/>"></script>
		
		<script src="<c:url value='/resources/bootstrap/js/moment.min.js' />"></script>
		<script src="<c:url value='/resources/bootstrap/js/daterangepicker.js' />"></script>
		
		<script src="<c:url value='/resources/json/JsonExportExcel.min.js' />"></script>
		<script src="<c:url value='/resources/jquery/jquery.steps.min.js' />"></script>
		<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
		<script src="<c:url value='/uarp/pageview/public-button${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/echartview-bootstrap${online}.js' />"></script>
		<script src="<c:url value='/uarp/pageview/listview-button${online}.js' />"></script>
		
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