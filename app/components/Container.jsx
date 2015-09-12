import React from 'react/addons';
import {RouteHandler} from 'react-router';
import ContainerNav from './ContainerNav';
import {onSitesWithinRadius, getLocation} from '../utils/geo';
import {getSiteByKey} from '../utils/sites';

// styles
import '../styles/components/Container';

export default class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: new google.maps.LatLng(34.04935261524454, -118.24610710144043),
      sites: [],
      currSite: {},
      childMapPosition: {},
    };

    this.getCurrSite = this.getCurrSite.bind(this);
    this.getSites = this.getSites.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.markerIconHandler = this.markerIconHandler.bind(this);
    this.getLatLng = this.getLatLng.bind(this);
  }

  componentDidMount() {
    getLocation().then(this.getSites);
  }

  onMarkerClick(clickedMarker) {
    const sites = this.state.sites;

    let index = sites.findIndex(site => site.showInfo);
    let site = sites[index];
    if (site && site.showInfo) {
      site = React.addons.update(site, {
        showInfo: {$set: false},
      });
      sites.splice(index, 1, site);
    }

    index = sites.indexOf(clickedMarker);
    site = sites[index];
    if (site) {
      site = React.addons.update(site, {
        showInfo: {$set: true},
      });
      sites.splice(index, 1, site);
    }

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
    if (siteId) {
      getSiteByKey(siteId)
      .then(currSite => {
        this.setState({ currSite });
      });
    } else {
      this.setState({ currSite: {} });
    }
  }

  getLatLng(latLng) {
    const {lat, lng} = latLng;
    this.setState({
      childMapPosition: {
        latitude: lat,
        longitude: lng,
      },
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

  markerIconHandler(category) {
    // Temporary fix until we finalize how we will do categories
    const iconSets = {
      mural: '/src/images/paint-brush-2-icon.png',
      sculpture: '/src/images/paint-brush-2-icon.png',
      streetArt: '/src/images/paint-brush-2-icon.png',
      architectureArt: '/src/images/paint-brush-2-icon.png',
    };

    for (const genre in category) {
      if (category[genre]) {
        return iconSets[genre];
      }
    }
  }


  render() {
    return (
      <div className="Container">
        <RouteHandler
          {...this.state}
          {...this.props}
          getCurrSite={this.getCurrSite}
          getSites={this.getSites}
          onMarkerClick={this.onMarkerClick}
          handleCloseClick={this.handleCloseClick}
          iconSets={this.markerIconHandler}
          getLatLng={this.getLatLng}
        />
        <ContainerNav />
      </div>
    );
  }
}

Container.propTypes = {
  path: React.PropTypes.string,
};
