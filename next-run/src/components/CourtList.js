import React from "react";
import CourtCard from "./CourtCard";
import {Link} from "react-router-dom";
const CourtList = props => {
  return (
    <div>
      {props.courts.map(court => (
        <Link to={`/courts/${court.id}`}>
          <CourtCard key={court.id} court={court} />
        </Link>
      ))}
    </div>
  );
};

export default CourtList;
