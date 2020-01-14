import React, { useState } from "react";
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

/**
 * Generates a court marker  for each court
 * @param {*} param0
 */
const CourtMarkerComponent = ({
  location,
  court,
  getDailyPeakTimes,
  getWeeklyPeakTimes
}) => {
  const [MarkerCourDetailState, setMarkCourtDetailState] = useState({
    open: false
  });

  /**
   * Opens court detail when marker on map is clicked.
   */
  const handleMarkerClick = () => {
    console.log(court.name);
    setMarkCourtDetailState(prevState => ({ open: !prevState.open }));
  };

  /**
   * Closes court detail
   */
  const handleMarkerClose = () => {
    setMarkCourtDetailState(prevState => ({ open: false }));
  };

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
              <Label.Detail>Friend</Label.Detail>
            </Label>
          </MarkerWithLabel>
        }
      />

      <TransitionablePortal
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
      </TransitionablePortal>
    </div>
  );
};

export default CourtMarkerComponent;
