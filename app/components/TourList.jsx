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
    this.props.renderTopBar();
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
      tourList = tours.filter(tour => tour.sites.length > 1).map((tour, index) => {
        const imageStyle = {
          backgroundImage: `url(${tour.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '120px',
        };

        return (
          <li
            className="TourList__tour"
            key={index}
            data-route={tour.id}
            onClick={this.handleTourClick.bind(null, tour.id)}
          >
            {tour.imageUrl && tour.sites && tour.duration && (<div
              className="TourList__tour-hero-img"
              style={imageStyle}
            >
            {tour.distance && <span className="TourList__tour-distance">{distance.pretty(tour.distance)}</span>}
            {tour.duration && <span className="TourList__tour-duration">{moment.duration(tour.duration, 'seconds').humanize()}</span>}
            </div>)}
            {tour.title && tour.categories && tour.sites && <span className="TourList__tour-meta">
              {tour.title && <h3 className="TourList__site-title">{tour.title}</h3>}
              {tour.categories && <ul className="TourList__tour-categories">{tour.categories && Object.keys(tour.categories).map(key => <li className="TourList__tour-category">{key}</li>)}</ul>}
              {tour.sites && <span className="TourList__tour-num-sites">{tour.sites.length} sites</span>}
            </span>}
          </li>
        );
      });
    }

    return (
      <ul className="TourList__tours">
        {tourList}
      </ul>
    );
  }
}

TourList.contextTypes = {
  router: React.PropTypes.func,
};

TourList.propTypes = {
  renderTopBar: React.PropTypes.func.isRequired,
  getTours: React.PropTypes.func.isRequired,
  getCurrTour: React.PropTypes.func,
  tours: React.PropTypes.array,
  limit: React.PropTypes.string,
  currTour: React.PropTypes.object,
};
