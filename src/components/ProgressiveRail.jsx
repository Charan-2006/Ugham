import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProgressiveRail = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const expertise = [
    { 
      title: 'Education Empowerment', 
      desc: 'Developing problem-solving and innovation mindset through structured learning paths and collaborative research.'
    },
    { 
      title: 'Innovation Enabling', 
      desc: 'Supporting idea validation and execution by providing the right tools, mentors, and ecosystem access.'
    },
    { 
      title: 'Product Building', 
      desc: 'Turning concepts into functional, high-quality solutions with engineering precision and agile development.'
    },
    { 
      title: 'Venture Creation', 
      desc: 'Helping ideas grow into scalable ventures that drive systemic community change and long-term impact.'
    }
  ];

  return (
    <div style={{ padding: '4rem 0' }}>
      {/* Rail Container */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto 4rem' }}>
        {/* The Rail */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: 0, 
          right: 0, 
          height: '2px', 
          background: 'var(--border)', 
          zIndex: 0,
          transform: 'translateY(-50%)'
        }}>
          {/* Active Progress Line */}
          <motion.div 
            animate={{ width: `${(activeIdx / (expertise.length - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              height: '100%', 
              background: 'linear-gradient(90deg, #3b16fe, #00C2FF)',
              boxShadow: '0 0 10px rgba(59, 22, 254, 0.2)'
            }}
          />
        </div>

        {/* Nodes */}
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          {expertise.map((item, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div 
                key={idx}
                onMouseEnter={() => setActiveIdx(idx)}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  width: '40px'
                }}
              >
                {/* Node Circle */}
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.4 : 1,
                    backgroundColor: isActive ? '#3b16fe' : '#ffffff',
                    borderColor: isActive ? '#3b16fe' : 'var(--border)',
                    boxShadow: isActive ? '0 0 20px rgba(59, 22, 254, 0.4)' : 'none'
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '2px solid',
                    position: 'relative'
                  }}
                >
                  {/* Inner glow/dot */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeDot"
                      style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        width: '4px', 
                        height: '4px', 
                        background: '#ffffff', 
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  )}
                </motion.div>

                {/* Node Label (Optional/Subtle) */}
                <motion.span 
                  animate={{ 
                    opacity: isActive ? 1 : 0.4,
                    y: isActive ? 10 : 15,
                    color: isActive ? 'var(--primary)' : 'var(--text-muted)'
                  }}
                  style={{ 
                    marginTop: '1.5rem', 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    letterSpacing: '0.1em',
                    whiteSpace: 'nowrap',
                    position: 'absolute',
                    top: '100%'
                  }}
                >
                  {`0${idx + 1}`}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Panel */}
      <div style={{ 
        maxWidth: '700px', 
        margin: '2rem auto 0', 
        textAlign: 'center', 
        minHeight: '180px',
        position: 'relative'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-radiant" style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 800 }}>
              {expertise[activeIdx].title}
            </h3>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-muted)', 
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {expertise[activeIdx].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProgressiveRail;
