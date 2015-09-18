import React from 'react';
import {RouteHandler} from 'react-router';
import Modal from 'react-modal';
import FilterSection from './FilterSection';
import SearchSection from './SearchSection';

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
      modalContent: null,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.renderTopBar();

    // if on /sites/map
    if (this.props.path === '/sites'
      || this.props.path === '/sites/map'
      || this.props.path === '/sites/map/') {
      this.props.setCurrMap('allSites');
    }

    // if on /sites/map/:siteId
    if (this.props.params.siteId) {
      this.props.getCurrSite(this.props.params.siteId)
        .then(() => {
          this.props.setCurrMap('singleSite');
        });
    }

    // if on /sites/:siteId
  }

  openModal(modalContent) {
    if (modalContent === 'filter') {
      this.setState({modalContent: <FilterSection doFilterSearch={this.props.doFilterSearch} closeModal={this.closeModal}/>});
    } else {
      this.setState({modalContent: <SearchSection doSearch={this.props.doSearch} closeModal={this.closeModal} />});
    }
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  renderTopBar() {
    const path = this.props.path;
    const pathArr = path.split('/');

    // sites/:siteId
    if (pathArr[1] === 'sites' && pathArr[2] !== 'map' && this.props.params.siteId) {
      this.props.setTopBar({
        title: this.props.currSite.name,
        leftBtn: {
          name: 'Sites',
          route: 'sites',
        },
        rightBtn: {
          name: 'Map',
          route: `/sites/map/${this.props.params.siteId}`,
        },
      });
    }

    // sites/map/:siteId
    if (pathArr[1] === 'sites' && pathArr[2] === 'map' && this.props.params.siteId) {
      this.props.setTopBar({
        title: this.props.currSite.name,
        leftBtn: {
          name: 'Sites',
          route: 'sites',
        },
        rightBtn: {
          name: 'Details',
          route: `/sites/${this.props.params.siteId}`,
        },
      });
    }

    // sites/
    if (pathArr[1] === 'sites') {
      this.props.setTopBar({
        title: 'Sites',
        leftBtn: {
          name: 'Filter',
          click: this.openModal.bind(this, 'filter'),
        },
        rightBtn: {
          name: 'Map',
          route: '/sites/map',
        },
        bottomBtn: {
          name: 'Search',
          click: this.openModal,
        },
      });
    }
  }

  render() {
    return (
      <div className="SiteSection">
        <RouteHandler
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

SiteSection.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

SiteSection.propTypes = {
  setTopBar: React.PropTypes.func.isRequired,
  setCurrMap: React.PropTypes.func.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  currSite: React.PropTypes.object.isRequired,
  sites: React.PropTypes.array.isRequired,
  doSearch: React.PropTypes.func.isRequired,
  doFilterSearch: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  path: React.PropTypes.string.isRequired,
};
