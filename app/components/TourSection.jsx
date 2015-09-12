import React from 'react';
import TopBarSection from './TopBarSection';
import Modal from 'react-modal';
import FilterSection from './FilterSection';
import SearchSection from './SearchSection';
import {getLocation} from '../utils/geo';

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
    };
    this.siteDetailClick = this.siteDetailClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    getLocation().then(this.props.getSites);
    this.props.getCurrSite(this.props.params.siteId);
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
