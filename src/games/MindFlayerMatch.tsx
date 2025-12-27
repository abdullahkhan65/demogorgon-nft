import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import './MindFlayerMatch.css';

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const symbols = ['🦇', '👹', '🌑', '⚡', '🔥', '💀', '🕷️', '🗝️'];

export const MindFlayerMatch = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'won'>('menu');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [matches, setMatches] = useState(0);

  const { addXP, incrementGamesPlayed, unlockAchievement, user } = useGameStore();

  const initializeGame = useCallback(() => {
    const cardPairs = [...symbols, ...symbols];
    const shuffled = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setStartTime(Date.now());
    setEndTime(0);
  }, []);

  const startGame = () => {
    setGameState('playing');
    initializeGame();
    incrementGamesPlayed();
  };

  const handleCardClick = (cardId: number) => {
    if (
      gameState !== 'playing' ||
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      cards[cardId].isMatched
    ) {
      return;
    }

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;

      if (cards[first].symbol === cards[second].symbol) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedCards([]);
          setMatches((prev) => prev + 1);

          // Check if game is won
          if (matches + 1 === symbols.length) {
            setTimeout(() => {
              const completionTime = Date.now();
              setEndTime(completionTime);
              setGameState('won');
              const timeTaken = Math.floor((completionTime - startTime) / 1000);
              const xpEarned = Math.max(100 - moves * 5, 20);
              addXP(xpEarned);

              if (timeTaken < 30) {
                unlockAchievement('memory_master');
              }
            }, 500);
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const getTimeTaken = () => {
    if (endTime && startTime) {
      return Math.floor((endTime - startTime) / 1000);
    }
    return 0;
  };

  return (
    <div className="memory-container">
      <div className="memory-game">
        {/* Header */}
        {gameState === 'playing' && (
          <div className="memory-hud">
            <div className="memory-stat">
              <span className="stat-label">MOVES</span>
              <span className="stat-value">{moves}</span>
            </div>
            <div className="memory-stat">
              <span className="stat-label">MATCHES</span>
              <span className="stat-value">
                {matches}/{symbols.length}
              </span>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        {gameState === 'playing' && (
          <div className="memory-grid">
            <AnimatePresence>
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  className={`memory-card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${
                    card.isMatched ? 'matched' : ''
                  }`}
                  onClick={() => handleCardClick(card.id)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: card.id * 0.05 }}
                  whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                  whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
                >
                  <div className="card-inner">
                    <div className="card-front">
                      <div className="card-pattern"></div>
                      <span className="card-logo">🧠</span>
                    </div>
                    <div className="card-back">
                      <span className="card-symbol">{card.symbol}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Menu */}
        {gameState === 'menu' && (
          <motion.div
            className="memory-menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="memory-title">MIND FLAYER MATCH</h2>
            <p className="memory-instructions">
              Match all pairs of symbols as quickly as possible
            </p>
            <p className="memory-instructions-sub">
              Complete in under 30 seconds to unlock an achievement!
            </p>
            <motion.button
              className="memory-btn"
              onClick={startGame}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              START GAME
            </motion.button>
            <div className="memory-stats">
              <p>Games Played: {user.totalGamesPlayed}</p>
            </div>
          </motion.div>
        )}

        {/* Win Screen */}
        {gameState === 'won' && (
          <motion.div
            className="memory-menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="memory-title won">VICTORY!</h2>
            <div className="memory-results">
              <p className="result-stat">
                <span className="result-label">TIME:</span>{' '}
                <span className="result-value">{getTimeTaken()}s</span>
              </p>
              <p className="result-stat">
                <span className="result-label">MOVES:</span>{' '}
                <span className="result-value">{moves}</span>
              </p>
              <p className="memory-xp-earned">
                +{Math.max(100 - moves * 5, 20)} XP EARNED
              </p>
            </div>
            {getTimeTaken() < 30 && (
              <motion.p
                className="memory-achievement"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                🏆 ACHIEVEMENT UNLOCKED! 🏆
                <br />
                <span className="achievement-name">Mind Flayer Mastery</span>
              </motion.p>
            )}
            <motion.button
              className="memory-btn"
              onClick={startGame}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              PLAY AGAIN
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
