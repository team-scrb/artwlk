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

  closeFilterModal() {
    this.props.closeModal();
  }

  render() {
    return (
      <div className="FilterSection">
        <h3>Filter Options</h3>
        <form onSubmit="{this.closeFilter}">
          <p className="FilterSelector__form-label">Categories</p>
          <label className="FilterSelector__checkbox-item"><input type="checkbox" ref="architecture" className="FilterSelector__checkbox-item-input"/>Architecture</label><br/>
          <label className="FilterSelector__checkbox-item"><input type="checkbox" ref="mural" className="FilterSelector__checkbox-item-input"/>Mural</label><br/>
          <label className="FilterSelector__checkbox-item"><input type="checkbox" ref="sculpture" className="FilterSelector__checkbox-item-input"/>Sculpture</label><br/>
          <label className="FilterSelector__checkbox-item"><input type="checkbox" ref="streetArt" className="FilterSelector__checkbox-item-input"/>Street Art</label><br/>
          <p className="FilterSelector__form-label">Within Distance</p>
          <label className="FilterSelector__input"><input type="text" ref="distance" placeholder="Distance in km" className="FilterSelector__input-item"/></label><br/>
          <div className="FilterSelector__button-container">
            <input type="submit" className="FilterSelector__button" name="Seach" />
            <button className="FilterSelector__button-cancel" onSubmit={this.closeFilterModal}>Cancel</button>
          </div>
        </form>
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
