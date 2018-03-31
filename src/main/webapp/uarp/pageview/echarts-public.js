/**
 * echarts+datainterface集成
 * 
 * 开发图表展示是可以引用
 * */

/**
 * 请求数据接口，加载拼图
 */
function loadPieEcharts(domid, datainterface, params, options) {
	uadp.getData("list", datainterface, params, function(data) {
		loadPieEchartsForData(domid, data.data, options);
	});
}

/**
 * 根据数据，加载拼图
 */
function loadPieEchartsForData(domid, data, options) {
	var data_Array = [];
	var data_series = [];
	$(data).each(function(i, node) {
		data_Array.push(node.NAME);
		data_series.push({
			id: node.ID,
			name: node.NAME,
			value: node.VALUE
		});
	});

	var myChart = echarts.init($("#" + domid)[0]);

	var _options = {};
	
	_options = {
		tooltip: {
			trigger: 'item',
			formatter: "{b} <br/>数量： {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left: '0%',
			top: 'bottom',
			textStyle: {
				color: '#FFFFFF',
				fontSize: 12
			}
		},
		series: [{
			type: 'pie',
			radius: '55%',
			center: ['50%', '50%']
		}]
	};
	
	if(options) {
		_options = $.extend(_options, options);
	}

	_options.legend.data = data_Array;
	_options.series[0].data = data_series;
	
	myChart.setOption(_options);
}

/**
 * 请求数据接口，加载柱图
 */
function loadBarEcharts(domid, datainterface, params, options) {
	uadp.getData("list", datainterface, params, function(data) {
		loadBarEchartsForData(domid, data.data, options);
	});
}

/**
 * 根据数据，加载柱图
 */
function loadBarEchartsForData(domid, data, options) {
	var data_Array = [];
	var data_series = [];
	$(data).each(function(i, node) {
		data_Array.push(node.NAME);
		data_series.push({
			id: node.ID,
			name: node.NAME,
			value: node.VALUE
		});
	});
	var myChart = echarts.init($("#" + domid)[0]);

	var _options = {};
	_options = {
		tooltip: {
			trigger: 'item',
			formatter: "{b} <br/> 数量： {c}"
		},
		legend: {
			orient: 'vertical',
			left: '0%',
			top: 'bottom',
			textStyle: {
				fontSize: 12
			}
		},
		xAxis: {
			type: "category",
			splitLine: {
				show: false
			},
			axisLabel: {
				interval: 0
			},
			data: data_Array
		},
		yAxis: {
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			}
		},
		series: [{
			type: 'bar'
		}]
	}
	
	if(options) {
		_options = $.extend(_options, options);
	}

	_options.legend.data = data_Array;
	_options.series[0].data = data_series;

	myChart.setOption(_options);
}

/**
 * 请求数据接口，加载折线
 */
function loadLineEcharts(domid, datainterface, params, options) {
	uadp.getData("list", datainterface, params, function(data) {
		loadLineEchartsForData(domid, data.data, options);
	});
}

/**
 * 根据数据，加载折线
 */
function loadLineEchartsForData(domid, data, options) {
	var data_Array = [];
	var data_series = [];
	$(data).each(function(i, node) {
		data_Array.push(node.NAME);
		data_series.push({
			id: node.ID,
			name: node.NAME,
			value: node.VALUE
		});
	});
	myChart = echarts.init($("#"+domid)[0]);
	var _options = {};
	
	_options = {
			tooltip: {
				trigger: 'item',
				formatter: "{b} </br>数量： {c}"
			},
			xAxis: {
				type: "category",
				nameTextStyle: {
					color: '#fff'
				},
				axisLine: {
					lineStyle: {
						color: '#fff'
					}
				},
				axisLabel: {
					interval: 0,
				},
				data: data_Array
			},
			yAxis: {
				axisTick: {
					show: false
				},
				splitLine: {
					show: false
				},
				nameTextStyle: {
					color: '#fff'
				},
				axisLine: {
					lineStyle: {
						color: '#fff'
					}
				},
			},
			grid: {
				left: 50
			},
			series: [{
				type: 'line',
				symbolSize: 10
			}]
		}
	
	if(options) {
		_options = $.extend(_options, options);
	}

	_options.xAxis.data = data_Array;
	_options.series[0].data = data_series;
	
	myChart.setOption(_options);
}

/**
 * 请求数据接口，加载柱图、折线图
 */
function loadLineBarEcharts(domid, datainterface, params, options) {
	uadp.getData("list", datainterface, params, function(data) {
		loadLineBarEchartsForData(domid, data.data, options);
	});
}

/**
 * 根据数据，加载柱图、折线图
 */
function loadLineBarEchartsForData(domid, data, options) {

}

/**
 * 请求数据接口，加载多折线图
 */
function loadMultiLineEcharts(domid, datainterface, params, options) {
	uadp.getData("list", dataset, params, function(data) {
		loadLineBarEchartsForData(domid, data.data, options);
	});
}

/**
 * 根据数据，加载多折线图
 */
function loadMultiLineEchartsForData(domid, data, options) {

}