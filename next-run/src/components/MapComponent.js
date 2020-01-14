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
      toKebabCase,
      broadcastLocationChannel,
      updatePlayerCount,
      clearPlayerCount,
      currentLocation,
      playersCount,
      setPlayersCount
    }) => {
      const points = [
        { location: [-1.131592, 52.629729], weight: 2 },
        { location: [-1.141592, 52.629729], weight: 3 },
        { location: [-1.161592, 53.629729], weight: 1 },
        { location: [43.649785, -78.364159], weight: 5 },
        { location: [44.649785, -79.364159], weight: 5 }
      ];


      const [heatMapData, setHeatMapData] = useState([]);

      const initializeHeatMapData = (allCourts, playersCount) => {
        const newHeatMapData = [];

        allCourts.forEach(court => {
          const newHeatMapPoint = { location: null, weight: null };
          const googlePoint = new window.google.maps.LatLng(
            court.lat,
            court.lng
          );

          //Sets location
          newHeatMapPoint.location = googlePoint;
          newHeatMapPoint.weight = playersCount[court.name]* 5;

          console.log(newHeatMapPoint);

          newHeatMapData.push(newHeatMapPoint);
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

      return (
        <GoogleMap
          defaultZoom={14}
          defaultCenter={geolocation}
          center={geolocation}
          mapTypeId={'satellite'}
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
          <HeatmapLayer data={heatMapData} options={{radius:`50`}}/>
        </GoogleMap>
      );
    }
  )
);

export default MapComponent;
