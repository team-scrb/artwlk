import React from 'react';
import {distance} from '../utils/movement';
import moment from 'moment';

// styles
import '../styles/components/TourDetail';

export default class TourDetail extends React.Component {
  constructor(props) {
    super(props);

    this.siteDetailClick = this.siteDetailClick.bind(this);
  }

  componentDidMount() {
    this.props.getCurrTour(this.props.params.tourId)
      .then(() => {
        this.props.renderTopBar();
      });
  }

  siteDetailClick(siteInfo) {
    this.context.router.transitionTo('sites-detail', { siteId: siteInfo.id });
  }

  render() {
    const tour = this.props.currTour;
    let sites;

    if (tour && tour.sites) {
      // const _tour = this.props.tours.find(t => t.id === tour.id);
      const _tour = tour;

      if (_tour) {
        sites = _tour.sites.map(site => {
          const imageStyle = {
            backgroundImage: `url(${site.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '120px',
          };

          return (
            <li className="TourDetail__site" onClick={this.siteDetailClick.bind(null, site)}>
              <div
                style={imageStyle}
                className="TourDetail__site-hero-img"
              />
              <div className="TourDetail__site-meta">
                <span className="TourDetail__site-title">{site.name}</span>
                <span className="TourDetail__site-artist">{site.artist}</span>
              </div>
            </li>
          );
        });
      }
    }

    return (
      <div className="TourDetail">
        {tour.imageUrl && (<div
          style={{
            background: `url(${tour.imageUrl}) center center/cover`,
            width: '100%',
            height: '240px',
          }}
        />)}
        <div className="TourDetail__meta">
          {tour.title && <h2 className="TourDetail__title">{tour.title}</h2>}
          {tour.duration && <span className="TourDetail__meta-duration"><strong>Duration</strong>: {moment.duration(tour.duration, 'seconds').humanize()}</span>}
          {tour.distance && <span className="TourDetail__meta-distance"><strong>Distance</strong>: {distance.pretty(tour.distance)}</span>}
          {tour.sites && <span className="TourDetail__meta-num-sites"><strong># of Sites</strong>: {tour.sites && tour.sites.length}</span>}
        </div>
        {tour.descriptions && <p className="TourDetail__meta-description"><strong>Description</strong>: {tour.descriptions}</p>}
        <h3 className="TourDetail__sitesHeader">Sites</h3>
        <ul className="TourDetail__sites">
          {sites}
        </ul>
      </div>
    );
  }
}

TourDetail.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

TourDetail.propTypes = {
  renderTopBar: React.PropTypes.func.isRequired,
  getTours: React.PropTypes.func.isRequired,
  getCurrTour: React.PropTypes.func.isRequired,
  tours: React.PropTypes.array,
  currTour: React.PropTypes.object,
  params: React.PropTypes.object,
};
