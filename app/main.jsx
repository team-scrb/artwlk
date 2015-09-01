import React from 'react';
import HelloSection from './components/HelloSection';

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
