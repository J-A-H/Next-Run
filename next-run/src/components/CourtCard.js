import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

class CourtCard extends Component {
  render() {
    return (
      <Card
      link
      header='Basketball Court 1'
      meta='Scientist'
      description={[
        'Rick is a genius scientist whose alcoholism and reckless,',
        ' nihilistic behavior are a source of concern for his family.',
      ].join('')}
    />
    );
  }
}

export default CourtCard;