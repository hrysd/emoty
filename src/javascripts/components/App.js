import * as React     from 'react';
import {EventEmitter} from 'events';

import EmoticonList       from './EmoticonList';
import Header             from './Header';
import CategoryNavigation from './CategoryNavigation';
import SearchForm         from './SearchForm';

import { copy }  from '../utils';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.dispatcher = new EventEmitter;
    this.state = {selected: null}
  }

  componentDidMount() {
    this.dispatcher.on('update-title', (emoticon) => {
      this.setState({selected: emoticon});
    });
  }

  render() {
    const categories = Object.keys(this.props.emoticons);

    const emoticonNodes = categories.map((category) => {
      const emoticons = this.props.emoticons[category];

      return <EmoticonList
        dispatcher={this.dispatcher}
        category={category}
        emoticons={emoticons}
      />;
    });

    return (
      <div className='container'>
        <Header title={this.state.selected} categories={categories}>
          <CategoryNavigation categories={categories} />
          <SearchForm />
        </Header>

        {emoticonNodes}
      </div>
    );
  }
}
