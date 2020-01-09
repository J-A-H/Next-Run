import React, { Fragment, useState } from "react";
import CourtCard from "./CourtCard";
import {Link} from "react-router-dom";

const CourtList = props => {

  const [state, setState] = useState({ activeCard: null });

  const onClickDisplay = (courtId) => {
      setState(prevState => ({
        ...prevState,
        activeCard: courtId
      }));
    


    // if (state.cardModalStatus == true) {
    //   setState(prevState => ({
    //     ...prevState,
    //     cardModalStatus: null
    //   }));
    // }
    // else if (state.cardModalStatus == null) {
    //   setState(prevState => ({
    //     ...prevState,
    //     cardModalStatus: true
    //   }));
    // }
  }

  return (

    <div>
      {props.courts.map(court => (
          <CourtCard key={court.id} court={court} onClickDisplay={onClickDisplay} activeCard={state.activeCard} />
      )
      )
    }
    </div>
  );
};

export default CourtList;
