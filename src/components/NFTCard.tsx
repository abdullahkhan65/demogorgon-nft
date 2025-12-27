import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import type { NFT } from '../data/nftData';
import { rarityColors, rarityGlow } from '../data/nftData';
import { useGameStore } from '../store/gameStore';
import './NFTCard.css';

interface AnimatedSphereProps {
  color: string;
}

const AnimatedSphere = ({ color }: AnimatedSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

interface NFTCardProps {
  nft: NFT;
  onClick?: () => void;
}

export const NFTCard = ({ nft, onClick }: NFTCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const collectNFT = useGameStore((state) => state.collectNFT);

  const handleClick = () => {
    collectNFT(nft.id);
    onClick?.();
  };

  return (
    <motion.div
      className="nft-card"
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        borderColor: rarityColors[nft.rarity],
        boxShadow: isHovered
          ? `0 0 30px ${rarityGlow[nft.rarity]}, 0 0 60px ${rarityGlow[nft.rarity]}`
          : `0 0 15px ${rarityGlow[nft.rarity]}`,
      }}
    >
      {/* 3D Model Container */}
      <div className="nft-card-model">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color={nft.modelColor} />
          <AnimatedSphere color={nft.modelColor} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>

      {/* Rarity Badge */}
      <div
        className="rarity-badge"
        style={{
          background: rarityColors[nft.rarity],
          boxShadow: `0 0 10px ${rarityGlow[nft.rarity]}`,
        }}
      >
        {nft.rarity}
      </div>

      {/* Card Content */}
      <div className="nft-card-content">
        <h3 className="nft-name">{nft.name}</h3>
        <p className="nft-edition">#{nft.edition} / {nft.totalSupply}</p>
        <p className="nft-description">{nft.description}</p>

        {/* Attributes */}
        <div className="nft-attributes">
          <div className="attribute">
            <span className="attribute-label">⚔️ ATK</span>
            <div className="attribute-bar">
              <motion.div
                className="attribute-fill"
                initial={{ width: 0 }}
                animate={{ width: `${nft.attributes.attack}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ background: rarityColors[nft.rarity] }}
              />
            </div>
            <span className="attribute-value">{nft.attributes.attack}</span>
          </div>

          <div className="attribute">
            <span className="attribute-label">🛡️ DEF</span>
            <div className="attribute-bar">
              <motion.div
                className="attribute-fill"
                initial={{ width: 0 }}
                animate={{ width: `${nft.attributes.defense}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ background: rarityColors[nft.rarity] }}
              />
            </div>
            <span className="attribute-value">{nft.attributes.defense}</span>
          </div>

          <div className="attribute">
            <span className="attribute-label">⚡ SPD</span>
            <div className="attribute-bar">
              <motion.div
                className="attribute-fill"
                initial={{ width: 0 }}
                animate={{ width: `${nft.attributes.speed}%` }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{ background: rarityColors[nft.rarity] }}
              />
            </div>
            <span className="attribute-value">{nft.attributes.speed}</span>
          </div>

          <div className="attribute">
            <span className="attribute-label">🧠 INT</span>
            <div className="attribute-bar">
              <motion.div
                className="attribute-fill"
                initial={{ width: 0 }}
                animate={{ width: `${nft.attributes.intelligence}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ background: rarityColors[nft.rarity] }}
              />
            </div>
            <span className="attribute-value">{nft.attributes.intelligence}</span>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      {isHovered && (
        <motion.div
          className="card-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle, ${rarityGlow[nft.rarity]} 0%, transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
};
