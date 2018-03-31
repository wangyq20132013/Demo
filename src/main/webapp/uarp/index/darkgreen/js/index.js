var navitems = {};

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
	showIndex();
	initNavItems();
	$("#Hui-navlist ul li a").click(function(){
		$("#Hui-navlist ul li").removeClass("active");
		$(this).parent().addClass("active");
		var id = $(this).attr("id");
		var isgroup = $(this).attr("isgroup");
		if(isgroup == 0){
			$("#main").attr("src", cxt + "/index/graind?mainPage=main&id="+id);
		}else{
			if(url){
				var url = $(this).attr("url");
				if(startsWith(url,"redirect:")) {
					window.location.href = cxt + url.substring(9);
				} else if(startsWith(url,"link:")) {
					$("#main").attr("src", url.substring(5) + "?method=slogin&userid=" + loginid);
				} else {
					$("#main").attr("src", cxt + url);
				}
			}
		}
	});
	if($("#Hui-navlist ul li a[isactive='1']")[0]) {
		$($("#Hui-navlist ul li a[isactive='1']")[0]).click();
	} else {
		$($("#Hui-navlist ul li a")[0]).click();
	}
	var result = {"user":user};
});

function initNavItems(){
	if(navString != ''){
		var items = $.parseJSON(navString);
		for(var i=0;i<items.length;i++){
			navitems[items[i].ID] = items[i];
		}
	}
}

/**
 * 默认展示的首页
 */
function showIndex(){
	var li_0 = $("#Hui-navlist ul li")[0];
	var a = $(li_0).find("a");
	var id = $(a).attr("id");
	var isgroup = $(a).attr("isgroup");
	if(isgroup == 0){
		var children = $(a).attr("children");
		//var jsonArr = JSON.parse(children);
		$("#main").attr("src", cxt + "/index/graind?mainPage=main&id="+id);
	}else{
		var url = $(a).attr("url");
		if(url){
			$("#main").attr("src", cxt + url);
		}
	}
}
//初始化菜单栏
var initMenuId = "";
function showPage(navid, meunid){
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