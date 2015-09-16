import React from 'react/addons';
import {RouteHandler} from 'react-router';
import ContainerNav from './ContainerNav';
import {onSitesWithinRadius, getLocation, latLngToAddress} from '../utils/geo';
import {getSiteByKey} from '../utils/sites';
import {getAllTours} from '../utils/tours';
import {onSearch} from '../utils/search';
import {getTourByKey} from '../utils/tours';

// styles
import '../styles/components/Container';

export default class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: new google.maps.LatLng(34.04935261524454, -118.24610710144043),
      sites: [],
      tours: [],
      currSite: {},
      currTour: {},
      childMapPosition: {},
      selectedSites: [],
      tourFormData: {},
      address: '',
      createForm: { name: '', artist: '', description: '', category: '', tags: '' },
      createFormLocation: null,
    };

    this.convertToAddress = this.convertToAddress.bind(this);
    this.getCurrSite = this.getCurrSite.bind(this);
    this.getCurrTour = this.getCurrTour.bind(this);
    this.getTours = this.getTours.bind(this);
    this.getSites = this.getSites.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.markerIconHandler = this.markerIconHandler.bind(this);
    this.getLatLng = this.getLatLng.bind(this);
    this.selectSites = this.selectSites.bind(this);
    this.reorderSites = this.reorderSites.bind(this);
    this.saveTourFormData = this.saveTourFormData.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  getTours() {
    getAllTours()
      .then(tours => {
        const tourPromises = tours.map(tour => {
          const sitePromises = tour.sites.map(site => {
            return getSiteByKey(site);
          });
          return Promise.all(sitePromises)
          .then(sites => {
            tour.sites = sites;
            return tour;
          });
        });
        return Promise.all(tourPromises);
      })
      .then(tours => {
        tours.forEach(tour => {
          tour.categories = {};
          tour.sites.forEach(site => {
            Object.keys(site.category).forEach(key => {
              if (site.category[key]) {
                tour.categories[key] = true;
              }
            });
          });
          tour.imageUrl = tour.sites[0].imageUrl;
        });
        return tours;
      })
      .then(tours => this.setState({tours}))
      .catch(error => console.error(error)); // eslint-disable-line no-console
  }

  getSites(location) {
    this.setState({sites: []}, () => {
      onSitesWithinRadius(location, 5, (siteId) => {
        getSiteByKey(siteId)
        .then(siteInfo => {
          this.setState({
            sites: this.state.sites.concat(siteInfo),
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

  getCurrTour(tourId) {
    if (tourId) {
      getTourByKey(tourId)
      .then(currTour => {
        this.setState({ currTour });
      });
    } else {
      this.setState({ currTour: {} });
    }
  }

  getLatLng(latLng) {
    const {lat, lng} = latLng;
    this.setState({
      childMapPosition: {
        latitude: lat,
        longitude: lng,
      },
      createFormLocation: latLng,
    });
  }

  doSearch(searchProps) {
    this.setState({sites: [], tours: []});
    onSearch(searchProps, (resultType, result) => {
      if (resultType === 'site') {
        this.setState({sites: this.state.sites.concat(result)});
      }
      if (resultType === 'tour') {
        this.setState({tours: this.state.tours.concat(result)});
      }
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

  handleChange(event) {
    const newCreate = this.state.createForm;
    newCreate[event.target.dataset.name] = event.target.value;
    this.setState({createForm: newCreate});
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

  selectSites(selectedSites) {
    this.setState({selectedSites});
  }

  reorderSites(selectedSites) {
    this.setState({selectedSites});
  }

  saveTourFormData(tourFormData) {
    this.setState({tourFormData});
  }

  convertToAddress(coords) {
    latLngToAddress(coords).then(address => this.setState({address}));
  }

  render() {
    return (
      <div className="Container">
        <RouteHandler
          {...this.state}
          {...this.props}
          getCurrSite={this.getCurrSite}
          getSites={this.getSites}
          getTours={this.getTours}
          onMarkerClick={this.onMarkerClick}
          handleCloseClick={this.handleCloseClick}
          iconSets={this.markerIconHandler}
          getLatLng={this.getLatLng}
          reorderSites={this.reorderSites}
          selectSites={this.selectSites}
          saveTourFormData={this.saveTourFormData}
          doSearch={this.doSearch}
          getCurrTour={this.getCurrTour}
          convertToAddress={this.convertToAddress}
          handleChange={this.handleChange}
        />
        <ContainerNav />
      </div>
    );
  }
}

Container.propTypes = {
  path: React.PropTypes.string,
};
