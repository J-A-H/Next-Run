import React, { Fragment } from "react";
import CourtCard from "./CourtCard";
import {Link} from "react-router-dom";
const CourtList = props => {
  return (
    
    <div>
      {props.courts.map(court => (
          <CourtCard key={court.id} court={court} />
      )
      )
    }
    </div>
  );
};

export default CourtList;
