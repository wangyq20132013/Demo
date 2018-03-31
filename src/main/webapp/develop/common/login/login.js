var flag=true;
$(function(){
	document.onkeydown = keydown;
	refreshVerifyCode();
	$("#rrandom").click(function() {
		refreshVerifyCode();
	});
	
	
});
function checkIdCode() {
	var res = false;
	var verifyCode = $("#verifyCode").val();
	if(verifyCode != "") {
		res = true;
	}
	return res;
}

function _checkNameAndPwd(userName, userPwd) {
	var result = false;
	result = _checkUserName(userName, true);
	result = result && _checkPassWord(userPwd, true);
	return result;
}

function _checkUserName(userName, issubmit) {
	if (userName == null || userName == "") {
		if (issubmit) {
			 $.messager.alert('提示信息','请输入用户名!','info');
			clearLoginFeilds();
		}
		return false;
	}
	if (!checkUserName(userName)) {
		if (issubmit) {
			 $.messager.alert('提示信息','用户名或密码错误!','info');
			clearLoginFeilds();
		}
		return false;
	}
	return true;
}

function _checkPassWord(userPwd, issubmit) {
	if (userPwd == null || userPwd == "") {
		if (issubmit) {
			 $.messager.alert('提示信息','请输入密码!','info');
			clearLoginFeilds();
		}
		return false;
	}
	if (!checkepassword(userPwd)) {
		if (issubmit) {
			 $.messager.alert('提示信息','用户名或密码错误!','info');
			clearLoginFeilds();
		}
		return false;
	}
	return true;
}

function checkUserName(userName) {
	var str = userName;
	// 在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
	var Expression = /^([^\\'"+_|&#%<>\s-]+)?$/;
	var objExp = new RegExp(Expression);
	if (objExp.test(str) == true) {
		return true;
	} else {
		return false;
	}
}

function checkepassword(userPwd) {
	// 密码由6-20位的字母、数字、下划线和点“.”组成
	var str = userPwd;
	var Expression = /^([A-Za-z0-9]|[._]){0,19}$/;
	var objExp = new RegExp(Expression);
	if (objExp.test(str) == true) {
		return true;
	} else {
		return false;
	}
}


$("#login").click=function(){
	alert(111);
}

function login(){

			var userName = $("#loginName").val();
			var userPwd = $("#password").val();
			var verifyCode = $("#verificationCode").val();
			if(userName == ""||userPwd ==""){
				flag = false;
				swal({
					title:'',
					text:'用户名或密码不能为空，请重新输入!',
					type:"warning",
					showCancelButton:true,
					closeOnConfirm: true,
					allowOutsideClick:false,
					confirmButtonText: "确定",
					cancelButtonText: '取消',
//					timer:888,
					showConfirmButton:true,
					showCancelButton:false
				}, function() {
					flag = true;
					reset();
				});
				/*alert('用户名或密码不能为空，请重新输入!');*/
			} else if (checkIdCode()) {
				if (_checkNameAndPwd(userName, userPwd)) {
					$.ajax({
						type : "post",
						url : rootpath + "/login/login",
						async : false,
						dataType : "text",
						data: {"loginname": userName, "password": encode64(userPwd), "verificationCode" : verifyCode},
						success : function(data) {
							var json = eval("("+data+")");
							if(json.success) {
								window.location.href = rootpath + "/index/" + appName;
							} else if (json.info == "password-wrong") {
								flag = false;
								swal({
									title:'',
									text:'用户名或密码错误!',
									type:"error",
									showCancelButton:true,
									closeOnConfirm: true,
									allowOutsideClick:false,
									confirmButtonText: "确定",
									cancelButtonText: '取消',
//									timer:888,
									showConfirmButton:true,
									showCancelButton:false
								}, function() {
									flag = true;
									reset();
								});
								/*alert('用户名或密码错误!');*/
							} else {
								flag = false;
								swal({
									title:'',
									text:json.info,
//									text:'用户名或密码错误!',
									type:"error",
									showCancelButton:true,
									closeOnConfirm: true,
									allowOutsideClick:false,
									confirmButtonText: "确定",
									cancelButtonText: '取消',
//									timer:888,
									showConfirmButton:true,
									showCancelButton:false
								}, function() {
									flag = true;
									reset();
								});
								/*alert(json.info);*/
							}
						}
					});
				}
			} else {
				flag = false;
				swal({
					title:'',
					text:'验证码输入错误！',
					type:"error",
					showCancelButton:true,
					closeOnConfirm: true,
					allowOutsideClick:false,
					confirmButtonText: "确定",
					cancelButtonText: '取消',
//					timer:888,
					showConfirmButton:true,
					showCancelButton:false
				}, function() {
					flag = true;
					$("#verificationCode").val("");
					refreshVerifyCode();
				});
				/*alert('验证码输入错误！');*/
			}
			

}

function reset() {
	$("#loginName").val("");
	$("#password").val("");
	$("#verificationCode").val("");
	refreshVerifyCode();
}

function keydown(event) {
	if (event.keyCode == 13 && flag) {
		window.setTimeout(function(){
			login();
		}, 1);
	}
}

function refreshVerifyCode() {
	var timenow = new Date().getTime();
	$("#rrandom").attr("src", rootpath + "/plugins/urp/verificationcodeimage.jsp?d="+timenow);
}




