import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useGameStore } from './store/gameStore';
import { CustomCursor } from './components/CustomCursor';
import { SplashScreen } from './components/SplashScreen';
import { Navigation } from './components/Navigation';
import { ParticleBackground } from './components/ParticleBackground';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { Games } from './pages/Games';
import { Profile } from './pages/Profile';
import './App.css';

function App() {
  const splashScreenSeen = useGameStore((state) => state.splashScreenSeen);

  return (
    <Router>
      <div className="app">
        <CustomCursor />
        <ParticleBackground />

        {!splashScreenSeen && <SplashScreen />}

        {splashScreenSeen && (
          <>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/games" element={<Games />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
