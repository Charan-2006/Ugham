import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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

const Panel = ({ label, index, total, isMobile }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Dynamic Horizontal Staggering (Desktop only)
  const xOffset = isMobile ? 0 : (index % 3) * 15; // 0%, 15%, 30% staggering on desktop
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
        x: isMobile ? 0 : springX,
        rotateY: isMobile ? 0 : springRotate,
        marginLeft: `${xOffset}%`,
        marginBottom: isMobile ? '16px' : '60px',
        width: isMobile ? '100%' : '60%',
        perspective: '1200px',
        boxSizing: 'border-box'
      }}
    >
      <motion.div
        whileHover={{ scale: isMobile ? 1 : 1.02, x: isMobile ? 0 : 10 }}
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          borderRadius: '16px',
          padding: isMobile ? '1.5rem' : '2.5rem 3rem',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '1rem' : '2.5rem',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
          boxSizing: 'border-box',
          width: '100%'
        }}
      >
        {/* Geometric Key (Visual Anchor) */}
        <div style={{
          width: isMobile ? '30px' : '40px',
          height: isMobile ? '30px' : '40px',
          background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
          borderRadius: '2px',
          transform: 'rotate(45deg)',
          opacity: 0.8,
          flexShrink: 0
        }} />

        <div style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
          <span style={{ fontSize: '10px', fontFamily: 'monospace', opacity: 0.4, letterSpacing: '0.2em' }}>
            PARTNER_0{index + 1}
          </span>
          <h3 style={{ 
            fontSize: isMobile ? '1.35rem' : '1.75rem', 
            fontWeight: 800, 
            margin: '0.5rem 0 0', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            color: '#0f172a',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
            lineHeight: 1.4
          }}>
            {label}
          </h3>
        </div>

        {/* Technical Accent Line */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            width: '100px',
            height: '1px',
            background: 'rgba(0,0,0,0.05)'
          }} />
        )}
      </motion.div>
    </motion.div>
  );
};

const ArchitecturalFloatingPanels = () => {
  const isMobile = useMobile();
  const partners = [
    'Educational Institutions',
    'Industry Partners',
    'Incubation Centers',
    'Government Bodies',
    'Investors',
    'Mentors'
  ];

  return (
    <section className="section gpu-accel" style={{ background: '#ffffff', padding: isMobile ? '80px 0' : '120px 0', overflow: 'hidden' }}>
      <div className="container" style={{ padding: isMobile ? '0 1rem' : '0 2rem' }}>
        
        <div className="section-header" style={{ marginBottom: isMobile ? '40px' : '100px', textAlign: 'left' }}>
          <span className="section-label">PARTNER NETWORK</span>
          <h2 className="text-radiant" style={{ fontSize: isMobile ? '3rem' : '4rem', fontWeight: 900, lineHeight: 1 }}>
            WHO CAN<br />COLLABORATE
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box' }}>
          {partners.map((label, i) => (
            <Panel key={i} index={i} label={label} total={partners.length} isMobile={isMobile} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ArchitecturalFloatingPanels;
