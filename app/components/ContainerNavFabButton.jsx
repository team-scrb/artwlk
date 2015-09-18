import React from 'react';
import mui, { FloatingActionButton } from 'material-ui';

// styles
import '../styles/components/ContainerNavFabButton';
const ThemeManager = new mui.Styles.ThemeManager();

export default class ContainerNavFabButton extends React.Component {
  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  constructor() {
    super();
    this.state = {
      miniFabOpen: false,
    };
    this.handleFabClick = this.handleFabClick.bind(this);
    this.handleMiniSiteFabClick = this.handleMiniSiteFabClick.bind(this);
    this.handleMiniTourFabClick = this.handleMiniTourFabClick.bind(this);
  }

  getChildContext() {
    return { muiTheme: ThemeManager.getCurrentTheme() };
  }

  handleFabClick() {
    this.setState({miniFabOpen: !this.state.miniFabOpen});
  }

  handleMiniSiteFabClick() {
    const router = this.context.router;
    router.transitionTo('create');
  }

  handleMiniTourFabClick() {
    const router = this.context.router;
    router.transitionTo('create-tour');
  }

  render() {
    const miniSiteFab = this.state.miniFabOpen ? 'ContainerNavFabButton__miniSite--Open' : 'ContainerNavFabButton__miniSite';
    const miniTourFab = this.state.miniFabOpen ? 'ContainerNavFabButton__miniTour--Open' : 'ContainerNavFabButton__miniTour';
    const mainFab = this.state.miniFabOpen ? 'ContainerNavFabButton--Open' : 'ContainerNavFabButton';
    return (
      <div className="Conatiner__ContainerNavFabButton">
        <div className={miniSiteFab}>
          <FloatingActionButton mini={true} className={miniTourFab} name="miniSite" data-route="create" ref="miniSite" onClick={this.handleMiniSiteFabClick}>Site</FloatingActionButton>
          <FloatingActionButton mini={true} className={miniTourFab} data-route="create-tour" ref="miniTour" onClick={this.handleMiniTourFabClick}>Tour</FloatingActionButton>
        </div>
        <FloatingActionButton className={mainFab} onClick={this.handleFabClick} ref="mainFab">
          <i className="material-icons">add</i>
        </FloatingActionButton>
      </div>
    );
  }
}

ContainerNavFabButton.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
