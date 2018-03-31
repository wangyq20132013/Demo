var width = $(window).width();
var $tree = null;
var selectNodeId;
var selectParentId;
$(function() {
	
	$('#treetitle').html(dataset.treeview[0].title);
	if(type != 'listtreeview'){		
		bootstrapTree(dataset);
		initTreeContextMenu();
	}
		
	$('#searchInput').keydown(function(e){
		if(e.keyCode == 13){
			searchTree();
		}
	});
});

function initTreeContextMenu(){
	//默认展开首个节点中第一个不存在子节点的节点
	if($tree != null){
		initTreeRightMenu();
		$('#tree').bind('contextmenu',function(){
			return false;
		});
		expandnode();
	}
}
/**
 * 初始化树
 */
function bootstrapTree(dataset) {
	$.ajax({
		type:"post",
		url: cxt + "/datainterface/getdata/bootstraptree/" + dataset.treeview[0].name,
		async:false,
		contentType: "application/json",
		dataType:"JSON",
		data:JSON.stringify({initall:dataset.treeview[0].initall}),
		success:function(data){
			if(data.length > 0){
				$tree = $("#tree").treeview({
					data: data, // data is not optional
					levels: dataset.treeview[0].levels,//默认展示的层级
					showCheckbox:dataset.treeview[0].showCheckbox,
					onNodeSelected:function(event,node){//节点被选择的时候
						
						typeof(queryTable) == "function"?queryTable():false;
						typeof(nodeSelected) == "function"?nodeSelected(node):false;
					},
					selectedBackColor:'#0073B7',
					onNodeChecked:function(event,node){
						var ids = new Array();
						checkNode(node,ids);
						$tree.treeview('checkNode',[ids,{silent:true}]);
					},
					onNodeUnchecked:function(event,node){
						var ids = new Array();
						unckedNode(node,ids);
						$tree.treeview('uncheckNode',[ids,{silent:true}]);
					}
				});
			}
		}
	});	
}
//初始化树右键菜单
function initTreeRightMenu(){
	$('#tree').on('mousedown',function(event){
		if(event.which == 3){
			if(event.target.tagName == 'LI'){
				var nodeId = $(event.target).attr('data-nodeid');
				var node = $tree.treeview('getNode',nodeId);
				if(node){
					$tree.treeview('selectNode',[node.nodeId,{silent:true}]);
					selectNodeId = node.nodeId;
					showTree_Menu("node", event.clientX, event.clientY);
				}
			}else{
				var nodes = $tree.treeview("getSelected");
				if(nodes.length>0){
					$tree.treeview('unselectNode',[nodes,{silent:true}]);
				}
				selectNodeId = undefined;
				showBlank_Menu("node", event.clientX, event.clientY);
			}
		}else{
			hideRMenu();
			selectNodeId = undefined;
			if(event.target.tagName == 'LI'){
				var nodeId = $(event.target).attr('data-nodeid');
				var node = $tree.treeview('getNode',nodeId);
				if(node){
					$tree.treeview('selectNode',node.nodeId);
					selectNodeId = node.nodeId;
				}
			}
		}
	});
}

//节点右键菜单
function showTree_Menu(type, x, y) {
	hideRMenu();
	if($("#tree_context-menu ul li").length > 0){
		var rMenu = $("#tree_context-menu ul").show();
		rMenu.css({
			"top": y + "px",
			"left": x + "px",
			"visibility": "visible"
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

//默认展开首个节点中第一个不存在子节点的节点
function expandnode(){
	var node = $tree.treeview('getNode',0);
	if(node != undefined){
		$tree.treeview('selectNode',0);
	}
}
function selectNode(node){
	if(node.nodes == null){
		$tree.treeview('selectNode',node.nodeId);
	}else{
		$tree.treeview('expandNode',node.nodeId);
		selectNode(node.nodes[0])
	}
}
function getParentNode(nodeId){
	var parentNode = $tree.treeview('getParent', nodeId);
	if(parentNode.nodeId != undefined){
		return parentNode;
	}else{
		return undefined;
	}
}

//刷新树
function refreshTree(data){
	if(data != undefined){
		$tree.treeview('remove');  
		bootstrapTree(dataset);
		$tree.treeview('selectNode', selectnodeId);
		var node = $tree.treeview('getNode', nodeId);
		$('#tree').treeview('search',[node.text,{ignoreCase:false,exactMatch:false,revealResults : true}]);
		if ($(".search-result").length != 0) {
			$(".search-result").click();
		}
	}else{
		bootstrapTree(dataset);
		if(selectNodeId != undefined && $tree.treeview('getNode', selectNodeId) != null){
			$tree.treeview('selectNode',selectNodeId);
			$tree.treeview('revealNode', selectNodeId);
		}else if(selectParentId != undefined && $tree.treeview('getNode', selectParentId) != null){
			$tree.treeview('selectNode',selectParentId);
			$tree.treeview('revealNode', selectParentId);
			$tree.treeview('expandNode', selectParentId);
			
		}
	}
}

//搜索树
function searchTree(){
	var searchInput = $('#searchInput').val();
	$tree.treeview('clearSearch');
	$($tree).scrollTop(0);
	if(searchInput != ""){
		$tree.treeview('collapseAll');
		var search_result = $tree.treeview('search',[searchInput,{ignoreCase:false,exactMatch:false,revealResults : true}]);
		if (search_result.length == 0) {
			layer.msg("没有搜索结果", {icon: 5});
		}else{
			var $node = $($tree).find("[data-nodeid="+search_result[0].nodeId+"]");
			if($node.offset().top > $($tree).height()){
				//$($tree).scrollTop($node.offset().top);
				$($tree).scrollTop($node.offset().top-$($tree).height());
			}
		}
		
	}else{
		layer.msg("请输入搜索项", {icon: 5});
	}
}

function checkNode(node,ids){
	ids.push(node.nodeId);
	if(node.nodes != null){
		var childrens = node.nodes;
		for(var i=0;i<childrens.length;i++){
			ids.push(childrens[i].nodeId);
			checkNode(childrens[i],ids);
		}
	}
}

function unckedNode(node,ids){
	ids.push(node.nodeId);
	if(node.nodes != null){
		var childrens = node.nodes;
		for(var i=0;i<childrens.length;i++){
			ids.push(childrens[i].nodeId);
			unckedNode(childrens[i],ids);
		}
	}
}
//获取选中的节点
function getSelectNode() {
	var nodes = $tree.treeview("getSelected");
	if(nodes.length>0){
		return nodes[0];
	}else{
		return false;
	}
}
//获取勾选中的节点
function getCheckedNodes() {
	var nodes = $tree.treeview("getSelected");
	if(nodes != null && nodes.length > 0) {
		return nodes;
	}else {
		layer.msg("请选择一个节点进行操作", {
			icon: 5
		});
		return [];
	};
}