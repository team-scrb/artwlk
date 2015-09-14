import React from 'react';

// styles
import '../styles/components/TourDetail';

export default class TourDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrTour(this.props.params.tourId);
  }

  render() {
    const tour = this.props.currTour;
    return (
      <div className="TourDetail">
        <img src="" />
        <h3>{tour.title}</h3><br/>
        <span>Duration: {Math.round(tour.duration / 60)} minutes</span><br/>
        <span>Distance: {Math.round(tour.distance * 0.000621371)} miles</span><br/>
        <span># of sites: </span><br/>
        <p>{tour.descriptions}</p>
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

TourDetail.propTypes = {
  getTours: React.PropTypes.func.isRequired,
  getCurrTour: React.PropTypes.func.isRequired,
  getLocation: React.PropTypes.func.isRequired,
  tours: React.PropTypes.array,
  currSite: React.PropTypes.sting,
  currTour: React.PropTypes.object,
  params: React.PropTypes.object,
};
