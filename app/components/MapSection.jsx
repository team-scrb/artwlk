import React from 'react';
import {GoogleMap, Marker, InfoWindow} from 'react-google-maps';

// styles
import '../styles/components/MapSection';

export default class MapSection extends React.Component {
  constructor(props) {
    super(props);
    this.onMapClick = this.onMapClick.bind(this);
    this.renderInfoWindow = this.renderInfoWindow.bind(this);
  }
  onMapClick(event) {
    this.props.getSites({
      coords: {
        latitude: event.latLng.G,
        longitude: event.latLng.K,
      },
    });
  }
  renderInfoWindow(ref, marker) {
    return (
      <InfoWindow
        key={`${ref}_info_window`}
        onCloseclick={this.props.handleCloseClick.bind(this, marker)}
        onBlur={this.props.handleCloseClick.bind(this, marker)}
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
        {this.props.sites.map((site, index) => {
          const marker = {
            siteInfo: site.siteInfo,
            position: {
              lat: site.siteInfo.coords.latitude,
              lng: site.siteInfo.coords.longitude,
            },
            key: site.siteId,
            defaultAnimation: 2,
            showInfo: site.showInfo,
          };
          const ref = `marker_${index}`;
          return (
            <Marker {...marker}
              onClick={this.props.onMarkerClick.bind(this, site)}>
              {marker.showInfo ? this.renderInfoWindow(ref, site) : null}
            </Marker>
          );
        })}
      </GoogleMap>
    );
  }
}
MapSection.propTypes = {
  getSites: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
  onMarkerClick: React.PropTypes.func.isRequired,
  handleCloseClick: React.PropTypes.func.isRequired,
};
