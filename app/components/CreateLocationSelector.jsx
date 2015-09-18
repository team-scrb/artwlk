import React from 'react';
import {GoogleMap} from 'react-google-maps';

// styles
import '../styles/components/MapSection';

export default class CreateLocationSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 34.0147601,
        lng: -118.4934095,
      },
    };

    this.addSite = this.addSite.bind(this);
  }

  componentWillMount() {
    this.renderTopBar();
  }

  addSite() {
    const {H, L} = this.refs.map.state.map.center;

    this.props.getLatLng({
      lat: H,
      lng: L,
    });
    this.props.convertToAddress({latitude: H, longitude: L});
    this.context.router.transitionTo('create');
  }

  renderTopBar() {
    this.props.setTopBar({
      title: 'Select Location',
      leftBtn: {
        name: 'Cancel',
        route: 'create',
      },
      rightBtn: {
        name: 'Select',
        click: this.addSite,
      },
    });
  }

  render() {
    return (
      <div className="MapSection__createLocation-container">
        <GoogleMap
          containerProps={{
            ...this.props,
            className: 'MapSection__createLocation-map',
            style: {
              height: '100%',
              flex: 1,
            },
          }}
          ref="map"
          defaultZoom={18}
          defaultCenter={{
            lat: this.state.center.lat,
            lng: this.state.center.lng,
          }}
          mapTypeId={google.maps.MapTypeId.SATELLITE}
        />
      </div>
    );
  }
}

CreateLocationSelector.propTypes = {
  setTopBar: React.PropTypes.func.isRequired,
  getSites: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
  onMarkerClick: React.PropTypes.func.isRequired,
  getLatLng: React.PropTypes.func.isRequired,
  convertToAddress: React.PropTypes.func.isRequired,
};

CreateLocationSelector.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
