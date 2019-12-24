import React, { Component, Fragment } from "react";
import CourtList from "./CourtList";
import ActivityLevelFilterList from "./ActivityLevelFilterList"

const CourtListContainer = props => {
  <Fragment>
    <CourtList courts={props.courts} />
    <ActivityLevelFilterList/>
  </Fragment>;
};

export default CourtListContainer;
