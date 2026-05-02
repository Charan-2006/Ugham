import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Html, Float } from '@react-three/drei';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

const VectorThreads = ({ hoveredStep }) => {
  const lineRef = useRef();
  
  useFrame((state) => {
    if (lineRef.current && hoveredStep !== null) {
      lineRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 20) * 0.01;
    }
  });

  return (
    <group>
      {/* Central Spine */}
      <Line points={[[0, 8, 0], [0, -8, 0]]} color="#e2e8f0" lineWidth={1} />
      
      {/* Step Threads */}
      {[2.5, 0.8, -0.8, -2.5].map((y, i) => (
        <Line
          key={i}
          points={[[-6, y, 0], [0, y, 0]]}
          color={hoveredStep === i ? "#3b16fe" : "#f1f5f9"}
          lineWidth={hoveredStep === i ? 2 : 1}
          ref={hoveredStep === i ? lineRef : null}
        />
      ))}
    </group>
  );
};

const ArchitecturalNarrative = () => {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [hoveredPartner, setHoveredPartner] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const bodyY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const steps = [
    'Start Ugham Innovation Club in your College',
    'Share your idea or interest in club activities',
    'Collaborate with mentors and peers',
    'Start building and refining your innovation'
  ];

  const partners = [
    'Institution Partner', 'Industry Partner', 'Incubation Partner',
    'Ecosystem Partner', 'Investment Partner', 'Mentor Partner'
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="section" 
      style={{ position: 'relative', height: '900px', background: '#ffffff', overflow: 'hidden', padding: '10rem 0' }}
    >
      {/* Virtual Glass Backdrop Blur (Follows Cursor) */}
      <motion.div
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.01)',
          backdropFilter: 'blur(15px)',
          pointerEvents: 'none',
          zIndex: 15,
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(0,0,0,0.02)'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
          
          {/* Left: Get Started */}
          <div style={{ gridColumn: '1 / span 5' }}>
            <motion.div style={{ y: headingY }}>
              <span className="section-label">THE BLUEPRINT</span>
              <h2 className="text-radiant" style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '5rem' }}>
                HOW YOU CAN<br />GET STARTED
              </h2>
            </motion.div>

            <motion.div style={{ y: bodyY, display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {steps.map((text, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  initial={{ opacity: 0, z: -100 }}
                  whileInView={{ opacity: 1, z: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  style={{ 
                    fontSize: '1.25rem', 
                    color: 'var(--text)', 
                    lineHeight: 1.6, 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem'
                  }}
                >
                  <span style={{ fontSize: '0.875rem', fontWeight: 800, color: hoveredStep === i ? 'var(--primary)' : 'var(--text-muted)', transition: 'color 0.4s ease' }}>0{i+1}</span>
                  {text}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Partner With Us */}
          <div style={{ gridColumn: '8 / span 5', textAlign: 'right' }}>
            <motion.div style={{ y: headingY }}>
              <span className="section-label">THE ECOSYSTEM</span>
              <h2 className="text-radiant" style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '5rem' }}>
                PARTNER<br />WITH US
              </h2>
            </motion.div>

            <motion.div style={{ y: bodyY, display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '2rem' }}>
              {partners.map((name, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredPartner(i)}
                  onMouseLeave={() => setHoveredPartner(null)}
                  animate={{ opacity: (hoveredPartner === null || hoveredPartner === i) ? 1 : 0.6 }}
                  style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: 700, 
                    color: 'var(--text)', 
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '0.5rem 0'
                  }}
                >
                  {name}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hoveredPartner === i ? '100%' : 0 }}
                    style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: '50%', 
                      x: '-50%', 
                      height: '2px', 
                      background: 'var(--primary)' 
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* 3D Vector Spine & Threads */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={1} />
          <VectorThreads hoveredStep={hoveredStep} />
        </Canvas>
      </div>

      {/* Localized Mesh (Reactive to Focus) */}
      <AnimatePresence>
        {hoveredStep !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: '40%',
              left: '10%',
              width: '400px',
              height: '400px',
              backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

    </section>
  );
};

export default ArchitecturalNarrative;
