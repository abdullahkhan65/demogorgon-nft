import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useGameStore } from './store/gameStore';
import { CustomCursor } from './components/CustomCursor';
import { SplashScreen } from './components/SplashScreen';
import { Navigation } from './components/Navigation';
import { UpsideDownBackground } from './components/UpsideDownBackground';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import './App.css';

function App() {
  const splashScreenSeen = useGameStore((state) => state.splashScreenSeen);

  return (
    <Router>
      <div className="app">
        <CustomCursor />
        <UpsideDownBackground />

        {!splashScreenSeen && <SplashScreen />}

        {splashScreenSeen && (
          <>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
