function initEarth(callback){

    var earth = $(".earth-basic");
    var map = $(".map", earth);
    var fg = $(".fg", earth);
    var spots = $(".spots");
    var spotsSet = $(".spots-set");

    var originScale = 1;
    var earthRotationZAngle = -15;

    TweenMax.set($(".stage"), {
        transformPerspective: 800,
        "transform-style":"preserve-3d"
    });

    TweenMax.set(earth, {
        z:-500,
        autoAlpha:0,
        rotationZ:earthRotationZAngle,
        scale: originScale
    });
    TweenMax.set(spotsSet, {
        rotationX:-40,
        transformOrigin: "50% 50% -500px",
        "transform-style":"preserve-3d"
    });

    TweenMax.set(spots, {
        rotationZ:earthRotationZAngle,
        z:0,
        transformOrigin: "50% 50% -500px",
        "transform-style":"preserve-3d"
    });

    TweenMax.set(fg, {
        rotationZ:-30
    });

    var timeline = new TimelineMax({
        onComplete: function(){
            TweenLite.set(spots, {
                rotationY:0
            });
            TweenMax.set(map, {
                x: 0
            });

            callback && callback();
        }
    });
    var distance = map.width()/2;
    var xCount = 20;
    var yCount = 26;

    for(var x = 0; x < xCount; x++){
        for(var y = 1; y < yCount-1; y++){
            (function(x,y){
                var p = $("<i></i>").appendTo(spots);
                TweenMax.set(p, {
                    rotationY: (360/xCount)*x,
                    rotationX: (360/yCount)*y,
                    transformOrigin: "50% 50% -500px",
                    autoAlpha:0
                });
                p.mouseenter(function(){
                    console.log((360/xCount)*x, (360/yCount)*y)
                })
            })(x,y)
        }
    }

    var spotPoints = $('i', spots);
    var iDuration = 3;

    timeline.add([
        TweenMax.fromTo(earth, iDuration, {
            scale: 0.6
        }, {
            autoAlpha: 0.6,
            scale: 0.9
        }),
        TweenMax.to(map, iDuration, {
            x: "+="+distance,
            force3D: true
        }),
        TweenMax.to(spotPoints, iDuration, {
            autoAlpha:1
        }),
        TweenMax.to(spots, iDuration, {
            rotationY: "+=360"
        })
    ]).add([
        TweenLite.to(earth, 0.6, {
            scale: originScale,
            autoAlpha: 1,
            force3D: true
        }),
        TweenLite.to(spotPoints, 0.4, {
            autoAlpha: 0
        })
    ]);

    var obj = {
        scrollTo: function(percent, cb){
            var zoomDur = 0.4;
            var rotateDur = 1.3;

            var timeline = new TimelineMax({
                onComplete: function(){
                    cb && cb();
                }
            })

            timeline.add([
                TweenLite.to(earth, zoomDur, {
                    scale: originScale*0.9,
                    autoAlpha: 1,
                    force3D: true
                }),
                TweenLite.to(spotPoints, zoomDur, {
                    autoAlpha: 1
                })
            ]).add([
                TweenLite.to(map, rotateDur, {
                    x: distance*percent,
                    force3D: true,
                    ease: Power1.easeInOut
                }),
                TweenMax.to(spots,  rotateDur, {
                    rotationY: 360*percent,
                    ease: Power1.easeInOut
                })
            ]).add([
                TweenLite.to(earth, zoomDur, {
                    scale: originScale,
                    autoAlpha: 1,
                    force3D: true
                }),
                TweenLite.to(spotPoints, zoomDur, {
                    autoAlpha: 0
                })
            ]);
        },
        setNet: function(elem, cfg){
            elem.fadeIn();
            TweenLite.set(elem, {
                rotationY: cfg.rotateY,
                rotationX: cfg.rotateX,
                transformOrigin: "50% 50% -500px",
                scale: cfg.scale
            });
        },
        getOffset: function(x, y){
            var earthOffset = earth.offset();
            var center = [earthOffset.left + earth.width()/2, earthOffset.top + earth.height()/2];
            var r = earth.width()/2;
            var mapOffset = map.offset();
            var mapSize = [map.width(), map.height()];
            var input = [mapSize[0]*x/2 + (mapOffset.left + mapSize[0]/2), mapSize[1]*y + mapOffset.top];

            var result = {
                top: input[1],
                left:input[0]
            }
            return result;
        }
    };

    return obj;
};