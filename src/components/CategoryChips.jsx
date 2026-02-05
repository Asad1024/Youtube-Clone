import { Box, Chip, useTheme } from '@mui/material';
import { categories } from '../utils/constants';
import { useRef, useEffect } from 'react';

const CategoryChips = ({ selectedCategory, setSelectedCategory }) => {
  const theme = useTheme();
  const scrollRef = useRef(null);

  return (
    <Box
      ref={scrollRef}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        px: 3,
        py: 1.5,
        display: 'flex',
        gap: 1.5,
        '&::-webkit-scrollbar': {
          height: '0px',
        },
        scrollbarWidth: 'none',
      }}
    >
      {categories.map((category) => (
        <Chip
          key={category.name}
          label={category.name}
          clickable
          onClick={() => setSelectedCategory(category.name)}
          sx={{
            backgroundColor:
              category.name === selectedCategory
                ? theme.palette.mode === 'dark'
                  ? '#ffffff'
                  : '#0f0f0f'
                : theme.palette.mode === 'dark'
                ? '#272727'
                : '#f2f2f2',
            color:
              category.name === selectedCategory
                ? theme.palette.mode === 'dark'
                  ? '#0f0f0f'
                  : '#ffffff'
                : theme.palette.text.primary,
            fontWeight: category.name === selectedCategory ? 600 : 500,
            fontSize: '0.875rem',
            height: '32px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor:
                category.name === selectedCategory
                  ? theme.palette.mode === 'dark'
                    ? '#ffffff'
                    : '#0f0f0f'
                  : theme.palette.mode === 'dark'
                  ? '#3f3f3f'
                  : '#e5e5e5',
            },
            transition: 'all 0.2s ease',
          }}
        />
      ))}
    </Box>
  );
};

export default CategoryChips;
