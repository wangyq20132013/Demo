var height = $(window).height() - $("#opt").outerHeight(true) - $("#query").outerHeight(true)-30;
var nodeId;
var editor;
var zTree;
var treeNodes;

$(function() {
	$('#treetitle').html("二次开发手册");
	
	$('#searchInput').keydown(function(e){
		if(e.keyCode == 13){
			searchTree();
		}
	});

	initTree();
	
	$("#nodecontent").hide();
	$("#htmlframe").hide();
});

function initAreatext(mode) {
	if(!mode){
		mode = "text/x-pgsql";
	}
	editor = CodeMirror.fromTextArea(document.getElementById('nodecontent'), {
		mode: mode,
		height: "500px",
		indentWithTabs: true,
		lineWrapping: true,
		smartIndent: true,
		lineNumbers: true,
		matchBrackets: true,
		autofocus: false,
		theme:''
	});
	$(".CodeMirror").height(height-$("#table").height()-35);
	$(".CodeMirror-scroll").height(height-$("#table").height()-35);
}

function initTree(node) {
	var setting = {
		view: {
				dblClickExpand: true,
				showLine: true,
				selectedMulti: false
			},
			check:{
				enable:false,
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
				onClick: zTreeOnClick
			}
	};
	zTree = $.fn.zTree.init($("#tree"), {
		isSimpleData: false, //数据是否采用简单 Array 格式，默认false  
		showLine: true, //是否显示节点间的连线  
		check: {
			enable: false
		},
		async: {
			enable: true,
			type: 'POST',
			url: cxt + "/developer/gettree",
			contentType: "application/json",
			dataType: "json",
			autoParam: ["TREEID","TREEPARENTID"]
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
			onAsyncSuccess: function(event, treeId, treeNode, data){
				var ztreeObj = $.fn.zTree.getZTreeObj(treeId);
				if(!treeNode){
					var node = ztreeObj.getNodeByParam("TREEID",-1,null);
					if(node){
						ztreeObj.expandNode(node,true,true,true);
					}
				}
			}
		}
	});
}

//节点点击事件
function zTreeOnClick(event, treeId, treeNode){
	if(treeNode != null){
		if(typeof(nodeOnClick) == "function"){
			nodeOnClick(treeNode);
		}
	}
}

function nodeOnClick(node){
	var type = node.TYPE;
	var memo = node.MEMO;
	$("#nodedesc").html(node.TITLE);
	if(type == 'text'){
		$("#htmlframe").hide();
		if(memo != ''){
			$("#nodecontent").show();
			$("#nodecontent").val(memo);
//			initAreatext();
		}
	}else if(type == 'json'){
		$("#htmlframe").hide();
		if(memo != ''){
			$("#nodecontent").show();
			$("#nodecontent").val(memo);
//			initAreatext('text/json');
		}
	}else if(type == 'xml'){
		$("#htmlframe").hide();
		if(memo != ''){
			$("#nodecontent").show();
			$("#nodecontent").val(memo);
//			initAreatext('text/html');
		}
	}else if(type == 'js'){
		$("#htmlframe").hide();
		if(memo != ''){
			$("#nodecontent").show();
			$("#nodecontent").val(memo);
//			initAreatext('text/javascript');
		}
	}else if(type == 'url'){
		$("#nodecontent").hide();
		
		if(memo != ''){
			$("#htmlframe").show();
			$("#htmlframe").attr("src", memo);
		}
	}else if(type == 'table'){
		//表格显示字段信息
	}
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
