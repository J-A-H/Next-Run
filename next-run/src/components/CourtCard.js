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
  onActionClick
} from "semantic-ui-react";
import Chatbox from "./Chat/Chatbox";
import CourtDetailShow from "./CourtDetailShow";

const CourtCard = props => {
  const { clearAllMessages, playersCount, court } = props;

  const [cardPlayersCount, setCardPlayersCount] = useState({});

  const [courtDetailState, setCourtDetailState] = useState({ open: false });

  const [chatState, setChatState] = useState({ chatOpen: false });

  const handleDetailClick = () =>
    setCourtDetailState(prevState => ({ open: !prevState.chatOpen }));
  const handleDetailClose = () => setCourtDetailState({ open: false });

  const handleChatClick = () =>
    setChatState(prevState => ({ chatOpen: !prevState.chatOpen }));
  const handleChatClose = () => {
    setChatState(prevState => ({ chatOpen: false }));
    clearAllMessages();
  };

  useEffect(() => {
    console.log("Players count from court Card", playersCount);
  })

  const convertActivityLevel = num => {
    if (num > 10) {
      return "Hot"
    }
    else if (num > 5 && num < 10) {
      return "Warm"
    }
    else {
      return "Cold"
    }
  }

  return (
    <div className="card">
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
              content={"Details"}
              negative={courtDetailState.open}
              positive={!courtDetailState.open}
              onClick={handleDetailClick}
            />
            <Button
              basic
              color="blue"
              content={"Chat"}
              negative={chatState.chatOpen}
              positive={!chatState.chatOpen}
              onClick={handleChatClick}
            />
          </div>
        </Card.Content>
      </Card>

      <TransitionablePortal
        onClose={handleDetailClose}
        open={courtDetailState.open}
      >
        <div className="Court-portal">
        <Segment>
          <div>
            <CourtDetailShow/>
          </div>
        </Segment>
        </div>

      </TransitionablePortal>

      {/* Chat portal */}
      <TransitionablePortal onClose={handleChatClose} open={chatState.chatOpen}>
      <div className="Chat-portal">
        <Segment>
          <Header>Court Chat</Header>

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
    </div >
  );
};

export default CourtCard;
