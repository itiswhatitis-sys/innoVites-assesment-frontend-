import { Chip } from '@mui/material';

export default function StatusChip({ status }: { status: string }) {
  const color =
    status === 'PASS' ? 'success' :
    status === 'WARN' ? 'warning' :
    'error';

  return <Chip label={status} color={color as any} size="small" />;
}
