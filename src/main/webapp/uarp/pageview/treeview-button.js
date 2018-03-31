
//添加节点
function addNode(pageviewtype, priviewtitle, pageview, opentype, params, w, h) {
	hideRMenu();
	var node = getSelectNode();
	if(node) {
		selectNodeId = undefined;
		selectParentId = node.nodeId;
		var obj = $.extend(node.attributes, params);
		//清除掉额外的属性
		for(var key in obj){
			if(key == 'UUID'){
				obj['TREEPARENTID'] = obj[key];
			}
		}
		popupPage(pageviewtype, priviewtitle, pageview, opentype, obj, w, h);
	}else{
		popupPage(pageviewtype, priviewtitle, pageview, opentype, params, w, h);
	}

}
//编辑节点
function editNode(pageviewtype, priviewtitle, pageview, opentype, params, w, h) {
	hideRMenu();
	var node = getSelectNode();
	if(node) {
		selectNodeId = node.nodeId;
		var obj = $.extend(node.attributes, params);
		popupPage(pageviewtype, priviewtitle, pageview, opentype, obj, w, h);
	}else {
		layer.msg("请选择一个节点进行操作", {
			icon: 5
		});
		return false;
	};
}
//删除节点
function delNode(dataset, title) {
	hideRMenu();
	var nodes = getCheckedNodes();
	if(nodes.length > 0){
		var list = [];
		for(var i=0;i < nodes.length;i++){
			list.push(nodes[i].attributes);
		}
		selectNodeId = undefined;
		var parentNode = getParentNode(nodes[0].nodeId);
		if(parentNode){
			selectParentId = parentNode.nodeId;
		}
			
		executeDataInterface(dataset, title, list, function(){
			refreshTree();
		});
	} else {
		layer.msg("请选择要删除的记录！", {
			icon: 0,
			time: 2000
		});
	}
}

/**
 * 树结构添加记录（子级)tree
 */
function addChildrenLevelfortree(pageviewtype, priviewtitle, pageview, opentype, data, w, h) {
	popupPage(pageviewtype, priviewtitle, pageview, opentype, data, w, h)

}
/**
 * 树结构编辑一条记录tree
 */
function editRecordsfortree(pageviewtype, priviewtitle, pageview, opentype, data, w, h) {
	popupPage(pageviewtype, priviewtitle, pageview, opentype, data, w, h)
}

/**
 * 树结构删除记录
 */
function deleteRecordsfortree(dataset, title, data) {
	executeDataInterface(dataset, title, data);
}


