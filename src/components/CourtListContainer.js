import React, { Component, Fragment, useState } from "react";
import CourtList from "./CourtList";
import ActivityLevelFilterList from "./ActivityLevelFilterList";
import { Container, Button, Segment } from "semantic-ui-react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import CourtCard from "./CourtCard";
import "./CourtListContainer.css";
import { callbackify } from "util";

const CourtListContainer = props => {
  // const [filteredCourts, setfilteredCourts] = useState([props.courts]);

  // React.useEffect(() => {
  //   setfilteredCourts(props.courts)
  // }, [filteredCourts]);

  const { clearAllMessages } = props;

  return (
    <Fragment>
      <div className="Container-List" style={{height: "calc(100vh - 80px)"}}>
        <div className="filter">
          <DropdownButton id="dropdown-basic-button" title="Activity Level" style = {{color: 'rgb(184,97,37)'}}>
            <Dropdown.Item onClick={props.showHigh}>Hot</Dropdown.Item>
            <Dropdown.Item onClick={props.showMedium}>Warm</Dropdown.Item>
            <Dropdown.Item onClick={props.showLow}>Cold</Dropdown.Item>
            <Dropdown.Item
              onClick={props.clearFilter}
              id="clearFilter"
              className="Clear-filter"
            >
              <Button inverted color="red">
                Clear Filter
              </Button>
            </Dropdown.Item>
          </DropdownButton>
        </div>
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
