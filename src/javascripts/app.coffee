window.Emoty = Ember.Application.create()

Emoty.ApplicationRoute = Ember.Route.extend
  controllerName: 'categories'

  model: -> window.emoticons

  renderTemplate: ->
    @render 'popup'

Emoty.CategoriesController = Ember.ArrayController.extend
  itemController: 'category'

  query: ''

  actions:
    reset: ->
      @setEach 'selected', true

Emoty.CategoryController = Ember.ObjectController.extend
  categories: Ember.computed.alias('parentController')
  query:      Ember.computed.alias('parentController.query')
  isEmpty:    Ember.computed.empty('results')

  selected: true

  results: (->
    return [] unless @get('selected')
    return @get('emoticons') if Ember.isEmpty(@get('query'))

    @get('emoticons').filter (emoticon) =>
      emoticon.indexOf(@get('query')) != -1
  ).property('query', 'selected')

  actions:
    select: ->
      @get('categories').setEach 'selected', false
      @set 'selected', true

Emoty.PopupView = Ember.View.extend
  emoticonsView: Ember.CollectionView.extend
    itemViewClass: Ember.View.extend
      tagName: 'a'
      href:    '#'

      attributeBindings: 'href'.w()

      template: Ember.Handlebars.compile '''
        <img {{bind-attr src='view.src' alt='content'}} />
      '''

      src: (->
        "images/emoticons/#{@get('content')}.png"
      ).property()

      click: (e) ->
        do e.preventDefault

        @copy ":#{@get('content')}:"

        do window.close

      copy: (value) ->
        clip = document.createElement('input')
        clip.type = 'text'
        clip.value = value

        document.body.appendChild clip

        do clip.select
        document.execCommand 'copy'
        do clip.remove
