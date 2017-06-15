$(function() {
    var i = 0;
    //添加小圆点
    var size = 4;
    for (var j = 0; j < size - 1; j++) {
        $(".banner .num").append("<li></li>");
    }
    $(".banner .num li").first().addClass("on");
    $("#feeling .num li").first().addClass("on");

    //鼠标滑入圆点
    $(".banner .num li").hover(function() {
        var index = $(this).index();
        i = index;

        $(".banner .img").stop().animate({
            left: -index * 700
        }, 800);
        $(this).addClass("on").siblings().removeClass("on");

    });
    //自动轮播
    var t = setInterval(moveR, 4000);

    //对banner定时器操作

    $(".banner").hover(function() {
        clearInterval(t);
    }, function() {
        t = setInterval(moveR, 4000);
    });

    //向右按钮
    $(".banner .btn_r").click(function() {
        moveR();
    });
    //向左按钮
    $(".banner .btn_l").click(function() {
        moveL();
    });

    function moveR() {
        i++;
        if (i == size) {
            i = 1;
            $(".banner .img").css("left", "0px");
        }
        $(".banner .img").stop().animate({
            left: -i * 700
        }, 800);
        if (i == size - 1) {
            $(".banner .num li").eq(0).addClass("on").siblings().removeClass("on");
        } else {
            $(".banner .num li").eq(i).addClass("on").siblings().removeClass("on");
        }
    }

    function moveL() {
        i--;
        if (i == -1) {
            i = size - 2;
            $(".banner .img").css("left", -(size - 1) * 700);
        }

        $(".banner .img").stop().animate({
            left: -i * 700
        }, 800);
        $(".banner .num li").eq(i).addClass("on").siblings().removeClass("on");
    }

});
