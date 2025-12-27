import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaImage } from 'react-icons/fa';
import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import VecnaSwitch from './VecnaSwitch';
import VecnaActivation from './VecnaActivation';
import './Navigation.css';

export const Navigation = () => {
  const location = useLocation();
  const user = useGameStore((state) => state.user);
  const toggleVecnaMode = useGameStore((state) => state.toggleVecnaMode);
  const [showVecnaActivation, setShowVecnaActivation] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/gallery', label: 'Gallery', icon: <FaImage /> },
  ];

  const xpProgress = (user.xp % 1000) / 1000;

  const handleVecnaToggle = () => {
    if (!user.vecnaModeActive) {
      // Activating Vecna mode - show the creepy animation first
      setShowVecnaActivation(true);
    } else {
      // Deactivating - just toggle off
      toggleVecnaMode();
    }
  };

  const handleVecnaActivationComplete = () => {
    // Animation is done, now toggle the mode on
    setShowVecnaActivation(false);
    toggleVecnaMode();
  };

  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <span className="logo-text">DEMOGORGON</span>
            <span className="logo-subtitle">NFT Collection</span>
          </Link>

          <div className="nav-links">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className="nav-link-wrapper">
                  <motion.div
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="nav-link-underline"
                        layoutId="underline"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="nav-user-info">
            <VecnaSwitch
              isActive={user.vecnaModeActive}
              onToggle={handleVecnaToggle}
            />

            <div className="user-level">
              <span className="level-badge">LVL {user.level}</span>
            </div>
            <div className="user-xp">
              <div className="xp-bar">
                <motion.div
                  className="xp-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="xp-text">
                {user.xp % 1000} / 1000 XP
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Vecna Activation Animation Overlay */}
      <VecnaActivation
        isActive={showVecnaActivation}
        onComplete={handleVecnaActivationComplete}
      />
    </>
  );
};
