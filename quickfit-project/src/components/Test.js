import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Chip } from '@mui/material';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Top 5 Nigerian songs on Apple Music
const top5Songs = [
  { title: 'Organise'},
  { title: 'Joha'},
  { title: 'Terminator'},
  { title: 'Dull'},
  { title: 'Nzaza'},
];

export default function CheckboxesTags() {
  return (
    <Autocomplete
      multiple
      freeSolo
      id="checkboxes-tags-demo"
      options={top5Songs}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title || option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Checkboxes" />
      )}
    />
  );
}