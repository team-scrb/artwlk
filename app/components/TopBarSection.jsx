import React from 'react';

// styles
import '../styles/components/TopBarSection';

export default class TopBarSection extends React.Component {
  render() {
    return (
      <div className="TopBarSection">{this.props.path === '/nearby' ? 'NEARBY' : 'NOT NEARBY'}</div>
    );
  }
}

TopBarSection.propTypes = {
  path: React.PropTypes.string,
};

// TopBarSection.contextTypes = {
//   router: React.PropTypes.func.isRequired,
// };
