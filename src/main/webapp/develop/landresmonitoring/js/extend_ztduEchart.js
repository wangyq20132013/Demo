/**
 * 获取图斑属性
 */
function getAllEchart(countList,sumList,fenQu){
	var myChart=echarts.init(document.getElementById("patchall"));
    myChart.setOption({
    	title:{
    		text:"图斑总体分布",
    		x:'center'
    	},
    	 tooltip: {
    	        trigger: 'item',
    	        formatter: "{a} <br/>{b}: {c} ({d}%)"
    	    },
    	    legend:{
            	type:'scroll',
            	orient:'horizontal',
                left:15,
            	bottom:10,
            	itemWidth:10,
            	itemHeight:10,
            	data:fenQu,
            	borderRadius:15
            },
    	    series: [
    	        {
    	            name:'图斑数量(个)',
    	            type:'pie',
    	            roam:true,
    	            selectedMode: 'single',
    	            radius: [0, '30%'],
                    roam:true,
    	            label: {
    	                normal: {
    	                    show:false
    	                }
    	            },
    	            labelLine: {
    	                normal: {
    	                    show: false
    	                }
    	            },
    	            data:countList
    	        },
    	        {
    	            name:'图斑面积(亩)',
    	            type:'pie',
    	            radius: ['40%', '55%'],
    	             label: {
    	                normal: {
    	                    show:false
    	                }
    	            },
    	            labelLine: {
    	                normal: {
    	                    show: false
    	                }
    	            },
                    roam:true,
    	            data:sumList

    	        }
    	    ]
    });
    window.onresize = myChart.resize;
}

/**
 * 获取图斑属性
 */
function getEchart(id,countList,sumList,lx){
	var type;
	if(id=="patchtype"){
		type="类型"
	}else{
		type="性质"
	}
	var myChart=echarts.init(document.getElementById(id));
    myChart.setOption({
    	title:{
    		text:"图斑"+type+"分布",
    		x:'center'
    	},
    	 tooltip: {
    	        trigger: 'item',
    	        formatter: "{a} <br/>{b}: {c} ({d}%)"
    	    },
    	    legend:{
            	type:'scroll',
            	orient:'horizontal',
                left:20,
            	bottom:5,
            	itemWidth:10,
            	itemHeight:10,
            	data:lx,
            	borderRadius:15
            },
    	    series: [
    	        {
    	            name:'图斑数量(个)',
    	            type:'pie',
    	            roam:true,
    	            selectedMode: 'single',
    	            radius: [0, '30%'],
                    roam:true,
    	            label: {
    	                normal: {
    	                    show:false
    	                }
    	            },
    	            labelLine: {
    	                normal: {
    	                    show: false
    	                }
    	            },
    	            data:countList
    	        },
    	        {
    	            name:'图斑面积(亩)',
    	            type:'pie',
    	            radius: ['40%', '55%'],
                    roam:true,
                    label: {
		                normal: {
		                    show: false,
		                    position: 'outside',
		                    formatter:"{b}({d}%)",
		                }
			            },
			             labelLine: {
			                normal: {
			                    show: false,
			                    textStyle:{
			                    	color:'blue'
			                    }
			                }
			            },
    	            data:sumList

    	        }
    	    ]
    });
    window.onresize = myChart.resize;
}
























