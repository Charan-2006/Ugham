import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MorphingSurface = () => {
  const [activeZone, setActiveZone] = useState(0);

  const zones = [
    { 
      title: "IDEATE", 
      desc: "Discovering possibilities and defining the vision for impact through collaborative brainstorming and research.",
      symbol: (color) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="12" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="20" cy="20" r="4" fill={color} opacity="0.6" />
        </svg>
      )
    },
    { 
      title: "BUILD", 
      desc: "Engineering robust solutions with precision, agility, and a focus on long-term sustainability.",
      symbol: (color) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="12" y="12" width="16" height="16" rx="2" stroke={color} strokeWidth="1.5" />
          <path d="M12 20H28M20 12V28" stroke={color} strokeWidth="1" opacity="0.3" />
        </svg>
      )
    },
    { 
      title: "SCALE", 
      desc: "Expanding horizons and taking innovation to the world stage by building resilient growth frameworks.",
      symbol: (color) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 8L32 28H8L20 8Z" stroke={color} strokeWidth="1.5" />
          <path d="M20 14L28 27H12L20 14Z" fill={color} opacity="0.2" />
        </svg>
      )
    }
  ];

  return (
    <section className="section" style={{ 
      background: '#ffffff', 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '10rem 0'
    }}>
      {/* Background Abstract Waves */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            x: [0, 20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ 
            position: 'absolute', 
            top: '10%', 
            left: '5%', 
            width: '800px', 
            height: '800px', 
            background: 'radial-gradient(circle, rgba(109, 74, 255, 0.04) 0%, rgba(255, 255, 255, 0) 70%)', 
            borderRadius: '50%',
            filter: 'blur(60px)'
          }} 
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 0],
            x: [0, -20, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ 
            position: 'absolute', 
            bottom: '5%', 
            right: '5%', 
            width: '900px', 
            height: '900px', 
            background: 'radial-gradient(circle, rgba(0, 194, 255, 0.04) 0%, rgba(255, 255, 255, 0) 70%)', 
            borderRadius: '50%',
            filter: 'blur(80px)'
          }} 
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <span className="section-label" style={{ marginBottom: '1rem' }}>Our Process</span>
          <h2 className="text-radiant" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textTransform: 'uppercase' }}>
            The Innovation Journey
          </h2>
        </div>

        {/* Stages Inline Container */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Connection Line */}
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '15%', 
            right: '15%', 
            height: '1px', 
            background: 'linear-gradient(90deg, transparent, rgba(59, 22, 254, 0.1), rgba(0, 194, 255, 0.1), transparent)', 
            zIndex: 0,
            transform: 'translateY(-50%)'
          }} />

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            position: 'relative',
            zIndex: 1
          }}>
            {zones.map((zone, i) => {
              const isActive = activeZone === i;
              return (
                <div 
                  key={i}
                  onMouseEnter={() => setActiveZone(i)}
                  style={{ 
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                    opacity: isActive ? 1 : 0.3,
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                    width: '200px'
                  }}
                >
                  <div style={{ marginBottom: '1.5rem', transition: 'all 0.4s ease' }}>
                    {zone.symbol(isActive ? '#3b16fe' : '#64748b')}
                  </div>

                  <h3 className={isActive ? "text-radiant" : ""} style={{ 
                    fontSize: '1.75rem', 
                    letterSpacing: '0.25em', 
                    fontWeight: 800,
                    margin: 0,
                    transition: 'all 0.4s ease'
                  }}>
                    {zone.title}
                  </h3>

                  <motion.div 
                    initial={false}
                    animate={{ 
                      width: isActive ? '80%' : '0%',
                      opacity: isActive ? 1 : 0
                    }}
                    style={{ 
                      height: '2px', 
                      background: 'linear-gradient(90deg, #3b16fe, #00C2FF)', 
                      marginTop: '12px'
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Display */}
        <div style={{ 
          height: '120px', 
          maxWidth: '700px', 
          margin: '4rem auto 0', 
          textAlign: 'center',
          position: 'relative'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeZone}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <p style={{ 
                fontSize: '1.25rem', 
                color: 'var(--text-muted)', 
                lineHeight: 1.6,
                fontWeight: 400
              }}>
                {zones[activeZone].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Structured Micro Elements */}
      {/* Top-Left Cluster */}
      <div style={{ position: 'absolute', top: '15%', left: '8%', opacity: 0.08 }}>
        <svg width="40" height="40">
          <circle cx="5" cy="5" r="1.5" fill="#3b16fe" />
          <circle cx="15" cy="10" r="1.5" fill="#3b16fe" />
          <circle cx="8" cy="18" r="1.5" fill="#3b16fe" />
          <line x1="5" y1="5" x2="15" y2="10" stroke="#3b16fe" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>

      {/* Bottom-Right Cluster */}
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', opacity: 0.08 }}>
        <svg width="40" height="40">
          <circle cx="35" cy="35" r="1.5" fill="#00C2FF" />
          <circle cx="25" cy="30" r="1.5" fill="#00C2FF" />
          <circle cx="32" cy="22" r="1.5" fill="#00C2FF" />
          <line x1="35" y1="35" x2="25" y2="30" stroke="#00C2FF" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>

      {/* Floating Signal Dots */}
      <motion.div 
        animate={{ y: [0, -15, 0], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '30%', right: '15%', width: '4px', height: '4px', borderRadius: '50%', background: '#6d4aff' }}
      />
      <motion.div 
        animate={{ y: [0, 15, 0], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ position: 'absolute', bottom: '35%', left: '15%', width: '4px', height: '4px', borderRadius: '50%', background: '#3b16fe' }}
      />
    </section>
  );
};

export default MorphingSurface;
