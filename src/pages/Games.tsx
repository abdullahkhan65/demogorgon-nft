import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DemogorgonRunner } from '../games/DemogorgonRunner';
import { MindFlayerMatch } from '../games/MindFlayerMatch';
import './Games.css';

type GameType = 'runner' | 'memory' | null;

export const Games = () => {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);

  const games = [
    {
      id: 'runner' as GameType,
      title: 'ESCAPE THE DEMOGORGON',
      description: 'An endless runner where you dodge obstacles and try to survive as long as possible',
      icon: '🏃',
      color: 'rgba(255, 0, 0, 0.3)',
      gradient: 'linear-gradient(135deg, rgba(255, 0, 0, 0.2) 0%, rgba(139, 0, 0, 0.2) 100%)',
    },
    {
      id: 'memory' as GameType,
      title: 'MIND FLAYER MATCH',
      description: 'A memory matching game where you pair symbols from the Upside Down',
      icon: '🧠',
      color: 'rgba(157, 0, 255, 0.3)',
      gradient: 'linear-gradient(135deg, rgba(157, 0, 255, 0.2) 0%, rgba(100, 0, 200, 0.2) 100%)',
    },
  ];

  if (selectedGame) {
    return (
      <div className="game-play-container">
        <motion.button
          className="back-button"
          onClick={() => setSelectedGame(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          ← BACK TO GAMES
        </motion.button>
        {selectedGame === 'runner' && <DemogorgonRunner />}
        {selectedGame === 'memory' && <MindFlayerMatch />}
      </div>
    );
  }

  return (
    <div className="games-container">
      <motion.div
        className="games-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="games-title">
          <span className="title-glitch" data-text="ARCADE">
            ARCADE
          </span>
        </h1>
        <p className="games-subtitle">Choose Your Challenge</p>
      </motion.div>

      <div className="games-grid">
        <AnimatePresence>
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              className="game-card"
              style={{ background: game.gradient }}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedGame(game.id)}
            >
              <div className="game-card-glow" style={{ background: game.color }}></div>
              <div className="game-icon">{game.icon}</div>
              <h2 className="game-title">{game.title}</h2>
              <p className="game-description">{game.description}</p>
              <motion.button
                className="play-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                PLAY NOW
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="games-info"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="info-card">
          <span className="info-icon">⚡</span>
          <div className="info-content">
            <h3 className="info-title">Earn XP</h3>
            <p className="info-text">Play games to earn XP and level up your profile</p>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">🏆</span>
          <div className="info-content">
            <h3 className="info-title">Unlock Achievements</h3>
            <p className="info-text">Complete challenges to unlock special achievements</p>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">📈</span>
          <div className="info-content">
            <h3 className="info-title">Beat High Scores</h3>
            <p className="info-text">Compete against yourself and set new records</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
