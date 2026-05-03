import React from 'react';
import { motion } from 'framer-motion';

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

const HoneycombCell = ({ partner, index, isMobile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: isMobile ? 0 : index * 0.1 }}
      whileHover={isMobile ? "initial" : "hover"}
      style={{
        width: isMobile ? '100%' : '320px',
        height: isMobile ? 'auto' : '360px',
        margin: isMobile ? '0 0 1.5rem 0' : '-30px 10px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'center',
        textAlign: isMobile ? 'left' : 'center',
        padding: isMobile ? '2.5rem 2rem' : '3rem',
        cursor: 'pointer',
        perspective: '1000px',
        boxSizing: 'border-box'
      }}
    >
      {/* 3D Hexagon Shell (Simplified for mobile) */}
      <motion.div
        variants={{
          hover: { rotateY: 10, rotateX: -5, scale: 1.05 }
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#ffffff',
          clipPath: isMobile ? 'none' : 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          borderRadius: isMobile ? '16px' : '0',
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.05)',
          zIndex: 0,
          transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      />

      {/* Internal Gradient Glow */}
      <motion.div
        variants={{
          hover: { opacity: 0.05 }
        }}
        initial={{ opacity: 0 }}
        style={{
          position: 'absolute',
          inset: '10%',
          background: 'radial-gradient(circle, #3b16fe, transparent)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: isMobile ? 'center' : 'center', gap: isMobile ? '1.5rem' : '0', width: '100%' }}>
        {/* Technical Icon Placeholder */}
        <div style={{ 
          width: isMobile ? '36px' : '40px', 
          height: isMobile ? '36px' : '40px', 
          background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
          clipPath: isMobile ? 'none' : 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          borderRadius: isMobile ? '4px' : '0',
          margin: isMobile ? '0' : '0 auto 1.5rem',
          opacity: 0.8,
          flexShrink: 0
        }} />
        
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontSize: isMobile ? '1.25rem' : '1.25rem', 
            fontWeight: 800, 
            color: '#0f172a',
            marginBottom: isMobile ? '0.5rem' : '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            wordBreak: 'break-word'
          }}>
            {partner.title}
          </h3>
          
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#4A4A4A', 
            lineHeight: 1.6,
            margin: 0
          }}>
            {partner.desc}
          </p>
        </div>
      </div>

      {/* Radiant Border (Thin Line Reveal) */}
      {!isMobile && (
        <motion.div
          variants={{
            hover: { opacity: 1 }
          }}
          initial={{ opacity: 0 }}
          style={{
            position: 'absolute',
            inset: '2px',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            border: '1.5px solid transparent',
            borderImage: 'linear-gradient(135deg, #FF3366, #3b16fe) 1',
            zIndex: 3,
            pointerEvents: 'none'
          }}
        />
      )}
    </motion.div>
  );
};

const PartnerHoneycombGrid = () => {
  const isMobile = useMobile();
  const partners = [
    { title: 'Industry Partners', desc: 'Support innovation through technology, mentorship, and internships while gaining access to emerging talent.' },
    { title: 'Incubation Partners', desc: 'Provide incubation, mentorship, and scaling support for promising student startups and ventures.' },
    { title: 'Ecosystem Partners', desc: 'Enable awareness and policy guidance through government and startup ecosystem initiatives.' },
    { title: 'Investment Partners', desc: 'Discover and invest in high-potential early-stage innovations and student-led startups.' },
    { title: 'Mentor Partners', desc: 'Guide and shape the next generation of innovators through industry expertise and experience.' }
  ];

  return (
    <section className="section gpu-accel" style={{ background: '#ffffff', padding: isMobile ? '60px 0' : '120px 0' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: isMobile ? '0 1rem' : '0 2rem' }}>
        <div className="section-header" style={{ marginBottom: isMobile ? '40px' : '80px', textAlign: isMobile ? 'left' : 'center', width: '100%' }}>
          <span className="section-label">CATEGORIES</span>
          <h2 className="text-radiant" style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900 }}>OUR PARTNERS</h2>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          flexWrap: isMobile ? 'nowrap' : 'wrap', 
          justifyContent: isMobile ? 'flex-start' : 'center', 
          width: '100%',
          maxWidth: '1200px'
        }}>
          {partners.map((partner, i) => (
            <HoneycombCell key={partner.title} partner={partner} index={i} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerHoneycombGrid;
