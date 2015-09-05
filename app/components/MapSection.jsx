import React from 'react';
import {GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import {onSitesWithinRadius, getLocation} from '../utils/geo';
import {getSiteByKey} from '../utils/sites';

// styles
import '../styles/components/MapSection';

export default class MapSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: new google.maps.LatLng(34.04935261524454, -118.24610710144043),
      markers: [],
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

  onMapClick(event) {
    this.getSites({
      coords: {
        latitude: event.latLng.G,
        longitude: event.latLng.K,
      },
    });
  }

  onMarkerClick(currentMarker) {
    this.state.markers.forEach((stateMarker) => {
      stateMarker.showInfo = false;
    });

    currentMarker.showInfo = true;
    this.setState(currentMarker);
  }

  getSites(location) {
    this.setState({markers: []}, () => {
      onSitesWithinRadius(location, 5, (siteId, latLng) => {
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
        </div>
      </InfoWindow>
    );
  }

 render() {
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
