var height = innerHeight;
var checkFax=/^(\d{3,4}-)?\d{7,8}$/
var telePhone=/^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
var versionName=/^[0-9]\.{0,1}[0-9]+\.{0,1}([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8])))[0-9]{2}$/;
var bfzj = /^([1-9]\d{0,15}|0)(\.\d{1,4})?$/;
var prebfzj = /^([1-9]\d{0,15}|0)(\.\d{1,4})?$/;
$(function() {
	initSelectOptions();
	$("form").validate({
		rules: {
			fhyj: {
				illegality:true,
				required: true,
				minlength: 2,
				maxlength: 16
			},
			zizhi:{
				illegality:true
			},
			faren:{
				illegality:true
			},
			addr:{
				illegality:true
			},
			mj:{
				illegality:true
			},
			xmmc:{
				illegality:true
			},
			jsdw:{
				illegality:true
			},
			zlnf:{
				illegality:true
			},
			versionName:{
				illegality:true
			},
			czwt: {
				maxlength: 500
			},
			zgresult: {
				illegality:true,
				required: true,
				maxlength: 500
			},
			zgryid:{
				required: true
			},
			fhopnion: {
				required: true,
				maxlength: 500
			},
			wjm: {
				required: true,
				illegality:true
			},
			yhnr: {
				required: true,
				illegality:true
			},
			gzl: {
				illegality:true,
				required: true,
			},
			tq: {
				illegality:true,
				required: true,
			},
			zgstatus: {
				required: true
			},
			zgyq: {
				required: true,
				maxlength: 500
			},
			zgtime: {
				required: true
			},
			zgtime1: {
				required: true
			},
			mobilephone: {
				required: false,
				isMobile: true
			},
			zgqx: {
				illegality:true,
				required: true
			},
			qx: {
				required: true,
				illegality:true
			},
			yhdwmc: {
				required: true,
				illegality:true
			},
			standard:{
				illegality:true,
			},
			bz:{
				illegality:true,
			},
			loginname: {
				required: true,
				illegality:true,
				remote:{
					url:"../../../datainterface/verify/queryUserSFCZ",
					type:"get",
					dataType:"json",
					data:{
						loginname: function(){
							return $("#loginname").val();
						},
						lid:function(){
							return $("#lid").val();
						}
					}
				}
			},
			yhyloginname: {
				required: true,
				illegality:true,
				remote:{
					url:"../../../datainterface/verify/queryYHYSFCZ",
					type:"get",
					dataType:"json",
					data:{
						loginname: function(){
							return $("#yhyloginname").val();
						},
						id:function(){
							return params.UUID;
						}
					}
				}
			},
			loginname1:{
				required: true,
				illegality:true
			},
			logintitle: {
				required: true,
				illegality:true,
				maxlength: 16
			},
			password: {
				illegality:true
				//required: true
				
			},
			newpwdpassword: {
				password: true,
				illegality:true
			},
			newpwdagain: {
				password: true,
				illegality:true
				
			},
			loginpwd: {
				required: true,
				illegality:true
			},
			name: {
				required: true,
				illegalityname:true,
			},
			gzl: {
				required: true,
				illegality:true
			},
			telephone: {
				required: false,
				isPhone: true
			},
			email: {
				required: false,
				email:true
			},
			bbh: {
				required: true
			},
			file: {
				required: true
			},
			fax: {
				
				fax: true
			},
			lxdh: {
				isMobile: true
			},
			xjtype:{
				required: true
			},
			xjtime:{
				required: true
			},
			xjuserid:{
				required: true
			},
			appname:{
				required: true,
				illegality: true
			},
			maintaincode:{
				required: true,
				illegality: true
			},
			unit:{
				required: true,
				illegality: true
			},
			cs:{
				required: true,
				illegality: true
			},
			bfdw:{
				illegality:true,
				required: true,
				maxlength: 50
			},
			bfsj:{
				required: true
			},
			bfzj:{
				isNumber: true,
				bfzj: true
			},
			prebfzj:{
				isNumber: true,
				bfzj: true
			},
			status:{
				required: true
			},
			roletitle:{
				required: true,
				illegality: true
			},
			roledesc:{
				minlength: 0,
				maxlength: 200
			},
			price:{
				required: true
			},
			cailprice:{
				required: true
			},
			jixprice:{
				required: true
			},
			
			LOGINNAME:{
				required: true,
				illegality: true,
				remote:{
					url:"../../../datainterface/verify",
					type:"get",
					dataType:"json",
					data:{
						loginname: function(){
							return $("#LOGINNAME").val();
						},
						lid:function(){
							return $("#LID").val();
						}
					}
				}
			},
			LOGINTITLE:{
				required: true,
				illegality: true
			},
			LPHONE:{
				isTel:true
			},
			LEMAIL:{
				email:true
			},
			LMOBILEPHONE:{
				isMobile:true,
			},
			LIDCARD:{
				isIdCardNo:true,
			},
			USERORDERINDEX:{
				required: true,
				isDigits: true,
				maxlength:6
			},
			USERTITLE:{
				required: true,
				minlength:1,
				maxlength: 20,
				illegality:true,
			},
			USERCODE:{
				stringCheck:true
			},
			USERMEMO:{
				illegality:true,
				MAXlength_200: true,
			},
			LADDRESS:{
				illegality:true,
			},
			title:{
				required: true,
				illegality:true,
				maxlength: 25
			},
			keyword:{
				illegality:true
			},
			peoplenum:{
				isNumber: true,
				maxlength: 6
			},
			tel:{
				telephone: true
			},
			person1:{
				illegality:true,
			},
			job1:{
				illegality:true,
			},
			phone1:{
				isMobile:true,
			},
			person2:{
				illegality:true,
			},
			job2:{
				illegality:true,
			},
			phone2:{
				isMobile:true
			},
			versionName:{
				versionName:true
			},
			bbh:{
				versionName:true
			}
		},
		messages:{
			yhyloginname:{
				remote:"用户名已存在"
			},
			loginname:{
				remote:"用户名已存在"
			},
			LOGINNAME:{
				remote:"用户名已存在"
			}
		},
		onkeyup: false,
		focusCleanup: true,
		success: "valid"
	});
	
	jQuery.validator.addMethod("versionName",
			 function(value,element){
				if(versionName.test(value)){
					return true;
				}else{
					return false;
				}
			},"请正确输入版本号,版本号格式为主版本号+.+小版本号+.+时间+序号.例如1.0.2017012001");
	
	jQuery.validator.addMethod("password",
			function(value,element){
		if($("#lid").val()!= undefined && $("#lid").val() != ""&& $("#lid").val() != null&& $("#lid").val() != "null"){
			return true;
		}else{
			if(value == ""){
				return false;
			}else{
				
				return true;
			}
		}
	},"请输入密码");
	
	jQuery.validator.addMethod("telephone",
	 function(value,element){
		if(telePhone.test(value) || value==''){
			return true;
		}else{
			return false;
		}
	},"请正确输入固话号码");
	
	jQuery.validator.addMethod("bfzj",
			 function(value,element){
				if(bfzj.test(value)){
					return true;
				}else{
					return false;
				}
			},"最多精确到小数点后四位");
		
	
	jQuery.validator.addMethod("fax",
	 function(value,element){
		if(checkFax.test(value) || value==''){
			return true;
		}else{
			return false;
		}
	},"请正确输入传真号码");
	
	var email=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	jQuery.validator.addMethod("email",
	 function(value,element){
		if(value.length == 0 || email.test(value)){
			return true;
		}else{
			return false;
		}
	},"请正确输入邮箱");
	
	var illegality =/^([^\\"+|^&#%<>\/]+)?$/;
	jQuery.validator.addMethod("illegality",
	 function(value,element){
		if(illegality.test(value)){
			return true;
		}else{
			return false;
		}/*"请不要输入\"+|^&#%<>/-空格等特殊字符"*/
	},"请不要输入特殊字符");
	
	var illegalityname =/^([^\\"+|^&#<>\/]+)?$/;
	jQuery.validator.addMethod("illegalityname",
	 function(value,element){
		if(illegalityname.test(value)){
			return true;
		}else{
			return false;
		}/*"请不要输入\"+|^&#%<>/-空格等特殊字符"*/
	},"请不要输入特殊字符");
	
	jQuery.validator.addMethod("MAXlength_200",
	 function(value,element){
		if(value.length == undefined  || value.length <=20){
			return true;
		}else{
			return false;
		}
	},"长度不能超过两百！");
});
/**
 * 初始化查询区域的select控件数据
 */
function initSelectOptions() {
	var Select = $("form select");
	var data = {};
	$.each(Select, function(i, select) {
		var dataset = $(select).attr("dataset");
		var id = $(select).attr("id");
		var name = $(select).attr("name");
		var value = $(select).attr("value");
		var val = $(select).attr("val");
		data[name] = value;
		var initdata = $(select).attr("initdata");
		if(initdata =='true' && dataset && id) {
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: cxt + "/datainterface/getdata/list/" + dataset,
				async: true,
				data: JSON.stringify(data),
				success: function(data) {
					var html = "<option value=''>--请选择--</option>";
					if($("#" + id).attr("isSelected") == 'false'){
						html = "";
					}
					
					$(data.data).each(function(i, option) {
						html += "<option value='" + option.ID + "'>" + option.TITLE + "</option>";
					});
					$("#" + id).html(html).val(val).trigger("change");
				}
			});
		}else{
			$(select).val(value);
		}
	});
}
/**
 * 保存表单数据
 */
function saveFormData(dataset, title) {
	if($("form").validate()) {
		if($("form").valid()) {
			var data = new FormData($("form")[0]);
			if(params) {
				if(typeof(params) != 'object'){
					params = $.parseJSON(params);
				}
				for(var key in params){
					if(typeof(params[key]) == 'object'){
						var jsonStr = JSON.stringify(params[key]);
						data.append(key, jsonStr);
					}else{
						data.append(key, params[key]);
					}
				}
			}
			saveData(dataset, title, data, function(){
				parent.queryTable();
				parent.closeModal();
			});
		}
	}
}
/**
 * 保存表单数据
 */
function saveNodeData(dataset, title) {
	if($("form").validate()) {
		if($("form").valid()) {
			var data = new FormData($("form")[0]);
			if(params) {
				if(typeof(params) != 'object'){
					params = $.parseJSON(params);
				}
				for(var key in params){
					if(typeof(params[key]) == 'object'){
						var jsonStr = JSON.stringify(params[key]);
						data.append(key, jsonStr);
					}else{
						data.append(key, params[key]);
					}
				}
			}
			
			saveData(dataset, title, data, function(){
				parent.refreshTree();
				parent.closeModal();
			});
		}
	}
}