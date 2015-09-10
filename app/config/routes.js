import React from 'react';
import Container from '../components/Container';
import MapSection from '../components/MapSection';
import NearbySection from '../components/NearbySection';
import TourSection from '../components/TourSection';
import TourDetail from '../components/TourDetail';
import SiteSection from '../components/SiteSection';
import SiteDetail from '../components/SiteDetail';
import CreateSection from '../components/CreateSection';
import TopBarFilter from '../components/TopBarFilter';
import TopBarSearch from '../components/TopBarSearch';
import Login from '../components/login-signup/Login';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
  <Route name="app" path="/" handler={Container}>
    <Route name="nearby" handler={NearbySection} />
    <Route name="tours" handler={TourSection} />
    <Route name="tours-detail" path="/tours/:tourId" handler={TourDetail} />
    <Route name="sites" handler={SiteSection} />
    <Route name="sites-detail" path="/sites/:siteId" handler={SiteDetail} />
    <Route name="map" handler={MapSection} />
    <Route name="create" handler={CreateSection} />
    <Route name="filter" handler={TopBarFilter} />
    <Route name="search" handler={TopBarSearch} />
    <Route name="login" handler={Login} />
    <DefaultRoute handler={NearbySection} />
    <NotFoundRoute handler={MapSection} />
  </Route>
);


// Authorized routes
import {willTransitionTo} from '../utils/auth';
CreateSection.willTransitionTo = willTransitionTo;
