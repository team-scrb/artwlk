import React from 'react/addons';
import {RouteHandler} from 'react-router';
import ContainerNav from './ContainerNav';
import TopBarSection from './TopBarSection';
import {onSitesWithinRadius, latLngToAddress} from '../utils/geo';
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
      currMap: 'all',
      currSite: {},
      currTour: {},
      childMapPosition: null,
      selectedSites: [],
      tourFormData: null,
      address: '',
      createForm: { name: '', artist: '', description: '', streetArt: '', architecture: '', mural: '', sculpture: '', tags: '' },
      createFormLocation: null,
      imageData: null,
      photoUploadFile: null,
      searchProps: {},
      filterProps: {},
      userlocation: null,
      topBar: null,
      nearbySitesLoader: <div className="load"><hr/><hr/><hr/><hr/></div>,
      nearbyToursLoader: <div className="load"><hr/><hr/><hr/><hr/></div>,
    };

    this.getUserLocation = this.getUserLocation.bind(this);
    this.convertToAddress = this.convertToAddress.bind(this);
    this.setCurrMap = this.setCurrMap.bind(this);
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
    this.uploadPhotoPreview = this.uploadPhotoPreview.bind(this);
    this.setImageData = this.setImageData.bind(this);
    this.resetCreateSiteForm = this.resetCreateSiteForm.bind(this);
    this.handleCreateSiteFormInputChange = this.handleCreateSiteFormInputChange.bind(this);
    this.doFilterSearch = this.doFilterSearch.bind(this);
    this.setMarkers = this.setMarkers.bind(this);
    this.setTopBar = this.setTopBar.bind(this);
  }

  componentDidMount() {
    this.doSearch({});
    if (this.props.path === '/') {
      this.context.router.transitionTo('nearby');
    }
  }

  onMarkerClick(clickedMarker) {
    let currSite = this.state.currSite;
    if (clickedMarker && currSite.id === clickedMarker.id) {
      currSite = React.addons.update(currSite, {showInfo: {$apply: b => !b}});
    } else {
      currSite = React.addons.update(currSite, {showInfo: {$set: false}});
    }
    this.setState({currSite: currSite});

    const sites = this.state.sites.slice();
    this.setState({sites: sites.map(site => {
      if (clickedMarker && site.id === clickedMarker.id) {
        return React.addons.update(site, {showInfo: {$apply: b => !b}});
      } else if (site.showInfo) {
        return React.addons.update(site, {showInfo: {$set: false}});
      }
      return site;
    })});
  }

  getUserLocation(userLocation) {
    this.setState({
      userLocation: userLocation,
    });
  }

  setTopBar(topBarObj) {
    this.setState({
      topBar: topBarObj,
    });
  }

  setCurrMap(currMap) {
    return new Promise((resolve) => {
      this.setState({ currMap }, resolve);
    });
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
      .then(tours => {
        this.setState({
          tours: tours,
        });
      })
      .catch(error => console.error(error)); // eslint-disable-line no-console
  }

  setMarkers(markers) {
    this.setState({markers});
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
    return new Promise((resolve) => {
      if (siteId) {
        getSiteByKey(siteId)
          .then(currSite => {
            this.setState({currSite}, resolve);
          });
      } else {
        this.setState({ currSite: {} }, resolve);
      }
    });
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

  setImageData(imageData, userLocation) {
    this.setState({imageData, userLocation});
  }

  doSearch(searchProps) {
    this.setState({sites: [], tours: [], searchProps});
    onSearch(searchProps, {}, (resultType, result) => {
      if (resultType === 'site') {
        this.setState({sites: this.state.sites.concat(result)});
      }
      if (resultType === 'tour') {
        this.setState({tours: this.state.tours.concat(result)});
      }
    })
    .then(location => {
      this.setState({origin: new google.maps.LatLng(location.coords.latitude, location.coords.longitude)});
    });
  }

  doFilterSearch(filterProps) {
    this.setState({sites: [], tours: []});
    onSearch(this.state.searchProps, filterProps, (resultType, result) => {
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
    const index = sites.findIndex(s => {
      return s.id === currentMarker.id;
    });
    let site = sites[index];
    if (site.showInfo) {
      site = React.addons.update(site, {
        showInfo: {$set: false},
      });
      sites.splice(index, 1, site);
      this.setState({sites});
    }
  }

  handleCreateSiteFormInputChange(event) {
    const newCreate = this.state.createForm;
    newCreate[event.target.dataset.name] = event.target.value;
    this.setState({createForm: newCreate});
  }

  markerIconHandler(category) {
    // Temporary fix until we finalize how we will do categories
    const iconSets = {
      mural: {
        url: '../src/images/cpin.svg',
        anchor: new google.maps.Point(2, 22),
      },
      sculpture: {
        url: '../src/images/lpin.svg',
        anchor: new google.maps.Point(2, 22),
      },
      streetArt: {
        url: '../src/images/bpin.svg',
        anchor: new google.maps.Point(2, 22),
      },
      architectureArt: {
        url: '../src/images/wpin.svg',
        anchor: new google.maps.Point(2, 22),
      },
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
    return latLngToAddress(coords).then(address => this.setState({address}));
  }

  uploadPhotoPreview(file) {
    this.setState({photoUploadFile: file});
  }

  resetCreateSiteForm() {
    const resetForm = { name: '', artist: '', description: '', category: '', tags: '' };
    this.setState({ createForm: resetForm, imageData: null, photoUploadFile: null, childMapPosition: null });
  }

  render() {
    const topBar = this.state.topBar ? (
      <TopBarSection
        {...this.props}
        {...this.state}
      />
    ) : null;

    return (
      <div className="Container">
        {topBar}
        <RouteHandler
          {...this.state}
          {...this.props}
          setTopBar={this.setTopBar}
          setCurrMap={this.setCurrMap}
          getCurrSite={this.getCurrSite}
          getCurrTour={this.getCurrTour}
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
          doFilterSearch={this.doFilterSearch}
          getCurrTour={this.getCurrTour}
          convertToAddress={this.convertToAddress}
          setImageData={this.setImageData}
          resetCreateSiteForm={this.resetCreateSiteForm}
          uploadPhotoPreview={this.uploadPhotoPreview}
          handleCreateSiteFormInputChange={this.handleCreateSiteFormInputChange}
          setMarkers={this.setMarkers}
          getUserLocation={this.getUserLocation}
        />
        <ContainerNav />
      </div>
    );
  }
}

Container.propTypes = {
  path: React.PropTypes.string,
};

Container.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
