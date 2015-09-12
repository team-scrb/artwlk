import React from 'react';
import {RouteHandler} from 'react-router';
import {getLocation} from '../utils/geo';
import TopBarSection from './TopBarSection';
import Modal from 'react-modal';
import FilterSection from './FilterSection';
import SearchSection from './SearchSection';

// styles
import '../styles/components/SiteSection';

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

    const siteList = this.props.sites.map((data, index) => {
      return (
        <li className={styles} key={index}>
          {data.siteInfo.imageUrl && <img src={data.siteInfo.imageUrl}/>}
          {data.siteInfo.name && <h3 data-route={data.siteId} onClick={this.siteDetailClick}>{data.siteInfo.name}</h3>}
          {data.siteInfo.artist && <h5>{data.siteInfo.artist}</h5>}
          {data.siteInfo.coords && <h5>{data.siteInfo.coords}</h5>}
          {data.siteInfo.architecture && <h6>{data.siteInfo.architecture}</h6>}
          {data.siteInfo.streetArt && <h6>{data.siteInfo.streetArt}</h6>}
          {data.siteInfo.description && <p>{data.siteInfo.description}</p>}
        </li>
      );
    });

    // TODO: parse here
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
        <ul className={styles}>
          {siteList}
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

SiteSection.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

SiteSection.propTypes = {
  getSites: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  currSite: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  path: React.PropTypes.string.isRequired,
};
