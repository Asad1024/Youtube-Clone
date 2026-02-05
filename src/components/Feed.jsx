import { Box, Typography, useTheme, CircularProgress, Stack, Card, CardMedia } from "@mui/material";
import { useState, useEffect, useRef, useCallback } from "react";
import { fetchData } from "../utils/fetchApi";
import Videos from "./Videos";
import CategoryChips from "./CategoryChips";
import { Link } from "react-router-dom";
import { PlayArrow, TrendingUp } from "@mui/icons-material";

const Feed = () => {
  const [selectCategory, setSelectCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [shorts, setShorts] = useState([]);
  const [breakingNews, setBreakingNews] = useState([]);
  const theme = useTheme();
  const observerRef = useRef();
  const lastVideoRef = useRef();

  useEffect(() => {
    setLoading(true);
    setVideos([]);
    setNextPageToken(null);
    fetchData(`search?part=snippet&q=${selectCategory}&maxResults=12`)
      .then((data) => {
        setVideos(data.items);
        setNextPageToken(data.nextPageToken);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setLoading(false);
      });

    // Fetch shorts
    fetchData('search?part=snippet&q=shorts&type=video&maxResults=6')
      .then((data) => setShorts(data.items))
      .catch((error) => console.error("Error fetching shorts:", error));

    // Fetch breaking news
    fetchData('search?part=snippet&q=breaking+news&type=video&maxResults=6')
      .then((data) => setBreakingNews(data.items))
      .catch((error) => console.error("Error fetching breaking news:", error));
  }, [selectCategory]);

  const loadMoreVideos = useCallback(() => {
    if (!nextPageToken || loadingMore) return;

    setLoadingMore(true);
    fetchData(`search?part=snippet&q=${selectCategory}&maxResults=12&pageToken=${nextPageToken}`)
      .then((data) => {
        setVideos(prev => [...prev, ...data.items]);
        setNextPageToken(data.nextPageToken);
        setLoadingMore(false);
      })
      .catch((error) => {
        console.error("Error loading more videos:", error);
        setLoadingMore(false);
      });
  }, [selectCategory, nextPageToken, loadingMore]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextPageToken && !loadingMore) {
        loadMoreVideos();
      }
    }, options);

    if (lastVideoRef.current) {
      observerRef.current.observe(lastVideoRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreVideos, nextPageToken, loadingMore]);

  const firstRowVideos = videos.slice(0, 6);
  const remainingVideos = videos.slice(6);

  return (
    <Box sx={{ height: 'calc(100vh - 56px)', overflowY: 'auto', backgroundColor: theme.palette.background.default }}>
      <CategoryChips selectedCategory={selectCategory} setSelectedCategory={setSelectCategory} />
      
      <Box p={{ xs: 2, md: 3 }}>
        {/* First 2 rows (8 videos) */}
        <Videos videos={firstRowVideos} loading={loading} />

        {/* Shorts Section */}
        {shorts.length > 0 && (
          <Box sx={{ my: 4 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <PlayArrow sx={{ fontSize: 32, color: theme.palette.primary.main }} />
              <Typography variant="h5" fontWeight="600" color={theme.palette.text.primary}>
                Shorts
              </Typography>
            </Stack>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(3, 1fr)',
                  sm: 'repeat(4, 1fr)',
                  md: 'repeat(5, 1fr)',
                  lg: 'repeat(6, 1fr)',
                },
                gap: 2,
              }}
            >
              {shorts.slice(0, 6).map((short, idx) => (
                <Link key={idx} to={`/short/${short.id?.videoId || short.id}`} style={{ textDecoration: 'none' }}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.05)' },
                      height: { xs: '200px', sm: '250px' },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={short.snippet?.thumbnails?.medium?.url}
                      alt={short.snippet?.title}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Card>
                  <Typography
                    variant="caption"
                    color={theme.palette.text.primary}
                    sx={{
                      mt: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {short.snippet?.title}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>
        )}

        {/* Breaking News Section */}
        {breakingNews.length > 0 && (
          <Box sx={{ my: 4 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <TrendingUp sx={{ fontSize: 32, color: '#ff0000' }} />
              <Typography variant="h5" fontWeight="600" color={theme.palette.text.primary}>
                Breaking News
              </Typography>
            </Stack>
            <Videos videos={breakingNews} />
          </Box>
        )}

        {/* Remaining videos */}
        <Videos videos={remainingVideos} />
        
        <Box ref={lastVideoRef} sx={{ height: '20px', mt: 2 }} />
        {loadingMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Feed;
