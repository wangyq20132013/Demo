var height = $(window).height() - $("#opt").outerHeight(true) - $("#query").outerHeight(true)-30;
var nodeId;

$(function() {
	$('#treetitle').html(dataset.treeview[0].title);
	
	//$("#map").height(height);
	
	$('#searchInput').keydown(function(e){
		if(e.keyCode == 13){
			searchTree();
		}
	});

	initTree();
});

var zTree;
var treeNodes;

function initTree(node) {
	var setting = {
		view: {
				dblClickExpand: true,
				showLine: true,
				selectedMulti: true
			},
			check:{
				enable:true,
			},
			data: {
				keep: {
					leaf: true,
					parent: true
				},
				key: {
					name: "text",
					children:"item",
				},
			},
			callback: {
				onClick: zTreeOnClick,
				onDblClick: editNode,
				onCheck: zTreeOnCheck,
				onRightClick: zTreeOnRightClick,
				beforeRename: zTreeBeforeRename,
			}
	};
	if(dataset.treeview[0].initall){//加载全部数据
		
		if(dataset.treeview[0].dataMode == "interface"){//如果从接口获取数据
			
			var _url = cxt + "/atservices/catalog?id=1&service=False&attoken=&cache=Clear&format=JSON&wsname=sdgm&debug=true";
			if(sispcxt){
				_url = sispcxt +"/atservices/catalog?id=1&service=False&attoken=&cache=Clear&format=JSON&wsname=sdgm&debug=true";
			}
			
			$.ajax({
				type:"post",
				url:_url,
				async:false,
				dataType:"JSON",
				success:function(data){
					makeTree(data);
					data.text = "资源目录";
					data.open = true;
					
					zTree = $.fn.zTree.init($("#tree"), setting, data);
				}
			});
		}else{
			$.ajax({
				type: 'POST',
				url: cxt + "/datainterface/getdata/ztree/" + dataset.treeview[0].name,
				async: false,
				contentType: "application/json",
				dataType: "JSON",
				data: JSON.stringify({
					initall: dataset.treeview[0].initall
				}),
				success: function(data) {
					treeNodes = data;
					zTree = $.fn.zTree.init($("#tree"), setting, treeNodes);
				}
			});
		}
	}else{
		zTree = $.fn.zTree.init($("#tree"), {
			isSimpleData: false, //数据是否采用简单 Array 格式，默认false  
			showLine: true, //是否显示节点间的连线  
			check: {
				enable: dataset.treeview[0].showCheckbox
			},
			async: {
				enable: true,
				type: 'POST',
				url: cxt + "/datainterface/getdata/ztree/" + dataset.treeview[0].name,
				contentType: "application/json",
				dataType: "json",
				autoParam: ["TREEID","TREEPARENTID"],
				otherParam: {initall: dataset.treeview[0].initall}
			},
			view: {
				dblClickExpand: true,
				showLine: true,
				selectedMulti: true
			},
			data: {
				keep: {
					leaf: true,
					parent: true
				},
				key: {
					name: "TREENAME",
				},
				simpleData: {
					enable: true,
					idKey: "TREEID",
					pIdKey: "TREEPARENTID",
				}
			},
			callback: {
				onClick: zTreeOnClick,
				onDblClick: editNode,
				onRightClick: zTreeOnRightClick,
				beforeRename: zTreeBeforeRename,
				onAsyncSuccess: function(event, treeId, treeNode, data){
					
				}
			}
		});
	}
}

//节点点击事件
function zTreeOnClick(event, treeId, treeNode){
	hideRMenu();
	if(treeNode != null){
		if(type == 'treelist'){
			queryTable();
		}else if(typeof(nodeOnClick) == "function"){
			nodeOnClick(treeNode);
		}
	}
}

//节点勾选事件
function zTreeOnCheck(event, treeId, treeNode){
	hideRMenu();
	if(treeNode != null){
		nodeOnCheck(treeNode);
	}
}
//Tree右键点击事件
function zTreeOnRightClick(event, treeId, treeNode) {
	if(treeNode != null){
		zTree.selectNode(treeNode);
		showTree_Menu("node", event.clientX, event.clientY);
	}else{
		showBlank_Menu("node", event.clientX, event.clientY);
	}
	
}
//节点右键菜单
function showTree_Menu(type, x, y) {
	hideRMenu();
	if($("#tree_context-menu ul li").length > 0){
		var rMenu = $("#tree_context-menu ul").show();
		rMenu.css({
			"top": y + "px",
			"left": x + "px",
			"visibility": "visible",
		});
	}
}

//空白处右键菜单
function showBlank_Menu(type, x, y) {
	hideRMenu();
	if($("#tree_context-menu ul li").length > 0){
		var rMenu = $("#blank_context-menu ul").show();
		rMenu.css({
			"top": y + "px",
			"left": x + "px",
			"visibility": "visible"
		});
	}
}

//隐藏右键菜单
function hideRMenu() {
	$("#tree_context-menu ul").css({
		"visibility": "hidden"
	});
	$("#blank_context-menu ul").css({
		"visibility": "hidden"
	});
}

function zTreeBeforeRename(treeId, treeNode, newName, isCancel) {
	console.log(treeId + newName + isCancel);
}



//获取选中的节点
function getSelectNode() {
	var nodes = zTree.getSelectedNodes();
	if(nodes != null && nodes.length == 1) {
		var node = nodes[0];
		
		return node;
	}else if(nodes != null && nodes.length > 1){
		layer.msg("只能选择一个节点", {
			icon: 5
		});
		return false;
	}else {
		layer.msg("请选择一个节点进行操作", {
			icon: 5
		});
		return false;
	};
}
//过去勾选中的节点
function getCheckedNodes() {
	var nodes = zTree.getCheckedNodes(true);
	if(nodes != null && nodes.length > 0) {
		return nodes;
	}else {
		layer.msg("请选择一个节点进行操作", {
			icon: 5
		});
		return [];
	};
}

//搜索树
function searchTree() {
	var searchInput = $('#searchInput').val();
	if(searchInput != "") {
		zTree.cancelSelectedNode();
		var nodes = zTree.getNodesByParamFuzzy("TREENAME", searchInput, null);
		if(nodes.length > 0){
			zTree.expandAll(false);
			for(var i=0;i<nodes.length;i++){
				var parentNode = nodes[i].getParentNode();
				if(parentNode && !parentNode.open){
					if(i == 0){
						zTree.expandNode(parentNode, true, false, true);
					}else{
						zTree.expandNode(parentNode, true, false, false);
					}
				}
				zTree.selectNode(nodes[i], true);
				//$("#"+nodes[i].tId+"_span").css({color:"red"});
			}
		} else {
			layer.msg("没有搜索结果", {
				icon: 5
			});
		}
	} else {
		layer.msg("请输入搜索项", {
			icon: 5
		});
	}
}

function refreshTree(node){
	initTree();
}
