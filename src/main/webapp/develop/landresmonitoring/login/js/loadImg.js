function loadImages(sources, callback){
    var loader = new PxLoader();
    var imgs = sources;

    if(!imgs.length){
        callback && callback();
        $(".loading").hide();
        return;
    }

    imgs.forEach(function(img){
        var pxImage = new PxLoaderImage(img);
        loader.add(pxImage);
    });
    loader.addProgressListener(function(e) {

        var percent = (e.completedCount*100/e.totalCount).toFixed(0)+"%";
        $(".loading").html(percent);

        if(e.completedCount==e.totalCount){
            callback && callback();
            $(".loading").hide();
        }

    });
    loader.start();
}