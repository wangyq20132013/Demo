var zTree;
var treestatus;
var echarttext="";
var qsarr=[];
var qsSLdata=[];
var qsMJdata=[];
var seriesSLdata=[];
var seriesMJdata=[];
var index;
var SLax=[
          {
              name : '数量(个)',
              type : 'value'
          }
      ];
var MJax=[
          {
              name : '面积(亩)',
              type : 'value'
          }
      ];
var titlearr=['新增线性地物','新增建（构）筑物','新增推填土','疑似新增变化用地','新增光伏用地'];
$(function(){
	$('.fx-list').css('width',document.body.clientWidth-330+'px');
    $("#patchchange").css('height',document.body.clientHeight/2+'px');
	console.log(params);
	//index = layer.load(2,{shade:0.3});
	initTree("tree","queryAllMonitoring");
	/*setTimeout(function(){$("#tree_2_a").click()},1000
	)*/
	
	
})

function nodeSuccessClick(data){
	$("#tree_2_a").click();
}



function zTreeOnClick(event, treeId, node) {
	index = layer.load(2,{shade:0.3});
	var lv=(node.level).toString();
	treestatus=node.TREESTATUS;
	node = node.attributes;
	var id = node.CODE;
	echarttext=node.TREENAME;debugger;
	$("#echarttitle").html(echarttext+"历史分析")
	tabledata({
		"xzqhbm" : id,
		"lv" : lv,
		"treestatus":treestatus,
	});
}



function tabledata(param){
	initTable("table",{
		name:"queryAllHistory",
		metadata: [
	 		{"field":"TBQS","title":"检测时期"},
	 		{"field":"TBLX","title":"图斑类型"},
			{"field":"TYPENUM","title":"图斑数量(个)"},
			{"field":"TYPEAREA","title":"图斑面积(亩)"}
		],
		onLoadSuccess: tableLoadSuccess,
		height: $(".lishi").height() -130
	},param);
}

function radiochange(obj){
	var ax;
	var echartdata;
	if(obj=="sl"){
		ax=SLax;
		echartdata=seriesSLdata;
	}else{
		ax=MJax;
		echartdata=seriesMJdata;
	}
	echartall(ax,echartdata);
}

function tableLoadSuccess(data){
	var rows=data.rows;
	qsarr=[];
	qsSLdata=[];
	qsMJdata=[];
	seriesSLdata=[];
	seriesMJdata=[];
	uadp.getData("list","queryAllQS",{"treestatus":treestatus},function(data){
		for(var i=0;i<data.data.length;i++){
			qsarr.push(data.data[i].NAME);
		}
		
		for(var i=0;i<titlearr.length;i++){
			qsSLdata=[];
			qsMJdata=[];
			for(var h=0;h<data.data.length;h++){
				qsSLdata.push(0);
				qsMJdata.push(0);
			}
			for(var j=0;j<rows.length;j++){
				if(rows[j].TBLX==titlearr[i]){
					for(var k=0;k<qsarr.length;k++){
						if(rows[j].TBQS==qsarr[k]){
							qsSLdata[k]=rows[j].TYPENUM;
							qsMJdata[k]=rows[j].TYPEAREA;
						}
					}
				}
			}
			
			seriesSLdata.push( {
                name:titlearr[i],
                type:'line',
                symbolSize: 8,
                hoverAnimation: false,
                data:qsSLdata
            });
            seriesMJdata.push( {
                name:titlearr[i],
                type:'line',
                symbolSize: 8,
                hoverAnimation: false,
                data:qsMJdata
            });
			console.log($('input:radio:checked').val());
			if($('input:radio:checked').val()=='1'){
				$("#radioSL").click();
			}else{
				$("#radioMJ").click();
			}
			//$("#radioSL").click();
			//echartall(SLax,seriesSLdata);
		}
	});
	
}



function echartall(yaxis,echartseries){
	//$("#patchchange").empty();
	layer.close(index);
	var timeData = qsarr;
	var myChart=echarts.init(document.getElementById("patchchange"));
	myChart.clear();
    myChart.setOption(
	            {
	                title: {
	                    //text: echarttext+'历史对比',
	                    //subtext: '数据来自西安兰特水电测控技术有限公司',
	                    //x: 'left',
	                    
	                },
	                tooltip: {
	                    trigger: 'axis',
	                    axisPointer: {
	                        animation: true
	                    }
	                },
	                legend: {
	                    //orient:'vertical',
	                	data:titlearr,
	                    x: 'center'
	                },
	                toolbox: {
	                    feature: {
	                        dataZoom: {
	                            yAxisIndex: 'none'
	                        },
	                        restore: {},
	                        saveAsImage: {}
	                    }
	                },
	                axisPointer: {
	                    link: {xAxisIndex: 'all'}
	                },
	                dataZoom: [
	                           {
	                               show: false,
	                               realtime: true,
	                               start: 0,
	                               end: 40
	                              
	                           },
	                           {
	                               type: 'inside',
	                               realtime: true,
	                               start: 0,
	                               end: 40,
	                              
	                           }
	                       ],
	               
	                grid: [{
	                	left: 80,
	                    right: 50,
	                    height: '70%'
	                }],
	                xAxis : [
	                    {
	                        type : 'category',
	                        boundaryGap : false,
	                        axisLine: {onZero: true},
	                        data: timeData
	                    }
	                ],
	                yAxis : yaxis,
	                series : echartseries
	                
	            },true);
    
    
}