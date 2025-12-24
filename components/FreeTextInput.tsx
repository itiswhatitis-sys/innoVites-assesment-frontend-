import { TextField } from '@mui/material';

export default function FreeTextInput({ value, onChange }: any) {
  return (
    <TextField
      label="Cable Description"
      multiline
      rows={4}
      fullWidth
      value={value}
      onChange={e => onChange(e.target.value)}
      sx={{ mt: 2 }}
    />
  );
}
