import React, { PropTypes } from 'react';

export default class Search extends React.PureComponent {

  render() {

    return (
      <input className="search" type="text" name="search" placeholder="Search table" onChange={this.props.searchInputChangeFunction} onKeyUp={this.props.searchOnKeyUp} />
    );
    
  }

}
