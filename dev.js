imageExposureNormal = 0.3;
imageExposureSmall = 0.2;
smallSizeThresholdPx = 600;

projs = {
  entries: [
    { pic: "brown_cs.png",
    title: 'brown cs'},
    { pic: "echo.png" },
    { pic: "brown_cs.png" },
    { pic: "echo.png" },
    { pic: "echo.png" },
    { pic: "brown_cs.png" },
    { pic: "echo.png" }
  ]
}

var showingModal = false;
var duration_expand = 450;


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
      id: i,
      style: 'background-image: url("projects/pics/' + entries[i].pic + '");'
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

});


function phaseModalFromCard() {
  showingModal = !showingModal;

  //gallery(!showingModal);
  scrolling(!showingModal);
  transitionModal(this, showingModal);
}


function transitionModal(caller, enter) {
  let doc = $(document);
  let win = $(window);
  let c = enter ? $(caller) : $('.presenting-modal-card');

  let x = (c.offset().left - doc.scrollLeft());
  let y = (c.offset().top - doc.scrollTop());

  hw = Math.max(win.height(), win.width());
  h = hw * 0.4;
  w = h * 2;

  // let cardFrame = {
  //   'height': c.height() + 'px',
  //   'width': c.width() + 'px',
  //   'top': y + 'px',
  //   'left': x + 'px'
  // };

  // let undo_cardFrame = {
  //   'height': '', 'width': '', 'top': '', 'left': ''
  // }

  if (enter) {
    let bg = $('<div>', {class: 'modal-background'});
    bg.click(phaseModalFromCard);

    $(`<style id='start-modal-style' type='text/css'> .modal-collapsed {
      height: ${c.height()}px;
      width: ${c.width()}px;
      top: ${y}px;
      left: ${x}px;
    } </style>`).appendTo("head");

    let modal = $('<div>', {class: 'modal modal-collapsed'});
    // modal.css(cardFrame);
    modal.click(phaseModalFromCard);
    buildModal(modal, c.attr('id'));

    $('#wrapper').append(bg, modal);
    c.addClass('presenting-modal-card');

    bg.fadeIn(duration_expand, 'swing');
    modal.switchClass('modal-collapsed', 'modal-presented', duration_expand, 'easeOutCubic');
    // modal.animate({
    //   'height': '40vw',//h + 'px',
    //   'width': '80vw',//w + 'px',
    //   'top': (win.height() - 0.4 * win.width())/2 + 'px',
    //   'left': '10vw'//(win.width() - w)/2 + 'px'
    // }, duration_expand, 'easeOutCubic');
    runModalPresentationChanges(modal, true);
    c.trigger('mouseleave');

  } else {
    let modal = $('.modal');
    let bg = $('.modal-background');

    bg.fadeOut(duration_expand, 'swing', complete=function(){bg.remove();});
    // modal.animate(cardFrame, duration_expand, 'easeOutCubic');
    modal.switchClass('modal-presented', 'modal-collapsed', duration_expand, 'easeOutCubic', complete=function(){
        c.removeClass('presenting-modal-card');
        $('.modal').remove();
        $('#start-modal-style').remove();
    });
    runModalPresentationChanges(modal, false);
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

function buildModal(modal, id) {
  modal.empty();
  let entries = projs['entries'];

  let img = $('<div>', {class: 'modal-primary-graphic modal-primary-graphic-collapsed'});
  img.css('background-image', 'url("projects/pics/' + entries[id].pic + '")');
  modal.append(img);

  let textblock = $('<div>', {class: 'modal-text-block modal-text-block-collapsed'});
  modal.append(textblock);

  let title = $('<div>', {class: 'modal-title'});
  title.text(entries[id].title);
  textblock.append(title);
}

function runModalPresentationChanges(modal, entry) {
  let img = 'modal-primary-graphic', txt = 'modal-text-block';
  let graphic = $('.' + img), textblock = $('.' + txt);
  let states = ['-collapsed', '-presented'];

  let graphic_out = img + (entry ? states[0] : states[1]);
  let graphic_in  = img + (entry ? states[1] : states[0]);
  graphic.switchClass(graphic_out, graphic_in, duration_expand, 'easeOutCubic');

  let text_out = txt + (entry ? states[0] : states[1]);
  let text_in  = txt + (entry ? states[1] : states[0]);
  textblock.switchClass(text_out, text_in, duration_expand, 'easeOutCubic');
}
