import * as React from 'react';

const SearchForm = ({dispatcher}) => {
  const onChange = (e) => {
    dispatcher.emit('search', e.target.value);
  };

  return (
    <form>
      <input type='text' onChange={onChange} placeholder='search...'/>
    </form>
  );
}

export default SearchForm;
