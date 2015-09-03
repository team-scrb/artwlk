import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {getCurrentPosition} from '../utils/geo';

export default class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: {},
    }
  }

  componentWillLoad() {
    let userLocation = getCurrentUserLocation({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
    console.log(userLocation)
    this.setState({userLocation: userLocation});
  }

  onDrop(file) {
    const reader = new FileReader();
    // Reader.onload is asynchronous
    // ReadAsDataURL runs first and calls .onload when it's done
    reader.onload = (encodedImage) => {
      axios({
        method: 'post',
        url: 'https://api.imgur.com/3/image',
        headers: {
          Authorization: 'Client-ID 6b87d72f0811d55',
        },
        data: {
          image: encodedImage.target.result.split(',')[1],
          type: 'base64',
        },
      })
      .then((response) => {
        // This is the link to the photo
        window.location.replace(response.data.data.link);
      })
      .catch((err) => {
        console.error(err);
      });
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
