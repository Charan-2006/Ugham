import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Line, PerspectiveCamera, Torus, Box, MeshDistortMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';

const CrystalSpine = () => {
  return (
    <Box args={[30, 0.05, 0.05]} position={[0, 0, 0]}>
      <meshPhysicalMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.3} 
        roughness={0.1} 
        transmission={0.9} 
        thickness={0.5} 
      />
    </Box>
  );
};

const ProgressOrb = ({ scrollProgress }) => {
  const orbRef = useRef();
  
  useFrame(() => {
    if (orbRef.current) {
      orbRef.current.position.x = (scrollProgress.get() - 0.5) * 24;
    }
  });

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshStandardMaterial color="#3b16fe" emissive="#ff3366" emissiveIntensity={0.8} />
      <pointLight color="#ff3366" intensity={2} distance={5} />
    </mesh>
  );
};

const Monolith = ({ step, index, scrollProgress }) => {
  const [hovered, setHovered] = useState(false);
  const threshold = 0.2 + (index * 0.15);
  
  const cardX = (index - 1) * 9;
  
  // Z-Shift and Rotation on activation
  const zShift = useTransform(scrollProgress, [threshold - 0.1, threshold, threshold + 0.1], [0, 1.5, 0]);
  const rotationY = useTransform(scrollProgress, [threshold - 0.1, threshold, threshold + 0.1], [0, Math.PI / 90, 0]); // ~2 degrees
  
  const springZ = useSpring(zShift, { stiffness: 60, damping: 20 });
  const springRot = useSpring(rotationY, { stiffness: 60, damping: 20 });

  return (
    <group position={[cardX, 3, 0]}>
      {/* Laser Filament Connector */}
      <Line points={[[0, 0, 0], [0, -3, 0]]} color="#3b16fe" lineWidth={0.5} transparent opacity={0.3} />
      
      <Html center transform rotation-y={springRot.get()} position-z={springZ.get()} style={{ pointerEvents: 'auto' }}>
        <motion.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: '340px',
            aspectRatio: '4/3',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(15px)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: '0px',
            border: '1px solid rgba(255,255,255,0.4)',
            borderTopLeftRadius: '4px',
            boxShadow: hovered ? '0 40px 80px rgba(0,0,0,0.06)' : 'none',
            boxShadow: 'inset 1px 1px 0px rgba(255,255,255,0.5)',
            transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
            cursor: 'default',
            textAlign: 'center'
          }}
        >
          <h3 style={{ 
            fontSize: '1.5rem', fontWeight: 900, 
            background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '1rem', letterSpacing: '0.05em' 
          }}>
            {step.title}
          </h3>
          <p style={{ 
            fontSize: '1rem', color: '#4A4A4A', 
            lineHeight: 1.7, margin: 0 
          }}>
            {step.desc}
          </p>
        </motion.div>
      </Html>
    </group>
  );
};

const HollowRing = ({ position, scrollProgress, index }) => {
  const ringRef = useRef();
  const threshold = 0.2 + (index * 0.15);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      const distance = Math.abs(scrollProgress.get() - threshold);
      const active = distance < 0.05;
      ringRef.current.scale.setScalar(active ? 1.5 : 1);
    }
  });

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[0.5, 0.015, 16, 100]} />
      <meshStandardMaterial color="#3b16fe" transparent opacity={0.6} />
    </mesh>
  );
};

const ArchitecturalThreeDTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const steps = [
    { title: 'LEARN', desc: 'Develop foundational knowledge, explore ideas, and understand real-world challenges through deep research and insight gathering.' },
    { title: 'BUILD', desc: 'Turn ideas into prototypes and products through guided execution, iteration, and hands-on building with expert mentorship.' },
    { title: 'GROW', desc: 'Scale innovations into impactful solutions, startups, or long-term ventures with strategic support and ecosystem growth.' }
  ];

  return (
    <section 
      ref={containerRef}
      className="section gpu-accel" 
      style={{ 
        background: '#ffffff', 
        padding: '12rem 0', 
        position: 'relative', 
        minHeight: '1000px',
        overflow: 'hidden' 
      }}
    >
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '8rem' }}>
          <span className="section-label">THE UGHAM ROADMAP</span>
          <h2 className="text-radiant" style={{ 
            fontSize: '3.5rem', 
            fontWeight: 900, 
            letterSpacing: '-0.03em' 
          }}>
            A JOURNEY OF IMPACT
          </h2>
        </div>

        <div style={{ height: '800px', width: '100%', position: 'relative' }}>
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            
            <CrystalSpine />
            <ProgressOrb scrollProgress={scrollYProgress} />

            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <HollowRing position={[(i - 1) * 9, 0, 0]} scrollProgress={scrollYProgress} index={i} />
                <Monolith step={step} index={i} scrollProgress={scrollYProgress} />
              </React.Fragment>
            ))}
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default ArchitecturalThreeDTimeline;
