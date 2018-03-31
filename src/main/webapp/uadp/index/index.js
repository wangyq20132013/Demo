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
	//nitNavItems();
	$(".nav-tab a").click(function(){
		$(".nav-tab").removeClass("active");
		$(this).parent().addClass("active");
		var isgroup = $(this).attr("isgroup");
		if(isgroup == 0){
			var id = $(this).attr("id");
			var children = $(this).attr("children");
			var url = cxt + "/admin/main?id="+id+"&pvgresid="+id;
			if(params) {
				url += "&params=" + encodeURIComponent(JSON.stringify(params));
			}
			$("#main").attr("src", url);
		}else{
			var url = $(this).attr("url");
			if(startsWith(url,"redirect:")) {
				window.location.href = cxt + url.substring(9);
			} else if(startsWith(url,"link:")) {
				$("#main").attr("src", url.substring(5) + "?method=slogin");
			} else {
				if(params) {
					url += "&params=" + encodeURIComponent(JSON.stringify(params));
				}
				$("#main").attr("src", cxt + url);
			}
		}
	});
	/*if(params.navid){
		initLoadPage(params.navid,params.meunid);
	}else{
		$($(".nav-tab a")[0]).trigger("click");
	}*/
	
	// 获取系统数据同步更新时间
	//getUpdateTime();
});
function initNavItems(){
	if(navitems.length >0){
		for(var i=0;i<navitems.length;i++){
			nav[navitems[i].id+""] = navitems[i];
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
/**
 * 获取系统数据同步更新时间
 */
function getUpdateTime(){
	$.ajax({
		type:"post",
		url: cxt +"/datainterface/getdata/list/getUpdateTime",
		async:true,
		success: function(data){
			if(data.data && data.data.length>0){
				var currentTime=document.getElementById("currentTime");
				currentTime.innerHTML = "<span class='glyphicon glyphicon-refresh'></span>&nbsp;" + data.data[0].TRACKDATE + "&nbsp;完成同步更新";
			}
		}
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

function fullScreen(el) {  
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,  
        wscript;  
   
    if(typeof rfs != "undefined" && rfs) {  
        rfs.call(el);  
        return;  
    }  
   
    if(typeof window.ActiveXObject != "undefined") {  
        wscript = new ActiveXObject("WScript.Shell");  
        if(wscript) {  
            wscript.SendKeys("{F11}");  
        }  
    }  
}  
  
function exitFullScreen(el) {  
    var el= document,  
        cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,  
        wscript;  
   
    if (typeof cfs != "undefined" && cfs) {  
      cfs.call(el);  
      return;  
    }  
   
    if (typeof window.ActiveXObject != "undefined") {  
        wscript = new ActiveXObject("WScript.Shell");  
        if (wscript != null) {  
            wscript.SendKeys("{F11}");  
        }  
  }  
}  
