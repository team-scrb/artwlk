import React from 'react';
import Modal from 'react-modal';
import FilterSection from './FilterSection';
import SearchSection from './SearchSection';
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

    this.renderTopBar = this.renderTopBar.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.props.setTopBar({
      title: 'Nearby',
      leftBtn: {
        name: 'Filter',
        click: this.openModal.bind(this, 'filter'),
      },
      rightBtn: {
        name: 'Map',
        route: 'map',
      },
      bottomBtn: {
        name: 'Search',
        click: this.openModal,
      },
    });
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

  routeTo(route) {
    this.context.router.transitionTo(route);
  }

  renderTopBar() {
    const props = this.props;
    const path = props.path;

    switch (path) {
    case '/nearby':
    case '/nearby/':
      props.setTopBar({
        title: 'Nearby',
        leftBtn: {
          name: 'Filter',
          click: this.openModal.bind(this, 'filter'),
        },
        rightBtn: {
          name: 'Map',
          route: 'map',
        },
        bottomBtn: {
          name: 'Search',
          click: this.openModal,
        },
      });
      break;
    case '/nearby/map':
    case '/nearby/map/':
      props.setTopBar({
        title: 'Map',
        leftBtn: {
          name: 'Filter',
          click: this.openModal.bind(this, 'filter'),
        },
        rightBtn: {
          name: 'List',
          route: 'nearby',
        },
      });
      break;
    default:
    }
  }

  render() {
    return (
      <div className="NearbySection">
        <h2 className="NearbySection__h2">Sites</h2>
        <SiteList
          limit="3"
          {...this.state}
          {...this.props}
          renderTopBar={this.renderTopBar}
        />
        <h2 className="NearbySection__h2">Tours</h2>
        <TourList
          limit="3"
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

NearbySection.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

NearbySection.propTypes = {
  setTopBar: React.PropTypes.func.isRequired,
  getSites: React.PropTypes.func.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  doSearch: React.PropTypes.func.isRequired,
  doFilterSearch: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};
