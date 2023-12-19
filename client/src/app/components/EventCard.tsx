"use client";
import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import Event from '../lib/definitions';
import Link from 'next/link';

interface EventCardProps {
  event: Event;
  onDeleteClick: (eventId: number) => void;
  onEditClick: (event: Event) => void;
  onViewDetailsClick: (eventId: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDeleteClick, onEditClick, onViewDetailsClick }) => {
  return (
    <Grid item key={event.id} xs={12} sm={6} md={4}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">{event.title}</Typography>
          <Typography variant="subtitle1">{event.date}</Typography>
          <Typography variant="body2">{event.location}</Typography>
          <Typography variant="body2">{event.description.slice(0, 60)}...</Typography>
          <Button color="primary" onClick={() => onDeleteClick(event.id)}>
            Delete
          </Button>
          <Button color="primary" onClick={() => onEditClick(event)}>
            Edit
          </Button>

          <Link href={`/events/${event.id}`}>
            <Button onClick={(e) => { e.preventDefault(); onViewDetailsClick(event.id); }}>View Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EventCard;
