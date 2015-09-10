import React from 'react';

// styles
import '../styles/components/SearchSection';

export default class SearchSection extends React.Component {
  constructor() {
    super();
    this.state = {
      className: 'SearchSection',
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }
  handleFocus() {
    this.setState({className: 'SearchSection__active'});
  }
  closeSearch() {
    this.setState({className: 'SearchSection'});
  }
  render() {
    return (
      <div className={this.state.className}>
        <input type="text" onFocus={this.handleFocus} placeholder="Search your stuffs!" />
        <input type="text" placeholder="GeoSearch your stuffs!" />
        <button onClick={this.closeSearch}>X</button>
        <ul>
          <li>AutoComplete #1</li>
          <li>AutoComplete #2</li>
          <li>AutoComplete #3</li>
          <li>AutoComplete #4</li>
          <li>AutoComplete #5</li>
        </ul>
      </div>
    );
  }
}

SearchSection.propTypes = {
  handleFocus: React.PropTypes.function,
  closeSearch: React.PropTypes.function,
};
SearchSection.contextTypes = {
};
