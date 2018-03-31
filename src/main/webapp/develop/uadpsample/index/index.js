var nav = new Object;
$(function() {
	initNavItems();
	$(".nav-tab a").click(function(){
		$(".nav-tab").removeClass("active");
		$(this).parent().addClass("active");
		var isgroup = $(this).attr("isgroup");
		if(isgroup == 0){
			var id = $(this).attr("id");
			var children = $(this).attr("children");
			var url = cxt + "/index/"+appname+"?mainPage=mainview&id="+id+"&pvgresid="+id;
			if(params) {
				url += "&params=" + encodeURIComponent(JSON.stringify(params));
			}
			$("#main").attr("src", url);
		}else{
			var url = $(this).attr("url");
			if(url.startsWith("redirect:")) {
				window.location.href = cxt + url.substring(9);
			} else if(url.startsWith("link:")) {
				$("#main").attr("src", url.substring(5) + "?method=slogin&userid=" + loginid);
			} else {
				if(params) {
					url += "&params=" + encodeURIComponent(JSON.stringify(params));
				}
				$("#main").attr("src", cxt + url);
			}
		}
	});
	if(params.navid){
		initLoadPage(params.navid,params.meunid);
	}else{
		$($(".nav-tab a")[1]).trigger("click");
	}
	
	// 获取系统数据同步更新时间
	getCurrentTime();
});
function initNavItems(){
	if(navitems.length >0){
		for(var i=0;i<navitems.length;i++){
			nav[navitems[i].ID] = navitems[i];
		}
	}
}

//初始化菜单栏
var initMenuId;
function initLoadPage(navid, meunid){
	$("#"+navid).trigger("click");
	initMenuId = meunid;
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
		window.location.href = cxt +"/waterassets/logout";
	});
}

/*获取当前时间*/
function getCurrentTime(){
	var currentTime=document.getElementById("currentTime");
	setInterval(function(){
		var now=new Date();
		var year=now.getFullYear();
		var month=now.getMonth()+1;
		var day=now.getDate();
		var hh=now.getHours();
		var mm=now.getMinutes();
		var ss=now.getSeconds();
		var clock="当前时间："+year+"年 ";
		if(month<10)
			clock+="0";
		clock+=month+"月 ";
		if(day<10)
			clock+="0";
		clock+=day+"日 ";
		
		if(hh<10)
			clock+="0";
		clock+=hh+":";
		if(mm<10)
			clock+="0";
		clock+=mm+":";
		if(ss<10)
			clock+="0";
		clock+=ss;
		currentTime.innerHTML = clock;
	},500);
};
