import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

class CourtCard extends Component {
  render() {
    return (
      <div style={{ opacity: 1, margin: 10, zIndex: 10, }}>
        <Card
          link
          header='Basketball Court 1'
          meta='Scientist'
          description={[
            'Rick is a genius scientist whose alcoholism and reckless,',
            ' nihilistic behavior are a source of concern for his family.',
          ].join('')}
        />
      </div>
    );
  }
}

export default CourtCard;