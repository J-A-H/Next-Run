// React components and hooks
import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import CourtListContainer from "./CourtListContainer";
import RecipeReviewCard from "./CourtDetailShow";
import MapComponent from "./MapComponent";
import Chatbox from "./Chat/Chatbox";
import { usePosition } from "../helpers/usePosition";

// Database helper object
import useDatabase from "../helpers/useDatabase";
import helpers from "../helpers/helpers";
import axios from "axios";
import { withScriptjs } from "react-google-maps";

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
  //*Helpers
  const {
    getAllCourts,
    getAllVisits,
    getDailyPeakTimes,
    getWeeklyPeakTimes
  } = useDatabase(); //Object destructure to use getAllcourts function
  const { toKebabCase, randomId } = helpers();
  const { lat, lng, error } = usePosition();
  const broadcastLocationChannel = pusherObject.subscribe("broadcast-location");

  //*States
  const [geolocation, setGeolocation] = useState({});
  const [allCourts, setAllCourts] = useState([]);
  const [playersCount, setPlayersCount] = useState({});
  const [currentLocation, setCurrentLocation] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const [state, setState] = useState({ isTrue: false });
  const [userId, setUserId] = useState(randomId());

  const addMessageToAllMessages = (message) => {
    console.log(`Adding to allMessages: ${message}`)
    setAllMessages((prevState => ([...prevState, message])));
  }

  /**
   * Updates player count of court
   * @param {*} courtName
   */
  const updatePlayerCount = courtName => {
    const newPlayersCountObject = playersCount;

    newPlayersCountObject[courtName] += 1;

    console.log(newPlayersCountObject);
    setPlayersCount(newPlayersCountObject);
  };

  /**
   *
   * @param {*} courtName
   */
  const clearPlayerCount = courtName => {
    if (currentLocation === courtName || currentLocation === "") {
      const newPlayersCountObject = playersCount;

      if (newPlayersCountObject[courtName] > 0) {
        // newPlayersCountObject[courtName] -= 1;
      }

      setPlayersCount(newPlayersCountObject);
      // setCurrentLocation("Empty");

      console.log(`clear: ${courtName}`);
    }
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
    };

    if (lat) {
      setGeolocation({ lat, lng });

      sendToServer(lat, lng);
    }
  }, [lat, lng]);

  //*Fetch court data
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

  //*Checks if user in a court
  useEffect(() => {
    const google = window.google;
    /**
     * Return true if current position is within the court region at court
     * @param {*} court
     * @param {*} radius
     * @param {*} currentPosition
     */
    const withinCourt = (court, radius, currentPosition) => {
      const start = new google.maps.LatLng(court.lat, court.lng);
      const end = new google.maps.LatLng(
        currentPosition.lat,
        currentPosition.lng
      );
      const distance = google.maps.geometry.spherical.computeDistanceBetween;
      return distance(start, end) <= radius;
    };

    const withinAnyCourt = () => {
      let result = "Empty";
      if (allCourts.length > 0) {
        allCourts.forEach(court => {
          if (withinCourt(court, 400, geolocation)) {
            result = court.name;
          }
        });
      }
      return result;
    };

    const sendToServer = async courtName => {
      //Send client location to server
      const send = await axios.post("/updatePlayerCounts/leaveCourt", {
        courtName: courtName,
        channel: "broadcast-location"
      });

      console.log(send.data);
    };

    if (withinAnyCourt() === "Empty") {
      if (currentLocation !== "Empty" && Object.keys(playersCount).length > 0) {
        sendToServer(currentLocation);
      }
    }
    setCurrentLocation(withinAnyCourt());
  }, [geolocation, allCourts, playersCount]);

  //* Checks if user has left a court
  useEffect(() => {
    const handleDecrementCourt = data => {
      console.log(`Court to decrement: ${data.courtToDecrement}`);

      const decrementPlayersCountObject = playersCount;
      if (decrementPlayersCountObject[data.courtToDecrement] > 0) {
        decrementPlayersCountObject[data.courtToDecrement] -= 1;
      }

      console.log(decrementPlayersCountObject);
      setPlayersCount(decrementPlayersCountObject);
    };

    if (allCourts.length > 0 && Object.keys(playersCount).length > 0) {
      console.log("Initializing decrement broadcast");

      console.log(allCourts, playersCount);

      broadcastLocationChannel.bind("decrement-court", handleDecrementCourt);
      return () => {
        broadcastLocationChannel.unbind(
          "decrement-court",
          handleDecrementCourt
        );
      };
    }
  }, [allCourts, playersCount]);



  return (
    <Fragment>
      <div className="App-header">
        <img src={"images/Next-Run_logo.png"} className="App-logo" alt="logo" />  
        <img src={"images/Next-Run_name_logo.png"} className="App-name"/>
      </div>

      <div style={{ position: "absolute", zIndex: 10 }}>
        <CourtListContainer
          courts={allCourts}
          getAllVisits={getAllVisits}
          getDailyPeakTimes={getDailyPeakTimes}
          getWeeklyPeakTimes={getWeeklyPeakTimes}

        />
      </div>

      <div style={{ zIndex: 1 }}>
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
      </div>

      <div>
        <Chatbox
          court={allCourts[0]}
          geolocation={geolocation}
          toKebabCase={toKebabCase}
          userId={userId}
          allMessages={allMessages}
          addMessageToAllMessages={addMessageToAllMessages}
        />
      </div>
    </Fragment>
  );
};

export default withScriptjs(App);
