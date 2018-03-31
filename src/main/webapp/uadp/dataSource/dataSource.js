$(function(){
	//初始化左侧树
	initZTree();
});

function initZTree(){
	var setting = {  
		async:{
			enable:false,//异步加载则修改为true
			type:"GET",
			url:"",
			autoParam:["id"],
		},
		data:{
			key : {
				name : "name"
			},
			simpleData:{
				enable:true,
				idKey:"id",
				pIdKey:"pid",
				rootPId:-1
			}
		}
	};
	var nodes = [{id:0,pid:-1,name:"数据库"},{id:1,pid:0,name:"业务库"},{id:2,pid:0,name:"配置库"}]
	$.fn.zTree.init($("#tree"), setting, nodes);
}

/**
 * 添加新的数据连接（按钮事件）
 * */
function addConnection(){
	$("#dataBaseModal").modal("show");
}

/**
 * 数据库类型选择事件 
 */
function dataBaseClickEvt(opt){
	var dbType = $(opt).find("img").attr("alt");
	$("#dataBaseModal").modal("hide");//隐藏模态框
	$("#rightDiv").hide();//隐藏右侧div
	$("#rightIframe").show();//显示ifarame
	
	if(dbType!="Excel"){
		$("#rightIframe").attr("src","dbSource");//iframe页面跳转
	}else{
		$("#rightIframe").attr("src","excelSource");//iframe页面跳转
	}
}