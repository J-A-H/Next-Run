// React components and hooks
import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import CourtListContainer from "./CourtListContainer";
import MapComponent from "./MapComponent";
import { usePosition } from "../helpers/usePosition";

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

const App = props => {
  //*States
  const [geolocation, setGeolocation] = useState({});
  const [allCourts, setAllCourts] = useState([]);
  const [playersCount, setPlayersCount] = useState({});
  const [currentLocation, setCurrentLocation] = useState("");

  //*Helpers
  const {
    getAllCourts,
    getAllVisits,
    getDailyPeakTimes,
    getWeeklyPeakTimes
  } = useDatabase(); //Object destructure to use getAllcourts function
  const { toKebabCase } = helpers();
  const { lat, lng, error } = usePosition();
  const broadcastLocationChannel = pusherObject.subscribe("broadcast-location");

  /**
   * Updates player count of court
   * @param {*} courtName
   */
  const updatePlayerCount = courtName => {
    if (currentLocation !== courtName) {
      const newPlayersCountObject = playersCount;

      newPlayersCountObject[courtName] += 1;

      setPlayersCount(newPlayersCountObject);
      setCurrentLocation(courtName);
    }
  };

  /**
   *
   * @param {*} courtName
   */
  const clearPlayerCount = courtName => {
    if (currentLocation === courtName) {
      console.log(`clear: ${courtName}`);

      const newPlayersCountObject = playersCount;

      if (newPlayersCountObject[courtName] > 0) {
        newPlayersCountObject[courtName] -= 1;
      }

      console.log(newPlayersCountObject);
      setPlayersCount(newPlayersCountObject);
      setCurrentLocation("");
    }
  };

  /**
   * Updates current location
   * @param {*} court
   */
  const updateCurrentLocation = court => {
    setCurrentLocation(court.name);
  };

  //*Fetch curent location
  useEffect(() => {

    const sendToServer = async (lat, lng) => {
      //Send client location to server
      const send = await axios.post("/updatePlayerCounts", {
        geolocation: { lat, lng },
        channel: "broadcast-location"
      });

      console.log(send.data);
    }

    if(lat){
      setGeolocation({ lat, lng });
      sendToServer(lat, lng);
    }
    
  }, [lat, lng]);

  //Fetch court data
  useEffect(() => {
    /**
     * Initializes all court data
     */
    const initializeAllcourts = async () => {
      const allCourts = await getAllCourts();
      setAllCourts(allCourts.data);

      const playersCountObject = {};

      allCourts.data.forEach(court => {
        const courtName = court.name;
        playersCountObject[courtName] = 0;
      });

      setPlayersCount(playersCountObject);
    };

    initializeAllcourts();
  }, []);

  //*Pusher channel logic
  useEffect(() => {
    /**
     * Initialzes pusher channels for each court
     */
    const initializeChannels = async () => {
      allCourts.forEach(court => {
        // Pusher.logToConsole = true;
        const channelName = toKebabCase(court.name);
        let channel = pusherObject.subscribe(`${channelName}`);

        //Listens for court updates
        channel.bind("player-count", data => {
          // console.log(`You are at court ${data.name}`);
          const courtName = data.name;
          updatePlayerCount(courtName);
        });
      });
    };

    initializeChannels();
  }, [playersCount]);

  //*Court peak times
  useEffect(() => {
    //example function of peak times, currently prints on screen
    //TODO: add to state?
    const a = async () => {
      // allCourts.forEach( async court => {

      // const dailyPeakTimes = await getDailyPeakTimes(court.id);
      // console.log(dailyPeakTimes, court.name);

      const weeklyPeakTimes = await getWeeklyPeakTimes(5);

      // });
    };

    // a();
  }, [allCourts, geolocation]);

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
        allCourts={allCourts}
        toKebabCase={toKebabCase}
        geolocation={geolocation}
        broadcastLocationChannel={broadcastLocationChannel}
        updatePlayerCount={updatePlayerCount}
        clearPlayerCount={clearPlayerCount}
        currentLocation={currentLocation}
        setPlayersCount={setPlayersCount}
        playersCount={playersCount}
      />
      <CourtListContainer courts={allCourts} />
    </Fragment>
  );
};

export default App;
