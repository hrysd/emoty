import React from 'react';
import ReactDOM from 'react-dom';
import emoticons from './emoticons.json';
import App from './components/App';

ReactDOM.render(
  <App emoticons={emoticons} categories={Object.keys(emoticons)}/>,
  document.getElementById('App')
);
