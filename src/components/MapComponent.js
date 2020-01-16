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
      getWeeklyPeakTimes,
      clickedCourt,
      error,
      setClicked
    
    }) => {

      const [heatMapData, setHeatMapData] = useState([]);
      const [center, setCenter] = useState({});

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

      const getCenter = () => {

        console.log("Map component no location:",error);
        
        if(error){
          return {
            lat: 43.644200,
            lng: -79.402207
          }
        }
        else{
          return geolocation
        }
      }

      useEffect(() => {
        if (allCourts.length > 0 && Object.keys(playersCount).length > 0) {
          console.log(allCourts);
          console.log(playersCount);

          //Both states are populated

          initializeHeatMapData(allCourts, playersCount);
        }
      }, [allCourts, playersCount]);

      useEffect(()=>{

        setCenter(getCenter());

        if(clickedCourt > 0){
          console.log("Card clicked", clickedCourt);
          const newCenter = {
            lat: Number(allCourts[clickedCourt - 1].lat),
            lng: Number(allCourts[clickedCourt - 1].lng)
          }
          console.log("Card clicked", newCenter);


          setCenter(newCenter);
        }
      }, [clickedCourt])

      const defaultMapOptions = {
        fullscreenControl: false,
        disableDefaultUI: true,
        featureType: "poi.business",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      };

      const onCenterChanged = ()=> {
        setClicked(-1);
      }



      return (        
      
        <GoogleMap
          defaultZoom={14}
          // defaultCenter={geolocation}
          center={center}
          onCenterChanged={onCenterChanged}
          //mapTypeId={"hybrid"}
          defaultOptions={defaultMapOptions}
          options={{styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8ec3b9"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1a3646"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#4b6878"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#64779e"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.province",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#4b6878"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#334e87"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#023e58"
                }
              ]
            },
            {
              "featureType": "poi",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#283d6a"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#6f9ba5"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#023e58"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3C7680"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "red"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#98a5be"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#2c6675"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#255763"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#b0d5ce"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#023e58"
                }
              ]
            },
            {
              "featureType": "road.local",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#98a5be"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#283d6a"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3a4762"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#0e1626"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#4e6d70"
                }
              ]
            }
          ]}}
          
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
