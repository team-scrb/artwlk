import React from 'react';
import ContainerNavFabButton from './ContainerNavFabButton';

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
      <div>
        <nav className="ContainerNav">
          <button className="ContainerNav__btn" data-route="nearby" onClick={this._handleClick}>Nearby</button>
          <button className="ContainerNav__btn" data-route="tours" onClick={this._handleClick}>Tours</button>
          <button className="ContainerNav__btn" data-route="sites" onClick={this._handleClick}>Sites</button>
        </nav>
        <ContainerNavFabButton />
      </div>
    );
  }
}

ContainerNav.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
