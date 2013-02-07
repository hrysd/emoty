$(function() {
    function createTip(index, value) {
        var p;
        p = $('<p>')
          .attr({ id: 'tips_' + index })
          .css({ display: 'none'})
          .text(value);
        return p;
    }

    function createImg(index, value) {
        var image;
        image = $('<img>')
          .attr({
            id:  'image_' + index,
            src: 'images/emojis/' + value + '.png',
            alt: value
          });
        return image;
    }

    function insertTipAndImage(index, value) {
        var $tips  = createTip(index, value);
        var $image = createImg(index, value);
        $('#images').append($tips).append($image);
    }

    function createCategory(value, tag) {
        var $category;
        $category = $(tag)
            .text(value);

        if (tag == '<li>') {
            $category.attr({ id: 'anchor_' + value });
        } else {
            $category.attr({ id: value })
        }

        return $category;
    }

    function insertCategory(category) {
        var categoryNav   = createCategory(category, '<li>');
        var categoryTitle = createCategory(category, '<h3>');
        $('#header > ul').append(categoryNav);
        $('#images').append(categoryTitle);
    }

    function findTipsByImageId($image) {
        var num   = $image.attr('id').split('_')[1];
        var $tips = $('#tips_' + num);

        return $tips;
    }

    $.each(Emoty.emojis, function(category, emojis) {
        insertCategory(category);

        $.each(emojis, function(index, value) {
            insertTipAndImage(index, value);
        });
    });

    $('#images img').on({
        click: function(){
            Emoty.copy(':' + $(this).attr('alt') + ':');
            $('#notice').fadeIn('normal', function(){
                $('#notice').fadeOut();
            });
        },
        mouseenter: function(){
            var $tips = findTipsByImageId($(this))
            $tips.fadeIn(100);
        },
        mouseleave: function() {
            var $tips = findTipsByImageId($(this))
            $tips.fadeOut(100);
        },
        mousemove: function(e) {
            var $tips = findTipsByImageId($(this))
            $tips.css({
              'top': e.pageY - 40 + 'px',
              'left': e.pageX + 10 + 'px'
            });
        }
    });

    $('#header').on('click', 'li', function(){
        var category = $('#' + $(this).text());
        var point = category.offset().top;
        $('html,body').animate({scrollTop: point});
    });
});
