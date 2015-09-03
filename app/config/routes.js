import React from 'react';
import Container from '../components/Container';
import MapSection from '../components/MapSection';
import TourSection from '../components/TourSection';
import { Router, Route, DefaultRoute } from 'react-router';

export default (
  <Route name="app" path="/" handler={Container}>
    <Route name="Tour" handler={TourSection} />
    <Route name="Map" handler={MapSection} />
    <DefaultRoute handler={MapSection} />
  </Route>
);
