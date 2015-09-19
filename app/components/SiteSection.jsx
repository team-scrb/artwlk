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

    this.renderTopBar = this.renderTopBar.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.renderTopBar();

    switch (this.props.path) {
    case '/sites':
    case '/sites/':
    case '/sites/map':
    case '/sites/map/':
      this.props.setCurrMap('allSites');

      if (this.props.params.siteId) {
        this.props.getCurrSite(this.props.params.siteId)
          .then(() => {
            this.props.setCurrMap('singleSite');
          });
      }
      break;
    default:
    }
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
    const props = this.props;
    const path = props.path;

    switch (path) {
    case '/sites':
    case '/sites/':
      props.setTopBar({
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
      break;
    case '/sites/map':
    case '/sites/map/':
      if (props.params.siteId) {
        props.setTopBar({
          title: props.currSite.name,
          leftBtn: {
            name: 'Sites',
            route: 'sites',
          },
          rightBtn: {
            name: 'Details',
            route: `/sites/${props.params.siteId}`,
          },
        });
      } else {
        props.setTopBar({
          title: 'Sites',
          leftBtn: {
            name: 'Filter',
            click: this.openModal.bind(this, 'filter'),
          },
          rightBtn: {
            name: 'List',
            route: 'sites',
          },
        });
      }
      break;
    default:
    }
  }

  render() {
    return (
      <div className="SiteSection">
        <RouteHandler
          {...this.state}
          {...this.props}
          renderTopBar={this.renderTopBar}
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
