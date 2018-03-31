<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${app.TITLE}</title>

<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<link rel="stylesheet" type="text/css" href="<c:url value='/develop/${appname}/css/extend_samplemap.css'/>" />

<style type="text/css">
/*
* 更改弹窗样式的更改
*/
#detail {
	height: 265px !important;
	min-width: 380px !important;
	padding: 0px !important;
	overflow: hidden !important;
}

#detail>iframe {
	height: 100% !important;
}

#listview{
	margin:0px;
	padding:0px;
}
</style>
</head>

<body>
		<div class="left_data">
			<h1>资产类型</h1>
			<div class="zk"></div>
	    </div>
	    
	    <div id="map" class="main_map" >
	    	<button id="buttonDiv" type="button" class="btn btn-primary dropdown-toggle" style="position:absolute;top:5px;right:5px;z-index:1;" onclick="showOrgUnit()">全部单位</button>
	    	<div id="rightDiv" style="display:none;">
				<div id="riDiv">
					<table id="orgtable" class="table"></table>
				</div>
			</div>
			<!--放置内容数据  -->
			<div id="contentDiv" class="panel panel-primary"
				style="bottom: -290px;z-index:10000;">
				<div class="panel-heading" style="height: 30px;">
					<div class="toggleDiv1" style="display: none;">
						<i class="fa fa-arrows-alt"></i>
					</div>
					<div class="toggleDiv1" style="display: none;">
						<i class="fa fa-minus" title=""></i>
					</div>
					<div class="toggleDiv">
						<i class="fa fa-caret-square-o-up"></i>
					</div>
					<div class="toggleDiv" style="display: none;">
						<i class="fa fa-caret-square-o-down"></i>
					</div>
					<ul id="dataInfo" class="nav nav-pills">
	
					</ul>
				</div>
				<div class="panel-body" style="padding: 10px; margin: 0px; max-height: 275px;">
					<c:import url="listview-bootstrap-button.jsp" />
			
					<c:import url="listview-bootstrap-query.jsp" />
					<!-- 嵌入listview -->
					<div id="listview" class="col-xs-12">
						<table id="table" class="table table-striped table-bordered table-hover"></table>
					</div>

				</div>
			</div>
			<!-- 国有资产无批次的概念 -->
<!-- 
			<div class="select-group" id=""
				style="position: absolute; top: 5px; left: 60px;z-index: 1;width:145px;">
				<div class="form-group" style="padding: 3px;" id="track-selector">
					<div class="select-group">
						<select class="form-control" title="数据批次切换" id="track-select" data-type="select"
							initdata="true" style="padding:6px 9px;cursor:pointer;">
						</select>
					</div>
				</div>
			</div>
 -->
			
			
		</div>

</body>
</html>