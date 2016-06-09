import * as React from 'react';

const EmoticonList = ({dispatcher, category, emoticons}) => {
  const onMouseEnter = (emoticon) => {
    dispatcher.emit('update-title', emoticon);
  }

  const onMouseLeave = () => {
    dispatcher.emit('update-title', null);
  }

  const emoticonNodes = emoticons.map((emoticon) => {
    return (
      <Emoticon
        key={emoticon}
        emoticon={emoticon}
        onMouseEnter={() => onMouseEnter(emoticon)}
        onMouseLeave={() => onMouseLeave()}
      />
    );
  });

  return (
    <div className='emoticon-list'>
      <h3>{category}</h3>

      {emoticonNodes}
    </div>
  );
}

const Emoticon = ({onMouseEnter, onMouseLeave, emoticon}) => {
  const className = `e-${emoticon} emoticon`;

  return (
    <p
      className={className}
      alt={emoticon}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    ></p>
  );
}

export default EmoticonList;
