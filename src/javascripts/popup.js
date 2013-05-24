$(function() {
    $.each(Emoty.emojis, function(category, emojis) {
        Emoty.insertCategory(category);
        $.each(emojis, function(index, value) {
            Emoty.insertTipAndImage(value);
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
            var $tips = Emoty.findTipsByImage($(this))
            $tips.fadeIn(100);
        },
        mouseleave: function() {
            var $tips = Emoty.findTipsByImage($(this))
            $tips.fadeOut(100);
        },
        mousemove: function(e) {
            var $tips = Emoty.findTipsByImage($(this))
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

    $('#header .searcher input').on('keyup', {}, function(evt){
        var keyword = $(this).val();
        keyword = Emoty.escapeRegExp(keyword);
        $.each(Emoty.emojisIndex, function(imageId, imageHtmlId){
            var $elem = $('#' + imageHtmlId);
            console.log($elem);
            if (imageId.match(keyword) !== null) {
                $elem.show();
            } else {
                $elem.hide();
            };
        });
    });
});
