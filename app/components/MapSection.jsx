import React from 'react';
import SearchSection from './SearchSection';
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
          <p>by {marker.siteInfo.artist}</p>
          <p>{marker.siteInfo.description}</p>
          <p>{marker.siteInfo.imageUrl}</p>
        </div>
      </InfoWindow>
    );
  }
  render() {
    return (
      <div className="MapSection">
        <SearchSection />
        <GoogleMap
          containerProps={{
            ...this.props,
            style: {
              height: '100%',
            },
          }}
          className="MapSection__map"
          ref="map"
          defaultZoom={12}
          defaultCenter={{lat: 34.0147601, lng: -118.4934095}}
          onClick={this.onMapClick}>
          {this.props.sites.map((site, index) => {
            const {category} = site.siteInfo;
            const marker = {
              siteInfo: site.siteInfo,
              icon: this.props.iconSets(category),
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
      </div>
    );
  }
}
MapSection.propTypes = {
  getSites: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
  onMarkerClick: React.PropTypes.func.isRequired,
  handleCloseClick: React.PropTypes.func.isRequired,
  iconSets: React.PropTypes.func.isRequired,
};
