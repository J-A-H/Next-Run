// React components and hooks
import React, { useState, useEffect } from "react";
import "./App.css";

// Database helper object
import useDatabase from "../helpers/useDatabase";

//Api calls
import { Map, GoogleApiWrapper } from "google-maps-react";

const App = (props) => {
  const [state, setState] = useState({
      courts: [],
      currentLocation: {}
    }
  );
  const { getAllCourts } = useDatabase(); //Object destructure to use getAllcourts function

  /**
   * Sets current location and adds to state 
   */
  const setCurrentLocation =  (position) =>{

    console.log(position);

    setState(prevState => ({
      ...prevState,
      currentLocation: position
    }));
  }

  /**
   * Runs everytime App component is rendered.
   */
  useEffect(() => {
    //Makes get request to route in server to query for all courts from our database.
    getAllCourts().then((res, err) => {
      if (err) {
        console.log(err);
      }

      console.log(res.data);
      setState(prevState => ({
        ...prevState,
        courts: res.data
      }));
    });

    navigator.geolocation.getCurrentPosition(res => {
      setCurrentLocation({lat: res.coords.latitude, lng: res.coords.longitude})
    }, err => {
      console.log(`Error:${err}`);
    });

  }, []); //Empty arr tells it to only run once after App rendered

  return (
    <div className="App">
      <div className="App-header">
        <img src={"images/Next-Run_logo.png"} className="App-logo" alt="logo" />
      </div>
      
    </div>
  );
};

export default App;
