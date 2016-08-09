imageExposureNormal = 0.3;
imageExposureSmall = 0.2;
smallSizeThresholdPx = 600;

$(document).ready(function () {

    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        var current = document.documentElement.scrollTop;
        var destination = $(target).offset().top;
        var duration = (destination - current) / 4.0;

        $('html, body').stop().animate({
            'scrollTop': destination
        }, duration, 'swing');
    });

    var pattern = /[^\n\t]+/g
    $('.section-body').each(function(index) {
        var text = $(this).html();
        text = text.replace(pattern, function(match) {
            return '<div class="section-text">' + match + '</div>'
        });
        $(this).html(text);
    });

});
