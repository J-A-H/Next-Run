import React, {useState, useEffect } from "react";
import "./App.css";

import axios from 'axios';

const App = props => {

  const [state, setState] = useState('');

  useEffect(() => {

    //Makes get request to route in server to query for all courts from our database.
    axios.get('/api/get/allcourts').then((res, err)=> {
      if(err){
        console.log(err)
      }
      
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
