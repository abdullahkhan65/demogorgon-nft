import { motion } from 'framer-motion';
import './VecnaSwitch.css';

interface VecnaSwitchProps {
  isActive: boolean;
  onToggle: () => void;
}

export default function VecnaSwitch({ isActive, onToggle }: VecnaSwitchProps) {
  return (
    <div className="vecna-switch-container">
      <motion.button
        className={`vecna-switch ${isActive ? 'active' : ''}`}
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Hive Mind Eye Icon */}
        <div className="hive-mind-eye">
          <div className="eye-outer">
            <div className="eye-iris">
              <div className="eye-pupil"></div>
            </div>
          </div>
          {/* Connecting tendrils that pulse when active */}
          {isActive && (
            <>
              <div className="tendril tendril-1"></div>
              <div className="tendril tendril-2"></div>
              <div className="tendril tendril-3"></div>
              <div className="tendril tendril-4"></div>
            </>
          )}
        </div>

        {/* Glowing border that intensifies when active */}
        <div className={`switch-glow ${isActive ? 'glow-active' : ''}`}></div>

        {/* Tooltip */}
        <div className="switch-tooltip">
          {isActive ? 'Vecna Watches...' : 'Summon Vecna'}
        </div>
      </motion.button>
    </div>
  );
}
