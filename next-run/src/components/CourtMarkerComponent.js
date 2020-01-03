import React from "react"
import {
  Marker 
} from "react-google-maps";
/**
   * Generates a court marker  for each court
   * @param {*} param0
   */
  const CourtMarkerComponent = ({ location }) => {
    return <Marker position={location} />;
  };

export default CourtMarkerComponent;