imageExposureNormal = 0.3;
imageExposureSmall = 0.2;
smallSizeThresholdPx = 600;

projs = {
    entries: [
        { pic: "brown_cs.png" }, { pic: "echo.png" }, { pic: "brown_cs.png" }, { pic: "echo.png" }, { pic: "echo.png" }, { pic: "brown_cs.png" }, { pic: "echo.png" }
    ]
}


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

    var holder = $("#project-card-holder");
    var entries = projs['entries'];

    for (var i = 0; i < entries.length; i++) {
        var card = $('<div>', {
            class: 'project-card',
            style: 'background-image: url("projects/pics/' + entries[i].pic + '");'
        });
        // var img = $('<img>', {
        //     class: 'project-card-image',
        //     src: 'projects/pics/' + entries[i].pic
        // });
        var overlay = $('<div>', {
            class: 'overlay'
        });
        // img.append(overlay);
        card.append(overlay);
        holder.append(card);
    }

});
