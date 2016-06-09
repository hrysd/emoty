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

    this.state = {
      selected: null,
      emoticons: this.props.emoticons
    };
  }

  componentDidMount() {
    this.dispatcher.on('update-title', (emoticon) => {
      this.setState({selected: emoticon});
    });

    this.dispatcher.on('search', (text) => {
      if (text) {
        let filteredEmoticons = {};

        const emoticonNodes = this.props.categories.map((category) => {
          filteredEmoticons[category] = this.props.emoticons[category].filter((emoticon) => {
            return emoticon.indexOf(text) !== -1;
          });
        });
        this.setState({emoticons: filteredEmoticons});
      } else {
        this.setState({emoticons: this.props.emoticons});
      }
    });
  }

  render() {
    const emoticonNodes = this.props.categories.map((category) => {
      return(
        <EmoticonList
          key={category}
          dispatcher={this.dispatcher}
          category={category}
          emoticons={this.state.emoticons[category]}
        />
      )
    });

    return (
      <div className='container'>
        <Header title={this.state.selected} categories={this.props.categories}>
          <CategoryNavigation categories={this.props.categories} />
          <SearchForm dispatcher={this.dispatcher} />
        </Header>

        {emoticonNodes}
      </div>
    );
  }
}
