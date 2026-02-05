import { Box, Typography, useTheme, Button, Stack, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { getHistory, clearHistory } from '../utils/localStorage';
import Videos from './Videos';
import { Delete, DeleteOutline } from '@mui/icons-material';

const History = () => {
  const [historyVideos, setHistoryVideos] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const history = getHistory();
    setHistoryVideos(history);
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear all watch history?')) {
      clearHistory();
      setHistoryVideos([]);
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 56px)', overflowY: 'auto', backgroundColor: theme.palette.background.default }}>
      <Box p={{ xs: 2, md: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold" color={theme.palette.text.primary}>
            Watch History
          </Typography>
          {historyVideos.length > 0 && (
            <Button
              variant="outlined"
              startIcon={<DeleteOutline />}
              onClick={handleClearHistory}
              sx={{
                borderColor: theme.palette.divider,
                color: theme.palette.text.primary,
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              Clear History
            </Button>
          )}
        </Stack>

        {historyVideos.length === 0 ? (
          <Box 
            sx={{ 
              textAlign: 'center', 
              mt: 8,
              py: 8,
            }}
          >
            <Typography variant="h6" color={theme.palette.text.secondary} gutterBottom>
              No watch history yet
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              Videos you watch will appear here
            </Typography>
          </Box>
        ) : (
          <Videos videos={historyVideos} />
        )}
      </Box>
    </Box>
  );
};

export default History;
