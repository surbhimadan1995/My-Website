imageExposureNormal = 0.3;
imageExposureSmall = 0.2;
smallSizeThresholdPx = 600;

$(document).ready(function () {

    //    var img = $('#header-image')[0];
    //
    //    $('<img/>').attr('src', $(img).attr('src')).load(function () {
    //        $('#header-title').css({
    //            'margin-top': this.height * 0.3 + 'px'
    //        }).show();
    //    });


    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 500, 'swing');
    });

});
