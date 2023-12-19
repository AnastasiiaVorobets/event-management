// components/EventDetails.tsx

import React from 'react';
import Event from '../lib/definitions'; // Make sure to import your Event type

interface EventDetailsProps {
  event: Event;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <div>
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Category: {event.category}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default EventDetails;
