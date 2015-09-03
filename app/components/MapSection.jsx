import React from 'react';
import {addons} from 'react/addons';
import {GoogleMap} from 'react-google-maps';
import {Marker} from 'react-google-maps';
import '../../styles/components/MapSection';
const {update} = addons;

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

  _handle_marker_rightclick (event) {
    console.log('hello')
    var {markers} = this.state;
    var filteredMarkers2 = markerTest.filter(function(item) {
      return item.key === 'zxcv';
    })
    console.log(filteredMarkers)
    this.setState({ markers: filteredMarkers2 });
  }

  _handle_map_click(event) {
     var {markers} = this.state;
     var filteredMarkers = markerTest.filter(function(item) {
       return item.key === 'Taiwan';
     })
     console.log(this.state.markers)
     this.setState({ markers: filteredMarkers });
     console.log(markerTest)
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
         defaultCenter={{lat: -25.363882, lng: 131.044922}}
         onClick={this._handle_map_click}>
         {this.state.markers.map((marker, index) => {
           return (
             <Marker
               {...marker}
               onRightclick={this._handle_marker_rightclick.bind(this, index)} />
           );
         })}
       </GoogleMap>
     );
   }
}
