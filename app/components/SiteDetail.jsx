import React from 'react';

// styles
import '../styles/components/SiteDetail';

export default class SiteDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCurrSite(this.props.params.siteId)
      .then(() => {
        this.props.renderTopBar();
      });
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
        {this.props.currSite.imageUrl && (<div
          style={{
            background: `url(${this.props.currSite.imageUrl}) center center/cover`,
            width: '100%',
            height: '360px',
          }}
        />)}
        <div className="SiteDetail__meta">
          {this.props.currSite.name && <h2 className="SiteDetail__meta-title">{this.props.currSite.name}</h2>}
          {this.props.currSite.artist && <span className="SiteDetail__meta-artist"><strong>By</strong>: {this.props.currSite.artist}</span>}
          {categories && <span className="SiteDetail__meta-categories"><strong>Categories</strong>: {categories}</span>}
          {hashTags && <span className="SiteDetail__meta-tags"><strong>Tags</strong>: {hashTags}</span>}
          {showAddress && <span className="SiteDetail__meta-location"><strong>Location</strong>: {showAddress}</span>}
        </div>
        {this.props.currSite.description && <p className="SiteDetail__description">{this.props.currSite.description}</p>}
      </div>
    );
  }
}

SiteDetail.propTypes = {
  renderTopBar: React.PropTypes.func.isRequired,
  currSite: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  convertToAddress: React.PropTypes.func.isRequired,
  address: React.PropTypes.func.isRequired,
};
