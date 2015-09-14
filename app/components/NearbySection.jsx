import React from 'react';
import TopBarSection from './TopBarSection';
import Modal from 'react-modal';
import FilterSection from './FilterSection';
import SearchSection from './SearchSection';
import {getLocation} from '../utils/geo';
import SiteList from './SiteList';
import TourList from './TourList';

// styles
import '../styles/components/NearbySection';

const appElement = document.getElementById('app');

Modal.setAppElement(appElement);
Modal.injectCSS();

export default class NearbySection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalContent: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    getLocation().then(this.props.getSites);
    this.props.getCurrSite(this.props.params.siteId);
  }

  openModal(modalContent) {
    if (modalContent === 'filter') {
      this.setState({modalContent: <FilterSection />});
    } else {
      this.setState({modalContent: <SearchSection doSearch={this.props.doSearch} closeModal={this.closeModal} />});
    }
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  routeTo(route) {
    this.context.router.transitionTo(route);
  }

  render() {
    return (
      <div className="NearbySection">
        <TopBarSection
          title="Nearby"
          leftName="Filter"
          leftClick={this.openModal.bind(this, 'filter')}
          rightName="Map"
          rightRoute="map"
        />
        <button onClick={this.openModal}>Search me</button>
        <div>
          <button onClick={this.routeTo.bind(this, 'tours')}>Tours</button>
          <button onClick={this.routeTo.bind(this, 'sites')}>Sites</button>
        </div>
        <h2>Sites</h2>
        <SiteList
          limit="2"
          {...this.state}
          {...this.props}
        />
        <h2>Tours</h2>
        <TourList
          limit="2"
          {...this.state}
          {...this.props}
        />
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

NearbySection.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

NearbySection.propTypes = {
  getSites: React.PropTypes.func.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  doSearch: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};
