import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import { useState, useEffect, useRef, useCallback } from "react";
import { fetchData } from "../utils/fetchApi";
import Videos from "./Videos";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const { searchTerm } = useParams();
  const theme = useTheme();
  const observerRef = useRef();
  const lastVideoRef = useRef();

  useEffect(() => {
    setLoading(true);
    setVideos([]);
    setNextPageToken(null);
    fetchData(`search?part=snippet&q=${searchTerm}&maxResults=12`)
      .then((data) => {
        setVideos(data.items);
        setNextPageToken(data.nextPageToken);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setLoading(false);
      });
  }, [searchTerm]);

  const loadMoreVideos = useCallback(() => {
    if (!nextPageToken || loadingMore) return;

    setLoadingMore(true);
    fetchData(`search?part=snippet&q=${searchTerm}&maxResults=12&pageToken=${nextPageToken}`)
      .then((data) => {
        setVideos(prev => [...prev, ...data.items]);
        setNextPageToken(data.nextPageToken);
        setLoadingMore(false);
      })
      .catch((error) => {
        console.error("Error loading more videos:", error);
        setLoadingMore(false);
      });
  }, [searchTerm, nextPageToken, loadingMore]);

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

  return (
    <Box
      p={3}
      sx={{
        overflowY: "auto",
        minHeight: "calc(100vh - 70px)",
        height: "calc(100vh - 70px)",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        sx={{ color: theme.palette.text.primary }}
      >
        Search results for:{" "}
        <span
          style={{
            color: theme.palette.primary.main,
          }}
        >
          {searchTerm}
        </span>
      </Typography>
      <Videos videos={videos} loading={loading} />
      <Box ref={lastVideoRef} sx={{ height: '20px', mt: 2 }} />
      {loadingMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default SearchFeed;
