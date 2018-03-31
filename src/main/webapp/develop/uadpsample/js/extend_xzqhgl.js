var treenodeAttr = ['TREEID','TREENAME','XZQHCODE','TREEPARENTID'];

function initFormContent(node){
	var nodeRecord = null;
	var id = node.TREEID;
	if(id != null && id != ''){
		$.ajax({
			type:"post",
			url:cxt+"/datainterface/getdata/list/getXZQHInfo",
			async:false,
			contentType: "application/json",
			data : JSON.stringify(node),
			dataType:"JSON",
			success:function(data){
				var data = data.data;
				if(data.length > 0){
					nodeRecord = data[0];
				}
			}
		});
	}
	return nodeRecord;
}