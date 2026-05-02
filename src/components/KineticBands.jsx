import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KineticBands = () => {
  const [activeBand, setActiveBand] = useState(null);

  const bands = [
    { 
      title: 'Education Empowerment', 
      desc: 'Developing problem-solving and innovation mindset through structured learning paths.',
      gradient: 'linear-gradient(135deg, rgba(109, 74, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)'
    },
    { 
      title: 'Innovation Enabling', 
      desc: 'Supporting idea validation and execution with the right tools and ecosystem.',
      gradient: 'linear-gradient(135deg, rgba(0, 194, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)'
    },
    { 
      title: 'Product Building', 
      desc: 'Turning concepts into functional, high-quality solutions with engineering precision.',
      gradient: 'linear-gradient(135deg, rgba(59, 22, 254, 0.05) 0%, rgba(255, 255, 255, 0) 100%)'
    },
    { 
      title: 'Venture Creation', 
      desc: 'Helping ideas grow into scalable ventures that drive systemic community change.',
      gradient: 'linear-gradient(135deg, rgba(109, 74, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)'
    }
  ];

  return (
    <div style={{ 
      width: '100%', 
      height: '600px', 
      display: 'flex', 
      gap: '1px', 
      background: 'var(--border)', 
      overflow: 'hidden',
      borderRadius: '30px',
      border: '1px solid var(--border)'
    }}>
      {bands.map((band, idx) => {
        const isActive = activeBand === idx;
        return (
          <motion.div
            key={idx}
            onMouseEnter={() => setActiveBand(idx)}
            onMouseLeave={() => setActiveBand(null)}
            animate={{ 
              flex: isActive ? 2.5 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              height: '100%',
              background: '#ffffff',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              padding: '3rem'
            }}
          >
            {/* Background Animated Gradient */}
            <motion.div 
              animate={{ 
                opacity: isActive ? 1 : 0.3,
                scale: isActive ? 1.1 : 1
              }}
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                background: band.gradient,
                zIndex: 0,
                pointerEvents: 'none'
              }} 
            />

            <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <motion.span 
                animate={{ 
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  scale: isActive ? 1.05 : 1
                }}
                style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: 700, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase',
                  marginBottom: '2rem',
                  display: 'block'
                }}
              >
                {`0${idx + 1}`}
              </motion.span>

              <div style={{ marginTop: 'auto' }}>
                <motion.h3 
                  animate={{ 
                    fontSize: isActive ? '2.5rem' : '1.5rem',
                    color: isActive ? 'var(--text)' : 'var(--text-muted)'
                  }}
                  style={{ 
                    fontWeight: 800, 
                    lineHeight: 1.1,
                    margin: 0,
                    maxWidth: '300px'
                  }}
                >
                  {band.title}
                </motion.h3>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      style={{ marginTop: '1.5rem' }}
                    >
                      <p style={{ 
                        fontSize: '1.125rem', 
                        color: 'var(--text-muted)', 
                        lineHeight: 1.6,
                        maxWidth: '400px',
                        margin: 0
                      }}>
                        {band.desc}
                      </p>
                      
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '60px' }}
                        style={{ height: '2px', background: 'var(--primary)', marginTop: '2rem' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default KineticBands;
