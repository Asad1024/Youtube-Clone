import { Box, Card, CardContent, Divider, Skeleton, Stack } from '@mui/material';

export const VideoCardSkeleton = () => {
  return (
    <Card sx={{ width: '100%', boxShadow: 'none', borderRadius: 2 }}>
      <Skeleton variant="rectangular" height={180} animation="wave" />
      <CardContent sx={{ backgroundColor: 'background.paper', height: '106px' }}>
        <Skeleton variant="text" width="90%" height={24} animation="wave" />
        <Skeleton variant="text" width="70%" height={20} animation="wave" />
        <Skeleton variant="text" width="50%" height={20} animation="wave" />
      </CardContent>
    </Card>
  );
};

export const ChannelCardSkeleton = () => {
  return (
    <Box sx={{ width: { xs: '100%', sm: '358px', md: '320px' }, textAlign: 'center' }}>
      <Skeleton variant="circular" width={180} height={180} sx={{ margin: '0 auto' }} animation="wave" />
      <Skeleton variant="text" width="60%" height={32} sx={{ margin: '16px auto 8px' }} animation="wave" />
      <Skeleton variant="text" width="40%" height={24} sx={{ margin: '0 auto' }} animation="wave" />
    </Box>
  );
};

export const VideoDetailSkeleton = () => {
  return (
    <Box sx={{ height: 'calc(100vh - 56px)', overflow: 'hidden', p: 2 }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} alignItems="flex-start">
        <Box flex={1} sx={{ width: '100%' }}>
          <Box sx={{ position: 'relative', width: '100%', pt: '56.25%', borderRadius: 1, overflow: 'hidden' }}>
            <Skeleton variant="rectangular" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} animation="wave" />
          </Box>
          <Skeleton variant="text" width="90%" height={32} sx={{ mt: 2, mb: 1 }} animation="wave" />
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Skeleton variant="text" width={100} height={24} animation="wave" />
            <Skeleton variant="circular" width={28} height={28} animation="wave" />
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Skeleton variant="circular" width={48} height={48} animation="wave" />
              <Skeleton variant="text" width={120} height={24} animation="wave" />
            </Stack>
            <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2 }} animation="wave" />
          </Stack>
          <Skeleton variant="rectangular" width="100%" height={72} sx={{ borderRadius: 2 }} animation="wave" />
        </Box>
        <Box sx={{ width: { xs: '100%', lg: 400 }, flexShrink: 0 }}>
          <Skeleton variant="text" width={120} height={28} sx={{ mb: 1.5 }} animation="wave" />
          <Stack spacing={2}>
            {[...Array(5)].map((_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export const FeedSkeleton = () => {
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
      {[...Array(12)].map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </Stack>
  );
};
