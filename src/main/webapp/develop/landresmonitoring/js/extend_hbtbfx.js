
//刷新表格
function refreshTable(param){
	if(param.monitoringType == 'option1'){
		initTable("table",{
			name:"queryTwoDate_SumAreaSumNum",
			metadata:[
				{field:"INDEX",title:"序号","width":30},
				{field:"NAME",title:"监测日期"},
				{field:"NUM",title:"个数"},
				{field:"AREA",title:"面积(亩)"}
			],
			onLoadSuccess: refreshChart1,
			height: $(".bottom_data").height()
		},param);
	}else if(param.monitoringType == 'option2'){
		//两期各城市用地面积(变化土地面积总和)的增幅从高到低  
		if(param.monitoringdateArr.length ==2){
			var dateTitle1 = $("#monitoringDate").find("option[value='"+param.monitoringdateArr[0]+"']").text();
			var dateTitle2 = $("#monitoringDate").find("option[value='"+param.monitoringdateArr[1]+"']").text();
			initTable("table",{
				name:"queryTwoDate_EveryCity_SumChangeArea",
				metadata:[
					{field:"INDEX",title:"序号","width":30},
					{field:"CODE",title:"编码"},
					{field:"NAME",title:"城市"},
					{field:"QAREA",title: dateTitle1+"面积(亩)"},
					{field:"HAREA",title: dateTitle2+"面积(亩)"},
					{field:"CHANGE",title: "涨幅","sortable":true,}
				],
				onLoadSuccess: refreshChart2,
				height: $(".bottom_data").height()
			},param);
		}
		
		
	}else if(param.monitoringType == 'option3'|| param.monitoringType == 'option4'){
		param.type = (param.monitoringType == 'option3')?0:1;
		var name = (param.monitoringType == 'option3')?"地类":"性质";
		//两期各地类增减幅情况、各性质增减幅情况
		if(param.monitoringdateArr.length ==2){
			var dateTitle1 = $("#monitoringDate").find("option[value='"+param.monitoringdateArr[0]+"']").text();
			var dateTitle2 = $("#monitoringDate").find("option[value='"+param.monitoringdateArr[1]+"']").text();
			initTable("table",{
				name:"queryTwoDate_EveryLandType_EveryNature",
				metadata:[
					[
						{field:"INDEX",title:"序号",width:30,rowspan:2,valign:"middle"},
						{field:"NAME",title: name,rowspan:2,valign:"middle",width:300},
						{field:"",title: dateTitle1,colspan:2},
						{field:"",title: dateTitle2,colspan:2},
					],[
						{field:"QTYPENUM",title: "个数",colspan:1},
						{field:"QTYPEAREA",title: "面积(亩)",colspan:1},
						{field:"HTYPENUM",title: "个数",colspan:1},
						{field:"HTYPEAREA",title: "面积(亩)",colspan:1},
					]
				],
				onLoadSuccess: refreshChart3,
				height: $(".bottom_data").height()
			},param);
		}
	}
}


function refreshChart1(data){
	
	var dateTitle1 = $("#monitoringDate").find("option[value='"+param.monitoringdateArr[0]+"']").text();
	var dateTitle2 = $("#monitoringDate").find("option[value='"+param.monitoringdateArr[1]+"']").text();
	
	var dataName = [];
	var data1 = [];
	var data2 = [];
	$.each(data.rows, function(i, node){
		dataName.push(node.NAME)
		data1.push({name:node.NAME,value: node.NUM});
		data2.push({name:node.NAME,value: node.AREA});
	})
	option = {
	    title: [{
	        text: '个数对比',
	        x: '25%',
	        textAlign: 'center'
	    },{
	        text: '面积对比',
	        x: '75%',
	        textAlign: 'center'
	    }],
	    tooltip : {
	        trigger: 'item',
	        formatter: "{b}: {c}",
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    }, 
	    grid: [{
	        top: 50,
	        width: '45%',
	        bottom: 10,
	        left: 40,
	        containLabel: true
	    }, {
	        top: 50,
	        width: '45%',
	        bottom: 10,
	        right: 0,
	        left: '50%',
	        containLabel: true
	    }],
	    yAxis: [{
		    type: 'value',
		    splitLine: {
		        show: false
		    }
		}, {
		    type: 'value',
		    gridIndex: 1,
		    splitLine: {
		        show: false
		    }
		}],
		xAxis: [{
		    type: 'category',
		    data: dataName,
		    axisLabel: {
		        interval: 0,
		    },
		    splitLine: {
		        show: false
		    }
		}, {
		    gridIndex: 1,
		    type: 'category',
		    data: dataName,
		    axisLabel: {
		        interval: 0,
		    },
		    splitLine: {
		        show: false
		    }
		}],
	    series: [{
	        type: 'bar',
	        label: {
	            normal: {
	                show: true,
	                textStyle:{
                    	color: '#00000'
                    },
                    position: 'top',
	            }
	        },
	        data: data1
	    },  {
	        type: 'bar',
	        xAxisIndex: 1,
	        yAxisIndex: 1,
	        label: {
	            normal: {
	                show: true,
	                textStyle:{
                    	color: '#00000'
                    },
                    position: 'top',
	            }
	        },
	       	data: data2
	    }]
	};
	myChart.clear;
	myChart.setOption(option,true);
}
function refreshChart2(data){
	var dateTitle1 = $("#monitoringDate").find("option[value='"+param.monitoringdateArr[0]+"']").text();
	var dateTitle2 = $("#monitoringDate").find("option[value='"+param.monitoringdateArr[1]+"']").text();
	
	var dataName = [];
	var data1 = [];
	var data2 = [];
		
	$.each(data.rows, function(i, node){
		dataName.push(node.NAME)
		data1.push({value: node.QAREA});
		data2.push({value: node.HAREA});
	});
		
	option = {
	    title: [{
	        text: '两期各城市用地面积',
	        x: 'center',
	    }],
	    legend:[{
	        data: [dateTitle1, dateTitle2],
	        left: 'left'
	    }],
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a}</br>{b}: {c}",
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    }, 
	    grid: [{
	        top: 50,
	        width: '100%',
	        bottom: 10,
	        left: 10,
	        containLabel: true
	    }],
	    yAxis: {
		    type: 'value',
		    splitLine: {
		        show: false
		    }
		},
		xAxis: {
		    type: 'category',
		    data: dataName,
		    axisLabel: {
		        interval: 0,
		    },
		    splitLine: {
		        show: false
		    }
		},
		dataZoom: [
		    {
		        show: false,
		        start:0,
		        end: parseInt(1000/dataName.length),
		    },{
               type: 'inside',
               start: 0,
               end: parseInt(1000/dataName.length),
            }
		],
	    series: [{
	    	name: dateTitle1,
	        type: 'bar',
	        label: {
	            normal: {
	                show: true,
	                textStyle:{
                    	color: '#00000'
                    },
                    position: 'top',
	            }
	        },
	        data: data1
	    },{
	    	name: dateTitle2,
	        type: 'bar',
	        label: {
	            normal: {
	                show: true,
	                textStyle:{
                    	color: '#00000'
                    },
                    position: 'top',
	            }
	        },
	        data: data2
	    }]
	};
	myChart.clear;
	myChart.setOption(option,true);
}
function refreshChart3(data){
	var dateTitle1 = $("#monitoringDate").find("option[value='"+param.monitoringdateArr[0]+"']").text();
	var dateTitle2 = $("#monitoringDate").find("option[value='"+param.monitoringdateArr[1]+"']").text();
	
	var dataName = [];
	var data11 = [];
	var data12 = [];
	var data21 = [];
	var data22 = [];
		
	$.each(data.rows, function(i, node){
		dataName.push(node.NAME);
		data11.push({value: node.QTYPENUM});
		data12.push({value: node.HTYPENUM});
		data21.push({value: node.QTYPEAREA});
		data22.push({value: node.HTYPEAREA});
	});
	
	option = {
	    title: [{
	        text: '两期各地类个数对比',
	        x: '25%',
	        textAlign: 'center'
	    },{
	        text: '两期各地类面积对比',
	        x: '75%',
	        textAlign: 'center'
	    }],
	    legend:[{
	        data: [dateTitle1, dateTitle2],
	        align: 'left'
	    }],
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a}</br>{b}: {c}",
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    }, 
	    grid: [{
	        top: 50,
	        width: '45%',
	        bottom: 40,
	        left: 40,
	        containLabel: true
	    }, {
	        top: 50,
	        width: '45%',
	        bottom: 40,
	        right: 0,
	        left: '50%',
	        containLabel: true
	    }],
	    yAxis: [{
		    type: 'value',
		    splitLine: {
		        show: false
		    }
		}, {
		    type: 'value',
		    gridIndex: 1,
		    splitLine: {
		        show: false
		    }
		}],
		xAxis: [{
		    type: 'category',
		    data: dataName,
		    axisLabel: {
		        interval: 0,
    			rotate: 30
		    },
		    splitLine: {
		        show: false
		    }
		}, {
		    gridIndex: 1,
		    type: 'category',
		    data: dataName,
		    axisLabel: {
		        interval: 0,
		        rotate: 30
		    },
		    splitLine: {
		        show: false
		    }
		}],
		dataZoom: [
		    {
		        show: false,
		        xAxisIndex: [0,1],
		        start:0,
		        end: 100
		    },{
               type: 'inside',
               xAxisIndex: [0,1],
               start: 0,
               end: 100,
            }
		],
	    series: [{
	    	name: dateTitle1,
	        type: 'bar',
	        label: {
	            normal: {
	                show: true,
	                textStyle:{
                    	color: '#00000'
                    },
                    position: 'top',
	            }
	        },
	        data: data11
	    },{
	    	name: dateTitle2,
	        type: 'bar',
	        label: {
	            normal: {
	                show: true,
	                textStyle:{
                    	color: '#00000'
                    },
                    position: 'top',
	            }
	        },
	        data: data12
	    }, {
	    	name: dateTitle1,
	        type: 'bar',
	        xAxisIndex: 1,
	        yAxisIndex: 1,
	        label: {
	            normal: {
	                show: true,
	                textStyle:{
                    	color: '#00000'
                    },
                    position: 'top',
	            }
	        },
	       	data: data21
	    },{
	        type: 'bar',
	        name: dateTitle2,
	        xAxisIndex: 1,
	        yAxisIndex: 1,
        	label: {
                normal: {
                    show: true,
                    textStyle:{
                    	color: '#00000'
                    },
                    position: 'top',
                }
            },
	       	data: data22
	    }]
	};
	myChart.clear;
	myChart.setOption(option,true);
}