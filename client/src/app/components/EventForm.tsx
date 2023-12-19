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
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const [title, setTitle] = useState(eventToEdit?.title || '');
  const [date, setDate] = useState(eventToEdit?.date || getCurrentDateTime());
  const [location, setLocation] = useState(eventToEdit?.location || '');
  const [category, setCategory] = useState(eventToEdit?.category || '');
  const [description, setDescription] = useState(eventToEdit?.description || '');
  const [errors, setErrors] = useState<Record<string, string>>({});


  useEffect(() => {
    if (open) {
      setTitle(eventToEdit?.title || '');
      setDate(eventToEdit?.date || getCurrentDateTime());
      setLocation(eventToEdit?.location || '');
      setCategory(eventToEdit?.category || '');
      setDescription(eventToEdit?.description || '');
      setErrors({});
    }
  }, [open, eventToEdit]);

  const isValid = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required.';
    }

    if (!date) {
      newErrors.date = 'Date is required.';
    }

    if (!location.trim()) {
      newErrors.location = 'Location is required.';
    }

    if (!category.trim()) {
      newErrors.category = 'Category is required.';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
  if (!isValid()) {
    return;
  }

  const formattedDate = new Date(date).toISOString().replace('T', ' ').slice(0, -8);

  const newEvent: Event = {
    id: eventToEdit?.id || 0,
    title,
    date: formattedDate,
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
  };
};

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{eventToEdit ? 'Edit Event' : 'Create Event'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill out the form to {eventToEdit ? 'edit' : 'create'} an event.
        </DialogContentText>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.date}
          helperText={errors.date}
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.location}
          helperText={errors.location}
        />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.category}
          helperText={errors.category}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          margin="normal"
          error={!!errors.description}
          helperText={errors.description}
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
