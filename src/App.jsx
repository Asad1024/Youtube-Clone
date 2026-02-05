import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, ThemeProvider as MuiThemeProvider, CssBaseline, Stack } from "@mui/material";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import VideoDetail from "./components/VideoDetail";
import ChannelDetail from "./components/ChannelDetail";
import SearchFeed from "./components/SearchFeed";
import YTSidebar from "./components/YTSidebar";
import History from "./components/History";
import WatchLater from "./components/WatchLater";
import Shorts from "./components/Shorts";
import { ThemeProvider, useThemeMode } from "./context/ThemeContext";
import { darkTheme, lightTheme } from "./theme";
import { useState } from "react";

const AppContent = () => {
  const { mode } = useThemeMode();
  const theme = mode === 'dark' ? darkTheme : lightTheme;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ backgroundColor: theme.palette.background.default, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Navbar onMenuClick={toggleSidebar} />
          <Stack direction="row" sx={{ flex: 1, overflow: 'hidden' }}>
            <YTSidebar isOpen={sidebarOpen} />
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/shorts" element={<Shorts />} />
                <Route path="/short/:id" element={<Shorts />} />
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path="/channel/:id" element={<ChannelDetail />} />
                <Route path="/search/:searchTerm" element={<SearchFeed />} />
                <Route path="/history" element={<History />} />
                <Route path="/watch-later" element={<WatchLater />} />
              </Routes>
            </Box>
          </Stack>
        </Box>
      </Router>
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;