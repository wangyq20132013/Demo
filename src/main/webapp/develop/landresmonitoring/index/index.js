var nav = new Object;
/** 
* 扩展startWith方法 
* @param str 
* @return 
*/ 
var startsWith = function(str,startstr){ 
	if(startstr==null||startstr==""||startstr.length==0||startstr.length>str.length) {
		return false; 
	}
	if(str.substr(0,startstr.length)==startstr) {
		return true; 
	}else{ 
		return false;
	}
	return true; 
}; 

$(function() {
	initNavItems();
	$(".navbar-nav li a").click(function(){
		var isgroup = $(this).attr("isgroup");
		if(isgroup == 0){
			$(".navbar-nav li").removeClass("active");
			$(this).parent().addClass("active");
			/*var id = $(this).attr("id");
			var children = $(this).attr("children");
			var url = cxt + "/index/"+appname+"?mainPage=mainview&id="+id;
			if(params) {
				url += "&params=" + encodeURIComponent(JSON.stringify(params));
			}
			$("#main").attr("src", url);*/
		}else{
			var isChildren = $(this).attr("isChildren");
			if(isChildren == '0'){
				$(this).parent().addClass("active");
			}else{
				$(".navbar-nav li").removeClass("active");
				$(this).parent().addClass("active");
			}
			
			var url = $(this).attr("url");
			if(startsWith(url,"redirect:")) {
				window.location.href = cxt + url.substring(9);
			} else if(startsWith(url,"link:")) {
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
		$($(".navbar-nav li a")[0]).trigger("click");
	}
	
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
		window.location.href = cxt +"/"+ sysname+"/logout";
	});
}

/*获取当前时间*/
function currentTime(){
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
