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

  const [cardOpen, setCardOpen] = useState({court_id: ""});

  /**
   * Sets card that is opened
   * @param {*} court_id 
   */
  const updateCardOpen = (court_id) => {
    setCardOpen({court_id: court_id});
  }

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
            cardOpen={cardOpen}
            updateCardOpen={updateCardOpen}
          />
        }
      ></Modal>
    </div>
  ));
};
export default CourtList;
