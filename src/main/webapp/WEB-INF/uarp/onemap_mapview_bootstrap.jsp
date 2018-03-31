<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>${pageview}</title>
<link href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"
	rel="stylesheet" type="text/css" />
<link href="<c:url value='/resources/bootstrap/css/bootstrap-datetimepicker.min.css'/>"
	rel="stylesheet" type="text/css" />
<link href="<c:url value='/resources/bootstrap/css/bootstrap-table.css'/>"
	rel="stylesheet" type="text/css" />
<link rel="stylesheet"
	href="<c:url value='/resources/awesome/assets/font-awesome/css/font-awesome.min.css'/>" type="text/css" />
<link rel="stylesheet"
	href="<c:url value='/resources/onemap/css/main.css'/>" type="text/css" />

<link href="<c:url value='/resources/onemap/css/${style}.css'/>"
	rel="stylesheet" type="text/css" />
	
	
<link rel="stylesheet" type="text/css" href="<c:url value='/resources/layer/2.4/skin/layer.css'/>"></link>
<link rel="stylesheet" type="text/css" href="<c:url value='/resources/H-ui/h-ui.admin/css/H-ui.admin.css'/>"></link>
<link rel="stylesheet" type="text/css" href="<c:url value='/develop/graind/css/index.css'/>"></link>
<style>
	.node-tree:not(.node-disabled):hover {background-color: #F5F5F5;color: black;}
	.fixed-table-toolbar{border:1px solid #ddd;height:55px;}
	.fixed-table-toolbar .dropdown-menu{max-height:145px;}
</style>	
	

<script src="<c:url value='/resources/jquery/jquery-1.11.3.min.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/resources/bootstrap/js/bootstrap.min.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/resources/bootstrap/js/bootstrap-datetimepicker.zh-CN.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/resources/bootstrap/js/bootstrap-table.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/resources/bootstrap/js/bootstrap-table-zh-CN.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/resources/echarts/js/echarts.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/resources/bootstrap/js/bootstrap-treeview.min.js'/>"></script>	


</head>

<body>
	<!--left-->
	<div class="titleleft" style="display:none;">
		<ul class="daohang">
			<li><i class="glyphicon glyphicon-globe"></i> <a href="#"
				style="cursor: default;">高级检索</a></li>
		</ul>
		<div class="leftContent" style="text-shadow:0 0 black;">
<!-- 		<ul class="nav nav-tabs daohang" role="tablist"> -->
<!-- 		    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">行政区划</a></li> -->
<!-- 		    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">高级检索</a></li> -->
<!-- 	  	</ul> -->
<!-- 	  	<div class="tab-content"> -->
			<label class="col-sm-4 control-label qygl">区域过滤:</label>
			<p class="searchXz">
				<input type="text" id="search_text"/> 
				<img src="<c:url value='/resources/onemap/img/btn_find.png'/>"/>
			</p>
		    <div role="tabpanel" class="tab-pane active" id="home">
		    </div>
		    <div role="tabpanel" class="tab-pane" id="profile" style="height:297px;overflow-y: auto;">
		    	<hr style=""/>
		    	<form class="form-horizontal" role="form" id="querySearchForm">
		    	  <div class="form-content-body">
			    	  <div class="form-group">
					    <div class="col-sm-5"  style="padding-right:0;">
					      <select  onfocus="selectChange(this);" class="form-control">
				    	  </select>
					    </div>
					    <div class="col-sm-6" style="padding-left:0;padding-right: 0px;">
					      <input class="form-control" type="text" onkeyup="value=this.value.replace(/[^a-zA-Z0-9一-龥]/g,'')" style="border-radius: 20px" placeholder="模糊查询"/>
					    </div>
					    <div class="col-sm-1" style="padding-left:0;padding-right: 0px;height: 34px;">
					    	<span style="font-size: 21px;cursor:pointer;" title="删除" onclick="$(this).parent().parent().remove()">×</span>
					    </div>
			    	  </div>
				  </div>
<!-- 				  <div class="form-group" > -->
<!-- 				    <label class="col-sm-2 control-label">年份:</label> -->
<!-- 				    <div class="col-sm-4"> -->
<!-- 				      <input type="text" class="form-control" id="nf" onchange="" data-date-format="yyyy"/> -->
<!-- 				    </div> -->
<!-- 				    <label class="col-sm-2 control-label">月份:</label> -->
<!-- 				    <div class="col-sm-4"> -->
<!-- 				      <input type="text" class="form-control" id="yf" onchange=""  data-date-format="mm"/> -->
<!-- 				    </div> -->
<!-- 				  </div> -->
				  <a class="btn btn-default btn-block" onclick="addQuerySearch()">添加</a>
				  <a class="btn btn-success btn-block" onclick="queryDkInfo()">查询</a>
				</form>
		    </div>
<!-- 	  	</div> -->

		<div id="tree" class="left-tree"></div>
		</div>
	</div>

	<!--map-->
	<div class="titlemiddle">
		<iframe id="iframe_map" name="iframe_map"
			src="<c:url value='/resources/commons/ext/map.jsp'/>" scrolling="no"
			frameborder="0"></iframe>
	</div>

<div id="righttitle" data-show="show">
<!-- <div id="glyp" onclick="showtable()" class="glyphicon glyphicon-menu-right" style="top: 50%;color: green;left: -19px;z-index: 1000;font-size: 41px;cursor: pointer"></div> --> 
<div class="dislpayArrow hidden-xs">
			<a class="pngfix2 open" href="javascript:void(0);" style="z-index: 1000;left: -226px;" onclick="showtable(this)"></a>
		</div>
	<!--right-->
	<div class="panel panel-default" id="switch-panel"  style="opacity :1">
		<div class="panel-body" style="padding: 2px;">
			<div class="btn-group" role="group">
				<!-- <button type="button" class="btn btn-default active" value="pyzl">平原造林</button> -->
				<!-- <button type="button" class="btn btn-default" value="autumn">秋收成果</button> -->
			</div>
			<button type="button" style="width: 234px;" class="btn btn-default" onclick="dqdb()">多期对比</button>
		</div>
		<div class="list-group" style="    height: 130px; overflow-y: auto;">
			<!-- <a href="#" class="list-group-item active" value="2012">2012年</a>
			<a href="#" class="list-group-item" value="2013">2013年</a> 
			<a href="#" class="list-group-item" value="2014">2014年</a> 
			<a href="#" class="list-group-item" value="2015">2015年</a> -->
		</div>
	</div>
	<div class="titleright" data-show="show">
		<div class="panel-group" id="accordion">
             <div class="panel">
				<div index="0" class="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapse0">
					<a class="accordion-toggle"><i class="glyphicon glyphicon-stats" style="top:1px;"></i>&nbsp;统计图</a>
				</div>
				<div id="collapse0" class="panel-collapse collapse">
					<div class="panel-body" style="padding: 0px;">
						<div class="content_div" id="chart"></div>
					</div>
				</div>
			</div>
			<div class="panel">
				<div index="1" class="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapse1">
					<a class="accordion-toggle"><i class="glyphicon glyphicon-list-alt" style="top:1px;"></i>&nbsp;统计表</a>
				</div>
				<div id="collapse1" class="panel-collapse collapse">
					<div class="panel-body" style="padding: 0px;">
						<div class="extend-table"  style="width: 500px;float:left;">
							<div class="content_div" id="table" style="overflow-y:auto;max-height:425px"></div>
						</div>
					</div>
				</div>
			</div> 
        </div>
	</div>
</div>


	<div class="panel panel-default" id="switch-panel"  style="display:none;">
		<div class="panel-body">
			<div class="btn-group" role="group">
				<!-- <button type="button" class="btn btn-default active" value="pyzl">平原造林</button> -->
				<!-- <button type="button" class="btn btn-default" value="autumn">秋收成果</button> -->
			</div>
			<button type="button" class="btn btn-default" onclick="dqdb()">多期对比</button>
		</div>
		<div class="list-group">
			<!-- <a href="#" class="list-group-item active" value="2012">2012年</a>
			<a href="#" class="list-group-item" value="2013">2013年</a> 
			<a href="#" class="list-group-item" value="2014">2014年</a> 
			<a href="#" class="list-group-item" value="2015">2015年</a> -->
		</div>
	</div>
	<div id="type_div" style="opacity: 0;z-index:-1000;">
		<span class="glyphicon glyphicon-chevron-left" id="showBtn" title="显示"></span>
	</div>
	
	<div class="dkInfo" >
	</div>
	
	<div id="toolBar" style="display: none">
		<button class="btn btn-default" onclick="changeTable(this)" title="隐藏">
			<i class="fa fa-caret-square-o-down"></i>
		</button>
	</div>
	
	<div id="dkxq" class="modal fade">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">全部信息</h4>
	      </div>
	      <div class="modal-body" style="text-align: center;">
<!-- 	      	<table class="table dkInfoTable"> -->
<%-- 	      		<caption><i class="fa fa-user"></i></caption> --%>
<!-- 	      		<tbody> -->
<!-- 	      		</tbody> -->
<!-- 	      	</table> -->
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<div id="photoInfo" class="modal fade">
	  <div class="modal-dialog" style="width:775px;">
	    <div class="modal-content" style="width:775px;">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">竣工图</h4>
	      </div>
				<div class="modal-body" style="text-align: center;height:500px;">
					<iframe name="photo_iframe" src="<c:url value='/pageview/extend/${appname}/jgxt' />" width="100%" height="100%" frameborder="0"></iframe>
				</div>
			</div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<script type="text/javascript">
		var ctx = '${pageContext.request.contextPath}';
		var name = '${name}';
		var theme = '${theme}';
		var dataset = '${datainterface[0].id}';

		var logintitle = '${sessionScope.user.logintitle}';
		var usertitle = '${sessionScope.user.usertitle}';
		var userid = '${sessionScope.user.userid}';
		var userlevel = '${sessionScope.user.memo}';
		
		if('${userarea}'!=''){
			var usercode = $.parseJSON('${userarea}');
		}else{
			var usercode = null;
		}
		
		console.log(usercode);

		require.config({
			paths : {
				echarts : ctx + '/resources/echarts/js'
			}
		});
	</script>

	<%-- <script src="<c:url value=''/>/WEB-INF/uadpcache.json"></script> --%>
	<script src="<c:url value='/resources/onemap/omcfg.json'/>"></script>
	<script src="<c:url value='/resources/onemap/js/util.js'/>"></script>
	<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
	<script src="<c:url value='/uarp/pageview/onemap_mapview_bootstrap.js'/>"></script>
</body>
</html>