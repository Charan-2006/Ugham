import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const useMobile = () => {
  const [isMobile, React_useState] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => React_useState(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const HighlightStation = ({ title, items, index, activeIndex, setActiveIndex, isMobile }) => {
  // On mobile, we force all items to be "active" visually because hover doesn't work well
  const isActive = isMobile ? true : activeIndex === index;

  return (
    <motion.div
      className="accordion-station"
      onHoverStart={() => !isMobile && setActiveIndex(index)}
      animate={{ 
        width: isMobile ? '100%' : (isActive ? '50%' : '25%'),
        height: isMobile ? 'auto' : '600px'
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRight: isMobile ? 'none' : '1px solid #f1f5f9',
        borderBottom: isMobile ? '1px solid #f1f5f9' : 'none',
        cursor: isMobile ? 'default' : 'pointer',
        background: isActive ? '#ffffff' : '#fcfcfc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '3rem 2rem' : '4rem',
        boxSizing: 'border-box'
      }}
    >
      {/* Background Index (Watermark) - Desktop Only */}
      {!isMobile && (
        <div style={{
          position: 'absolute', 
          top: '10%', 
          right: '5%',
          fontSize: '12rem', 
          fontWeight: 900,
          background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: isActive ? 0.05 : 0.02,
          transition: 'opacity 0.6s ease',
          lineHeight: 1,
          pointerEvents: 'none',
          zIndex: 0
        }}>
          0{index + 1}
        </div>
      )}

      {/* Vertical Title (Hidden on mobile or when active) */}
      <AnimatePresence mode="wait">
        {(!isActive && !isMobile) && (
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: isMobile ? '1rem' : '2rem' }}>
          <div style={{ width: '60px', height: '6px', background: 'linear-gradient(90deg, #FF3366, #3b16fe)' }} />
          {isMobile && (
            <span style={{ 
              fontSize: '1.5rem', 
              fontWeight: 900, 
              background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              opacity: 0.2
            }}>
              0{index + 1}
            </span>
          )}
        </div>
        <h3 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: isMobile ? '1.5rem' : '2.5rem', whiteSpace: 'normal', wordBreak: 'break-word' }}>{title}</h3>
        
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '1.5rem', margin: 0 }}>
          {items.map((item, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 0 : -20 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
              transition={{ delay: isMobile ? 0 : i * 0.1 }}
              style={{ 
                fontSize: isMobile ? '1rem' : '1.25rem', color: '#4A4A4A', fontWeight: 500,
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                lineHeight: 1.5
              }}
            >
              <span style={{ width: '20px', height: '2px', background: '#3b16fe', flexShrink: 0, marginTop: '12px' }} />
              <span style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Interactive Laser Line */}
      <motion.div 
        animate={{ height: isMobile ? '100%' : (isActive ? '100%' : '0%') }}
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
  const isMobile = useMobile();

  return (
    <section className="section" style={{ background: '#ffffff', padding: isMobile ? '80px 0' : '150px 0' }}>
      <div className="container" style={{ padding: isMobile ? '0 1rem' : '0 2rem' }}>
        <div className="text-center" style={{ marginBottom: isMobile ? '40px' : '80px' }}>
          <h2 className="text-radiant" style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900 }}>GRAND FINALE HIGHLIGHTS</h2>
        </div>

        <div className="accordion-container" style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%', 
          background: '#fff', 
          border: '1px solid #f1f5f9',
          borderRadius: '12px',
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
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeconstructedHighlights;
