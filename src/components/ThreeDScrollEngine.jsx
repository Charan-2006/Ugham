import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, PerspectiveCamera, ContactShadows, Line, Tetrahedron } from '@react-three/drei';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const GlassBladeNode = ({ label, index, scrollYProgress }) => {
  const meshRef = useRef();
  
  // Calculate relative progress for this item
  // Each item occupies a portion of the scroll
  const count = 6;
  const start = index / count;
  const end = (index + 1) / count;
  const mid = (start + end) / 2;

  // Active state based on scroll position
  const opacity = useTransform(scrollYProgress, [mid - 0.1, mid, mid + 0.1], [0.2, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [mid - 0.1, mid, mid + 0.1], [0.8, 1.2, 0.8]);
  const zPos = useTransform(scrollYProgress, [mid - 0.1, mid, mid + 0.1], [-2, 2, -2]);
  
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const springZ = useSpring(zPos, { stiffness: 100, damping: 30 });

  useFrame((state) => {
    if (meshRef.current) {
      const active = springOpacity.get() > 0.8;
      // Rotation & Float
      meshRef.current.rotation.y = active ? state.clock.getElapsedTime() * 2 : state.clock.getElapsedTime() * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() + index) * 0.05;
      meshRef.current.position.z = springZ.get();
    }
  });

  return (
    <group ref={meshRef} position={[0, (index - 2.5) * 2, 0]}>
      {/* 3D Glass Prism (Tetrahedron) */}
      <Tetrahedron args={[0.5, 0]} position={[-2, 0, 0]}>
        <meshPhysicalMaterial 
          color="#ffffff"
          transparent
          opacity={0.3}
          transmission={1}
          thickness={0.5}
          roughness={0.05}
          clearcoat={1}
        />
      </Tetrahedron>

      <Html position={[0, 0, 0]} center style={{ pointerEvents: 'none' }}>
        <motion.div
          style={{
            width: '500px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            opacity: springOpacity,
            scale: springScale,
            willChange: 'transform, opacity'
          }}
        >
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#D1D1D1',
            background: springOpacity.get() > 0.8 ? 'linear-gradient(135deg, #FF3366, #3b16fe)' : 'none',
            WebkitBackgroundClip: springOpacity.get() > 0.8 ? 'text' : 'none',
            WebkitTextFillColor: springOpacity.get() > 0.8 ? 'transparent' : '#D1D1D1',
            transition: 'color 0.4s ease'
          }}>
            {label}
          </span>
        </motion.div>
      </Html>
    </group>
  );
};

const ThreeDScrollEngine = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const partners = [
    'Educational Institutions',
    'Industry Partners',
    'Incubation Centers',
    'Government Bodies',
    'Investors',
    'Mentors'
  ];

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <section className="section gpu-accel" style={{ 
        background: '#ffffff', 
        height: '100vh', 
        position: 'sticky', 
        top: 0, 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', alignItems: 'center' }}>
          
          {/* Left: Content Anchor (Cols 1-5) */}
          <div style={{ gridColumn: 'span 5' }}>
            <span className="section-label">SCROLL ENGINE</span>
            <h2 className="text-radiant" style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1 }}>
              WHO CAN<br />COLLABORATE<br />WITH US
            </h2>
            <div style={{ marginTop: '3rem' }}>
              <p style={{ color: 'var(--text-muted)', maxWidth: '350px' }}>
                Use your scroll wheel to spin the partner engine and discover collaboration pathways.
              </p>
            </div>
          </div>

          {/* Right: Vertical Carousel (Cols 7-11) */}
          <div style={{ gridColumn: 'span 5', gridColumnStart: 7, height: '600px', position: 'relative' }}>
            <Canvas dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={2} />
              
              <group position-y={useTransform(scrollYProgress, [0, 1], [4, -4]).get()}>
                {partners.map((label, i) => (
                  <GlassBladeNode 
                    key={i} 
                    index={i} 
                    label={label} 
                    scrollYProgress={scrollYProgress} 
                  />
                ))}
              </group>

              <ContactShadows 
                position={[0, -5, 0]} 
                opacity={0.2} 
                scale={20} 
                blur={2.5} 
                far={10} 
                color="#000000" 
              />
            </Canvas>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ThreeDScrollEngine;
