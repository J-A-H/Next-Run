import React, { Component, Fragment, useState } from "react";
import CourtList from "./CourtList";
import ActivityLevelFilterList from "./ActivityLevelFilterList";
import { Container, Button, Segment } from "semantic-ui-react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import CourtCard from "./CourtCard";
import "./CourtListContainer.css";

const CourtListContainer = props => {
  // const [filteredCourts, setfilteredCourts] = useState([props.courts]);

  // React.useEffect(() => {
  //   setfilteredCourts(props.courts)
  // }, [filteredCourts]);

  const { clearAllMessages } = props;




  return (
    <Fragment>
      <div className="Container-List">
        <div className="Court-list">
          <CourtList
            playersCount={props.playersCount}
            courts={props.courts}
            getDailyPeakTimes={props.getDailyPeakTimes}
            getWeeklyPeakTimes={props.getWeeklyPeakTimes}
            getAllVisits={props.getAllVisits}
            court={props.court}
            geolocation={props.geolocation}
            toKebabCase={props.toKebabCase}
            userId={props.userId}
            allMessages={props.allMessages}
            addMessageToAllMessages={props.addMessageToAllMessages}
            clearAllMessages={clearAllMessages}
            setClicked={props.setClicked}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CourtListContainer;
