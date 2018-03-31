<%@page import="com.at21.db.JdbcTemplate"%>
<%@page import="com.at21.util.GenerateTreeCode"%>
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
<title>${buisname}</title>
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/develop/${appname}/css/style.css'/>"></link>

<script src="<c:url value='/resources/bootstrap/js/jquery-1.9.1.min.js' />"></script>
</head>

<body>
	<form id="userform">
		<div class="col-sm-12 text-center">
			<div class="form-group">
				<label class="col-xs-3 control-label">用户：</label>
				<div class="col-xs-8">
					<input type="text" class="form-control" name="logintitle"
						id="logintitle" value="" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 control-label">电话号码：</label>
				<div class="col-xs-8">
					<input type="text" class="form-control" name="mobilephone"
						id="mobilephone" value="" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 control-label">地址：</label>
				<div class="col-xs-8">
					<input type="text" class="form-control" name="laddress"
						id="laddress" value="" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 control-label">邮箱：</label>
				<div class="col-xs-8">
					<input type="text" class="form-control" name="email" id="email"
						value="" />
				</div>
			</div>
			<div class="form-group" id="div_zzjg">
				<label class="col-xs-3 control-label">所属组织机构：</label>
				<div class="col-xs-8">
					<input type="text" class="form-control" name="zzjg" id="zzjg"
						value="" readonly />
				</div>
			</div>
		</div>
	</form>
</body>
<script>
	//查看用户个人信息
	$(function(){
		
		var result = null;
		$.ajax({
			type:"post",
			dataType:"json",
			contentType: "application/json",
			url : cxt + "/datainterface/getdata/list/queryUserInformation",
			async:true,
			success:function(data){
				var datas=data.data[0];
				for(var k in datas){
					if(datas[k]==null){
						datas[k]="";
					}
				}
				$("#logintitle").val(datas.LOGINTITLE);
				$("#mobilephone").val(datas.LMOBILEPHONE);
				$("#laddress").val(datas.LADDRESS);
				$("#lemail").val(datas.LEMAIL);
				
				$.ajax({
			type:"post",
			dataType:"json",
			contentType: "application/json",
			url : cxt + "/datainterface/getdata/list/queryOrganizationCode",
			async:true,
			success:function(data){
				if(data.data.length>0){
				var codes;
				if (data.data[0].USERWBSCODE.length==12){
					codes="'"+data.data[0].USERWBSCODE.substring(0,3)+"','"+data.data[0].USERWBSCODE.substring(0,6)+"','"+data.data[0].USERWBSCODE.substring(0,9)+"','"+data.data[0].USERWBSCODE+"'";
				}else if(data.data[0].USERWBSCODE.length==9){
					codes="'"+data.data[0].USERWBSCODE.substring(0,3)+"','"+data.data[0].USERWBSCODE.substring(0,6)+"','"+data.data[0].USERWBSCODE+"'";
				}else if(data.data[0].USERWBSCODE.length==6){
					codes="'"+data.data[0].USERWBSCODE.substring(0,3)+"','"+data.data[0].USERWBSCODE+"'";
				}else if (data.data[0].USERWBSCODE.length==3){
					codes="'"+data.data[0].USERWBSCODE+"'";
				}
				result = {"code":codes};
				
				$.ajax({
			type:"post",
			dataType:"json",
			contentType: "application/json",
			url : cxt + "/datainterface/getdata/list/queryOrganizationName",
			data: JSON.stringify(result),  
			async:true,
			success:function(data){
				var datas=data.data;
				var zzjg="";
				for(var i=0;i<datas.length;i++){
					zzjg+="/"+datas[i].USERTITLE
				}
				zzjg=zzjg.substring(1,zzjg.length)
				$("#zzjg").val(zzjg);
			}
		});
			}
			}
		});
			}
		});
	})
	
	//保存个人信息
	function userinformationsave(){
		if($("form").validate()) {
			if($("form").valid()) {
				var resultmap = {"logintitle":$("#logintitle").val(),"lmobilephone":$("#mobilephone").val(),"laddress":$("#laddress").val(),"lemail":$("#email").val()};
				$.ajax({
					type:"post",
					dataType:"json",
					contentType: "application/json",
					url : cxt + "/datainterface/savedata/saveUserInformation",
					data: JSON.stringify(resultmap),  
					async:true,
					success:function(data){
						closeModal();
						parent.window.$(".dropDown_A").text($("#logintitle").val());
					}
				});
			}
		}
	}
	
	</script>
</html>