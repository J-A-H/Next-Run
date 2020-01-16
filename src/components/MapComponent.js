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

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/',
  timeout: 1000,
  headers:{'Content-Type': 'text/plain;charset=utf-8'}
});

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
      getWeeklyPeakTimes,
      clickedCourt,
    
    }) => {
      // if (clickedCourt) {
      //   let center = {
      //     lat: Number(allCourts[clickedCourt - 1].lat),
      //     lng: Number(allCourts[clickedCourt - 1].lng)
      //   };
      // } else {
      //   let center = geolocation;
      // }

      const [heatMapData, setHeatMapData] = useState([]);

      const initializeHeatMapData = (allCourts, playersCount) => {
        const newHeatMapData = [];

        allCourts.forEach(court => {
          var y0 = Number(court.lat);
          var x0 = Number(court.lng);
          var rd = 100 / 111300;
          for (let i = 0; i < playersCount[court.name]; i++) {
            let newHeatMapPoint = { location: null, weight: null };

            var u = Math.random();
            var v = Math.random();

            var w = rd * Math.sqrt(u);
            var t = 2 * Math.PI * v;
            var x = w * Math.cos(t);
            var y = w * Math.sin(t);

            let latitude = y + y0;
            console.log(latitude);
            let longitude = x + x0;
            console.log(longitude);

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

      const convertIDtoCoords = (id) => {
        let loc = null;
        if(id === 0){
          loc = {lat: Number(geolocation.lat), lng: Number(geolocation.lng)}
        } else{
          loc=
          {
            lat: Number(allCourts[id - 1].lat),
            lng: Number(allCourts[id - 1].lng)
          }
        }
        return loc;
      }

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
        disableDefaultUI: true,
        featureType: "poi.business",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      };



      return (
        
        <GoogleMap
          defaultZoom={14}
          // defaultCenter={geolocation}
          center={clickedCourt !== null ? convertIDtoCoords(clickedCourt) : geolocation}
          //ref={(map) => map && map.panTo({lat: 25.0112183,lng: 121.52067570000001})}
          mapTypeId={"hybrid"}
          defaultOptions={defaultMapOptions}
          
        >
          <CurrentLocationMarkerComponent geolocation={geolocation} />
          {allCourts.map(court => {
            let coords = { lat: Number(court.lat), lng: Number(court.lng) };
            return (
              <Fragment key={court.id}>
                <CourtMarkerComponent
                  location={coords}
                  court={court}
                  getDailyPeakTimes={getDailyPeakTimes}
                  getWeeklyPeakTimes={getWeeklyPeakTimes}
                  geolocation={geolocation}
                />
                {/* <Circle
                  center={coords}
                  radius={400}
                  options={{
                    fillOpacity: 0.1,
                    strokeWidth: 1,
                    strokeOpacity: 0.2
                  }}
                /> */}
              </Fragment>
            );
          })}
          <HeatmapLayer data={heatMapData} options={{ radius: `10` }} />
        </GoogleMap>
      );
    }
  )
);

export default MapComponent;
