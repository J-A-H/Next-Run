import React from "react"
import {
  Marker 
} from "react-google-maps";

import myMarker from "../../public/images/Next-Run_logo_marker.png"
/**
   * Generates a court marker  for each court
   * @param {*} param0
   */
  const CourtMarkerComponent = ({ location }) => {
    return <Marker position={location} defaultIcon ={myMarker}/>;
  };

export default CourtMarkerComponent;