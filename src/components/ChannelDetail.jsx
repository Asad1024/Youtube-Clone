import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../utils/fetchApi';
import { Box, useTheme } from '@mui/material';
import ChannelCard from './ChannelCard';
import Videos from './Videos';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchData(`channels?part=snippet,statistics&id=${id}`),
      fetchData(`search?channelId=${id}&part=snippet&order=date`)
    ])
      .then(([channelData, videosData]) => {
        setChannelDetail(channelData?.items[0]);
        setVideos(videosData?.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching channel details:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <Box minHeight="95vh" sx={{ backgroundColor: theme.palette.background.default }}>
      <Box>
        <Box
          sx={{
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(90deg, rgba(255,0,0,0.3) 0%, rgba(139,0,0,0.5) 100%)'
              : 'linear-gradient(90deg, rgba(255,77,77,0.5) 0%, rgba(255,0,0,0.7) 100%)',
            zIndex: 10,
            height: '300px',
          }}
        />
        <ChannelCard marginTop="-110px" channelDetail={channelDetail} />
      </Box>
      <Box display="flex" justifyContent="center" p={3}>
        <Videos videos={videos} loading={loading} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;