var showingModal = false;
var showingProjectNumber = 0;
var showingProjectGraphicNum = 0;
var duration_expand = 450;


$(document).ready(function () {
    console.log('did document ready');

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

  for (var i = 0; i < projects.length; i++) {
    var card = $('<div>', {
      class: 'project-card',
      id: i,
      style: 'background-image: url("projects/pics/' + projects[i].pics[0] + '");'
    });

    holder.append(card);
    card.click(phaseModalFromCard);
  }

  $(".project-card").hover(function() {
    // Mouse over
    $(this).siblings().stop().fadeTo(400, 0.5);
  }, function() {
    // Mouse out
    $(this).siblings().stop().fadeTo(400, 1);
  });

  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: /* left */
      fillModalContent(showingProjectNumber-1);
      break;

      case 39: /* right　*/
      fillModalContent(showingProjectNumber+1);
      break;

      case 32: /* space */
      if (showingModal) phaseModalFromCard();
      break;

      case 38: /* up */ break;
      case 40: /* down */ break;
      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

});


function phaseModalFromCard() {
  showingModal = !showingModal;

  scrolling(!showingModal);
  transitionModal(this, showingModal);
}


function transitionModal(caller, enter) {
  var c = enter ? $(caller) : $('.presenting-modal-card');

  if (enter) {
    var bg = buildModalBG();
    var modal = buildModal(c);
    $('#wrapper').append(bg, modal);

    fillModalContent(c.attr('id'));
    animateModal(modal, bg, true);

    c.addClass('presenting-modal-card');
    c.trigger('mouseleave');
} else {
    var modal = $('.modal');
    var bg = $('.modal-background');

    animateModal(modal, bg, false);
    c.removeClass('presenting-modal-card');
    $('.arrow').hide();
  }
}

function scrolling(on) {
  $('html, body').css({
    'overflow': on ? 'auto' : 'hidden',
    'height': on ? 'auto' : '100%'
  });
}

function buildModalBG() {
    var bg = $('<div>', {class: 'modal-background'});
    bg.click(phaseModalFromCard);
    return bg;
}

function setModalCollapsedStyle(c) {
    var doc = $(document);
    var win = $(window);
    var x = (c.offset().left - doc.scrollLeft());
    var y = (c.offset().top - doc.scrollTop());
    h = c.height();
    w = c.width();

    $('#start-modal-style').remove();
    $(`<style id='start-modal-style' type='text/css'> .modal-collapsed {
      top: ${y}px;
      left: ${x}px;
      height: ${h}px;
      width: ${w}px;
    } </style>`).appendTo("head");
}

function buildModal(c) {
    setModalCollapsedStyle(c);

    var modal = $('<div>', {class: 'modal modal-collapsed'});
    modal.click(phaseModalFromCard);

    var img = $('<div>', {class: 'modal-primary-graphic modal-primary-graphic-collapsed'});
    modal.append(img);

    var arrow_left = $('<div>', {class: 'arrow arrow-left'});
    var arrow_right = $('<div>', {class: 'arrow arrow-right'});
    img.append(arrow_left, arrow_right);

    var textblock = $('<div>', {class: 'modal-text-block modal-text-block-collapsed'});
    modal.append(textblock);

    var title = $('<div>', {class: 'modal-title'});
    textblock.append(title);

    var body = $('<div>', {class: 'modal-body-text'});
    textblock.append(body);

    return modal;
}

function fillModalContent(id) {
    if (!showingModal || id < 0 || id >= projects.length) return;
    id = parseInt(id);
    showingProjectNumber = id;
    $('.presenting-modal-card').removeClass('presenting-modal-card');
    var c = $('#' + id);
    c.addClass('presenting-modal-card');
    setModalCollapsedStyle(c);

    $('.modal-primary-graphic').css('background-image', 'url("projects/pics/' + projects[id].pics[0] + '")');
    $('.modal-title').text(projects[id].title);
    var body = $('.modal-body-text');
    body.empty();
    projects[id].body.split('\n').forEach(function(x){
        var paragraph = $('<p>');
        paragraph.html(x);
        body.append(paragraph);
    });
}

function animateModal(modal, bg, entry) {
    var mod = 'modal',
        img = 'modal-primary-graphic',
        txt = 'modal-text-block';
    var graphic = $('.' + img),
        textblock = $('.' + txt);
    var states = ['-collapsed', '-presented'];

    var modal_out = mod + (entry ? states[0] : states[1]);
    var modal_in  = mod + (entry ? states[1] : states[0]);

    var graphic_out = img + (entry ? states[0] : states[1]);
    var graphic_in  = img + (entry ? states[1] : states[0]);

    var text_out = txt + (entry ? states[0] : states[1]);
    var text_in  = txt + (entry ? states[1] : states[0]);

    if (entry) {
        bg.fadeIn(duration_expand, 'swing');
    } else {
        bg.fadeOut(duration_expand, 'swing', complete=function(){bg.remove();});
    }

    modal.switchClass(modal_out, modal_in, duration_expand, 'easeOutCubic', complete=function(){if (!entry) { modal.remove(); }});
    graphic.switchClass(graphic_out, graphic_in, duration_expand, 'easeOutCubic');
    textblock.switchClass(text_out, text_in, duration_expand, 'easeOutCubic');
}
