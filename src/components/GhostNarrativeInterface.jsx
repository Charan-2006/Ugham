import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const GhostNarrativeInterface = () => {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);
  const springX = useSpring(lensX, { stiffness: 100, damping: 20 });
  const springY = useSpring(lensY, { stiffness: 100, damping: 20 });

  const steps = [
    { num: '01', text: 'Start Ugham Innovation Club in your College' },
    { num: '02', text: 'Share your idea or interest in club activities' },
    { num: '03', text: 'Collaborate with mentors and peers' },
    { num: '04', text: 'Start building and refining your innovation' }
  ];

  const partners = [
    'Institution Partner', 'Industry Partner', 'Incubation Partner',
    'Ecosystem Partner', 'Investment Partner', 'Mentor Partner'
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lensX.set(x);
    lensY.set(y);
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="section" 
      style={{ position: 'relative', height: '1000px', background: '#ffffff', overflow: 'hidden', cursor: 'none' }}
    >
      {/* 12-Column Blueprint Grid Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, opacity: 0.05 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', height: '100%', gap: '1px', background: 'var(--border)' }}>
          {Array.from({ length: 12 }).map((_, i) => <div key={i} style={{ background: '#fff' }} />)}
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', width: '100%', gap: '2rem' }}>
          
          {/* Left Side: Vertical Pathways */}
          <div style={{ gridColumn: '1 / span 5' }}>
            <span className="section-label" style={{ marginBottom: '1rem' }}>How to Start</span>
            <h2 className="text-radiant" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '5rem' }}>GET STARTED</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {steps.map((step, i) => (
                <StepItem 
                  key={i} 
                  step={step} 
                  index={i} 
                  isHovered={hoveredStep === i} 
                  onHover={setHoveredStep} 
                  mousePos={mousePos}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Circular Ghost Tags */}
          <div style={{ gridColumn: '7 / span 6', position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ position: 'absolute', top: '0', right: '0', fontSize: '3rem', fontWeight: 900, color: 'var(--text)', textTransform: 'uppercase' }}>
              Partner With Us
            </h2>
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'relative', width: '500px', height: '500px' }}
            >
              {partners.map((name, i) => {
                const angle = (i / partners.length) * Math.PI * 2;
                const radius = 220;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <GhostTag 
                    key={i} 
                    name={name} 
                    x={x} 
                    y={y} 
                    hoveredStep={hoveredStep}
                  />
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Lens Cursor Overlay */}
      <motion.div
        style={{
          position: 'absolute',
          left: springX,
          top: springY,
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '1px solid rgba(59, 22, 254, 0.2)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px) contrast(1.2)',
          pointerEvents: 'none',
          zIndex: 100,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Floating Mesh inside Lens */}
        <div style={{ 
          position: 'absolute', 
          width: '2000px', 
          height: '2000px', 
          backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', 
          backgroundSize: '30px 30px',
          opacity: 0.1,
          transform: 'translate(-50%, -50%)' // Center it relative to lens
        }} />
      </motion.div>

    </section>
  );
};

const StepItem = ({ step, index, isHovered, onHover, mousePos }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{ position: 'relative', cursor: 'pointer', perspective: 1000 }}
    >
      {/* 3D Outline Number */}
      <motion.div
        style={{
          position: 'absolute',
          left: '-2rem',
          top: '-1rem',
          fontSize: '6rem',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px var(--border)',
          opacity: isHovered ? 0.4 : 0.1,
          rotateX,
          rotateY,
          zIndex: 0,
          transition: 'opacity 0.4s ease'
        }}
      >
        {step.num}
      </motion.div>

      <motion.div
        animate={{ x: isHovered ? 20 : 0 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <h4 style={{ fontSize: '1.25rem', color: isHovered ? 'var(--primary)' : 'var(--text)', transition: 'color 0.4s ease' }}>
          {step.text}
        </h4>
      </motion.div>
    </motion.div>
  );
};

const GhostTag = ({ name, x, y, hoveredStep }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Magnetic pull toward active step
  const magnetX = hoveredStep !== null ? -50 : 0;
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(null)}
      animate={{ 
        x: x + magnetX, 
        y, 
        scale: isHovered ? 1.1 : 1,
        rotate: -360 // Counter-rotate to stay upright
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        padding: '0.75rem 1.5rem',
        borderRadius: '100px',
        border: '1px solid var(--border)',
        color: isHovered ? '#fff' : 'var(--text-muted)',
        background: isHovered ? 'var(--primary)' : 'transparent',
        fontSize: '0.875rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        zIndex: isHovered ? 10 : 1
      }}
    >
      {name}
    </motion.div>
  );
};

export default GhostNarrativeInterface;
