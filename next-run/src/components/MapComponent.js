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
  withGoogleMap(({ allCourts, geolocation, toKebabCase, clearPlayerCount, setGeolocation }) => {

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

      allCourts.forEach(court => {

        const channelName = toKebabCase(court.name);
        if (withinCourt(court, 400, geolocation)) {

          axios.post("/add_visit", { channel: channelName, court: court });
        } else {
          // clearPlayerCount(court.name);
        }
      });
    }, []);

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
  })
);

export default MapComponent;
