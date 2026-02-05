import { Box, Typography, useTheme, Button, Stack, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { getWatchLater, removeFromWatchLater } from '../utils/localStorage';
import Videos from './Videos';
import { Schedule, DeleteOutline } from '@mui/icons-material';

const WatchLater = () => {
  const [videos, setVideos] = useState([]);
  const theme = useTheme();

  const load = () => {
    setVideos(getWatchLater());
  };

  useEffect(() => {
    load();
  }, []);

  const handleClearAll = () => {
    if (window.confirm('Remove all videos from Watch later?')) {
      videos.forEach((v) => {
        const id = v.id?.videoId || v.id;
        removeFromWatchLater(id);
      });
      setVideos([]);
    }
  };

  return (
    <Box
      sx={{
        height: 'calc(100vh - 56px)',
        overflowY: 'auto',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box p={{ xs: 2, md: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Schedule sx={{ fontSize: 32, color: theme.palette.primary.main }} />
            <Typography variant="h4" fontWeight="bold" color={theme.palette.text.primary}>
              Watch later
            </Typography>
          </Stack>
          {videos.length > 0 && (
            <Button
              variant="outlined"
              startIcon={<DeleteOutline />}
              onClick={handleClearAll}
              sx={{
                borderColor: theme.palette.divider,
                color: theme.palette.text.primary,
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              Clear all
            </Button>
          )}
        </Stack>

        {videos.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 8, py: 8 }}>
            <Schedule sx={{ fontSize: 64, color: theme.palette.text.secondary, opacity: 0.5, mb: 2 }} />
            <Typography variant="h6" color={theme.palette.text.secondary} gutterBottom>
              No videos in Watch later
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              Save videos to watch later by clicking the clock icon on a video
            </Typography>
          </Box>
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Box>
  );
};

export default WatchLater;
