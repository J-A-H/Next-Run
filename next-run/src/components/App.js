import React, { Component } from 'react';
import './App.css';

// Import semantic UI CSS
import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={"images/logo.svg"} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>

          {/* Added semantic UI button to test */}
          <button class="ui button">Click Here</button>

        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
