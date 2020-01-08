// React components and hooks
import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import CourtListContainer from "./CourtListContainer";
import RecipeReviewCard from './CourtDetailShow'
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
  const [state, setState] = useState({isTrue: false});

  //*Helpers
  const {
    getAllCourts,
    getAllVisits,
    getDailyPeakTimes,
    getWeeklyPeakTimes
  } = useDatabase(); //Object destructure to use getAllcourts function
  const { toKebabCase } = helpers();
  const { lat, lng, error } = usePosition();

  /**
   * Updates player count of court
   * @param {*} courtName
   */
  const updatePlayerCount = courtName => {
    const newPlayersCountObject = playersCount;

    newPlayersCountObject[courtName] = newPlayersCountObject[courtName] += 1;

    setPlayersCount(newPlayersCountObject);
  };

  //*Fetch curent location
  useEffect(() => {
    setGeolocation({ lat, lng });
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
      console.log(weeklyPeakTimes);

      // });
    };

    a();
  }, [allCourts, geolocation]);

  // Functions for rendering CourtCard
  const onClickDisplay = () => {
    if (state.isTrue == true) {
      setState(prevState => ({
        ...prevState,
        isTrue: false
      }));
    }
    else if (state.isTrue == false) {
      setState(prevState => ({
        ...prevState,
        isTrue: true
      }));
    }
  }

  return (
    <Fragment>
      <div className="App-header">
        <img src={"images/Next-Run_logo.png"} className="App-logo" alt="logo" />
      </div>

      <div style={{ position: 'absolute', zIndex: 10 }}>
        <CourtListContainer
          courts={allCourts}
          onClickDisplay={onClickDisplay}
        />
      </div>

      {state.isTrue && (
        <div style={{ position: 'absolute', margin: 'auto', right: 0, left: 0, width: 600, height: 100, zIndex: 15 }}>
          <RecipeReviewCard />
        </div>
      )}

      <div style={{ zIndex: '1' }}>
        <MapComponent
          googleMapURL={MAP_URL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          allCourts={allCourts}
          toKebabCase={toKebabCase}
          geolocation={geolocation}
        />
      </div>

    </Fragment>
  );
};

export default App;
