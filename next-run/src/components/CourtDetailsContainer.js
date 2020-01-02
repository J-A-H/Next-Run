import React, { Component, Fragment, useState, useEffect } from "react";
import CourtDetailShow from "./CourtDetailShow";
import CourtChatShow from "./CourtChatShow";
import Axios from 'axios';
const CourtDetailsContainer = props => {
  const [state, setState] = useState({
    court: {},
  });
  useEffect(() => {
    const {match: { params}} = props;
    //Get all courts from database and updates state
    Axios.get(`/courts/${params.courtID}`).then((res, err) => {
      if (err) {
        console.log(err);
      }

      setState(prevState => ({
        ...prevState,
        court: res.data
      }));
    });
  }); //Empty arr tells it to only run once after App rendered
  return (
    <Fragment>
      <CourtDetailShow court={state.court}/>
      <CourtChatShow />
    </Fragment>
  );
};

export default CourtDetailsContainer;
