var controls = {};
var control = {};
control.name = 'fullScreen';
control.title = '全屏';
control.icon = 'glyphicon glyphicon-fullscreen';
control.event = 'fullScreen';
controls["fullscreen"] = control;
var control = {};

control.name = 'globe';
control.title = '全图';
control.icon = 'glyphicon glyphicon-globe';
control.event = 'zoomToExtent';
controls["globe"] = control;

var control = {};
control.name = 'move';
control.title = '平移';
control.icon = 'glyphicon glyphicon-move';
control.event = 'move';
controls["move"] = control;

var control = {};
control.name = 'zoomin';
control.title = '放大';
control.icon = 'glyphicon glyphicon-zoom-in';
control.event = 'zoomin';
controls["zoomin"] = control;

var control = {};
control.name = 'zoomout';
control.title = '缩小';
control.icon = 'glyphicon glyphicon-zoom-out';
control.event = 'zoomout';
controls["zoomout"] = control;

var control = {};
control.name = 'measureline';
control.title = '测距';
control.icon = 'glyphicon glyphicon-wrench';
control.event = 'measureLine';
controls["measureline"] = control;

var control = {};
control.name = 'measurearea';
control.title = '测面';
control.icon = 'glyphicon glyphicon-unchecked';
control.event = 'measureArea';
controls["measurearea"] = control;

control = {};
control.name = 'pointSearch';
control.title = '点查询';
control.icon = 'glyphicon glyphicon-info-sign';
control.event = 'pointSearch';
controls["pointsearch"] = control;

control = {};
control.name = 'boxSearch';
control.title = '框查询';
control.icon = 'glyphicon glyphicon-retweet';
control.event = 'boxSearch';
controls["boxsearch"] = control;

control = {};
control.name = 'polygonSearch';
control.title = '多边形查询';
control.icon = 'glyphicon glyphicon-search';
control.event = 'polygonSearch';
controls["polygonsearch"] = control;

control = {};
control.name = 'clear';
control.title = '清除';
control.icon = 'glyphicon glyphicon-trash';
control.event = 'mapClear';
controls["clear"] = control;

control = {};
control.name = 'print';
control.title = '打印';
control.icon = 'glyphicon glyphicon-print';
control.event = 'print';
controls["print"] = control;

control = {};
control.name = 'buffertool';
control.title = '缓冲';
control.icon = 'glyphicon glyphicon-modal-window';
controls["buffertool"] = control;

control = {};
control.name = 'drawtool';
control.title = '绘制';
control.icon = 'glyphicon glyphicon-pushpin';
controls["drawtool"] = control;

control = {};
control.name = 'drawpoint';
control.title = '绘点';
control.icon = 'glyphicon glyphicon-pushpin';
control.event = 'drawpoint';
controls["drawpoint"] = control;

control = {};
control.name = 'drawline';
control.title = '绘线';
control.icon = 'glyphicon glyphicon-pushpin';
control.event = 'drawline';
controls["drawline"] = control;

control = {};
control.name = 'drawpolygon';
control.title = '绘面';
control.icon = 'glyphicon glyphicon-pushpin';
control.event = 'drawpolygon';
controls["drawpolygon"] = control;




function toggletools() {
	if ($("#toggletoolicon").attr("class") == "glyphicon glyphicon-backward") {
		$("#toggletoolicon").removeClass("glyphicon glyphicon-backward")
				.addClass("glyphicon glyphicon-forward");
	} else {
		$("#toggletoolicon").removeClass("glyphicon glyphicon-forward")
				.addClass("glyphicon glyphicon-backward");
	}
	$("#basetool").toggle();
	$("#buffertool").toggle();
	$("#drawtool").toggle();
}

function toggletext() {
	if ($("#toggletexticon").attr("class") == "glyphicon glyphicon-resize-small") {
		$("#toggletexticon").removeClass("glyphicon glyphicon-resize-small")
				.addClass("glyphicon glyphicon-resize-full");
		$(".tooltext").hide();
	} else {
		$("#toggletexticon").removeClass("glyphicon glyphicon-resize-full")
				.addClass("glyphicon glyphicon-resize-small");
		$(".tooltext").show();
	}
}

function initChangeTools(style){
    var maptoolbarchange = $('#maptoolbar_bootstrap');
    if(maptoolbarchange.length == 0){
    	var maptoolbar = '<div id="maptoolbar_bootstrap">';
    	maptoolbar += '<div class="btn-group" role="group" aria-label="" id="basetool">';
    	maptoolbar += '</div>';
    	maptoolbar += '<div class="btn-group" role="group">';
    	maptoolbar += '<button type="button" class="btn btn-'+style+' btn-sm" onclick="toggletools();" title="切换工具条">';
    	maptoolbar += '<span id="toggletoolicon" class="glyphicon glyphicon-backward" aria-hidden="true"></span>';
    	maptoolbar += '</button>';
    	maptoolbar += '<button type="button" class="btn btn-'+style+' btn-sm" onclick="toggletext();" title="切换文字">';
    	maptoolbar += '<span id="toggletexticon" class="glyphicon glyphicon-resize-full" aria-hidden="true"></span>';
    	maptoolbar += '</button>';
    	maptoolbar += '</div>';
    	maptoolbar += '</div>';
    	
    	$("#map").append(maptoolbar);
    }
}

function setToolActive(name){
	mapClear();
	toolstatus = name;
}

/**
 * 
 * @param tools:json配置
 * @param theme:default,primary,info
 * @param style:icon,icontext
 */
function initBootstrapTools(tools,theme,style){
	if(tools == undefined) return;
	if(!style){
		style = 'default';
	}

	for(var key in tools){
		var control = controls[key];
		if(!control){
			console.log('控件【'+key+'】暂时未定义');
			continue;
		}
		if(typeof tools[key] == 'boolean' && tools[key] == false){
			continue;
		}
		if(typeof tools[key] == 'object' && tools[key].show == false){
			continue;
		}
		
		initChangeTools(style);

		var name = control.name;
		var title = control.title;
		var icon = control.icon;
		var event = control.event;
		var element = '<button id="' + name
				+ '" type="button" class="btn btn-'+style+' btn-sm" title="'
				+ title + '" onclick="setToolActive(\''+name+'\');' + event + '();"><span class="' + icon
				+ '" aria-hidden="true"></span><span class="tooltext">&nbsp;'
				+ title + '</span></button>';
		
		if(name == 'buffertool'){
			element = '<div class="btn-group" role="group" id="buffertool">';
			element += '<button type="button" class="btn btn-'+style+' dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="'+ title + '">';
			element += '<span class="' + icon+ '" aria-hidden="true"></span>';
			element += '<span class="tooltext">&nbsp;'+ title + '</span> <span class="caret"></span>';
			element += '</button>';
			element += '<ul class="dropdown-menu" style="min-width: 80px">';
			element += '<li><a href="javascript:void(0)" onclick="setToolActive(\''+name+'\');pointbuffer();"><i class="fa fa-map-marker"></i>&nbsp;点</a></li>';
			element += '<li><a href="javascript:void(0)" onclick="setToolActive(\''+name+'\');linebuffer();"><i class="fa fa-vine"></i>&nbsp;线</a></li>';
			element += '<li><a href="javascript:void(0)" onclick="setToolActive(\''+name+'\');polygonbuffer()"><i class="fa fa-bookmark-o fa-rotate-270"></i>&nbsp;面</a></li>';
			element += '</ul>';
			element += '</div>';
		}
		
		if(name == 'drawtool'){
			element = '<div class="btn-group" role="group" id="drwatool">';
			element += '<button type="button" class="btn btn-'+style+' dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="'+ title + '">';
			element += '<span class="' + icon+ '" aria-hidden="true"></span>';
			element += '<span class="tooltext">&nbsp;'+ title + '</span> <span class="caret"></span>';
			element += '</button>';
			element += '<ul class="dropdown-menu" style="min-width: 80px">';
			element += '<li><a href="javascript:void(0)" onclick="setToolActive(\''+name+'\');drawpoint();"><i class="fa fa-map-marker"></i>&nbsp;点</a></li>';
			element += '<li><a href="javascript:void(0)" onclick="setToolActive(\''+name+'\');drawline();"><i class="fa fa-vine"></i>&nbsp;线</a></li>';
			element += '<li><a href="javascript:void(0)" onclick="setToolActive(\''+name+'\');drawpolygon();"><i class="fa fa-bookmark-o fa-rotate-270"></i>&nbsp;面</a></li>';
			element += '</ul>';
			element += '</div>';
		}
		
		$("#basetool").append(element);
		
		if(typeof tools[key] == 'object' && tools[key].active == true){
			eval(event+"()");
		}
	}
	
	if(!style){
		toggletext();
	}
}


/**
 * 
 * @param tools:json配置
 * @param theme:default,primary,info
 * @param style:icon,icontext
 */
function initBootstrapExtendTools(tools,theme,style){
	if(tools == undefined) return;
	if(!style){
		style = 'default';
	}

	for(var i=0;i<tools.length;i++){
		initChangeTools(style);
		
		var name = tools[i].name;
		var title = tools[i].title;
		var icon = tools[i].icon;
		var event = tools[i].click;
		var element = '<button id="' + name
				+ '" type="button" class="btn btn-'+style+' btn-sm" title="'
				+ title + '" onclick="setToolActive(\''+name+'\');' + event + ';"><span class="' + icon
				+ '" aria-hidden="true"></span><span class="tooltext">&nbsp;'
				+ title + '</span></button>';
		
		$("#basetool").append(element);
		
		if(tools[i].active && tools[i].active == true){
			eval(event);
		}
	}
	
	if(!style){
		toggletext();
	}
}
