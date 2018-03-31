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

function login() {
	var account = $("#account").val();
	var pwd = $("#pwd").val();
	var checkcode = $("#checkcode").val();
	if(account != null && account != "" && pwd != null && pwd != "") {
		if(checkcode != ''){
			var url = cxt + "/login";
			$.ajax({
				type: "post",
				url: url,
				async: false,
				data: {
					"loginname": account,
					"password": pwd,
					"checkcode":checkcode
				},
				success: function(data) {
					console.log(data);
					if(data.success) {
						window.location.href = cxt + "/index/"+appname;;
					} else{
						$("#info").html(data.msg);
						$("#checkimg").attr("src", cxt+"/checkcode.jsp?t="+new Date());
						$("#checkcode").val("");
					}
				},
				error: function() {
					$("#info").html(data.msg);
				}
			});
		}else{
			$("#info").html("请输入验证码");
		}
		
	} else {
		$("#info").html("用户名或密码不能为空");
	}
}