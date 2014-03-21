Emoty = Ember.Application.create()

Emoty.IndexRoute = Ember.Route.extend
  controllerName: 'categories'

  model: -> window.emoticons

  renderTemplate: ->
    @render 'popup',
    controller: @controllerFor('categories')

Emoty.CategoriesController = Ember.ArrayController.extend
  content: []
  query:   null

Emoty.PopupView = Ember.View.extend
  categoriesView: Ember.CollectionView.extend
    itemViewClass: Ember.View.extend
      tagName: 'a'
      attributeBindings: 'href'.w()
      template: Ember.Handlebars.compile '''
        <img alt='' {{bind-attr src='view.src'}}>
      '''

      href: '#'

      src: (->
        "images/emojis/#{@get('content')}.png"
      ).property('content')

      isVisible: (->
        query = @get('controller.query')
        return true if Ember.isEmpty(query)

        @get('content').indexOf(query) != -1
      ).property('controller.query')

      click: (e) ->
        do e.preventDefault

        @_copy ":#{@get('content')}:"

        do window.close

      _copy: (text) ->
        clip = document.createElement('input')
        clip.type = 'text'
        clip.value = text
        document.body.appendChild(clip)
        do clip.select
        document.execCommand('copy')
        do clip.remove
