import React from 'react';

// styles
import '../styles/components/SearchSection';

export default class SearchSection extends React.Component {
  constructor() {
    super();
    this.state = {
      className: 'SearchSection',
      location: new google.maps.LatLng(34.04935261524454, -118.24610710144043),
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }
  componentDidMount() {
    this.setState({geosuggest: new google.maps.places.Autocomplete(this.refs.geosuggest.getDOMNode(), {types: ['(cities)']})});
  }
  closeSearch() {
    this.setState({
      className: 'SearchSection',
    });
    const searchProps = {
      searchText: this.refs.searchtext.getDOMNode().value,
      locationText: this.refs.geosuggest.getDOMNode().value,
    };
    this.props.doSearch(searchProps);
    this.props.closeModal();
  }
  handleFocus() {
    this.setState({className: 'SearchSection__active'});
  }
  render() {
    return (
      <div className={this.state.className}>
        <input type="text" ref="searchtext" />
        <input type="text" ref="geosuggest" />
        <button onClick={this.closeSearch}>X</button>
      </div>
    );
  }
}

SearchSection.propTypes = {
  handleFocus: React.PropTypes.func,
  closeSearch: React.PropTypes.func,
  doSearch: React.PropTypes.func,
  closeModal: React.PropTypes.func.isRequired,
};
