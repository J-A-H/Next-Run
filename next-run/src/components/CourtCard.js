import React, { Component, useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react'
import Link from "react-router-dom";
import RecipeReviewCard from './CourtDetailShow'

const CourtCard = props => {
  
  const [state, setState] = useState({ isTrue: false });
  
  const onClickDisplay = () => {

      if (state.isTrue == true) {
        setState(prevState => ({
          ...prevState,
          isTrue: false
        }));
      }
      else if (state.isTrue == false) {
        setState(prevState => ({
          ...prevState,
          isTrue: true
        }));
      }
    }

    return (
      <div onClick={onClickDisplay} style={{ opacity: 1, margin: 10, zIndex: 10, }}>
        <div className="ui card">
          <div className="content">
            <div className="header">{props.court.name}</div>
            <div className="meta">
              <span className="date">{props.court.address}</span>
            </div>
            <div className="description">Activity Level: HOT</div>
          </div>
          <div className="extra content"></div>
        </div>

        {state.isTrue && (
          <div style={{ position: 'fixed', margin: 'auto', right: 0, left: 0, width: 600, height: 100, zIndex: 15 }}>
            <RecipeReviewCard
              court={props.court}
            />
          </div>
        )}

      </div>
    );
  }


export default CourtCard;
