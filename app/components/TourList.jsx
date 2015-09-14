import React from 'react';
import moment from 'moment';
import {distance} from '../utils/movement';
import {getTourByKey} from '../utils/tours';

// styles
import '../styles/components/TourList';

export default class TourList extends React.Component {
  constructor(props) {
    super(props);

    this.handleTourClick = this.handleTourClick.bind(this);
  }

  componentDidMount() {
    this.props.getTours();
  }

  handleTourClick(tourId) {
    getTourByKey(tourId).then(tourInfo => {
      this.props.getCurrTour(tourInfo);
      this.context.router.transitionTo('tours-detail', {tourId});
    });
  }

  render() {
    let tours = this.props.tours;
    let tourList = null;

    if (this.props.limit) {
      tours = tours.slice(0, parseInt(this.props.limit, 10));
    }

    if (tours) {
      tourList = tours.map((tour, index) => {
        return (
          <li key={index}>
            <h3 data-route={tour.id} onClick={this.handleTourClick.bind(null, tour.id)}>{tour.title}</h3>
            <img src={tour.imageUrl} />
            <span>{tour.imgUrl}</span>
            <ul>{Object.keys(tour.categories).map(key => <li>{key}</li>)}</ul>
            <span>{distance.pretty(tour.distance)}</span>
            <span>{moment.duration(tour.duration, 'seconds').humanize()}</span>
            <span>{tour.sites.length} points of interest</span>
          </li>
        );
      });
    }

    return (
      <ul>
        {tourList}
      </ul>
    );
  }
}

TourList.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

TourList.propTypes = {
  getTours: React.PropTypes.func.isRequired,
  getCurrTour: React.PropTypes.func,
  tours: React.PropTypes.array,
  limit: React.PropTypes.string,
  currTour: React.PropTypes.object,
};
