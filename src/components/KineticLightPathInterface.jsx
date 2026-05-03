import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SegmentNode = ({ index, hoveredIdx }) => {
  const isActive = hoveredIdx === index;
  return (
    <>
      {/* Phantom Mesh Nodes (Corner Anchors) */}
      {[
        { top: 0, left: 0 }, { top: 0, right: 0 },
        { bottom: 0, left: 0 }, { bottom: 0, right: 0 }
      ].map((pos, i) => (
        <motion.div
          key={i}
          animate={{ 
            opacity: isActive ? 0.4 : 0.03,
            rotate: isActive ? 180 : 0,
            scale: isActive ? 1.2 : 1
          }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute',
            ...pos,
            width: '6px',
            height: '6px',
            border: '1px solid var(--primary)',
            borderRadius: '50%',
            zIndex: 1
          }}
        />
      ))}
    </>
  );
};

const KineticLightPathInterface = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const targets = [
    { title: 'Students', desc: 'Curious minds with early ideas looking for a structured path to build.' },
    { title: 'Innovators', desc: 'Aspiring problem-solvers aiming to disrupt local and global industries.' },
    { title: 'Builders', desc: 'Early-stage creators seeking direction and technical execution support.' },
    { title: 'Entrepreneurs', desc: 'Visionary leaders ready to scale their innovations into ventures.' }
  ];

  const headerText = "WHO WE SERVE";

  return (
    <section className="section gpu-accel" style={{ background: '#ffffff', padding: '120px 0', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Inertial Text Reveal Header */}
        <div className="section-header" style={{ marginBottom: '80px', textAlign: 'left' }}>
          <span className="section-label" style={{ marginBottom: '1.5rem' }}>TARGET AUDIENCE</span>
          <div style={{ display: 'flex', overflow: 'hidden' }}>
            {headerText.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.05, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                style={{ 
                  display: 'inline-block', 
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginRight: char === ' ' ? '1rem' : '0'
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Horizontal Drift Interface */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', position: 'relative' }}>
          
          {/* Refractive Glass Strip (Global Accent) */}
          <div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none', zIndex: 0
          }} />

          {targets.map((target, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                padding: '3rem 2rem',
                position: 'relative',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                zIndex: 2,
                background: hoveredIdx === i ? 'rgba(59, 22, 254, 0.01)' : 'transparent',
                transition: 'background 0.4s ease'
              }}
            >
              <SegmentNode index={i} hoveredIdx={hoveredIdx} />

              <motion.div
                animate={{ 
                  z: hoveredIdx === i ? 10 : 0,
                  y: hoveredIdx === i ? -5 : 0
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h3 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 800, 
                  color: 'var(--text)',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em'
                }}>
                  {target.title}
                </h3>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#555555', 
                  lineHeight: 1.7,
                  margin: 0,
                  fontWeight: 500
                }}>
                  {target.desc}
                </p>
              </motion.div>

              {/* Light-Streak Indicator */}
              <div style={{ position: 'absolute', bottom: 0, left: '2rem', right: '2rem', height: '2px', background: 'rgba(0,0,0,0.05)' }}>
                <AnimatePresence>
                  {hoveredIdx === i && (
                    <motion.div
                      initial={{ left: '-100%', right: '100%' }}
                      animate={{ left: '0%', right: '0%' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        position: 'absolute', top: 0, bottom: 0,
                        background: 'linear-gradient(90deg, #FF3366, #3b16fe)',
                        boxShadow: '0 0 10px rgba(255, 51, 102, 0.4)'
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KineticLightPathInterface;
