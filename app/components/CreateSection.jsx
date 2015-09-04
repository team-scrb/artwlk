import React from 'react';
import PhotoUpload from './PhotoUpload';

// styles
import '../styles/components/CreateSection';

export default class CreateSection extends React.Component {
  render() {
    return (
      <div className="CreateSection">
        <h2>Create Site Here</h2>
        <form>
          <PhotoUpload />
          <button className="CreateSection__selectLocationBtn">Select Location</button>
          <label>Name
            <input type="text" name="name" />
          </label>
          <label>Artist
            <input type="text" name="artist" />
          </label>
          <label>Category</label>
          <input type="checkbox" name="category" value="Street Art" />Street Art
          <input type="checkbox" name="category" value="Architecture" />Architecture
          <label>Tags
            <input type="text" name="tags" />
          </label>
          <label>Description
            <input type="text" name="description" />
          </label>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
