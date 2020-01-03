// React components and hooks
import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import CourtListContainer from "./CourtListContainer";
import MapComponent from "./MapComponent";

//Ionic Capcitor layer
// import { Plugins } from "@capacitor/core";

// Database helper object
import useDatabase from "../helpers/useDatabase";
import helpers from "../helpers/helpers";

//API keys______________
const API_KEY = process.env.REACT_APP_GMAPS_API_KEY;
const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry`;

const App = (props) => {
  //_________State_________

  const [geolocation, setGeolocation] = useState({});

  const [playersCount, setPlayersCount] = useState({});

  const { allCourts } = useDatabase(); //Object destructure to use getAllcourts function

  const { toKebabCase } = helpers();

  /**
   * Gets current location
   */
  const getCurrentLocation = async () => {
    navigator.geolocation.watchPosition(
      location => {
        setGeolocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        });
      },
      err => {
        console.log(err);
      }
    );
  };

  /**
   * Updates player count of court
   * @param {*} courtName
   */
  const updatePlayerCount = courtName => {
    const newPlayersCountObject = playersCount;

    // Object.keys(newPlayersCountObject).forEach(key => {
    //   newPlayersCountObject[key] = 0;
    // });

    newPlayersCountObject[courtName] = newPlayersCountObject[courtName] = 1;

    console.log(courtName);
  };


  const clearPlayerCount = courtName => {
    const newPlayersCountObject = playersCount;

    newPlayersCountObject[courtName] = newPlayersCountObject[courtName] = 0;

    // console.log(newPlayersCountObject);

    setPlayersCount(newPlayersCountObject);
  };

  const initializePlayerCount = () => {
    const playersCountObject = {};

    if (allCourts) {
      allCourts.forEach(court => {
        const courtName = court.name;
        playersCountObject[courtName] = 0;
      });
    }

    setPlayersCount(playersCountObject);
  };

  /**
   * Runs everytime App component is rendered.
   */
  useEffect(() => {
    getCurrentLocation();
    initializePlayerCount();
    //Gets current location and sets it to state.
  }, []); //Empty arr tells it to only run once after App rendered

  return (
    <Fragment>
      <div className="App-header">
        <img src={"images/Next-Run_logo.png"} className="App-logo" alt="logo" />
      </div>
      <MapComponent
        googleMapURL={MAP_URL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        updatePlayerCount={updatePlayerCount}
        clearPlayerCount={clearPlayerCount}
        allCourts={allCourts}
        toKebabCase={toKebabCase}
        geolocation={geolocation}
      />
      <CourtListContainer courts={allCourts} />
    </Fragment>
  );
};

export default App;
