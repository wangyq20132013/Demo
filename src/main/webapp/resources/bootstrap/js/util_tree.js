/**
 * 将后台传过来的list转换成bootstrap-treeview所需的格式
 * */
function getTreeData(list) {
	list.sort(function(a, b) {
		if (a.pid > b.pid) {
			return 1;
		} else {
			return -1;
		}
	});
	var item,
		result = [];
	//遍历根节点，递归处理其所有子节点的数据
	//每处理完一个根节点，就将其及其所有子节点从list中删除，加快递归速度
	while (list.length) {
		item = list[0];
		list.splice(0, 1);
		delete item.pid;
		getAllNodes(list, item);
		result.push(item);
	}
	return result;
}

function getAllNodes(list, item) {
	var nodes = getNextLevelNodes(list, item);
	for (var i = 0, ii = nodes.length; i < ii; i++) {
		getAllNodes(list, nodes[i]);
	}
}
//遍历list剩下的数据，找到item的下一层的子节点
function getNextLevelNodes(list, item) {
	var nodes = [];
	for (var i = list.length - 1; i >= 0; i--) {
		var mid = list[i];
		if (mid.pid === item.id) {
			delete mid.pid;
			nodes.push(mid);
			list.splice(i, 1);
		}
	}
	if (nodes.length > 0) {
		item.nodes = nodes;
	}
	return nodes;
}

/**
 * 时间格式化
 * */
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

Array.prototype.in_array = function(e){
	for(i=0;i<this.length;i++){
		if(this[i]==e){
			return true;
		}
	}
	return false;
}
