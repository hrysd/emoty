$ ->
  contentTiming = 100
  delay = 700

  $.each window.emoticons, (_, category) ->
    $('#category-nav').append """
      <li>#{category.name}</li>
    """

    fragment = document.createDocumentFragment()
    content = $(fragment).append(
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

    setTimeout ->
      $('#emoticons').append fragment
    , contentTiming

    contentTiming += delay

  $(document)
    .on 'click', '#emoticons img', ->
      Emoty.copy $(@).data('emoticon')
    .on 'mouseenter', '#emoticons img', ->
      do ($ '.title').hide

      ($ '.notice')
        .show()
        .append """
          <p>#{$(@).data('emoticon')}</p>
        """
    .on 'mouseleave', '#emoticons img', ->
      do $('.title').show

      $('.notice')
        .hide()
        .find('p')
        .remove()

  $('#category-nav li').on 'click', ->
    scrollTo = $("##{$(@).text()}").offset().top

    $(document.body).animate scrollTop: scrollTo - 50
