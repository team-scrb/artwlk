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
        <button data-route="tours" onClick={this._handleClick}>Tours</button>
        <button data-route="sites" onClick={this._handleClick}>Sites</button>
        <button data-route="create" onClick={this._handleClick}>Create</button>
        <button data-route="create-tour" onClick={this._handleClick}>Create Tour</button>
      </nav>
    );
  }
}

ContainerNav.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
