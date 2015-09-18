import React from 'react';
import TopBarButton from './TopBarButton';

// styles
import '../styles/components/TopBarSection';

export default class TopBarSection extends React.Component {
  render() {
    const title = this.props.topBar.title ? (
      <h2>{this.props.topBar.title}</h2>
    ) : null;
    const leftBtn = this.props.topBar.leftBtn ? (
      <TopBarButton
        name={this.props.topBar.leftBtn.name}
        click={this.props.topBar.leftBtn.click}
        route={this.props.topBar.leftBtn.route}
        left
      />
    ) : null;
    const rightBtn = this.props.topBar.rightBtn ? (
      <TopBarButton
        name={this.props.topBar.rightBtn.name}
        click={this.props.topBar.rightBtn.click}
        route={this.props.topBar.rightBtn.route}
        right
      />
    ) : null;
    const bottomBtn = this.props.topBar.bottomBtn ? (
      <button className="TopBarBottomBtn" onClick={this.props.topBar.bottomBtn.click}>Search</button>
    ) : null;

    return (
      <div>
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
        {bottomBtn}
      </div>
    );
  }
}

TopBarSection.propTypes = {
  topBar: React.PropTypes.object.isRequired,
};
