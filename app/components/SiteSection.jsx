import React from 'react';
import {RouteHandler} from 'react-router';
import {getLocation} from '../utils/geo';
import TopBarSection from './TopBarSection';
import Modal from 'react-modal';
import FilterSection from './FilterSection';
import SearchSection from './SearchSection';
import SiteList from './SiteList';

// styles
import '../styles/components/SiteSection';

// modal stuff
const appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();

export default class SiteSection extends React.Component {
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
    getLocation();
    this.props.getCurrSite(this.props.params.siteId);
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
    const styles = this.props.params.siteId ? 'SiteSection__SiteList--hidden' : 'SiteSection__SiteList';
    const mapDetailRoute = `/sites/${this.props.params.siteId}`;
    const siteDetailRoute = `/sites/map/${this.props.params.siteId}`;
    const topBarRoutes = {
      'map': (
        <TopBarSection
          title = "Sites"
          leftName = "Filter"
          leftClick = {this.openModal.bind(this, 'filter')}
          rightName = "Map"
          rightRoute = "/map"
        />
      ),
      'mapDetail': (
        <TopBarSection
          title = {this.props.currSite.name}
          leftName = "Back"
          leftRoute = "sites"
          rightName = "Details"
          rightRoute = {mapDetailRoute}
        />
      ),
      'siteDetail': (
        <TopBarSection
          title = {this.props.currSite.name}
          leftName = "Back"
          leftRoute = "sites"
          rightName = "Map"
          rightRoute = {siteDetailRoute}
        />
      ),
    };

    const parsedUrl = () => {
      const url = this.props.path.split('/');
      if (url[2] === 'map' ) {
        return 'mapDetail';
      } else if (url[2]) {
        return 'siteDetail';
      } else if (url[1] === 'sites') {
        return 'map';
      }
    };

    return (
      <div className="SiteSection">
        {topBarRoutes[parsedUrl()]}
        <button onClick={this.openModal}>Search me</button>
        <RouteHandler
          {...this.state}
          {...this.props}
        />

        <h2 className={styles}>Browse our sites!!!</h2>
        <div className={styles}>
          <SiteList
            {...this.state}
            {...this.props}
          />
        </div>
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

SiteSection.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

SiteSection.propTypes = {
  getCurrSite: React.PropTypes.func.isRequired,
  currSite: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  path: React.PropTypes.string.isRequired,
};
