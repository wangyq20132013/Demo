/*定义全局变量*/
var zctype = "";//国标分类or资产细类
var trackID = "";

$(function(){
	//加载专题类型
	selectType();
	
	initClick();
	
	//initTrackSelect();
	
	initOrgList();
	
	initTableData();
	
	$(".fa-caret-square-o-up").click();
});

/**
 * 初始化批次切换的选择框
 */
function initTrackSelect(){
	$.ajax({
		type:"post",
		url: cxt + "/datainterface/getdata/list/getTrackInfo",
		contentType: "application/json",
		async:false,
		dataType:"JSON",
		success:function(data){
			var trackArray = data.data;
			var _html = "";
			for (var i = 0; i < trackArray.length; i++) {
				var _date = new Date(trackArray[i].TRACKDATE);
				var dateStr = _date.getFullYear()+"年"+(_date.getMonth()+1) + "月" + _date.getDate()+"日";
				_html += "<option id='"+trackArray[i].ID+"'>"+dateStr+"</option>";
				
			};
			$("#track-select").append(_html);
			var selectedOption = $("#track-select")[0][$("#track-select")[0].selectedIndex];
			trackID=selectedOption.id;
		}
	});	

	$("#track-select").on('change',function(){
		$("#track-select")[0][$("#track-select")[0].selectedIndex];
		var selectedOption = $("#track-select")[0][$("#track-select")[0].selectedIndex];
		trackID=selectedOption.id;
		//加载专题类型
		selectType();
	});
	$("#track-select").change();
}

/**
 * 初始化切换窗口的按钮事件 
 */
function initClick(){
	$(".fa-caret-square-o-up").click(function(){
		$(this).parent().hide();
		$(".fa-caret-square-o-down").parent().show();
		$(".fa-arrows-alt").parent().show();
		$("#contentDiv").animate({bottom:'0px'},300);
	});
	$(".fa-caret-square-o-down").click(function(){
		$(this).parent().hide();
		$(".fa-caret-square-o-up").parent().show();
		$(".fa-arrows-alt").parent().hide();
		$("#contentDiv").animate({bottom:'-290px'},300);
	});
	
	$(".fa-arrows-alt").click(function(){
		$(this).parent().hide();
		$(".fa-minus").parent().show();
		$(".fa-caret-square-o-down").parent().hide();
		
		$("#contentDiv").animate({height:'100%'},300);
		
	});
	$(".fa-minus").click(function(){
		$(this).parent().hide();
		$(".fa-arrows-alt").parent().show();
		$(".fa-caret-square-o-down").parent().show();
		
		$("#contentDiv").animate({bottom:'0px',height:'320px'},300);
	});
	
}

function showOrgUnit(){
	$("#rightDiv").toggle(300);
}

/**
 * 加载局属单位列表
 */
function initOrgList(){
	//加载右侧局属单位表格
	var dataset = "getTable";
	$('#orgtable').bootstrapTable('destroy');
	$('#orgtable').bootstrapTable({
		url: cxt + "/datainterface/getdata/bootstarptable/" + dataset, //请求后台的URL（*）
		method: 'POST', //请求方式（*）
		striped: false, //是否显示行间隔色
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true, //是否显示分页（*）
		sortable: false, //是否启用排序
		sortOrder: "asc", //排序方式
		paginationLoop: false,
		contentType:"application/json",
		queryParamsType: "undefined",
		queryParams: function queryParams(params) { //设置查询参数
			var param = {
				page:params.pageNumber,
				rows:params.pageSize,
				order:params.sortOrder,
				type:'',
				zctype:'',
				trackid : trackID
			};
			return JSON.stringify(param);
		},
		sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
		pageNumber: 1, //初始化加载第一页，默认第一页
		pageSize: 5, //每页的记录行数（*）
//			pageList: [10,20,30,50,100], //可供选择的每页的行数（*）
		search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
		strictSearch: true,
		clickToSelect: true, //是否启用点击选中行
		rowStyle: function(row,index){
			if(index==0){
				$("#contentDiv").find(".panel-body").show();
				
	    		//修改按钮名称
	    		var nameVal = row.STDNAME;
	    		$("#buttonDiv").text(nameVal);
	    		
	        	orgunitid = row.ORGUNIT;
	        	typeInfo = row.TYPE;
	        	
	        	//加载地图聚合点
				getClusterDataGYZC();
				
				//隐藏使用管理部门
				$("#tjtchange ul").find("li").eq("1").hide();
				return {classes:'rowSelected'}
			}else{
				return {};
			}
		},
		columns: [	
					{   field: "ORGUNIT",
						title: "主键", 
						visible:false,
						width : "1%",
						valign:"middle",
						align:"center"
					},
					{   field: "TYPE",
						title: "类型", 
						visible:false,
						width : "1%",
						valign:"middle",
						align:"center"
					},
					{   field: "STDNAME",
						title: "局属单位名称", 
						width : "50%",
						valign:"middle",
						align:"center"
					},
					{ 
						field: "COT",
						title: "数量", 
						width : "10%",
						valign:"middle",
						align:"center"
		            }
		        ],
        onClickRow: function(row, $row, field) {
        	$row.siblings().removeClass("rowSelected");
        	$row.addClass("rowSelected");
        	$("#contentDiv").find(".panel-body").show();
        	$("#contentDiv").animate({bottom:'0px'},300);
        	
    		//修改按钮名称
    		var nameVal = row.STDNAME;
    		$("#buttonDiv").text(nameVal);
    		
        	orgunitid = row.ORGUNIT;
        	typeInfo = row.TYPE;
        	var center;
        	if(row.CENTER!=""){
        		center = [parseFloat(row.CENTER.split(",")[0]),parseFloat(row.CENTER.split(",")[1])];
        		moveIn(center,5,null);
        	}else{
        		center = [529908.14380,341849.24496];
        		map.getView().setZoom(0);
        		map.getView().setCenter(center);
        	}
        	
        	//加载地图聚合点
			getClusterDataGYZC();
			
			if(row.STDNAME=='全局'){
				
			}else{
			}
		},
		onLoadSuccess:function(data){
			
		}
	});
}

/**
 * 加载左侧专题列表
 */
function selectType(){
	var orderobj = {
		"水源林"	 : 1
	};
	var imgArr = ["icon_tdfw.png","icon_tysb.png","icon_tysb.png","icon_tysb.png","/icon_tsda.png","/icon_jj.png"];
	var dataset = "getGYZCLX";
	var key = {trackid : trackID };
	$.ajax({
		type: "POST",
		dataType: "json",
		contentType: "application/json",
		url: cxt + "/datainterface/getdata/list/" + dataset,
		async: true,
		data: JSON.stringify(key),
		success: function(data) {
			var dataArr = data.data;
			
			var li_tag ='';
			$(".zk").empty();
			for(var m=0;m<dataArr.length;m++){
				if(m==0){
					li_tag = '<li class="list list_a liactive" id="'+dataArr[m].ID+'"><img src="'+cxt+'/develop/decisionsupport/image/'+imgArr[m]+'"/><p onclick="reloadData(\''+dataArr[m].ID+'\',\''+dataArr[m].TYPE+'\')">'+dataArr[m].TITLE+'</p><i class="fa fa-chevron-circle-right" onclick="openChildren(\''+dataArr[m].ID+'\')"></i></li>';
				}else{
					li_tag = '<li class="list" id="'+dataArr[m].ID+'"><img src="'+cxt+'/develop/decisionsupport/image/'+imgArr[m]+'"/><p onclick="reloadData(\''+dataArr[m].ID+'\',\''+dataArr[m].TYPE+'\')">'+dataArr[m].TITLE+'</p><i class="fa fa-chevron-circle-right" onclick="openChildren(\''+dataArr[m].ID+'\')"></i></li>';
				}
				$(".zk").append($(li_tag));
			}
		}
	});
}

/**
 * 加载聚合点图层服务
 * 此方法有mapview进行封装，参见：mapview_extends.js
 */

function loadClusterLayer(layername,dataset,params){
	if(dataset){
		var opt = {};
		opt.name = layername;
		opt.url = cxt + "/datainterface/getdata/list/" + dataset;
		opt.dataparams = params;
		opt.params = {
			distance:50,
			column:null,
			renderer:{
				colors:["rgba(255,69,0,0.7)","rgba(255,52,179,0.7)","rgba(255,130,71,0.7)","rgba(255,140,0,0.7)","rgba(255,48,48,0.7)"],
				radius:{
					minradius:10,
					maxradius:25
				}
			}
		};
		addClusterLayer(opt);
	}
}


/**
 * 获取国有资产的聚合点数据服务
 */
function getClusterDataGYZC(){
	loadClusterLayer('clustergyzc','getGYZCCluster',{});
}

/**
 * 初始化资产明细列表
 */
function initTableData(){
	queryData();
}

/**
 * 点击聚合点，需要扩展传递的参数
 */
function featrueClick(){
	queryData();
}

/**
 * 地图定位
 * 点击资产列表，展示资产信息
 * @param name
 * @param row
 */
function showZCinfo(name, row){
	var lon = row.X;
	var lat = row.Y;
	
	var center = [lon,lat];
	map.getView().setCenter(center);
	
	var option = {};
	option.dataset = 'getGYZCGeometryForWkt';
	hignLight(option,row);
}

