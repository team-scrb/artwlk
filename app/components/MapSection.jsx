import React from 'react';
import {addons} from 'react/addons';
import {GoogleMap, Marker} from 'react-google-maps';
import {onSitesWithinRadius, addSiteLocation} from '../utils/geo';
import '../styles/components/MapSection';

export default class MapSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: new google.maps.LatLng(34.01940714979137, -118.4945198893547),
      markers: [],
    };

    // Bind methods in this section
    this._handle_map_click = this._handle_map_click.bind(this);
  } // Constructor

  componentDidMount() {
    onSitesWithinRadius(10, (siteId, latLng) => {
      let newMarkers = this.state.markers;
      this.setState({
        markers: newMarkers.concat([{
          position: {
            lat: latLng[0],
            lng: latLng[1]},
            key: siteId,
          defaultAnimation: 2}]
        )
      });
    });
  }

  _handle_map_click(event) {
    let date = Date.now();
    addSiteLocation(date.toString(), [event.latLng.G, event.latLng.K]);
  }

   render () {
     return (
       <GoogleMap containerProps={{
           ...this.props,
           style: {
             height: "100%",
           },
         }}
         ref="map"
       defaultZoom={12}
     defaultCenter={{lat: 34.04935261524454, lng: -118.24610710144043}}
         onClick={this._handle_map_click}>
         {this.state.markers.map((marker, index) => {
           return (
             <Marker {...marker} />
           );
         })}
       </GoogleMap>
     );
   }
}
