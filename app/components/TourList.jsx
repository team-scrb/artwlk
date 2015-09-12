import React from 'react';

// styles
// import '../styles/components/TourList';

export default class TourList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTours();
  }

  render() {
    let tours = this.props.tours;
    let tourList = null;

    if (this.props.limit) {
      tours = tours.slice(0, parseInt(this.props.limit, 10));
    }

    if (tours) {
      tourList = tours.map(tour => {
        return (
          <li>
            <h3>{tour.title}</h3>
            <img src={tour.imageUrl} />
            <span>{tour.imgUrl}</span>
            <ul>{Object.keys(tour.categories).map(key => <li>{key}</li>)}</ul>
            <span>{tour.distance / 1000}km</span>
            <span>{tour.duration / 60}min</span>
            <span>{tour.sites.length}</span>
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
  tours: React.PropTypes.array,
  limit: React.PropTypes.string,
};
