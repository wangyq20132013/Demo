var width = $(window).width();

var currentNode = null;
var editState = undefined;
var editNode = null;
var selectNodeId = null;
var selectParentId = null;

$(function() {
	
});

/**
 * 初始化表单，根据节点ID获取当前节点的所有数据，进行表单初始化
 * @param node
 * @param dataset
 */
function nodeOnClick(node){
	
	if(typeof(initFormContent) == "function"){
		currentNode = node.attributes;
		
		var record = initFormContent(node.attributes);
		//节点的属性作为参数，传递给dataset
		
		//此方法在formview-bootstrap.js里面实现
		initFormData(record);
	}else{
		layer.msg("请在模块JS里面实现initFormContent方法，返回节点的数据集。", {icon: 2});
	}
}
/**
 * 添加同级节点 
 */
function addNextNode(title){
	if(currentNode){
		var id = currentNode.TREEID;
		var pid = currentNode.TREEPARENTID;
		resetFormData();
	}else{
		layer.msg("请先选择一个"+title, {icon: 2});
	}
}
/**
 * 添加子节点 
 */
function addChildNode(title){
	if(currentNode){
		var id = currentNode.TREEID;
		var pid = currentNode.TREEPARENTID;
		
		currentNode.TREEPARENTID = id;
		currentNode.TREEID = "";
		
		resetFormData();
	}else{
		layer.msg("请先选择一个"+title, {icon: 2});
	}
}

function preSaveFormData(){
	
	params = $.extend(params, currentNode);
}

/**
 * 删除节点
 * @param dataset
 * @param title
 */
function delTreeNode(dataset,title){
	if(currentNode){
		params = $.extend(params, currentNode);
		
		executeDataInterface(dataset, title, params, function(){
			//刷新树节点
			//layer.msg("刷新树节点", {icon: 2});
			refreshLeftTree();
		});
	}else{
		layer.msg("请先选择一个"+title, {icon: 2});
	}
}

function refreshLeftTree(){
	refreshTree(currentNode);
	currentNode = null;
	resetFormData();
}
