$(function(){
	var geometry = params.geometry;
	if(geometry != null && geometry != ''){
//		var iconFeature = new ol.Feature({
//			geometry: new ol.format.WKT().readGeometry(geometry),
//			style:new ol.style.Style({
//				image: new ol.style.Icon(({
//					anchor: [0.5, 1],
//					scale: 1,
//					src:  cxt+"/images/map-marker-icon.png"
//				}))
//			})
//		});
//		if(addresult != null){
//			addresult.source.clear();
//		}
//		addIcon(iconFeature);
//		if(draw != null){
//			draw.setActive(false);
//		}
//		map.getView().fit(new ol.format.WKT().readGeometry(geometry).getExtent(), map.getSize());
		
		drawFitGeometry();
	}
	
	
//	drawPoint({
//		type: 'MultiPoint',
//		callback: function(feature){
//			console.log(new ol.format.WKT().writeGeometry(feature.getGeometry()));
//			$("#"+params.id, window.parent.document).attr("value",new ol.format.WKT().writeGeometry(feature.getGeometry()));
//		}
//	});
	
	drawpoint(function(geometry){
		console.log(geometry);
		$("#"+params.id, window.parent.document).attr("value",geometry);
	});
});
