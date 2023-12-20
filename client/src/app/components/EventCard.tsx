import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button
} from '@mui/material';
import Event from '../lib/definitions';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { formatDate } from '../lib/formatDate';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface EventCardProps {
  event: Event;
  onDeleteClick: (eventId: number) => void;
  onEditClick: (event: Event) => void;
  onDetailsClick: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDeleteClick, onEditClick, onDetailsClick }) => {
  const { id, title, date, location, description } = event;

  return (
    <Grid container spacing={2} justifyContent="space-between" direction="column">
      <Grid item key={id} style={{ margin: '15px' }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle1">{formatDate(date)}</Typography>
            <Typography variant="body2">{location}</Typography>
            <Typography variant="body2">{description.slice(0, 50)}...</Typography>

            <Box mt={2} display="flex" justifyContent="space-between">
              <EditButton onEditClick={() => onEditClick(event)} />

              <Button
                variant="outlined"
                color="primary"
                startIcon={<VisibilityIcon />}
                onClick={() => onDetailsClick(event)}
              >
                View Details
              </Button>

              <DeleteButton onDeleteClick={() => onDeleteClick(id)} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EventCard;
