import React from 'react';
import Dropzone from 'react-dropzone';
import {getLocation} from '../utils/geo';

// styles
import '../styles/components/PhotoUpload';

export default class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: {},
      file: [],
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(file) {
    const reader = new FileReader();

    this.setState({
      file: file[0].preview,
    });

    reader.onload = (encodedImage) => {
      const imageData = encodedImage.target.result.split(',')[1];
      getLocation().then(userLocation => this.props.setImageData(imageData, userLocation));
    };

    reader.readAsDataURL(file[0]);
  }

  render() {
    return (
      <div className="PhotoUpload">
        <Dropzone ref="dropzone" onDrop={this.onDrop} >
        {
          this.state.file[0] ? <div><img src={this.state.file} /></div> :
          <div>Try dropping some files here, or click to select files to upload.</div>
        }
        </Dropzone>
      </div>
    );
  }
}

PhotoUpload.propTypes = {
  setImageData: React.PropTypes.func.isRequired,
};
