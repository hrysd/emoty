$(function() {
    function createTip(index, value) {
        var p;
        p = $('<p>')
          .addClass('tips_' + index)
          .css({ display: 'none'})
          .text(value);
        return p;
    }

    function createImg(index, value) {
        var image;
        image = $('<img>')
          .addClass('image_' + index)
          .attr({
            src: 'images/emojis/' + value + '.png',
            alt: value
          });
        return image;
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

    function insertTipAndImage(tip, image) {
        $('#images').append(tip).append(image);
    }

    function insertCategory(category) {
        var categoryNav   = createCategory(category, '<li>');
        var categoryTitle = createCategory(category, '<h3>');
        $('#header > ul').append(categoryNav);
        $('#images').append(categoryTitle);
    }

    $.each(Emoty.emojis, function(category, emojis) {
        insertCategory(category);

        $.each(emojis, function(index, value) {
            var tip = createTip(index, value);
            var img = createImg(index, value);
            insertTipAndImage(tip, img);

            $(img).click(function(e) {
                Emoty.copy(":" + $(this).attr('alt') + ":");
                $('#notice').fadeIn('normal', function(){
                    $('#notice').fadeOut();
                });
            });

            $(img).mouseenter(function() {
                $(tip).fadeIn(100)
            }).mousemove(function(e) {
                $(tip).css({
                  'top': e.pageY - 40 + 'px',
                  'left': e.pageX + 10 + 'px'
                });
            }).mouseleave(function(){
                $(tip).fadeOut(100);
            });
        });

        $('#anchor_' + category).click(function(e){
            var point = $('#' + category).offset().top;
            $('html,body').animate({scrollTop: point});

            return false;
        });
    });
});
