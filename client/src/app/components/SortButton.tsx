import { Button } from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

interface SortButtonProps {
  field: 'title' | 'date';
  label: string;
  sortField: 'title' | 'date' | 'category';
  sortOrder: 'asc' | 'desc';
  onClick: (field: 'title' | 'date') => void;
}

const SortButton: React.FC<SortButtonProps> = ({ field, label, sortField, sortOrder, onClick }) => (
  <Button
    variant="outlined"
    color="primary"
    style={{
      margin: '20px 0',
      marginRight: '15px',
      borderRadius: '10px',
    }}
    onClick={() => onClick(field)}
    endIcon={
      sortField === field ? (
        sortOrder === 'asc' ? (
          <ArrowDropUp />
        ) : (
          <ArrowDropDown />
        )
      ) : null
    }
  >
    {label}
  </Button>
);

export default SortButton;
