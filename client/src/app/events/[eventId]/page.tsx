// EventPage.tsx

import React from 'react';
import Event from '../../lib/definitions';

interface EventPageProps {
  selectedEvent: Event | null;
}

const EventPage: React.FC<EventPageProps> = ({ selectedEvent }) => {
  if (!selectedEvent) {
    return <div>No event selected</div>;
  }

  const { title, date, location, description } = selectedEvent;

  return (
    <div>
      <h2>{title}</h2>
      <p>Date: {date}</p>
      <p>Location: {location}</p>
      <p>Description: {description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default EventPage;
