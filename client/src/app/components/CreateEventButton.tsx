import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface CreateEventButtonProps {
  onClick: () => void;
}

const CreateEventButton: React.FC<CreateEventButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      color="primary"
      aria-label="create event"
      onClick={onClick}
      sx={{
        borderRadius: '10px',
        padding: '14px 30px',
        fontSize: '1.2rem',
        backgroundColor: 'transparent',
        border: '2px solid',
        transition: 'background-color 0.5s, color 0.5s',
        borderColor: (theme) => theme.palette.primary.main,
        '&:hover': {
          backgroundColor: (theme) => theme.palette.primary.main,
          color: 'white',
        },
      }}
    >
      <AddCircleIcon sx={{ fontSize: '1.5rem', marginRight: '8px' }} />
      <span style={{ marginLeft: '8px' }}>Create Event</span>
    </IconButton>
  );
};

export default CreateEventButton;
