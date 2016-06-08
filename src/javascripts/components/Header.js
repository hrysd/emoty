import * as React from 'react';

const Header = ({title, categories, children}) => {
  const defaultText = (
    <p>
      Emoty <a href="http://www.emoji-cheat-sheet.com">Emoji Cheat Sheet</a> for Chrome.
    </p>
  );

  return (
    <header>
      {title || defaultText}

      {children}
    </header>
  );
}

export default Header;
