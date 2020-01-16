import React, { useEffect, Fragment, useState } from "react";
import { Header, Label, Image, Button, Card, Popup } from "semantic-ui-react";
import CourtWeeklyComponent from "./CourtWeeklyComponent";
import objectAssign from "object-assign";
import './CourtCard.css';

const CourtDetailShow = ({ court, getWeeklyPeakTimes, getDailyPeakTimes }) => {
  const [state, setState] = useState({});
  const [weeklyState, setWeeklyState] = useState({})

  /**
   * Updates state with correct daily and weekly information
   * @param {*} count
   */
  const initializeDailyAcitivtyLevels = async timeOfDay => {
    const hoursData = await getDailyPeakTimes(court.id);

    console.log(hoursData);

    let result = 0;

    switch (timeOfDay) {
      case "Morning":
        // let result = 0;
        Object.keys(hoursData).forEach(hour => {
          if (hour >= 5 && hour <= 12) {
            result += hoursData[hour];
          }
        });

        setState(prevState => ({
          ...prevState,
          Morning: result
        }));

        break;
      case "Afternoon":
        // let result = 0;
        Object.keys(hoursData).forEach(hour => {
          if (hour >= 13 && hour <= 17) {
            result += hoursData[hour];
          }
        });

        setState(prevState => ({
          ...prevState,
          Afternoon: result
        }));

        break;
      case "Evening":
        // let result = 0;
        Object.keys(hoursData).forEach(hour => {
          if (hour >= 18 && hour <= 22) {
            result += hoursData[hour];
          }
        });

        setState(prevState => ({
          ...prevState,
          Evening: result
        }));

        break;
      case "Night":
        // let result = 0;
        Object.keys(hoursData).forEach(hour => {
          if (hour >= 23 && hour <= 4) {
            result += hoursData[hour];
          }
        });

        setState(prevState => ({
          ...prevState,
          Night: result
        }));

        break;
    }
  };

  /**
   * Updates state with correct weekly information
   * @param {*} timeOfWeek
   */
  const initializeWeeklyActivityLevels = async () => {
    const dailyData = await getWeeklyPeakTimes(court.id);

    Object.keys(dailyData).forEach(day => {
      let newState = { ...weeklyState };
      weeklyState[day] = dailyData[day];

      setWeeklyState(newState);
    });
  };

  /**
   * Displays correct lable according to daily counts
   * @param {} count 
   */
  const displayActivityLevel = count => {
    if (count < 8) {
      return (
        <Label size="large" circular color="blue">
          Cold
        </Label>
      );
    } else if (count < 12 && count >= 8) {
      return (
        <Label size="large" circular color="orange">
          Warm
        </Label>
      );
    } else {
      return (
        <Label size="large" circular color="red">
          Hot
        </Label>
      );
    }
  };

  /**
   * Displays correct label according to weekly counts
   * @param {} count 
   */
  const displayWeeklyActivityLevel = count => {
    if (count <= 10) {
      return (
        <Label size="large" circular color="blue">
          Cold
        </Label>
      );
    }

    else if (count <= 50 && count > 10) {
      return (
        <Label size="large" circular color="orange">
          Warm
        </Label>
      );
    }

    else {
      return (
        <Label size="large" circular color="red">
          Hot
        </Label>
      );
    }
  };

  useEffect(() => {
    initializeDailyAcitivtyLevels("Morning");
    initializeDailyAcitivtyLevels("Afternoon");
    initializeDailyAcitivtyLevels("Evening");
    initializeDailyAcitivtyLevels("Night");

    initializeWeeklyActivityLevels();
  }, []);

  return (
    <div>
      <Header as="h2">
        <Image
          circular
          src="https://img.icons8.com/dotty/80/000000/basketball-2.png"
        />
        {court.name}
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
                <CourtWeeklyComponent displayWeeklyActivityLevel={displayWeeklyActivityLevel} />
              </Popup>
              <Card.Header>Morning</Card.Header>
              <Card.Meta>Usual activity level</Card.Meta>
              <Card.Description>
                {displayActivityLevel(state.Morning)}
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
                <CourtWeeklyComponent displayWeeklyActivityLevel={displayWeeklyActivityLevel} />
              </Popup>
              <Card.Header>Afternoon</Card.Header>
              <Card.Meta>Usual activity level</Card.Meta>
              <Card.Description>
                {displayActivityLevel(state.Afternoon)}
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
                <CourtWeeklyComponent displayWeeklyActivityLevel={displayWeeklyActivityLevel} />
              </Popup>
              <Card.Header>Evening</Card.Header>
              <Card.Meta>Usual activity level</Card.Meta>
              <Card.Description>
                {displayActivityLevel(state.Evening)}
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
                <CourtWeeklyComponent displayWeeklyActivityLevel={displayWeeklyActivityLevel} />
              </Popup>
              <Card.Header>Night</Card.Header>
              <Card.Meta>Usual activity level</Card.Meta>
              <Card.Description>
                {displayActivityLevel(state.Night)}
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
  );
};

export default CourtDetailShow;
