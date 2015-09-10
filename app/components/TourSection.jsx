import React from 'react';
import SearchSection from './SearchSection';

// styles
import '../styles/components/TourSection';

export default class Tour extends React.Component {
  render() {
    return (
      <div className="TourSection">
        <SearchSection />
        <h2>Make me a tour please!</h2>
        <ul>
          <li>
            <img src="" />
            <h3>Title</h3>
            <div>Rating</div>
            <span>Categories, Categories</span>
            <span>Total Distance</span>
            <span># of sites</span>
          </li>
          <li>
            <img src="" />
            <h3>Title</h3>
            <div>Rating</div>
            <span>Categories, Categories</span>
            <span>Total Distance</span>
            <span># of sites</span>
          </li>
        </ul>
      </div>
    );
  }
}
