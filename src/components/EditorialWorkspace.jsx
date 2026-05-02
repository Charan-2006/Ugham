import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const EditorialWorkspace = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Map scroll progress to active index (0 to 3)
  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      const idx = Math.min(3, Math.floor(v * 4));
      setActiveIndex(idx);
    });
  }, [scrollYProgress]);

  const steps = [
    { num: '01', text: 'Start Ugham Innovation Club in your College', links: [0, 5] },
    { num: '02', text: 'Share your idea or interest in club activities', links: [1, 2, 5] },
    { num: '03', text: 'Collaborate with mentors and peers', links: [3, 4, 5] },
    { num: '04', text: 'Start building and refining your innovation', links: [1, 3, 5] }
  ];

  const partners = [
    'Institution Partner', 'Industry Partner', 'Incubation Partner',
    'Ecosystem Partner', 'Investment Partner', 'Mentor Partner'
  ];

  const inertiaTransition = { 
    duration: 1.2, 
    ease: [0.22, 1, 0.36, 1] // High-inertia "zero-gravity" curve
  };

  return (
    <section 
      ref={containerRef}
      className="section" 
      style={{ position: 'relative', minHeight: '1200px', background: '#ffffff', overflow: 'hidden', padding: '10rem 0' }}
    >
      {/* Static Wireframe Texture (3% opacity) */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', 
        backgroundSize: '40px 40px',
        opacity: 0.03,
        zIndex: 0
      }} />

      {/* Central Divider Spine (1px) */}
      <div style={{ 
        position: 'absolute', 
        left: '50%', 
        top: '10%', 
        bottom: '10%', 
        width: '1px', 
        background: 'var(--border)', 
        zIndex: 1 
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem' }}>
          
          {/* Left Side: Pathways */}
          <div style={{ gridColumn: '1 / span 5' }}>
            <span className="section-label" style={{ marginBottom: '1rem' }}>The Workspace</span>
            <h2 className="text-radiant" style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '6rem' }}>
              HOW YOU CAN<br />GET STARTED
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: activeIndex === i ? 1.05 : 1,
                    z: activeIndex === i ? 10 : 0,
                    opacity: activeIndex === i ? 1 : 0.4,
                    filter: activeIndex === i ? 'blur(0px)' : 'blur(1px)'
                  }}
                  transition={inertiaTransition}
                  style={{ position: 'relative', paddingLeft: '2rem' }}
                >
                  {/* Horizontal Guideline */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '-2rem', 
                    top: '50%', 
                    width: 'calc(50vw - 2rem)', 
                    height: '1px', 
                    background: 'var(--border)', 
                    opacity: activeIndex === i ? 1 : 0.2,
                    zIndex: -1,
                    transition: 'opacity 0.6s ease'
                  }} />
                  
                  <div style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 800, 
                    color: activeIndex === i ? 'var(--primary)' : 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    fontFamily: 'monospace'
                  }}>
                    PATHWAY {step.num}
                  </div>
                  <h4 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 700, 
                    color: activeIndex === i ? 'var(--text)' : 'var(--text-muted)',
                    lineHeight: 1.3
                  }}>
                    {step.text}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Partners */}
          <div style={{ gridColumn: '8 / span 5', textAlign: 'right' }}>
            <span className="section-label" style={{ marginBottom: '1rem' }}>Ecosystem Links</span>
            <h2 className="text-radiant" style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '6rem' }}>
              PARTNER<br />WITH US
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '1.5rem' }}>
              {partners.map((name, i) => {
                const isLinked = steps[activeIndex].links.includes(i);
                return (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: isLinked ? 1.1 : 1,
                      opacity: isLinked ? 1 : 0.7,
                      filter: isLinked ? 'blur(0px)' : 'blur(1px)'
                    }}
                    transition={inertiaTransition}
                    style={{ 
                      padding: '1rem 1.5rem',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      background: isLinked ? 'rgba(59, 22, 254, 0.05)' : 'transparent',
                      borderColor: isLinked ? 'var(--primary)' : 'var(--border)',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: isLinked ? 'var(--primary)' : 'var(--text-muted)'
                    }}
                  >
                    {name}
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default EditorialWorkspace;
