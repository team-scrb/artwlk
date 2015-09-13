import React from 'react';
import {GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import {getLocation} from '../utils/geo';

// styles
import '../styles/components/MapSection';

export default class MapMap extends React.Component {
  constructor(props) {
    super(props);

    this.onMapClick = this.onMapClick.bind(this);
    this.renderInfoWindow = this.renderInfoWindow.bind(this);
  }

  componentWillMount() {
    if (this.props.params.siteId) {
      getLocation().then(this.props.getSites);
      this.props.getCurrSite(this.props.params.siteId);
    }

    // if (this.props.params.tourId) {
    this.props.getTours();
    // }
  }

  componentWillReceiveProps() {
    console.log(this.props.tours);
  }

  onMapClick(event) {
    this.props.getSites({
      coords: {
        latitude: event.latLng.G,
        longitude: event.latLng.K,
      },
    });
  }

  singleMarkerMaker() {
    if (!Object.keys(this.props.currSite).length) {
      return null;
    }
    const site = this.props.currSite;
    const marker = {
      siteInfo: site.siteInfo,
      position: {
        lat: site.coords.latitude,
        lng: site.coords.longitude,
      },
      key: site.siteId,
      defaultAnimation: 2,
      showInfo: site.showInfo,
    };
    return (
      <Marker {...marker}
        onClick={this.props.onMarkerClick.bind(this, site)}>
        {marker.showInfo ? this.renderInfoWindow(ref, site) : null}
      </Marker>
    );
  }

  mapMaker() {
    return this.props.sites.map((site, index) => {
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
        <GoogleMap
          containerProps={{
            ...this.props,
            style: {
              height: '100%',
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            },
          }}
          className="MapSection__map"
          ref="map"
          defaultZoom={12}
          defaultCenter={{lat: 34.0147601, lng: -118.4934095}}
          onClick={this.onMapClick}>
          {this.props.params.siteId ? this.singleMarkerMaker() : this.mapMaker()}
        </GoogleMap>
      </div>
    );
  }
}

MapMap.propTypes = {
  getTours: React.PropTypes.func.isRequired,
  getSites: React.PropTypes.func.isRequired,
  tours: React.PropTypes.array.isRequired,
  sites: React.PropTypes.array.isRequired,
  onMarkerClick: React.PropTypes.func.isRequired,
  handleCloseClick: React.PropTypes.func.isRequired,
  iconSets: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  currSite: React.PropTypes.object.isRequired,
};
