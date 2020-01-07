import React, { Component, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import RecipeReviewCard from './CourtDetailShow'
import CourtCard from './CourtCard'

export default function CourtListContainer({onClickDisplay}) {

  return (

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
      <div onClick={onClickDisplay}>
        <CourtCard />
        <CourtCard />
        <CourtCard />
        <CourtCard />

      </div>
    </div>
  );
}