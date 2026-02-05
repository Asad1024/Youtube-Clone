import { Box, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';
import { CheckCircle } from '@mui/icons-material';
import { formatSubscriberCount } from '../utils/formatters';

const ChannelCard = ({ channelDetail, marginTop }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        boxShadow: 'none',
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: '100%', sm: '356px', md: '320px' },
        height: '326px',
        margin: 'auto',
        marginTop,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <CardMedia
            image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
            alt={channelDetail?.snippet?.title}
            sx={{
              borderRadius: '50%',
              height: '180px',
              width: '180px',
              mb: 2,
              border: `3px solid ${theme.palette.primary.main}`,
              boxShadow: `0 4px 12px ${theme.palette.mode === 'dark' ? 'rgba(255,0,0,0.3)' : 'rgba(0,0,0,0.2)'}`,
            }}
          />
          <Typography
            variant="h6"
            fontWeight="600"
            color={theme.palette.text.primary}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {channelDetail?.snippet?.title}
            <CheckCircle
              sx={{
                fontSize: 16,
                color: theme.palette.text.secondary,
              }}
            />
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 500,
                color: theme.palette.text.secondary,
                mt: 1,
              }}
            >
              {formatSubscriberCount(channelDetail?.statistics?.subscriberCount)}
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;