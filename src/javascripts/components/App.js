import React from 'react';
import EmoticonList from './EmoticonList';

import { copy }  from '../utils';

export default class App extends React.Component {
  render() {
    const categories = Object.keys(this.props.emoticons);

    const emoticonNodes = categories.map((category) => {
      const emoticons = this.props.emoticons[category];

      return <EmoticonList category={category} emoticons={emoticons} />;
    });

    return (
      <div className='container'>
        <CategoryNavigation categories={categories} />
        <SearchForm />

        {emoticonNodes}
      </div>
    );
  }
}

class CategoryNavigation extends React.Component {
  render() {
    const categoryNodes = this.props.categories.map((category) => {
      return <li>{category}</li>;
    });

    return (
      <nav>
        <ul>
          {categoryNodes}
        </ul>
      </nav>
    )
  }
}

class SearchForm extends React.Component {
  render() {
    return (
      <div>
        <input type='text' placeholder='search...'/>
      </div>
    )
  }
}
