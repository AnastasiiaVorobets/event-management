import React from 'react';
import Link from 'next/link';
import { Typography, Paper, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Event from '../../lib/definitions';

const EventDetailsPage: React.FC<{ event: Event }> = () => {

  const pageStyle = {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const backButtonStyle = {
    marginRight: 10,
  };

  return (
    <Paper elevation={3} style={pageStyle}>
    <Link href="/events">
      <Button style={backButtonStyle} startIcon={<ArrowBackIcon />}>
        Go Back to Events
      </Button>
    </Link>
  
      {/* <Typography variant="h2" style={titleStyle}>
        {event.title}
      </Typography>
      <Typography variant="subtitle1">Date: {event.date}</Typography>
      <Typography variant="subtitle1">Location: {event.location}</Typography>
      <Typography variant="body1">Category: {event.description}</Typography>
      <Typography variant="body1" style={{ marginTop: 15 }}>
        Description: {event.description}
      </Typography> */}
    </Paper>
  );
};

export default EventDetailsPage;
