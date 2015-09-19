import React from 'react';
import MapMap from './MapMap';
import Modal from 'react-modal';
import FilterSection from './FilterSection';
import SearchSection from './SearchSection';

// styles
import '../styles/components/MapSection';

const appElement = document.getElementById('app');

Modal.setAppElement(appElement);
Modal.injectCSS();

export default class MapSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      modalContent: false,
    };

    this.renderTopBar = this.renderTopBar.bind(this);
    this.siteDetailClick = this.siteDetailClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.renderTopBar();
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

  renderTopBar() {
    this.props.setTopBar({
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
  }

  render() {
    return (
      <div className="MapSection">
        <MapMap
          {...this.props}
          {...this.state}
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
MapSection.propTypes = {
  setTopBar: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};
