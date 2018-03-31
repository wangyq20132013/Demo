$(function() {
	$("#login").bind("click", login);
});
$("input[type='password']").keypress(function() {
	if(event.keyCode == 13) {
		login();
	}
});
$("input[type='text']").keypress(function() {
	if(event.keyCode == 13) {
		login();
	}
});
function login_backup(){
	window.location.href = cxt + "/admin/index";
}
function login() {
	var account = $("#account").val();
	var pwd = $("#pwd").val();
	var checkcode = $("#checkcode").val();
	if(account != null && account != "" && pwd != null && pwd != "") {
		if(checkcode != ''){
			var url = cxt + "/admin/login";
			$.ajax({
				type: "POST",
				dataType: "json",
				url: url,
				data: {
					"account": account,
					"password": pwd,
					"checkcode":checkcode
				},
				success: function(data) {
					console.log(data);
					if(data.success) {
						window.location.href = cxt + "/admin/index";
					} else{
						if(data.status == "codeError"){
							$("#checkcode").val("").focus();
						}else{
							$("#account").val("").focus();
							$("#pwd").val("");
							$("#checkcode").val("")
						}
						$("#info").html(data.msg);
						$("#checkimg").attr("src", cxt+"/checkcode.jsp?t="+new Date());
					}
				},
			});
		}else{
			$("#info").html("请输入验证码");
		}
		
	} else {
		$("#info").html("用户名或密码不能为空");
	}
}
