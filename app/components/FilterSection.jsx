import React from 'react';

// styles
import '../styles/components/FilterSection';

export default class FilterSection extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="FilterSection">
        Filter your search:
      </div>
    );
  }
}
