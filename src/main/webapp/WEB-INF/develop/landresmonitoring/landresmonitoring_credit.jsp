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
	<div class="left_data">
		<div class="top_left_box animated rotateInDownLeft">
			<div class="">
				<p class="lead">截至2017年底，土地利用信用指数位于70分以上（包括70分）的县有58个，按照省级汇总主要分布在辽宁省、上海市及天津市，分别有13、9及6个县。其中指数最高为74分，分别是北京市东城区、西城区及南京市鼓楼区。</p>
			</div>
		</div>
		<div class="left_center_box">
			<div class="tab_box">
				<ul class="nav nav-pills nav-stacked">
					<li class="active"><a href="#"  id="zhCredit" onclick="getZhCredit(id)">综合信用</a></li>
					<li class="unactive"><a href="#" id="yearCredit" onclick="getYearCredit(id)">年度信用</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div class="top_center_title">
 		<h3 id="topText">综合信用<small></small></h3>
	</div>
	<div class="main_data">
		<div id="map" class="mapview animated bounceIn"> <!--bounceIn   fadeIn-->
			<div class="ol-legend">
				<div class="panel panel-primary">
					<p class="text-center">信用指数</p>
					<img id="legend" src=""/></div>
				</div>
		</div>
	</div>
	<div class="right_data"></div>
	<script src="<c:url value='/resources/echarts/3.3.2/echarts.min.js'/>"></script>
</html>