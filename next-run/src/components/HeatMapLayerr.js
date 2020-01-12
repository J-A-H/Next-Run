import React from "react"
import {
  HeatmapLayer 
} from "react-google-maps";
/**
   * Generates a court marker  for each court
   * @param {*} param0
   */
  const HeatmapLayerr = ({ locations }) => {
    return <HeatmapLayer setData={locations} />;
  };

export default HeatmapLayerr;