import { Box, Stack, Typography, useTheme, Divider } from '@mui/material';
import { Home, PlayCircleOutline, History, ThumbUpOffAlt, Schedule } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const YTSidebar = ({ isOpen }) => {
  const theme = useTheme();

  const menuItems = [
    { name: 'Home', icon: <Home />, path: '/' },
    { name: 'Shorts', icon: <PlayCircleOutline />, path: '/shorts' },
  ];

  const youItems = [
    { name: 'History', icon: <History />, path: '/history' },
    { name: 'Watch later', icon: <Schedule />, path: '/watch-later' },
    { name: 'Liked videos', icon: <ThumbUpOffAlt />, path: '#' },
  ];

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        width: '180px',
        height: 'calc(100vh - 56px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        py: 1,
        transition: 'all 0.3s ease',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.mode === 'dark' ? '#606060' : '#d0d0d0',
          borderRadius: '10px',
        },
      }}
    >
      <Stack spacing={0.5} px={1}>
        {menuItems.map((item) => (
          <Link to={item.path} key={item.name} style={{ textDecoration: 'none' }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                px: 1.5,
                py: 1.2,
                borderRadius: '10px',
                cursor: 'pointer',
                color: theme.palette.text.primary,
                backgroundColor: item.name === 'Home' ? (theme.palette.mode === 'dark' ? '#272727' : '#f2f2f2') : 'transparent',
                fontWeight: item.name === 'Home' ? 600 : 400,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#272727' : '#f2f2f2',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <Box sx={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </Box>
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                {item.name}
              </Typography>
            </Stack>
          </Link>
        ))}
      </Stack>

      <Divider sx={{ my: 1.5 }} />

      <Stack spacing={0.5} px={1}>
        <Typography
          variant="body2"
          sx={{
            px: 1.5,
            py: 1,
            color: theme.palette.text.primary,
            fontWeight: 600,
            fontSize: '0.8rem',
          }}
        >
          You
        </Typography>
        {youItems.map((item) => (
          <Link to={item.path} key={item.name} style={{ textDecoration: 'none' }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                px: 1.5,
                py: 1.2,
                borderRadius: '10px',
                cursor: 'pointer',
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#272727' : '#f2f2f2',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <Box sx={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </Box>
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                {item.name}
              </Typography>
            </Stack>
          </Link>
        ))}
      </Stack>

      <Divider sx={{ my: 1.5 }} />

      <Typography
        variant="caption"
        sx={{
          px: 3,
          py: 2,
          color: theme.palette.text.secondary,
          display: 'block',
          fontSize: '0.75rem',
        }}
      >
        © 2026 YouTube Clone
      </Typography>
    </Box>
  );
};

export default YTSidebar;
