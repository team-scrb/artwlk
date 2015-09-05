import React from 'react';
import {GoogleMap, Marker, InfoWindow, DirectionsRenderer} from 'react-google-maps';
import {onSitesWithinRadius, getLocation} from '../utils/geo';
import {getSiteByKey} from '../utils/sites';

// Used for quickly adding mock locations
// import {addSite} from '../utils/sites';

// styles
import '../styles/components/MapSection';

export default class CreateTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: null,
      destination: null,
      directions: null,
      markers: [],
      waypoints: [],
    };

    // Bind methods in this section
    this.onMapClick = this.onMapClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.getSites = this.getSites.bind(this);
    this.renderInfoWindow = this.renderInfoWindow.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  } // Constructor

  componentDidMount() {
    getLocation().then(this.getSites);
  }

  onMapClick() {
  // onMapClick(event) {
    // Used for quickly adding mock locations
    // addSite({
    //   coords: {
    //     latitude: event.latLng.G,
    //     longitude: event.latLng.K,
    //   },
    // });

    // Map routing service
    const DirectionsService = new google.maps.DirectionsService();

    this.setState({
      destination: this.state.waypoints[this.state.waypoints.length - 1].location,
    });

    DirectionsService.route(
      {
        origin: this.state.origin,
        destination: this.state.destination,
        travelMode: google.maps.TravelMode.WALKING,
        optimizeWaypoints: true,
        waypoints: this.state.waypoints || null,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${ result }`);
        }
      });
  }

  onMarkerClick(currentMarker) {
    const {lat} = currentMarker.position;
    const {lng} = currentMarker.position;
    const currentLocation = new google.maps.LatLng(lat, lng);
    const waypoint = {
      location: currentLocation,
      stopover: true,
    };

    if (this.state.origin === null) {
      this.setState({
        origin: currentLocation,
        waypoints: this.state.waypoints.concat([waypoint]),
      });
    } else if (this.state.origin && !this.state.destination) {
      this.setState({
        waypoints: this.state.waypoints.concat([waypoint]),
      });
    }
  }

  getSites(location) {
    this.setState({markers: []}, () => {
      onSitesWithinRadius(location, 50, (siteId, latLng) => {
        getSiteByKey(siteId)
        .then(siteInfo => {
          this.setState({
            markers: this.state.markers.concat([{
              position: {
                lat: latLng[0],
                lng: latLng[1]},
              key: siteId,
              defaultAnimation: 2,
              siteInfo,
            }]),
          });
        });
      });
    });
  }

  handleCloseClick(currentMarker) {
    currentMarker.showInfo = false;
    this.setState(currentMarker);
  }

  renderInfoWindow(ref, marker) {
    return (
      <InfoWindow
        key={`${ref}_info_window`}
        onCloseclick={this.handleCloseClick.bind(this, marker)}
      >
        <div>
          <strong>{marker.siteInfo.name}</strong>
          <br />
          <img src={marker.siteInfo.imageUrl}></img>
          <p>by {marker.siteInfo.artist}</p>
          <p>{marker.siteInfo.description}</p>
          <p>{marker.siteInfo.name}</p>
        </div>
      </InfoWindow>
    );
  }

 render() {
   const {directions} = this.state;

   return (
     <GoogleMap
       containerProps={{
         ...this.props,
         style: {
           height: '100%',
         },
       }}
       ref="map"
       defaultZoom={12}
       defaultCenter={{lat: 34.0147601, lng: -118.4934095}}
       onClick={this.onMapClick}>
       {directions ? <DirectionsRenderer directions={directions} /> : null}
       {this.state.markers.map((marker, index) => {
         const ref = `marker_${index}`;
         return (
           <Marker {...marker}
             onClick={this.onMarkerClick.bind(this, marker)}>
             {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}
           </Marker>
         );
       })}
     </GoogleMap>
   );
 }
}
