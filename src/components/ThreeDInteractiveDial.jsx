import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, PerspectiveCamera, ContactShadows, Line, Tetrahedron } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const PrismNode = ({ label, index, activeIdx, setActiveIdx }) => {
  const meshRef = useRef();
  const isActive = activeIdx === index;
  
  // Calculate position on arc
  const angle = (index - activeIdx) * (Math.PI / 6); // 30 degrees apart
  const radius = 8;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const z = isActive ? 2 : -2;

  useFrame((state) => {
    if (meshRef.current) {
      // Magnetic Snap & Float
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y + Math.sin(state.clock.getElapsedTime() + index) * 0.05, 0.1);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, z, 0.1);
      
      // Tilt away if not active
      const targetRotY = isActive ? state.clock.getElapsedTime() * 0.5 : Math.PI / 4;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.1);
    }
  });

  return (
    <group ref={meshRef} onPointerDown={() => setActiveIdx(index)}>
      {/* Crystalline Core (Prism) */}
      <Tetrahedron args={[1, 0]}>
        <meshPhysicalMaterial 
          color="#ffffff"
          transparent
          opacity={isActive ? 0.8 : 0.3}
          transmission={1}
          thickness={1}
          roughness={0}
          clearcoat={1}
          emissive={isActive ? "#3b16fe" : "#ffffff"}
          emissiveIntensity={isActive ? 1 : 0}
        />
      </Tetrahedron>

      {/* Weightless Tether */}
      <Line 
        points={[[0, 0, 0], [-x, -y, 0]]} 
        color={isActive ? "#ff3366" : "#cccccc"} 
        lineWidth={0.5} 
        transparent 
        opacity={isActive ? 0.6 : 0.2}
      />

      <Html position={[1.5, 0, 0]} style={{ pointerEvents: 'none', width: '300px' }}>
        <motion.div
          animate={{ 
            opacity: isActive ? 1 : 0.3,
            scale: isActive ? 1.2 : 0.9,
            x: isActive ? 20 : 0
          }}
          style={{
            color: isActive ? 'var(--primary)' : '#4A4A4A',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '1.25rem',
            background: isActive ? 'linear-gradient(135deg, #FF3366, #3b16fe)' : 'none',
            WebkitBackgroundClip: isActive ? 'text' : 'none',
            WebkitTextFillColor: isActive ? 'transparent' : 'inherit',
            transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)'
          }}
        >
          {label}
        </motion.div>
      </Html>
    </group>
  );
};

const ThreeDInteractiveDial = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const partners = [
    'Educational Institutions',
    'Industry Partners',
    'Incubation Centers',
    'Government Bodies',
    'Investors',
    'Mentors'
  ];

  return (
    <section className="section gpu-accel" style={{ background: '#ffffff', padding: '120px 0', minHeight: '1000px', overflow: 'hidden' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', alignItems: 'center' }}>
        
        {/* Left: Focal Point (Cols 1-5) */}
        <div style={{ gridColumn: 'span 5' }}>
          <span className="section-label">DIAL ARCHITECTURE</span>
          <h2 className="text-radiant" style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1 }}>
            WHO CAN<br />COLLABORATE<br />WITH US
          </h2>
          <div style={{ marginTop: '4rem' }}>
            <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>
              Interact with the engine on the right to explore our multi-layered partner ecosystem.
            </p>
          </div>
        </div>

        {/* Right: Interactive Dial (Cols 7-12) */}
        <div style={{ gridColumn: 'span 6', gridColumnStart: 7, height: '800px', position: 'relative' }}>
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[10, 0, 20]} fov={40} />
            <ambientLight intensity={1.5} />
            <pointLight position={[20, 20, 20]} intensity={2} />
            
            {partners.map((label, i) => (
              <PrismNode 
                key={i} 
                index={i} 
                label={label} 
                activeIdx={activeIdx} 
                setActiveIdx={setActiveIdx} 
              />
            ))}

            <ContactShadows 
              position={[0, -10, 0]} 
              opacity={0.2} 
              scale={40} 
              blur={2} 
              far={20} 
              color="#000000" 
            />
          </Canvas>

          {/* Navigation Controls */}
          <div style={{ 
            position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '1rem' 
          }}>
            <button className="btn btn-outline" style={{ borderRadius: '100px', padding: '0.5rem 1.5rem' }} onClick={() => setActiveIdx(prev => (prev === 0 ? partners.length - 1 : prev - 1))}>PREV</button>
            <button className="btn btn-outline" style={{ borderRadius: '100px', padding: '0.5rem 1.5rem' }} onClick={() => setActiveIdx(prev => (prev + 1) % partners.length)}>NEXT</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ThreeDInteractiveDial;
