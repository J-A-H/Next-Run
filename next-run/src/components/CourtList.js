import React, { Fragment, useState } from "react";
import './CourtList.css'
import CourtCard from "./CourtCard";
import { Link } from "react-router-dom";
import { Modal, Button, onActionClick } from "semantic-ui-react";
import CourtDetailShow from "./CourtDetailShow";

const CourtList = props => {

  const {clearAllMessages, playersCount} = props;

  return props.courts.map(court => (
    <div style={{ zIndex: 100000 }}>
      <Modal className="Modal"
        key={court.id + 100}
        trigger={
          <CourtCard onClick={onActionClick} key={court.id} court={court} playersCount={playersCount}
          
          geolocation={props.geolocation}
          toKebabCase={props.toKebabCase}
          userId={props.userId}
          allMessages={props.allMessages}
          addMessageToAllMessages={props.addMessageToAllMessages}
          clearAllMessages={clearAllMessages}
          />
        }
      >
        <CourtDetailShow
          court={court}
          getDailyPeakTimes={props.getDailyPeakTimes}
          getWeeklyPeakTimes={props.getWeeklyPeakTimes}
          getAllVisits={props.getAllVisits}
        ></CourtDetailShow>
      </Modal>
    </div>
  ));
};
export default CourtList;