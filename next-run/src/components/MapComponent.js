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
      setPlayersCount
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

        const handlleIncomingLocation = (data) => {
          console.log("Incoming locaiton");

          const incomingLocation = data.incomingLocation;
          console.log(incomingLocation);

          allCourts.forEach(court => {
            if (withinCourt(court, 400, incomingLocation)) {
              console.log(`increment: ${court.name}`);
              updatePlayerCount(court.name);
            } else {
              clearPlayerCount(court.name);
            }
          });
        }
        //listener for incoming geolocaitons
        broadcastLocationChannel.bind("transit", handlleIncomingLocation);

        return () => {
          broadcastLocationChannel.unbind("transit", handlleIncomingLocation);
        };
      }, [currentLocation]);

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
