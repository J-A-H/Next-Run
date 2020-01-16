import React, { useState, useEffect } from "react";
import { Marker, InfoWindow } from "react-google-maps";
import {
  TransitionablePortal,
  Segment,
  Popup,
  Label,
  Icon
} from "semantic-ui-react";
import CourtDetailShow from "./CourtDetailShow";
import myMarker from "../../public/images/Next-Run_logo_marker.png";

import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

import axios from "axios";

/**
 * Generates a court marker  for each court
 * @param {*} param0
 */
const CourtMarkerComponent = ({
  geolocation,
  location,
  court,
  getDailyPeakTimes,
  getWeeklyPeakTimes
}) => {
  const [MarkerCourDetailState, setMarkCourtDetailState] = useState({
    open: false
  });

  const [distance, setDistance] = useState("");

  /**
   * Opens court detail when marker on map is clicked.
   */
  const handleMarkerClick = () => {
    setMarkCourtDetailState(prevState => ({ open: !prevState.open }));
  };

  /**
   * Closes court detail
   */
  const handleMarkerClose = () => {
    setMarkCourtDetailState(prevState => ({ open: false }));
  };

  /**
   * Gets distance from current location to court.
   * @param {} court
   */
  const getDistance = (court, geolocation) => {

    if (geolocation.lat !== undefined) {
      axios
        .post("/getDistance", { court: court, geolocation: geolocation })
        .then(res => {
          const distance = res.data[0].elements[0].distance;
          setDistance(distance);
        })
        .catch(err => {
          console.log(err);
        });
    }
    else{
      setDistance("");
    }
  };

  useEffect(() => {
    if (court !== undefined && location !== undefined) {
      getDistance(court, geolocation);
    }
  }, [court, location]);

  return (
    <div>
      <Popup
        header={court.name}
        trigger={
          <MarkerWithLabel
            position={location}
            labelAnchor={{ x: 0, y: 100 }}
            defaultIcon={myMarker}
            onClick={handleMarkerClick}
          >
            <Label as="a" color="teal" image>
              {court.name}
              <Label.Detail>{distance.text}</Label.Detail>
            </Label>
          </MarkerWithLabel>
        }
      />

      {/* <TransitionablePortal
        onClose={handleMarkerClose}
        open={MarkerCourDetailState.open}
      >
        <div className="Court-portal">
          <Segment>
            <div>
              <CourtDetailShow
                court={court}
                getDailyPeakTimes={getDailyPeakTimes}
                getWeeklyPeakTimes={getWeeklyPeakTimes}
              />
            </div>
          </Segment>
        </div>
      </TransitionablePortal> */}
    </div>
  );
};

export default CourtMarkerComponent;
