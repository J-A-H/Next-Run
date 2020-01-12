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
  const [currentLocation, setCurrentLocation] = useState("Empty");
  const [allMessages, setAllMessages] = useState([]);
  const [state, setState] = useState({ isTrue: false });
  const [userId, setUserId] = useState(randomId());

  /**
   * Adds message to allMessages
   * @param {*} message
   */
  const addMessageToAllMessages = message => {
    setAllMessages(prevState => [...prevState, message]);
  };

  /**
   * Clears all messages state after chat portal close
   */
  const clearAllMessages = () => {
    setAllMessages([]);
  };

  /**
   * Sends increment broadcast to pusher
   * @param {*} courtName
   */
  const sendIncrementToServer = async courtName => {
    //Send client location to server
    const send = await axios.post("/updatePlayerCounts", {
      courtName: courtName,
      channel: "broadcast-location"
    });

    // console.log(send.data);

    setCurrentLocation(courtName);
  };

  /**
   * Sends decrement braodcast to pusher
   * @param {*} courtName
   */
  const sendDecrementToServer = async courtName => {
    //Send client location to server
    const send = await axios.post("/updatePlayerCounts/leaveCourt", {
      courtName: courtName,
      channel: "broadcast-location"
    });

    // console.log(send.data);
  };

  /**
   * Increment player count for court
   * @param {*} data
   */
  const handleIncrementCourt = data => {
    console.log(`Court to incrmenet: ${data.courtToIncrement}`);
    const incrementPlayersObject = playersCount;
    incrementPlayersObject[data.courtToIncrement] += 1;

    // console.log(incrementPlayersObject);
    setPlayersCount(incrementPlayersObject);

    console.log(playersCount);
  };

  /**
   * Decrement player count for court
   * @param {} data
   */
  const handleDecrementCourt = data => {
    console.log(`Court to decrement: ${data.courtToDecrement}`);

    const decrementPlayersCountObject = playersCount;
    if (decrementPlayersCountObject[data.courtToDecrement] > 0) {
      decrementPlayersCountObject[data.courtToDecrement] -= 1;
    }

    // console.log(decrementPlayersCountObject);
    setPlayersCount(decrementPlayersCountObject);

    console.log(playersCount);
  };

  //*Fetch curent location
  useEffect(() => {
    if (lat) {
      setGeolocation({ lat, lng });
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

    if (allCourts.length > 0) {
      console.log("Prev location: ", currentLocation);
      console.log("Within court: ", withinAnyCourt());

      //If not in a court
      if (withinAnyCourt() === "Empty") {
        setCurrentLocation("Empty");
        if (
          currentLocation !== "Empty" &&
          Object.keys(playersCount).length > 0
        ) {
          //Broadcast leaving event
          sendDecrementToServer(currentLocation);
        }
      }

      //If in a court
      else {
        if (currentLocation === "Empty") {
          console.log(`Broadcast: Increment court ${withinAnyCourt()}`);
          sendIncrementToServer(withinAnyCourt());
        } else if (currentLocation !== withinAnyCourt()) {
          console.log(`Broadcast: Increment court ${withinAnyCourt()}`);
          console.log(`Broadcast: Decrement court ${currentLocation}`);
          sendIncrementToServer(withinAnyCourt());
          sendDecrementToServer(currentLocation);
        }
      }
    }
  }, [allCourts, geolocation]);

  //*Initialize court location listeners
  useEffect(() => {
    if (allCourts.length > 0 && Object.keys(playersCount).length > 0) {
      broadcastLocationChannel.bind("decrement-court", handleDecrementCourt);

      broadcastLocationChannel.bind("increment-court", handleIncrementCourt);

      return () => {
        broadcastLocationChannel.unbind(
          "decrement-court",
          handleDecrementCourt
        );

        broadcastLocationChannel.unbind(
          "increment-court",
          handleIncrementCourt
        );
      };
    }
  }, [allCourts, playersCount, geolocation]);

  const filterCourts = courts => {
    setAllCourts(prevState => [...prevState, courts]);
  };

  return (
    <Fragment>
      <div className="App-header">
        <img src={"images/Next-Run_logo.png"} className="App-logo" alt="logo" />
        <img src={"images/Next-Run_name_logo.png"} className="App-name" />
      </div>

      <div
        className="Court-list-container"
        style={{ position: "absolute", zIndex: 10 }}
      >
        <CourtListContainer
          courts={allCourts}
          getAllVisits={getAllVisits}
          getDailyPeakTimes={getDailyPeakTimes}
          getWeeklyPeakTimes={getWeeklyPeakTimes}
          playersCount={playersCount}
          court={allCourts[0]}
          geolocation={geolocation}
          toKebabCase={toKebabCase}
          userId={userId}
          allMessages={allMessages}
          addMessageToAllMessages={addMessageToAllMessages}
          filterCourts={filterCourts}
          clearAllMessages={clearAllMessages}
        />
      </div>

      <div style={{ zIndex: 1 }}>
        <MapComponent
          googleMapURL={MAP_URL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `90vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          allCourts={allCourts}
          toKebabCase={toKebabCase}
          geolocation={geolocation}
          broadcastLocationChannel={broadcastLocationChannel}
          currentLocation={currentLocation}
          setPlayersCount={setPlayersCount}
          playersCount={playersCount}
        />
      </div>
    </Fragment>
  );
};

export default withScriptjs(App);
