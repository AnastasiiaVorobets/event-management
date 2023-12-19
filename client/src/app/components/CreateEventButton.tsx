"use client";
import React from 'react';
import Button from '@mui/material/Button';

interface CreateEventButtonProps {
  onClick: () => void;
}


const CreateEventButton: React.FC<CreateEventButtonProps> = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Create Event
    </Button>
  );
};

export default CreateEventButton;
