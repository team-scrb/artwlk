import React from 'react';

// styles
import '../styles/components/SearchSection';

export default class SearchSection extends React.Component {
  constructor() {
    super();
    this.state = {
      // className: 'SearchSection',
      location: new google.maps.LatLng(34.04935261524454, -118.24610710144043),
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }

  componentDidMount() {
    this.setState({geosuggest: new google.maps.places.Autocomplete(this.refs.geosuggest.getDOMNode(), {types: ['(cities)']})});
  }

  closeSearch(event) {
    event.preventDefault();
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

  closeSearchModal() {
    this.props.closeModal();
  }

  handleFocus() {
    this.setState({className: 'SearchSection__active'});
  }

  render() {
    return (
      // <div className={this.state.className}>
      <div className="SearchForm">
        <h3 className="SearchForm__title">Search Artwlk</h3>
        <form onSubmit={this.closeSearch} className="SearchForm__form">
          <div className="SearchForm__form-input">
            <label className="SearchForm__form-label">
              Search for
              <input className="SearchForm__form-input-item" type="text" placeholder="Name, artist, category, etc." ref="searchtext" />
            </label>
            <label className="SearchForm__form-label">
              In
              <input className="SearchForm__form-input-item" type="text" ref="geosuggest" />
            </label>
          </div>
          <div className="SearchForm__form-buttons">
            <input className="SearchForm__form-buttons-item" type="submit" name="Search" />
            <button className="SearchForm__form-buttons-item-cancel" onClick={this.closeSearchModal}>Cancel</button>
          </div>
        </form>
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
