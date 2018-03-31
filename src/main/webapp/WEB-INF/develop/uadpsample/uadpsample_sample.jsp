<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
		<title>${buisname}</title>
	</head>
	
	<body>
		<div class="form-group">
			<label class="col-xs-2 control-label">办公室编号</label>
			<div class="col-xs-4">
				<input type="hidden" class="form-control" id="aid" name="aid" placeholder="编号标识" value="${params.AID}">
				<input type="text" class="form-control" id="ausid" name="ausid" placeholder="办公室编号" value="${params.AUSID}">
			</div>
			<label class="col-xs-2 control-label">使用部门</label>
			<div class="col-xs-4">
				<select id="ausdep" name="ausdep" class="form-control" value="${params.AUSDEP}">
					<option value="IT">IT</option>
					<option value="软件产品部">软件产品部</option>
					<option value="人力资源部">人力资源部</option>
					<option value="区域应用产品部">区域应用产品部</option>
					<option value="技术研究院">技术研究院</option>
					<option value="大客户部">大客户部</option>
					<option value="信息产品部">信息产品部</option>
					<option value="生态环境事业部">生态环境事业部</option>
					<option value="国土应用事业部">国土应用事业部</option>
					<option value="测绘应用事业部">测绘应用事业部</option>
					<option value="北京中心">北京中心</option>
					<option value="农业统计事业部">农业统计事业部</option>
					<option value="增值产品部">增值产品部</option>
				</select>
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-xs-2 control-label">月租金</label>
			<div class="col-xs-10">
				<input type="text" class="form-control" id="ausrent" name="ausrent" placeholder="月租金" value="${params.AUSRENT}">
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-xs-2 control-label">入住人数</label>
			<div class="col-xs-10">
				<input type="number" min="1" class="form-control" id="ausnum" name="ausnum" placeholder="入住人数" value="${params.AUSNUM}">
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-xs-2 control-label">是否维修</label>
			<div class="col-xs-10" id="ausrep" class="form-control" value="${params.AUSREP}">
					<c:set value="${params.AUSREP}" var="ausrep" scope="session"/>
					<input type="radio" name="ausrep" value="1" checked="checked">是
					<input type="radio" name="ausrep" value="0" <c:if test="${ausrep == '否'}">checked="checked"</c:if>>否
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-xs-2 control-label">维修时间</label>
			<div class="col-xs-10">
				<input type="date" class="form-control" id="austime" name="austime" placeholder="维修时间" value="${params.AUSTIME}">
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-xs-2 control-label">描述</label>
			<div class="col-xs-10" class="form-control" id="ausdesc" placeholder="描述" value="${params.AUSDESC}">
				<textarea cols="89" rows="4" name="ausdesc">${params.AUSDESC}</textarea>
			</div>
		</div>
		
		 
		<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>	
	</body>
</html>