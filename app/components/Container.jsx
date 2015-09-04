import React from 'react';
import { RouteHandler } from 'react-router';
import ContainerNav from './ContainerNav';

// styles
import '../styles/components/Container';

export default class Home extends React.Component {
  render() {
    return (
      <div className="Container">
        <ContainerNav />
        <RouteHandler {...this.props} />
      </div>
    );
  }
}
