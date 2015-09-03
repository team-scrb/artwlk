import React from 'react';
import {addons} from 'react/addons';
import {GoogleMap, Marker} from 'react-google-maps';
import '../styles/components/MapSection';
const {update} = addons;

// Placeholder data for markers
let markerTest = [{
  position: {
    lat: 25.0112183,
    lng: 121.52067570000001,
    },
  key: "Taiwan",
  defaultAnimation: 2
}, {
  position: {
    lat: 34.0112183,
    lng: 121.52067570000001,
    },
  key: "sdfdsf",
  defaultAnimation: 2
}];

export default class MapSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: new google.maps.LatLng(41.8507300, -87.6512600),
      destination: new google.maps.LatLng(41.8525800, -87.6514100),
      directions: null,
      markers: markerTest,
    };
    this._handle_map_click = this._handle_map_click.bind(this);
  }

  componentDidMount() {
  }

  _handle_map_click(event) {
     var {markers} = this.state;
     var filteredMarkers = markerTest.filter(function(item) {
       return item.key === 'Taiwan';
     })
     console.log(this.state.markers)
     this.setState({ markers: filteredMarkers });
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
         defaultZoom={3}
         defaultCenter={{lat: 34.363882, lng: 121.044922}}
         onClick={this._handle_map_click}>
         {this.state.markers.map((marker, index) => {
           return (
             <Marker
               {...marker}/>
           );
         })}
       </GoogleMap>
     );
   }
}
