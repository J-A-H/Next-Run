import React from 'react';
import CourtCard from './CourtCard'
const CourtList = (props) => {
  return(
    <div>
        {props.courts.map(court => (
        <CourtCard court={court}/>
        ))}
    </div>
  );
        }

export default CourtList;