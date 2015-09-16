import React from 'react';
import Dropzone from 'react-dropzone';
import {getLocation} from '../utils/geo';

// styles
import '../styles/components/PhotoUpload';

export default class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(file) {
    const reader = new FileReader();

    this.props.uploadPhotoPreview(file[0]);

    reader.onload = (encodedImage) => {
      const imageData = encodedImage.target.result.split(',')[1];
      getLocation().then(userLocation => {
        const location = userLocation.coords;
        this.props.setImageData(imageData, location);
      });
    };

    reader.readAsDataURL(file[0]);
  }

  render() {
    return (
      <div className="PhotoUpload">
        <Dropzone ref="dropzone" onDrop={this.onDrop} >
        {
          this.props.imageData ? <div><img src={this.props.photoUploadFile.preview} /></div> :
          <div>Try dropping some files here, or click to select files to upload.</div>
        }
        </Dropzone>
      </div>
    );
  }
}

PhotoUpload.propTypes = {
  setImageData: React.PropTypes.func.isRequired,
  uploadPhotoPreview: React.PropTypes.func.isRequired,
  imageData: React.PropTypes.string,
  photoUploadFile: React.PropTypes.object,
};
