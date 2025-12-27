import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface UserProfile {
  username: string;
  level: number;
  xp: number;
  totalGamesPlayed: number;
  highScores: {
    demogorgonRunner: number;
    mindFlayerMatch: number;
  };
  achievements: Achievement[];
  nftsCollected: string[];
}

interface GameState {
  user: UserProfile;
  splashScreenSeen: boolean;
  levelUpCallback: ((newLevel: number) => void) | null;
  setLevelUpCallback: (callback: (newLevel: number) => void) => void;
  addXP: (amount: number) => void;
  incrementGamesPlayed: () => void;
  updateHighScore: (game: 'demogorgonRunner' | 'mindFlayerMatch', score: number) => void;
  unlockAchievement: (achievementId: string) => void;
  setSplashScreenSeen: () => void;
  collectNFT: (nftId: string) => void;
}

const LEVEL_XP_THRESHOLD = 1000;

const initialAchievements: Achievement[] = [
  {
    id: 'first_game',
    name: 'Into the Upside Down',
    description: 'Play your first game',
    icon: '🎮',
    unlocked: false,
  },
  {
    id: 'runner_100',
    name: 'Speed Demon',
    description: 'Score 100+ in Demogorgon Runner',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: 'memory_master',
    name: 'Mind Flayer Mastery',
    description: 'Complete Mind Flayer Match in under 30 seconds',
    icon: '🧠',
    unlocked: false,
  },
  {
    id: 'collector',
    name: 'Collector',
    description: 'View 10 different NFTs',
    icon: '🎨',
    unlocked: false,
  },
  {
    id: 'level_5',
    name: 'Veteran Hunter',
    description: 'Reach Level 5',
    icon: '⭐',
    unlocked: false,
  },
  {
    id: 'level_10',
    name: 'Demogorgon Slayer',
    description: 'Reach Level 10',
    icon: '👑',
    unlocked: false,
  },
];

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      user: {
        username: 'DemogorgonHunter',
        level: 1,
        xp: 0,
        totalGamesPlayed: 0,
        highScores: {
          demogorgonRunner: 0,
          mindFlayerMatch: 0,
        },
        achievements: initialAchievements,
        nftsCollected: [],
      },
      splashScreenSeen: false,
      levelUpCallback: null,

      setLevelUpCallback: (callback) =>
        set({ levelUpCallback: callback }),

      addXP: (amount) =>
        set((state) => {
          const oldLevel = state.user.level;
          const newXP = state.user.xp + amount;
          const newLevel = Math.floor(newXP / LEVEL_XP_THRESHOLD) + 1;

          // Trigger level up callback if level increased
          if (newLevel > oldLevel && state.levelUpCallback) {
            state.levelUpCallback(newLevel);
          }

          const updatedAchievements = state.user.achievements.map((ach) => {
            if (ach.id === 'level_5' && newLevel >= 5 && !ach.unlocked) {
              return { ...ach, unlocked: true, unlockedAt: new Date() };
            }
            if (ach.id === 'level_10' && newLevel >= 10 && !ach.unlocked) {
              return { ...ach, unlocked: true, unlockedAt: new Date() };
            }
            return ach;
          });

          return {
            user: {
              ...state.user,
              xp: newXP,
              level: newLevel,
              achievements: updatedAchievements,
            },
          };
        }),

      incrementGamesPlayed: () =>
        set((state) => {
          const newTotal = state.user.totalGamesPlayed + 1;
          const updatedAchievements = state.user.achievements.map((ach) => {
            if (ach.id === 'first_game' && !ach.unlocked) {
              return { ...ach, unlocked: true, unlockedAt: new Date() };
            }
            return ach;
          });

          return {
            user: {
              ...state.user,
              totalGamesPlayed: newTotal,
              achievements: updatedAchievements,
            },
          };
        }),

      updateHighScore: (game, score) =>
        set((state) => {
          const currentHigh = state.user.highScores[game];
          if (score <= currentHigh) return state;

          const updatedAchievements = state.user.achievements.map((ach) => {
            if (
              ach.id === 'runner_100' &&
              game === 'demogorgonRunner' &&
              score >= 100 &&
              !ach.unlocked
            ) {
              return { ...ach, unlocked: true, unlockedAt: new Date() };
            }
            return ach;
          });

          return {
            user: {
              ...state.user,
              highScores: {
                ...state.user.highScores,
                [game]: score,
              },
              achievements: updatedAchievements,
            },
          };
        }),

      unlockAchievement: (achievementId) =>
        set((state) => ({
          user: {
            ...state.user,
            achievements: state.user.achievements.map((ach) =>
              ach.id === achievementId && !ach.unlocked
                ? { ...ach, unlocked: true, unlockedAt: new Date() }
                : ach
            ),
          },
        })),

      setSplashScreenSeen: () => set({ splashScreenSeen: true }),

      collectNFT: (nftId) =>
        set((state) => {
          if (state.user.nftsCollected.includes(nftId)) return state;

          const newCollected = [...state.user.nftsCollected, nftId];
          const updatedAchievements = state.user.achievements.map((ach) => {
            if (ach.id === 'collector' && newCollected.length >= 10 && !ach.unlocked) {
              return { ...ach, unlocked: true, unlockedAt: new Date() };
            }
            return ach;
          });

          return {
            user: {
              ...state.user,
              nftsCollected: newCollected,
              achievements: updatedAchievements,
            },
          };
        }),
    }),
    {
      name: 'demogorgon-game-storage',
      partialize: (state) => ({
        user: state.user,
        // Don't persist splashScreenSeen or levelUpCallback - they reset on page load
      }),
    }
  )
);
