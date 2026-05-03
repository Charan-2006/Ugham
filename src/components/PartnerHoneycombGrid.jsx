import React from 'react';
import { motion } from 'framer-motion';

const HoneycombCell = ({ partner, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover="hover"
      style={{
        width: '320px',
        height: '360px',
        margin: '-30px 10px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem',
        cursor: 'pointer',
        perspective: '1000px'
      }}
    >
      {/* 3D Hexagon Shell */}
      <motion.div
        variants={{
          hover: { rotateY: 10, rotateX: -5, scale: 1.05 }
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#ffffff',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.02)',
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
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Technical Icon Placeholder */}
        <div style={{ 
          width: '40px', height: '40px', 
          background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          margin: '0 auto 1.5rem',
          opacity: 0.8
        }} />
        
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 800, 
          color: '#0f172a',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
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

      {/* Radiant Border (Thin Line Reveal) */}
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
    </motion.div>
  );
};

const PartnerHoneycombGrid = () => {
  const partners = [
    { title: 'Industry Partners', desc: 'Support innovation through technology, mentorship, and internships while gaining access to emerging talent.' },
    { title: 'Incubation Partners', desc: 'Provide incubation, mentorship, and scaling support for promising student startups and ventures.' },
    { title: 'Ecosystem Partners', desc: 'Enable awareness and policy guidance through government and startup ecosystem initiatives.' },
    { title: 'Investment Partners', desc: 'Discover and invest in high-potential early-stage innovations and student-led startups.' },
    { title: 'Mentor Partners', desc: 'Guide and shape the next generation of innovators through industry expertise and experience.' }
  ];

  return (
    <section className="section gpu-accel" style={{ background: '#ffffff', padding: '120px 0' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="section-header text-center" style={{ marginBottom: '80px' }}>
          <span className="section-label">CATEGORIES</span>
          <h2 className="text-radiant" style={{ fontSize: '3.5rem', fontWeight: 900 }}>OUR PARTNERS</h2>
        </div>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          width: '100%',
          maxWidth: '1200px'
        }}>
          {partners.map((partner, i) => (
            <HoneycombCell key={partner.title} partner={partner} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerHoneycombGrid;
