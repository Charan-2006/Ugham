import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Panel = ({ label, index, total }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Dynamic Horizontal Staggering
  const xOffset = (index % 3) * 15; // 0%, 15%, 30% staggering
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.3], [15, 0]);

  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springRotate = useSpring(rotateY, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        x: springX,
        rotateY: springRotate,
        marginLeft: `${xOffset}%`,
        marginBottom: '60px',
        width: '60%',
        perspective: '1200px'
      }}
    >
      <motion.div
        whileHover={{ scale: 1.02, x: 10 }}
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          borderRadius: '4px',
          padding: '2.5rem 3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
        }}
      >
        {/* Geometric Key (Visual Anchor) */}
        <div style={{
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
          borderRadius: '2px',
          transform: 'rotate(45deg)',
          opacity: 0.8
        }} />

        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '10px', fontFamily: 'monospace', opacity: 0.4, letterSpacing: '0.2em' }}>
            PARTNER_0{index + 1}
          </span>
          <h3 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 800, 
            margin: '0.5rem 0 0', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            color: '#0f172a'
          }}>
            {label}
          </h3>
        </div>

        {/* Technical Accent Line */}
        <div style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          width: '100px',
          height: '1px',
          background: 'rgba(0,0,0,0.05)'
        }} />
      </motion.div>
    </motion.div>
  );
};

const ArchitecturalFloatingPanels = () => {
  const partners = [
    'Educational Institutions',
    'Industry Partners',
    'Incubation Centers',
    'Government Bodies',
    'Investors',
    'Mentors'
  ];

  return (
    <section className="section gpu-accel" style={{ background: '#ffffff', padding: '120px 0', overflow: 'hidden' }}>
      <div className="container">
        
        <div className="section-header" style={{ marginBottom: '100px', textAlign: 'left' }}>
          <span className="section-label">PARTNER NETWORK</span>
          <h2 className="text-radiant" style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1 }}>
            WHO CAN<br />COLLABORATE
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          {partners.map((label, i) => (
            <Panel key={i} index={i} label={label} total={partners.length} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ArchitecturalFloatingPanels;
