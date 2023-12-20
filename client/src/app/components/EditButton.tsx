import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

interface EditButtonProps {
  onEditClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onEditClick }) => {
  return (
    <Button color="primary" onClick={onEditClick} startIcon={<EditIcon />}>
      Edit
    </Button>
  );
};

export default EditButton;
