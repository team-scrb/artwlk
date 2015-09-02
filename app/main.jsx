import React from 'react';
import HelloSection from './components/HelloSection';

import './styles/main';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <HelloSection />
      </div>
    );
  }
}

React.render(
  <App />,
  document.getElementById('app')
);
