//变量的定义
var picLeft = $('.pic-left');
var picRight = $('.pic-right');
var count = $('.pic-ul>li').length;
var oLi = $('.pic-ul>li');
var num = 0;
//页面加载完成自动播放
setInterval(rightDic,5000);
//判断当前加载大于一屏，让回到顶部显示出来
$(window).scroll(function() {
    var scrollTop = $(document).scrollTop();
    var clientTop = $(window).height();
    if (scrollTop>clientTop) {
        $('.fix-top').show();
    } else {
        $('.fix-top').hide();
    }
});


//设置 图片中的数量
var picCount = $('.pic-count');
picCount.html('/'+count);
var picNum = $('.pic-num');
//点击左键切换图片

picLeft.on('click', function() {
    oLi.eq(num).siblings().css({
        left:'-690px'
    });
    oLi.eq(num).animate({
        left: '690px'
    },{
        duration: 500
    });
    if (num == 0) {
        num=count-1;
    } else {
        num--;
    }
    picNum.html(num+1);
    oLi.eq(num).show();
    oLi.eq(num).animate({
        left:0
    }, {
        duration:500,
        complete:function() {
            oLi.eq(num).siblings().hide();
        }
    });
});
//点击右键切换图片
picRight.on('click', rightDic);
function rightDic() {
    oLi.eq(num).siblings().css({
        left:'690px'
    });
    oLi.eq(num).animate({
        left: '-690px'
    },{
        duration: 500
    });

    if (num == (count-1)) {
        num=0;
    } else {
        num++;
    }
    picNum.html(num+1);
    oLi.eq(num).show();
    oLi.eq(num).animate({
        left:0
    }, {
        duration:500,
        complete:function() {
            oLi.eq(num).siblings().hide();
        }
    });
}