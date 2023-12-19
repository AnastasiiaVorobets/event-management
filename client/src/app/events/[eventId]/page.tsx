import React from 'react';
import { Typography, Paper, useTheme } from '@mui/material';
import Event from '../../lib/definitions';

interface EventPageProps {
  selectedEvent: Event | null;
}

const EventPage: React.FC<EventPageProps> = ({ selectedEvent }) => {
  const theme = useTheme();

  if (!selectedEvent) {
    return (
      <Paper elevation={3} style={{ padding: 20, margin: 20, backgroundColor: theme.palette.background.default, borderRadius: 10 }}>
        <Typography variant="h5" color="textSecondary" align="center">No event selected</Typography>
      </Paper>
    );
  }

  const { title, date, location, description } = selectedEvent;

  const pageStyle = {
    padding: 20,
    margin: 20,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 10,
    boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1)`,
  };

  return (
    <Paper elevation={3} style={pageStyle}>
      <Typography variant="h2" style={{ color: theme.palette.primary.contrastText, marginBottom: 10 }}>{title}</Typography>
      <Typography variant="subtitle1">Date: {date}</Typography>
      <Typography variant="subtitle1">Location: {location}</Typography>
      <Typography variant="body1">Categoty: {description}</Typography>
      <Typography variant="body1" style={{ marginTop: 15 }}>Description: {description}</Typography>
    </Paper>
  );
};

export default EventPage;
