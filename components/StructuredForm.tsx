'use client';

import { Stack, TextField } from '@mui/material';

export default function StructuredForm({ value = {}, onChange }: any) {
  const update = (k: string, v: any) =>
    onChange({ ...value, [k]: v });

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Standard"
          fullWidth
          value={value.standard || ''}
          onChange={(e) => update('standard', e.target.value)}
        />

        <TextField
          label="Voltage"
          fullWidth
          value={value.voltage || ''}
          onChange={(e) => update('voltage', e.target.value)}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextField
          label="Conductor Material"
          fullWidth
          value={value.conductor_material || ''}
          onChange={(e) =>
            update('conductor_material', e.target.value)
          }
        />

        <TextField
          label="CSA (mm²)"
          type="number"
          fullWidth
          value={value.csa || ''}
          onChange={(e) => update('csa', Number(e.target.value))}
        />
      </Stack>
    </Stack>
  );
}
