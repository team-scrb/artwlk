import React from 'react';
import TopBarButton from './TopBarButton';
import SearchSection from './SearchSection';

// styles
import '../styles/components/TopBarSection';

export default class TopBarSection extends React.Component {
  render() {
    return (
      <div className="TopBarSection">
        <div>
          <TopBarButton name={this.props.leftName} route={this.props.leftRoute} left />
          <h2>{this.props.title}</h2>
          <TopBarButton name={this.props.rightName} route={this.props.rightRoute} right />
        </div>

        <div>
          <SearchSection />
        </div>
      </div>
    );
  }
}

TopBarSection.propTypes = {
  path: React.PropTypes.string,
  title: React.PropTypes.string,
  rightRoute: React.PropTypes.string,
  rightName: React.PropTypes.string,
  leftRoute: React.PropTypes.string,
  leftName: React.PropTypes.string,
};
