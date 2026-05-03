import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const ConnectionBeam = () => {
  const lineRef = useRef();
  
  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.getElapsedTime();
      const pulseT = (time % 4) / 4;
      // We'll handle the pulse color in a separate mesh or shader if needed, 
      // but for simplicity we'll just have the line exist.
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Line points={[[-2, 0, 0], [2, 0, 0]]} color="#e2e8f0" lineWidth={0.5} transparent opacity={0.3} />
      <Sparkles count={5} scale={1} size={1} speed={0.2} color="#3b16fe" />
    </group>
  );
};

const StaggeredLine = ({ text, index, mouseX, mouseY }) => {
  const lineRef = useRef();
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start end", "end start"]
  });

  // Elastic Scrolling (String-Friction)
  const yOffset = useTransform(scrollYProgress, [0, 1], [index * 5, index * -5]);
  const ySpring = useSpring(yOffset, { stiffness: 50, damping: 20 });

  return (
    <motion.div 
      ref={lineRef}
      style={{ 
        y: ySpring,
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem', 
        marginBottom: '1.5rem',
        position: 'relative'
      }}
      whileHover={{ scale: 1.02 }}
    >
      <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--primary)', opacity: 0.5 }}>
        0{index + 1}
      </span>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="balance-text" style={{ margin: 0, fontSize: '1.125rem', fontWeight: 500, color: 'var(--text)' }}>
          {text}
        </p>
        {/* Ghost Highlighting */}
        <motion.div 
          className="ghost-shadow"
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            background: 'linear-gradient(90deg, rgba(59,22,254,0.05), transparent)', 
            borderRadius: '4px', zIndex: -1, opacity: 0 
          }}
          whileHover={{ opacity: 1, x: 10 }}
        />
      </div>
    </motion.div>
  );
};

const InteractiveBalanceLayout = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const scaleX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const scaleY = useSpring(mouseY, { stiffness: 60, damping: 30 });

  const leftY = useTransform(scaleX, [-0.5, 0.5], [10, -10]);
  const rightY = useTransform(scaleX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const whyChoose = [
    'Hands-on innovation building',
    'Real-world problem solving',
    'Access to mentors & experts',
    'Pathway from idea to execution',
    'Focus on scalability and impact'
  ];

  const whatDifferent = [
    'We build alongside you',
    'Execution over theory',
    'Real mentorship & opportunities',
    'The full journey supported',
    'Action-biased methodology'
  ];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="section gpu-accel" 
      style={{ background: '#ffffff', minHeight: '700px', position: 'relative', overflow: 'hidden', padding: '10rem 0' }}
    >
      {/* Central Void Beam */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '300px', height: '200px', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 0 }}>
        <Canvas>
          <ConnectionBeam />
        </Canvas>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', alignItems: 'center' }}>
          
          {/* Left Column: Why Choose (Col 1-5) */}
          <motion.div style={{ gridColumn: 'span 5', y: leftY }}>
            <h2 className="text-radiant" style={{ marginBottom: '4rem', fontSize: '2rem' }}>WHY CHOOSE UGHAM</h2>
            {whyChoose.map((text, i) => (
              <StaggeredLine key={i} text={text} index={i} />
            ))}
          </motion.div>

          {/* Center Void Space (Col 6) */}
          <div style={{ gridColumn: 'span 2' }} />

          {/* Right Column: What Different (Col 7-12) */}
          <motion.div style={{ gridColumn: 'span 5', y: rightY }}>
            <h2 className="text-radiant" style={{ marginBottom: '4rem', fontSize: '2rem' }}>WHAT MAKES US DIFFERENT</h2>
            {whatDifferent.map((text, i) => (
              <StaggeredLine key={i} text={text} index={i + 5} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default InteractiveBalanceLayout;
