import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Event from '../lib/definitions';

interface EventFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (event: Event) => void;
  eventToEdit?: Event | null;
}

const EventForm: React.FC<EventFormProps> = ({ open, onClose, onSubmit, eventToEdit }) => {
  const [title, setTitle] = useState(eventToEdit?.title || '');
  const [date, setDate] = useState(eventToEdit?.date || '');
  const [location, setLocation] = useState(eventToEdit?.location || '');
  const [category, setCategory] = useState(eventToEdit?.category || '');
  const [description, setDescription] = useState(eventToEdit?.description || '');

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDate(eventToEdit.date);
      setLocation(eventToEdit.location);
      setCategory(eventToEdit.category);
      setDescription(eventToEdit.description);
    }
  }, [eventToEdit]);

  const handleFormSubmit = async () => {
    const newEvent: Event = {
      id: eventToEdit?.id || 0,
      title,
      date,
      location,
      category,
      description,
    };

    const requestOptions = {
      method: eventToEdit ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    };

    try {
      const response = await fetch(
        eventToEdit
          ? `http://localhost:4000/events/${eventToEdit.id}`
          : 'http://localhost:4000/events',
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error submitting event form:', errorData);
      } else {
        const submittedEvent = await response.json();
        onSubmit(submittedEvent);
      }
    } catch (error: any) {
      console.error('Error submitting event form:', error.message);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{eventToEdit ? 'Edit Event' : 'Create Event'}</DialogTitle>
      <DialogContent>
        <DialogContentText>Fill out the form to {eventToEdit ? 'edit' : 'create'} an event.</DialogContentText>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="normal" />
        <TextField label="Date" value={date} onChange={(e) => setDate(e.target.value)} fullWidth margin="normal" />
        <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} fullWidth margin="normal" />
        <TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} fullWidth margin="normal" />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary" variant="contained">
          {eventToEdit ? 'Save Changes' : 'Create Event'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventForm;
