import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import CourtCard from './CourtCard'

class CourtListContainer extends Component {
  render() {
    return (
      <div style={{ position: 'relative', zIndex: '2', maxWidth: 350, maxHeight: 400, overflow: 'auto' }}>
      <div style={{ position: 'relative', opacity: 0.5, backgroundColor: "#0099ff", position: 'relative', zIndex: '2', height: 100, maxWidth: 350, maxHeight: 400, overflow: 'auto', padding: 10 }}>
        <Container />
      </div>
      <div style={{ opacity: 1, margin: 20, zIndex: 3 }}>
        <CourtCard />
        <CourtCard />
        <CourtCard />
        <CourtCard />

      </div>
      </div>
    );
  }
}

export default CourtListContainer;