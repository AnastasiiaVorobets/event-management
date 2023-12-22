import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  List,
  CardContent,
  Card,
  Divider,
} from '@mui/material';
import EventForm from './EventForm';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import Event from '../lib/definitions';
import { formatDate } from '../lib/formatDate';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface EventDetailsProps {
  selectedEvent: Event | null;
  onClose: () => void;
  onEditClick: (event: Event) => void;
  onDeleteClick: (eventId: number) => void;
  recommendedEvents: Event[];
  onDetailsClick: (event: Event) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  selectedEvent,
  onClose,
  onEditClick,
  onDeleteClick,
  recommendedEvents,
  onDetailsClick,
}) => {
  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false);

  if (!selectedEvent) {
    return null;
  }

  const { title, date, location, description, category, id } = selectedEvent;

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
          Event Details:
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Title: {title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Date: {formatDate(date)}
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
        </Box>

        {recommendedEvents.length > 0 && (
          <div>
          <Divider sx={{ borderBottom: '2px solid #1976D2', marginY: '8px' }} />
            <Typography variant="h5" gutterBottom marginTop="30px">
              Recommended Events:
            </Typography>
            <List>
              {recommendedEvents.map((event) => (
                <Card key={event.id} variant="outlined" style={{ marginBottom: '10px' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {event.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {formatDate(event.date)}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {event.location}
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="space-between">
                    

                      <Button variant="outlined" startIcon={<VisibilityIcon />} onClick={() => onDetailsClick(event)}>
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </List>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="contained" onClick={onClose}>
                Close
              </Button>
            </Box>
          </div>
        )}
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
