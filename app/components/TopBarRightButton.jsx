import React from 'react';

// styles
// import '../styles/components/TopBarRightButton';

export default class TopBarRightButton extends React.Component {
  render() {
    return (
      <button>{this.props.name}</button>
    );
  }
}

TopBarRightButton.propTypes = {
  name: React.PropTypes.string,
};
