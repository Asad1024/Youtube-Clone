import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Avatar,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/fetchApi';
import ReactPlayer from 'react-player';
import {
  ThumbUp,
  ChatBubbleOutline,
  Share,
  MoreHoriz,
  VolumeOff,
  VolumeUp,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { formatViewCount } from '../utils/formatters';

const Shorts = () => {
  const { id: urlId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [shorts, setShorts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const currentShort = shorts[currentIndex];
  const videoId = currentShort
    ? currentShort.id?.videoId || currentShort.id
    : urlId;

  const fetchShorts = useCallback(() => {
    setLoading(true);
    const normalize = (data) => {
      const raw = data?.items || [];
      return raw.filter(
        (v) => v.id?.videoId && (v.snippet?.thumbnails?.medium?.url || v.snippet?.thumbnails?.default?.url)
      );
    };
    const searchQuery = 'search?part=snippet&q=shorts&type=video&maxResults=25';
    fetchData(searchQuery)
      .then((data) => {
        let items = normalize(data);
        if (items.length === 0) {
          return fetchData('search?part=snippet&q=music&type=video&maxResults=25').then(normalize);
        }
        return Promise.resolve(items);
      })
      .then(async (items) => {
        if (urlId) {
          const found = items.findIndex(
            (item) => (item.id?.videoId || item.id) === urlId
          );
          if (found === -1) {
            try {
              const videoData = await fetchData(`videos?part=snippet,statistics&id=${urlId}`);
              const single = videoData?.items?.[0];
              if (single) {
                items = [{ id: { videoId: urlId }, snippet: single.snippet, statistics: single.statistics }, ...items];
              }
            } catch (_) {}
          }
        }
        setShorts(items);
        if (urlId) {
          const idx = items.findIndex(
            (item) => (item.id?.videoId || item.id) === urlId
          );
          setCurrentIndex(idx >= 0 ? idx : 0);
        } else {
          setCurrentIndex(0);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Shorts fetch error:', err);
        setShorts([]);
        setLoading(false);
      });
  }, [urlId]);

  useEffect(() => {
    fetchShorts();
  }, [fetchShorts]);

  useEffect(() => {
    if (!currentShort || !videoId) return;
    const id = currentShort.id?.videoId || currentShort.id;
    if (urlId === id) return;
    navigate(`/short/${id}`, { replace: !urlId });
  }, [currentIndex, currentShort, videoId, urlId, navigate]);

  const goNext = useCallback(() => {
    if (currentIndex >= shorts.length - 1 || transitioning) return;
    setTransitioning(true);
    setPlaying(false);
    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setPlaying(true);
      setTransitioning(false);
    }, 200);
  }, [currentIndex, shorts.length, transitioning]);

  const goPrev = useCallback(() => {
    if (currentIndex <= 0 || transitioning) return;
    setTransitioning(true);
    setPlaying(false);
    setTimeout(() => {
      setCurrentIndex((i) => i - 1);
      setPlaying(true);
      setTransitioning(false);
    }, 200);
  }, [currentIndex, transitioning]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowUp') goPrev();
      if (e.key === 'Escape') navigate('/shorts');
    };
    let wheelLock = false;
    const onWheel = (e) => {
      e.preventDefault();
      if (wheelLock) return;
      if (Math.abs(e.deltaY) < 20) return;
      wheelLock = true;
      if (e.deltaY > 0) goNext();
      else goPrev();
      setTimeout(() => { wheelLock = false; }, 600);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
    };
  }, [goNext, goPrev, navigate]);

  const handleShare = () => {
    const url = `${window.location.origin}/short/${videoId}`;
    if (navigator.share) {
      navigator.share({ title: currentShort?.snippet?.title, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied!');
    }
  };

  if (loading && shorts.length === 0) {
    return (
      <Box
        sx={{
          height: 'calc(100vh - 56px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!currentShort) {
    return (
      <Box
        sx={{
          height: 'calc(100vh - 56px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Typography color="text.secondary">No short found</Typography>
      </Box>
    );
  }

  const { snippet, statistics } = currentShort;
  const views = statistics?.viewCount;

  return (
    <Box
      sx={{
        height: 'calc(100vh - 56px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.background.default,
        position: 'relative',
        gap: 3,
      }}
    >
      {/* Up/Down arrows - outside reel, left side with space between */}
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ flexShrink: 0 }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          disabled={currentIndex === 0}
          sx={{
            color: theme.palette.text.primary,
            bgcolor: theme.palette.background.paper,
            boxShadow: theme.shadows[4],
            '&:hover': { bgcolor: theme.palette.action.hover },
            '&.Mui-disabled': { color: theme.palette.text.disabled },
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          disabled={currentIndex >= shorts.length - 1}
          sx={{
            color: theme.palette.text.primary,
            bgcolor: theme.palette.background.paper,
            boxShadow: theme.shadows[4],
            '&:hover': { bgcolor: theme.palette.action.hover },
            '&.Mui-disabled': { color: theme.palette.text.disabled },
          }}
        >
          <KeyboardArrowDown />
        </IconButton>
      </Stack>

      {/* Centered reel column - 9:16, slightly reduced height */}
      <Box
        sx={{
          position: 'relative',
          height: '92%',
          maxHeight: '92%',
          width: 'min(100%, calc((100vh - 56px) * 0.92 * 9 / 16))',
          maxWidth: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: theme.shadows[12],
          bgcolor: theme.palette.background.paper,
          opacity: transitioning ? 0.92 : 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        {/* Video - fills container 9:16 */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            pt: '177.78%',
            bgcolor: theme.palette.background.paper,
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
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              playing={playing}
              loop
              muted={muted}
              width="100%"
              height="100%"
              style={{ objectFit: 'cover' }}
              config={{
                youtube: {
                  playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                    fs: 0,
                    disablekb: 1,
                  },
                },
              }}
            />
          </Box>

          {/* Tap to play/pause */}
          <Box
            onClick={() => setPlaying((p) => !p)}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              cursor: 'pointer',
              zIndex: 5,
            }}
          />

          {/* Right rail - YouTube style: avatar, like, comment, share, more */}
          <Stack
            sx={{
              position: 'absolute',
              right: 12,
              bottom: 100,
              zIndex: 10,
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setMuted((m) => !m);
              }}
              sx={{
                color: '#fff',
                bgcolor: 'rgba(0,0,0,0.4)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
              }}
            >
              {muted ? <VolumeOff fontSize="small" /> : <VolumeUp fontSize="small" />}
            </IconButton>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                border: '2px solid',
                borderColor: 'background.paper',
                bgcolor: theme.palette.primary.main,
                fontSize: '1rem',
              }}
            >
              {snippet?.channelTitle?.charAt(0) || '?'}
            </Avatar>
            <IconButton
              sx={{
                color: '#fff',
                flexDirection: 'column',
                gap: 0.25,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <ThumbUp sx={{ fontSize: 28 }} />
              <Typography variant="caption" sx={{ color: 'inherit', fontSize: 11 }}>
                {parseInt(statistics?.likeCount || 0).toLocaleString() || 'Like'}
              </Typography>
            </IconButton>
            <IconButton
              sx={{
                color: '#fff',
                flexDirection: 'column',
                gap: 0.25,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <ChatBubbleOutline sx={{ fontSize: 28 }} />
              <Typography variant="caption" sx={{ color: 'inherit', fontSize: 11 }}>
                Comment
              </Typography>
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              sx={{
                color: '#fff',
                flexDirection: 'column',
                gap: 0.25,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <Share sx={{ fontSize: 28 }} />
              <Typography variant="caption" sx={{ color: 'inherit', fontSize: 11 }}>
                Share
              </Typography>
            </IconButton>
            <IconButton
              sx={{
                color: '#fff',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <MoreHoriz />
            </IconButton>
          </Stack>

          {/* Bottom left - title + channel (single block, no duplicate) */}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 60,
              bottom: 0,
              zIndex: 10,
              p: 2,
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
              color: '#fff',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mb: 0.5,
              }}
            >
              {snippet?.title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95 }}>
              {snippet?.channelTitle}
            </Typography>
            {views && (
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {formatViewCount(views)}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Shorts;
