import EventCard from './EventCard';
import Event from '../lib/definitions';
import { Grid } from '@mui/material';

interface EventListProps {
  events: Event[];
  onDeleteClick: (eventId: number) => void;
  onEditClick: (event: Event) => void;
  onDetailsClick: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onDeleteClick, onEditClick, onDetailsClick }) => {
  return (
    <Grid container spacing={2}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
          onDetailsClick={onDetailsClick}
        />
      ))}
    </Grid>
  );
};

export default EventList;
