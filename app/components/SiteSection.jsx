import React from 'react';
import {getLocation} from '../utils/geo';

// styles
import '../styles/components/SiteSection';

export default class SiteSection extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    getLocation().then(this.props.getSites);
  }
  render() {
    const siteList = this.props.sites.map((data, index) => {
      return (
        <li className="" key={index}>
          {data.siteInfo.imageUrl && <img src={data.siteInfo.imageUrl}/>}
          {data.siteInfo.name && <h3>{data.siteInfo.name}</h3>}
          {data.siteInfo.artist && <h5>{data.siteInfo.artist}</h5>}
          {data.siteInfo.coords && <h5>{data.siteInfo.coords}</h5>}
          {data.siteInfo.architecture && <h6>{data.siteInfo.architecture}</h6>}
          {data.siteInfo.streetArt && <h6>{data.siteInfo.streetArt}</h6>}
          {data.siteInfo.description && <p>{data.siteInfo.description}</p>}
        </li>
      );
    });
    return (
      <div className="SiteSection">
        <h2>Browse our sites!!!</h2>
        <ul>
          {siteList}
        </ul>
      </div>
    );
  }
}
SiteSection.propTypes = {
  getLocation: React.PropTypes.func.isRequired,
  getSites: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
};
