import React, {useState, useEffect } from "react";
import "./App.css";

import useDatabase from '../helpers/useDatabase'

const App = props => {

  const [state, setState] = useState('');
  const {getAllCourts} = useDatabase(); //Object destructure to use getAllcourts function
  
  /**
   * Runs everytime App component is rendered.
   */
  useEffect(() => {

    //Makes get request to route in server to query for all courts from our database.
    getAllCourts().then((res, err)=> {
      if(err){
        console.log(err)
      }
      
      setState(res.data);
    });

  }, []); //Empty arr tells it to only run once after App rendered

  return (
    <div className="App">
      <div className="App-header">
        <img src={"images/Next-Run_logo.png"} className="App-logo" alt="logo" />
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
