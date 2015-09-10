import React from 'react';
import {GoogleMap, Marker, Circle} from 'react-google-maps';

// styles
import '../styles/components/MapSection';
export default class CreateSectionMapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {lat: 34.0147601, lng: -118.4934095},
      radius: 3100,
    };
    this.addSite = this.addSite.bind(this);
    this.onMapDrag = this.onMapDrag.bind(this);
  }

  onMapDrag() {
    const {G, K} = this.refs.map.state.map.center;
    this.setState({
      center: {
        lat: G,
        lng: K,
      },
    });
    this.props.getSites({
      coords: {
        latitude: G,
        longitude: K,
      },
    });
  }

  addSite() {
    const {G, K} = this.refs.map.state.map.center;
    this.props.getLatLng({
      lat: G,
      lng: K,
    });
    this.context.router.transitionTo('create');
  }

  render() {
    const {center, radius} = this.state;
    let contents = [];

    if (center) {
      contents = contents.concat([
        (<Circle center={center} radius={radius} options={{
          fillColor: 'green',
          fillOpacity: 0.20,
          strokeColor: 'lightblue',
          strokeOpacity: 1,
          strokeWeight: 1,
        }} />),
      ]);
    }

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
        defaultCenter={center || this.state.center}
        onClick={this.addSite}
        onDrag={this.onMapDrag}>
        {contents}
        {this.props.sites.map(site => {
          const marker = {
            siteInfo: site.siteInfo,
            position: {
              lat: site.siteInfo.coords.latitude,
              lng: site.siteInfo.coords.longitude,
            },
            key: site.siteId,
            defaultAnimation: 1,
            showInfo: site.showInfo,
          };
          return (
            <Marker {...marker}
              onClick={this.props.onMarkerClick.bind(this, site)} />
          );
        })}
      </GoogleMap>
    );
  }
}
CreateSectionMapView.propTypes = {
  getSites: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
  onMarkerClick: React.PropTypes.func.isRequired,
  getLatLng: React.PropTypes.func.isRequired,
};

CreateSectionMapView.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
