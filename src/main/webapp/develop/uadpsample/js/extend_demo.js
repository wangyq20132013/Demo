$(function(){
	initMapExtendButton();
});

function loadWMTS(){
	loadWMTSLayer('clusterdemo','');
}

function loadWMS(){
	loadWMSLayer('clusterdemo','');
}

function loadPOI(){
	var params ={
		source:{
			url:null,
			dataparam:null,
			data:[{
				x:454955.418,
				y:351403.298,
				title:"测试POI点1",
				params:{
					id:"test01",
					name:"测试POI点01"
				},		
				style:{
					icon:"http://localhost:8181/waterassets/develop/spaceinfo/icon/marker1.png"
				}
			},{
				x:456955.418,
				y:381403.298,
				title:"测试POI点2",
				param:{
					id:"test02",
					name:"测试POI点02"
				},
				style:{
					icon:"http://localhost:8181/waterassets/develop/spaceinfo/icon/marker2.png"
				}				
			}]
		},
		name:"testPOILayer",
		params:{
			interval:0,
			duration:2000,
			repeat:true,
			renderer:{
				color:"blue",
				width:5
			}
		}
	}
	loadPOILayer(params);
}

function loadCluster(){
	loadClusterLayer('clusterdemo','getClusterData',{'trackid':'track03'});
}

function loadHeatMap(){
	loadHeatmapLayer('heatmapdemo','getClusterData',{'trackid':'track03'});
}

function loadPIE(){
	loadPIELayer('heatmapdemo','getClusterData',{'trackid':'track03'});
}
function loadFlight(){
	var params = {
		source:{
			url:null,
			dataparam:null,
			data:[{
				start:"454955.418,351403.298",
				end:"536235.581,295629.020"
			},{
				start:"444266.230,290019.842",
				end:"548088.938,368865.833"
			}]
		},
		name:"testFlight",
		params:{
			interval:1000,
			duration:2000,
			repeat:true,
			renderer:{
				color:"red",
				width:5
			}
		}
	}	
	loadFlightLayer(params);
}

function loadFlash(){
	var params = {
		source:{
			url:null,
			dataparam:null,
			data:[{
				x:470070,
				y:316827,
				title:"test1"
			},{
				x:539709,
				y:333231,
				title:"test2"
			},{
				x:524892,
				y:274388,
				title:"test3"
			}]
		},
		name:"testFlash",
		params:{
			duration:2000,
			repeat:true,
			renderer:{
				pointcolor:"blue",
				pointradius:5,
				flashcolor:"blue",
				flashradius:30,
				fontcolor:"red",
				fontsize:"14"
			}
		}
	}
	loadFlashLayer(params);
}

function loadEchartFlight(){
	var params = {
		source:{
			url:null,
			dataparam:null,
			data:[
				{
					from:{
						name:"北京市水文总站",
						coords:[494925.980703,307936.671707]
					},
					to:[{
						name:"北京市密云水库管理处",
						coords:[540656.52104,367867.184251],
						value:"调拨信息1-1"
					},{
						name:"北京市永定河管理处",
						coords:[489690.055286,297186.060742],
						value:"调拨信息1-2"
					}],
					renderer:{
						//轨迹底线样式
						trace:{
							color: '#ffa022',
							width:1,
							curveness:0.2,
							opacity: 0.6,
						},
						//移动滑块样式
						slider:{
							//时长
							duration:6,
							icon:'path://M308.3,177.5 253.9,347.7 308.2,315 362.5,347.7',
							iconcolor:'#ffa022',
							iconsize:13,
							//尾部效果
							tailcolor:'#fff',
							//尾部宽度
							tailwidth:5,
							//尾部占轨迹长度比例,0-1
							taillength:0.5,

						},
						//起点样式
						starting:{
							size:10,
							color: "#ffa022"
						},			
						//终点样式
						destination:{
							size:10,
							color: "#ffa022"
						}
					}
				},{
					from:{
						name:"北京市水利自动化研究所",
						coords:[495213.794875,304643.979581]
					},
					to:[{
						name:"北京市东水西调管理处",
						coords:[500045.896748,317880.113714],
						value:"调拨信息2-1"
					},{
						name:"北京水务局幼儿园",
						coords:[497025.471653,305209.866046],
						value:"调拨信息2-2"
					},{
						name:"北京市北运河管理处",
						coords:[526392.178674,307174.758242],
						value:"调拨信息2-3"
					}],
					renderer:{
						//轨迹底线样式
						trace:{
							color: 'red',
							width:1,
							curveness:0.2,
							opacity: 0.6,
						},
						//移动滑块样式
						slider:{
							//时长
							duration:4,
							icon:'path://M308.3,177.5 253.9,347.7 308.2,315 362.5,347.7',
							iconcolor:'red',
							iconsize:25,
							//尾部效果
							tailcolor:'blue',
							//尾部宽度
							tailwidth:10,
							//尾部占轨迹长度比例,0-1
							taillength:0.5,

						},
						//起点样式
						starting:{
							size:15,
							color: "orange",
							label:false
						},			
						//终点样式
						destination:{
							size:15,
							color: "red",
							label:false
						}
					}				
				}
			]
		},
		name:"echartFlight"
	}

	loadEchartFlightOverlay(params);
}

function initMapExtendButton(){
	var top = $(".ol-control.ol-bar").css("top");
	var left = $(".ol-control.ol-bar").css("left");
	var bufferinput = '<div class="input-group input-group-sm" style="width:200px;position:absolute;top:'+top+';right:55px;">';
	bufferinput += '<span class="input-group-addon">单位：米</span>';
	bufferinput += '<input type="number" class="form-control" id="bufferdistance" placeholder="缓存半径" value="200">';
	bufferinput += '</div>';
	
//	$("#map").append(bufferinput);
	
	$("#map").append('<div id="mapbuttons"></div>');
	$("#mapbuttons").css("position","absolute");
	$("#mapbuttons").css("right","20px");
	$("#mapbuttons").css("top","80px");
	$("#mapbuttons").append('<ul></ul>');
	$("#mapbuttons ul").append('<li><button type="button" class="btn btn-primary" onclick="loadWMTS();">加载WMS服务</button></li>');
	$("#mapbuttons ul").append('<li><button type="button" class="btn btn-primary" onclick="loadWMS();">加载WMTS服务</button></li>');
	$("#mapbuttons ul").append('<li><button type="button" class="btn btn-primary" onclick="loadPOI();">加载POI服务</button></li>');
	$("#mapbuttons ul").append('<li><button type="button" class="btn btn-primary" onclick="loadCluster();">加载聚合图服务</button></li>');
	$("#mapbuttons ul").append('<li><button type="button" class="btn btn-primary" onclick="loadHeatMap();">加载热力图服务</button></li>');
	$("#mapbuttons ul").append('<li><button type="button" class="btn btn-primary" onclick="loadPIE();">加载饼图服务</button></li>');
	$("#mapbuttons ul").append('<li><button type="button" class="btn btn-primary" onclick="loadFlight();">加载迁徙图服务</button></li>');
	$("#mapbuttons ul").append('<li><button type="button" class="btn btn-primary" onclick="loadFlash();">加载点闪烁图层</button></li>');
	$("#mapbuttons ul").append('<li><button type="button" class="btn btn-primary" onclick="loadEchartFlight();">加载echart迁徙图层</button></li>');
	$("#mapbuttons ul").css("list-style","none");
	$("#mapbuttons ul li").css("padding","5px");
}

function featrueClick(){
	console.log('点击聚合点');
}

function boxSearchEnd(extent){
	console.log('拉框查询结束');
	console.log(extent);
}

function pointSearchEnd(point){
	console.log('点查询');
	console.log(point);
}

function polygonSearchEnd(polygon){
	console.log('多边形查询');
	console.log(polygon);
}

function pointbufferEnd(gemo){
	console.log('点缓存查询');
	console.log(gemo);
}

function linebufferEnd(gemo){
	console.log('线缓存查询');
	console.log(gemo);
}

function polygonbufferEnd(gemo){
	console.log('面缓存查询');
	console.log(gemo);
}