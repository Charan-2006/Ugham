import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

const GlowCard = ({ children, style = {}, glowColor = 'rgba(255, 255, 255, 0.3)', ...props }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10, scale: 1.02, boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        borderRadius: '24px',
        background: 'white',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        ...style 
      }}
      {...props}
    >
      {/* The Glow Overlay */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 60%)`,
          zIndex: 10,
          mixBlendMode: 'overlay',
        }}
      />
      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default GlowCard;
