import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box
} from '@mui/material';
import EventForm from './EventForm';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import Event from '../lib/definitions';

interface EventDetailsProps {
  selectedEvent: Event | null;
  onClose: () => void;
  onEditClick: (event: Event) => void;
  onDeleteClick: (eventId: number) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  selectedEvent,
  onClose,
  onEditClick,
  onDeleteClick,
}) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const { title, date, location, description, category, id } = selectedEvent || {};

  const handleEditClick = () => {
    onEditClick(selectedEvent!);
    setIsEditFormOpen(true);
  };

  const handleDeleteClick = () => {
    onDeleteClick(selectedEvent!.id);
    onClose();
  };

  return (
    <Dialog open={!!selectedEvent} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <Typography variant="h4" gutterBottom>
          Event Details
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Title: {title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Date: {date}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Location: {location}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Description: {description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Category: {category}
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <EditButton onEditClick={handleEditClick} />
          <DeleteButton onDeleteClick={handleDeleteClick} />
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </DialogContent>
      {isEditFormOpen && (
        <EventForm
          open={isEditFormOpen}
          onClose={() => setIsEditFormOpen(false)}
          onSubmit={() => {}}
          eventToEdit={selectedEvent}
        />
      )}
    </Dialog>
  );
};

export default EventDetails;
