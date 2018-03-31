var shengJson=[
		{key:'北京市',name:'11',value:'beijing',center:[116.405285,39.904989]},
		{key:'河北省',name:'13',value:'hebei'},
		{key:'河南省',name:'41',value:'henan'},
		{key:'山西省',name:'14',value:'shanxi'},
		{key:'福建省',name:'35',value:'fujian'},
		{key:'香港特别行政区',name:'81',value:'xianggang'},
		{key:'辽宁省',name:'21',value:'liaoning'},
		{key:'云南省',name:'53',value:'yunnan'},
		{key:'西藏自治区',name:'54',value:'xizang'},
		{key:'江苏省',name:'32',value:'jiangsu'},
		{key:'天津市',name:'12',value:'tianjin',center:[117.190182,39.125596]},
		{key:'海南省',name:'46',value:'hainan'},
		{key:'四川省',name:'51',value:'sichuan'},
		{key:'黑龙江省',name:'23',value:'heilongjiang'},
		{key:'内蒙古自治区',name:'15',value:'neimenggu'},
		{key:'宁夏回族自治区',name:'64',value:'ningxia'},
		{key:'澳门特别行政区',name:'82',value:'aomen'},
		{key:'陕西省',name:'61',value:'shanxi'},
		{key:'广东省',name:'44',value:'guangdong'},
		{key:'台湾省',name:'71',value:'taiwan'},
		{key:'甘肃省',name:'62',value:'gansu'},
		{key:'新疆维吾尔自治区',name:'65',value:'xinjiang'},
		{key:'湖南省',name:'43',value:'hunan'},
		{key:'上海市',name:'31',value:'shanghai',center:[121.472644,31.231706]},
		{key:'青海省',name:'63',value:'qinghai'},
		{key:'广西壮族自治区',name:'45',value:'guangxi'},
		{key:'安徽省',name:'34',value:'anhui'},
		{key:'山东省',name:'37',value:'shandong'},
		{key:'浙江省',name:'33',value:'zhejiang'},
		{key:'重庆市',name:'50',value:'chongqing',center:[106.504962,29.533155]},
		{key:'湖北省',name:'42',value:'hubei'},
		{key:'江西省',name:'36',value:'jiangxi'},
		{key:'吉林省',name:'22',value:'jilin'},
		{key:'贵州省',name:'52',value:'guizhou'}	
];


var zhongqu=[
             {key:'1020210000',name:'环渤海',value:'huanbohai'},
             {key:'1020220000',name:'长三角',value:'changsanjiao'},
             {key:'1020230000',name:'珠三角',value:'zhusanjiao'}
		
]

/**
 * 获取需要加载的json值
 * @param node
 * @returns
 */
var Size;//地图尺寸
var ControlShow=false;//控制名称是否显示
var jsonType;//加载的json
var zoomTuban=1;//放大的倍数
var centerTuban; //默认天水为坐标
function getjsonAndDq(node){
	  if(node.TREESTATUS=='0'){
		  if(node.CODE==''){
			  ControlShow=false;
			  jsonType="china-cities";
			  Size=600;
				zoomTuban=1;//放大的倍数
			    centerTuban=[105.724998,34.578529]; 
		  }else{
			  var bm=String(node.CODE).slice(0,2);
				for(var i=0;i<shengJson.length;i++){
					if(bm==shengJson[i].name){
						if(bm=='12'||bm=='11'||bm=='31'||bm=='50'){
							jsonType="china-cities";
							ControlShow=true;
							Size=600;
							zoomTuban=20;
							centerTuban=shengJson[i].center;//转变中心点
							return;}
						else{
						jsonType=shengJson[i].value;
						ControlShow=true;
						Size=600;
						zoomTuban=1;
						return;
						}
			         }
				}
		  }
	  }
	  if(node.TREESTATUS=='1'){
		  if(node.CODE==''){
			  ControlShow=false;
			  jsonType="china-cities";
			  Size=600;
				zoomTuban=1;//放大的倍数
			    centerTuban=[105.724998,34.578529];
		  }else{
			  var quyu;
			  if(node.CODE==null){
				  quyu=node.TREEID;
			  }else{
				  quyu=node.TREEPARENTID;
			  }
			  for(var i=0;i<zhongqu.length;i++){
			  if(quyu==zhongqu[i].key){
				    ControlShow=true;
					jsonType=zhongqu[i].value;
					Size=650;
					zoomTuban=1;//放大的倍数
					return;
			  }
			  }
		  }
	  }
	}