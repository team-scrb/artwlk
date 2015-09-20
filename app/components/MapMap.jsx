import React from 'react';
import {GoogleMap, Marker, InfoWindow, DirectionsRenderer} from 'react-google-maps';
import {getLocation} from '../utils/geo';

// styles
import '../styles/components/MapSection';

export default class MapMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: [],
      markers: [],
    };
    setTimeout(this.onComponentDidMount.bind(this), 0);

    this.renderInfoWindow = this.renderInfoWindow.bind(this);
    this.renderSingleSite = this.renderSingleSite.bind(this);
    this.renderSingleTour = this.renderSingleTour.bind(this);
  }

  componentWillMount() {
    this.props.renderTopBar();
    this.renderMap(this.props);
  }

  componentWillReceiveProps(props) {
    if (props.origin !== this.props.origin) {
      setTimeout(() => this.refs.map.panTo(props.origin), 10);
    }
    this.renderMap(props);
  }

  onComponentDidMount() {
    this.renderMap(this.props);

    getLocation().then(location => {
      this.props.getUserLocation(location);
    });
  }

  infoWindowClick(marker) {
    marker.showInfo = false;
    this.context.router.transitionTo('sites-detail', {siteId: marker.id});
  }

  renderMap(props) {
    const route = props.routes[props.routes.length - 1];
    if (route.path.match('nearby') || route.path.match('sites')) {
      const sites = route.paramNames.indexOf('siteId') !== -1 ? [props.currSite] : props.sites;
      this.setState({markers: sites.map(this.renderSingleSite)});
    }
    if (route.path.match('nearby') || route.path.match('tours')) {
      const tours = route.paramNames.indexOf('tourId') !== -1 ? [props.currTour] : props.tours;
      tours.filter(x => this.props === props || this.props.tours.indexOf(x) === -1).forEach(t => this.renderSingleTour(t));
    }
  }

  renderSingleSite(site) {
    if (!site || !site.coords) return null;
    const marker = {
      siteInfo: site,
      icon: this.props.iconSets(site.category),
      position: {
        lat: site.coords.latitude,
        lng: site.coords.longitude,
      },
      key: site.id,
      defaultAnimation: 2,
      showInfo: site.showInfo,
      clickable: true,
    };
    return (
      <Marker {...marker}
        onClick={this.props.onMarkerClick.bind(this, site)}>
        {marker.showInfo ? this.renderInfoWindow(site) : null}
      </Marker>
    );
  }

  renderSingleTour(tour, retry) {
    const retries = retry || 0;
    const DirectionsService = new google.maps.DirectionsService();
    const route = tour.sites.map((siteObj) => {
      const {latitude, longitude} = siteObj.coords;
      return {
        location: new google.maps.LatLng(latitude, longitude),
        stopover: true,
      };
    });

    const first = route.shift();
    const last = route.length ? route.pop() : first;

    DirectionsService.route({
      origin: first.location,
      destination: last.location,
      travelMode: google.maps.TravelMode.WALKING,
      optimizeWaypoints: true,
      waypoints: route,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: this.state.directions.concat(<DirectionsRenderer directions={result} />),
        });
      } else {
        if (retries < 10) setTimeout(() => this.renderSingleTour(tour, retries + 1), 500 * retries * Math.random());
        console.log(`error fetching directions ${ tour.title }`, 'retries', retries);  // eslint-disable-line no-console
      }
    });
  }

  renderInfoWindow(marker) {
    const imageStyle = {
      backgroundImage: `url(${marker.imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '200px',
    };

    return (
      <InfoWindow
        key={`${marker.id}_info_window`}
        onCloseclick={this.props.handleCloseClick.bind(this, marker)}
        onBlur={this.props.handleCloseClick.bind(this, marker)}
      >
        <div>
          <h2 className="InfoWindow__title">{marker.name}</h2>
          <p className="InfoWindow__artist">by {marker.artist}</p>
          <div className="InfoWindow__imageContainer" style={imageStyle} onClick={this.infoWindowClick.bind(this, marker)}></div>
          <p className="InfoWindow__description">{marker.description}</p>
        </div>
      </InfoWindow>
    );
  }

  renderUserMarker() {
    const marker = {
      icon: '../src/images/blue.png',
      position: {
        lat: this.props.userLocation.coords.latitude,
        lng: this.props.userLocation.coords.longitude,
      },
      showInfo: true,
    };

    return (
      <Marker ref="userLocationMarker" {...marker} />
    );
  }

  render() {
    const mapStyle = [{
      'featureType': 'administrative',
      'elementType': 'labels.text.fill',
      'stylers': [{
        'color': '#444444',
      }],
    }, {
      'featureType': 'landscape',
      'elementType': 'all',
      'stylers': [{
        'color': '#f2f2f2',
      }],
    }, {
      'featureType': 'poi',
      'elementType': 'all',
      'stylers': [{
        'visibility': 'off',
      }],
    }, {
      'featureType': 'road',
      'elementType': 'all',
      'stylers': [{
        'saturation': -100,
      }, {
        'lightness': 45,
      }],
    }, {
      'featureType': 'road.highway',
      'elementType': 'all',
      'stylers': [{
        'visibility': 'simplified',
      }],
    }, {
      'featureType': 'road.arterial',
      'elementType': 'labels.icon',
      'stylers': [{
        'visibility': 'off',
      }],
    }, {
      'featureType': 'transit',
      'elementType': 'all',
      'stylers': [{
        'visibility': 'off',
      }],
    }, {
      'featureType': 'water',
      'elementType': 'all',
      'stylers': [{
        'color': '#6e8088',
      }, {
        'visibility': 'on',
      }],
    }];

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
          center={this.props.origin}
          className="MapSection__map"
          ref="map"
          defaultZoom={12}
          defaultCenter={{lat: 34.0147601, lng: -118.4934095}}
          onClick={() => this.props.onMarkerClick(null)}
          defaultOptions={{
            styles: mapStyle,
          }}
        >
          {this.props.userLocation ? this.renderUserMarker() : null}
          {this.state.directions}
          {this.state.markers}
        </GoogleMap>
      </div>
    );
  }
}

MapMap.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

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
  currMap: React.PropTypes.string,
  setMarkers: React.PropTypes.func.isRequired,
  renderTopBar: React.PropTypes.func.isRequired,
  getUserLocation: React.PropTypes.func.isRequired,
  userLocation: React.PropTypes.object,
  origin: React.PropTypes.instanceOf(google.maps.LatLng),
};
