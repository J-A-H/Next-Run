import React, { Fragment, useEffect, useState } from "react";

//API calls
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Circle
} from "react-google-maps";

import axios from "axios";

import CurrentLocationMarkerComponent from "./CurrentLocationMarkerComponent";
import CourtMarkerComponent from "./CourtMarkerComponent";

/**
 * Generates Map component other props are used with withScriptjs and withGoogleMap
 */
const MapComponent = withScriptjs(
  withGoogleMap(
    ({
      allCourts,
      geolocation,
      toKebabCase,
      broadcastLocationChannel,
      updatePlayerCount,
      clearPlayerCount,
      currentLocation,
      playersCount,
      setPlayersCount,
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

      //initialize pusher listener for incoming broadcasts
      useEffect(() => {
        // const clearPlayerCount = courtName => {
        //   //TODO: reduces count

        //   console.log(`clear`);
        //   console.log(currentLocation);

        //   if (currentLocation === courtName) {
        //     console.log(`clear: ${courtName}`);
        //     console.log("clear");
        //     console.log(currentLocation);
        //     console.log(courtName);

        //     const newPlayersCountObject = playersCount;

        //     newPlayersCountObject[courtName] =
        //       newPlayersCountObject[courtName] - 1;

        //     console.log(newPlayersCountObject);
        //     setPlayersCount(newPlayersCountObject);
        //   }
        // };

        //listener for incoming geolocaitons
        broadcastLocationChannel.bind("transit", data => {
          console.log("Incoming locaiton");
          console.log(data.incomingLocation);

          const incomingLocation = data.incomingLocation;

          allCourts.forEach(court => {
            if (withinCourt(court, 400, incomingLocation)) {
              console.log(`increment: ${court.name}`);
              updatePlayerCount(court.name);
            } else {
              clearPlayerCount(court.name);
            }
          });
        });
      }, [currentLocation]);

      // useEffect(() => {
      //   allCourts.forEach(court => {
      //     const channelName = toKebabCase(court.name);
      //     if (withinCourt(court, 400, geolocation)) {
      //       axios.post("/add_visit", { channel: channelName, court: court });
      //     }
      //   });
      // }, [geolocation.lat, geolocation.lng]);

      return (
        <GoogleMap
          defaultZoom={14}
          defaultCenter={geolocation}
          center={geolocation}
        >
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
