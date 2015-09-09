import React from 'react';
import PhotoUpload from './PhotoUpload';
import {uploadImage} from '../utils/photo';
import {addSite} from '../utils/sites';
import {willTransitionTo} from '../utils/auth';

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
  }
  _setImageData(imageData, userLocation) {
    this.setState({imageData, userLocation});
  }
  _submit(event) {
    event.preventDefault();
    if (!this.state.imageData) throw new Error('imageData is null');
    uploadImage(this.state.imageData)
    .then(imageUrl => {
      const {latitude, longitude} = this.state.userLocation.coords;
      const siteInfo = {
        coords: {latitude, longitude},
        name: this.refs.name.getDOMNode().value,
        artist: this.refs.artist.getDOMNode().value,
        streetArt: this.refs.streetArt.getDOMNode().value,
        architecture: this.refs.architecture.getDOMNode().value,
        tags: this.refs.tags.getDOMNode().value.split(' '),
        description: this.refs.description.getDOMNode().value,
        imageUrl,
      };
      return addSite(siteInfo).then(() => {
        this.context.router.transitionTo('map');
      });
    })
    .catch(error => console.error(error)); // eslint-disable-line no-console
  }

  render() {
    return (
      <div className="CreateSection">
        <h2>Create Site Here</h2>
        <form onSubmit={this._submit}>
          <PhotoUpload setImageData={this._setImageData}/>
          <button className="CreateSection__selectLocationBtn">Select Location</button>
          <label>Name
            <input type="text" name="name" ref="name" />
          </label>
          <label>Artist
            <input type="text" name="artist" ref="artist"/>
          </label>
          <label>Category</label>
          <input type="checkbox" name="category" value="Street Art" ref="streetArt"/>Street Art
          <input type="checkbox" name="category" value="Architecture" ref="architecture"/>Architecture
          <label>Tags
            <input type="text" name="tags" ref="tags"/>
          </label>
          <label>Description
            <input type="text" name="description" ref="description"/>
          </label>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

CreateSection.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

CreateSection.willTransitionTo = willTransitionTo;
