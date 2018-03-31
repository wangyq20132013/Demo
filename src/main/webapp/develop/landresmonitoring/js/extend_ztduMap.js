var zTree;
var echarttext = "图斑数量统计";
var maxvaluenum = 10;
var maxvaluearea = 10;

var patchGSlist = [];
var patchMJlist = [];
var MJoption;
var GSoption;
var patchInfolist = [];
var patchGSInfolist = [];
var patchMJInfolist = [];
var patchType = []; // 图斑类型
var patchPro = []; // 图斑属性
var patchSelectType = [];
var paramZidu={};
var isfalg = true;
var index;
var radiov = 1;
var fenQu = [ '0-500', '500-1000', '1000-1500', '1500-2000', '2000以上' ];

var detailPro=params.key; 


$(function() {
	zTree = initTree("tree", "queryAllMonitoring");
	// 选择radiov
	if (params) {
		radiov = params.radiov;
	}
    if(detailPro!=null){
    	if(radiov==3){
    		radiov=1;
    	}
     }
	$("input[value=" + radiov + "]").attr("checked", true);
})

function radiochange(value) {
	   radiov=value;
	   if(detailPro == "tubantype"){
	   	   getTbMap(paramZidu, radioType, radioName);
	   }
	   
	   if(detailPro == "tubanproperty"){
	   	  getTbMap(paramZidu, radioProp, radioName);
	   }
	   
	   if(detailPro=="tubanall"||detailPro==null){
	   
	   	   getMap(paramZidu);
	  
	   }
	  
}


function showDedail(event){
		var paramdetail={"key":event.id,"theme":theme,radiov:$("input:radio:checked").val()};
		var paramZuti=$.extend(paramdetail,paramZidu);
		popupPage("map","",event.id,"in",paramZuti);
} 
/**
 * 加载radio：
 */
function getRadio() {

	if (detailPro == "tubantype") {
		var elementradio;
		// 默认全部类型
		var parentid = $("#radioType"); // 获取父级元素；
		for (var i = 0; i < patchType.length; i++) {
			var element = '<label style="padding-right:5px;font-weight: 100;"><input name="typeYang" class="typeYang" type="radio" id='
					+ patchType[i].NAME
					+ ' value='
					+ patchType[i].ID
					+ ' onclick="getpatch(this)">'
					+ patchType[i].NAME
					+ '</label>';
			parentid.append(element);
		}
		parentid
				.append('<label style="font-weight: 100;"><input name="typeYang" class="typeYang" type="radio" value="" onclick="getpatch(this)">全部类型</label>');
		$("input[name=typeYang]:first").trigger("click");
	}

	if (detailPro == "tubanproperty") {
		var elementradio;
		// 默认全部类型
		var parentid = $("#radioType"); // 获取父级元素；
		for (var i = 0; i < patchProp.length; i++) {
			var element = '<label style="padding-right:5px;font-weight: 100;"><input name="typeYang" class="typeYang" type="radio" id='
					+ patchProp[i].NAME
					+ ' value='
					+ patchProp[i].ID
					+ ' onclick="getpatch(this)">'
					+ patchProp[i].NAME
					+ '</label>';
			parentid.prepend(element);
		}
		parentid
				.append('<label style="font-weight: 100;"><input name="typeYang" class="typeYang" type="radio" value="" onclick="getpatch(this)">全部类型</label>');
		$("input[name=typeYang]:first").trigger("click");
	}
}

/**
 * 定义同步向后台传送数据的方式；
 */
var uadpAsync = {
	getData : function(type, dateset, data, callback) {
		$.ajax({
			type : "post",
			async : false,
			url : cxt + "/datainterface/getdata/" + type + "/" + dateset,
			contentType : "application/json",
			data : JSON.stringify(data),
			dataType : "JSON",
			success : function(data) {
				callback(data);
			},
		});
	}
}

var radioType = [];
var radioProp = [];
var radioName = [];
/**
 * 详情页面点击图斑类型获取相应图斑的状态和数量; 并且更新表格的数据；
 * 
 * @param event
 * @returns
 */
function getpatch(event) {
	if (event.checked == "checked") {
		$("input[name=typeYang]").removeAttr("checked");
		return;
	} else {
		$("input[name=typeYang]").removeAttr("checked");
		event.checked = true;
	}

	if (detailPro == "tubantype") {
		if (event.defaultValue != "") {
			radioType = [];
			radioName = [];
			radioType.push(event.value); // 将选择的图斑类型当做参数，主要用于初始化表格；
			radioName.push(event.id);
		} else {
			radioType = patchSelectType; // 全部类型；
			radioName = patchSelectNameType
		}

		var param = {
			"period" : paramZidu.monitoringdate,
			'navtype' : paramZidu.TREESTATUS,
			'citycode' : paramZidu.CODE,
			'typecode' : radioType,
			'treeid' : paramZidu.TREEID,
			'pid' : paramZidu.TREEPARENTID,
			'isparent' : paramZidu.ISPARENT
		};
		getTbMap(paramZidu, radioType, radioName);
		initTypeTable(param);
	}
	if (detailPro == "tubanproperty") {
		if (event.defaultValue != "") {
			radioProp = [];
			radioName = [];
			radioProp.push(event.value);
			radioName.push(event.id);
		}// 将选择的图斑类型当做参数，主要用于初始化表格；

		else {
			radioProp = [];
			radioProp = patchSelectProp;
			radioName = patchSelectNameProp;
		}
		// 全部类型；}
		var param = {
			"period" : paramZidu.monitoringdate,
			'navtype' : paramZidu.TREESTATUS,
			'citycode' : paramZidu.CODE,
			'typecode' : radioProp,
			'treeid' : paramZidu.TREEID,
			'pid' : paramZidu.TREEPARENTID,
			'isparent' : paramZidu.ISPARENT
		};
		initTypeTable(param);
		getTbMap(paramZidu, radioProp, radioName)
	}
}
/**
 * 选中第一个节点并且执行点击事件
 * 
 * @param data
 * @returns
 */
function nodeSuccessClick(data) {
	if (params.TREEID) {
		var nodeTree = zTree.getNodesByParam("TREEID", params.TREEID);
		if (nodeTree.length == 1) {
			zTree.selectNode(nodeTree[0]);
			nodeOnClick(nodeTree[0].attributes);
		}
	} else {
		var nodes = zTree.getNodesByParam("TREEID", data[0].attributes.TREEID);
		if (nodes.length == 1) {
			zTree.selectNode(nodes[0]);
			nodeOnClick(nodes[0].attributes);
		}
	}

}

/**
 * 选择的时期
 * 
 * @param value
 * @param title
 * @returns
 */
function refreshData(value, title) {
	var node = zTree.getSelectedNodes()[0].attributes;
	if (params.monitoringdate) {
		$("#monitoringDate option[value=" + params.monitoringdate + "]").prop(
				"selected", true);
		paramZidu.monitoringdate = params.monitoringdate;
		params = {};
	} else {
		paramZidu.monitoringdate = value;
	}
	paramZidu = $.extend(node,paramZidu);
	if (detailPro == "tubantype") { // 加载详情表格
		getAllType();

		if (isfalg) {
			getRadio(); // 如果是第一次，则加载radio类型数据
			isfalg = false;
		} else {
			var param = {
				"period" : paramZidu.monitoringdate,
				'navtype' : paramZidu.TREESTATUS,
				'citycode' : paramZidu.CODE,
				'typecode' : radioType,
				'treeid' : paramZidu.TREEID,
				'pid' : paramZidu.TREEPARENTID,
				'isparent' : paramZidu.ISPARENT
			};
			initTypeTable(param);
			getTbMap(paramZidu, radioType, radioName);
		}
	}
	if (detailPro == "tubanproperty") {
		getAllProp();
		if (isfalg) { // 如果是第一次，则加载radio类型数据
			getRadio();
			isfalg = false;
		} else {
			var param = {
				"period" : paramZidu.monitoringdate,
				'navtype' : paramZidu.TREESTATUS,
				'citycode' : paramZidu.CODE,
				'typecode' : radioProp,
				'treeid' : paramZidu.TREEID,
				'pid' : paramZidu.TREEPARENTID,
				'isparent' : paramZidu.ISPARENT
			};
			initTypeTable(param);
			getTbMap(paramZidu, radioProp, radioName);
		}

	}
	if (detailPro == null) {
		getAllType();
		getAllProp();
		getTbEchart('patchtype', paramZidu, patchSelectType,patchSelectNameType);
		getTbEchart('patchproperty', paramZidu, patchSelectProp,patchSelectNameProp); // 获取图斑属性值
		getall(paramZidu); // 加载图斑总体分布图
		getMap(paramZidu);// 加载全部地图；

	}
	if (detailPro == "tubanall") {
		getAllType();
		var param = {
			"period" : paramZidu.monitoringdate,
			'navtype' : paramZidu.TREESTATUS,
			'citycode' : paramZidu.CODE,
			'typecode' : null,
			'treeid' : paramZidu.TREEID,
			'pid' : paramZidu.TREEPARENTID,
			'isparent' : paramZidu.ISPARENT
		};
		initTypeTable(param);
	     getMap(paramZidu);
	}

}

/**
 * 点击树节点触发事件；
 */
function nodeOnClick(node) {
	var navtype = node.TREESTATUS;
	paramZidu={};
	paramZidu = $.extend(node,paramZidu);
	if (navtype != $("#monitoringDate").attr("navtype")) {
		// 初始化左上角select 监测期数数据
		initMonitoringDate(navtype);
		$("#monitoringDate").attr("navtype", navtype);
	} else {
		var value = $("#monitoringDate").val();
		paramZidu.monitoringdate = value;
		if (detailPro == null) {
			getTbEchart('patchtype', paramZidu, patchSelectType,patchSelectNameType);
			getTbEchart('patchproperty', paramZidu, patchSelectProp,patchSelectNameProp);
			getall(paramZidu); // 加载图斑总体分布图
		}
		if (detailPro == "tubantype") {
			var param = {
				"period" : paramZidu.monitoringdate,
				'navtype' : paramZidu.TREESTATUS,
				'citycode' : paramZidu.CODE,
				'typecode' : radioType,
				'treeid' : paramZidu.TREEID,
				'pid' : paramZidu.TREEPARENTID,
				'isparent' : paramZidu.ISPARENT
			};
			initTypeTable(param);
		}
		if (detailPro == "tubanall") {
			var param = {
				"period" : paramZidu.monitoringdate,
				'navtype' : paramZidu.TREESTATUS,
				'citycode' : paramZidu.CODE,
				'typecode' : null,
				'treeid' : paramZidu.TREEID,
				'pid' : paramZidu.TREEPARENTID,
				'isparent' : paramZidu.ISPARENT
			};
			initTypeTable(param);
		}
		if (detailPro == "tubanproperty") {
			var param = {
				"period" : paramZidu.monitoringdate,
				'navtype' : paramZidu.TREESTATUS,
				'citycode' : paramZidu.CODE,
				'typecode' : radioProp,
				'treeid' : paramZidu.TREEID,
				'pid' : paramZidu.TREEPARENTID,
				'isparent' : paramZidu.ISPARENT
			};
			initTypeTable(param);
		}
	//添加地图遮罩
      
	}
 if(node.TREEID!='1010'){
 	addBoder(paramZidu);
 }
	 
}
/**
 * 初始化表格
 * 
 * @param dataset
 * @returns
 */
function initTypeTable(param) {
	initTable("table", {
		name : "queryTable",
		metadata : [ {
			field : "NAME",
			title : "行政区划名称"
		}, {
			field : "COUNT",
			title : "图斑数量(个)"
		}, {
			field : "MIANJI",
			title : "图斑面积(亩)"
		} ],
		height : $("#right_box").height()
	}, param);
}

/**
 * 转换数值
 * 
 * @param shuzhi
 * @returns
 */
function convertnumber(shuzhi) {
	var mc;
	if (shuzhi == "0") {
		mc = 10;
	} else {
		var max = String(shuzhi);
		if (max.length == 1) {
			mc = "10";
		} else {
			var minque = "0";
			mc = String(parseInt(max[0]) + 1);
			for (var i = 1; i < max.length - 1; i++) {
				minque = minque + "0";
			}
			mc = mc + minque;
		}
	}

	return mc;

}

var obj=new Object();  //根据radiotype的不同，显示的框中的字段不一样
var landLayerName;//图层的名称；
/**
 * 获取地图数据
 * 
 * @returns
 */
function getMap(paramZidu) {
	if(popup){
		popup.hide();
	}
	
	var wmsurl =  mapOption.maps[0].layerurl;
	if(radiov==undefined||radiov==1){
		 landLayerName="tball_num";
		 var wmsLayer = getWmsLayer(cxt + wmsurl, landLayerName,{"CQL_FILTER":"where navtype = '"+paramZidu.TREESTATUS+"' AND period='"+paramZidu.monitoringdate+"'"});
        obj={"name":'landnum',"title":'图斑个数'};
       
         $("#landType").html("图斑数量(个)");
	}
	if(radiov==2){
		landLayerName="tball_area";
		var wmsLayer = 	getWmsLayer(cxt + wmsurl, landLayerName,{"CQL_FILTER":"where navtype = '"+paramZidu.TREESTATUS+"' AND period='"+paramZidu.monitoringdate+"'"});
	    $("#landType").html("图斑面积(亩)");
	    obj={"name":'landarea',"title":'图斑面积'}
	   
	}
	if(radiov==3){
		landLayerName="tball_credit";
		var wmsLayer = 	getWmsLayer(cxt + wmsurl, landLayerName,{"CQL_FILTER":"where period='"+paramZidu.monitoringdate+"'"});
	    $("#landType").html("土地信用度");
	    obj={"name":'creditrating',"title":'信用度'};
	    
	}

	if(prewmsLayer!=wmsLayer){
		map.removeLayer(prewmsLayer);
		wmsLayer.setZIndex(0);
		layers["china_city_alberss"].setZIndex(1);
		layers[landLayerName] = wmsLayer;
		map.addLayer(wmsLayer);
		 initPopup();
	}
	
     prewmsLayer=wmsLayer;
    $("#legend").attr("src", cxt+ "/tms/wms?server=wms&version=1.1.0&request=GetLegendGraphic&layer=qth:"+landLayerName+"&format=image/png&width=25&height=25");
}
	
/**
 * 获取图斑类型
 * 
 * @returns
 */
function getTbEchart(id,paramZidu, lx,lxName) {
	var CountList = [ {
		name : '无',
		value : 0
	} ];
	var MianjiList = [ {
		name : '无',
		value : 0
	} ];
	var patchInfolist = [];
	var objEchartTypeMianji = new Object();
	var objEchartTypeCount = new Object();
	uadp.getData("list", "queryEchart", {
		"period" : paramZidu.monitoringdate,
		'navtype' : paramZidu.TREESTATUS,
		'citycode' : paramZidu.CODE,
		'treeid' : paramZidu.TREEID,
		'pid' : paramZidu.TREEPARENTID,
		'typecode' : lx
	}, function(data) {
		// >>>>>>>加载图斑类型需要用到；
		for (var i = 0; i < data.data.length; i++) {
			// 1.图斑类型数量
			var objEchartTypeCount = {
				name : data.data[i].LEIXING,
				value : data.data[i].COUNT
			}
			CountList.push(objEchartTypeCount);

			// 2.图斑类型面积
			var objEchartTypeMianji = {
				name : data.data[i].LEIXING,
				value : data.data[i].MIANJI
			}
			MianjiList.push(objEchartTypeMianji);
		}
		if (CountList.length > 1) {
			CountList.splice(0, 1);
			MianjiList.splice(0, 1);
		}
		getEchart(id, CountList, MianjiList,lxName);// 加载图斑类型；
	})

}

/**
 * 比较大小值
 * 
 * @param value
 * @returns
 */
function bijiao(value) {
	var max;
	for (var i = 0; i < value.length; i++) {
		if (parseInt(value[i]) > parseInt(value[i + 1])) {
			max = value[i];
			value[i] = value[i + 1];
			value[i + 1] = max;
		} else {
			max = value[i];
		}
	}
	return max;
}
var prewmsLayer="tball_num";
/**
 * 获取类型地图
 * 
 * @returns
 */
function getTbMap(paramZidu, radiotype, radioName) {
	if(popup){
		popup.hide();
	}
	var wmsLayer;
	var wmsurl =  mapOption.maps[0].layerurl;
	
	if(prewmsLayer!=wmsLayer){
	if(radiov==1){//num
	  if(radiotype.length>1){//设置图层的类型为tb_num
		if(detailPro=="tubantype"){//图斑总数
		        landLayerName="tball_num";
		        wmsLayer =getWmsLayer(cxt + wmsurl, landLayerName,{"CQL_FILTER":"where navtype = '"+paramZidu.TREESTATUS+"' AND period='"+paramZidu.monitoringdate+"'"});   
		}else{
	      	    landLayerName="tball_ill_num"; //违法总数
		        wmsLayer =getWmsLayer(cxt + wmsurl, landLayerName,{"CQL_FILTER":"where navtype = '"+paramZidu.TREESTATUS+"' AND period='"+paramZidu.monitoringdate+"'"});
		   }
		
		}else{//走类型图斑
			
			landLayerName="tblx_num";
			wmsLayer =getWmsLayer(cxt + wmsurl, landLayerName,{"CQL_FILTER":"where navtype = '"+paramZidu.TREESTATUS+"' AND period='"+paramZidu.monitoringdate+"' and typecode='"+radiotype+"'"});
		  
		}
		$("#landType").html("图斑数量(个)");
		 obj={"name":'landnum',"title":'个数统计'}
		
	}else{//area
		 if(radiotype.length>1){//设置图层的类型为tb_num
			if(detailPro=="tubantype"){//area总数
			       landLayerName="tball_area";
			       wmsLayer =getWmsLayer(cxt + wmsurl, landLayerName,{"CQL_FILTER":"where navtype = '"+paramZidu.TREESTATUS+"' AND period='"+paramZidu.monitoringdate+"'"});
		      }else{
		      	   landLayerName="tball_ill_area"; //违法总数
		      	   wmsLayer =getWmsLayer(cxt + wmsurl, landLayerName,{"CQL_FILTER":"where navtype = '"+paramZidu.TREESTATUS+"' AND period='"+paramZidu.monitoringdate+"'"});
		      }
			
			}else{//走类型图斑
				landLayerName="tblx_area";
				wmsLayer =getWmsLayer(cxt + wmsurl, landLayerName,{"CQL_FILTER":"where navtype = '"+paramZidu.TREESTATUS+"' AND period='"+paramZidu.monitoringdate+"' and typecode='"+radiotype+"'"});
			}
			$("#landType").html("图斑面积(亩)");
			obj={"name":'landarea',"title":'面积统计'}
	        
	}
		map.removeLayer(prewmsLayer);
		wmsLayer.setZIndex(0);
		layers["china_city_alberss"].setZIndex(1);
		layers[landLayerName] = wmsLayer;
		map.addLayer(wmsLayer);
		initPopup();
	}

	prewmsLayer=wmsLayer;
	$("#legend").attr("src", cxt+"/tms/wms?server=wms&version=1.1.0&request=GetLegendGraphic&layer=qth:"+landLayerName+"&format=image/png&width=25&height=25");
}


/**
 * 获取图斑的总体分布图；
 * 
 * @returns
 */
function getall(paramZidu) {
	var minMian;
	var maxMian;
	var patchInfolist = [];
	var echartCountList = [ {
		"name" : "无",
		"value" : 0
	} ];
	var echartMianjiList = [ {
		"name" : "无",
		"value" : 0
	} ];
	var objEchartMianji = new Object();
	var objEchartCount = new Object();
	for (var i = 0; i < fenQu.length; i++) {
		var ecName = fenQu[i];
		var qujian = fenQu[i].split("-");
		if (i == fenQu.length - 1) {
			minMian = parseInt(qujian[0].slice(0, qujian[0].length - 2));
			maxMian = 0;
		} else {
			minMian = parseInt(qujian[0]);
			maxMian = parseInt(qujian[1]);
		}

		uadpAsync.getData("list", "queryEchartAll", {
			"period" : paramZidu.monitoringdate,
			'navtype' : paramZidu.TREESTATUS,
			'citycode' : paramZidu.CODE,
			'treeid' : paramZidu.TREEID,
			'pid' : paramZidu.TREEPARENTID,
			'minMian' : minMian,
			'maxMian' : maxMian
		}, function(data) {
			// >>>>>>>加载图斑类型需要用到；
			if (data.data[0].MIANJI != null) {
				var objEchartCount = {
					name : ecName,
					value : data.data[0].COUNT
				}

				echartCountList.push(objEchartCount);

				// 2.图斑类型面积
				var objEchartMianji = {
					name : ecName,
					value : data.data[0].MIANJI
				}
				echartMianjiList.push(objEchartMianji);
			}

		}

		)
	}

	if (echartCountList.length > 1) {
		echartCountList.splice(0, 1);
		echartMianjiList.splice(0, 1);
	}
	getAllEchart(echartCountList, echartMianjiList,fenQu);// 加载图斑属性
}

var patchSelectNameType = [];
/**
 * 获取图斑全部类型
 * 
 * @param dataset
 * @returns
 */
function getAllType() {
	patchType = [];
	patchSelectType = [];
	patchSelectNameType = [];
	uadpAsync.getData("list", 'queryPatchType', {}, function(data) {
		patchType = data.data;
		for (var i = 0; i < data.data.length; i++) {
			patchSelectNameType.push(data.data[i].NAME);
			patchSelectType.push(data.data[i].ID);
		}
	})

}

var patchProp = [];
var patchSelectProp = [];
var patchSelectNameProp = [];
/**
 * 获取所有的图斑属性
 * 
 * @returns
 */
function getAllProp() {
	patchProp = [];
	patchSelectProp = [];
	patchSelectNameProp = [];
	uadpAsync.getData("list", 'queryPatchProp', {}, function(data) {
		patchProp = data.data;
		for (var i = 0; i < data.data.length; i++) {
			patchSelectNameProp.push(data.data[i].NAME);
			patchSelectProp.push(data.data[i].ID);
		}
	})
}


//初始化popup
var popup = null;
function initPopup(){
	popup = new ol.Overlay.Popup({
		popupClass : "black", 
		closeBox : true,
		positioning : 'bottom-left',
		autoPan : true,
		autoPanAnimation : {
			duration : 50
		}
	});
	map.addOverlay(popup);
	map.on('singleclick', function(evt) {
        var view = map.getView();
        var viewResolution = view.getResolution();
        if(landLayerName && layers[landLayerName].get("visible")){
    		var source = layers[landLayerName].getSource();
    		var url = source.getGetFeatureInfoUrl(
		          evt.coordinate, viewResolution, view.getProjection(),
		          {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50});
			$.getJSON(url, function(data){
				if(data.features.length>0){
					popup.show(evt.coordinate, createPopupContent(data.features[0]));

					
				}
			});
    	}
      });
}
//构造信用度详情内容
function createPopupContent(feature){
	
	var geometry = feature.geometry;
	var properties = feature.properties;
	var content = $("<div class='ol-popup-content' style='width:200px;'></div>");
	
	mapOption.popupText=[{"name":"gdstitle","title":"市名称"},
					{"name":"gdsid","title":"市编码"}]
	var popupText = mapOption.popupText;
	popupText.push(obj);
	for(var i = 0;i < popupText.length;i++){
		content.append("<h6>"+popupText[i].title+"："+properties[popupText[i].name]+"</h6>");
	}
	
	return content;
}
