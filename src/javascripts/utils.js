module.exports = {
  copy: function(text) {
    let clip = document.createElement('input');

    clip.type = 'text';
    clip.value = text;

    document.body.appendChild(clip);

    clip.select();
    document.execCommand('copy');
    clip.remove();
  }
}
