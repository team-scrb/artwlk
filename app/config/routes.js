import React from 'react';
import Container from '../components/Container';
import MapSection from '../components/MapSection';
import NearbySection from '../components/NearbySection';
import TourSection from '../components/TourSection';
import TourDetail from '../components/TourDetail';
import SiteSection from '../components/SiteSection';
import SiteDetail from '../components/SiteDetail';
import CreateSection from '../components/CreateSection';
import FilterSection from '../components/FilterSection';
import SearchSection from '../components/SearchSection';
import MapMap from '../components/MapMap';
import CreateLocationSelector from '../components/CreateLocationSelector';
import Login from '../components/login-signup/Login';
import CreateTour from '../components/CreateTour';
import CreateTourSiteSelector from '../components/CreateTourSiteSelector';

import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
  <Route name="app" path="/" handler={Container}>
    <Route name="nearby" handler={NearbySection} />
    <Route name="tours" handler={TourSection} />
    <Route name="tours-detail" path="/tours/:tourId" handler={TourDetail} />
    <Route name="sites" path="/sites" handler={SiteSection}>
      <Route name="map-site" path="/sites/map/:siteId" handler={MapMap} />
      <Route name="sites-detail" path="/sites/:siteId" handler={SiteDetail} />
    </Route>
    <Route name="map" handler={MapSection} />
    <Route name="create" handler={CreateSection} />
    <Route name="filter" handler={FilterSection} />
    <Route name="search" handler={SearchSection} />
    <Route name="create-locationselector" handler={CreateLocationSelector} />
    <Route name="login" handler={Login} />
    <Route name="create-tour" handler={CreateTour} />
    <Route name="create-tour-site-selector" handler={CreateTourSiteSelector} />
    <Route name="search-test" handler={SearchSection} />
    <DefaultRoute handler={NearbySection} />
    <NotFoundRoute handler={MapSection} />
  </Route>
);

// Authorized routes
import {willTransitionTo} from '../utils/auth';
CreateSection.willTransitionTo = willTransitionTo;
