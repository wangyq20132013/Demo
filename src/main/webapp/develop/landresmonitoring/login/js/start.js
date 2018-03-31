loadImages([
    //需要载入的图片
], function () {
    // 隐藏地球
    var earth = initEarth(function(){
        initNet();
    });

    var btnsSet = [];

    var nets = $(".stage .net");
    var nav = $(".footer .nav-start");
    var backgroundPic = $(".bg-pic");

    var logoFoot = $(".logo-ft");
    //var paper = Raphael(nav[0], "100%", '100%');

    var curIndex = 0;

    //initNav();

    function initNet(){
        earth.setNet(nets.eq(0),{
            rotateX: 46,
            rotateY: 30,
            scale:0.55
        });
        earth.setNet(nets.eq(1),{
            rotateX: 53,
            rotateY: 192,
            scale:0.55
        });

        earth.setNet(nets.eq(2),{
            rotateX: 60,
            rotateY: 300,
            scale:0.55
        });

        earth.setNet(nets.eq(3),{
            rotateX: 20,
            rotateY: 50,
            scale:0.55
        });
    }

    /**
     * 处理导航点击
     * @param index
     */
    function clickHandler(index){
        location.href = "global.html";
    }

    /**
     * 初始化导航按钮
     */
    function initNav(){
        console.log("finish loading");

        var btnSize = nav.height();
        var padding = 15;

        var btnText = '进入';
        var i = 6;

        var r = btnSize/2 - padding;

        var btnSet = paper.set();

        var circle = paper.circle(btnSize * (i + 0.5), btnSize/2, r);
        var text = paper.text(btnSize * (i + 0.5), btnSize/2, btnText);
        var bg = paper.circle(btnSize * (i + 0.5), btnSize/2, r);
        var color = "#aaa";

        var glowSet = circle.glow({
            color:color
        });

        var resetBtn = function(){
            var color = "#aaa";
            circle.stop().attr({
                opacity:0.6,
                stroke: color
            });

            text.stop().attr({
                fill: color
            });

            glowSet.stop().attr({
                stroke:color
            });
        };

        var focusBtn = function(){
            bg.attr({
                fill:"#000000",
                "stroke-width":0,
                opacity:0,
                "cursor":"hand"
            });

            circle.attr({
                stroke: color,
                opacity: 0.6,
                "stroke-width": 3,
                cursor:"point"
            });

            text.attr({
                fill: color,
                "font-size":16
            });

        };

        var hightLightBtn = function(){
            var color = "#fff";
            circle.animate({
                opacity:1
            }, 200);

            text.animate({
                opacity:1,
                fill: color
            }, 200);

            glowSet.animate({
                stroke:color
            },200);
        };

        var animateBtn = function (){
            var color = "#00b7ee";
            circle.animate({
                opacity:1,
                stroke: color
            },300);

            text.animate({
                fill: color
            }, 200);

            glowSet.animate({
                stroke:color
            },200);
        };

        btnSet.push(bg, circle, text);
        focusBtn();

        btnSet.mouseover(function(){
            if(btnSet.highlighted){
                return;
            }

            hightLightBtn();
        });

        btnSet.mouseout(function(){
            if(!btnSet.highlighted){
                resetBtn();
            }
        });

        btnSet.resetStatus = resetBtn;

        btnSet.click(btnSet.clickHandler = function(){
            _.each(btnsSet, function(b){
                b.highlighted = false;
                b.resetStatus();
            });

            btnSet.highlighted = true;

            animateBtn();

            clickHandler(i);
        });

        btnsSet.push(btnSet);
    }
});


