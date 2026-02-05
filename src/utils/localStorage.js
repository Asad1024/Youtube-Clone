// Local Storage Utilities for Watch Later and History

const WATCH_LATER_KEY = 'youtube_clone_watch_later';
const HISTORY_KEY = 'youtube_clone_history';

const getVideoId = (v) => v?.id?.videoId || v?.id;

// Watch Later Functions – store shape: { id: { videoId }, snippet }
export const getWatchLater = () => {
  try {
    const data = localStorage.getItem(WATCH_LATER_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading watch later:', error);
    return [];
  }
};

export const addToWatchLater = (video) => {
  try {
    const watchLater = getWatchLater();
    const id = getVideoId(video);
    const exists = watchLater.some((v) => getVideoId(v) === id);
    if (!exists) {
      const item = {
        id: typeof video.id === 'object' ? video.id : { videoId: video.id },
        snippet: video.snippet,
        addedAt: new Date().toISOString(),
      };
      const updated = [item, ...watchLater];
      localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(updated));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to watch later:', error);
    return false;
  }
};

export const removeFromWatchLater = (videoId) => {
  try {
    const watchLater = getWatchLater();
    const updated = watchLater.filter((v) => getVideoId(v) !== videoId);
    localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error removing from watch later:', error);
    return false;
  }
};

export const isInWatchLater = (videoId) => {
  const watchLater = getWatchLater();
  return watchLater.some((v) => getVideoId(v) === videoId);
};

// History Functions
export const getHistory = () => {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
};

export const addToHistory = (video) => {
  try {
    let history = getHistory();
    const videoId = video.id?.videoId || video.id;
    
    // Remove if exists
    history = history.filter(v => {
      const vId = v.id?.videoId || v.id;
      return vId !== videoId;
    });
    
    // Add to beginning
    history = [{ ...video, watchedAt: new Date().toISOString() }, ...history];
    
    // Keep only last 50
    if (history.length > 50) {
      history = history.slice(0, 50);
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Error adding to history:', error);
    return false;
  }
};

export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing history:', error);
    return false;
  }
};
