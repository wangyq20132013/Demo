var zTree;
$(function(){	
    $(".right_data").append('<div class="box_right_zh"><div class="top_right_box animated fadeInRightBig">'+
			'<div class="panel panel-primary" id="zhTop">'+
					'<div class="panel-heading">土地利用信用指数最高10县列表</div>'+
				    '<div class=""><table id="tb_zhTop" class="table"></table></div>'+
			'</div></div>'+
		'<div class="bottom_right_box animated fadeInUpBig">'+
			'<div class="panel panel-primary" id="zhBottom">'+
				'<div class="panel-heading">土地利用信用指数最低10县列表</div>'+
				'<div class="">'+
				'<table id="tb_zhBottom" class="table"></table>'+	
				'</div></div></div></div>');
    $("#zhCredit").trigger("click");
   
    
     $(".right_data").append('<div class="box_right_year"><div class="right_top panel panel-primary animated bounceInRight"><div id="circleCredit" style="width:100%;height:100%"></div></div>'+
	                         '<div class="right_middle panel panel-primary animated fadeInRight"><div id="barCredit" class="" style="width:100%;height:100%"></div></div>'+
	                           '<div class="right_bottom animated fadeInUpBig">'+
	                           '<div class="panel panel-primary" id="yearBottom">'+
                           '<div class="panel-heading"><span id="yearTable"></span>年度市级综合评价不及格市列表</div>'+
                             '<div class="">'+
                            '<table id="year_Bottom" class="table"></table>'+
                            '</div>'+
							'</div></div>'); 	
							
	 $("#map").append('<div class="timeline_box animated bounceInUp" style="display:none"><div id="timeline" class="animated bounceInUp" >'+
							'<ul id="dates"></ul>'+
							'<a class="sPrev"><span class="text-primary fa fa-chevron-circle-left fa-3x"></span></a>'+
							'<a class="sNext"><span class="text-primary fa fa-chevron-circle-right fa-3x"></span></a>'+
						'</div></div>')
});

var wmsurl =  mapOption.maps[0].layerurl;
/**
 * 获取综合评价
 * @param {Object} id
 */
function getZhCredit(id){
	$(".box_right_year").css("display","none");
	$(".timeline_box").css("display","none");
	$(".box_right_zh").css("display","block");
	var li=$("#"+id).parent();
	li.addClass("active");
	li.next().removeClass("active");
	$("#topText").html($("#"+id).text());
    switchMonitorImgLayer('zh');
    map.removeLayer(layers["行政区划边界"]);
	initZhTable();
	initPopup();
}

/**
 * 获取综合评价的表格
 */
function initZhTable(){
	initTable("tb_zhTop",{
				name:'queryTopLandusecredit',
				metadata:[
					{field: "ID",title:"ID",hidden: true},
					{field: "PROCODE",title:"sheng",hidden: true},
					{field:"CITYCODE",title:"shi",hidden:true},
					{field:"COUNTYCODE",title:"quxian",hidden:true},
					{field:"PRONAME",title:"省",hidden: false},
					{field:"CITYNAME",title:"市"},
					{field:"COUNTYNAME",title:"区县"},
					{field:"CREDITRATING",title:"评分"}
				],
				onClickRow: function(row){
					    var node={REFID:row.COUNTYCODE};
						addBoder(node);
				},
				height: $("#zhTop").height()-50
});
	
		initTable("tb_zhBottom",{
				name:'queryBottomLandusecredit',
				metadata:[
					{field: "ID",title:"ID",hidden: true},
					{field: "PROCODE",title:"sheng",hidden: true},
					{field:"CITYCODE",title:"shi",hidden:true},
					{field:"COUNTYCODE",title:"quxian",hidden:true},
					{field:"PRONAME",title:"省",hidden: false},
					{field:"CITYNAME",title:"市"},
					{field:"COUNTYNAME",title:"区县"},
					{field:"CREDITRATING",title:"评分"}
				],
				onClickRow: function(row){
		                var node={REFID:row.COUNTYCODE};
						addBoder(node);
				},
				height: $("#zhBottom").height()-50
})
}


/*
 * 获取年度信用
 */
function getYearCredit(id){
	if(popup){
		popup.hide();
	}
	  $("#topText").html($("#"+id).text());
	//1.图层发生改变
		var li=$("#"+id).parent();
		li.addClass("active");
		li.prev().removeClass("active");
		 $(".box_right_year").css("display","block");
		  $(".box_right_zh").css("display","none");
		 $(".timeline_box").css("display","block");
		 initHistoryMonitoringDate();					           
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
        var landLayerName="landcredit";
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
	var popupText = mapOption.popupText;
	for(var i = 0;i < popupText.length;i++){
		content.append("<h6>"+popupText[i].title+"："+properties[popupText[i].name]+"</h6>");
	}
	
	return content;
}

/**
 * 
 * @param {Object} date
 */
function initCircleData(date){
	uadp.getData("list", "queryCirclebyDate", {
		"period" : date,
	}, function(data) {
			var circleData=[];
		  for(var i = 0;i < data.data.length;i++){
		  	var obj=new Object();
		  	obj.name=data.data[i].NAME;
		  	obj.value=data.data[i].VALUE;
		  	circleData.push(obj);	
		    }
		  	
		  initCircleCredit(date,circleData);
	});
	
}

/**
 * 
 * @param {Object} date
 */
function initCircleCredit(date,circleData){
	var myChart=echarts.init(document.getElementById("circleCredit"));
    myChart.setOption({
    	
    title : {
        text: date+'年度市级综合评价',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b}<br/>{d}%",
        backgroundColor:'#FFFFFF',
        padding:10,
        borderWidth:'1',
        textStyle:{
            color:'black',
            fontSize:10
        }
    },
         legend:{
            	type:'scroll',
            	orient:'vertical',
                left:10,
              	top:30,
            	bottom:50,
            	itemWidth:10,
            	itemHeight:10,
            	data:['好','较好','一般','不及格','无图斑'],
            	borderRadius:15
            },
    series : [
        {
            name: '综合评价',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:circleData,
             label: {
                normal: {
                    show: true,
                    position: 'outside',
                    formatter:"{b}({d}%)",
                }
            },
             labelLine: {
                normal: {
                    show: true,
                    textStyle:{
                    	color:'blue'
                    }
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]


    });
    window.onresize = myChart.resize;
}


function initBarData(date){
	uadp.getData("list", "queryBarbyDate", {
		"period" : date,
	}, function(data) {
			var xdata=[];
			var ydata=[];
			if(data.data.length==0){
				ydata.push(0);
			}
		  for(var i = 0;i < data.data.length;i++){
					xdata.push(data.data[i].PNAME);
					ydata.push(data.data[i].PCOUNT);
					
		    }
		  initBarCredit(xdata,ydata)
	});
}
/**
 * 初始化柱状图
 */
function initBarCredit(xdata,ydata){
	var myChart=echarts.init(document.getElementById("barCredit"));
     option = {
     	 title: {
       			 text: '一般以下市省级汇总(1个省略)',
       			  x:'center'
          },
			    color: ['#008B8B'],
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    dataZoom: [
			        {
			            type: 'inside',
			            start:50,
			            end:100
			        }
			    ],
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : xdata,
			            axisTick: {
			                alignWithLabel: true
			            },
			              interval:0,
			              splitLine: {
		                   show: false
		                 }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine: {
		                   show: true
		                 }
			        }
			        
			    ],
			    series : [
			        {
			            name:'一般以下市数量:',
			            type:'bar',
			            barWidth: '60%',
			            data:ydata,
			            label: {
					             normal: {
					                show: true,
					                textStyle:{
				                    	color: '#00000'
				                    },
				                    position: 'outside',
					            }
					        },
					        zlevel:3,
					        z:2
			        }
			    ]
			};		
			var zoomSize = 6;
		   	myChart.on('click', function (params) {
		    myChart.dispatchAction({
		        type: 'dataZoom',
		        startValue: xdata[Math.max(params.dataIndex - zoomSize / 2, 0)],
		        endValue: xdata[Math.min(params.dataIndex + zoomSize / 2, ydata.length - 1)]
		    });
});
		   myChart.setOption(option);
}






//初始化对比的期数
function initHistoryMonitoringDate(){
		var lis = "";
		var items= "";
		var j = 0;
	uadp.getData("list","queryCreditDate",{},function(data){
		var html = "";
		var keyArray = data.data;
		for(var i = keyArray.length-1;i>=0;i--){
			var node = keyArray[i];
			if(j == 0){
					lis += '<li><a id='+'"'+node.ID+ '"'+   '>'+node.NAME+'年'+'</a></li>';				
			}else{
				lis += '<li><a id='+'"'+node.ID+ '"'+   '>'+node.NAME+'年'+'</a></li>';
			}
			j++;
		};
		$("#dates").html(lis);
		//监测日期时间轴  滚动
		$("#timeline").slide({
	    	titCell: "#dates li",
	    	mainCell: "ul",
	    	vis: 4,
	    	effect: "left",
	    	playStateCell: ".playState",
			autoPlay: false,
			defaultPlay: true,
			interTime:2000,
			titOnClassName: "selected",
			prevCell: ".sPrev", 
			nextCell: ".sNext",
			trigger: "click",
			pnLoop: false,
			startFun: function(i,c){
				var date = $("#dates li").eq(i).children("a:eq(0)").attr('id');
				$("#yearTable").html(date);
				//切换图层
				  switchMonitorImgLayer('year',date);
				  initTableByDate(date);
	              initBarData(date);
	              initCircleData(date);
			}
	   })
	 }
	)		
}
var perLayer;
//切换地图图层
function switchMonitorImgLayer(lx,date){
	     var landLayerName;
		 var wmsLayer;
		 var wmsurl =  mapOption.maps[0].layerurl;
		if(lx=='year'){
			  layers["landcredit"].setVisible(false);//设置landcredit为false
			  landLayerName="date_landcredit";
			  wmsLayer=getWmsLayer(cxt + wmsurl, landLayerName,{"CQL_FILTER":"where landyear='"+date+"'"});
		}else{
			if(layers.date_landcredit){
			     layers["date_landcredit"].setVisible(false);//设置landcredit为false
			}
			    landLayerName="landcredit";
				wmsLayer=getWmsLayer(cxt + wmsurl, landLayerName);
		}
		
		if(perLayer!=wmsLayer){
			     map.removeLayer(perLayer);
			     wmsLayer.setZIndex(0);
				 layers["china_albers"].setZIndex(1);
				 layers[landLayerName] = wmsLayer;
				 map.addLayer(wmsLayer);
		}
		         perLayer=wmsLayer;
   $("#legend").attr("src", cxt +"/tms/wms?server=wms&version=1.1.0&request=GetLegendGraphic&layer=qth:"+landLayerName+"&format=image/png&width=25&height=25");		
				
}
/**
 * 根据时间初始化右侧的树
 * @param {Object} date
 */
function initTableByDate(date){
	
	initTable("year_Bottom",{
				name:'queryTablebyDate',
				metadata:[
					{field:"PNAME",title:"省"},
					{field:"NAME",title:"市"},
					{field:"CODE",title:"行政编码"},
					{field:"GRADE",title:"综合评分"}
				],
				onClickRow: function(row){
					    var node={REFID:row.CODE+'00'};
						addBoder(node);
				},
				height: $("#yearBottom").height()-50
},{"period":date});
}
