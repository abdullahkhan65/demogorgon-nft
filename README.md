# DEMOGORGON NFT Collection 🎮👹

An immersive, gamified NFT collection website inspired by Stranger Things, featuring Demogorgons and Demo-Dogs from the Upside Down.

## ✨ Features

### 🎨 NFT Gallery
- **3D Interactive Cards** - Each NFT has a rotating 3D sphere with custom colors
- **Rarity System** - 6 rarity tiers (Common, Uncommon, Rare, Epic, Legendary, Mythic)
- **Advanced Filtering** - Filter by rarity and sort by edition, rarity, or name
- **15 Unique NFTs** - Demogorgons and Demo-Dogs with unique attributes
- **Stat Visualization** - Attack, Defense, Speed, and Intelligence bars

### 🎮 Games

#### 🏃 Escape the Demogorgon (Endless Runner)
- Jump to avoid obstacles (cacti and bats)
- Increasing difficulty over time
- Earn XP based on your score
- Track personal high scores

#### 🧠 Mind Flayer Match (Memory Game)
- Match pairs of Upside Down symbols
- Complete quickly to unlock achievements
- Earn bonus XP for efficiency
- Beautiful card flip animations

### 🏆 Gamification System
- **XP & Leveling** - Earn XP from games to level up
- **Achievements** - 6 unlockable achievements
- **Progress Tracking** - View stats, high scores, and unlocked achievements
- **Persistent Storage** - All progress saved locally

### 🎭 Immersive UI/UX
- **Custom Cursor** - Flickering flashlight cursor
- **Splash Screen** - Stunning portal animation on first visit
- **Particle Effects** - Animated background particles
- **Upside Down Theme** - Dark, eerie aesthetic with red accents
- **Glitch Effects** - Text glitches and animations
- **Responsive Design** - Works on desktop and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Experience the Upside Down!

### Build for Production
```bash
npm run build
npm run preview
```

## 🎯 How to Use

### Navigation
- **Gallery** - Browse all NFTs, filter by rarity, view stats
- **Games** - Play browser games to earn XP and unlock achievements
- **Profile** - View your stats, achievements, and progress

### Earning XP
- Play "Escape the Demogorgon" - Earn 1 XP per 10 points scored
- Play "Mind Flayer Match" - Earn XP based on moves (100 - moves*5, min 20)
- Level up every 1000 XP

### Achievements
1. **Into the Upside Down** - Play your first game
2. **Speed Demon** - Score 100+ in Demogorgon Runner
3. **Mind Flayer Mastery** - Complete Memory Match in under 30 seconds
4. **Collector** - View 10 different NFTs
5. **Veteran Hunter** - Reach Level 5
6. **Demogorgon Slayer** - Reach Level 10

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful Three.js helpers
- **Zustand** - State management
- **CSS3** - Styling with custom animations

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── CustomCursor    # Flashlight cursor
│   ├── Navigation      # Top nav bar
│   ├── NFTCard         # 3D NFT card
│   ├── ParticleBackground
│   └── SplashScreen    # Portal animation
├── pages/             # Route pages
│   ├── Gallery        # NFT showcase
│   ├── Games          # Games hub
│   └── Profile        # User profile
├── games/             # Game components
│   ├── DemogorgonRunner
│   └── MindFlayerMatch
├── store/             # State management
│   └── gameStore      # Zustand store
├── data/              # Static data
│   └── nftData        # NFT collection
└── utils/             # Utility functions
```

## 🎨 Customization

### Adding New NFTs
Edit `src/data/nftData.ts` and add new entries to the `nftCollection` array:

```typescript
{
  id: 'demo-xxx',
  name: 'Your Demogorgon Name',
  rarity: 'Legendary',
  description: 'Description here',
  attributes: {
    attack: 90,
    defense: 80,
    speed: 85,
    intelligence: 45,
  },
  imageUrl: '/assets/demoX.png',
  modelColor: '#yourcolor',
  edition: X,
  totalSupply: XX,
}
```

### Modifying Achievements
Edit `src/store/gameStore.ts` to add new achievements or modify conditions.

### Theme Colors
Primary color variables are used throughout. Search for:
- Red: `rgba(255, 0, 0, ...)` - Main theme color
- Purple: `rgba(157, 0, 255, ...)` - Secondary (Mind Flayer)
- Gold: `rgba(255, 200, 0, ...)` - XP/rewards

## 🌟 Future Enhancements

- Connect to blockchain for real NFT minting
- Add wallet integration (MetaMask, WalletConnect)
- Implement NFT marketplace with buying/selling
- Add more games (Quiz, Adventure mode)
- Leaderboards and multiplayer
- Sound effects and ambient audio
- More NFT collections (Mind Flayer, Vecna)
- Animation for unlocking achievements
- Social sharing features

## 📝 Notes for Marketing

### Key Selling Points
1. **Interactive 3D NFTs** - Not just static images
2. **Gamification** - Engage users beyond just viewing
3. **Stranger Things Theme** - Taps into huge fanbase
4. **Rarity System** - Creates collector's value
5. **Browser Games** - Keeps users engaged
6. **Modern Tech Stack** - Fast, smooth, responsive

### Target Audience
- Stranger Things fans (Gen Z, Millennials)
- NFT collectors
- Gamers who like casual browser games
- Web3 enthusiasts

### Marketing Suggestions
- Social media campaigns with game screenshots
- "Play to Earn XP" mechanics encourages return visits
- Achievement system creates goals and retention
- Rarity tiers create FOMO and collector mentality
- Share high scores on Twitter/Discord

## 📄 License

This is a demo project. Stranger Things is owned by Netflix.

## 🤝 Contributing

This is a custom project. Feel free to fork and customize for your own NFT collection!

---

**Built with 💀 in the Upside Down**
