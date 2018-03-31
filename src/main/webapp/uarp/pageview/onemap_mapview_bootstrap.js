var selectedNode = "";// 记录选中的行政区划节点
var selectedLevel = 1;// 记录选中的行政区划级别
var selectedMenu = "pyzl";// 记录选中的菜单参数（平原造林/?）
var selectedNav = "";// 记录年份(2012/2013/2014/2015)
var parseResult = [];// 存储解析后的数据

var wkt = null;
var intersect_table;

var city = undefined;
var qx = undefined;
var xz = undefined;
var cun = undefined;
var xzqh_code = undefined;

var cfgData;
var footTableStatus = false;
$(function() {
	// enter键绑定事件
	document.onkeydown = function() {
		if (event.keyCode == 13) {
			$(".searchXz img").click();
		}
	};
	parent.layer.load(2,{shade:0.3});
	initContent();

	initClickEvent();
	initDateTimePicker();

	initAccordion();

	// getXzqh();
	
	
	$('.titleright .panel-body').height($('.titleright').height() - $('.panel-heading').outerHeight() * 2);
	$('#chart').height($('.titleright .panel-body').height()-50);
	
	
	
});

function initDateTimePicker() {
//	$('#nf').datetimepicker({
//		startView : 4,
//		minView : 4,
//		maxView : 4,
//		todayHighlight : true,
//		language : 'zh-CN'
//	});
//
//	$('#yf').datetimepicker({
//		startView : 3,
//		minView : 3,
//		maxView : 3,
//		todayHighlight : true,
//		language : 'zh-CN'
//	});
//
//	var dateMonthArr = $('.datetimepicker-months');
//	for (var i = 0; i < dateMonthArr.length; i++) {
//		if (dateMonthArr[i].style.display == 'block') {
//			$(dateMonthArr[i]).find('thead').find('th').css('visibility',
//					'hidden');
//		}
//	}
//
//	$('#nf').datetimepicker().on('changeDate', function(ev) {
//		console.log(new Date(ev.date.valueOf()).getFullYear());
//	})
//
//	$('#yf').datetimepicker().on('changeDate', function(ev) {
//		console.log(new Date(ev.date.valueOf()).getMonth() + 1);
//	})

	$.ajax({
		type : "post",
		contentType : "application/json",
		dataType : 'json',
		url : ctx + "/datainterface/getdata/list/getDkMetadate",
		success : function(json) {
			for (var i = 0; i < json.data.length; i++) {
				$('form select').append('<option value="' + json.data[i].VALUE + '">'+ json.data[i].TEXT + '</option>');
			}
		}
	})

}

function initAccordion() {
	$('.panel-collapse').on(
			'shown.bs.collapse',
			function() {
				$(this).prev().attr('data-toggle', '');
				var panel_head = $('.panel-heading');
				for (var i = 0; i < panel_head.length; i++) {
					if ($(panel_head[i]).attr('href').substr(1) != $(this).attr('id')) {
						$(panel_head[i]).unbind();
						$(panel_head[i]).attr('data-toggle', 'collapse');

						$(panel_head[i]).bind(
								'click',
								function() {
									var index = $(this).attr("index");
									if (index == "0") {
										setTimeout(function() {
											$(".list-group").find("li.active").find("a").click();
										}, 10);

									}
								});

					}
				}
			})

	$(".panel-heading").eq(0).click();
	$('.extend-table').css('margin-left',($('#collapse0 .panel-body').width() - 500)/2);
}

function initClickEvent() {
	// 菜单面板显示或隐藏
	$("#type_div").click(function() {
		var status = $(this).find("span").attr("title");
		if (status == '隐藏') {
			$("#switch-panel").animate({
				left : '100px',
				opacity : '0'
			}, 500);
			$(this).find("span").attr("title", "显示");
			$(this).find("span").removeClass("glyphicon-chevron-left");
			$(this).find("span").addClass("glyphicon-chevron-right");
		} else {
			$("#switch-panel").animate({
				left : '22%',
				opacity : '1'
			}, 500);
			$(this).find("span").attr("title", "隐藏");
			$(this).find("span").removeClass("glyphicon-chevron-right");
			$(this).find("span").addClass("glyphicon-chevron-left");
		}

	});
	// 菜单按钮点击事件
	$(".btn-group").find("button").click(
			function() {
				$(this).siblings().removeClass("active");
				$(this).addClass("active");

				// 获取统计内容，图层名称
				selectedMenu = $(this).attr("value");
				selectedNav = $("#switch-panel").find("li.active").find("a")
						.attr("value");
				parseJsonData();

				var layername = parseResult[0];
				var chartSql = parseResult[1];
				var tableSql = parseResult[2];
				var chartTitle = parseResult[3];
				var tablename = parseResult[4];
				var legend = parseResult[5];
				intersect_table = tablename;

				// 统计图
				loadChart(chartSql, selectedNode + chartTitle);
				// 统计表
				loadTable(tableSql);
				
				// 加载图层
				// $("#iframe_map")[0].contentWindow.removeAllLayers();
				// $("#iframe_map")[0].contentWindow.addWms(layername);
				// $("#iframe_map")[0].contentWindow.addLegend(legend);

			});
	// 列表点击事件
	$(".list-group").find("li").find("a").click(function() {
		$(this).parent().siblings().removeClass("active");
		$(this).parent().addClass("active");

		// 获取统计内容，图层名称
		selectedNav = $(this).attr("value");
		selectedMenu = $("#switch-panel").find("button.active").attr("value");
		parseJsonData();

		var layername = parseResult[0];
		var chartSql = parseResult[1];
		var tableSql = parseResult[2];
		var chartTitle = parseResult[3];
		var tablename = parseResult[4];
		var legend = parseResult[5];
		intersect_table = tablename;

		// 统计图
		loadChart(chartSql, selectedNode + chartTitle);
		// 统计表
		loadTable(tableSql);
		// 加载图层
		// $("#iframe_map")[0].contentWindow.removeAllLayers();
		// $("#iframe_map")[0].contentWindow.addWms(layername);
		// $("#iframe_map")[0].contentWindow.addLegend(legend);
	});
	// 复选框点击
	$(".list-group li").find("input").click(function() {
		if ($(this).is(':checked')) {
			var layername = $(this).attr('layer');
			var legend = $(this).attr('legend');
			var title = $(this).attr('data-title');
			$("#iframe_map")[0].contentWindow.addWms(layername, title);
			$("#iframe_map")[0].contentWindow.addLegend(layername, legend);
		} else {
			var layername = $(this).attr('layer');
			$("#iframe_map")[0].contentWindow.removeWms(layername);
			$("#iframe_map")[0].contentWindow.removeLegend(layername);
		}
	});
	// $("#iframe_map")[0].onload = function(){
	// var checkArr = $(".list-group li").find("input");
	// for(var i = 0;i<checkArr.length;i++){
	// var layername = $(checkArr[i]).attr('layer');
	// var title = $(checkArr[i]).attr('data-title');
	// // var legend = $(this).attr('legend');
	// $("#iframe_map")[0].contentWindow.addWms(layername,title);
	// // $("#iframe_map")[0].contentWindow.addLegend(layername,legend);
	// }
	// }
}
// 切换功能
function menuClick(type) {
	window.location.href = ctx + "np/mainframe.jsp?type=" + type;
}

/**
 * 根据配置文件初始化内容
 */
function initContent() {debugger;
	var cfg = omcfg["menu"];
	// 读取配置文件，控制菜单显示
	$("#switch-panel").find(".btn-group").empty();
	$("#switch-panel").find(".list-group").empty();
	for ( var i in cfg) {
		var type = cfg[i].type;
		if (type == selectedMenu) {
			cfgData = cfg[i];
			var btn;
			if (i == 0) {
				btn = '<button type="button" style="width: 234px;" class="btn btn-default active" value="'+ cfg[i].type + '">' + cfg[i].name + '</button>';
			} else {
				btn = '<button type="button" style="width: 234px;" class="btn btn-default" value="'+ cfg[i].type + '">' + cfg[i].name + '</button>';
			}
			$("#switch-panel").find(".btn-group").append($(btn));
			selectedMenu = $("#switch-panel").find("button.active").attr("value");

			var navs = cfg[i].navs;

			for (var m = 0; m < navs.length; m++) {
				var a;
				if (m == 0) {
					li = '<li class="list-group-item active"><input type="checkbox" data-title="'
							+ navs[m].name
							+ '" layer="'
							+ navs[m].layer
							+ '" legend="'
							+ navs[m].legend
							+ '" year="'
							+ navs[m].type
							+ '"/><a value="'
							+ navs[m].type
							+ '"><img src="'+ctx+navs[m].legend+'"/>' + navs[m].name + '</a></li>';
				} else {
					li = '<li class="list-group-item"><input type="checkbox" data-title="'
							+ navs[m].name
							+ '" layer="'
							+ navs[m].layer
							+ '" legend="'
							+ navs[m].legend
							+ '" year="'
							+ navs[m].type
							+ '"/><a value="'
							+ navs[m].type
							+ '"><img src="'+ctx+navs[m].legend+'"/>' + navs[m].name + '</a></li>';
				}
				$("#switch-panel").find(".list-group").append($(li));
			}
			selectedNav = $("#switch-panel").find("li.active").find("a").attr("value");
		}
	}

	// 左侧树
	initTree();

	// 获取统计内容，图层名称
	parseJsonData();

	var layername = parseResult[0];
	var chartSql = parseResult[1];
	var tableSql = parseResult[2];
	var chartTitle = parseResult[3];
	var tablename = parseResult[4];
	var legend = parseResult[5];
	intersect_table = tablename;

	// 初始化行政区划查询
	$(".searchXz img").click(function() {
		var name = $("#search_text").val();
		if (name != null && name != "") {
			$("#home").treeview('search', [ name, {
				ignoreCase : true,
				exactMatch : false,
				revealResults : true
			} ]);

			if ($(".search-result")) {
				$(".search-result").click();
			}
		}
		// 去掉查询
		$("#home").treeview('clearSearch');

	});

	// 统计图
	loadChart(chartSql, selectedNode + chartTitle);
	// 统计表
	loadTable(tableSql);

}

/**
 * 初始化左侧树结构
 */
var maskStatus = false;
function initTree() {
	var text;// 根据登录者的等级（市、区县、乡镇、村），记录查询行政区划的字段
	switch (userlevel) {
	case '1':
		text = 'city';
		break;
	case '2':
		text = 'qx';
		break;
	case '3':
		text = 'xz';
		break;
	case '4':
		text = 'cun';
		break;
	}

	for ( var obj in usercode) {
		xzqh_code = usercode[obj];
	}

	$.ajax({
				type : "post",
				contentType : "application/json",
				dataType : 'json',
				async : false,
				data : JSON.stringify({
					text : text,
					usertitle : usertitle
				}),
				url : ctx + "/datainterface/getdata/list/queryXZQHTree",
				success : function(json) {
					var data = json.data;
					var dataArr = [];

					for (var i = 0; i < data.length; i++) {
						var obj = {};
						obj.id = data[i].ID;
						obj.pid = data[i].PID;
						obj.text = data[i].TEXT;
						obj.level = data[i].LEVEL;
						obj.code = data[i].CODE;
						obj.wkt = data[i].WKT;

						dataArr.push(obj);
					}

					var treeData = getTreeData(dataArr);
					treeData[0].nodes.sort( function(obj1,obj2){
						var val1 = obj1.code;
						var val2 = obj2.code;
						if(val1<val2){
							return -1;
						}else if (val1>val2){
							return 1;
						}else{
							return 0;
						}
					});
					$("#home").treeview({
										data : treeData,
										levels : 2,
										onNodeSelected : function(event, data) {
											// 去掉查询
											$("#home").treeview('clearSearch');
											var id = data.code;
											selectedNode = data.text;
											selectedLevel = data.level;

											xzqh_code = id;
											// wkt = data.wkt;

											getGeom(id);
											if (selectedLevel == "1") {
												city = xzqh_code;
												qx = undefined;
												xz = undefined;
												cun = undefined;
											} else if (selectedLevel == "2") {
												qx = xzqh_code;
												city = $('#home').treeview('getParent', data).code;
												if (typeof city == "function") {
													city = undefined;
												}
												xz = undefined;
												cun = undefined;
											} else if (selectedLevel == "3") {
												xz = xzqh_code;
												qx = $('#home').treeview('getParent', data).code;
												if (typeof qx == "function") {
													qx = undefined;
												}
												city = $('#home').treeview('getParent',$('#home').treeview('getParent',data)).code;
												if (typeof city == "function") {
													city = undefined;
												}
												cun = undefined;
											} else if (selectedLevel == "4") {
												cun = xzqh_code;
												xz = $('#home').treeview('getParent', data).code;
												if (typeof xz == "function") {
													xz = undefined;
												}
												qx = $('#home').treeview('getParent',$('#home').treeview('getParent',data)).code;
												if (typeof qx == "function") {
													qx = undefined;
												}
												city = $('#home').treeview('getParent',$('#home').treeview('getParent',$('#home').treeview('getParent',data))).code;
												if (typeof city == "function") {
													city = undefined;
												}
											}

											// 获取统计内容，图层名称
											parseJsonData();

											var layername = parseResult[0];
											var chartSql = parseResult[1];
											var tableSql = parseResult[2];
											var chartTitle = parseResult[3];
											var tablename = parseResult[4];
											var legend = parseResult[5];
											intersect_table = tablename;

											// 统计图
											loadChart(chartSql, selectedNode
													+ chartTitle);
											// 统计表
											loadTable(tableSql);
											// 加载图层
											$("#iframe_map")[0].onload = function(){
												maskStatus = true;
												$("#iframe_map")[0].contentWindow.removeHighLight();
												$("#iframe_map")[0].contentWindow.moveAndHighlight(wkt,selectedLevel);
												parent.layer.closeAll();
											}
											if(maskStatus == true){
												$("#iframe_map")[0].contentWindow.removeHighLight();
												$("#iframe_map")[0].contentWindow.moveAndHighlight(wkt,selectedLevel);
												parent.layer.closeAll();
											}
										}
									});
					$('#home').treeview('selectNode', [ 0, {} ]);
					
				}
			});

}

// 获得行政区划的geom
function getGeom(id, text) {
	$.ajax({
		type : "post",
		contentType : "application/json",
		dataType : 'json',
		async : false,
		data : JSON.stringify({
			// key: "getXzqhGeom",
			id : id
		}),
		dataType : 'JSON',
		url : ctx + "/datainterface/getdata/list/getXzqhGeom",
		success : function(json) {
			wkt = json.data[0].WKT;
		}
	});
}

function getXzqh() {
	$.ajax({
		type : "post",
		contentType : "application/json",
		dataType : 'json',
		async : false,
		url : ctx + "/datainterface/getdata/list/queryQxSj",
		success : function(json) {
			console.log(json.data);
			for (var i = 0; i < json.data.length; i++) {
				$('#qx').append('<option value="' + json.data[i].ID + '">'+ json.data[i].TITLE + '</option>');
			}
		}
	})
}

function onchangeQx(eve) {
	var qxcode = $(eve).val();
	$.ajax({
		type : "post",
		contentType : "application/json",
		dataType : 'json',
		data : JSON.stringify({
			qx : qxcode
		}),
		async : false,
		url : ctx + "/datainterface/getdata/list/queryXzSj",
		success : function(json) {
			console.log(json.data);
			for (var i = 0; i < json.data.length; i++) {
				$('#xz').append('<option value="' + json.data[i].ID + '">'+ json.data[i].TITLE + '</option>');
			}
		}
	})
}

/**
 * 加载统计图
 */

function loadChart(sqlfilter, charttitle) {
	$("#chart").empty();

	$.ajax({
		type : 'post',
		async : false,
		contentType : "application/json",
		dataType : 'json',
		url : ctx + '/datainterface/getdata/list/' + sqlfilter,
		data : JSON.stringify({
			city : city,
			qx : qx,
			xz : xz,
			cun : cun,
			batch : new Date().getFullYear()+""
		}),
		success : function(data) {
			// var jsonObj = $.parseJSON(data);
			var chartdata = data.data;

			var dataArr = [];
			var nameArr = [];
			for ( var i in chartdata) {
				var obj = {};
				var name = chartdata[i].NAME;
				var value = chartdata[i].VALUE;
				obj.name = name;
				obj.value = value;
				dataArr.push(obj);
				nameArr.push(name);
			}
			nameArr.pop();
			option = {
				title : {
					text : charttitle,
					x : 'center',
					textStyle : {
						fontSize : 15,
						fontWeight : 'bolder',
						color : '#35e8d5'
					}
				},
				tooltip : {
					trigger : 'item',
					formatter : "{a} <br/>{b} : {c} ({d}%)"
				},
				legend : {
					orient : 'vertical',
					x : 'left',
					y : 'center',
					
					textStyle : {
						fontSize : 10,
						color : '#0c9059'
					},
					data : nameArr
				},
				calculable : false,
				series : [ {
					name : '',
					type : 'pie',
					radius : '40%',
					center : [ '55%', '50%' ],
					data : dataArr
				} ]
			};

			require([ 'echarts', 'echarts/theme/macarons',
					'echarts/chart/line', 'echarts/chart/bar',
					'echarts/chart/pie' ],
					function(ec) {
						myChart = ec.init(document.getElementById("chart"),'macarons');
						myChart.setOption(option);
					});

		}
	});
}
/**
 * 加载表格
 */
function loadTable(sqlfilter) {

	var columns = [ {
		field : 'XZQH',
		title : '行政区划',
		align : 'center',
		width : '240'
	}, {
		field : 'TBMJ',
		title : '图斑面积(亩)',
		align : 'center',
		width : '240'
	} ]

	// $("#table").empty();

	$("#table").bootstrapTable({
		method : "post",
		url : ctx + '/datainterface/getdata/list/' + sqlfilter,
		dataType : 'json',
		contentType : 'application/json;charset=utf-8',
		pagination : false,// 分页
		search : false,
		singleSelect : false,
		queryParams : function(params) {
			return JSON.stringify({
				city : city,
				qx : qx,
				xz : xz,
				cun : cun,
				batch : new Date().getFullYear()+""
			});
		},
		/* data-locale:"zh-US",//表格汉化 */
		onClickRow : function(row, element, tr) {
			// 增加选中样式
			element.siblings().removeClass("row_selected");
			element.addClass("row_selected");
		},
		onLoadSuccess:function(){
			$('#collapse1 .fixed-table-toolbar').hide();
//			$('.extend-table').css('margin-left',($('#collapse1 .panel-body').width() - 340)/2);
		},
		columns : columns
	});
	$("#table").bootstrapTable('refreshOptions', {
		columns : columns
	});
	$("#table").bootstrapTable('refresh', {
		query : {
			city : city,
			qx : qx,
			xz : xz,
			cun : cun
		},
		url : ctx + '/datainterface/getdata/list/' + sqlfilter
	});
}

/**
 * 根据参数解析json,得到统计信息，图层名称
 */
function parseJsonData() {
	// 存放解析后的数据
	var dataArr = [];

	if (cfgData.navs) {
		var yearCfg = cfgData.navs;
		for ( var i in yearCfg) {
			if (selectedNav == yearCfg[i].type) {
				var layer = yearCfg[i].layer;
				var chartsql = yearCfg[i].chart;
				var tablesql = yearCfg[i].table;
				var charttitle = yearCfg[i].charttitle;
				var tablename = yearCfg[i].tablename;
				var legend = yearCfg[i].legend;

				dataArr.push(layer);
				dataArr.push(chartsql);
				dataArr.push(tablesql);
				dataArr.push(charttitle);
				dataArr.push(tablename);
				dataArr.push(legend);
				parseResult = dataArr;
				return;
			}
		}
	}
}

// 多期对比实现
function dqdb() {
	var html = '<div id="map-constrast">\
		<iframe id="iframe_constrast" name="iframe_constrast" src="'
			+ ctx
			+ '/resources/onemap/constrast/constrast.jsp" style="position:absolute;width:100%;height:'
			+ $(window).height()
			+ 'px;top:0;left:0px;border:100%;z-index: 10000;" scrolling="no" frameborder="0"></iframe></div>';
	$('body').append(html);
}

// 地块相关信息查询
function queryDkInfo() {
	$(".dkInfo").bootstrapTable('destroy');
	var columns = [ {
		field : 'UUID',
		title : 'ID',
		align : 'center',
		visible : false
	}, {
		field : 'DKBH',
		title : '地块编号',
		align : 'center',
		width : '160'
	}, {
		field : 'QX',
		title : '区县',
		align : 'center',
		width : '200'
	}, {
		field : 'XZ',
		title : '乡镇',
		align : 'center',
		width : '200'
	}, {
		field : 'CUN',
		title : '村',
		align : 'center',
		width : '200'
	}, {
		field : 'MJ',
		title : '地块面积(亩)',
		align : 'center',
		width : '50'
	}, {
		field : 'ZLNF',
		title : '造林年份(年)',
		align : 'center',
		width : '80'
	}, {
		field : 'YHYEAR',
		title : '养护年份(年)',
		align : 'center',
		width : '80'
	}, {
		field : 'YHDWMC',
		title : '养护公司',
		align : 'center',
		width : '300'
	},
	{
		field : 'LOGINTITLE',
		title : '养护负责人',
		align : 'center',
		width : '300'
	}]

	$(".dkInfo").bootstrapTable(
			{
				method : "post",
				height : 350,
				url : ctx + '/datainterface/getdata/list/queryDkidInfo',
				dataType : 'json',
				contentType : 'application/json;charset=utf-8',
				pagination : true,// 分页
				search : false,
				singleSelect : false,
				showColumns : true,
				toolbar:'#toolBar',
				queryParams : function(params) {
					var queryMap = {};
					queryMap['qx'] = qx;
					queryMap['xz'] = xz;
					for (var i = 0; i < $('form select').length; i++) {
						queryMap[$($('form select')[i]).val()] = "%"
								+ $($('form input')[i]).val() + "%";
					}
					queryMap['batch'] = new Date().getFullYear()+"";
					console.log(queryMap);
					return JSON.stringify(queryMap);
				},
				/* data-locale:"zh-US",//表格汉化 */
				onClickRow : function(row, element, tr) {
					// 增加选中样式
					element.siblings().removeClass("row_selected");
					element.addClass("row_selected");
					console.log(row);
					switch (row.ZLNF) {
					case '2012':
						color = "#e5f5e7";
						break;
					case '2013':
						color = "#e7f1f7";
						break;
					case '2014':
						color = "#f4e6f7";
						break;
					case '2015':
						color = "#e7e0f5";
						break;
					case '2016':
						color = "#fbd1b2";
						break;
					case '2017':
						color = "#7decbe";
						break;
					}
					$.ajax({
						type : 'post',
						async : false,
						contentType : "application/json",
						dataType : 'json',
						url : ctx + '/datainterface/getdata/list/getDkGeom',
						data : JSON.stringify({
							dkid : row.UUID,
							batch : new Date().getFullYear()+""
						}),
						success : function(data) {
							// console.log(data.data);
							$("#iframe_map")[0].contentWindow.landHighlight(data.data[0].WKT,color);
						}
					})
				},
				onLoadSuccess : function() {
					setTimeout(function() {
						//$('.fixed-table-header').hide();
						$('.fixed-table-body>.dkInfo').css('margin-top','-48px');
//						$('#iframe_map').height($('#iframe_map').height() - $('.bootstrap-table:eq(1)').outerHeight());
//						$("#iframe_map")[0].contentWindow.map.updataSize();
						$('#toolBar').show();
					}, 10);
				},
				onPageChange : function() {
					setTimeout(function() {
						$('.fixed-table-body>.dkInfo').css('margin-top','-48px');
						//$('.fixed-table-header').hide();
					}, 5);
				},
				onColumnSwitch : function() {
					setTimeout(function() {
						$('.fixed-table-body>.dkInfo').css('margin-top','-48px');
						//$('.fixed-table-header').hide();
					}, 5);
				},
				onDblClickRow : function() {
					// alert('su');
				},
				columns : columns
			});
	$('#type_div').next().css({
		"left" : "0.4%",
		"width" : "65%",
		"position" : "absolute",
		"bottom" : "1%",
		"background-color" : "white"
	});
	footTableStatus = true;
	// $(".dkInfo").bootstrapTable('refreshOptions',{columns:columns});
	// $(".dkInfo").bootstrapTable('refresh',{query:{qx : qx,xz :
	// xz},url:ctx+'/datainterface/getdata/list/queryDkidInfo'});
}

function addQuerySearch() {
	if ($('#querySearchForm .form-group').length <= 3) {
		$('.form-content-body').append('<div class="form-group">\
				<div class="col-sm-5"  style="padding-right:0;">\
				<select onfocus="selectChange(this);"  class="form-control">\
				</select>\
				</div>\
				<div class="col-sm-6" style="padding-left:0;padding-right: 0px;">\
				<input class="form-control" type="text" onkeyup="value=this.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\]/g,\'\')" style="border-radius: 20px" placeholder="模糊查询"/>\
				</div>\
				<div class="col-sm-1" style="padding-left:0;padding-right: 0px;height: 34px;">\
		    	<span style="font-size: 21px;cursor:pointer;" title="删除" onclick="$(this).parent().parent().remove()">×</span>\
		    </div>\
		</div>');

		console.log($('#querySearchForm .form-group').length);

		$.ajax({
			type : "post",
			contentType : "application/json",
			dataType : 'json',
			async : false,
			url : ctx + "/datainterface/getdata/list/getDkMetadate",
			success : function(json) {
				for (var i = 0; i < json.data.length; i++) {
					var temp=0;
					for(var k=0;k<$('#querySearchForm .form-group').length;k++){
						if($($('#querySearchForm .form-group select.form-control')[k]).val()==json.data[i].VALUE){
							temp=1;
						}
					}
					if(temp!=1){
						$('form select:last').append('<option value="' + json.data[i].VALUE + '">'+ json.data[i].TEXT + '</option>');
					}
					
				}
			}
		})
	} else {
		parent.layer.msg("不能超过4个筛选条件！", {
			icon: 0,
			time: 2000
		});
	}
}

function changeTable(button){
	if($(button).find('i').hasClass('fa-caret-square-o-down')){
//		$('.bootstrap-table:eq(1)').height(44);
		$('.bootstrap-table:eq(1)').animate({
			height : '44px'
		}, 500);
		$(button).attr('title','显示');
	}else{
//		$('.bootstrap-table:eq(1)').height(250);
		$('.bootstrap-table:eq(1)').animate({
			height : '300px'
		}, 500);
		$(button).attr('title','隐藏');
	}
	$(button).find('i').toggleClass('fa-caret-square-o-down fa-caret-square-o-up');
}

function attachPhoto(row){
	$('#photoInfo').modal('show');
//	$('#photoInfo').on('shown.bs.modal', function () {
//		baguetteBox.run('.tz-gallery');
//	  })
	$($($('#photoInfo').find("iframe")[0]).contents().find(".tz-gallery")[0]).empty();
	$.ajax({
		type:"post",
		url:ctx + "/client/interface/1.0/imgpath",
		async:false,
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify(
			row
		),
		success: function(json) {
			
			console.log('success');
			if(json.SUCCESS&&json.DATA.length>0){
				for(var i = 0 ; i < json.data.length ; i ++){
					var html = '<div class="image-box">\
											<div class="thumbnail">\
										<a class="lightbox"\
											href="'+(json.data[i])+'">\
											<img\
											src="'+(json.data[i])+'"\
											alt="Traffic" />\
										</a>\
									</div>\
								</div>';
					//$('.tz-gallery',document.frames('photo_iframe').document).append(html);	
					$($($('#photoInfo').find("iframe")[0]).contents().find(".tz-gallery")[0]).append(html);
				}
			}else{
				$($($('#photoInfo').find("iframe")[0]).contents().find(".tz-gallery")[0]).append("暂无竣工图数据");
			}
			
			
		},error:function(e){
			console.log('failed');
		}
	});
	console.log(row);
}


function selectChange(obj){
	var value=$(obj).val();
	$(obj).empty();
	$.ajax({
		type : "post",
		contentType : "application/json",
		dataType : 'json',
		async : false,
		url : ctx + "/datainterface/getdata/list/getDkMetadate",
		success : function(json) {
			for (var i = 0; i < json.data.length; i++) {
				var temp=0;
				for(var k=0;k<$('#querySearchForm .form-group').length;k++){
					if($($('#querySearchForm .form-group select.form-control')[k]).val()==json.data[i].VALUE&&json.data[i].VALUE!=value){
						temp=1;
					}
				}
				if(temp!=1){
					$(obj).append('<option value="' + json.data[i].VALUE + '">'+ json.data[i].TEXT + '</option>');
				}
				
			}
			$(obj).val(value);
		}
	})
}


function showtable(obj){
	if($(obj).hasClass("open")){
		$(obj).removeClass("open");
	} else {
		$(obj).addClass("open");
	}
	
	var dataShow = $('#righttitle').attr("data-show");
	if(dataShow == 'show'){
		$("#righttitle").animate({
			right : '-34%'
		}, 500,function(){
			$('#righttitle').attr("data-show","hidden");
		});
		$(".titlemiddle").animate({
			width : '99.3%'
		}, 500,function(){
			window.frames['iframe_map'].map.updateSize();
		});
		var status = $("#type_div").find("span").attr("title");
		if (status == '隐藏') {
			$("#switch-panel").css('display','block');
			$("#switch-panel").animate({
				left : '85%',
				opacity : '1'
			}, 500);
			$("#type_div").find("span").attr("title", "隐藏");
			$("#type_div").find("span").removeClass("glyphicon-chevron-right");
			$("#type_div").find("span").addClass("glyphicon-chevron-left");
		}
		if ($('.bootstrap-table')[1]&&$('.bootstrap-table')[1].style.display=='block') {
			$($('.bootstrap-table')[1]).animate({
				width : '99.2%'
			}, 500);
		}
		
	}else{
		$(".titlemiddle").animate({
			width : '65%'
		}, 500,function(){
			window.frames['iframe_map'].map.updateSize();
		});
		$("#righttitle").animate({
			right : '5px'
		}, 500,function(){
			$('#righttitle').attr("data-show","show");
		});
		var status = $("#type_div").find("span").attr("title");
		if (status == '隐藏') {
			$("#switch-panel").css('display','block');
			$("#switch-panel").animate({
				left : '51%',
				opacity : '1'
			}, 500);
			$("#type_div").find("span").attr("title", "隐藏");
			$("#type_div").find("span").removeClass("glyphicon-chevron-right");
			$("#type_div").find("span").addClass("glyphicon-chevron-left");
		}
		if ($('.bootstrap-table')[1]&&$('.bootstrap-table')[1].style.display=='block') {
			$($('.bootstrap-table')[1]).animate({
				width : '99.2%'
			}, 500);
		}
	}

}