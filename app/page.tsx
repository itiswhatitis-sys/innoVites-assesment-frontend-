'use client';

import { useState } from 'react';
import {
  Stack,
  Paper,
  Typography,
  CircularProgress,
  Drawer,
  Box,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import InputPanel from '@/components/InputPanel';
import { classifyInput } from '@/utils/classifyInput';
import ResultsTable from '@/components/ResultsTable';

type InputType = 'DB' | 'JSON' | 'TEXT';

function buildRequest(type: InputType, payload: any) {
  if (type === 'DB') return { designId: payload };
  if (type === 'JSON') return { structuredInput: payload };
  return { freeText: payload };
}

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedType, setDetectedType] = useState<InputType | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const validate = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const classified = classifyInput(input);
      setDetectedType(classified.type as InputType);

      const body = buildRequest(classified.type as InputType, classified.payload);

      const res = await fetch('http://localhost:3001/design/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Validation failed');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">IEC Analyser</Typography>
          <Button
            variant="contained"
            onClick={() => setDrawerOpen(prev => !prev)}
          >
            {drawerOpen ? 'Close AI Summary' : 'Open AI Summary'}
          </Button>
        </Stack>

        <Paper sx={{ p: 3, backgroundColor: 'background.paper' }}>
          <InputPanel
            value={input}
            onChange={setInput}
            onSubmit={validate}
            loading={loading}
          />
          {loading && (
            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <CircularProgress size={20} />
              <Typography variant="body2">Validating...</Typography>
            </Stack>
          )}
          {detectedType && !loading && (
            <Typography variant="caption" color="textSecondary">
              Detected input type: {detectedType}
            </Typography>
          )}
          {error && (
            <Typography variant="body2" color="error" mt={1}>
              {error}
            </Typography>
          )}
        </Paper>

        {result && <ResultsTable data={result} />}
      </Stack>

      {/* Right Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 350, p: 2, height: '100%', overflowY: 'auto' }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                AI Summary
              </Typography>
              {result ? (
                <>
                 <Typography variant="body1">
  Confidence: {Math.round((result.confidence ?? 0) * 100)}%
</Typography>
                  <Typography
                    variant="body1"
                    color={result.overallStatus === 'PASS' ? 'green' : 'red'}
                  >
                    Overall Status: {result.overallStatus}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2">No data yet.</Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </Drawer>
    </>
  );
}
