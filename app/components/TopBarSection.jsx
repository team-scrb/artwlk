import React from 'react';
import TopBarButton from './TopBarButton';

// styles
import '../styles/components/TopBarSection';

export default class TopBarSection extends React.Component {
  render() {
    return (
      <div className="TopBarSection">
        <div>
          <TopBarButton name={this.props.leftName} click={this.props.leftClick} route={this.props.leftRoute} left />
          <h2>{this.props.title}</h2>
          <TopBarButton name={this.props.rightName} click={this.props.rightClick} route={this.props.rightRoute} right />
        </div>
      </div>
    );
  }
}

TopBarSection.propTypes = {
  path: React.PropTypes.string,
  title: React.PropTypes.string,
  rightRoute: React.PropTypes.string,
  rightClick: React.PropTypes.func,
  rightName: React.PropTypes.string,
  leftRoute: React.PropTypes.string,
  leftClick: React.PropTypes.func,
  leftName: React.PropTypes.string,
};
