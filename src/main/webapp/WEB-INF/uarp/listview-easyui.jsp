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
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/easyui/themes/default/easyui.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/easyui/themes/icon.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/jquery/jquery.steps.css'/>"></link>
		<%-- <link rel="stylesheet" type="text/css" href="<c:url value='/resources/H-ui/Hui-iconfont/1.0.8/iconfont.css'/>" /> --%>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/layer/2.4/skin/layer.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/uarp/default/listview-easyui.css'/>"></link>
		
		<script type="text/javascript">
		var cxt = '${pageContext.request.contextPath}';
		var name = '${name}';
		var appname = '${appname}';
		var previewid = '${pageviewid}';
		var theme = '${theme}';
		var dataset = '${datainterface[0].name}';
		var metadata = '${datainterface[0].metadata}';
		var exceldata = '${datainterface[0].excel}';
		var params = '${params}';
		var userarea = '${userarea}';
		</script>
	</head>

	<body>
		<div class="easyui-panel" title="${pageview}">
			<div id="text" data-options="region: 'north', border: false" style="height:30px;width:98%;padding: 5px;float: left;">
				<form id="queryForm">
					<c:forEach items="${datainterface[0].query}" var="region" varStatus="status">
						<label class="control-label">${region.title}:</label>

						<c:if test="${region.type == 'text'}">
							<input type="text" class="easyui-validatebox" id="text${region.id}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" list="list_${region.id}" onkeydown="${region.onkeydown}"/>
							<datalist id="list_${region.id}"></datalist>
						</c:if>
						<c:if test="${region.type == 'select'}">
							<select class="form-control" id="sel${region.id}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" onchange="${region.onchange}">
								<option value="">--请选择--</option>
							</select>
						</c:if>
						<c:if test="${region.type == 'date'}">
							<input type="${region.type}" class="easyui-validatebox" id="text${region.id}" name="${region.name}"/>
						</c:if>
						<c:if test="${region.type == 'datetime'}">
							<input type="${region.type}" class="easyui-validatebox" id="text${region.id}" name="${region.name}" />
						</c:if>
					</c:forEach>
					<a href="javascript:void(0)" id="query" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="query()">搜索&nbsp;&nbsp;&nbsp;&nbsp;</a>
					<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="reset()">清空&nbsp;&nbsp;&nbsp;&nbsp;</a>

					<div id="bt" style="height:30px;;float: right;">
						<c:forEach items="${button}" var="btn" varStatus="status">
							<c:choose>
								<c:when test="${fn:length(button) <= '4'}">
									<a href="javascript:void(0)" id="${btn.id}" name="${btn.name}" class="easyui-linkbutton" data-options="iconCls:'${btn.icon}',plain:true" onclick="${btn.clickevent}">${btn.title}</a>
								</c:when>
								<c:otherwise>
									<c:choose>
										<c:when test="${status.index < '4'}">
											<a href="javascript:void(0)" id="${btn.id}" name="${btn.name}" class="easyui-linkbutton" data-options="iconCls:'${btn.icon}',plain:true" onclick="${btn.clickevent}">${btn.title}</a>
										</c:when>
										<c:when test="${status.index == '4'}">
											<a href="javascript:void(0)" class="easyui-splitbutton" data-options="menu:'#mm'">更多</a>  
											<div id="mm" style="width:100px;">
												<div data-options="iconCls:'${btn.icon}'" class="menu-sep" id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}">${btn.title}</div>
										</c:when>
										<c:when test="${status.index >'4' && status.index < fn:length(button)-1 }">
											<div data-options="iconCls:'${btn.icon}'" class="menu-sep" id="${btn.id}" name="${btn.name}" onclick="${btn.clickevent}">${btn.title}</div>
										</c:when>
										<c:otherwise>
											</div>
										</c:otherwise>
									</c:choose>
								</c:otherwise>
							</c:choose>
						</c:forEach>
					</div>
				</form>
			</div>

			<div data-options="region: 'center', border: ">
				<table id="listview" class="easyui-datagrid" style="width:90%;height: inherit;margin: 0;"></table>
			</div>
		</div>

		<div id="win"><iframe src="" style="margin:0;padding:0;width: 100%;height: 98%;border:0;" frameborder="0"></iframe></div>  
		<script src="<c:url value='/resources/easyui/jquery.min.js' />"></script>
		<script src="<c:url value='/resources/easyui/jquery.easyui.min.js' />"></script>
		<script src="<c:url value='/resources/jquery.validation/1.16.0/jquery.validate.min.js' />"></script>
		<script src="<c:url value='/uadp/pageview/listview-easyui.js' />"></script>
		<script src="<c:url value='/resources/json/JsonExportExcel.min.js' />"></script>
		<script src="<c:url value='/resources/jquery/jquery.steps.min.js' />"></script>
		<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
		<script src="<c:url value='/uadp/pageview/listview-button.js' />"></script>
	</body>

</html>