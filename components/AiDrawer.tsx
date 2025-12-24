import { Drawer, Box, Typography, LinearProgress } from '@mui/material';

export default function AiDrawer({ open, onClose, confidence }: any) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box width={300} p={2}>
        <Typography variant="h6">AI Confidence</Typography>
        <LinearProgress
          variant="determinate"
          value={confidence * 100}
          sx={{ mt: 2 }}
        />
        <Typography mt={1}>{Math.round(confidence * 100)}%</Typography>

        <Typography mt={3} variant="body2">
          Validation performed using AI-based interpretation of IEC 60502-1.
        </Typography>
      </Box>
    </Drawer>
  );
}
