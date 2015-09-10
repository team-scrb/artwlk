import React from 'react';

// styles
import '../styles/components/TopBarFilter';

export default class TopBarFilter extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="TopBarFilter">
        Filter your search:
      </div>
    );
  }
}

TopBarFilter.propTypes = {
};
