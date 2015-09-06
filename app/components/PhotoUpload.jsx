import React from 'react';
import Dropzone from 'react-dropzone';
import {getLocation} from '../utils/geo';

export default class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userLocation: {},
      progress: 0,
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(file) {
    const reader = new FileReader();

    reader.onload = (encodedImage) => {
      const imageData = encodedImage.target.result.split(',')[1];
      getLocation().then(userLocation => this.props.setImageData(imageData, userLocation));
    };

    reader.readAsDataURL(file[0]);
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    );
  }
}

PhotoUpload.propTypes = {
  setImageData: React.PropTypes.func.isRequired,
};
