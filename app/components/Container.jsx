import React from 'react';
import {RouteHandler} from 'react-router';
import ContainerNav from './ContainerNav';
import {onSitesWithinRadius, getLocation} from '../utils/geo';
import {getSiteByKey} from '../utils/sites';

// styles
import '../styles/components/Container';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: new google.maps.LatLng(34.04935261524454, -118.24610710144043),
      sites: [],
    };
    this.getSites = this.getSites.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }
  componentDidMount() {
    getLocation().then(this.getSites);
  }
  onMarkerClick(currentMarker) {
    const sites = this.state.sites;
    const index = sites.indexOf(currentMarker);
    const site = sites[index];
    site.showInfo = true;
    sites.splice(index, 1, site);
    this.setState({sites});
  }
  getSites(location) {
    this.setState({sites: []}, () => {
      onSitesWithinRadius(location, 5, (siteId) => {
        getSiteByKey(siteId)
        .then(siteInfo => {
          this.setState({
            sites: this.state.sites.concat([{
              siteInfo, siteId,
            }]),
          });
        });
      });
    });
  }
  handleCloseClick(currentMarker) {
    const sites = this.state.sites;
    const index = sites.indexOf(currentMarker);
    const site = sites[index];
    site.showInfo = false;
    sites.splice(index, 1, site);
    this.setState({sites});
  }
  render() {
    return (
      <div className="Container">
        <ContainerNav />
        <RouteHandler {...this.props} getSites={this.getSites} {...this.state} onMarkerClick={this.onMarkerClick} handleCloseClick={this.handleCloseClick}/>
      </div>
    );
  }
}
