import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RefractiveInterface = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredHighlight, setHoveredHighlight] = useState(null);

  const expertise = [
    { title: 'Education Empowerment', desc: 'Developing problem-solving and innovation mindset through structured paths.' },
    { title: 'Innovation Enabling', desc: 'Supporting idea validation and execution with the right tools and ecosystem.' },
    { title: 'Product Building', desc: 'Turning concepts into high-quality solutions with engineering precision.' },
    { title: 'Venture Creation', desc: 'Helping ideas grow into scalable ventures that drive systemic impact.' }
  ];

  const highlights = [
    { text: 'Innovation programs and competitions' },
    { text: 'Hands-on workshops and masterclasses' },
    { text: 'Mentorship-driven development tracks' },
    { text: 'Incubation & Industry Connections' }
  ];

  return (
    <section 
      className="section" 
      style={{ position: 'relative', minHeight: '80vh', background: '#ffffff', overflow: 'hidden', padding: '8rem 0' }}
    >
      {/* Background Refractive Mesh Pattern */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 22, 254, 0.04) 0%, transparent 70%)',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Heading */}
        <div style={{ marginBottom: '6rem', maxWidth: '800px' }}>
          <span className="section-label" style={{ marginBottom: '1rem' }}>Foundations & Highlights</span>
          <h2 className="text-radiant" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', textTransform: 'uppercase', lineHeight: 1, fontWeight: 900 }}>
            Modern Innovation<br />Foundations
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1.2fr', gap: '5rem', alignItems: 'start' }}>
          
          {/* Vertical Sidebar Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', borderRight: '1px solid var(--border)', paddingRight: '2rem' }}>
            {expertise.map((_, i) => (
              <motion.div
                key={i}
                onMouseEnter={() => setActiveIdx(i)}
                style={{ 
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  color: activeIdx === i ? 'var(--primary)' : 'var(--text-muted)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>{`0${i + 1}`}</span>
                {activeIdx === i && (
                  <motion.div layoutId="activeInd" style={{ width: '2px', height: '40px', background: 'var(--primary)' }} />
                )}
              </motion.div>
            ))}
          </div>

          {/* Center Content Area: Expertise */}
          <div style={{ maxWidth: '400px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                  {expertise[activeIdx].title}
                </h3>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.6, opacity: 0.8 }}>
                  {expertise[activeIdx].desc}
                </p>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '60px' }}
                  style={{ height: '3px', background: 'var(--primary)', marginTop: '2.5rem' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Content Area: Highlights Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                onMouseEnter={() => setHoveredHighlight(i)}
                onMouseLeave={() => setHoveredHighlight(null)}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{ 
                  padding: '3rem 2.5rem',
                  background: hoveredHighlight === i 
                    ? 'linear-gradient(135deg, #ffffff 0%, rgba(59, 22, 254, 0.02) 100%)' 
                    : '#ffffff',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '28px',
                  border: '1px solid var(--border)',
                  borderTop: `4px solid ${hoveredHighlight === i ? 'var(--primary)' : 'transparent'}`,
                  cursor: 'pointer',
                  transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  position: 'relative',
                  boxShadow: hoveredHighlight === i 
                    ? '0 30px 60px -12px rgba(0, 0, 0, 0.08), 0 18px 36px -18px rgba(0, 0, 0, 0.1)' 
                    : '0 10px 30px -15px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <motion.h4 
                  animate={{ 
                    color: hoveredHighlight === i ? 'var(--primary)' : 'var(--text)',
                    x: hoveredHighlight === i ? 5 : 0
                  }}
                  style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 800, 
                    lineHeight: 1.3,
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {h.text}
                </motion.h4>
                
                {/* Subtle Decorative Element */}
                <div style={{ 
                  marginTop: '1.5rem', 
                  width: '30px', 
                  height: '2px', 
                  background: 'var(--primary)', 
                  opacity: hoveredHighlight === i ? 1 : 0.1,
                  transition: 'all 0.5s ease'
                }} />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default RefractiveInterface;
