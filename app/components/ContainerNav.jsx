import React from 'react';

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
      <nav className="nav">
        <button data-route="Tour" onClick={this._handleClick}>Tour</button>
        <button data-route="Map" onClick={this._handleClick}>Map</button>
      </nav>
    );
  }
}

ContainerNav.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
