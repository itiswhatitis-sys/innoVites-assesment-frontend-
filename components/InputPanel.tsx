'use client';

import { TextField, Button, Stack } from '@mui/material';

export default function InputPanel({
  value,
  onChange,
  onSubmit,
  loading,
}: any) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Design input (ID / JSON / text)"
        multiline
        minRows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste design ID, JSON, or free text here..."
      />

      <Button
        variant="contained"
        onClick={onSubmit}
        disabled={!value || loading}
      >
        Validate
      </Button>
    </Stack>
  );
}
