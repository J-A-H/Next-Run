import React, { Component, useState, useEffect } from "react";
import "./CourtCard.css";
import {
  Button,
  Header,
  Segment,
  TransitionablePortal,
  Card,
  Image,
  Table,
  Comment,
  Form,
  onActionClick,
  Label
} from "semantic-ui-react";
import Chatbox from "./Chat/Chatbox";
import CourtDetailShow from "./CourtDetailShow";

const CourtCard = props => {
  const {
    clearAllMessages,
    playersCount,
    court,
    getWeeklyPeakTimes,
    getDailyPeakTimes,
    cardOpen,
    updateCardOpen
  } = props;

  const [courtDetailState, setCourtDetailState] = useState({ open: false });

  const [chatState, setChatState] = useState({ chatOpen: false });

  const handleDetailClick = () => {
    console.log(court.name);
    setCourtDetailState(prevState => ({ open: !prevState.open }));
  };

  const handleDetailClose = () => setCourtDetailState({ open: false });

  const handleChatClick = () => {
    console.log(`cardOpen:`, cardOpen);
    if (cardOpen.court_id === "") {
      clearAllMessages();
      setChatState(prevState => ({ chatOpen: !prevState.chatOpen }));
      updateCardOpen(court.id);
    }
  };

  const handleChatClose = () => {
    setChatState(prevState => ({ chatOpen: false }));
    clearAllMessages();
    updateCardOpen("");
  };

  const courtFocus = () => {
    props.setClicked(court.id);
  };

  const convertActivityLevel = num => {
    if (num > 10) {
      return (
        <Label size="medium" circular color="red">
          {`Hot`}
        </Label>
      );
    } else if (num > 5 && num <= 10) {
      return (
        <Label size="medium" circular color="orange">
          {`Warm`}
        </Label>
      );
    } else {
      return (
        <Label size="medium" circular color="blue">
          {`Cold`}
        </Label>
      );
    }
  };

  return (
    <div className="card" onClick={courtFocus}>
      <Card>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://img.icons8.com/dotty/80/000000/basketball-2.png"
          />
          <Card.Header>{court.name}</Card.Header>
          <Card.Meta>{props.court.address}</Card.Meta>
          <Card.Description>
            Current Activity Level:{" "}
            {convertActivityLevel(playersCount[court.name])}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              basic
              color="green"
              negative={courtDetailState.open}
              // positive={!courtDetailState.open}
              onClick={handleDetailClick}
            >
              Details
            </Button>
            <Button
              basic
              color="blue"
              negative={chatState.chatOpen}
              // positive={!chatState.chatOpen}
              onClick={handleChatClick}
            >
              Chat
            </Button>
          </div>
        </Card.Content>
      </Card>

      <TransitionablePortal
        onClose={handleDetailClose}
        open={courtDetailState.open}
      >
        <div className="Court-portal">
          <Segment>
            <div className="X-close">
              <Button onClick={handleDetailClose}>X</Button>
            </div>
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

      {/* Chat portal */}
      <TransitionablePortal onClose={handleChatClose} open={chatState.chatOpen}>
        <div className="Chat-portal">
          <Segment>
            <Header>Court Chat</Header>
            <div className="X-close">
              <Button onClick={handleChatClose}>X</Button>
            </div>
            <div>
              <Chatbox
                court={props.court}
                geolocation={props.geolocation}
                toKebabCase={props.toKebabCase}
                userId={props.userId}
                allMessages={props.allMessages}
                addMessageToAllMessages={props.addMessageToAllMessages}
              />
            </div>
          </Segment>
        </div>
      </TransitionablePortal>
    </div>
  );
};

export default CourtCard;
