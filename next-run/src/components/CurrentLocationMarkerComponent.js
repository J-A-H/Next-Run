import React from "react";
import {
  Marker
} from "react-google-maps";

/**
   * Generates custom map marker component
   * @param {*} props
   */
  const CurrentLocationMarkerComponent = ({geolocation}) => {
    return (
      //TODO: Use defaultIcon prop to link to png
      <Marker position={geolocation} />
    );
  };
  
  export default CurrentLocationMarkerComponent;