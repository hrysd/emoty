import * as React from 'react';

import Emoticon from './Emoticon';

const EmoticonList = ({dispatcher, category, emoticons}) => {
  const emoticonNodes = emoticons.map((emoticon) => {
    return (
      <Emoticon
        key={emoticon}
        emoticon={emoticon}
        dispatcher={dispatcher}
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

export default EmoticonList;
