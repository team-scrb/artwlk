import React from 'react';
import TopBarButton from './TopBarButton';

// styles
import '../styles/components/TopBarSection';

export default class TopBarSection extends React.Component {
  render() {
    const topBarRoutes = {
      '/nearby': (
        <div>
          <TopBarButton name="Filter" route="filter" left/>
          <h2>Nearby</h2>
          <TopBarButton name="List" route="map" right/>
        </div>
      ),
      '/sites': (
        <div>
          <TopBarButton name="Filter" route="filter" />
          <h2>Sites</h2>
          <TopBarButton name="Map" route="map"/>
        </div>
      ),
      '/tours': (
        <div>
          <TopBarButton name="Filter" route="filter" />
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
          <TopBarButton name="Filter" route="filter" />
          <h2>Map</h2>
          <TopBarButton name="List" route="sites"/>
        </div>
      ),
      '/filter': (
        <div>
          <TopBarButton name="Back" route="sites" />
          <h2>Filter</h2>
          <TopBarButton name="Go" route="sites"/>
        </div>
      ),
      '/search': (
        <div>
          <TopBarButton name="Cancel" route="" />
          <h2>Search</h2>
          <TopBarButton name="Search" route="sites"/>
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
