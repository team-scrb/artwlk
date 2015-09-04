import axios from 'axios';
export const uploadImage = imageData => {
  axios({
    method: 'post',
    url: 'https://api.imgur.com/3/image',
    headers: {
      Authorization: 'Client-ID 6b87d72f0811d55',
    },
    data: {
      image: imageData,
      type: 'base64',
    },
  })
  .then(response => new Promise(() => response.data.data.link));
  // not sure i need to create a new promise inside then
};
