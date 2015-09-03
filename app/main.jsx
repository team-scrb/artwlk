import React from 'react';
import Router from 'react-router';
import routes from './config/routes';
import MapSection from './components/googlemaps/MapSection';
import './styles/main';

Router.run(routes, (Root, state) => {
  React.render(<Root {...state} />, document.getElementById('app'));
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <MapSection />
      </div>
    );
  }
}

React.render(
  <App />,
  document.getElementById('app')
);
