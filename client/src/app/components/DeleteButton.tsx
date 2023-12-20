import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonProps {
  onDeleteClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDeleteClick }) => (
  <Button color="primary" onClick={onDeleteClick} startIcon={<DeleteIcon />}>
    Delete
  </Button>
);

export default DeleteButton;
