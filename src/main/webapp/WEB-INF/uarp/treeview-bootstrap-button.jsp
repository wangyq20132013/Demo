<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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