// React components and hooks
import React, { useState, useEffect } from "react";
import "./App.css";

// Database helper object
import useDatabase from "../helpers/useDatabase";

//Api calls
import { Map, GoogleApiWrapper } from "google-maps-react";

const App = props => {
  const [state, setState] = useState("");
  const { getAllCourts } = useDatabase(); //Object destructure to use getAllcourts function

  defaultProps = () => {

    //Get current location
    navigator.geolocation.getCurrentPosition(res => {
      const latitude = res.coords.latitude;
      const longitude = res.coords.longitude;
    }, err => {
      console.log(`Error:${err}`);
    });

    return {
      center: {lat: latitude, lng: longitude}, 
      zoom: 12
    }
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

      setState(res.data);
    });
  }, []); //Empty arr tells it to only run once after App rendered

  return (
    <div className="App">
      <div className="App-header">
        <img src={"images/Next-Run_logo.png"} className="App-logo" alt="logo" />
      </div>

      <Map

      />
    </div>
  );
};

export default App;
