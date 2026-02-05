# 🎥 YouTube Clone - Enhanced Edition

A modern, feature-rich YouTube clone built with React, Vite, and Material-UI. This application provides a seamless video browsing experience with dark/light mode support, responsive design, and advanced features.

## ✨ Features

### 🎨 Design & UI
- **Dark/Light Mode Toggle** - Switch between themes with smooth transitions
- **Modern Material Design** - Clean, intuitive interface using MUI components
- **Responsive Layout** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - Enhanced user experience with CSS animations
- **Skeleton Loaders** - Professional loading states

### 🚀 Core Functionality
- **Video Search** - Real-time search with clear functionality
- **Category Browsing** - Multiple categories with visual feedback
- **Video Playback** - High-quality video player with ReactPlayer
- **Channel Pages** - Detailed channel information and videos
- **Related Videos** - Smart recommendations on video pages
- **View Statistics** - View counts, likes, and publish dates

### 🔧 Technical Features
- **Error Boundary** - Graceful error handling
- **Theme Persistence** - Saves user theme preference
- **Optimized Performance** - Fast loading with Vite
- **Modern React** - Hooks, Context API, and latest patterns
- **Type-Safe** - ESLint configuration for code quality

## 🛠️ Technologies

- **React 18.3** - Latest React with concurrent features
- **Vite 6.0** - Next-generation frontend tooling
- **Material-UI 6.3** - Comprehensive React UI framework
- **React Router 7.1** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Player 2.16** - Video player component
- **Moment.js** - Date formatting and manipulation

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Youtube-Clone
```

2. Install dependencies:
```bash
npm install
```

3. Set up your RapidAPI key:
   - Get your API key from [RapidAPI YouTube v3](https://rapidapi.com/ytdlfree/api/youtube-v31)
   - Update the key in `src/utils/fetchApi.js`

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

### Search Videos
Use the search bar in the navigation to find videos by keywords.

### Browse Categories
Click on category buttons in the sidebar to explore different content types.

### Watch Videos
Click on any video card to view details, watch the video, and see related content.

### Toggle Theme
Click the sun/moon icon in the navbar to switch between light and dark modes.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.jsx      # Navigation with search and theme toggle
│   ├── Sidebar.jsx     # Category sidebar
│   ├── Feed.jsx        # Main feed page
│   ├── VideoCard.jsx   # Video card component
│   ├── VideoDetail.jsx # Video player page
│   ├── ChannelCard.jsx # Channel card component
│   ├── ChannelDetail.jsx # Channel page
│   ├── SearchFeed.jsx  # Search results page
│   ├── Videos.jsx      # Videos grid container
│   ├── Skeletons.jsx   # Loading skeletons
│   └── ErrorBoundary.jsx # Error handling
├── context/            # React context
│   └── ThemeContext.jsx # Theme state management
├── utils/              # Utility functions
│   ├── constants.jsx   # App constants and categories
│   ├── fetchApi.js     # API configuration
│   ├── formatters.js   # Data formatting utilities
│   └── localStorage.js # Local storage helpers
├── theme.js            # MUI theme configuration
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## 🎨 Customization

### Changing Colors
Edit `src/theme.js` to customize the color palette:
```javascript
primary: {
  main: '#FF0000', // Change primary color
}
```

### Adding Categories
Add new categories in `src/utils/constants.jsx`:
```javascript
{ name: 'YourCategory', icon: <YourIcon />, }
```

## 🚀 Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- YouTube API provided by RapidAPI
- Material-UI for the component library
- React and Vite communities

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Note**: This is a learning project and is not affiliated with YouTube or Google.
