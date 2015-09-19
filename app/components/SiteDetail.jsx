import React from 'react';

// styles
import '../styles/components/SiteDetail';

export default class SiteDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const site = this.props.currSite;
    let hashTags;
    let showAddress;

    const categories = [];
    for (const key in this.props.currSite.category) {
      if (this.props.currSite.category[key]) {
        categories.push(key);
      }
    }

    if (site) {
      const {tags, coords} = this.props.currSite;
      const {address} = this.props;

      if (tags) {
        hashTags = tags.map(tag => tag + ' ');
      }

      if (coords) {
        this.props.convertToAddress(coords);
      }

      if (address) {
        showAddress = address;
      }
    }

    return (
      <div className="SiteDetail">
        <img src={this.props.currSite.imageUrl} />
        <h3>{this.props.currSite.name}</h3>
        <h5>By: {this.props.currSite.artist}</h5>
        <span>Categories: {categories}</span><br/>
        <span>Hash Tags: {hashTags}</span><br/>
        <span>Location: {showAddress}</span><br/>
        <p>{this.props.currSite.description ? this.props.currSite.description : null}</p>
        <button>View on map</button><br/>
      </div>
    );
  }
}

SiteDetail.propTypes = {
  currSite: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  convertToAddress: React.PropTypes.func.isRequired,
  address: React.PropTypes.func.isRequired,
};
