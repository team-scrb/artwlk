import React from 'react';
import {onSitesWithinRadius, getLocation} from '../utils/geo';
import {getSiteByKey} from '../utils/sites';

// styles
import '../styles/components/SiteSection';

export default class SiteSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempData: [{img: '', title: 'One', artist: 'Banksy', rating: '5 stars', category: ['Art', 'Street Art']}, {img: '', title: 'Two', artist: '', rating: '6 stars', category: ['Art', 'Fine Art']}],
    };
    this.getSites = this.getSites.bind(this);
  }
  componentDidMount() {
    getLocation().then(this.getSites);
  }
  getSites(location) {
    this.setState({sites: []}, () => {
      onSitesWithinRadius(location, 5, (siteId) => {
        getSiteByKey(siteId)
        .then(siteInfo => {
          this.setState({
            sites: this.state.sites.concat([{
              key: siteId,
              siteInfo,
            }]),
          });
        });
      });
    });
  }
  render() {
    // console.log('sites', this.state.sites);
    const temp = this.state.tempData.map((data, index) => {
      return (
        <li className="" key={index}>
          {data.title && <h3>{data.title}</h3>}
          {data.artist && <h5>{data.artist}</h5>}
          {data.rating && <span>{data.rating}</span>}
        </li>
      );
    });
    return (
      <div className="SiteSection">
        <h2>Browse our sites!!!</h2>
        <ul>
          {temp}
        </ul>
      </div>
    );
  }
}
