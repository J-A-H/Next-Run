import React, { Fragment, useEffect } from "react";

//API calls
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Circle
} from "react-google-maps";

//PUSHER________________
const Pusher = require("pusher-js");

const pusherObject = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  disableStats: true
});

import axios from "axios";

import CurrentLocationMarkerComponent from "./CurrentLocationMarkerComponent";
import CourtMarkerComponent from "./CourtMarkerComponent";

/**
 * Generates Map component other props are used with withScriptjs and withGoogleMap
 */
const MapComponent = withScriptjs(
  withGoogleMap(
    ({
      googleMapURL,
      updatePlayerCount,
      clearPlayerCount,
      allCourts,
      toKebabCase,
      geolocation
    }) => {
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

      useEffect(() => {
        if (allCourts) {
          allCourts.forEach(court => {
            const channelName = toKebabCase(court.name);

            // Pusher.logToConsole = true;

            let channel = pusherObject.subscribe(`${channelName}`);

            channel.bind("player-count", data => {
              // console.log(`You are at court ${data.name}`);

              const courtName = data.name;
              updatePlayerCount(courtName);
            });

            if (withinCourt(court, 400, geolocation)) {
              axios.post("/add_visit", { channel: channelName, court: court });
            } else {
              clearPlayerCount(court.name);
            }
          });
        }
      }, [geolocation]);

      return (
        <GoogleMap defaultZoom={15} defaultCenter={geolocation}>
          <CurrentLocationMarkerComponent geolocation={geolocation} />
          {allCourts.map(court => {
            let coords = { lat: Number(court.lat), lng: Number(court.lng) };
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
        </GoogleMap>
      );
    }
  )
);

export default MapComponent;
