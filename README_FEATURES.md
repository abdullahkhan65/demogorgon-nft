# Demogorgon NFT Collection - Feature Guide

## 🎨 New Features Implemented

### 1. **Epic Landing Page**
- ✅ Hero section with animated Upside Down portal
- ✅ Floating tentacle particles with constant animations
- ✅ Pulsing energy rings
- ✅ Lightning flash effects
- ✅ Gradient text with glow effects
- ✅ Animated stats dashboard with icons

### 2. **Collection Showcase**
- ✅ Animated Demogorgon placeholders
- ✅ Rotating tentacles
- ✅ Pulsing core effects
- ✅ Glassmorphism cards
- ✅ 3D hover effects

### 3. **Gamified Roadmap**
- ✅ 4-phase interactive timeline
- ✅ Progress bars with completion percentages
- ✅ Animated markers with icons
- ✅ Status indicators (Completed, Active, Upcoming, Locked)
- ✅ Scroll-triggered animations

### 4. **FAQ Section**
- ✅ Accordion-style expandable questions
- ✅ 6 comprehensive FAQs
- ✅ Smooth expand/collapse animations

### 5. **Constant Animations**
- ✅ Portal pulsing effect (continuous)
- ✅ Lightning strikes (every 8 seconds)
- ✅ Floating tentacle particles
- ✅ Energy ring expansion
- ✅ Stat icon floating animations
- ✅ Game icon bouncing
- ✅ Title glow pulsing

### 6. **Icon Library Integration**
- ✅ React Icons installed
- ✅ All sections use proper icons (FaRocket, FaEthereum, etc.)
- ✅ Navigation uses icon components

## 🎭 Viewing the Splash Screen

The splash screen only shows on **first visit** and is persisted in localStorage.

### To View the Splash Screen Again:

**Option 1: Clear Local Storage (Recommended)**
1. Open DevTools (F12 or Cmd+Option+I on Mac)
2. Go to "Application" tab
3. Click "Local Storage" → "http://localhost:5173"
4. Find `demogorgon-game-storage` and delete it
5. Refresh the page

**Option 2: Incognito/Private Window**
- Open the site in an incognito/private browsing window

**Option 3: Reset Store in Console**
```javascript
localStorage.removeItem('demogorgon-game-storage')
location.reload()
```

## 🎨 Design Features

### Color Palette (Stranger Things Inspired)
- **Primary Red**: `#ff0844` (Hot Pink-Red)
- **Crimson**: `#dc143c` (220, 20, 60)
- **Light Pink**: `#ff6b9d` (255, 107, 157)
- **Dark Red**: `#8b0000` (139, 0, 0)
- **Deep Pink**: `#ff1493` (255, 20, 147)
- **Background**: `#000000` (Pure Black)

### Typography
- **Headers**: Benguiat (Official Stranger Things Font)
- **Body**: Inter

### Effects
- Glassmorphism: `backdrop-filter: blur(20px) saturate(180%)`
- Gradient Text: Linear gradients from white → pink → red
- Drop Shadows: Glowing effects on all major elements
- Radial Gradients: Portal and energy effects

## 📱 Pages Structure

1. **/** - Landing page with all sections
2. **/gallery** - NFT Collection gallery
3. **/games** - Mini-games (Runner, Memory Match)
4. **/profile** - User profile with stats

## 🎮 Animations List

### Continuous Animations:
1. Portal pulse (4s loop)
2. Lightning effect (8s loop)
3. Floating particles (3-5s per particle)
4. Energy rings expansion (4s loop)
5. Title glow (3s loop)
6. Stat icons floating (3s loop)
7. Badge pulse (3s loop)
8. Tentacle waves (3s loop)
9. Core pulse (2s loop)
10. Marker ring rotation (10s loop)

### Interaction Animations:
- Hover scale effects on buttons
- Card lift on hover
- Sweep effects on buttons
- FAQ expand/collapse
- Scroll-triggered reveals

## 🚀 Running the Project

```bash
npm run dev
```

Then visit: `http://localhost:5173`

## 📦 New Dependencies

- `react-icons` - Professional icon library

## 🎯 Next Steps (Optional Enhancements)

1. Add actual Demogorgon images (replace placeholders)
2. Connect to Web3/Ethereum
3. Add minting functionality
4. Implement real NFT metadata
5. Add more mini-games
6. Create admin dashboard
7. Add sound effects
8. Implement staking mechanism

---

**Created with Stranger Things vibes** 🔴⚡👾
