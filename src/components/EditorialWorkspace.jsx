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
      className="section gpu-accel" 
      style={{ position: 'relative', minHeight: '1000px', background: '#ffffff', overflow: 'hidden', padding: '4rem 0' }}
    >
      <style>{`
        .workspace-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 4rem; }
        .workspace-spine { display: none; }
        .workspace-guideline { display: none; }
        .workspace-left { grid-column: span 1; }
        .workspace-right { grid-column: span 1; text-align: left !important; }
        .workspace-partners { justify-content: flex-start !important; }

        @media (min-width: 1024px) {
          .workspace-grid { grid-template-columns: repeat(12, 1fr); }
          .workspace-spine { display: block; position: absolute; left: 50%; top: 10%; bottom: 10%; width: 1px; background: var(--border); z-index: 1; }
          .workspace-guideline { display: block; position: absolute; left: -2rem; top: 50%; width: calc(50vw - 2rem); height: 1px; background: var(--border); z-index: -1; }
          .workspace-left { grid-column: 1 / span 5; }
          .workspace-right { grid-column: 8 / span 5; text-align: right !important; }
          .workspace-partners { justify-content: flex-end !important; }
        }
      `}</style>

      {/* Static Wireframe Texture */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.03, zIndex: 0 }} />

      {/* Central Divider Spine */}
      <div className="workspace-spine" />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="workspace-grid">
          
          {/* Left Side: Pathways */}
          <div className="workspace-left">
            <span className="section-label" style={{ marginBottom: '1rem' }}>The Workspace</span>
            <h2 className="text-radiant" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '4rem' }}>
              HOW YOU CAN<br />GET STARTED
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: activeIndex === i ? 1.05 : 1,
                    opacity: activeIndex === i ? 1 : 0.4,
                    filter: activeIndex === i ? 'blur(0px)' : 'blur(1px)'
                  }}
                  transition={inertiaTransition}
                  style={{ position: 'relative', paddingLeft: '1.5rem' }}
                >
                  <div className="workspace-guideline" style={{ opacity: activeIndex === i ? 1 : 0.2, transition: 'opacity 0.6s ease' }} />
                  
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: activeIndex === i ? 'var(--primary)' : 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'monospace' }}>
                    PATHWAY {step.num}
                  </div>
                  <h4 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, color: activeIndex === i ? 'var(--text)' : 'var(--text-muted)', lineHeight: 1.3 }}>
                    {step.text}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Partners */}
          <div className="workspace-right">
            <span className="section-label" style={{ marginBottom: '1rem' }}>Ecosystem Links</span>
            <h2 className="text-radiant" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '4rem' }}>
              PARTNER<br />WITH US
            </h2>

            <div className="workspace-partners" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
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
                      padding: '0.75rem 1.25rem',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      background: isLinked ? 'rgba(59, 22, 254, 0.05)' : 'transparent',
                      borderColor: isLinked ? 'var(--primary)' : 'var(--border)',
                      fontSize: '0.75rem',
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
