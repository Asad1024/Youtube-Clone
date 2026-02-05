import { IconButton, useTheme, Box, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  const iconColor = isDark ? '#fff' : theme.palette.text.primary;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        maxWidth: 600,
        height: 40,
        borderRadius: 2,
        backgroundColor: isDark ? '#121212' : '#fff',
        border: `1px solid ${isDark ? '#303030' : '#e0e0e0'}`,
        overflow: 'hidden',
        '&:focus-within': {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1.5, color: iconColor }}>
        <SearchIcon sx={{ fontSize: 22, opacity: 0.8 }} />
      </Box>
      <InputBase
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          flex: 1,
          ml: 1,
          mr: 0.5,
          color: isDark ? '#fff' : theme.palette.text.primary,
          '& .MuiInputBase-input': {
            py: 1,
            fontSize: 15,
            '&::placeholder': {
              color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              opacity: 1,
            },
          },
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      {searchTerm && (
        <IconButton
          onClick={() => setSearchTerm('')}
          size="small"
          sx={{ color: iconColor, p: 0.5 }}
          aria-label="clear"
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      )}
      <Box
        sx={{
          width: '1px',
          height: 24,
          backgroundColor: isDark ? '#303030' : '#e0e0e0',
          flexShrink: 0,
          mx: 0.5,
        }}
      />
      <IconButton
        size="small"
        sx={{
          color: iconColor,
          pr: 1,
          '&:hover': {
            backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
          },
        }}
        aria-label="voice search"
      >
        <MicIcon sx={{ fontSize: 22 }} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
