import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import Link from "react-router-dom";

const CourtCard = props => {

  return (
    <div onClick={props.onClickDisplay()} style={{ opacity: 1, margin: 10, zIndex: 10, }}>
      <div className="ui card">
        <div className="content">
          <div className="header">{props.court.name}</div>
          <div className="meta">
            <span className="date">{props.court.address}</span>
          </div>
          <div className="description">Activity Level: HOT</div>
        </div>
        <div className="extra content"></div>
      </div>
    </div>
  );
}


export default CourtCard;
