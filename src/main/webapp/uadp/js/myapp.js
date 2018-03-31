$(function(){
	uadp.getData("list", "queryappinfo", {}, function(data) {
			if(data.data.length>0){
				for(var i = 0;i < data.data.length;i++){
				  	$("body").append('<div class="col-md-4">\
					  			<div class="small" style="text-align: center;border: 5px;height:400px;">\
					  				<img style="width: 300px;height: 250px;" title="预览"  src="'+cxt+'/uadp/image/icon_ztfw.png">\
					  				<a onclick="setshow(this)"  style="z-index: 1001;top: 130px;font-size: 24px;" class="glyphicon glyphicon-cog"></a>\
					  				<h2>'+data.data[i].REGIONTOP+'</h2>\
					  				<p>'+data.data[i].SYSNAME+'</p>\
					  			</div>\
				  			</div>');	
				    }
			}else{
				$("body").append('<div style="width: 100%;height: 100%;align-items: center;justify-content: center;text-align: center;margin-top: 21%;">\
							<img style=""   src="'+cxt+'/uadp/image/xinjian.png"></br></br>\
							<h1>开始创建你的第一个应用吧</h1></br>\
							<button onclick="addappinfo()" style="height: 38px;width: 182px; font-size: 25px; font-weight: 700;"><p class="glyphicon glyphicon-plus"></p>创建应用</button>\
						</div>')
			}
		
			
	});
})
function editappinfo(obj){
	debugger;
}
function addappinfo(){
	
}
function delappinfo(obj){
	debugger;
}
function setshow(obj){debugger;
	$("#delappinfo").attr("name",obj.name);
	$("#editappinfo").attr("name",obj.name);
	if(parseInt(obj.getBoundingClientRect().top)==$("#sz").css("top").substr(0,$("#sz").css("top").indexOf(".")==-1?$("#sz").css("top").indexOf("px"):$("#sz").css("top").indexOf("."))&&parseInt(obj.getBoundingClientRect().left)==$("#sz").css("left").substr(0,$("#sz").css("left").indexOf(".")==-1?$("#sz").css("left").indexOf("px"):$("#sz").css("left").indexOf("."))){
		if($("#sz").css("display")!="none"){
			$("#sz").hide();
		}else{
			$("#sz").show();
		}
	}else{
		$("#sz").css("top",obj.getBoundingClientRect().top);
		$("#sz").css("left",obj.getBoundingClientRect().left);
		$("#sz").show();
	}
	
}
function openappinfo(){
	window.open('http://172.172.9.175:8888/SDWFS/admin/login.html')
}