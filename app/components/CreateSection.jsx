import React from 'react';
import PhotoUpload from './PhotoUpload';
import {uploadImage} from '../utils/photo';
import {addSite} from '../utils/sites';
import {isLoggedIn} from '../utils/auth';
import parseHashtags from 'parse-hashtags';
import Modal from 'react-modal';

// styles
import '../styles/components/CreateSection';

const appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();

export default class CreateSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalContent: false,
    };
    this.submit = this.submit.bind(this);
    this.selectLocationHandler = this.selectLocationHandler.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.props.setTopBar({
      title: 'Create',
    });
  }

  openModal() {
    if (!this.props.imageData) {
      this.setState({modalContent: (
        <div className="CreateModal">
          <h3 className="CreateModal__title">Please upload a photo!</h3>
          <button className="CreateModal__button" onClick={this.closeModal}>Close</button>
        </div>
      )});
    } else if (!this.props.createFormLocation) {
      this.setState({modalContent: (
        <div>
          <h1>Please add a location!</h1>
          <button onClick={this.closeModal}>Close</button>
        </div>
      )});
    }
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  submit(event) {
    event.preventDefault();
    if (!this.props.imageData) {
      this.openModal();
      throw new Error('imageData is null');
    }
    if (!this.props.userLocation && !this.props.childMapPosition) {
      this.openModal();
      throw new Error('No location selected');
    }
    uploadImage(this.props.imageData)
    .then(imageUrl => {
      const {latitude, longitude} = this.props.childMapPosition || this.props.userLocation;

      const siteInfo = {
        authData: isLoggedIn(),
        coords: {latitude, longitude},
        name: this.refs.name.getDOMNode().value,
        artist: this.refs.artist.getDOMNode().value,
        category: {
          streetArt: this.refs.streetArt.getDOMNode().checked,
          architecture: this.refs.architecture.getDOMNode().checked,
          sculpture: this.refs.sculpture.getDOMNode().checked,
          mural: this.refs.mural.getDOMNode().checked,
        },
        tags: parseHashtags(this.refs.tags.getDOMNode().value),
        description: this.refs.description.getDOMNode().value,
        imageUrl,
      };
      return addSite(siteInfo).then(siteId => {
        this.context.router.transitionTo('sites-detail', {siteId});
        this.props.resetCreateSiteForm();
      });
    })
    .catch(error => console.error(error)); // eslint-disable-line no-console
  }

  selectLocationHandler() {
    this.context.router.transitionTo('create-locationselector');
  }

  render() {
    return (
      <div className="CreateSection">
        <h2 className="CreateSection__title">Create Site Here</h2>
        <form onSubmit={this.submit} className="CreateSection__form">
          <PhotoUpload {...this.props} />
          <button className="CreateSection__form-location" onClick={this.selectLocationHandler}>{this.props.createFormLocation ? 'Update Location' : 'Select Location'}</button>
          <span className="CreateSection__form-location-address">{this.props.address ? this.props.address : this.props.userLocation}</span>
          <div className="CreateSection__form-container">
            <label className="CreateSection__form-label">Name
              <input type="text" className="CreateSection__form-input" data-name="name" ref="name" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.name} />
            </label>
            <label className="CreateSection__form-label">Artist
              <input type="text" className="CreateSection__form-input" data-name="artist" ref="artist" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.artist} defaultValue="Unknown" />
            </label>
          </div>
          <div className="CreateSection__form-container">
            <label className="CreateSection__form-label">Category</label>
            <div className="CreateSection__form-checkbox">
              <input type="checkbox" className="CreateSection__form-checkbox-item" data-name="category" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.streetArt} ref="streetArt"/>Street Art
              <input type="checkbox" className="CreateSection__form-checkbox-item" data-name="category" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.architecture} ref="architecture"/>Architecture
            </div>
            <div className="CreateSection__form-checkbox">
              <input type="checkbox" className="CreateSection__form-checkbox-item" data-name="category" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.sculpture} ref="sculpture"/>Sculpture
              <input type="checkbox" className="CreateSection__form-checkbox-item" data-name="category" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.mural} ref="mural"/>Mural
            </div>
            <label className="CreateSection__form-label">Hash Tags
              <input type="text" className="CreateSection__form-input" data-name="tags" ref="tags" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.tags} />
            </label>
            <label className="CreateSection__form-label">Description
              <input type="text" className="CreateSection__form-input" data-name="description" ref="description" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.description} />
            </label>
          </div>
          <input type="submit" name="Submit" className="CreateSection__form-submit" />
        </form>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          className="CreateSection__Modal"
        >
          {this.state.modalContent}
        </Modal>
      </div>
    );
  }
}

CreateSection.propTypes = {
  setTopBar: React.PropTypes.func.isRequired,
  location: React.PropTypes.object,
  childMapPosition: React.PropTypes.object,
  handleCreateSiteFormInputChange: React.PropTypes.func,
  createForm: React.PropTypes.object,
  createFormLocation: React.PropTypes.object,
  convertToAddress: React.PropTypes.func,
  resetCreateSiteForm: React.PropTypes.func,
  address: React.PropTypes.string,
  imageData: React.PropTypes.string,
  userLocation: React.PropTypes.object,
};

CreateSection.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
