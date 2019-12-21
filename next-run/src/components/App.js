import React, {useState, useEffect } from "react";
import "./App.css";

import axios from 'axios';

// Import semantic UI CSS
import "semantic-ui-css/semantic.min.css";

const App = props => {

  const [state, setState] = useState('');

  useEffect(() => {
    axios.get('/api/get/allcourts').then((res, err)=> {
      if(err){
        console.log(err)
      }

      console.log(res.data);
      setState(res.data);
    })
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <img src={"images/logo.svg"} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
        {/* Added semantic UI button to test */}
        <button className="ui button">Click Here</button>
      </div>
      <p className="App-intro">
        Court Name: {state.name}
      </p>
    </div>
  );
  }

export default App;
