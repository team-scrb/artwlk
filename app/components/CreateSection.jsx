import React from 'react';
import PhotoUpload from './PhotoUpload';
import {uploadImage} from '../utils/photo';
import {addSite} from '../utils/sites';
import TopBarSection from './TopBarSection';
import parseHashtags from 'parse-hashtags';

// styles
import '../styles/components/CreateSection';

export default class CreateSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: null,
    };
    this._submit = this._submit.bind(this);
    this._setImageData = this._setImageData.bind(this);
    this.selectLocationHandler = this.selectLocationHandler.bind(this);
  }

  _setImageData(imageData, userLocation) {
    this.setState({imageData, userLocation});
  }

  _submit(event) {
    event.preventDefault();
    if (!this.state.imageData) throw new Error('imageData is null');
    uploadImage(this.state.imageData)
    .then(imageUrl => {
      const {latitude, longitude} = this.props.childMapPosition || this.state.userLocation.coords;
      const siteInfo = {
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
      return addSite(siteInfo).then(() => {
        this.context.router.transitionTo('map');
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
        <TopBarSection
          title="Create"
        />
        <h2>Create Site Here</h2>
        <form onSubmit={this._submit}>
          <PhotoUpload setImageData={this._setImageData}/>
          <h1 className="CreateSection__selectLocationBtn" onClick={this.selectLocationHandler}>{this.props.createFormLocation ? 'Update Location' : 'Select Location'}</h1>
          <label>Name
            <input type="text" data-name="name" ref="name" onChange={this.props.handleChange} value={this.props.createForm.name} />
          </label>
          <label>Artist
            <input type="text" data-name="artist" ref="artist" onChange={this.props.handleChange} value={this.props.createForm.artist} />
          </label>
          <label>Category</label>
          <input type="checkbox" data-name="category" onChange={this.props.handleChange} value={this.props.createForm.streetArt} ref="streetArt"/>Street Art
          <input type="checkbox" data-name="category" onChange={this.props.handleChange} value={this.props.createForm.architecture} ref="architecture"/>Architecture
          <input type="checkbox" data-name="category" onChange={this.props.handleChange} value={this.props.createForm.sculpture} ref="sculpture"/>Sculpture
          <input type="checkbox" data-name="category" onChange={this.props.handleChange} value={this.props.createForm.mural} ref="mural"/>Mural
          <label>Hash Tags
            <input type="text" data-name="tags" ref="tags" onChange={this.props.handleChange} value={this.props.createForm.tags} />
          </label>
          <label>Description
            <input type="text" data-name="description" ref="description" onChange={this.props.handleChange} value={this.props.createForm.description} />
          </label>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

CreateSection.propTypes = {
  location: React.PropTypes.object,
  childMapPosition: React.PropTypes.object,
  handleChange: React.PropTypes.func,
  createForm: React.PropTypes.object,
  createFormLocation: React.PropTypes.object,
};

CreateSection.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
