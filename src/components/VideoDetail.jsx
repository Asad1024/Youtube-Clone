import { Box, Stack, Typography, useTheme, IconButton, Divider, Collapse, Avatar, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams, Link } from 'react-router-dom';
import { fetchData } from '../utils/fetchApi';
import { CheckCircle, ThumbUp, ThumbDown, Share, ExpandMore, ExpandLess, PlaylistAdd } from '@mui/icons-material';
import Videos from './Videos';
import { VideoDetailSkeleton } from './Skeletons';
import { formatViewCount, formatPublishedDate } from '../utils/formatters';
import { addToHistory } from '../utils/localStorage';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const { id } = useParams();
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchData(`videos?part=snippet,statistics&id=${id}`),
      fetchData(`search?part=snippet&relatedToVideoId=${id}&type=video`),
    ])
      .then(([videoData, relatedVideos]) => {
        setVideoDetail(videoData.items[0]);
        setVideos(relatedVideos.items);
        setLoading(false);
        if (videoData.items[0]) {
          addToHistory({ id: { videoId: id }, snippet: videoData.items[0].snippet });
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <VideoDetailSkeleton />;

  if (!videoDetail?.snippet) {
    return (
      <Box
        sx={{
          height: 'calc(100vh - 56px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography color="text.secondary">Video not found</Typography>
      </Box>
    );
  }

  const { snippet: { title, channelId, channelTitle, description, publishedAt }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box
      sx={{
        height: 'calc(100vh - 56px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box sx={{ p: 2 }}>
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} alignItems="flex-start">
          {/* Left: video + info */}
          <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
            {/* 16:9 video */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                pt: '56.25%',
                backgroundColor: '#000',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} width="100%" height="100%" controls />
              </Box>
            </Box>

            {/* Title */}
            <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600, mt: 2, mb: 1 }}>
              {title}
            </Typography>

            {/* Stats + actions */}
            <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1} sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {formatViewCount(viewCount)} · {formatPublishedDate(publishedAt)}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0}>
                <IconButton size="small" sx={{ color: 'text.primary' }}>
                  <ThumbUp fontSize="small" />
                </IconButton>
                <Typography variant="body2" color="text.secondary" sx={{ px: 0.5 }}>
                  {parseInt(likeCount || 0).toLocaleString()}
                </Typography>
                <IconButton size="small" sx={{ color: 'text.primary' }}>
                  <ThumbDown fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: 'text.primary' }}>
                  <Share fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: 'text.primary' }}>
                  <PlaylistAdd fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Channel */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
              <Link to={`/channel/${channelId}`} style={{ textDecoration: 'none' }}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 48, height: 48 }}>
                    {channelTitle?.charAt(0) || '?'}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                      {channelTitle}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <CheckCircle sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        Verified
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Link>
              <Button variant="contained" color="primary" sx={{ textTransform: 'none', fontWeight: 600 }}>
                Subscribe
              </Button>
            </Stack>

            {/* Description */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ mb: 1 }}>
                {formatPublishedDate(publishedAt)}
              </Typography>
              <Collapse in={showDescription} collapsedSize={48}>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                  {description || 'No description.'}
                </Typography>
              </Collapse>
              <Typography
                variant="body2"
                fontWeight={600}
                color="primary"
                onClick={() => setShowDescription(!showDescription)}
                sx={{ cursor: 'pointer', mt: 0.5, display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
              >
                {showDescription ? 'Show less' : 'Show more'}
                {showDescription ? <ExpandLess /> : <ExpandMore />}
              </Typography>
            </Box>
          </Box>

          {/* Right: related */}
          <Box sx={{ width: { xs: '100%', lg: 400 }, flexShrink: 0 }}>
            <Typography variant="subtitle1" fontWeight={600} color="text.primary" sx={{ mb: 1.5 }}>
              Related videos
            </Typography>
            <Videos videos={videos} direction="column" loading={!videos} />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default VideoDetail;
