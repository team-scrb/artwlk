import React from 'react';
import TopBarButton from './TopBarButton';

// styles
import '../styles/components/TopBarSection';

export default class TopBarSection extends React.Component {
  render() {
    const title = this.props.title ? (
      <h2>{this.props.title}</h2>
    ) : null;
    const leftBtn = this.props.leftName ? (
      <TopBarButton
        name={this.props.leftName}
        click={this.props.leftClick}
        route={this.props.leftRoute}
        left
      />
    ) : null;
    const rightBtn = this.props.rightName ? (
      <TopBarButton
        name={this.props.rightName}
        click={this.props.rightClick}
        route={this.props.rightRoute}
        right
      />
    ) : null;

    return (
      <div className="TopBarSection">
        <div className="TopBarSection__leftContainer">
          {leftBtn}
        </div>
        <div className="TopBarSection__centerContainer">
          {title}
        </div>
        <div className="TopBarSection__rightContainer">
          {rightBtn}
        </div>
      </div>
    );
  }
}

TopBarSection.propTypes = {
  title: React.PropTypes.string,
  rightRoute: React.PropTypes.string,
  rightClick: React.PropTypes.func,
  rightName: React.PropTypes.string,
  leftRoute: React.PropTypes.string,
  leftClick: React.PropTypes.func,
  leftName: React.PropTypes.string,
};
