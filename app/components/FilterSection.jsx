import React from 'react';

// styles
import '../styles/components/FilterSection';

export default class FilterSection extends React.Component {
  constructor() {
    super();
    this.closeFilter = this.closeFilter.bind(this);
  }
  closeFilter() {
    this.props.doFilterSearch({
      architecture: this.refs.architecture.getDOMNode().checked,
      mural: this.refs.mural.getDOMNode().checked,
      sculpture: this.refs.sculpture.getDOMNode().checked,
      streetArt: this.refs.streetArt.getDOMNode().checked,
      distance: this.refs.distance.getDOMNode().value,
    });
    this.props.closeModal();
  }
  render() {
    return (
      <div className="FilterSection">
        <h3>Filter Options</h3>
        <p>Categories</p>
        <label><input type="checkbox" ref="architecture"/>architecture</label><br/>
        <label><input type="checkbox" ref="mural"/>mural</label><br/>
        <label><input type="checkbox" ref="sculpture"/>sculpture</label><br/>
        <label><input type="checkbox" ref="streetArt"/>street art</label><br/>
        <p>Within Distance</p>
        <label><input type="text" ref="distance"/> km</label><br/>
        <button onClick={this.closeFilter}>Save Settings</button>
      </div>
    );
  }
}

FilterSection.propTypes = {
  handleFocus: React.PropTypes.func,
  closeSearch: React.PropTypes.func,
  closeModal: React.PropTypes.func.isRequired,
  doFilterSearch: React.PropTypes.func.isRequired,
};
