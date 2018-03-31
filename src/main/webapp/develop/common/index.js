$(function() {
	$("#main").css("height",$(window).height()-80);
	$("#Hui-navlist ul li a").click(function(){
		$("#Hui-navlist ul li").removeClass("active");
		$(this).parent().addClass("active");
		var isgroup = $(this).attr("isgroup");
		if(isgroup == 0){
			var children = $(this).attr("children");
			var jsonArr = JSON.parse(children);
			$("#main").attr("src", cxt + "/index/main?params="+JSON.stringify(jsonArr));
		}else{
			var url = $(this).attr("url");
			$("#main").attr("src", cxt + url);
		}
	});
	$("#main").attr("src", cxt + $($("#Hui-navlist ul li")[0]).children().attr("url"));
	
	
	var result = {"user":user};
	$.ajax({
		type:"post",
		dataType:"json",
		contentType: "application/json",
		url : cxt + "/datainterface/getdata/list/queryYHDWXX",
		data: JSON.stringify(result),  
		async:true,
		success:function(data){
			if(data.data.length==0){
				$("#yhdwxx").hide();
			}
		}
	})
});

/**
 * 修改密码
 */
function updatepwd(user) {
	$("#oldpwd").val("");
	$("#newpwd").val("");
	$("#newpwdagain").val("");
   $('#userupdata').modal('show');
}

function usersave(){
	var oldpwd=$("#oldpwd").val();
	var newpwd=$("#newpwd").val();
	var newpwdagain=$("#newpwdagain").val();
	if(newpwd!=newpwdagain){
		alert("两次输入密码不一致");
	}else{
		$.ajax({
				type : "post",
				url : cxt + "/login/changePassword",
				async : false,
				dataType : "text",
				data: {"password": oldpwd, "newPassword": newpwd},
				success : function(data) {
					if(data.indexOf("true")!=-1){
						$('#userupdata').modal('hide')
					}else{
						alert("修改失败");
					}
					
				}
			});
	}
}

//查看用户个人信息
function userinformation(user){
	//$("#_userinformation").text("用户个人信息");
	$("#_userinformation").empty();
	var result = {"user":user};
	$.ajax({
		type:"post",
		dataType:"json",
		contentType: "application/json",
		url : cxt + "/datainterface/getdata/list/queryUserInformation",
		data: JSON.stringify(result),  
		async:true,
		success:function(data){
			var datas=data.data[0];
			for(var k in datas){
				if(k=="用户ID"){
					result = {"userlid":datas[k]};
				}else{
					if(datas[k]==null){
						datas[k]="";
					}
					$("#_userinformation").append('<div class="div_user_left"><div class="user_left">'+k+':</div></div><div class="user_in"></div><div class="div_user_right"><div class="user_right">'+datas[k]+'</div></div>');
				}
				
			}
			
			$.ajax({
		type:"post",
		dataType:"json",
		contentType: "application/json",
		url : cxt + "/datainterface/getdata/list/queryOrganizationCode",
		data: JSON.stringify(result),  
		async:true,
		success:function(data){
			if(data.data.length>0){
			var codes;
			if(data.data[0].USERWBSCODE.length==9){
				codes="'"+data.data[0].USERWBSCODE.substring(0,3)+"','"+data.data[0].USERWBSCODE.substring(0,6)+"'";
			}else if(data.data[0].USERWBSCODE.length==6){
				codes="'"+data.data[0].USERWBSCODE.substring(0,3)+"'";
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
			$("#_userinformation").append('<div class="div_user_left"><div class="user_left">所属组织机构:</div></div><div class="user_in"></div><div class="div_user_right"><div class="user_right">'+zzjg+'</div></div>');
		}
	});
		}
		}
	});
		}
	});
	
		
   $('#userinformation').modal('show');
}


//养护单位信息
function yhdwinformation(user){
	//$("#_userinformation").text("养护单位信息");
	$("#_yhdwinformation").empty();
	var result = {"user":user};
	$.ajax({
		type:"post",
		dataType:"json",
		contentType: "application/json",
		url : cxt + "/datainterface/getdata/list/queryYHDWXX",
		data: JSON.stringify(result),  
		async:true,
		success:function(data){
			if(data.data.length>0){
				var datas=data.data[0];
				$("#_yhdwinformation").append('<div style="display:none"><div class="div_pwd"><div class="div_pwd_left">养护单位名称:</div></div><div class="pwd_in"></div><div class="div_pwd"><div class="input_pwd"><input type="text" class="form-control" name="yhuuid" id="yhuuid" value="'+datas.UUID+'"/></div></div></div>');
				$("#_yhdwinformation").append('<div class="div_pwd"><div class="div_pwd_left">养护单位名称:</div></div><div class="pwd_in"></div><div class="div_pwd"><div class="input_pwd"><input type="text" class="form-control" name="yhdwmc" id="yhdwmc" value="'+datas.YHDWMC+'"/></div></div>');
				$("#_yhdwinformation").append('<div class="div_pwd"><div class="div_pwd_left">办公地点:</div></div><div class="pwd_in"></div><div class="div_pwd"><div class="input_pwd"><input type="text" class="form-control" name="bgdd" id="bgdd" value="'+datas.BGDD+'"/></div></div>');
				$("#_yhdwinformation").append('<div class="div_pwd"><div class="div_pwd_left">联系电话:</div></div><div class="pwd_in"></div><div class="div_pwd"><div class="input_pwd"><input type="text" class="form-control" name="lxdh" id="lxdh" value="'+datas.LXDH+'"/></div></div>');
				/*$("#_userinformation").append('<div class="div_user_left"><div class="user_left">养护单位名称:</div></div><div class="user_in"></div><div class="div_user_right"><div class="user_right">'+datas.YHDWMC+'</div></div>');
				$("#_userinformation").append('<div class="div_user_left"><div class="user_left">办公地点:</div></div><div class="user_in"></div><div class="div_user_right"><div class="user_right">'+datas.BGDD+'</div></div>');
				$("#_userinformation").append('<div class="div_user_left"><div class="user_left">联系电话:</div></div><div class="user_in"></div><div class="div_user_right"><div class="user_right">'+datas.LXDH+'</div></div>');*/
				$('#yhdwinformation').modal('show');
			}
			
		}
	});
}
//保存养护单位信息
function savedwxx(){
	debugger;
	var resultmap = {"yhdwmc":$("#yhdwmc").val(),"bgdd":$("#bgdd").val(),"lxdh":$("#lxdh").val(),"yhuuid":$("#yhuuid").val()};
	$.ajax({
		type:"post",
		dataType:"json",
		contentType: "application/json",
		url : cxt + "/datainterface/savedata/saveDWXX",
		data: JSON.stringify(resultmap),  
		async:true,
		success:function(data){
		}
	});
}

//退出系统
function logoutSys() {
	swal({
		title: "你确定要退出系统吗？",
		text: "",
		type: 'warning',
		showCancelButton: true,
		closeOnConfirm: false,
		cancelButtonText: '取消',
		confirmButtonText: "确定",
		confirmButtonColor: '#ec6c62',
	}, function() {
		window.location.href = cxt +"/"+ sysname+"/logout";
	});
}

function openTab(pageviewtype,pageview){
	var url = cxt + "/pageview/"+pageviewtype+"/"+pageview;
	Hui_admin_tab({
		"data-href":url,
		"data-title":pageview
	});
}