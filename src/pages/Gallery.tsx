import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NFTCard } from '../components/NFTCard';
import type { Rarity } from '../data/nftData';
import { nftCollection } from '../data/nftData';
import './Gallery.css';

export const Gallery = () => {
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'All'>('All');
  const [sortBy, setSortBy] = useState<'rarity' | 'edition' | 'name'>('rarity');

  const rarities: Array<Rarity | 'All'> = ['All', 'Mythic', 'Legendary', 'Epic', 'Rare', 'Uncommon', 'Common'];

  const filteredNFTs = nftCollection.filter(
    (nft) => selectedRarity === 'All' || nft.rarity === selectedRarity
  );

  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    if (sortBy === 'rarity') {
      const rarityOrder: Record<Rarity, number> = {
        Mythic: 6,
        Legendary: 5,
        Epic: 4,
        Rare: 3,
        Uncommon: 2,
        Common: 1,
      };
      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    } else if (sortBy === 'edition') {
      return a.edition - b.edition;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="gallery-container">
      {/* Header */}
      <motion.div
        className="gallery-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="gallery-title">
          <span className="title-glitch" data-text="THE COLLECTION">
            THE COLLECTION
          </span>
        </h1>
        <p className="gallery-subtitle">
          {filteredNFTs.length} Demogorgons from the Upside Down
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="gallery-controls"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Rarity Filter */}
        <div className="filter-group">
          <label className="filter-label">Filter by Rarity:</label>
          <div className="filter-buttons">
            {rarities.map((rarity) => (
              <motion.button
                key={rarity}
                className={`filter-btn ${selectedRarity === rarity ? 'active' : ''}`}
                onClick={() => setSelectedRarity(rarity)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {rarity}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sort Control */}
        <div className="filter-group">
          <label className="filter-label">Sort by:</label>
          <div className="filter-buttons">
            <motion.button
              className={`filter-btn ${sortBy === 'rarity' ? 'active' : ''}`}
              onClick={() => setSortBy('rarity')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Rarity
            </motion.button>
            <motion.button
              className={`filter-btn ${sortBy === 'edition' ? 'active' : ''}`}
              onClick={() => setSortBy('edition')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edition
            </motion.button>
            <motion.button
              className={`filter-btn ${sortBy === 'name' ? 'active' : ''}`}
              onClick={() => setSortBy('name')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Name
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* NFT Grid */}
      <motion.div
        className="nft-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <AnimatePresence mode="popLayout">
          {sortedNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
            >
              <NFTCard nft={nft} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredNFTs.length === 0 && (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>No Demogorgons found with these filters</p>
        </motion.div>
      )}
    </div>
  );
};
