import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { playVecnaRumble } from '../utils/sound';
import './VecnaActivation.css';

interface VecnaActivationProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function VecnaActivation({ isActive, onComplete }: VecnaActivationProps) {
  const [phase, setPhase] = useState<'intro' | 'question' | 'takeover'>('intro');

  useEffect(() => {
    if (!isActive) {
      setPhase('intro');
      return;
    }

    // Play ominous Vecna sound
    playVecnaRumble();

    // Animation sequence
    const timer1 = setTimeout(() => setPhase('question'), 1500);
    const timer2 = setTimeout(() => setPhase('takeover'), 4000);
    const timer3 = setTimeout(() => onComplete(), 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="vecna-activation-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Pulsing vignette background */}
          <div className="vecna-vignette"></div>

          {/* Hive Mind Network - connecting lines */}
          <div className="hive-network">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="network-line"
                style={{
                  '--angle': `${(360 / 12) * i}deg`,
                  '--delay': `${i * 0.1}s`,
                } as React.CSSProperties}
              ></div>
            ))}
          </div>

          {/* Vecna's Eyes - watching from above */}
          <div className="vecna-eyes-large">
            <div className="vecna-eye-large left-eye">
              <div className="eye-glow"></div>
              <div className="eye-iris-large">
                <div className="eye-pupil-large"></div>
              </div>
            </div>
            <div className="vecna-eye-large right-eye">
              <div className="eye-glow"></div>
              <div className="eye-iris-large">
                <div className="eye-pupil-large"></div>
              </div>
            </div>
          </div>

          {/* Mind Control Particles */}
          <div className="mind-particles">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="mind-particle"
                style={{
                  '--x': `${Math.random() * 100}vw`,
                  '--y': `${Math.random() * 100}vh`,
                  '--delay': `${Math.random() * 3}s`,
                  '--duration': `${2 + Math.random() * 2}s`,
                } as React.CSSProperties}
              ></div>
            ))}
          </div>

          {/* Central Message Area */}
          <div className="vecna-message-container">
            {/* Phase 1: Intro - Screen cracks and distorts */}
            {phase === 'intro' && (
              <motion.div
                className="screen-crack"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 10, rotate: 360 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              ></motion.div>
            )}

            {/* Phase 2: The Question - "Are you ready?" */}
            {phase === 'question' && (
              <motion.div
                className="vecna-question"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
              >
                <div className="question-text glitch" data-text="ARE YOU READY?">
                  ARE YOU READY?
                </div>
                <div className="question-subtitle">
                  The Hive Mind Awakens
                </div>
              </motion.div>
            )}

            {/* Phase 3: Takeover - Vecna's presence intensifies */}
            {phase === 'takeover' && (
              <motion.div
                className="vecna-takeover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="takeover-text glitch-intense" data-text="I SEE YOU">
                  I SEE YOU
                </div>

                {/* Expanding consciousness rings */}
                <div className="consciousness-rings">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="consciousness-ring"
                      style={{
                        '--ring-delay': `${i * 0.2}s`,
                      } as React.CSSProperties}
                    ></div>
                  ))}
                </div>

                {/* Vecna's hand reaching */}
                <div className="vecna-hand">
                  <svg viewBox="0 0 100 150" className="hand-svg">
                    <path
                      d="M50 150 Q45 120 40 100 L35 80 Q32 60 35 40 M50 150 Q50 120 48 100 L48 70 Q48 50 48 30 M50 150 Q55 120 58 100 L60 75 Q62 55 60 35 M50 150 Q60 125 65 105 L68 85 Q70 65 68 45"
                      stroke="#ff0044"
                      strokeWidth="3"
                      fill="none"
                      className="hand-path"
                    />
                    {/* Claws */}
                    <circle cx="35" cy="40" r="4" fill="#8b0000" className="claw" />
                    <circle cx="48" cy="30" r="4" fill="#8b0000" className="claw" />
                    <circle cx="60" cy="35" r="4" fill="#8b0000" className="claw" />
                    <circle cx="68" cy="45" r="4" fill="#8b0000" className="claw" />
                  </svg>
                </div>
              </motion.div>
            )}
          </div>

          {/* Tentacles descending from top */}
          <div className="vecna-tentacles">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="vecna-tentacle"
                style={{
                  '--tentacle-delay': `${i * 0.15}s`,
                  left: `${10 + i * 11}%`,
                } as React.CSSProperties}
              ></div>
            ))}
          </div>

          {/* Blood-red lightning strikes */}
          <div className="blood-lightning">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="lightning-bolt"
                style={{
                  '--bolt-delay': `${i * 0.5}s`,
                  left: `${Math.random() * 100}%`,
                } as React.CSSProperties}
              ></div>
            ))}
          </div>

          {/* Screen distortion overlay */}
          <div className="screen-distortion"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
