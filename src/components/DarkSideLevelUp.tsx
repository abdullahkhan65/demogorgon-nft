import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playVecnaRumble } from '../utils/sound';
import './DarkSideLevelUp.css';

interface DarkSideLevelUpProps {
  level: number;
  onComplete: () => void;
}

export const DarkSideLevelUp = ({ level, onComplete }: DarkSideLevelUpProps) => {
  const [phase, setPhase] = useState<'fade-in' | 'main' | 'fade-out'>('fade-in');

  useEffect(() => {
    // Play Vecna rumble sound
    playVecnaRumble();

    // Fade in
    const fadeInTimer = setTimeout(() => {
      setPhase('main');
    }, 500);

    // Main display
    const mainTimer = setTimeout(() => {
      setPhase('fade-out');
    }, 4000);

    // Fade out and complete
    const fadeOutTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(mainTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [onComplete]);

  const messages = [
    'The Dark Side Notices You',
    'The Upside Down Beckons',
    'Vecna Sees Your Power',
    'The Mind Flayer Watches',
    'Reality Fractures Before You',
    'The Shadow Realm Calls',
  ];

  const message = messages[Math.min(level - 2, messages.length - 1)] || messages[0];

  return (
    <AnimatePresence>
      <div className="dark-side-overlay">
        <motion.div
          className="dark-side-vignette"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'fade-out' ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Glitch lines */}
        <div className="glitch-lines">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="glitch-line"
              style={{
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Tentacles */}
        <div className="tentacles-container">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="tentacle"
              style={{
                left: `${(i / 8) * 100}%`,
                transformOrigin: `50% 0%`,
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{
                scaleY: phase === 'fade-out' ? 0 : 1,
                opacity: phase === 'fade-out' ? 0 : 0.7,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <motion.div
          className="dark-side-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: phase === 'fade-out' ? 0 : 1,
            scale: phase === 'fade-out' ? 1.2 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Vecna eyes effect */}
          <div className="vecna-eyes">
            <div className="vecna-eye left-eye" />
            <div className="vecna-eye right-eye" />
          </div>

          {/* Message */}
          <motion.h1
            className="dark-side-message"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: phase === 'fade-out' ? 0 : 1,
              y: phase === 'fade-out' ? -50 : 0,
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {message}
          </motion.h1>

          {/* Level display */}
          <motion.div
            className="level-display"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: phase === 'fade-out' ? 0 : 1,
              scale: phase === 'fade-out' ? 0 : 1,
            }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="level-ring">
              <div className="level-ring-inner">
                <span className="level-text">LEVEL</span>
                <span className="level-number">{level}</span>
              </div>
            </div>
          </motion.div>

          {/* Particles */}
          <div className="dark-particles">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="dark-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Sound wave effect */}
        <div className="sound-waves">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="sound-wave"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{
                scale: phase === 'fade-out' ? 0 : 3,
                opacity: 0,
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: phase === 'fade-out' ? 0 : Infinity,
              }}
            />
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};
