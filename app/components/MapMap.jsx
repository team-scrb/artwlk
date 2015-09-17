import React from 'react';
import {GoogleMap, Marker, InfoWindow} from 'react-google-maps';
// import {GoogleMap, Marker, InfoWindow, DirectionsRenderer} from 'react-google-maps';
// import {getLocation} from '../utils/geo';

// styles
import '../styles/components/MapSection';

export default class MapMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directions: null,
      markers: null,
    };

    // this.onMapClick = this.onMapClick.bind(this);
    this.renderInfoWindow = this.renderInfoWindow.bind(this);
  }

  // componentWillMount() {
  //   console.log('[MapMap] WILL MOUNT', this.props.currMap);
  //   this.renderMap();
  // }

  // onMapClick(event) {
  //   this.props.getSites({
  //     coords: {
  //       latitude: event.latLng.G,
  //       longitude: event.latLng.K,
  //     },
  //   });
  // }

  renderMap() {
    let markers = [];
    if (this.props.currMap === 'allSites' || this.props.currMap === 'singleSite') {
      const sites = this.props.currMap === 'singleSite' ? [this.props.currSite] : this.props.sites;

      markers = sites.map((site, index) => {
        // console.log('MARKER SITE!!!!', site);
        const ref = `marker_${index}`;
        const marker = {
          showInfo: site.showInfo,
          icon: this.props.iconSets(site.category),
          position: {
            lat: site.coords.latitude,
            lng: site.coords.longitude,
          },
          id: site.id,
          defaultAnimation: 2,
        };

        return (
          <Marker
            {...marker}
            onClick={this.props.onMarkerClick.bind(this, site)}>
            {marker.showInfo ? this.renderInfoWindow(ref, site) : null}
          </Marker>
        );
      });
    }
    return markers;
    // render a tour or all tours
    // if (currMap.tours.length) {
    //   let toursArr = [];
    // }

    // {this.props.params.siteId ? this.renderSingleSite() : null}
    // {this.props.params.tourId ? this.renderSingleTour() : null}
    // {this.props.path === '/nearby/map' || this.props.path === '/sites/map' ? this.renderAllSites() : null}
    // {this.props.path === '/tours/map' ? this.renderAllTours() : null}
    // {this.state.directions ? <DirectionsRenderer directions={this.state.directions} /> : null}

    // if (this.props.allSitesAndTours) {
    //   this.setState({
    //     markers: TODO,
    //   });
    // }

    // // render all sites and tours if on /nearby/map
    // if (this.props.path === '/nearby/map') {
    //   getLocation().then(() => {
    //     this.renderAllSites();
    //     // this.renderAllTours();
    //   });
    // }
    // // render all sites if on /sites/map
    // if (this.props.path === '/sites/map') {
    //   this.renderAllSites();
    // }
    // // render all tours if on /tours/map
    // if (this.props.path === '/tours/map') {
    //   this.renderAllTours();
    // }
  } // renderMap

  renderSingleSite() {
    this.props.getCurrSite(this.props.params.siteId);

    if (!Object.keys(this.props.currSite).length) {
      return null;
    }
    const site = this.props.currSite;
    const marker = {
      siteInfo: site,
      position: {
        lat: site.coords.latitude,
        lng: site.coords.longitude,
      },
      key: site.siteId,
      defaultAnimation: 2,
      showInfo: site.showInfo,
    };

    return (
      <Marker {...marker}
        onClick={this.props.onMarkerClick.bind(this, site)}>
        {marker.showInfo ? this.renderInfoWindow(site) : null}
      </Marker>
    );
  }

  renderAllTours() {
    // this.props.getTours();

    // TODO: render all the start points of the tours
  }

  renderSingleTour() {
    const DirectionsService = new google.maps.DirectionsService();
    const _tour = this.props.tours.find(t => t.id === this.props.params.tourId);
    let routeArr = [];

    if (_tour) {
      routeArr = _tour.sites.map((siteObj) => {
        const {latitude, longitude} = siteObj.coords;

        return {
          location: new google.maps.LatLng(latitude, longitude),
          stopover: true,
        };
      });

      DirectionsService.route({
        origin: routeArr.shift().location,
        destination: routeArr.pop().location,
        travelMode: google.maps.TravelMode.WALKING,
        optimizeWaypoints: true,
        waypoints: routeArr,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${ status }`);  // eslint-disable-line no-console
        }
      });
    }
  }

  renderInfoWindow(marker) {
    return (
      <InfoWindow
        key={`${marker.id}_info_window`}
        onCloseclick={this.props.handleCloseClick.bind(this, marker)}
        onBlur={this.props.handleCloseClick.bind(this, marker)}
      >
        <div>
          <strong>{marker.name}</strong>
          <br />
          <img src={marker.imageUrl}></img>
          <p>by {marker.artist}</p>
          <p>{marker.description}</p>
          <p>{marker.imageUrl}</p>
        </div>
      </InfoWindow>
    );
  }

  render() {
    const markers = this.renderMap();
    return (
      <div className="MapSection">
        <GoogleMap
          containerProps={{
            ...this.props,
            style: {
              height: '100%',
              position: 'absolute',
              top: 0, bottom: 0, right: 0, left: 0,
            },
          }}
          className="MapSection__map"
          ref="map"
          defaultZoom={12}
          defaultCenter={{lat: 34.0147601, lng: -118.4934095}}
        >
          {markers}
        </GoogleMap>
      </div>
    );
  }
}

MapMap.propTypes = {
  params: React.PropTypes.object,
  path: React.PropTypes.string,
  getTours: React.PropTypes.func.isRequired,
  getSites: React.PropTypes.func.isRequired,
  tours: React.PropTypes.array.isRequired,
  sites: React.PropTypes.array.isRequired,
  onMarkerClick: React.PropTypes.func.isRequired,
  handleCloseClick: React.PropTypes.func.isRequired,
  iconSets: React.PropTypes.func.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  currSite: React.PropTypes.object,
  currTour: React.PropTypes.object,
  currMap: React.PropTypes.object,
  setMarkers: React.PropTypes.func.isRequired,
};
