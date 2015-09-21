// import {geo, ref} from '../config';
import {addSite} from '../app/utils/sites';

const addMockArts = () => {
  // Raw mock art
  const mockArts = [
    {imageUrl: 'http://i.imgur.com/tDO1tmL.jpg', name: 'Cradle', artist: 'ball nogues', category: {streetArt: true}, location: [34.0147601, -118.4934095]},
    {imageUrl: 'http://i.imgur.com/eeqFb1G.png', name: 'The Dinosaurs of Santa Monica', artist: 'Claude and Francois LaLanne', category: {sculpture: true}, location: [34.0145017, -118.4946411]},
    {imageUrl: 'http://imgur.com/1KQU6C6.png', name: 'Wheels', artist: 'Anne Marie Karlsen', category: {mural: true}, location: [34.0124757, -118.4941735]},
    {imageUrl: 'http://imgur.com/6Z5E7KN.jpg', name: 'Endangered Species', artist: 'Citywide Murals Project and Jaya', category: {mural: true}, location: [33.9914636, -118.4778739]},
    {imageUrl: 'http://i.imgur.com/6yMOGwS.jpg', name: 'Jay Adams Rest in Paradise', artist: 'DVate x Branded Arts', category: {mural: true, streetArt: true}, location: [34.007243, -118.488496]},
    {imageUrl: 'http://i.imgur.com/vyT5OMw.jpg', name: 'Butterfly', artist: 'Nick Walker x Branded Arts', category: {streetArt: true}, location: [34.021382, -118.493654]},
    {imageUrl: 'http://i.imgur.com/wu9l043.jpg', name: 'Eve', artist: 'Tristan Eaton x Branded Arts', category: {mural: true, streetArt: true}, location: [34.010415, -118.480711]},
    {imageUrl: 'http://i.imgur.com/BhLPZOm.jpg', name: 'Another Magical Sunset at Santa Monica', artist: 'Gilbert Lujan', category: {mural: true}, location: [34.017050, -118.496387]},
    {imageUrl: 'http://i.imgur.com/0CPoONA.jpg', name: 'Venice Beach', artist: 'Rip Cronk', category: {mural: true, streetArt: true}, location: [33.989269, -118.475524]},
    {imageUrl: 'http://i.imgur.com/nJYx72N.jpg', name: 'Crossroads', artist: 'Frank Romero', category: {mural: true}, location: [34.024599, -118.473778]},
    {imageUrl: 'http://i.imgur.com/NL0y1Eb.jpg', name: 'Our Pico Neighborhood', artist: 'East Los Streetscapers', category: {mural: true, streetArt: true}, location: [34.020616, -118.468110]},
    {imageUrl: 'http://i.imgur.com/N5aUz79.jpg', name: 'Fall of Icarus', artist: 'John Wehrle', category: {mural: true}, location: [33.987862, -118.473428]},
    {imageUrl: 'http://i.imgur.com/llKdRCh.jpg', name: 'Art Meets Crime', artist: 'MarioeOne', category: {streetArt: true}, location: [33.987602, -118.472184]},
    {imageUrl: 'http://i.imgur.com/yKo3ejm.jpg', name: 'Guardian 2', artist: 'Bumblebee & Zio Ziegler x Branded Arts', category: {streetArt: true}, location: [33.990671, -118.465360]},
    {imageUrl: 'http://i.imgur.com/OQ7nPfq.jpg', name: 'Roosterfish', artist: 'Alexis Diaz, Do Art Foundation', category: {streetArt: true}, location: [33.990980, -118.468032]},
    {imageUrl: 'http://i.imgur.com/AouT6lA.jpg', name: 'Untitled', artist: 'Pixel Pancho x Branded Arts', category: {streetArt: true}, location: [33.994892, -118.455180]},
    {imageUrl: 'http://i.imgur.com/7ZywUes.jpg', name: 'Lord Ganesha', artist: 'Cryptik x Branded Arts', category: {mural: true, streetArt: true}, location: [33.994892, -118.455180]},
    {imageUrl: 'http://i.imgur.com/JZkdK0y.jpg', name: 'Madiba', artist: 'David Flores x Branded Arts', category: {mural: true, streetArt: true}, location: [33.993032, -118.450596]},
    {imageUrl: 'http://i.imgur.com/boPfPfg.jpg', name: 'Rear View', artist: 'D*Face x Branded Arts', category: {mural: true, streetArt: true}, location: [34.032996, -118.443642]},
    {imageUrl: 'http://i.imgur.com/GzQ6g97.jpg', name: 'Isle of California', artist: 'Los Angeles Fine Arts Squad', category: {mural: true}, location: [34.045288, -118.451485]},
    {imageUrl: 'http://i.imgur.com/GzQ6g97.jpg', name: 'Plastic Jesus Show', artist: 'Judith Baca', category: {mural: true}, location: [34.045288, -118.451485]},
    {imageUrl: 'http://i.imgur.com/dfiDgW9.jpg', name: 'Bradbury Building - Charlie Chaplin Sculpture', artist: '', category: {sculpture: true}, location: [34.050536, -118.247861]},
    {imageUrl: 'http://i.imgur.com/KjiSYn4.jpg', name: '', artist: '', category: {streetArt: true}, location: [34.034904, -118.231242]},
    {imageUrl: 'http://i.imgur.com/JKr0dAX.jpg', name: '', artist: '', category: {streetArt: true}, location: [34.035175, -118.231272]},
    {imageUrl: 'http://i.imgur.com/YJ9fw9u.jpg', name: '', artist: '', category: {streetArt: true}, location: [34.034594, -118.231357]},
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
