import React from 'react/addons';
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
      currSite: {},
    };
    this.getCurrSite = this.getCurrSite.bind(this);
    this.getSites = this.getSites.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.markerIconHandler = this.markerIconHandler.bind(this);
  }

  componentDidMount() {
    getLocation().then(this.getSites);
  }

  onMarkerClick(currentMarker) {
    const sites = this.state.sites;
    const index = sites.indexOf(currentMarker);
    let site = sites[index];
    site = React.addons.update(site, {
      showInfo: {$set: true},
    });
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

  getCurrSite(siteId) {
    getSiteByKey(siteId)
    .then(currSite => {
      this.setState({ currSite });
    });
  }

  handleCloseClick(currentMarker) {
    const sites = this.state.sites;
    const index = sites.indexOf(currentMarker);
    let site = sites[index];
    site = React.addons.update(site, {
      showInfo: {$set: false},
    });
    sites.splice(index, 1, site);
    this.setState({sites});
  }

  markerIconHandler(string) {
    const iconSets = {
      street: '/images/Spray-512.png',
      architecture: '/images/drafting-compass-512.png',
    };

    return iconSets[string];
  }

  render() {
    return (
      <div className="Container">
        <ContainerNav />
        <RouteHandler
          {...this.state}
          {...this.props}
          getCurrSite={this.getCurrSite}
          getSites={this.getSites}
          onMarkerClick={this.onMarkerClick}
          handleCloseClick={this.handleCloseClick}
          iconSets={this.markerIconHandler}
        />
      </div>
    );
  }
}
