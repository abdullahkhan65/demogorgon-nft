import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRocket, FaUsers, FaEthereum, FaFire, FaGamepad, FaTrophy, FaLock } from 'react-icons/fa';
import { IoMdFlash } from 'react-icons/io';
import { GiSpikeball, GiPentacle } from 'react-icons/gi';
import './Home.css';

export const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          section.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container" ref={containerRef}>
      {/* Hero Section */}
      <motion.section className="hero-section" style={{ opacity }}>
        <div className="hero-background">
          <div className="upside-down-portal"></div>
          <div className="lightning-effect"></div>

          {/* Floating particles */}
          <div className="floating-particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="float-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <GiPentacle />
              </motion.div>
            ))}
          </div>

          {/* Animated energy rings */}
          <div className="energy-rings">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="energy-ring"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 1.3,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="title-line">WELCOME TO THE</span>
            <span className="title-main">DEMOGORGON</span>
            <span className="title-society">SOCIETY</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            8,888 unique Demogorgons from the Upside Down. Join the most
            <br />
            exclusive NFT collection inspired by the darkest corners of Hawkins.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <Link to="/gallery" className="btn btn-primary">
              <span>MINT NOW</span>
              <div className="btn-glow"></div>
            </Link>
            <a href="#collection" className="btn btn-secondary">
              <span>VIEW COLLECTION</span>
            </a>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <motion.div
              className="stat"
              whileHover={{ scale: 1.05 }}
            >
              <GiSpikeball className="stat-icon" />
              <span className="stat-value">10K</span>
              <span className="stat-label">TOTAL SUPPLY</span>
            </motion.div>
            <motion.div
              className="stat"
              whileHover={{ scale: 1.05 }}
            >
              <FaUsers className="stat-icon" />
              <span className="stat-value">5.2K</span>
              <span className="stat-label">HOLDERS</span>
            </motion.div>
            <motion.div
              className="stat"
              whileHover={{ scale: 1.05 }}
            >
              <FaEthereum className="stat-icon" />
              <span className="stat-value">2.6Ξ</span>
              <span className="stat-label">FLOOR PRICE</span>
            </motion.div>
            <motion.div
              className="stat"
              whileHover={{ scale: 1.05 }}
            >
              <FaFire className="stat-icon" />
              <span className="stat-value">420Ξ</span>
              <span className="stat-label">VOLUME TRADED</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </motion.section>

      {/* Collection Preview Section */}
      <section id="collection" className="collection-section animate-on-scroll">
        <div className="section-header">
          <motion.h2 className="section-title">
            THE COLLECTION
          </motion.h2>
          <p className="section-subtitle">
            Each Demogorgon is unique, with traits algorithmically generated from
            the deepest layers of the Upside Down
          </p>
        </div>

        <div className="collection-grid">
          {[1, 2, 3, 4].map((item) => (
            <motion.div
              key={item}
              className="collection-card"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="card-image">
                <div className="demogorgon-placeholder">
                  <div className="tentacles">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="tentacle"
                        style={{ transform: `rotate(${i * 45}deg)` }}
                      />
                    ))}
                  </div>
                  <div className="core-face"></div>
                </div>
                <div className="card-overlay">
                  <span className="card-rarity">MYTHIC</span>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">DEMOGORGON #{8888 - item}</h3>
                <div className="card-traits">
                  <span className="trait">Tentacles: {5 + item}</span>
                  <span className="trait">Darkness: {80 + item * 2}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Link to="/gallery" className="btn btn-outline">
          VIEW ALL DEMOGORGONS →
        </Link>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="roadmap-section animate-on-scroll">
        <div className="section-header">
          <h2 className="section-title">THE UPSIDE DOWN ROADMAP</h2>
          <p className="section-subtitle">
            Our journey through the darkness - unlock rewards as we progress
          </p>
        </div>

        <div className="roadmap-timeline">
          <div className="timeline-line"></div>

          {[
            {
              phase: 'PHASE 1',
              title: 'THE PORTAL OPENS',
              progress: 100,
              items: ['8,888 Demogorgons Released', 'Community Formation', 'Discord Launch'],
              status: 'completed',
              icon: <FaRocket />
            },
            {
              phase: 'PHASE 2',
              title: 'THE INVASION',
              progress: 75,
              items: ['Exclusive Merch Drop', 'Demogorgon Mini-Games', 'Holder Rewards'],
              status: 'active',
              icon: <IoMdFlash />
            },
            {
              phase: 'PHASE 3',
              title: 'THE HIVE MIND',
              progress: 25,
              items: ['Staking Mechanism', 'DAO Formation', '$DARKNESS Token'],
              status: 'upcoming',
              icon: <FaUsers />
            },
            {
              phase: 'PHASE 4',
              title: 'THE UPSIDE DOWN',
              progress: 0,
              items: ['Metaverse Integration', 'Breeding Program', 'IRL Events'],
              status: 'locked',
              icon: <FaLock />
            }
          ].map((phase, index) => (
            <motion.div
              key={index}
              className={`roadmap-item ${phase.status}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="roadmap-marker">
                <div className="marker-ring"></div>
                <div className="marker-core">{phase.icon}</div>
              </div>
              <div className="roadmap-content">
                <span className="roadmap-phase">{phase.phase}</span>
                <h3 className="roadmap-title">{phase.title}</h3>
                <div className="roadmap-progress">
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${phase.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <span className="progress-label">{phase.progress}% Complete</span>
                </div>
                <ul className="roadmap-items">
                  {phase.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section animate-on-scroll">
        <div className="section-header">
          <h2 className="section-title">FREQUENTLY ASKED</h2>
          <p className="section-subtitle">Everything you need to know about the Demogorgon Collection</p>
        </div>

        <div className="faq-grid">
          {[
            {
              question: 'WHAT IS THE DEMOGORGON NFT COLLECTION?',
              answer: 'The Demogorgon Collection is a limited series of 8,888 unique NFTs living on the Ethereum blockchain. Each piece is algorithmically generated with over 200 traits inspired by the Upside Down.'
            },
            {
              question: 'HOW CAN I MINT A DEMOGORGON?',
              answer: 'Connect your MetaMask or WalletConnect wallet and navigate to our minting page. The mint price is 0.08 ETH per Demogorgon, with a maximum of 10 per transaction.'
            },
            {
              question: 'WHAT ARE THE BENEFITS OF OWNING A DEMOGORGON?',
              answer: 'Holders gain access to exclusive mini-games, future airdrops, DAO voting rights, merchandise discounts, and entry to IRL events. Your Demogorgon also grants commercial rights.'
            },
            {
              question: 'WHEN IS THE OFFICIAL LAUNCH?',
              answer: 'The portal opens on March 6th, 1983 at 8:15 PM EST. Whitelist members get early access 24 hours before the public sale.'
            },
            {
              question: 'IS THERE A RARITY SYSTEM?',
              answer: 'Yes! Demogorgons range from Common to Mythic rarity. Traits like tentacle count, darkness level, and special abilities determine rarity scores.'
            },
            {
              question: 'HOW CAN I GET ON THE WHITELIST?',
              answer: 'Join our Discord and participate in community events. Whitelist spots are awarded through art contests, engagement, and OG member status.'
            }
          ].map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </section>

      {/* Games Teaser */}
      <section className="games-teaser animate-on-scroll">
        <div className="games-content">
          <h2 className="section-title">ENTER THE GAMES</h2>
          <p className="section-subtitle">
            Test your skills in the Upside Down. Earn XP, unlock achievements, and climb the leaderboards.
          </p>
          <Link to="/games" className="btn btn-primary">
            PLAY NOW
          </Link>
        </div>
        <div className="games-visual">
          <div className="game-icons">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaGamepad />
            </motion.div>
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <FaTrophy />
            </motion.div>
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <GiSpikeball />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`faq-item ${isOpen ? 'open' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <motion.div
        className="faq-answer"
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p>{answer}</p>
      </motion.div>
    </motion.div>
  );
};
