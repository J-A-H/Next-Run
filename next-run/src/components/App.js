// React components and hooks
import React, { useState, useEffect } from "react";
import "./App.css";

// Database helper object
import useDatabase from "../helpers/useDatabase";

//Api calls
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";

const API_KEY = process.env.REACT_APP_GMAPS_API_KEY;
const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry`;

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
   * Generates Map component
   */
  const MapComponent = withScriptjs(withGoogleMap((props)=> {
    return  <GoogleMap
      defaultZoom={15}
      defaultCenter={state.currentLocation}
    >
    </GoogleMap>
  }));
  

  /**
   * Runs everytime App component is rendered.
   */
  useEffect(() => {

    //Get all courts from database and updates state
    getAllCourts().then((res, err) => {
      if (err) {
        console.log(err);
      }

      setState(prevState => ({
        ...prevState,
        courts: res.data
      }));
    });

    //Gets current location and saves to state
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
      <MapComponent
        googleMapURL={MAP_URL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      >
      </MapComponent>
    </div>
  );
};

export default App;
