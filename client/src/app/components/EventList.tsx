"use client";
import React from 'react';
import { Grid } from '@mui/material';
import EventCard from './EventCard';
import Event from '../lib/definitions';

interface EventListProps {
  events: Event[];
  onDeleteClick: (eventId: number) => void;
  onEditClick: (event: Event) => void;
  onViewDetailsClick: (eventId: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onDeleteClick, onEditClick, onViewDetailsClick }) => {
  return (
    <Grid container spacing={2}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onDeleteClick={onDeleteClick} onEditClick={onEditClick} onViewDetailsClick={onViewDetailsClick}/>
      ))}
    </Grid>
  );
};

export default EventList;
