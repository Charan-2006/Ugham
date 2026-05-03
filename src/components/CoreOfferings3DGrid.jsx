import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

const OfferingModule = ({ title, desc, index, isAnyHovered, hoveredIdx, setHoveredIdx }) => {
  const isHovered = hoveredIdx === index;
  const cardRef = useRef(null);
  
  // Parallax Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredIdx(index)}
      onMouseLeave={() => setHoveredIdx(null)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        perspective: '1000px',
        filter: isAnyHovered && !isHovered ? 'blur(2px)' : 'none',
        transition: 'filter 0.4s ease'
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          z: isHovered ? 15 : 0,
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          padding: '4rem',
          borderRadius: '0px',
          border: '1px solid rgba(0,0,0,0.03)',
          boxShadow: isHovered ? '0 30px 60px rgba(0,0,0,0.05)' : 'none',
          position: 'relative',
          overflow: 'hidden',
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transformStyle: 'preserve-3d'
        }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Subtle Wireframe Accent */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundImage: 'linear-gradient(rgba(59, 22, 254, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 22, 254, 0.02) 1px, transparent 1px)', 
          backgroundSize: '30px 30px', 
          opacity: 0.2,
          pointerEvents: 'none',
          transform: `translateZ(-10px) scale(1.1)`
        }} />

        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 800, 
          letterSpacing: '-0.01em', 
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          color: 'var(--text)',
          transform: 'translateZ(20px)'
        }}>
          {title}
        </h3>
        <p style={{ 
          fontSize: '1rem', 
          color: '#4a5568', // Charcoal gray
          lineHeight: 1.7,
          fontWeight: 400,
          margin: 0,
          transform: 'translateZ(10px)'
        }}>
          {desc}
        </p>

        {/* Prism Light Dispersion Effect */}
        <motion.div 
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '40%', height: '100%', 
            background: 'linear-gradient(90deg, transparent, rgba(255, 51, 102, 0.05), rgba(59, 22, 254, 0.05), transparent)', 
            transform: 'skewX(-20deg)',
            pointerEvents: 'none'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const CoreOfferings3DGrid = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const offerings = [
    { title: 'Education Empowerment', desc: 'We equip students with the right mindset, skills, and tools to think creatively and solve real-world problems through a curated innovation curriculum.' },
    { title: 'Innovation Enabling', desc: 'We create a seamless ecosystem that nurtures experimentation, critical thinking, and breakthrough ideas within your institution.' },
    { title: 'Product Building', desc: 'Transforming ideas into tangible products through structured guidance, expert mentorship, and hands-on execution support.' },
    { title: 'Venture Creation', desc: 'Supporting students in scaling their innovations into sustainable startups and impactful ventures with strategic growth pathways.' }
  ];

  return (
    <section className="section gpu-accel" style={{ background: '#ffffff', padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '6rem' }}>
          <span className="section-label">SERVICES</span>
          <h2 className="text-radiant" style={{ 
            fontSize: '3.5rem', 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: '-0.02em',
            position: 'relative'
          }}>
            CORE OFFERINGS
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem' }}>
          {offerings.map((off, i) => (
            <OfferingModule 
              key={i} 
              index={i} 
              title={off.title} 
              desc={off.desc} 
              isAnyHovered={hoveredIdx !== null}
              hoveredIdx={hoveredIdx}
              setHoveredIdx={setHoveredIdx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreOfferings3DGrid;
