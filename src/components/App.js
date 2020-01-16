// React components and hooks
import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import CourtListContainer from "./CourtListContainer";
import MapComponent from "./MapComponent";
import { usePosition } from "../helpers/usePosition";
import Cookies from "universal-cookie";
import { Button, Icon } from "semantic-ui-react";

import { DropdownButton, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import ActivityLevelFilterList from "./ActivityLevelFilterList";

// Database helper object
import useDatabase from "../helpers/useDatabase";
import helpers from "../helpers/helpers";
import axios from "axios";
import { withScriptjs } from "react-google-maps";

//API keys______________
const API_KEY = process.env.REACT_APP_GMAPS_API_KEY;
const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry&libraries=visualization`;

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
  const cookies = new Cookies();

  //*States
  const [filteredCourts, setfilteredCourts] = useState(null);
  const [courtCopy, setCourtCopy] = useState([]);
  const [geolocation, setGeolocation] = useState({});
  const [allCourts, setAllCourts] = useState([]);
  const [playersCount, setPlayersCount] = useState({});
  const [currentLocation, setCurrentLocation] = useState("Empty");
  const [allMessages, setAllMessages] = useState([]);
  const [state, setState] = useState({ isTrue: false });
  const [userId, setUserId] = useState(randomId());
  const [clickedCourt, setClickedCourt] = useState(0);
  /**
   * Adds message to allMessages
   * @param {*} message
   */
  const addMessageToAllMessages = message => {
    setAllMessages(prevState => [...prevState, message]);
  };

  const setClicked = id => {
    setClickedCourt(id);
  };

  /**
   * Clears all messages state after chat portal close
   */
  const clearAllMessages = () => {
    setAllMessages([]);
  };

  const reCentre = () => {
    setClickedCourt(null);
    console.log("button clicked");
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
    cookies.set("prev_location", courtName);
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
    const name = data.courtToIncrement;

    // console.log(incrementPlayersObject);

    setPlayersCount(prevState => {
      let newPlayersCount = { ...playersCount };
      newPlayersCount[name] += 1;
      return newPlayersCount;
    });
    setGeolocation(geolocation);
    setAllCourts(allCourts);
    // console.log(playersCount);
  };

  /**
   * Decrement player count for court
   * @param {} data
   */
  const handleDecrementCourt = data => {
    console.log(`Court to decrement: ${data.courtToDecrement}`);

    // console.log(decrementPlayersCountObject);

    setPlayersCount(prevState => {
      const newPlayersCount = { ...prevState };
      if (newPlayersCount[data.courtToDecrement] > 0) {
        newPlayersCount[data.courtToDecrement] -= 1;
      }

      return newPlayersCount;
    });

    setGeolocation(geolocation);
    setAllCourts(allCourts);

    // console.log(playersCount);
  };

  // console.log("Players count from app: ", playersCount);

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
      setfilteredCourts(allCourts.data.map(court => court.name));
      const allCourts1 = await getAllCourts();
      setCourtCopy(allCourts1.data);
      const newPlayersCountReq = await axios.get("/initialialPlayerCounts");
      const newPlayersCount = newPlayersCountReq.data;

      // console.log("Global player counts", newPlayersCount);

      setPlayersCount(newPlayersCount);
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
        cookies.set("prev_location", "Empty");
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

          if (cookies.get("prev_location") !== withinAnyCourt()) {
            sendIncrementToServer(withinAnyCourt());
          }
        } else if (currentLocation !== withinAnyCourt()) {
          console.log(`Broadcast: Increment court ${withinAnyCourt()}`);
          console.log(`Broadcast: Decrement court ${currentLocation}`);
          sendIncrementToServer(withinAnyCourt());
          sendDecrementToServer(currentLocation);
        }
      }
    }
    setGeolocation(geolocation);
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

  // Filter logic
  const filterCourts = courts => {
    //setCourtCopy(prevState => [...prevState, courts]);
    setCourtCopy(courts);
    // setAllCourts(allCourts);
  };

  let low = Object.keys(playersCount).filter(court => playersCount[court] < 5);
  let medium = Object.keys(playersCount).filter(
    court => playersCount[court] > 5 && playersCount[court] < 10
  );
  let high = Object.keys(playersCount).filter(
    court => playersCount[court] > 10
  );

  function showHigh() {
    setfilteredCourts(high);
    document.getElementById("clearFilter").style.display = "block";
    // props.courts = Object.keys(props.courts).filter(court =>
    //   filteredCourts.includes(court)
    // );
    filterCourts(allCourts.filter(court => high.includes(court.name)));
  }

  function showMedium() {
    setfilteredCourts(medium);
    document.getElementById("clearFilter").style.display = "block";
    // props.courts = Object.keys(props.courts).filter(court =>
    //   filteredCourts.includes(court)
    // );
    filterCourts(allCourts.filter(court => medium.includes(court.name)));
  }

  function showLow() {
    setfilteredCourts(low);
    document.getElementById("clearFilter").style.display = "block";
    console.log("low", low);

    // console.log('courts', allCourts, filteredCourts, allCourts.filter(court => filteredCourts.includes(court.name)));
    filterCourts(allCourts.filter(court => low.includes(court.name)));
  }

  function clearFilter() {
    filterCourts(allCourts);
    document.getElementById("clearFilter").style.display = "none";
  }

  function setClickedFalse() {
    setClickedCourt(null);
  }

  return (
    <Fragment>
      <div className="App-header">
        <img src={"images/Next-Run_logo.png"} className="App-logo" alt="logo" />
        <img src={"images/Next-Run_name_logo.png"} className="App-name" />
      </div>

      <div className="filter">
        <DropdownButton id="dropdown-basic-button" title="Activity Level">
          <Dropdown.Item onClick={showHigh}>High</Dropdown.Item>
          <Dropdown.Item onClick={showMedium}>Medium</Dropdown.Item>
          <Dropdown.Item onClick={showLow}>Low</Dropdown.Item>
          <Dropdown.Item
            onClick={clearFilter}
            id="clearFilter"
            className="Clear-filter"
          >
            <Button inverted color="red">
              Clear Filter
            </Button>
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="Court-list-container">
        <CourtListContainer
          courts={courtCopy}
          getAllVisits={getAllVisits}
          getDailyPeakTimes={getDailyPeakTimes}
          getWeeklyPeakTimes={getWeeklyPeakTimes}
          playersCount={playersCount}
          court={allCourts[0]}
          geolocation={ error !== null ? geolocation:null}
          toKebabCase={toKebabCase}
          userId={userId}
          allMessages={allMessages}
          addMessageToAllMessages={addMessageToAllMessages}
          filterCourts={filterCourts}
          clearAllMessages={clearAllMessages}
          showLow={showLow}
          showMedium={showMedium}
          showHigh={showHigh}
          setClicked={setClicked}
          clearFilter={clearFilter}
        />
      </div>

      <div style={{ zIndex: 1 }}>
        <MapComponent
          onClick={setClickedFalse}
          clickedCourt={clickedCourt}
          googleMapURL={MAP_URL}
          loadingElement={<div style={{ height: `400px` }} />}
          containerElement={<div style={{ height: `90vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          allCourts={allCourts}
          toKebabCase={toKebabCase}
          geolocation={geolocation}
          broadcastLocationChannel={broadcastLocationChannel}
          currentLocation={currentLocation}
          setPlayersCount={setPlayersCount}
          playersCount={playersCount}
          getDailyPeakTimes={getDailyPeakTimes}
          getWeeklyPeakTimes={getWeeklyPeakTimes}
          error={error}
          //testData={testData}
        />
      </div>
      <div className="compass"
        style={{
          position: "fixed",

          //padding: "100px"
          bottom: "10%",
          right: "5%"
        }}
      >
        <Icon
          onClick={reCentre}
          style={{ zIndex: 100000, color: "orange", opacity: '0.75' }}
          size="huge"
          name="compass"
        />
      </div>
    </Fragment>
  );
};

export default withScriptjs(App);
