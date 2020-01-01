// React components and hooks
import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import CourtListContainer from "./CourtListContainer";
import axios from "axios";

//Ionic Capcitor layer
// import { Plugins } from "@capacitor/core";

// Database helper object
import useDatabase from "../helpers/useDatabase";
import helpers from "../helpers/helpers";

//API calls
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  Circle,
} from "react-google-maps";

//API keys______________
const API_KEY = process.env.REACT_APP_GMAPS_API_KEY;
const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry`;

//PUSHER________________
const Pusher = require("pusher-js");

const pusherObject = new Pusher(
  process.env.REACT_APP_PUSHER_APP_KEY, {
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
});

const App = props => {
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

  //*-------------------------------Custom components----------------------------------------------

  /**
   * Generates custom map marker component
   * @param {*} props
   */
  const CurrentLocationMarkerComponent = props => {
    return (
      //TODO: Use defaultIcon prop to link to png
      <Marker position={geolocation} />
    );
  };

  /**
   * Generates a court marker  for each court
   * @param {*} param0
   */
  const CourtMarkerComponent = ({ location } = props) => {
    return <Marker position={location} />;
  };

  /**
   * Generates Map component other props are used with withScriptjs and withGoogleMap
   */
  const MapComponent = withScriptjs(
    withGoogleMap(({ googleMapURL } = props) => {
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

      // Pusher.logToConsole = true;

      return (
        <GoogleMap defaultZoom={15} defaultCenter={geolocation}>
          <CurrentLocationMarkerComponent />

          {allCourts.map(court => {
            let coords = { lat: Number(court.lat), lng: Number(court.lng) };

            const channelName = toKebabCase(court.name);

            let channel = pusherObject.subscribe(`${channelName}`);
            channel.bind('player-count', (data) => {
              console.log(`You are at court ${data.name}`);
            })


            if (withinCourt(court, 400, geolocation)) {
              axios.post("/add_visit", {channel: channelName, court: court});
            }

            return (
              <Fragment key={court.id}>
                <CourtMarkerComponent location={coords} />
                <Circle
                  center={coords}
                  radius={400}
                  options={{
                    fillOpacity: 0.1,
                    strokeWidth: 1,
                    strokeOpacity: 0.2
                  }}
                />
              </Fragment>
            );
          })}

          <CurrentLocationMarkerComponent />
        </GoogleMap>
      );
    })
  );

  /**
   * Runs everytime App component is rendered.
   */
  useEffect(() => {
    //Gets current location and sets it to state.
    getCurrentLocation();

    const playersCountObject = {};

    if(allCourts){
      allCourts.forEach( court => {

        const courtName = court.name;

        playersCountObject[courtName] = 0;
      });
    }

    setPlayersCount(playersCountObject);
  }, [allCourts]); //Empty arr tells it to only run once after App rendered

  return (
    <React.Fragment>
      <div className="App-header">
        <img src={"images/Next-Run_logo.png"} className="App-logo" alt="logo" />
      </div>
      <MapComponent
        googleMapURL={MAP_URL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      {/* <CourtListContainer courts={state.courts}></CourtListContainer> */}
    </React.Fragment>
  );
};

export default App;
