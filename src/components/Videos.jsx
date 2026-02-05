import { Box } from '@mui/material';
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';
import { VideoCardSkeleton, ChannelCardSkeleton } from './Skeletons';

const Videos = ({ videos, direction, loading = false }) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 2,
          width: '100%',
        }}
      >
        {[...Array(12)].map((_, idx) => (
          <VideoCardSkeleton key={idx} />
        ))}
      </Box>
    );
  }

  if (!videos?.length) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
        No videos found
      </Box>
    );
  }

  if (direction === 'column') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {videos.map((item, idx) => (
          <Box key={idx} className="fade-in">
            {item.id.videoId && <VideoCard video={item} />}
            {item.id.channelId && <ChannelCard channelDetail={item} />}
          </Box>
        ))}
      </Box>
    );
  }

  // Filter out videos without thumbnails or invalid videos
  const validVideos = videos.filter(item => {
    if (item.id.videoId) {
      return item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url;
    }
    return true; // Keep channel cards
  });

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
        gap: 2,
        width: '100%',
        gridAutoRows: '1fr',
      }}
    >
      {validVideos.map((item, idx) => (
        <Box key={idx} className="fade-in" sx={{ height: '100%' }}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Box>
  );
};

export default Videos;