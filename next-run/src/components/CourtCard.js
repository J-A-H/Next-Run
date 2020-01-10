import React, { Component, useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import Link from "react-router-dom";
import RecipeReviewCard from "./CourtDetailShow";
const CourtCard = props => {
  const [weekly, setWeekly] = useState(0);

  useEffect(() =>{
    async function retrieveWeekly(id) {
      const weeklydata = await props.getWeeklyPeakTimes(id);
      setWeekly(weeklydata)
    }
  }, [weekly])
  return (
    <div
      style={{ opacity: 1, margin: 10, zIndex: 10 }}
    >
      <div className="ui card">
        <div className="content">
          <div className="header">{props.court.name}</div>
          <div className="meta">
            <span className="date">{props.court.address}</span>
          </div>
          <div className="description">Current Activity Level: {props.playerCount}</div>
        </div>
        <div className="extra content"></div>
      </div>
    </div>
  );
};


export default CourtCard;
