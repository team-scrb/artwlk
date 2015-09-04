import React from 'react';
import {GoogleMap, Marker} from 'react-google-maps';
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
    this._onMapClick = this._onMapClick.bind(this);
    this._onMarkerClick = this._onMarkerClick.bind(this);
    this._getSites = this._getSites.bind(this);
  } // Constructor

  componentDidMount() {
    getLocation().then(this._getSites);
  }

  _getSites(location) {
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

  _onMapClick(event) {
    this._getSites({
      coords: {
        latitude: event.latLng.G,
        longitude: event.latLng.K,
      },
    });
  }

  _onMarkerClick(index) {
    console.log(this.state.markers[index].siteInfo);
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
       onClick={this._onMapClick}>
       {this.state.markers.map((marker, index) => {
         return (
           <Marker {...marker} onClick={this._onMarkerClick.bind(null, index)}/>
         );
       })}
     </GoogleMap>
   );
 }
}
