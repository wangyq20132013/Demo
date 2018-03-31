<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>统一应用管理系统</title>
<link rel="icon" href="img/favicon.ico">
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/font-awesome/css/font-awesome.min.css'/>"></link>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/uadp/css/style.css'/>"></link>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/uadp/css/pagemanage.css'/>"></link>
<script type="text/javascript">
	var cxt = '${pageContext.request.contextPath}';
</script>
</head>
<body>
	<div class="app-toolbar">
		<button onclick="addappinfo()"
			style="float: right; height: 38px; width: 182px; font-size: 25px; font-weight: 700;">
			<p class="glyphicon glyphicon-plus"></p>
			新建应用
		</button>
	</div>
	<ul id="sz" style="display: none;z-index: 1000;    position: absolute;">
		<li id="editappinfo" style="list-style-type: none;" onclick="editappinfo(this)"><a href="#">编辑</a></li>
		<li id="delappinfo" style="list-style-type: none;" onclick="delappinfo(this)"><a href="#">删除</a></li>
	</ul>
	<%-- <div class="col-md-4">
		<div class="small" style="text-align: center;border: 5px;">
			<img style="width: 300px;height: 300px;" title="预览" onclick="open()" src="${pageContext.request.contextPath}/uadp/image/icon_ztfw.png">
		</div>
		<!-- <p>
			<a class="btn btn-success"
				href="http://172.172.9.175:8888/SDWFS/admin/login.html"
				target="_blank">点我进入</a>
		</p> -->
	</div> --%>
	<!-- <table width="700px" cellpadding="10" align="left" style="margin:10px">
		<tbody><tr>
			<th width="30%">系统名称:</th>
			<td><input class="easyui-validatebox validatebox-text" maxlength="25" type="text" style="width:250px" id="ainfo.sysname" name="ainfo.sysname" data-options="width: 300,required:true,validType:['length[1,25]','character']" value="上海合作组织环境监测一张图"></td>
		</tr>
		<tr>
				<th>区域导航最顶层名称:</th>
				<td><input class="easyui-validatebox validatebox-text" maxlength="127" type="text" style="width:250px" id="ainfo.regiontop" name="ainfo.regiontop" data-options="width:300,validType:'length[0,127]'" value="上海合作组织环境监测一张图"></td>
		</tr>
		<tr>
			<th>系统英文名:</th>
			<td><input class="easyui-validatebox validatebox-text" type="text" id="ainfo.sysenname" name="ainfo.sysenname" data-options="width: 300,required:true,validType:['length[1,50]','character', 'isUnique']" value="shonemap"></td>
		</tr>
		<tr>
			<th>系统风格:</th>
			<td>
				<input type="radio" id="ainfo.theme" name="ainfo.theme" onclick="exchangeStatus(this)" value="darkblue" checked="">深蓝色
				<input type="radio" id="ainfo.theme" name="ainfo.theme" onclick="exchangeStatus(this)" value="darkgreen">深绿色
				<input type="radio" id="ainfo.theme" name="ainfo.theme" onclick="exchangeStatus(this)" value="develop">自定义
			</td>
		</tr>
		<tr>
			<th>登陆页:</th>
			<td><input class="easyui-validatebox validatebox-text" type="text" id="ainfo.loginpage" name="ainfo.loginpage" style="width:250px" data-options="width: 300,editable:false" value="" disabled="disabled"></td>
		</tr>
		<tr>
			<th>首页:</th>
			<td><input class="easyui-validatebox validatebox-text" type="text" id="ainfo.indexpage" name="ainfo.indexpage" style="width:250px" data-options="width: 300,editable:false" value="" disabled="disabled"></td>
		</tr>
		<tr>
			<th>版权信息:</th>
			<td><input class="easyui-validatebox validatebox-text" type="text" id="ainfo.copyright" name="ainfo.copyright" style="width:250px" data-options="width: 300,editable:false" value=""></td>
		</tr>
		<tr>
			<th>默认管理员:</th>
			<td><input class="easyui-validatebox validatebox-text" type="text" id="ainfo.defaultusername" name="ainfo.defaultusername" style="width:250px" data-options="width: 300,editable:false" value=""></td>
		</tr>
		<tr>
			<th>管理员密码:</th>
			<td><input class="easyui-validatebox validatebox-text" type="text" id="ainfo.defaultpwd" name="ainfo.defaultpwd" style="width:250px" data-options="width: 300,editable:false" value=""></td>
		</tr>
		<tr>
			<th>系统面积单位:</th>
			<td><input class="easyui-validatebox validatebox-text" type="text" id="ainfo.sysareaunit" name="ainfo.sysareaunit" style="width:250px" data-options="width: 300,editable:false" value=""></td>
		</tr>
		<tr>
			<th>系统单位换算比率:</th>
			<td><input class="easyui-numberbox numberbox numberbox-f validatebox-text" maxlength="30" style="width: 294px; height: 20px; line-height: 20px;" type="text" id="ainfo.sysarearadio" data-options="precision:2,width:300,required:true,validType:['length[0,30]','numberWithE']" value="0.0" numberboxname="ainfo.sysarearadio"><input type="hidden" name="ainfo.sysarearadio" value="0.00"></td>
		</tr>
		<tr>
			<th>是否当前系统:</th>
			<td><input type="radio" id="ainfo.currsystem" name="ainfo.currsystem" value="0" checked="">否
				<input type="radio" id="ainfo.currsystem" name="ainfo.currsystem" value="1">是
			</td>
		</tr>
		<tr>
			<th>对应的数据库ID:</th>
			<td><select id="dbselect" style="width:300px;" name="ainfo.dbid"></select></td>
		</tr>	
		<tr>
			<th>是否需要登录:</th>
			<td><input type="radio" id="ainfo.islogin" name="ainfo.islogin" value="0" checked="">否
				<input type="radio" id="ainfo.islogin" name="ainfo.islogin" value="1">是
			</td>
		</tr>
			
		<tr>
			<td colspan="2" align="center">
				<a href="javascript:void(0)" data-options="iconCls:'icon-ok'" class="easyui-linkbutton l-btn l-btn-small" onclick="submitForm()" group="" id=""><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">保  存</span><span class="l-btn-icon icon-ok">&nbsp;</span></span></a>
				<a href="javascript:void(0)" data-options="iconCls:'icon-cancel'" class="easyui-linkbutton l-btn l-btn-small" onclick="clearForm()" group="" id=""><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">重 置</span><span class="l-btn-icon icon-cancel">&nbsp;</span></span></a>
				<a href="javascript:void(0)" data-options="iconCls:'icon-ok'" class="easyui-linkbutton l-btn l-btn-small" onclick="previewApp()" group="" id=""><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">预  览</span><span class="l-btn-icon icon-ok">&nbsp;</span></span></a>
			</td>
		</tr>
	</tbody></table> -->
</body>
<script
	src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
<script src="<c:url value='/resources/layer/2.4/layer.js' />"></script>
<script src="<c:url value='/uarp/pageview/public-button.js' />"></script>
<script src="<c:url value='/uadp/js/myapp.js' />"></script>
</html>