import React, { useEffect, Fragment } from "react";
import { Header, Label, Image, Button, Card, Popup } from "semantic-ui-react";
import CourtWeeklyComponent from "./CourtWeeklyComponent";

const CourtDetailShow = () => {
  
  return (
    <div>
      <Header as="h2">
        <Image
          circular
          src="https://img.icons8.com/dotty/80/000000/basketball-2.png"
        />
        David Crombie Court
      </Header>
      <Card.Group>
        <Card>
          <Card.Content>
            <Popup
              on="click"
              pinned
              trigger={
                <Button floated="right" size="small" color="green">
                  Weekly
                </Button>
              }
            >
              <CourtWeeklyComponent />
            </Popup>
            <Card.Header>Morning</Card.Header>
            <Card.Meta>Activity level</Card.Meta>
            <Card.Description>
              <Label size="large" circular color="red">
                Hot
              </Label>
            </Card.Description>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Popup
              on="click"
              pinned
              trigger={
                <Button floated="right" size="small" color="green">
                  Weekly
                </Button>
              }
            >
              <CourtWeeklyComponent />
            </Popup>
            <Card.Header>Afternoon</Card.Header>
            <Card.Meta>Activity level</Card.Meta>
            <Card.Description>
              <Label size="large" circular color="red">
                Hot
              </Label>
            </Card.Description>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Popup
              on="click"
              pinned
              trigger={
                <Button floated="right" size="small" color="green">
                  Weekly
                </Button>
              }
            >
              <CourtWeeklyComponent />
            </Popup>
            <Card.Header>Evening</Card.Header>
            <Card.Meta>Activity level</Card.Meta>
            <Card.Description>
              <Label size="large" circular color="red">
                Hot
              </Label>
            </Card.Description>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Popup
              on="click"
              pinned
              trigger={
                <Button floated="right" size="small" color="green">
                  Weekly
                </Button>
              }
            >
              <CourtWeeklyComponent />
            </Popup>
            <Card.Header>Night</Card.Header>
            <Card.Meta>Activity level</Card.Meta>
            <Card.Description>
              <Label size="large" circular color="red">
                Hot
              </Label>
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
};

export default CourtDetailShow;
