$(function(){
	bindNav();
});
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
