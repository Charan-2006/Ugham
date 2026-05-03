import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HighlightStation = ({ title, items, index, activeIndex, setActiveIndex }) => {
  const isActive = activeIndex === index;

  return (
    <motion.div
      onHoverStart={() => setActiveIndex(index)}
      animate={{ width: isActive ? '50%' : '25%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: '600px',
        position: 'relative',
        overflow: 'hidden',
        borderRight: '1px solid #f1f5f9',
        cursor: 'pointer',
        background: isActive ? '#ffffff' : '#fcfcfc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem'
      }}
    >
      {/* Background Index (Watermark) */}
      <div style={{
        position: 'absolute', top: '10%', right: '5%',
        fontSize: '12rem', fontWeight: 900,
        background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        opacity: isActive ? 0.05 : 0.02,
        transition: 'opacity 0.6s ease'
      }}>
        0{index + 1}
      </div>

      {/* Vertical Title (Hidden when active) */}
      <AnimatePresence mode="wait">
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%) rotate(-90deg)',
              whiteSpace: 'nowrap',
              fontSize: '1.5rem', fontWeight: 900, color: '#94a3b8',
              letterSpacing: '0.2em'
            }}
          >
            {title.toUpperCase()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Content */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
        transition={{ duration: 0.4 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <div style={{ width: '60px', height: '6px', background: 'linear-gradient(90deg, #FF3366, #3b16fe)', marginBottom: '2rem' }} />
        <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '2.5rem' }}>{title}</h3>
        
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {items.map((item, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
              transition={{ delay: i * 0.1 }}
              style={{ 
                fontSize: '1.25rem', color: '#4A4A4A', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: '1rem'
              }}
            >
              <span style={{ width: '20px', height: '1px', background: '#3b16fe' }} />
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Interactive Laser Line */}
      <motion.div 
        animate={{ height: isActive ? '100%' : '0%' }}
        style={{
          position: 'absolute', left: 0, top: 0, width: '4px',
          background: 'linear-gradient(to bottom, #FF3366, #3b16fe)'
        }}
      />
    </motion.div>
  );
};

const DeconstructedHighlights = ({ highlights }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section" style={{ background: '#ffffff', padding: '150px 0' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '80px' }}>
          <h2 className="text-radiant" style={{ fontSize: '3.5rem', fontWeight: 900 }}>GRAND FINALE HIGHLIGHTS</h2>
        </div>

        <div style={{ 
          display: 'flex', 
          width: '100%', 
          background: '#fff', 
          border: '1px solid #f1f5f9',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.05)'
        }}>
          {highlights.map((hl, i) => (
            <HighlightStation 
              key={i}
              index={i}
              {...hl}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeconstructedHighlights;
