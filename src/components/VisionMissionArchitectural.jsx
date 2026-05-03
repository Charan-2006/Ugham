import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const VisionMissionArchitectural = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  
  // Parallax Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
  
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-2, 2]);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [2, -2]);

  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="section gpu-accel" 
      style={{ 
        background: '#ffffff', 
        minHeight: isMobile ? 'auto' : '600px', 
        position: 'relative', 
        overflow: isMobile ? 'visible' : 'hidden', 
        padding: isMobile ? '4rem 0' : '10rem 0',
        perspective: isMobile ? 'none' : '1000px'
      }}
    >
      {/* Blueprint Reveal Grid - Desktop Only */}
      {!isMobile && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          transition={{ duration: 2 }}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }} 
        />
      )}

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap', gap: isMobile ? '3rem' : '8rem', alignItems: 'flex-start' }}>
          
          {/* Left Pillar: VISION */}
          <motion.div 
            style={{ 
              flex: isMobile ? '1 1 100%' : '1 1 400px',
              rotateY: isMobile ? 0 : rotateY,
              rotateX: isMobile ? 0 : rotateX,
              transformStyle: isMobile ? 'flat' : 'preserve-3d'
            }}
            initial={{ opacity: 0, x: isMobile ? 0 : -100, y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label text-radiant" style={{ marginBottom: isMobile ? '1rem' : '2rem', display: 'block' }}>OUR VISION</span>
            <div style={{ position: 'relative' }}>
              <h2 style={{ 
                fontSize: isMobile ? '2rem' : 'clamp(2rem, 4vw, 3rem)', 
                lineHeight: 1.1, 
                fontWeight: 900, 
                color: 'var(--text)',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                background: isMobile ? 'none' : `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 22, 254, 0.4), transparent 300px)`,
                WebkitBackgroundClip: isMobile ? 'none' : 'text',
                transition: 'background 0.1s ease'
              }}>
                To build a generation of innovators who create meaningful, scalable solutions for real-world challenges.
              </h2>
            </div>
          </motion.div>

          {/* Dynamic Column Gap (Virtual Crease) - Desktop Only */}
          {!isMobile && (
            <div style={{ width: '1px', height: '100%', position: 'absolute', left: '50%', background: 'linear-gradient(to bottom, transparent, var(--border), transparent)', opacity: 0.3 }} />
          )}

          {/* Right Pillar: MISSION */}
          <motion.div 
            style={{ 
              flex: isMobile ? '1 1 100%' : '1 1 400px',
              rotateY: isMobile ? 0 : rotateY,
              rotateX: isMobile ? 0 : rotateX,
              transformStyle: isMobile ? 'flat' : 'preserve-3d'
            }}
            initial={{ opacity: 0, x: isMobile ? 0 : 100, y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <span className="section-label text-radiant" style={{ marginBottom: isMobile ? '1rem' : '2rem', display: 'block' }}>OUR MISSION</span>
            <style>{`
              .mission-highlight { font-weight: 700; color: var(--text); transition: all 0.4s ease; cursor: default; }
              .mission-highlight:hover { color: var(--primary); text-shadow: 0 0 20px rgba(59, 22, 254, 0.2); }
            `}</style>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-muted)', 
              lineHeight: 1.8,
              fontWeight: 400
            }}>
              Create <span className="mission-highlight">100 student-led innovations</span> by 2030 and scale them into impactful ventures by enabling students to <span className="mission-highlight">learn, build, and grow</span> through the right ecosystem, mentorship, and opportunities.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VisionMissionArchitectural;
