window.Emoty = Ember.Application.create()

Emoty.ApplicationRoute = Ember.Route.extend
  controllerName: 'categories'

  model: -> window.emoticons

  renderTemplate: ->
    @render 'popup'

Emoty.CategoriesController = Ember.ArrayController.extend
  itemController: 'category'

  query: ''

Emoty.CategoryController = Ember.ObjectController.extend
  query: Ember.computed.alias('parentController.query')

  results: (->
    return @get('emoticons') if Ember.isEmpty(@get('query'))

    @get('emoticons').filter (emoticon) =>
      emoticon.indexOf(@get('query')) != -1
  ).property('query')

Emoty.PopupView = Ember.View.extend
  emoticonsView: Ember.CollectionView.extend
    itemViewClass: Ember.View.extend
      tagName: 'a'
      href: '#'
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
