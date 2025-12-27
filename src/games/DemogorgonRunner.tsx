import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import './DemogorgonRunner.css';

interface Obstacle {
  id: number;
  x: number;
  type: 'low' | 'high';
}

export const DemogorgonRunner = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [speed, setSpeed] = useState(5);

  const gameLoopRef = useRef<number | undefined>(undefined);
  const obstacleIdRef = useRef(0);

  const { addXP, incrementGamesPlayed, updateHighScore, user } = useGameStore();

  const jump = useCallback(() => {
    if (!isJumping && gameState === 'playing') {
      setIsJumping(true);
      setPlayerY(-150);
      setTimeout(() => {
        setPlayerY(0);
        setTimeout(() => setIsJumping(false), 100);
      }, 400);
    }
  }, [isJumping, gameState]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setObstacles([]);
    setSpeed(5);
    setPlayerY(0);
    setIsJumping(false);
    incrementGamesPlayed();
  };

  const endGame = () => {
    setGameState('gameover');
    updateHighScore('demogorgonRunner', score);
    const xpEarned = Math.floor(score / 10);
    addXP(xpEarned);
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'menu' || gameState === 'gameover') {
          startGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, jump]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    let lastObstacleTime = Date.now();
    let lastScoreTime = Date.now();

    const gameLoop = () => {
      const now = Date.now();

      // Update score
      if (now - lastScoreTime > 100) {
        setScore((prev) => prev + 1);
        lastScoreTime = now;
      }

      // Increase speed over time
      setSpeed((prev) => Math.min(prev + 0.002, 12));

      // Spawn obstacles
      if (now - lastObstacleTime > 1500 - score * 2) {
        setObstacles((prev) => [
          ...prev,
          {
            id: obstacleIdRef.current++,
            x: 800,
            type: Math.random() > 0.5 ? 'low' : 'high',
          },
        ]);
        lastObstacleTime = now;
      }

      // Move obstacles
      setObstacles((prev) =>
        prev
          .map((obs) => ({ ...obs, x: obs.x - speed }))
          .filter((obs) => obs.x > -100)
      );

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, speed, score]);

  // Collision detection
  useEffect(() => {
    if (gameState !== 'playing') return;

    obstacles.forEach((obstacle) => {
      // Player hitbox: x: 100-150, y: playerY to playerY + 60
      // Obstacle hitbox: x: obstacle.x to obstacle.x + 50
      const playerLeft = 100;
      const playerRight = 150;
      const playerBottom = 80 + playerY;
      const playerTop = playerBottom + 60;

      const obstacleLeft = obstacle.x;
      const obstacleRight = obstacle.x + 50;
      const obstacleBottom = obstacle.type === 'low' ? 80 : 160;
      const obstacleTop = obstacleBottom + 50;

      // Check AABB collision
      if (
        playerRight > obstacleLeft &&
        playerLeft < obstacleRight &&
        playerTop > obstacleBottom &&
        playerBottom < obstacleTop
      ) {
        endGame();
      }
    });
  }, [obstacles, playerY, gameState]);

  return (
    <div className="runner-container">
      <div className="runner-game">
        {/* Background */}
        <div className="runner-background">
          <div className="runner-ground"></div>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="runner-bg-line"
              style={{ left: `${i * 50}px` }}
              animate={{ x: [-50, -100] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Score */}
        {gameState === 'playing' && (
          <div className="runner-hud">
            <div className="runner-score">SCORE: {score}</div>
            <div className="runner-high-score">
              BEST: {user.highScores.demogorgonRunner}
            </div>
          </div>
        )}

        {/* Player */}
        {gameState === 'playing' && (
          <motion.div
            className="runner-player"
            animate={{ y: playerY }}
            transition={{ type: 'tween', duration: 0.4 }}
          >
            <div className="player-sprite">🏃</div>
          </motion.div>
        )}

        {/* Obstacles */}
        <AnimatePresence>
          {gameState === 'playing' &&
            obstacles.map((obstacle) => (
              <motion.div
                key={obstacle.id}
                className={`runner-obstacle ${obstacle.type}`}
                style={{ left: obstacle.x }}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {obstacle.type === 'low' ? '🌵' : '🦇'}
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Menu */}
        {gameState === 'menu' && (
          <motion.div
            className="runner-menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="runner-title">ESCAPE THE DEMOGORGON</h2>
            <p className="runner-instructions">
              Press SPACE to jump and avoid obstacles
            </p>
            <p className="runner-instructions-sub">Earn XP based on your score!</p>
            <motion.button
              className="runner-btn"
              onClick={startGame}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              START GAME
            </motion.button>
            <div className="runner-stats">
              <p>High Score: {user.highScores.demogorgonRunner}</p>
              <p>Games Played: {user.totalGamesPlayed}</p>
            </div>
          </motion.div>
        )}

        {/* Game Over */}
        {gameState === 'gameover' && (
          <motion.div
            className="runner-menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="runner-title gameover">CAUGHT!</h2>
            <p className="runner-score-final">SCORE: {score}</p>
            <p className="runner-xp-earned">
              +{Math.floor(score / 10)} XP EARNED
            </p>
            {score > user.highScores.demogorgonRunner && (
              <motion.p
                className="runner-new-record"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                🎉 NEW RECORD! 🎉
              </motion.p>
            )}
            <motion.button
              className="runner-btn"
              onClick={startGame}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              TRY AGAIN
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
