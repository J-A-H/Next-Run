import React, { Fragment, useEffect, useState } from "react";

//API calls
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Circle
} from "react-google-maps";

//import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

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
      playersCount,
      getDailyPeakTimes,
      getWeeklyPeakTimes
    }) => {
      const [heatMapData, setHeatMapData] = useState([]);

      const initializeHeatMapData = (allCourts, playersCount) => {
        const newHeatMapData = [];

        allCourts.forEach(court => {
          var y0 = Number(court.lat);
          var x0 = Number(court.lng);
          var rd = 200 / 111300;
          for(let i=0; i<playersCount[court.name]; i++) {
            let newHeatMapPoint = { location: null, weight: null };

            var u = Math.random();
            var v = Math.random();

            var w = rd * Math.sqrt(u);
            var t = 2 * Math.PI * v;
            var x = w * Math.cos(t);
            var y = w * Math.sin(t);

            let latitude = y + y0;
            console.log(latitude)
            let longitude = x + x0;
            console.log(longitude)

            const googlePoint = new window.google.maps.LatLng(
              //  court.lat + Math.cos(angle) * 400,
              //  court.lng + Math.sin(angle) * 400
              //court.lat,
              //court.lng
              latitude,
              longitude
            );

            //Sets location
            newHeatMapPoint.location = googlePoint;
            //newHeatMapPoint.weight = playersCount[court.name] * 1;
            newHeatMapPoint.weight = 1;

            console.log(newHeatMapPoint);

            newHeatMapData.push(newHeatMapPoint);
          }
        });

        console.log(newHeatMapData);

        setHeatMapData(newHeatMapData);
      };

      useEffect(() => {
        if (allCourts.length > 0 && Object.keys(playersCount).length > 0) {
          console.log(allCourts);
          console.log(playersCount);

          //Both states are populated

          initializeHeatMapData(allCourts, playersCount);
        }
      }, [allCourts, playersCount]);

      const defaultMapOptions = {
        fullscreenControl: false,
        disableDefaultUI: true
      };

      var gradient = [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 63, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 0, 223, 1)",
        "rgba(0, 0, 191, 1)",
        "rgba(0, 0, 159, 1)",
        "rgba(0, 0, 127, 1)",
        "rgba(63, 0, 91, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(191, 0, 31, 1)",
        "rgba(255, 0, 0, 1)"
      ];

      return (
        <GoogleMap
          defaultZoom={14}
          defaultCenter={geolocation}
          center={geolocation}
          mapTypeId={"hybrid"}
          defaultOptions={defaultMapOptions}
        >
          <CurrentLocationMarkerComponent geolocation={geolocation} />
          {allCourts.map(court => {
            let coords = { lat: Number(court.lat), lng: Number(court.lng) };
            return (
              <Fragment key={court.id}>
                <CourtMarkerComponent location={coords} court={court} getDailyPeakTimes={getDailyPeakTimes} getWeeklyPeakTimes={getWeeklyPeakTimes} />
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
          <HeatmapLayer data={heatMapData} options={{ radius: `50` }} />
        </GoogleMap>
      );
    }
  )
);

export default MapComponent;
