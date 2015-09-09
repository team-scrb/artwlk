import React from 'react';
import TopBarButton from './TopBarButton';

// styles
import '../styles/components/TopBarSection';

export default class TopBarSection extends React.Component {
  render() {
    const topBarRoutes = {
      '/nearby': (
        <div>
          <TopBarButton name="Filter" left/>
          <h2>Nearby</h2>
          <TopBarButton name="List" route="map" right/>
        </div>
      ),
      '/sites': (
        <div>
          <TopBarButton name="Filter" />
          <h2>Sites</h2>
          <TopBarButton name="Map" route="map"/>
        </div>
      ),
      '/tours': (
        <div>
          <TopBarButton name="Filter" />
          <h2>Tours</h2>
          <TopBarButton name="Map" route="map" />
        </div>
      ),
      '/create': (
        <div>
          <h2>Create</h2>
        </div>
      ),
      '/map': (
        <div>
          <TopBarButton name="Filter" />
          <h2>Map</h2>
          <TopBarButton name="List" route="sites"/>
        </div>
      ),
    };
    return (
      <div className="TopBarSection">
        {topBarRoutes[this.props.path]}
      </div>
    );
  }
}

TopBarSection.propTypes = {
  path: React.PropTypes.string,
};
