import { InputAdornment, Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ value, onChange }) => (
  <Input
    type="text"
    placeholder="Filter by Title"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      marginLeft: '10px',
      padding: '20px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '200px',
      height: '30px',
      margin: '20px 0',
    }}
    startAdornment={
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    }
  />
);

export default FilterInput;
