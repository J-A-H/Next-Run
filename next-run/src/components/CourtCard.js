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

  useEffect(()=>{
    console.log("Players count from court Card", playersCount);
  })

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
            Current Activity Level: {playersCount[court.name]}
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
        <Segment
          style={{
            position: "fixed",
            left: "350px",
            top: "10%",
            right: "25%",
            bottom: "10%",
            height: "70vh",
            zIndex: 1000
          }}
        >
          <Header>{props.court.name}</Header>
          <Table basic="very" celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Day</Table.HeaderCell>
                <Table.HeaderCell>Activity</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="/images/avatar/small/lena.png"
                      rounded
                      size="mini"
                    />
                    <Header.Content>
                      Monday
                      <Header.Subheader>Human Resources</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>24</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="/images/avatar/small/matthew.png"
                      rounded
                      size="mini"
                    />
                    <Header.Content>
                      Tuesday
                      <Header.Subheader>Fabric Design</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>Warm</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="/images/avatar/small/lindsay.png"
                      rounded
                      size="mini"
                    />

                    <Header.Content>
                      Wednesday
                        <Header.Subheader>Human Resources</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="/images/avatar/small/matthew.png"
                      rounded
                      size="mini"
                    />

                    <Header.Content>
                      Thursday
                        <Header.Subheader>Human Resources</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="/images/avatar/small/matthew.png"
                      rounded
                      size="mini"
                    />

                    <Header.Content>
                      Friday
                        <Header.Subheader>Human Resources</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="/images/avatar/small/matthew.png"
                      rounded
                      size="mini"
                    />

                    <Header.Content>
                      Saturday
                        <Header.Subheader>Human Resources</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="/images/avatar/small/matthew.png"
                      rounded
                      size="mini"
                    />

                    <Header.Content>
                      Sunday
                        <Header.Subheader>Entertainment</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>Cold</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </TransitionablePortal>

      <TransitionablePortal onClose={handleChatClose} open={chatState.chatOpen}>
        <Segment
          style={{
            position: "fixed",
            left: "76%",
            top: "10%",
            right: "10px",
            bottom: "10px",
            zIndex: 1001
          }}
        >
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
      </TransitionablePortal>
    </div>
  );
};

export default CourtCard;
