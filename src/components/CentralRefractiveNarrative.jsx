import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment, Line, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const RefractiveMonolith = ({ mousePos }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      // Barely perceptible drift
      meshRef.current.position.y = Math.sin(time * 0.2) * 0.1;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mousePos.x * 0.3, 0.02);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mousePos.y * 0.2, 0.02);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3.5, 7, 3.5]} />
      <MeshTransmissionMaterial
        backside
        samples={16}
        thickness={4}
        chromaticAberration={1.5}
        anisotropy={0.5}
        distortion={0.3}
        distortionScale={0.2}
        temporalDistortion={0.1}
        clearcoat={1}
        attenuationDistance={2}
        attenuationColor="#ffffff"
        color="#f8fafc"
      />
    </mesh>
  );
};

const WireframeNode = ({ position, active, label }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial 
          wireframe 
          color={active ? "#3b16fe" : "#cbd5e1"} 
          emissive={active ? "#3b16fe" : "#000000"}
          emissiveIntensity={active ? 2 : 0}
          transparent
          opacity={0.6}
        />
      </mesh>
      <Html position={[0.8, 0, 0]} center>
        <motion.div
          style={{
            whiteSpace: 'nowrap',
            padding: '0.5rem 1rem',
            background: 'rgba(255, 255, 255, 0.01)',
            backdropFilter: 'blur(10px)',
            borderRadius: '4px',
            border: `1px solid ${active ? 'rgba(59, 22, 254, 0.3)' : 'rgba(0,0,0,0.05)'}`,
            color: active ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            transition: 'all 0.5s ease'
          }}
        >
          {label}
        </motion.div>
      </Html>
    </group>
  );
};

const CentralRefractiveNarrative = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredStep, setHoveredStep] = useState(null);
  const [hoveredPartner, setHoveredPartner] = useState(null);

  const steps = [
    { num: '01', text: 'Start Ugham Innovation Club in your College' },
    { num: '02', text: 'Share your idea or interest in club activities' },
    { num: '03', text: 'Collaborate with mentors and peers' },
    { num: '04', text: 'Start building and refining your innovation' }
  ];

  const partners = [
    'Institution Partner', 'Industry Partner', 'Incubation Partner',
    'Ecosystem Partner', 'Investment Partner', 'Mentor Partner'
  ];

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  return (
    <section 
      className="section" 
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', minHeight: '1100px', background: '#ffffff', overflow: 'hidden', padding: '10rem 0' }}
    >
      {/* Background Mesh Network (1px lines) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.1 }}>
        <svg width="100%" height="100%">
          <pattern id="grid-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--border)" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
          
          {/* Left Narrative: Steps */}
          <div style={{ gridColumn: '1 / span 5' }}>
            <span className="section-label" style={{ marginBottom: '1rem' }}>The Path to Innovation</span>
            <h2 className="text-radiant" style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '4rem' }}>
              HOW YOU CAN<br />GET STARTED
            </h2>

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  whileHover={{ x: 20 }}
                  style={{ 
                    padding: '2rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '4px',
                    borderLeft: `4px solid ${hoveredStep === i ? 'var(--primary)' : 'var(--border)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <div style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 800, 
                    color: hoveredStep === i ? 'var(--primary)' : 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    fontFamily: 'monospace'
                  }}>
                    STEP {step.num}
                  </div>
                  <h4 style={{ 
                    fontSize: '1.125rem', 
                    margin: 0, 
                    color: hoveredStep === i ? 'var(--primary)' : 'var(--text)',
                    textShadow: hoveredStep === i ? '1px 0 10px rgba(59,22,254,0.1)' : 'none'
                  }}>
                    {step.text}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Narrative: Ecosystem */}
          <div style={{ gridColumn: '7 / span 6', textAlign: 'right' }}>
            <span className="section-label" style={{ marginBottom: '1rem' }}>Ecosystem Integration</span>
            <h2 className="text-radiant" style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '4rem' }}>
              PARTNER<br />WITH US
            </h2>
            
            <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '4rem', maxWidth: '400px', marginLeft: 'auto' }}>
              Join us in shaping the future of innovation. Collaborate with Ugham as we build the foundations of tomorrow.
            </p>
          </div>

        </div>
      </div>

      {/* 3D Refractive Scene */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          
          {/* Central Monolith */}
          <group position={[2, 0, 0]}>
            <RefractiveMonolith mousePos={mousePos} />
          </group>

          {/* Wireframe Nodes around Monolith */}
          {partners.map((name, i) => {
            const angle = (i / partners.length) * Math.PI * 2;
            const radius = 6;
            const x = 2 + Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <WireframeNode 
                key={i} 
                position={[x, y, 0]} 
                label={name} 
                active={hoveredPartner === i}
                onPointerOver={() => setHoveredPartner(i)}
                onPointerOut={() => setHoveredPartner(null)}
              />
            );
          })}
        </Canvas>
      </div>

      {/* Light Beam Visual (CSS Overlay) */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: 0, 
        width: '100%', 
        height: '2px', 
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 40%, var(--primary) 50%, var(--accent) 60%, rgba(255,255,255,0) 100%)',
        opacity: 0.1,
        pointerEvents: 'none',
        transform: `translateY(${mousePos.y * 50}px) rotate(${mousePos.x * 2}deg)`,
        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
      }} />

    </section>
  );
};

export default CentralRefractiveNarrative;
