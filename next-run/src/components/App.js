// React components and hooks
import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import CourtListContainer from "./CourtListContainer";
import MapComponent from "./MapComponent";
import {usePosition} from "../helpers/usePosition";

// Database helper object
import useDatabase from "../helpers/useDatabase";
import helpers from "../helpers/helpers";
import axios from "axios";

//API keys______________
const API_KEY = process.env.REACT_APP_GMAPS_API_KEY;
const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry`;

//PUSHER________________
const Pusher = require("pusher-js");

const pusherObject = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  disableStats: true
});

const App = (props) => {
  //States
  const [geolocation, setGeolocation] = useState({});
  const [allCourts, setAllCourts] = useState([]);
  const [playersCount, setPlayersCount] = useState({});

  //Helpers
  const { getAllCourts } = useDatabase(); //Object destructure to use getAllcourts function
  const { toKebabCase } = helpers();
  const {lat, lng, error} = usePosition();

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
  };

  const clearPlayerCount = courtName => {
    const newPlayersCountObject = playersCount;

    newPlayersCountObject[courtName] = newPlayersCountObject[courtName] = 0;

    // console.log(newPlayersCountObject);

    setPlayersCount(newPlayersCountObject);
  };

  useEffect(() => {
    setGeolocation({lat, lng});
  }, [lat, lng]);

  /**
   * Initialize courts side effect
   */
  useEffect(() => {
    const initializeAllcourts = async () => {
      const allCourts = await getAllCourts();
      setAllCourts(allCourts.data);

      const playersCountObject = {};

      allCourts.data.forEach(court => {
        const courtName = court.name;
        //TODO: Set to get data from pusher for exisitng counts?
        playersCountObject[courtName] = 0;

        // Pusher.logToConsole = true;
        const channelName = toKebabCase(court.name);
        let channel = pusherObject.subscribe(`${channelName}`);

        //Listens for court updates
        channel.bind("player-count", data => {
          // console.log(`You are at court ${data.name}`);
          const courtName = data.name;

          console.log(courtName);
          // updatePlayerCount(courtName);
        });
      });

      setPlayersCount(playersCountObject);
    };
    initializeAllcourts();
    // initializeChannels();
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
        setGeolocation={setGeolocation}
      />
      <CourtListContainer courts={allCourts} />
    </Fragment>
  );
};

export default App;
