import { Stack, useTheme, Box } from '@mui/material';
import { categories } from '../utils/constants';

const Sidebar = ({ selectCategory, setSelectCategory }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        overflowY: 'auto',
        overflowX: 'hidden',
        height: { xs: 'auto', md: 'calc(100% - 60px)' },
        pb: 2,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.primary.main,
          borderRadius: '10px',
        },
      }}
    >
      <Stack
        direction={{ xs: 'row', md: 'column' }}
        spacing={0.5}
        sx={{
          width: '100%',
        }}
      >
        {categories.map((category) => (
          <Box
            key={category.name}
            onClick={() => setSelectCategory(category.name)}
            className={`category-btn ${category.name === selectCategory ? 'selected' : ''}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 2.5,
              py: 1.5,
              cursor: 'pointer',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              color: theme.palette.text.primary,
              backgroundColor: category.name === selectCategory ? theme.palette.primary.main : 'transparent',
              minWidth: { xs: 'auto', md: '100%' },
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: category.name === selectCategory ? theme.palette.primary.main : theme.palette.action.hover,
                transform: { md: 'translateX(8px)' },
              },
            }}
          >
            <Box
              sx={{
                color: category.name === selectCategory ? 'white' : theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.2rem',
              }}
            >
              {category.icon}
            </Box>
            <Box
              sx={{
                opacity: category.name === selectCategory ? '1' : '0.9',
                fontWeight: category.name === selectCategory ? '600' : '500',
                color: category.name === selectCategory ? 'white' : theme.palette.text.primary,
                fontSize: '0.95rem',
                display: { xs: 'none', md: 'block' },
              }}
            >
              {category.name}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Sidebar;