imageExposureNormal = 0.3;
imageExposureSmall = 0.2;
smallSizeThresholdPx = 600;

projs = {
  entries: [
    { pic: "brown_cs.png" }, { pic: "echo.png" }, { pic: "brown_cs.png" }, { pic: "echo.png" }, { pic: "echo.png" }, { pic: "brown_cs.png" }, { pic: "echo.png" }
  ]
}

var showingModal = false;


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

    holder.append(card);
    card.click(phaseModalFromCard);
  }

});


function phaseModalFromCard() {
  showingModal = !showingModal;

  gallery(!showingModal);
  scrolling(!showingModal);
  transitionModal(this, showingModal);
}


function transitionModal(card, enter) {
  if (enter) {
    let bg = $('<div>', {class: 'modal-background'});
    bg.click(phaseModalFromCard);

    let doc = $(document);
    let win = $(window);

    let modal = $('<div>', {class: 'modal'});
    let c = $(card);
    let h = (c.offset().top - doc.scrollTop());
    let w = (c.offset().left - doc.scrollLeft());

    modal.css({
      'height': c.height() + 'px',
      'width': c.width() + 'px',
      'top': h + 'px',
      'left': w + 'px'
    });
    bg.append(modal);

    $("#wrapper").append(bg);
    bg.fadeIn(220, 'swing', done=function(){
      h = win.height() * 0.8;
      w = win.width() * 0.75;
      modal.animate({
        'height': h + 'px',
        'width': w + 'px',
        'top': (win.height() - h)/2,
        'left': (win.width() - w)/2
      }, 190, 'easeOutCubic');
    });

  } else {
    $('.modal-background').fadeOut(200, 'swing');
  }
}

function gallery(on) {
  $('.project-card').css('opacity', on ? '' : '0.6');
}

function scrolling(on) {
  $('html, body').css({
    'overflow': on ? 'auto' : 'hidden',
    'height': on ? 'auto' : '100%'
  });
}
