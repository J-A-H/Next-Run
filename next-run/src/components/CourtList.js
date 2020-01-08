import React from "react";
import CourtCard from "./CourtCard";
import {Link} from "react-router-dom";
const CourtList = props => {
  return (
    <div>
      {props.courts.map(court => (
          <CourtCard key={court.id} court={court} onClickDisplay={props.onClickDisplay}/>
      )
      )
    }
    </div>
  );
};

export default CourtList;
