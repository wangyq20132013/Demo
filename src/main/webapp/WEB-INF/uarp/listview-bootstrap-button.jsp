<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:if test="${!empty button}">
	<c:if test="${fn:length(button) != 0}">
	<div id="opt" class="col-xs-12 text-left panel-group">
		<c:forEach items="${button}" var="btn" varStatus="status">
			<c:choose>
				<c:when test="${fn:length(button) <= '6'}">
					<button type="button" class="btn btn-${style}" id="button${btn.id}" name="${btn.name}" onclick="${btn.clickevent}" style="${btn.style}">
									<i class="${btn.icon}"></i>&nbsp;&nbsp;${btn.title}
								</button>
				</c:when>
				<c:otherwise>
					<c:choose>
						<c:when test="${status.index < '6'}">
							<button type="button" class="btn btn-${style}" id="button${btn.id}" name="${btn.name}" onclick="${btn.clickevent}" style="${btn.style}">
										<span class="${btn.icon}" aria-hidden="true"></span>&nbsp;&nbsp;${btn.title}
									</button>
						</c:when>
						<c:when test="${status.index == '6'}">
							<div class="btn-group">
								<button type="button" class="btn btn-${style} dropdown-toggle" data-toggle="dropdown" aria-expanded="false" >
								    	&nbsp;&nbsp;更多&nbsp;&nbsp;<span class="caret"></span>
								    	<span class="sr-only"></span>
								 			</button>
								<ul class="dropdown-menu" role="menu">
									<li>
										<a href="#" id="button${btn.id}" name="${btn.name}" onclick="${btn.clickevent}"><i class="${btn.icon}"></i>&nbsp;${btn.title}</a>
									</li>
						</c:when>
						<c:when test="${status.index > '6'}">
							<li>
								<a href="#" id="button${btn.id}" name="${btn.name}" onclick="${btn.clickevent}" style="${btn.style}"><i class="${btn.icon}"></i>&nbsp;${btn.title}</a>
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