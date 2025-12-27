import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import './SplashScreen.css';

export const SplashScreen = () => {
  const [showPortal, setShowPortal] = useState(true);
  const setSplashScreenSeen = useGameStore((state) => state.setSplashScreenSeen);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPortal(false);
      setTimeout(() => {
        setSplashScreenSeen();
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, [setSplashScreenSeen]);

  return (
    <AnimatePresence>
      {showPortal && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Upside Down Portal */}
          <motion.div
            className="portal-container"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            <div className="portal">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="portal-ring"
                  style={{
                    width: `${100 + i * 40}px`,
                    height: `${100 + i * 40}px`,
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? 360 : -360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                />
              ))}
              <motion.div
                className="portal-core"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>

          {/* Tentacles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`tentacle-${i}`}
              className="tentacle"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: 'center',
                rotate: `${(360 / 12) * i}deg`,
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{
                scaleY: [0, 1, 0.8, 1],
                opacity: [0, 0.8, 0.6, 0],
              }}
              transition={{
                duration: 2,
                delay: 1 + i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Title */}
          <motion.div
            className="splash-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <h1 className="glitch" data-text="DEMOGORGON">
              DEMOGORGON
            </h1>
            <motion.p
              className="splash-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              ENTER THE UPSIDE DOWN
            </motion.p>
          </motion.div>

          {/* Particles */}
          <div className="splash-particles">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Static/Noise overlay */}
          <div className="noise-overlay" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
