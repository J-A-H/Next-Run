import React, {useState} from "react";
const CourtDetailShow = (props) => {
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
  }

export default CourtDetailShow;
