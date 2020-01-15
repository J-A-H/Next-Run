import React, { Fragment, useState } from "react";
import "./CourtList.css";
import CourtCard from "./CourtCard";
import { Link } from "react-router-dom";
import { Modal, Button, onActionClick } from "semantic-ui-react";
import CourtDetailShow from "./CourtDetailShow";

const CourtList = props => {
  const {
    clearAllMessages,
    playersCount,
    getWeeklyPeakTimes,
    getDailyPeakTimes
  } = props;

  return props.courts.map(court => (
    <div style={{ zIndex: 100000 }}>
      <Modal
        className="Modal"
        key={court.id + 100}
        trigger={
          <CourtCard
            onClick={onActionClick}
            key={playersCount[court.name]}
            court={court}
            playersCount={playersCount}
            geolocation={props.geolocation}
            toKebabCase={props.toKebabCase}
            userId={props.userId}
            allMessages={props.allMessages}
            addMessageToAllMessages={props.addMessageToAllMessages}
            clearAllMessages={clearAllMessages}
            getWeeklyPeakTimes={getWeeklyPeakTimes}
            getDailyPeakTimes={getDailyPeakTimes}
            setClicked={props.setClicked}
          />
        }
      ></Modal>
    </div>
  ));
};
export default CourtList;
