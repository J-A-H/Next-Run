import React, { useEffect, Fragment } from "react";
import { Segment, Header, Table, Image, List, Label } from "semantic-ui-react";
import './CourtCard.css'
const CourtWeeklyComponent = props => {
  const { displayWeeklyActivityLevel } = props;

  return (
    <div className="Weekly">
    <Table basic="very" celled collapsing>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/monday.png" />
              <Header.Content>
                Monday
                <Header.Subheader>Activity Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>{displayWeeklyActivityLevel(1)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/tuesday.png" />
              <Header.Content>
                Tuesday
                <Header.Subheader>Activity Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>{displayWeeklyActivityLevel(2)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/wednesday.png" />
              <Header.Content>
                Wednesday
                <Header.Subheader>Activity Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>{displayWeeklyActivityLevel(3)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/thursday.png" />
              <Header.Content>
                Thursday
                <Header.Subheader>Activity Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>{displayWeeklyActivityLevel(4)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/friday.png" />
              <Header.Content>
                Friday
                <Header.Subheader>Activity Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>{displayWeeklyActivityLevel(5)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/saturday.png" />
              <Header.Content>
                Saturday
                <Header.Subheader>Activity Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>{displayWeeklyActivityLevel(6)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/sunday.png" />
              <Header.Content>
                Sunday
                <Header.Subheader>Activity Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>{displayWeeklyActivityLevel(0)}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    </div>
  );
};

export default CourtWeeklyComponent;
