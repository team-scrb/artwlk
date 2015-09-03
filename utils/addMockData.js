// import {geo, ref} from '../config';
import {addSite} from '../app/utils/sites';

const addMockArts = () => {
  // Raw mock art
  const mockArts = [
    {url: 'http://i.imgur.com/tDO1tmL.jpg', title: 'Cradle', location: [34.0147601, -118.4934095]},
    {url: 'http://i.imgur.com/eeqFb1G.png', title: 'The Dinosaurs of Santa Monica', location: [34.0145017, -118.4946411]},
    {url: 'http://imgur.com/1KQU6C6.png', title: 'Wheels', location: [34.0124757, -118.4941735]},
    {url: 'http://imgur.com/6Z5E7KN.jpg', title: 'Endangered Species', location: [33.9914636, -118.4778739]},
  ];

  // Schema MVP: Raw

  // Schema Idea 2
  // arts: {
  //   description: {rating, tags, text, timestamp}
  //   images: {rating, url, tags, timestamp}
  //   rating: {ups, downs}
  //   tags: {rating, text}
  //   title: {rating, text}
  // }
  const addSingleMockArt = art => {
    // const {location, title, url} = art;
    const {location} = art;
    const coords = {latitude: location[0], longitude: location[1]};
    art.coords = coords;
    delete art.location;
    return addSite(art, coords);
  };
  // const addArtIndexes = () => {};
  const promises = mockArts.map(art => addSingleMockArt(art));
  return promises;
};
Promise.all(addMockArts())
  .then(process.exit)
  .catch(error => {
    console.log(error);  // eslint-disable-line no-console
    process.exit();
  });
