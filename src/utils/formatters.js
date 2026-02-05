import moment from 'moment';

export const formatDuration = (duration) => {
  if (!duration) return '0:00';
  
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const formatViewCount = (count) => {
  if (!count) return '0 views';
  
  const num = parseInt(count);
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B views`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M views`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K views`;
  }
  return `${num} views`;
};

export const formatPublishedDate = (date) => {
  if (!date) return 'Unknown';
  return moment(date).fromNow();
};

export const formatSubscriberCount = (count) => {
  if (!count) return '0 subscribers';
  
  const num = parseInt(count);
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M subscribers`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K subscribers`;
  }
  return `${num} subscribers`;
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
