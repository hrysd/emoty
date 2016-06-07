import * as React from 'react';

class EmoticonList extends React.Component {
  render() {
    const emoticonNodes = this.props.emoticons.map((emoticon) => {
      return <Emoticon emoticon={emoticon} />;
    });

    return (
      <div className='emoticon-list'>
        <h3>{this.props.category}</h3>

        {emoticonNodes}
      </div>
    );
  }
}

class Emoticon extends React.Component {
  onMouseEnter = (e) => {
    console.log(this.props.emoticon);
  }

  onMouseLeave = (e) => {
    console.log(this.props.emoticon);
  }

  render() {
    const className = `e-${this.props.emoticon} emoticon`;

    return (
      <p
        className={className}
        alt={this.props.emoticon}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      ></p>
    );
  }
}

export default EmoticonList;
