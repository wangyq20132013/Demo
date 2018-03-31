$(function() {
	
});

function loadTree(row){
	var obj = $.extend({initall:dataset.treeview[0].initall}, row);
	$.ajax({
		type:"post",
		url: cxt + "/datainterface/getdata/bootstraptree/" + dataset.treeview[0].name,
		async:false,
		contentType: "application/json",
		dataType:"JSON",
		data:JSON.stringify(obj),
		success:function(data){
			if(data.length > 0){
				$tree = $("#tree").treeview({
					data: data, // data is not optional
					levels: dataset.treeview[0].levels,//默认展示的层级
					showCheckbox:dataset.treeview[0].showCheckbox,
					onNodeSelected:function(event,node){//节点被选择的时候
						
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
				
				initTreeContextMenu();
			}
		}
	});	
}