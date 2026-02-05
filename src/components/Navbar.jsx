import { Stack, IconButton, Tooltip, useTheme, Box } from "@mui/material";
import { DarkMode, LightMode, Menu as MenuIcon } from "@mui/icons-material";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useThemeMode } from "../context/ThemeContext";

const YOUTUBE_LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg';

const Navbar = ({ onMenuClick }) => {
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const isDark = mode === 'dark';

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={{ xs: 1, md: 1.5 }}
      spacing={{ xs: 1, md: 2 }}
      sx={{
        position: 'sticky',
        background: theme.palette.background.paper,
        top: 0,
        justifyContent: 'space-between',
        zIndex: 999,
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        height: '56px',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton
          onClick={onMenuClick}
          sx={{ color: isDark ? '#fff' : theme.palette.text.primary }}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: 'none' }}>
          <Box
            component="img"
            src={YOUTUBE_LOGO_URL}
            alt="YouTube Clone"
            height={28}
            sx={{
              marginRight: '4px',
              objectFit: 'contain',
            }}
          />
        </Link>
      </Stack>

      <SearchBar />

      <Stack direction="row" alignItems="center" spacing={1}>
        <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: isDark ? '#fff' : theme.palette.text.primary,
              '&:hover': { backgroundColor: theme.palette.action.hover },
            }}
          >
            {isDark ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default Navbar;
