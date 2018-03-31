<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
	<div id="monitoringDate_box" class="event_box">
		<div class="parHd clearfix">
			<ul id="monitoringDate"></ul>
			<a class="sPrev"><img src="${pageContext.request.contextPath}/develop/${appname}/image/left_ico.png" alt="" title=""></a>
			<a class="sNext"><img src="${pageContext.request.contextPath}/develop/${appname}/image/right_ico.png" alt="" title=""></a>
		</div>
	</div>
</html>