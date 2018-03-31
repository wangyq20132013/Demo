<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:if test="${!empty query}">
	<c:if test="${fn:length(query) != 0}">
	<div id="query" class="col-xs-12 text-right panel-group">
		<form class="form-inline" role="form" id="queryForm">
			<!--防止submit提交，勿删-->
			<input type="text" style="display: none;"/> 
			<!-- -->
			
			<c:forEach items="${query}" var="region" varStatus="status">
				<div class="form-group">
					<c:if test="${region.type == 'hidden'}">
							<input type="hidden" id="text${region.id}" value="${region.value}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" list="list_${region.id}" onkeydown="${region.onkeydown}" onkeyup="${region.onkeyup}" style="${region.style}"/>
					</c:if>
					<c:if test="${region.type == 'text'}">
						<div class="input-group">
							<input type="text" class="form-control" id="text${region.id}" value="${region.value}" dynval="${region.dynval}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" querydataset="${region.querydataset}" isfuzzy="${region.isfuzzy}" placeholder="${region.title}" onkeydown="${region.onkeydown}" onkeyup="${region.onkeyup}" style="${region.style}" isnull="${region.isnull}" _min="${region.min}" _max="${region.max}" rule="${region.rule}" />
						</div>
					</c:if>
					<c:if test="${region.type == 'select'}">
						<label class="control-label">${region.title}:</label>
						<div class="input-group">
							<select class="form-control" id="sel${region.id}" val="${region.value}" name="${region.name}" data-type="${region.type}" dataset="${region.datainterface}" initdata="${region.initdata}" querydataset="${region.querydataset}" onchange="${region.onchange}" style="min-width: 80px;${region.style}" isnull="${region.isnull}" _min="${region.min}" _max="${region.max}" rule="${region.rule}">
								<c:if test="${empty region.isSelected || region.isSelected == 'true'}">
									<option value="">--请选择--</option>
								</c:if>
								<c:if test="${!empty region.options}">
									<c:if test="${fn:length(region.options) != 0}">	
										<c:forEach items="${region.options}" var="option" varStatus="status">
											<option value='${option.id}'>${option.title}</option>
										</c:forEach>
									</c:if>
								</c:if>
							</select>
						</div>
					</c:if>
					<c:if test="${region.type == 'liveselect'}">
						<div class="input-group">
							<select class="form-control" id="sel${region.id}" value="${region.value}" name="${region.name}" min-width="0" data-live-search="true" data-size="10" data-width="auto" data-type="${region.type}" dataset="${region.datainterface}" initdata="${region.initdata}" onchange="${region.onchange}" querydataset="${region.querydataset}" style="${region.style}" isnull="${region.isnull}" _min="${region.min}" _max="${region.max}" rule="${region.rule}">
								<c:if test="${empty region.isSelected || region.isSelected == 'true'}">
									<option value="">--${region.title}--</option>
								</c:if>
							</select>
						</div>
					</c:if>
					<c:if test="${region.type == 'treeselect'}">
						<div class="input-group">
							<select class="form-control" id="sel${region.id}" value="${region.value}" name="${region.name}" data-live-search="true" data-size="10" data-width="auto" data-type="${region.type}" dataset="${region.datainterface}" initdata="${region.initdata}" onchange="${region.onchange}" querydataset="${region.querydataset}" style="min-width: 120px;${region.style}" isnull="${region.isnull}" _min="${region.min}" _max="${region.max}" rule="${region.rule}">
								<c:if test="${empty region.isSelected || region.isSelected == 'true'}">
									<option value="">--${region.title}--</option>
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
							<input type="text" class="form-control" name="${region.name}" value="${region.value}" size="16" onchange="${region.onchange}"/>
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
				<div class="form-group">
					<button type="button" id="querybtn" class="btn btn-${style}" data-loading-text='<span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索..' style="width: 90px;">
						<span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索
					</button>
					<button type="button" id="resetbtn" class="btn btn-default" onclick="resetForm()">
						 <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>重置
					</button>
				</div>
			</c:if>
		</form>
	</div>
	</c:if>
	</c:if>