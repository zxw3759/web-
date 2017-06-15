/**
 * Created by Administrator on 2017/3/12.
 */
var btnFlag = false;
$('.mg-fixed-search button').click(function() {
    if (btnFlag) {
        if ($('.mg-fixed-search .form-control').val() == '') {
            $('.mg-fixed-search').addClass('hidee');
            btnFlag = false;
        }
    } else {
        $('.mg-fixed-search').removeClass('hidee');
        btnFlag = true;
    }

});