import React, { useEffect, Fragment } from "react";
import { Segment, Header, Table, Image, List, Label } from "semantic-ui-react";

const CourtWeeklyComponent = () => {
  return (
    <Table basic="very" celled collapsing>
      <Table.Header>
        {/* <Table.Row>
          <Table.HeaderCell>Day</Table.HeaderCell>
          <Table.HeaderCell>Activity Level</Table.HeaderCell>
        </Table.Row> */}
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/monday.png" />
              <Header.Content>
                Monday
                <Header.Subheader>Acitivty Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            <Label size="large" circular color="red">
              Hot
            </Label>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/tuesday.png" />
              <Header.Content>
                Tuesday
                <Header.Subheader>Acitivty Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            <Label size="large" circular color="red">
              Hot
            </Label>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/wednesday.png" />
              <Header.Content>
                Wednesday
                <Header.Subheader>Acitivty Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            <Label size="large" circular color="red">
              Hot
            </Label>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/thursday.png" />
              <Header.Content>
                Thursday
                <Header.Subheader>Acitivty Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            <Label size="large" circular color="red">
              Hot
            </Label>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/friday.png" />
              <Header.Content>
                Thursday
                <Header.Subheader>Acitivty Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            <Label size="large" circular color="red">
              Hot
            </Label>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/saturday.png" />
              <Header.Content>
                Thursday
                <Header.Subheader>Acitivty Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            <Label size="large" circular color="red">
              Hot
            </Label>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="https://img.icons8.com/cute-clipart/64/000000/sunday.png" />
              <Header.Content>
                Thursday
                <Header.Subheader>Acitivty Level</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            <Label size="large" circular color="red">
              Hot
            </Label>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default CourtWeeklyComponent;