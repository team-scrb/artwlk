import React from 'react';
import Dropzone from 'react-dropzone';
// import axios from 'axios';
import {getLocation} from '../utils/geo';
// import {addSite} from '../utils/sites';

export default class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userLocation: {},
      progress: 0,
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    // getLocation()
    // .then((location) => {
    //   this.setState({
    //     userLocation: location,
    //   });
    // })
    // .catch((err) => {
    //   console.error(err);
    // });
  }

  onDrop(file) {
    const reader = new FileReader();

    reader.onload = (encodedImage) => {
      const imageData = encodedImage.target.result.split(',')[1];
      getLocation().then(userLocation => this.props._setImageData(imageData, userLocation));
      // axios({
      //   method: 'post',
      //   url: 'https://api.imgur.com/3/image',
      //   headers: {
      //     Authorization: 'Client-ID 6b87d72f0811d55',
      //   },
      //   data: {
      //     image: encodedImage.target.result.split(',')[1],
      //     type: 'base64',
      //   },
      // })
      // .then((response) => {
      //   const {latitude, longitude} = this.state.userLocation.coords;
      //   const siteInfo = {
      //     coords: {latitude, longitude},
      //     imageUrl: response.data.data.link,
      //   };
      //   addSite(siteInfo).then((key) => {
      //     this.setState({
      //       progress: 0,
      //     });
      //     alert(siteInfo.imageUrl);
      //   });
      // })
      // .catch((err) => {
      //   console.error(err);
      // });
    };

    // Progress bar logic
    reader.onprogress = (data) => {
      if (data.lengthComputable) {
        const progress = parseInt( ((data.loaded / data.total) * 100), 10 );
        this.setState({
          progress: progress,
        });
      }
    };

    reader.readAsDataURL(file[0]);
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
          <progress value={this.state.progress} max={100}>{this.state.progress}</progress>
        </Dropzone>
      </div>
    );
  }
}
PhotoUpload.propTypes = {
  _setImageData: React.PropTypes.func.isRequired,
};
