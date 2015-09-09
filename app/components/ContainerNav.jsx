import React from 'react';

// styles
import '../styles/components/ContainerNav';

export default class ContainerNav extends React.Component {
  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
  }
  _handleClick(event) {
    const router = this.context.router;
    router.transitionTo(event.target.dataset.route);
  }
  render() {
    return (
      <nav className="ContainerNav">
        <button data-route="nearby" onClick={this._handleClick}>Nearby</button>
        <button data-route="tours" onClick={this._handleClick}>Tour</button>
        <button data-route="map" onClick={this._handleClick}>Map</button>
        <button data-route="create" onClick={this._handleClick}>Create</button>
      </nav>
    );
  }
}

ContainerNav.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
