import { Card, CardContent, CardMedia, Typography, Box, Stack, useTheme, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { demoChannelTitle, demoChannelUrl, demoVideoTitle, demoVideoUrl } from "../utils/constants";
import { CheckCircle, Share, WatchLater } from "@mui/icons-material";
import { formatViewCount, formatPublishedDate, truncateText } from "../utils/formatters";
import { addToWatchLater } from "../utils/localStorage";
import { useState } from "react";

const VideoCard = ({ video }) => {
  const { id: { videoId }, snippet } = video;
  const theme = useTheme();
  const [showActions, setShowActions] = useState(false);

  const handleShare = (e) => {
    e.preventDefault();
    const url = `${window.location.origin}/video/${videoId}`;
    if (navigator.share) {
      navigator.share({
        title: snippet?.title,
        url: url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const handleWatchLater = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = addToWatchLater({ id: { videoId }, snippet });
    if (added) alert('Added to Watch later!');
    else alert('Already in Watch later');
  };

  return (
    <Card
      className="video-card fade-in"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <Box className="thumbnail-container" sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={snippet?.thumbnails?.high?.url || snippet?.thumbnails?.medium?.url}
            alt={snippet?.title}
            sx={{
              width: '100%',
              height: 180,
              objectFit: 'cover',
            }}
          />
          {showActions && (
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                gap: 0.5,
              }}
            >
              <Tooltip title="Watch Later">
                <IconButton
                  size="small"
                  onClick={handleWatchLater}
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.9)',
                    },
                  }}
                >
                  <WatchLater fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share">
                <IconButton
                  size="small"
                  onClick={handleShare}
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.9)',
                    },
                  }}
                >
                  <Share fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Link>

      <CardContent
        sx={{
          backgroundColor: theme.palette.background.paper,
          p: 1.5,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            color={theme.palette.text.primary}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 1,
              lineHeight: 1.3,
              height: '2.6em',
              fontSize: '0.95rem',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            {snippet?.title || demoVideoTitle}
          </Typography>
        </Link>

        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
          <Stack direction="row" alignItems="center" spacing={0.5} mb={0.5}>
            <Typography
              variant="caption"
              fontWeight="500"
              color={theme.palette.text.secondary}
              sx={{
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              }}
            >
              {truncateText(snippet?.channelTitle, 25) || truncateText(demoChannelTitle, 25)}
            </Typography>
            <CheckCircle
              sx={{
                fontSize: 12,
                color: theme.palette.text.secondary,
              }}
            />
          </Stack>
        </Link>

        <Typography variant="caption" color={theme.palette.text.secondary} sx={{ display: 'block' }}>
          {snippet?.publishedAt && formatPublishedDate(snippet.publishedAt)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;