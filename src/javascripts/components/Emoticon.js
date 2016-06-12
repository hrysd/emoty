import * as React from 'react';

const Emoticon = ({dispatcher, emoticon}) => {
  const className = `e-${emoticon} emoticon`;

  const onMouseEnter = () => {
    dispatcher.emit('update-title', emoticon);
  }

  const onMouseLeave = () => {
    dispatcher.emit('update-title', null);
  }

  return (
    <p
      className={className}
      alt={emoticon}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    ></p>
  );
}


export default Emoticon;
