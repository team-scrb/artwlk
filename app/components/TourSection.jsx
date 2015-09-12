import React from 'react';
import TopBarSection from './TopBarSection';
import Modal from 'react-modal';
import FilterSection from './FilterSection';
import SearchSection from './SearchSection';
import {getLocation} from '../utils/geo';
import {getAllTours} from '../utils/tours';
import {getSiteByKey} from '../utils/sites';

// styles
import '../styles/components/TourSection';

const appElement = document.getElementById('app');

Modal.setAppElement(appElement);
Modal.injectCSS();

export default class TourSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalContent: false,
      tours: [],
    };
    this.siteDetailClick = this.siteDetailClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    getLocation().then(this.props.getSites);
    this.props.getCurrSite(this.props.params.siteId);

    getAllTours()
    .then(tours => {
      const tourPromises = tours.map(tour => {
        const sitePromises = tour.sites.map(site => {
          return getSiteByKey(site);
        });
        return Promise.all(sitePromises)
        .then(sites => {
          tour.sites = sites;
          return tour;
        });
      });
      return Promise.all(tourPromises);
    })
    .then(tours => {
      tours.forEach(tour => {
        tour.categories = {};
        tour.sites.forEach(site => {
          Object.keys(site.category).forEach(key => {
            if (site.category[key]) {
              tour.categories[key] = true;
            }
          });
        });
        tour.imageUrl = tour.sites[0].imageUrl;
      });
      return tours;
    })
    .then(tours => this.setState({tours}))
    .catch(error => console.error(error));
  }

  siteDetailClick(event) {
    const router = this.context.router;
    router.transitionTo('sites-detail', { siteId: event.target.dataset.route });
  }

  openModal(modalContent) {
    if (modalContent === 'filter') {
      this.setState({modalContent: <FilterSection />});
    } else {
      this.setState({modalContent: <SearchSection />});
    }
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const list = this.state.tours.map(tour => {
      return (
        <li>
          <h3>{tour.title}</h3>
          <img src={tour.imageUrl} />
          <span>{tour.imgUrl}</span>
          <span>{tour.categories}</span>
          <span>{tour.distance / 1000}km</span>
          <span>{tour.duration}min</span>
          <span>{tour.sites.length}</span>
        </li>
      );
    });
    return (
      <div className="TourSection">
        <TopBarSection
          title="Tour"
          leftName="Filter"
          leftClick = {this.openModal.bind(this, 'filter')}
          rightName="Map"
          rightRoute="map"
        />
        <button onClick={this.openModal}>Search me</button>
        <h2>Make me a tour please!</h2>
        <ul>
          {list}
        </ul>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          {this.state.modalContent}
        </Modal>
      </div>
    );
  }
}

TourSection.propTypes = {
  getSites: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};
