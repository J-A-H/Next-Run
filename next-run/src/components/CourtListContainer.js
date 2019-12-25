import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import CourtCard from './CourtCard'

class CourtListContainer extends Component {
  render() {
    return (
      <div style={{ position: 'absolute', zIndex: '2', maxHeight: 100, overflow: scroll, padding: 10 }}>
        <Container />

        <CourtCard />
        <CourtCard />
        <CourtCard />
        <CourtCard />
        <CourtCard />

      </div>
    );
  }
}

export default CourtListContainer;