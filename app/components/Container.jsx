import React from 'react';
import { RouteHandler } from 'react-router';
import ContainerNav from './ContainerNav';

export default class Home extends React.Component {
  render() {
    return (
      <div className="main">
        <nav className="nav">
          <ContainerNav />
        </nav>
        <div className="Container">
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
}
