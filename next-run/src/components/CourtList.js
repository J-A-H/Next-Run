import React, { Fragment, useState } from "react";
import './CourtList.css'
import CourtCard from "./CourtCard";
import { Link } from "react-router-dom";
import { Modal, Button, onActionClick } from "semantic-ui-react";
import CourtDetailShow from "./CourtDetailShow";
const CourtList = props => {
  return props.courts.map(court => (
    <div style={{ zIndex: 100000 }}>
      <Modal className="Modal"
        key={court.id}
        trigger={
          <CourtCard onClick={onActionClick} key={court.id} court={court} playerCount={props.playersCount[court.name]}/>
        }
      // header={court.name}
      // content={court.address}
      // actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
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