import emoticons from './emoticons.json';
import { copy }  from './utils';
import $         from '../../bower_components/jquery/dist/jquery';

$(function() {
  Object.keys(emoticons).forEach(function(category) {
    let interval = 100,
        delay    = 700;

    $('#categories').append(`<li class='category'>${category}</li>`);

    let fragment  = document.createDocumentFragment(),
        efragment = document.createDocumentFragment();

    $(fragment).append(`<h3 id='${category}' class='category-name'>${category}</h3>`);
    $(fragment).append('<div class="emoticons"></div>');

    emoticons[category].forEach(function(emoticon) {
      let attributes = {
        class: `e-${emoticon} emoticon`,
        alt:   emoticon
      };
      let image = $('<p>').attr(attributes).data({emoticon: `:${emoticon}:`});

      $(efragment).append(image);
    });

    $(fragment).find('.emoticons').append(efragment);

    setTimeout(function(){
      $('.content').append(fragment);
    }, interval);

    interval += delay;
  });

  $(document)
    .on('click', 'p.emoticon', function() {
      copy($(this).data('emoticon'));
    }).on('mouseenter', 'p.emoticon', function() {
      $('.title').hide();

      $('.notice')
        .show()
        .append(`<p>${$(this).data('emoticon')}</p>`);
    }).on('mouseleave', 'p.emoticon', function() {
      $('.title').show();

      $('.notice')
        .hide()
        .find('p')
        .remove();
    });

  $('li.category').on('click', function() {
    let scrollTo = $(`#${$(this).text()}`).offset().top

    $(document.body).animate({scrollTop: scrollTo - 50});
  });
});
