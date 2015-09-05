import React from 'react';

// styles
import '../styles/components/SiteDetail';

export default class SiteDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="SiteDetail">
        <img src="" />
        <h3>Site Title</h3>
        <h5>Artist</h5>
        <span>Rating</span><br/>
        <span>Categories, Categories</span><br/>
        <span>Tag, Tag</span><br/>
        <button>View on map</button><br/>
        <p>Details...</p>
        <ul>
          <li><strong>Comments</strong></li>
          <li>Comment One</li>
          <li>Comment Two</li>
        </ul>
      </div>
    );
  }
}
