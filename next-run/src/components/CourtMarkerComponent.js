import React, { useState } from "react";
import { Marker } from "react-google-maps";
import {TransitionablePortal, Segment} from "semantic-ui-react";
import CourtDetailShow from "./CourtDetailShow";
import myMarker from "../../public/images/Next-Run_logo.png";

/**
 * Generates a court marker  for each court
 * @param {*} param0
 */
const CourtMarkerComponent = ({ location, court, getDailyPeakTimes, getWeeklyPeakTimes }) => {
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
      <Marker position={location} onClick={handleMarkerClick} />

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
