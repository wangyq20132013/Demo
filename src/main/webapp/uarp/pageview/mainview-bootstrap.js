var openPageStyle = "in"; //tabs 或 in

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
	initMenu();
});
function initMenu() {
	var navitems = parent.nav;
	var children = navitems[id].children;
	if(children && children.length >0) {
		var html = "";
		for(var i = 0; i < children.length; i++) {
			var tag_dl = $("<dl></dl>");  
			var tag_dt= $('<dt  id="'+children[i].ID+'" data-href="' + children[i].HREF + (children[i].HREF.indexOf("?") > -1 ? "&":"?") +'pvgresid=' + children[i].ID + '" data-title="' + children[i].NAME + '" isgroup="' + children[i].ISGROUP + '"><i class="Hui-iconfont Hui-iconfont-arrow2-right menu_dropdown-arrow"></i>' + children[i].NAME + '</dt>');
			var tag_dd= $("<dd></dd>");
			
			if(children[i].children && children[i].children.length) {
				var chileren2 = children[i].children;
				var tag_ul = $("<ul></ul>");
				for(var j = 0; j < chileren2.length; j++) {
					var tag_li = $('<li><a id="'+chileren2[j].ID+'" data-href="' + chileren2[j].HREF + (chileren2[j].HREF.indexOf("?") > -1 ? "&":"?") +'pvgresid=' + children[i].ID + '" data-title="' + chileren2[j].NAME + '" href="javascript:void(0)">' + chileren2[j].NAME + '</a></li>');
					tag_ul.append(tag_li);
				}
				tag_dd.append(tag_ul)
			}
			tag_dl.append(tag_dt).append(tag_dd);
			$("#menu .menu_dropdown").append(tag_dl);
		}
		$(".menu_dropdown ul").on("click", "li a", function() {
			$(".menu_dropdown ul").find("li a").removeClass("menu_active");
			$(this).addClass("menu_active");
			var url = $(this).attr("data-href");
			if(startsWith(url,"redirect:")) {
				window.location.href = cxt + url.substring(9);
			} else if(startsWith(url,"link:")) {
				openPage($(this).attr("data-title"), url.substring(5) + "?method=slogin&userid=" + parent.loginid);
			} else {
				openPage($(this).attr("data-title"), cxt + url);
			}
		});
		menuFold(".menu_dropdown dl dt", ".menu_dropdown dl dd", "fast", 1, "click");
	}
}

function initPage(title, url) {
	if(openPageStyle == 'in') {
		$("#tabs").hide();
		$("#page").show();
		$("#page").attr("src", url);

	} else if(openPageStyle == 'tabs') {
		$("#page").hide();
		$("#tabs").show();
		Hui_admin_tab({
			"data-href": url,
			"data-title": title
		});
	}
}

function openPage(title, url) {
	if(params) {
		url += "&params=" + encodeURIComponent(JSON.stringify(params));
	}
	if(openPageStyle == 'in') {
		$("#page").attr("src", url);
	} else if(openPageStyle == 'tabs') {
		Hui_admin_tab({
			"data-href": url,
			"data-title": title
		});
	}
}
/**
 * 菜单折叠
 */
function menuFold(obj, obj_c, speed, obj_type) {
	//绑定事件
	$(obj).on("click", function(event,node) {
		var href = $(this).attr("data-href");
		var title = $(this).attr("data-title");
		var isgroup = $(this).attr("isgroup");
		
		$(obj_c).slideUp(speed);
		$(obj).removeClass("selected");
		$(obj).removeClass("active");
		
		$(this).next().slideDown(speed, function(){
			if(href == undefined || href == '' || isgroup == '0') {
				$(this).addClass("active");
			}
			if(href != undefined && href != '' && href.indexOf("/") != -1) {
				$(obj_c).find("li a").removeClass("menu_active");
				openPage(title, cxt + href)
			}
			if(node){
				$(node).trigger("click");
			}
		}).end().addClass("selected");
		
	});
	//如果有menuid则跳转至该页面，否则默认跳转至第一个页面
	if(parent.initMenuId){
		node = $("#"+parent.initMenuId);
		if(node){
			if($(node).get(0).tagName != 'DT'){
				$(node).parentsUntil("dl").parent().find("dt").trigger("click",[node]);
			}else{
				$(node).trigger("click");
			}
		}
		parent.initMenuId = undefined;
	}else{
		$(obj + ":first").trigger("click");
	}
}
/* =======================================================================
 * 左侧菜单-隐藏显示
 * ======================================================================== */
function displaynavbar(obj){
	if($(obj).hasClass("open")){
		$(obj).removeClass("open");
		$("body").removeClass("big-page");
	} else {
		$(obj).addClass("open");
		$("body").addClass("big-page");
	}
}
function bindNav(){
	$(".menu li").find("a").on("click",function(){
		var url = $(this).attr("url");
		$(".menu li").removeClass("active");
		$(this).parent().addClass("active");
		$("#page").attr("src", cxt + url);
		
	});
}
