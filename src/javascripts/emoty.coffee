window.Emoty =
  copy: (text) ->
    clip = document.createElement('input')
    clip.type = 'text'
    clip.value = text

    document.body.appendChild clip

    do clip.select
    document.execCommand 'copy'
    do clip.remove
