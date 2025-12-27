import { useEffect, useRef, useState } from 'react';
import { nftCollection, rarityColors, rarityGlow, type NFT } from '../data/nftData';
import { useGameStore } from '../store/gameStore';
import { DarkSideLevelUp } from './DarkSideLevelUp';
import { playLowBassNote, playGlitchSound } from '../utils/sound';
import './UpsideDownBackground.css';

interface AshParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  depth: number; // For parallax effect
}

interface NFTDrop {
  id: string;
  nft: NFT;
  x: number;
  y: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  pulsePhase: number;
}

export const UpsideDownBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nftDrops, setNftDrops] = useState<NFTDrop[]>([]);
  const [streak, setStreak] = useState(0);
  const [streakTimer, setStreakTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [rewardMessage, setRewardMessage] = useState('');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const addXP = useGameStore((state) => state.addXP);
  const setLevelUpCallback = useGameStore((state) => state.setLevelUpCallback);
  const ashParticlesRef = useRef<AshParticle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastNFTSpawnRef = useRef<number>(0);

  // Setup level-up callback
  useEffect(() => {
    setLevelUpCallback((level: number) => {
      setNewLevel(level);
      setShowLevelUp(true);
    });
  }, [setLevelUpCallback]);

  // Initialize ash particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create ash particles (subtle mysterious atmosphere)
    const particleCount = 200;
    ashParticlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.2,
      depth: Math.random(), // 0-1, determines parallax speed
    }));

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Spawn NFT drops randomly
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const now = Date.now();
      // Spawn NFT every 3-7 seconds
      const timeSinceLastSpawn = now - lastNFTSpawnRef.current;
      const shouldSpawn = timeSinceLastSpawn > 3000 && Math.random() < 0.3;

      if (shouldSpawn) {
        lastNFTSpawnRef.current = now;
        const randomNFT = nftCollection[Math.floor(Math.random() * nftCollection.length)];

        const newDrop: NFTDrop = {
          id: `${randomNFT.id}-${now}`,
          nft: randomNFT,
          x: Math.random() * window.innerWidth,
          y: -100,
          speedY: Math.random() * 1.5 + 1,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
          scale: 0.8 + Math.random() * 0.4,
          pulsePhase: Math.random() * Math.PI * 2,
        };

        setNftDrops((prev) => [...prev, newDrop]);
      }
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, []);

  // Handle NFT click
  const handleNFTClick = (drop: NFTDrop, event: React.MouseEvent) => {
    event.stopPropagation();

    // Special effect for Legendary/Mythic pickups
    if (drop.nft.rarity === 'Legendary' || drop.nft.rarity === 'Mythic') {
      document.body.classList.add('legendary-pickup');
      playGlitchSound();
      setTimeout(() => {
        document.body.classList.remove('legendary-pickup');
      }, 1000);
    }

    // Remove clicked NFT
    setNftDrops((prev) => prev.filter((d) => d.id !== drop.id));

    // Update streak
    const newStreak = streak + 1;
    setStreak(newStreak);

    // Reset timer
    if (streakTimer) {
      clearTimeout(streakTimer);
    }

    const timer = setTimeout(() => {
      setStreak(0);
    }, 20000); // 20 second window

    setStreakTimer(timer);

    // Check if streak reached 3
    if (newStreak === 3) {
      // Award XP based on rarity
      const rarityMultipliers: Record<string, number> = {
        Common: 50,
        Uncommon: 75,
        Rare: 100,
        Epic: 150,
        Legendary: 250,
        Mythic: 500,
      };

      const baseXP = 100;
      const rarityBonus = rarityMultipliers[drop.nft.rarity] || 50;
      const totalXP = baseXP + rarityBonus;

      addXP(totalXP);
      setRewardMessage(`+${totalXP} XP`);
      setShowReward(true);
      setStreak(0);

      // Trigger screen glitch effect and sound
      document.body.classList.add('glitch-effect');
      playLowBassNote(1200);

      setTimeout(() => {
        document.body.classList.remove('glitch-effect');
        setShowReward(false);
      }, 3000);

      if (streakTimer) {
        clearTimeout(streakTimer);
      }
    }
  };

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw ash particles with parallax
      ashParticlesRef.current.forEach((particle) => {
        particle.y += particle.speedY * (0.5 + particle.depth * 0.5);
        particle.x += particle.speedX * (0.5 + particle.depth * 0.5);

        // Reset particle when it goes off screen
        if (particle.y > canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;

        // Draw ash particle with subtle glow
        const alpha = particle.opacity * (0.5 + particle.depth * 0.3);

        // Add subtle glow
        ctx.shadowBlur = 2;
        ctx.shadowColor = `rgba(100, 100, 100, ${alpha * 0.5})`;

        // Draw main particle
        ctx.fillStyle = `rgba(120, 120, 120, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Update NFT drop positions
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setNftDrops((prev) =>
        prev
          .map((drop) => ({
            ...drop,
            y: drop.y + drop.speedY,
            rotation: drop.rotation + drop.rotationSpeed,
            pulsePhase: drop.pulsePhase + 0.05,
          }))
          .filter((drop) => drop.y < window.innerHeight + 100) // Remove off-screen drops
      );
    }, 16); // ~60fps

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="upside-down-canvas" />

      {/* NFT Drops */}
      {nftDrops.map((drop) => {
        const glowColor = rarityGlow[drop.nft.rarity];
        const rarityColor = rarityColors[drop.nft.rarity];
        const pulse = Math.sin(drop.pulsePhase) * 0.2 + 1;

        return (
          <div
            key={drop.id}
            className="nft-drop"
            style={{
              left: `${drop.x}px`,
              top: `${drop.y}px`,
              transform: `rotate(${drop.rotation}deg) scale(${drop.scale})`,
            }}
            onClick={(e) => handleNFTClick(drop, e)}
          >
            <div
              className="nft-drop-glow"
              style={{
                boxShadow: `0 0 ${30 * pulse}px ${glowColor}, 0 0 ${60 * pulse}px ${glowColor}`,
                borderColor: rarityColor,
              }}
            >
              <div className="nft-drop-name">{drop.nft.name}</div>
              <div className="nft-drop-rarity" style={{ color: rarityColor }}>
                {drop.nft.rarity}
              </div>
            </div>
            {drop.nft.rarity === 'Legendary' || drop.nft.rarity === 'Mythic' ? (
              <div className="nft-drop-ripple" />
            ) : null}
          </div>
        );
      })}

      {/* Streak Counter */}
      {streak > 0 && (
        <div className="streak-counter">
          <div className="streak-text">Streak: {streak}/3</div>
          <div className="streak-bar">
            <div
              className="streak-fill"
              style={{ width: `${(streak / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Reward Notification */}
      {showReward && (
        <div className="reward-notification">
          <div className="reward-glitch">The Upside Down noticed you.</div>
          <div className="reward-xp">{rewardMessage}</div>
        </div>
      )}

      {/* Level Up Screen */}
      {showLevelUp && (
        <DarkSideLevelUp
          level={newLevel}
          onComplete={() => setShowLevelUp(false)}
        />
      )}
    </>
  );
};
