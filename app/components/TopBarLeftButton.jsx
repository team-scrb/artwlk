import React from 'react';

// styles
// import '../styles/components/TopBarRightButton';

export default class TopBarLeftButton extends React.Component {
  render() {
    return (
      <button>{this.props.name}</button>
    );
  }
}

TopBarLeftButton.propTypes = {
  name: React.PropTypes.string,
};
