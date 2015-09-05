import React from 'react';
import Container from '../components/Container';
import MapSection from '../components/MapSection';
import TourSection from '../components/TourSection';
import TourDetail from '../components/TourDetail';
import CreateSection from '../components/CreateSection';
import { Route, DefaultRoute } from 'react-router';

export default (
  <Route name="app" path="/" handler={Container}>
    <Route name="Tour" handler={TourSection} />
    <Route name="TourDetail" path="/tour/detail" handler={TourDetail} />
    <Route name="Map" handler={MapSection} />
    <Route name="Create" handler={CreateSection} />
    <DefaultRoute handler={MapSection} />
  </Route>
);
