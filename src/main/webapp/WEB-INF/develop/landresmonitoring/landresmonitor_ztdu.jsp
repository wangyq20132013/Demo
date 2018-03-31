<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
	 <div class="left_data panel panel-primary animated fadeInLeft">
				<div class="panel-heading">行政区划</div>
		<div class="panel-body" style="height: calc(100% - 42px);">
			<div class="panel-group" style="height: calc(100% - 34px);">
				<ul id="tree" class="ztree" style="height: 100%;overflow-y: auto;"></ul>
			</div>
		</div>
			</div> 
	<div class="main_data">
	 <div class="maptool">
			 <select id="monitoringDate" class="form-control" style="width:30%;display:inline"></select>
             <div style="display:inline">
             	      <label class="mapRadio"><input type="radio" id="radionum" value="1" name="radio" checked onclick="radiochange(value)" />图斑数量统计</label>
                      <label class="mapRadio"><input type="radio" id="radioarea" value="2" name="radio" onclick="radiochange(value)"/>图斑面积统计</label>
                      <label class="mapRadio"><input type="radio" id="radiocredit" value="3" name="radio" onclick="radiochange(value)"/>土地利用信用度统计</label>
             </div>
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
	<div  class="right_data animated fadeInRight">
		<!--<div class="panel panel-primary" id ="tball"  style="margin-bottom: 0px;height:100%">
			 <ul class="list-group fx-list">
				 <li class="list-group-item zt">
				 <a  id="tubanall"  style="cursor:pointer;text-decoration:none;float:right" onclick="showDedail(this)">详情>></a>
				   <div class="text-primary">图斑总体分布</div>
				<div id="patchall" style="height:100%"> </div>
				</li>
				<li class="list-group-item lx">
				<a id="tubantype" style="cursor:pointer;text-decoration:none;float:right" onclick="showDedail(this)" >详情>></a>
				<div class="text-primary">图斑类型分布</div>
					<div id="patchtype" style="height:100%"></div>
				</li>
				<li class="list-group-item xz">
				<a  id="tubanproperty" style="cursor:pointer;text-decoration:none;float:right" onclick="showDedail(this)">详情>></a>
				<div class="text-primary">图斑性质分布</div> 
					<div id="patchproperty" style="height:100%"> </div>
				</li> 
			</ul>
		</div>-->
		<div class="panel panel-primary" style="margin-bottom: 0px;">
			<div class="right_top">
				  <a href="#" id="tubantype" title="查看图斑类型详情" class="btn btn-default" style="float:right;color: #286090;z-index: 999;" onclick="showDedail(this)">详情
				  	<span class="fa fa-chevron-right"></span><span class="fa fa-chevron-right"></span>
				  </a>

				  <div class="text-primary" style="visibility: hidden;">图斑类型分布</div>
		    	  <div id="patchtype" class="panel" style="width:100%;height:90%"></div>
		    	  <hr>
			</div>
		    <div class="right_middle">
		    	  <a href="#" id="tubanproperty" class="btn btn-default" title="查看图斑性质详情"  style="float:right;color: #286090;z-index: 999;" onclick="showDedail(this)"> 详情
		    	  	<span class="fa fa-chevron-right"></span><span class="fa fa-chevron-right"></span>
		    	  </a>
		         <div class="text-primary" style="visibility: hidden;">图斑性质分布</div>
		         <div id="patchproperty" style="width:100%;height:90%"></div>
		         <hr>
		    </div>
		    <div class="right_bottom">
		    	 <a href="#"  id="tubanall"  class="btn btn-default" style="float:right;color: #286090;z-index: 999;" title="查看图斑总体详情"   onclick="showDedail(this)">详情
		    	 	<span class="fa fa-chevron-right"></span><span class="fa fa-chevron-right"></span>
		    	 </a>
				 <div class=" text-center" style="visibility: hidden;">图斑总体分布</div>
				<div id="patchall" style="width:100%;height:90%"></div>
	        </div>  
	   </div>
	</div>
		
</html>


