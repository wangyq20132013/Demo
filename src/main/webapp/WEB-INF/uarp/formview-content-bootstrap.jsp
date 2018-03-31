<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

	<form class="form-horizontal" role="form" id="commonform" enctype="multipart/form-data">
		<c:choose>
			<c:when test="${formcontent[0].type == 'group'}">
				<div role="tabpanel" style="height: 100%;">
				  	<!-- Nav tabs -->
					<ul class="nav nav-tabs col-lg-10 " role="tablist">
						<c:forEach items="${formcontent}" var="region" varStatus="status">
							<c:if test="${region.type == 'group'}">
								<c:if test="${status.index == 0}">
									<li class="active"><a href="#${region.id}" aria-controls="${region.id}" role="tab" data-toggle="tab">${region.title}</a></li>
								</c:if>
								<c:if test="${status.index > 0}">
									<li class=""><a href="#${region.id}" aria-controls="${region.id}"  role="tab" data-toggle="tab">${region.title}</a></li>
								</c:if>
						 	</c:if>
						</c:forEach>
					</ul>
					<!-- Tab panes -->
					<div class="tab-content" style="">
						<c:forEach items="${formcontent}" var="item" varStatus="status">
							<c:if test="${status.index == 0}">
								<div role="tabpanel" class="tab-pane active" id="${item.id}" style="width: 100%;height:100%;overflow-y: auto;overflow-x: hidden;">
							</c:if>
							<c:if test="${status.index > 0}">
								<div role="tabpanel" class="tab-pane" id="${item.id}" style="width: 100%;height:100%;overflow-y: auto;overflow-x: hidden;">
							</c:if>
								<div class="panel-body col-xs-12 col-lg-10 ">
									<c:forEach items="${item.items}" var="region" varStatus="status">
										<c:import url="formview-item-bootstrap.jsp">
											<c:param name="region" value="${region}"></c:param>
										</c:import>
									</c:forEach>
								</div>
							</div>
						</c:forEach>
					</div>
				</div>
			</c:when>
			<c:otherwise>
				<div class="panel-body col-lg-10 ">
					<c:forEach items="${formcontent}" var="region" varStatus="status">
						<c:import url="formview-item-bootstrap.jsp">
							<c:param name="region" value="${region}"></c:param>
						</c:import>
					</c:forEach>
				</div>
			</c:otherwise>
		</c:choose>
	</form>
