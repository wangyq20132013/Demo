<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="net.sf.json.JSONObject"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<% 
	String jsonString = request.getParameter("region");
	JSONObject jsonObject = JSONObject.fromObject(jsonString);
	request.setAttribute("region", jsonObject);
%>
<c:if test="${!empty region}">
	<div class="form-group">
		<c:if test="${region.type == 'hidden'}">
			<input type="hidden" id="text${region.id}" value="${region.defaultvalue}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" onkeydown="${region.onkeydown}" style="${region.style}"/>
		</c:if>
		<c:if test="${region.type == 'text'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
			${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<input type="text" class="form-control" id="text${region.id}" value="${region.defaultvalue}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" isfuzzy="${region.isfuzzy}" onkeydown="${region.onkeydown}" style="${region.style}" placeholder="${region.title}" ${region.readonly?"readonly":""} isnull="${region.isnull}" _min="${region.min}" _max="${region.max}" rule="${region.rule}"/>
				<c:if test="${!empty region.info}">
					<label class="info">
						<a href="#" type="button" class="btn btn-link" data-container="body" data-toggle="popover" data-placement="auto" data-content="${region.info}">
							<span class="glyphicon glyphicon-question-sign"></span>
						</a>
					</label>
				</c:if>
			</div>
		</c:if>
		<c:if test="${region.type == 'number'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
			${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<input type="number" class="form-control" id="text${region.id}" value="${region.defaultvalue}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" isfuzzy="${region.isfuzzy}" onkeydown="${region.onkeydown}" style="${region.style}" placeholder="${region.title}" ${region.readonly?"readonly":""} isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}" />
				<c:if test="${!empty region.info}">
					<label class="info">
						<a href="#" type="button" class="btn btn-link" data-container="body" data-toggle="popover" data-placement="auto" data-content="${region.info}">
							<span class="glyphicon glyphicon-question-sign"></span>
						</a>
					</label>
				</c:if>
			</div>
		</c:if>
		<c:if test="${region.type == 'file'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
			${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<input type="file" class="form-control" id="text${region.id}" value="${region.defaultvalue}" name="${region.name}" dataset="${region.datainterface}" accept="${region.accept}" initdata="${region.initdata}" isfuzzy="${region.isfuzzy}" onkeydown="${region.onkeydown}" style="${region.style}"  placeholder="${region.title}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}"/>
				<c:if test="${!empty region.info}">
					<label class="info">
						<a href="#" type="button" class="btn btn-link" data-container="body" data-toggle="popover" data-placement="auto" data-content="${region.info}">
							<span class="glyphicon glyphicon-question-sign"></span>
						</a>
					</label>
				</c:if>
			</div>
		</c:if>
		<c:if test="${region.type == 'multifile'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
			${region.title}:</label>
			<div id="attach" class="col-xs-9 col-sm-9 input-group" accept="${region.accept}">
				<div class="input-group" style="">
					<c:if test="${not empty region.dataset or !empty region.options}">
						<span class="input-group-btn">
							<select class="form-control" id="filetype0" name="filetype" dataset="${region.dataset}" initdata="${region.initdata}" style="width: auto;">
								<c:forEach items="${region.options}" var="option" varStatus="status">
									<option value='${option.id}'>${option.title}</option>
								</c:forEach>
							</select>
						</span>
					</c:if>
					<input type="file" class="form-control" id="text${region.id}" value="${region.defaultvalue}" name="${region.name}" dataset="${region.dataset}"  accept="${region.accept}" initdata="${region.initdata}" isfuzzy="${region.isfuzzy}" onkeydown="${region.onkeydown}" style="${region.style}"  placeholder="${region.title}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}"/>
					<span class="input-group-btn">
		    			<a class="btn btn-link" onclick="addAttach(this)" ><span class="glyphicon glyphicon-plus-sign"></span></a>
		    		</span>
				</div>
			</div>
		</c:if>
		<c:if test="${region.type == 'select'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
			${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<select class="form-control" id="sel${region.id}" value="${region.defaultvalue}" name="${region.name}" data-type="${region.type}" dataset="${region.datainterface}" initdata="${region.initdata}" onchange="${region.onchange}" style="min-width: 80px;${region.style}" ${region.readonly?"readonly":""} isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}">
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
		<c:if test="${region.type == 'radio'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
			${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<div class="radio_region" radio-name="${region.name}" dataset="${region.datainterface}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}">
				<c:if test="${!empty region.options}">
					<c:if test="${fn:length(region.options) != 0}">	
						<c:forEach items="${region.options}" var="option" varStatus="status">
							<lable class="radio-inline">
							<input type="radio" name="${region.name}" value="${option.id}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}" <c:if test="${status.index == 0}">checked</c:if>/>
							${option.title}</lable>
						</c:forEach>
					</c:if>
				</c:if>
				</div>
			</div>
		</c:if>
		<c:if test="${region.type == 'checkbox'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
			${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<div class="checkbox_region checkbox-inline" checkbox-name="${region.name}" dataset="${region.datainterface}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}">
					<c:if test="${!empty region.options}">
						<c:if test="${fn:length(region.options) != 0}">	
							<c:forEach items="${region.options}" var="option" varStatus="status">
								<lable class="checkbox-inline"><input type="checkbox" name="${region.name}" value="${option.id}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}"/>${option.title}</lable>
							</c:forEach>
						</c:if>
					</c:if>
				</div>
			</div>
		</c:if>
		<c:if test="${region.type == 'textarea'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
			${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<textarea class="form-control" id="control_${region.id}" name="${region.name}" placeholder="${region.title}" ${region.readonly?"readonly":""} isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}">${region.defaultvalue}</textarea>
				<c:if test="${!empty region.info}">
					<label class="info">
						<a href="#" type="button" class="btn btn-link" data-container="body" data-toggle="popover" data-placement="auto" data-content="${region.info}">
							<span class="glyphicon glyphicon-question-sign"></span>
						</a>
					</label>
				</c:if>
			</div>
		</c:if>
		<c:if test="${region.type == 'editor'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
			${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<div id="control_${region.id}" name="${region.name}" class="editor embed-responsive embed-responsive-4by3" type="text/plain" data-type="${region.type}" placeholder="${region.title}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}" style="width: 100%;"></div>
			</div>
		</c:if>
		
		<c:if test="${region.type == 'liveselect'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
			${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<select class="form-control" id="sel${region.id}" value="${region.defaultvalue}" name="${region.name}" min-width="80" data-live-search="true" data-size="10" data-width="auto" data-type="${region.type}" dataset="${region.datainterface}" initdata="${region.initdata}" onchange="${region.onchange}" style="width: 100%;${region.style}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}">
					<c:if test="${empty region.isSelected || region.isSelected == 'true'}">
						<option value="">--请选择--</option>
					</c:if>
					<c:if test="${!empty region.options}">
						<c:if test="${fn:length(region.options) != 0}">	
							<c:forEach items="${region.options}" var="option" varStatus="status">
								<option vlaue='${option.id}'>${option.title}</option>
							</c:forEach>
						</c:if>
					</c:if>
				</select>
			</div>
		</c:if>
		<c:if test="${region.type == 'treeselect'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
			${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<select class="form-control" id="sel${region.id}" value="${region.defaultvalue}" name="${region.name}" data-live-search="true" data-size="10" data-width="auto" data-type="${region.type}" dataset="${region.datainterface}" initdata="${region.initdata}" onchange="${region.onchange}" style="min-width: 120px;${region.style}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}">
					<c:if test="${empty region.isSelected || region.isSelected == 'true'}">
						<option value="">--请选择--</option>
					</c:if>
					<c:if test="${!empty region.options}">
						<c:if test="${fn:length(region.options) != 0}">	
							<c:forEach items="${region.options}" var="option" varStatus="status">
								<option vlaue='${option.id}'>${option.title}</option>
							</c:forEach>
						</c:if>
					</c:if>
				</select>
			</div>
		</c:if>
		<c:if test="${region.type == 'mapselect'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
				${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<input type="text" class="form-control" id="text${region.id}" data-type="${region.type}" value="${region.defaultvalue}" name="${region.name}" dataset="${region.datainterface}" pageview="${region.pageview}" initdata="${region.initdata}" onkeyup="${region.onkeyup}" style="${region.style}" readonly placeholder="${region.title}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}"/>
				<span class="input-group-btn" >
					 <button class="btn btn-default" type="button" onclick="mapselect(this)">打开地图</button>
				</span>
			</div>
		</c:if>
		<c:if test="${region.type == 'map'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
				${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<input type="hidden" class="form-control" id="text${region.id}" data-type="${region.type}" value="${region.defaultvalue}" name="${region.name}" onchange="refreshmapwkt(this);" dataset="${region.datainterface}" pageview="${region.pageview}" initdata="${region.initdata}" onkeyup="${region.onkeyup}" style="${region.style}" readonly placeholder="${region.title}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}"/>
				<div class="embed-responsive embed-responsive-16by9">
					<iframe class="embed-responsive-item well well-sm" src="" ></iframe>
				</div>
			</div>
		</c:if>
		
		<c:if test="${region.type == 'table'}">
			<label class="col-xs-3 col-sm-3 control-label">${region.title}:</label><div class="col-xs-9 col-sm-9 input-group"></div>
			<div class="col-xs-11 input-group">
				<input type="hidden" class="form-control" id="text${region.id}" data-type="${region.type}" value="${region.defaultvalue}" name="${region.name}" dataset="${region.datainterface}" pageview="${region.pageview}" initdata="${region.initdata}" onkeyup="${region.onkeyup}" style="${region.style}" readonly placeholder="${region.title}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}"/>
				<div class="embed-responsive embed-responsive-16by9">
					<iframe class="embed-responsive-item well well-sm" src="" ></iframe>
				</div>
			</div>
		</c:if>
		
		<c:if test="${region.type == 'treeopenselect'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
				${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<input type="text" class="form-control" id="text${region.id}" value="${region.defaultvalue}" name="${region.name}" dataset="${region.datainterface}"  initdata="${region.initdata}" onkeyup="${region.onkeyup}" style="${region.style}" readonly placeholder="${region.title}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}"/>
				<span class="input-group-btn" >
					 <button class="btn btn-default" type="button" onclick="treeopenselect(this)">选择${region.title}</button>
				</span>
			</div>
		</c:if>
		
		<c:if test="${region.type == 'tableselect'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
				${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<input type="text" class="form-control" id="text${region.id}" value="${region.defaultvalue}" name="${region.name}" dataset="${region.datainterface}" pageview="${region.pageview}" initdata="${region.initdata}" isfuzzy="${region.isfuzzy}" onkeyup="${region.onkeyup}" style="${region.style}" readonly placeholder="${region.title}" isnull="${region.isnull}" _min="${region.min}"  _max="${region.max}"  rule="${region.rule}"/>
				<span class="input-group-btn" >
					 <button class="btn btn-default" type="button" onclick="tableselect(this)">选择${region.title}</button>
				</span>
			</div>
		</c:if>

		<c:if test="${region.type == 'date'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
				${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<div id="date${region.id}" type="${region.type}" class="date">
					<input type="text" class="form-control" name="${region.name}" value="${region.defaultvalue}" startid="${region.startid}" endid="${region.endid}" currentType="${region.currentType}"  readonly ${region.readonly?"readonly":""} isnull="${region.isnull}"/>
				</div>
			</div>
		</c:if>
		<c:if test="${region.type == 'datetime'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
				${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<div id="date${region.id}" type="${region.type}" class="date">
					<input type="text" class="form-control" name="${region.name}" value="${region.defaultvalue}" readonly ${region.readonly?"readonly":""} isnull="${region.isnull}"/>
				</div>
			</div>
		</c:if>
		<c:if test="${region.type == 'doubledate'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
				${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<div id="date${region.id}" type="${region.type}" class="date">
					<input type="text" class="form-control" id="startstopdate" name="startstopdate" value="${region.defaultvalue}" ${region.readonly?"readonly":""} isnull="${region.isnull}"/>
				</div>
			</div>
		</c:if>
		<c:if test="${region.type == 'year'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
				${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<div id="date${region.id}" type="${region.type}" class="date">
					<input type="text" class="form-control" name="${region.name}" value="${region.defaultvalue}" size="16" onchange="${region.onchange}" ${region.readonly?"readonly":""} isnull="${region.isnull}"/>
				</div>
			</div>
		</c:if>
		<c:if test="${region.type == 'month'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
				${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<div id="date${region.id}" type="${region.type}" class="date">
					<input type="text" class="form-control" name="${region.name}" value="${region.defaultvalue}" size="16" ${region.readonly?"readonly":""} isnull="${region.isnull}" />
				</div>
			</div>
		</c:if>
		<c:if test="${region.type == 'serial'}">
			<label class="col-xs-3 col-sm-3 control-label">
				<c:if test="${region.isnull == false}"><span style="color:red;">*</span></c:if>
				${region.title}:</label>
			<div class="col-xs-9 col-sm-9 input-group">
				<input type="text" class="form-control" data-type="${region.type}" id="text${region.id}" value="${region.defaultvalue}" name="${region.name}" dataset="${region.datainterface}" initdata="${region.initdata}" isfuzzy="${region.isfuzzy}" onkeydown="${region.onkeydown}" style="${region.style}" placeholder="${region.title}" ${region.readonly?"readonly":""} isnull="${region.isnull}" _min="${region.min}" _max="${region.max}" rule="${region.rule}" readonly/>
				<c:if test="${!empty region.info}">
					<label class="info">
						<a href="#" type="button" class="btn btn-link" data-container="body" data-toggle="popover" data-placement="auto" data-content="${region.info}">
							<span class="glyphicon glyphicon-question-sign"></span>
						</a>
					</label>
				</c:if>
			</div>
		</c:if>
	</div>
</c:if>
