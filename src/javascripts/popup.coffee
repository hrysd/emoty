$ ->
  $.each window.emoticons, (_, category) ->
    $('#category-nav').append """
      <li>#{category.name}</li>
    """

    content = $('<div>').append(
      $('<h3>')
        .attr
          id:    category.name
          class: 'category-name'
        .text category.name
    )

    $.each category.emoticons, (_, emoticon) ->
      content.append(
        $('<img>')
          .attr
            src:   "images/emoticons/#{emoticon}.png"
            class: 'emoticon'
            alt:    emoticon
          .data emoticon: ":#{emoticon}:"
      )

    $('#emoticons').append content

  $('#emoticons img')
    .on 'click', ->
      Emoty.copy $(@).data('emoticon')
    .on 'mouseenter', ->
      do ($ '.title').hide

      ($ '.notice')
        .show()
        .append """
          <p>#{$(@).data('emoticon')}</p>
        """
    .on 'mouseleave', ->
      do $('.title').show

      $('.notice')
        .hide()
        .find('p')
        .remove()

  $('#category-nav li').on 'click', ->
    scrollTo = $("##{$(@).text()}").offset().top

    $(document.body).animate scrollTop: scrollTo - 50
