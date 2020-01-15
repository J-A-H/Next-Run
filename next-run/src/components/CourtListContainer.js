import React, { Component, Fragment, useState } from "react";
import CourtList from "./CourtList";
import ActivityLevelFilterList from "./ActivityLevelFilterList";
import { Container } from "semantic-ui-react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import CourtCard from "./CourtCard";
import './CourtListContainer.css'

const CourtListContainer = props => {
  // const [filteredCourts, setfilteredCourts] = useState([props.courts]);

  // React.useEffect(() => {
  //   setfilteredCourts(props.courts)
  // }, [filteredCourts]);


  const {clearAllMessages} = props;
  

  // let low = Object.keys(props.playersCount).filter(
  //   court => props.playersCount[court] < 5
  // );
  // let medium = Object.keys(props.playersCount).filter(
  //   court => props.playersCount[court] > 5
  // );
  // let high = Object.keys(props.playersCount).filter(
  //   court => props.playersCount[court] > 10
  // );

  // function showHigh() {
  //   setfilteredCourts(high);
  //   // props.courts = Object.keys(props.courts).filter(court =>
  //   //   filteredCourts.includes(court)
  //   // );
  //   props.filterCourts(props.courts.filter(court => filteredCourts.includes(court.name)));

  // }

  // function showMedium() {
  //   setfilteredCourts(medium);
  //   // props.courts = Object.keys(props.courts).filter(court =>
  //   //   filteredCourts.includes(court)
  //   // );
  //   props.filterCourts(props.courts.filter(court => filteredCourts.includes(court.name)));

  // }

  // function showLow() {
  //   setfilteredCourts(low);

  //   //console.log(props.courts);
  //   props.filterCourts(props.courts.filter(court => filteredCourts.includes(court.name)));
    
     
  // }

  return (
    <Fragment>
      <div className="Container-List">
        <div className="blue-filter-bar">
          <Container />
          <div style={{ float: "left" }}>
            <DropdownButton id="dropdown-basic-button" title="Activity Level">
              <Dropdown.Item onClick={props.showHigh}>High</Dropdown.Item>
              <Dropdown.Item onClick={props.showMedium}>Medium</Dropdown.Item>
              <Dropdown.Item onClick={props.showLow}>Low</Dropdown.Item>
            </DropdownButton>
          </div>
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
