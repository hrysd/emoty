import * as React from 'react';

const Header = ({title, categories, children}) => {
  const defaultText = (
    ['Emoty', <a href="http://www.emoji-cheat-sheet.com">Emoji Cheat Sheet</a>, 'for Chrome.']
  );

  return (
    <header>
      <h1>{title || defaultText}</h1>

      {children}
    </header>
  );
}

export default Header;
