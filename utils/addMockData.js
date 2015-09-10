// import {geo, ref} from '../config';
import {addSite} from '../app/utils/sites';

const addMockArts = () => {
  // Raw mock art
  const mockArts = [
    {imageUrl: 'http://i.imgur.com/tDO1tmL.jpg', name: 'Cradle', artist: 'ball nogues', category: {streetArt: true}, location: [34.0147601, -118.4934095]},
    {imageUrl: 'http://i.imgur.com/eeqFb1G.png', name: 'The Dinosaurs of Santa Monica', artist: 'Claude and Francois LaLanne', category: {sculpture: true}, location: [34.0145017, -118.4946411]},
    {imageUrl: 'http://imgur.com/1KQU6C6.png', name: 'Wheels', artist: 'Anne Marie Karlsen', category: {mural: true}, location: [34.0124757, -118.4941735]},
    {imageUrl: 'http://imgur.com/6Z5E7KN.jpg', name: 'Endangered Species', artist: 'Citywide Murals Project and Jaya', category: {mural: true}, location: [33.9914636, -118.4778739]},
  ];

  /*
  const siteInfo = {
    coords: {latitude, longitude},
    name: this.refs.name.getDOMNode().value,
    artist: this.refs.artist.getDOMNode().value,
    category: {
      streetArt: this.refs.streetArt.getDOMNode().checked,
      architecture: this.refs.architecture.getDOMNode().checked,
    },
    tags: this.refs.tags.getDOMNode().value.split(' '),
    description: this.refs.description.getDOMNode().value,
    imageUrl,
  };
*/
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
