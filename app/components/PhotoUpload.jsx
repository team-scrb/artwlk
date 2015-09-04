import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {getLocation} from '../utils/geo';
import {addSite} from '../utils/sites';

export default class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: {},
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    getLocation()
    .then((location) => {
      this.setState({
        userLocation: location,
      });
    })
    .catch((err) => {
      console.error(err);
    });
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
        const siteInfo = {
          coords: this.state.userLocation.coords,
          imageUrl: response.data.data.link,
        };
        console.log(siteInfo)
        addSite(siteInfo).then((key) => {
          console.log(key);
        });
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
