import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Html, MeshWobbleMaterial, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const SilkPlane = ({ hoveredIdx, hoveredSide }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i];
      const y = pos[i + 1];
      
      // Base liquid-silk undulation
      let z = Math.sin(x * 0.3 + time * 0.4) * Math.cos(y * 0.3 + time * 0.3) * 0.4;
      
      // Elevated plateaus
      if (x < -2) z += 0.3; // Left plateau
      if (x > 2) z += 0.3;  // Right plateau

      // Pinch/Pull effect on hover
      if (hoveredIdx !== null) {
        const targetX = hoveredSide === 'left' ? -6 : 6;
        const targetY = (hoveredIdx - 1.5) * -2; // Rough mapping
        const dist = Math.sqrt(Math.pow(x - targetX, 2) + Math.pow(y - targetY, 2));
        z += Math.exp(-dist * 0.8) * 0.6;
      }
      
      pos[i + 2] = z;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 10, 0, 0]} position={[0, 0, -2]}>
      <planeGeometry args={[24, 16, 64, 64]} />
      <meshStandardMaterial 
        color="#ffffff" 
        metalness={0.1} 
        roughness={0.05} 
        wireframe={false}
        emissive="#ffffff"
        emissiveIntensity={0.05}
      />
      {/* Wireframe Mesh Overlay (3% opacity) */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[24, 16, 64, 64]} />
        <meshStandardMaterial wireframe color="#000000" transparent opacity={0.03} />
      </mesh>
    </mesh>
  );
};

const FloatingNode = ({ num, pos, active, mousePos }) => {
  const shadowX = (mousePos.x * 10);
  const shadowY = (mousePos.y * 10);

  return (
    <Html position={pos} center>
      <div style={{ position: 'relative' }}>
        {/* Real Shadow */}
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '10px',
          width: '40px', 
          height: '40px', 
          background: 'rgba(0,0,0,0.1)', 
          borderRadius: '50%', 
          filter: 'blur(8px)',
          transform: `translate(${shadowX}px, ${shadowY}px)`,
          transition: 'transform 0.1s ease-out'
        }} />
        
        {/* Glass Node */}
        <motion.div
          animate={{ y: active ? -10 : 0 }}
          style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            background: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '1rem',
            fontWeight: 800,
            color: active ? 'var(--primary)' : 'rgba(0,0,0,0.3)',
            boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)',
            zIndex: 10
          }}
        >
          {num}
        </motion.div>
      </div>
    </Html>
  );
};

const MorphingSurfaceNarrative = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [hoveredSide, setHoveredSide] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  return (
    <section 
      className="section" 
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', height: '1000px', background: '#ffffff', overflow: 'hidden', padding: '8rem 0' }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
          
          {/* Left: Get Started */}
          <div style={{ gridColumn: '1 / span 5' }}>
            <h2 style={{ 
              fontFamily: 'serif', 
              fontSize: '3.5rem', 
              fontWeight: 900, 
              color: 'var(--text)', 
              lineHeight: 1, 
              marginBottom: '5rem',
              textTransform: 'uppercase'
            }}>
              How You Can<br /><span className="text-radiant">Get Started</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
              {steps.map((text, i) => (
                <div 
                  key={i} 
                  onMouseEnter={() => { setHoveredIdx(i); setHoveredSide('left'); }}
                  onMouseLeave={() => { setHoveredIdx(null); setHoveredSide(null); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}
                >
                  <div style={{ width: '40px', height: '40px' }} /> {/* Spacer for node */}
                  <motion.p 
                    animate={{ 
                      color: (hoveredIdx === i && hoveredSide === 'left') ? 'var(--primary)' : 'var(--text-muted)',
                      letterSpacing: (hoveredIdx === i && hoveredSide === 'left') ? '0.05em' : '0em'
                    }}
                    style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 500, 
                      margin: 0, 
                      transition: 'all 0.4s ease',
                      mixBlendMode: 'multiply'
                    }}
                  >
                    {text}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Partners */}
          <div style={{ gridColumn: '8 / span 5', textAlign: 'right' }}>
            <h2 style={{ 
              fontFamily: 'serif', 
              fontSize: '3.5rem', 
              fontWeight: 900, 
              color: 'var(--text)', 
              lineHeight: 1, 
              marginBottom: '5rem',
              textTransform: 'uppercase'
            }}>
              Partner<br /><span className="text-radiant">With Us</span>
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'flex-end' }}>
              {partners.map((name, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => { setHoveredIdx(i); setHoveredSide('right'); }}
                  onMouseLeave={() => { setHoveredIdx(null); setHoveredSide(null); }}
                  whileHover={{ scale: 1.05 }}
                  style={{ 
                    padding: '1rem 2rem', 
                    background: (hoveredIdx === i && hoveredSide === 'right') ? 'rgba(59, 22, 254, 0.05)' : 'transparent',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    color: (hoveredIdx === i && hoveredSide === 'right') ? 'var(--primary)' : 'var(--text-muted)'
                  }}
                >
                  {name}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* R3F Liquid Silk Surface */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
        <Canvas camera={{ position: [0, 0, 12], fov: 40 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          
          <SilkPlane hoveredIdx={hoveredIdx} hoveredSide={hoveredSide} />
          
          {/* Floating Nodes for Steps */}
          {[1.5, 0.5, -0.5, -1.5].map((y, i) => (
            <FloatingNode 
              key={i} 
              num={i + 1} 
              pos={[-9, y * 1.8 + 0.5, 0]} 
              active={hoveredIdx === i && hoveredSide === 'left'}
              mousePos={mousePos}
            />
          ))}
        </Canvas>
      </div>

      {/* Luxury Editorial Styling */}
      <style>{`
        .engraved-text {
          text-shadow: inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.8);
        }
      `}</style>
    </section>
  );
};

export default MorphingSurfaceNarrative;
