import React, { Component, Fragment } from "react";
import CourtList from "./CourtList";
import ActivityLevelFilterList from "./ActivityLevelFilterList"

const CourtListContainer = props => {
  return(
  <Fragment>
    <ActivityLevelFilterList/>
    <CourtList courts={props.courts} />
  </Fragment>
  )};

export default CourtListContainer;
