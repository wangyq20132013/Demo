<%@page import="com.at21.db.JdbcTemplate"%>
<%@page import="com.at21.util.GenerateTreeCode"%>
<%@page import="java.util.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
	 <div class="left_data panel panel-primary">
			<div class="panel-heading" style="text-align:center">行政区划
			    <a href="#" title="返回首页" onClick="javascript:history.back(-1)"><span class="glyphicon glyphicon-share-alt left-title-link"></span></a>
			</div>
			<div class="panel-body" style="height: calc(100% - 42px);">
				<div class="panel-group" style="height: calc(100% - 34px);">
					<ul id="tree" class="ztree" style="height: 100%;overflow-y: auto;"></ul>
				</div>
			</div>
	</div> 
	
	<div class="main_data">
		<div class="maptool">
				<div id="myradioType" style="display:inline;float: right; margin-right: 35%;"> 
				      <label><input type="radio" id="radioSL" onclick="radiochange(value)" name="radio" value="1">图斑数量统计</label> 
				      <label><input type="radio" id="radioMJ" onclick="radiochange(value)" name="radio" value="2">图斑面积统计</label> 
				</div>
			    <select id="monitoringDate" class="form-control" style="width:30%;z-index:999"></select>
			    <div id="radioType" style="display:inline"></div>
	    </div>
        <div id="map" class="mapview animated bounceIn">
			<div class="ol-legend">
				<div class="panel panel-primary">
					  <p id="landType" class="text-center">图斑数量(个)</p>
				     <img id="legend" src=""/>
				</div>
			</div>
	 </div>
	</div>
	
	 <div class="right_data">
	     <div id="right_box" class="panel panel-primary" style="margin-bottom: 0px;height: 100%;">
	         <table id="table" class="table"></table> 
	     </div> 
	</div>
</html>


