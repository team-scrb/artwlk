import React from 'react';

// styles
import '../styles/components/TourDetail';

export default class TourDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TourDetail">
        <img src="" />
        <h3>Tour Title</h3><br/>
        <span>Rating</span><br/>
        <span>Categories, Categories</span><br/>
        <span>Total Distance</span><br/>
        <span># of sites</span><br/>
        <button>View on map</button><br/>
        <p>Details...</p>
        <ul>
          <li><strong>Sites</strong></li>
          <li>Site One</li>
          <li>Site Two</li>
        </ul>
        <ul>
          <li><strong>Comments</strong></li>
          <li>Comment One</li>
          <li>Comment Two</li>
        </ul>
      </div>
    );
  }
}
