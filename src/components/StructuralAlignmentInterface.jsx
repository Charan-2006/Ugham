import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const AlignmentItem = ({ number, text, index, isAnyHovered, setHoveredIdx, hoveredIdx }) => {
  const isHovered = hoveredIdx === index;
  
  return (
    <motion.div
      className="alignment-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHoveredIdx(index)}
      onMouseLeave={() => setHoveredIdx(null)}
      style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        gap: '2rem', 
        marginBottom: '1rem',
        opacity: isAnyHovered && !isHovered ? 0.5 : 1,
        transition: 'opacity 0.4s ease',
        position: 'relative',
        padding: '0.5rem 0'
      }}
    >
      {/* Number */}
      <span className="alignment-item-number" style={{ 
        fontFamily: 'monospace', 
        fontSize: '0.9rem', 
        color: 'rgba(59, 22, 254, 0.6)', 
        marginTop: '0.5rem',
        width: '40px',
        flexShrink: 0
      }}>
        {number}
      </span>

      {/* Horizontal Guide Line — desktop hover only */}
      <motion.div 
        className="alignment-guide-line"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '40px' : 0 }}
        style={{ 
          height: '1px', 
          background: 'var(--primary)', 
          position: 'absolute', 
          left: '45px', 
          top: '1.5rem',
          zIndex: 0
        }}
      />

      {/* Content */}
      <div className="alignment-item-text" style={{ position: 'relative' }}>
        <p style={{ 
          fontSize: '1.25rem', 
          lineHeight: 2.0, 
          margin: 0, 
          color: 'var(--text)',
          fontWeight: 400,
          transition: 'all 0.4s ease',
          textShadow: isHovered ? '0 0 15px rgba(59, 22, 254, 0.1)' : 'none'
        }}>
          {text}
        </p>
      </div>
    </motion.div>
  );
};

const StructuralAlignmentInterface = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const containerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  
  const leftDrift  = useTransform(springX, [-0.5, 0.5], [5, -5]);
  const rightDrift = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    mouseX.set(x);
  };

  const whyChoose = [
    'Hands-on innovation building',
    'Real-world problem solving',
    'Access to mentors & industry experts',
    'Structured pathway from idea to execution',
    'Focus on scalability and impact'
  ];

  const whatDifferent = [
    'We build alongside you – Not just guidance',
    'Execution over theory – Action-biased',
    'Real opportunities – Mentors & Investors',
    'The full journey – Idea to Venture',
    'Ecosystem integration & Growth'
  ];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="section gpu-accel" 
      style={{ background: '#ffffff', minHeight: '800px', position: 'relative', overflow: 'hidden', padding: '10rem 0' }}
    >
      <div className="container">
        <div
          className="alignment-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}
        >
          {/* Columns 1-5: Why Choose */}
          <motion.div
            className="alignment-col alignment-col--left"
            style={{ gridColumn: 'span 5', x: leftDrift }}
          >
            <h2 className="text-radiant alignment-heading" style={{ 
              fontSize: '3.5rem', 
              fontWeight: 900, 
              letterSpacing: '-0.02em', 
              marginBottom: '5rem',
              lineHeight: 1
            }}>
              WHY CHOOSE UGHAM
            </h2>
            {whyChoose.map((text, i) => (
              <AlignmentItem 
                key={i} 
                number={`0${i + 1}`} 
                text={text} 
                index={i} 
                isAnyHovered={hoveredIdx !== null}
                hoveredIdx={hoveredIdx}
                setHoveredIdx={setHoveredIdx}
              />
            ))}
          </motion.div>

          {/* Columns 6-7: Spacer */}
          <div className="alignment-spacer" style={{ gridColumn: 'span 2' }} />

          {/* Columns 8-12: What Makes Us Different */}
          <motion.div
            className="alignment-col alignment-col--right"
            style={{ gridColumn: 'span 5', x: rightDrift }}
          >
            <h2 className="text-radiant alignment-heading" style={{ 
              fontSize: '3.5rem', 
              fontWeight: 900, 
              letterSpacing: '-0.02em', 
              marginBottom: '5rem',
              lineHeight: 1
            }}>
              WHAT MAKES US DIFFERENT
            </h2>
            {whatDifferent.map((text, i) => (
              <AlignmentItem 
                key={i} 
                number={i + 6 === 10 ? '10' : `0${i + 6}`} 
                text={text} 
                index={i + 5} 
                isAnyHovered={hoveredIdx !== null}
                hoveredIdx={hoveredIdx}
                setHoveredIdx={setHoveredIdx}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StructuralAlignmentInterface;
