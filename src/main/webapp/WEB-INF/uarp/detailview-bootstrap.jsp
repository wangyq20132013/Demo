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
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/layer/2.4/skin/layer.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/style.css'/>" />
		<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
			var name = '${name}';
			var theme = '${theme}';
		</script>
	</head>

	<body>
		<div class="panel-body" id="bodyform">
			<div class="col-sm-10">
				<c:forEach items="${formpage}" var="form">
					<c:import url="../${form.type}/${form.name}.jsp" />
				</c:forEach>
			</div>
		</div>
	</body>
	<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
	<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>

</html>