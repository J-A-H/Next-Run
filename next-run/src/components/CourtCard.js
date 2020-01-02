import React from "react";
import Link from "react-router-dom";
const CourtCard = props => {
  return (
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
  );
};

export default CourtCard;
