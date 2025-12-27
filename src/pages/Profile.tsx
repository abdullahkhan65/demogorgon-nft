import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import './Profile.css';

export const Profile = () => {
  const user = useGameStore((state) => state.user);

  const unlockedAchievements = user.achievements.filter((a) => a.unlocked);
  const lockedAchievements = user.achievements.filter((a) => !a.unlocked);

  return (
    <div className="profile-container">
      <motion.div
        className="profile-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="profile-avatar">
          <div className="avatar-ring"></div>
          <div className="avatar-inner">
            <span className="avatar-emoji">👤</span>
          </div>
        </div>
        <div className="profile-info">
          <h1 className="profile-username">{user.username}</h1>
          <div className="profile-level">
            <span className="level-text">LEVEL {user.level}</span>
            <div className="level-bar">
              <motion.div
                className="level-fill"
                initial={{ width: 0 }}
                animate={{ width: `${((user.xp % 1000) / 1000) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <span className="level-xp">
              {user.xp % 1000} / 1000 XP to Level {user.level + 1}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="profile-content">
        {/* Stats Section */}
        <motion.div
          className="profile-section stats-section"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="section-title">STATS</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🎮</div>
              <div className="stat-value">{user.totalGamesPlayed}</div>
              <div className="stat-label">Games Played</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎨</div>
              <div className="stat-value">{user.nftsCollected.length}</div>
              <div className="stat-label">NFTs Viewed</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-value">{user.xp}</div>
              <div className="stat-label">Total XP</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-value">{unlockedAchievements.length}</div>
              <div className="stat-label">Achievements</div>
            </div>
          </div>
        </motion.div>

        {/* High Scores */}
        <motion.div
          className="profile-section"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="section-title">HIGH SCORES</h2>
          <div className="highscores-list">
            <div className="highscore-item">
              <span className="highscore-game">🏃 Demogorgon Runner</span>
              <span className="highscore-value">{user.highScores.demogorgonRunner}</span>
            </div>
            <div className="highscore-item">
              <span className="highscore-game">🧠 Mind Flayer Match</span>
              <span className="highscore-value">{user.highScores.mindFlayerMatch} moves</span>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="profile-section achievements-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="section-title">ACHIEVEMENTS</h2>

          {unlockedAchievements.length > 0 && (
            <div className="achievements-category">
              <h3 className="category-title">Unlocked</h3>
              <div className="achievements-grid">
                {unlockedAchievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className="achievement-card unlocked"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-info">
                      <div className="achievement-name">{achievement.name}</div>
                      <div className="achievement-description">{achievement.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {lockedAchievements.length > 0 && (
            <div className="achievements-category">
              <h3 className="category-title">Locked</h3>
              <div className="achievements-grid">
                {lockedAchievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className="achievement-card locked"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="achievement-icon">🔒</div>
                    <div className="achievement-info">
                      <div className="achievement-name">{achievement.name}</div>
                      <div className="achievement-description">{achievement.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
