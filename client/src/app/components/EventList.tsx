import React from 'react';
import { Grid } from '@mui/material';
import EventCard from './EventCard';
import Event from '../lib/definitions';

interface EventListProps {
  events: Event[];
  onDeleteClick: (eventId: number) => void;
  onEditClick: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onDeleteClick, onEditClick }) => {
  return (
    <Grid container spacing={2}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onDeleteClick={onDeleteClick} onEditClick={onEditClick} />
      ))}
    </Grid>
  );
};

export default EventList;
