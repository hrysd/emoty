import * as React from 'react';

const Header = ({title, categories, children}) => {
  return (
    <header>
      <h1>{
        title || ['Emoty', <a key='h1' href="http://www.emoji-cheat-sheet.com">Emoji Cheat Sheet</a>, 'for Chrome.']
      }</h1>

      {children}
    </header>
  );
}

export default Header;
