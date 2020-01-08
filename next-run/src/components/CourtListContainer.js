import React, { Component, Fragment, useState } from "react";
import CourtList from "./CourtList";
import ActivityLevelFilterList from "./ActivityLevelFilterList";
import { Container } from 'semantic-ui-react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import CourtCard from './CourtCard'

const CourtListContainer = props => {

  return (

    <Fragment>

      <div style={{ position: 'relative', zIndex: 3, maxWidth: 350, maxHeight: 400, overflow: 'auto', backgroundColor: "rgba(52, 52, 52, 0.5)" }}>
        <div style={{ position: 'relative', backgroundColor: "rgba(0, 153, 255, 0.5)", position: 'relative', zIndex: '4', height: 60, maxWidth: 350, maxHeight: 400, padding: 10 }}>
          <Container />
          <div style={{ float: 'left' }}>
            <DropdownButton id="dropdown-basic-button" title="Filter">
              <Dropdown.Item onClick="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item onClick="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item onClick="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div>
          <CourtList courts={props.courts}/>
        </div>
      </div>

      <ActivityLevelFilterList />

    </Fragment>

  );
};

export default CourtListContainer;
