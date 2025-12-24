'use client';

import { DataGrid } from '@mui/x-data-grid';
import { Chip, Box } from '@mui/material';

export default function ResultsTable({ data }: any) {
  const columns = [
    { field: 'field', headerName: 'Attribute', flex: 1 },
    { field: 'provided', headerName: 'Provided', flex: 1 },
    { field: 'expected', headerName: 'Expected', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          color={
            params.value === 'PASS'
              ? 'success'
              : params.value === 'WARN'
              ? 'warning'
              : 'error'
          }
          size="small"
        />
      ),
    },
    { field: 'comment', headerName: 'Comment', flex: 2 },
  ];

  const rows = data.results.map((r: any, idx: number) => ({
    id: idx,
    ...r,
  }));

  return (
    <Box height={400}>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
