$(function() {
    function createTip(value) {
        var $p;
        $p = $('<p>')
            .attr({ id: 'tips-' + value })
            .css({ display: 'none'})
            .text(value);
        return $p;
    }

    function createImg(value) {
        var $image;
        $image = $('<img>')
            .attr({
              id:  'image-' + value,
              src: 'images/emojis/' + value + '.png',
              alt: value
            });
        return $image;
    }

    function insertTipAndImage(value) {
        var $tips  = createTip(value);
        var $image = createImg(value);
        $('#images').append($tips).append($image);
    }

    function createCategory(value, tag) {
        var $category;
        $category = $(tag)
            .text(value);

        if (tag == '<li>') {
            $category.attr({ id: 'anchor-' + value });
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

    function findTipsByImage($image) {
        var name  = $image.attr('id').split('-')[1];
        var $tips = $('#tips-' + name);

        return $tips;
    }

    $.each(Emoty.emojis, function(category, emojis) {
        insertCategory(category);

        $.each(emojis, function(index, value) {
            insertTipAndImage(value);
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
            var $tips = findTipsByImage($(this))
            $tips.fadeIn(100);
        },
        mouseleave: function() {
            var $tips = findTipsByImage($(this))
            $tips.fadeOut(100);
        },
        mousemove: function(e) {
            var $tips = findTipsByImage($(this))
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
