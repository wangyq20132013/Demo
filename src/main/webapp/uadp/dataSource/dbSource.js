$(function(){
	
});

//连接数据库，创建新连接
function connectDb(){
	$.ajax({
		type : "GET",
		url : cxt + "/",
		dataType:"JSON",
		data : $("#conn_info_form").serialize(),
		success : function(){
			
		}
	})
}