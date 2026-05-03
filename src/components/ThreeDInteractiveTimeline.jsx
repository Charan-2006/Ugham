import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Line, PerspectiveCamera, Torus } from '@react-three/drei';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';

const OrbOfLight = ({ scrollProgress }) => {
  const orbRef = useRef();
  
  useFrame(() => {
    if (orbRef.current) {
      // Map scroll progress to X position (-12 to 12)
      orbRef.current.position.x = (scrollProgress.get() - 0.5) * 24;
    }
  });

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshBasicMaterial color="#3b16fe" />
      <pointLight color="#ff3366" intensity={2} distance={5} />
    </mesh>
  );
};

const HollowRing = ({ position, scrollProgress, index }) => {
  const ringRef = useRef();
  const threshold = 0.2 + (index * 0.15);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      
      const distance = Math.abs(scrollProgress.get() - threshold);
      const active = distance < 0.05;
      ringRef.current.scale.setScalar(active ? 1.4 : 1);
    }
  });

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[0.4, 0.02, 16, 100]} />
      <meshStandardMaterial 
        color="#3b16fe" 
        emissive="#ff3366" 
        emissiveIntensity={0.5} 
        transparent 
        opacity={0.8} 
      />
    </mesh>
  );
};

const StagePane = ({ step, index, scrollProgress }) => {
  const [hovered, setHovered] = useState(false);
  const threshold = 0.2 + (index * 0.15);
  
  // Parallax Text vs Background
  const cardX = (index - 1) * 8; // Spread out cards
  const textX = useTransform(scrollProgress, [0, 1], [2, -2]);

  const scale = useTransform(scrollProgress, [threshold - 0.1, threshold, threshold + 0.1], [1, 1.05, 1]);
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <group position={[cardX, 2, 0]}>
      <Html center>
        <motion.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: '320px',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(30px)',
            padding: '3rem',
            borderRadius: '0px',
            boxShadow: hovered ? '0 30px 60px rgba(0,0,0,0.05)' : 'none',
            border: '1px solid rgba(0,0,0,0.03)',
            scale: springScale,
            transition: 'box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
            cursor: 'default',
            perspective: '1000px'
          }}
        >
          <motion.h3 style={{ 
            fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary)', 
            marginBottom: '1.5rem', letterSpacing: '0.1em',
            textTransform: 'uppercase',
            x: textX
          }}>
            {step.title}
          </motion.h3>
          <motion.p style={{ 
            fontSize: '1rem', color: '#4a5568', 
            lineHeight: 1.7, margin: 0,
            maxWidth: '300px',
            x: textX
          }}>
            {step.desc}
          </motion.p>
        </motion.div>
      </Html>
    </group>
  );
};

const ThreeDInteractiveTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const steps = [
    { title: 'LEARN', desc: 'Develop foundational knowledge, explore ideas, and understand real-world challenges.' },
    { title: 'BUILD', desc: 'Turn ideas into prototypes and products through guided execution and iteration.' },
    { title: 'GROW', desc: 'Scale innovations into impactful solutions, startups, or long-term ventures.' }
  ];

  return (
    <section 
      ref={containerRef}
      className="section gpu-accel" 
      style={{ 
        background: '#ffffff', 
        padding: '8rem 0', 
        position: 'relative', 
        minHeight: '800px',
        overflow: 'hidden' 
      }}
    >
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '6rem' }}>
          <span className="section-label">THE UGHAM ROADMAP</span>
          <h2 className="text-radiant" style={{ 
            fontSize: '3.5rem', 
            fontWeight: 900, 
            letterSpacing: '-0.03em' 
          }}>
            A JOURNEY OF IMPACT
          </h2>
        </div>

        <div style={{ height: '600px', width: '100%', position: 'relative' }}>
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            
            {/* Laser Guideline */}
            <Line points={[[-15, 0, 0], [15, 0, 0]]} color="#e2e8f0" lineWidth={0.5} transparent opacity={0.5} />
            
            <OrbOfLight scrollProgress={scrollYProgress} />

            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <HollowRing position={[(i - 1) * 8, 0, 0]} scrollProgress={scrollYProgress} index={i} />
                <StagePane step={step} index={i} scrollProgress={scrollYProgress} />
              </React.Fragment>
            ))}
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default ThreeDInteractiveTimeline;
