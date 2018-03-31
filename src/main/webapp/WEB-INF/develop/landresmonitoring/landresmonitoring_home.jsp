<%@page import="java.util.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
	</head>
	<div class="left_data  animated fadeInLeft">
		<div class="panel panel-primary">
			<div class="panel-heading">行政区划</div>
			<div class="panel-body" style="height:  calc(100% - 42px)">
				<ul id="tree" class="ztree" style="height: calc(100% - 30px);overflow-y: auto;"></ul>
			</div>
		</div>
	</div>
	<div class="main_data">
		<div id="map" class="mapview">
			<div class="tucengkz hidden-print">
				<div class="tucengkongzhi">
					<p style="text-align: right;">
						<img title="地图切换" src="${pageContext.request.contextPath}/resources/commons/map/css/icons/switchmapon.png" id="SwitchMapOnOff" />
					</p>
					<ul id="switchmapwrapper" style="background: url(${pageContext.request.contextPath}/resources/commons/map/css/icons/tckzbg.png); display: none; width: 230px; height: 129px; border-radius: 5px;">
						<li style="text-align: center;" datatype="baselayer_vector">
							<a href="javascript:void(0);"><img src="${pageContext.request.contextPath}/resources/commons/map/css/icons/ditu.png" /></a><br />矢量地图</li>
						<li style="text-align: center;" datatype="baselayer_satellite">
							<a href="javascript:void(0);"><img src="${pageContext.request.contextPath}/resources/commons/map/css/icons/yingxiang.png" /></a><br />影像地图</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="right_data animated fadeInRight">
		<div id="right_box" class="panel panel-primary"></div>
	</div>
</html>