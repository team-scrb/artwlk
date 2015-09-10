import React from 'react';
import SearchSection from './SearchSection';

// styles
import '../styles/components/NearbySection';

export default class NearbySection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NearbySection">
        <SearchSection />
        <div>
          <button>Tours</button>
          <button>Sites</button>
        </div>
        <ul>
          <li>Site</li>
          <li>Site</li>
          <li>Site</li>
        </ul>
      </div>
    );
  }
}
