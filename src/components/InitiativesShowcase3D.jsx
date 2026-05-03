import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, PerspectiveCamera, ContactShadows, Line, Box, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const InitiativeMonolith = ({ item, index, activeIdx, setActiveIdx }) => {
  const meshRef = useRef();
  const isActive = activeIdx === index;
  
  useFrame((state) => {
    if (meshRef.current) {
      // Ambient Floating Physics
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() + index * 0.5) * 0.15;
      
      // Target position based on active state
      const targetX = (index - activeIdx) * 6;
      const targetZ = isActive ? 2 : -2;
      const targetRotY = isActive ? 0 : (index < activeIdx ? 0.5 : -0.5);
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.1);
    }
  });

  return (
    <group ref={meshRef}>
      {/* Monolith Body (Frosted Glass) */}
      <Box args={[4.5, 6.5, 0.1]} onPointerDown={() => setActiveIdx(index)}>
        <meshPhysicalMaterial 
          color="#ffffff"
          transparent
          opacity={0.1}
          roughness={0.02}
          transmission={1}
          thickness={0.5}
          clearcoat={1}
        />
      </Box>

      {/* Internal Core Accent (Vibrant Brand Filament) */}
      <Box args={[0.08, 6.5, 0.08]} position={[-2.2, 0, 0.06]}>
        <meshStandardMaterial color={isActive ? "#ff3366" : "#3b16fe"} emissive={isActive ? "#ff3366" : "#3b16fe"} emissiveIntensity={3} />
      </Box>

      <Html position={[0, 0, 0.1]} center transform distanceFactor={8}>
        <motion.div 
          animate={{ 
            opacity: isActive ? 1 : 0.4,
            scale: isActive ? 1 : 0.9
          }}
          style={{
            width: '360px',
            padding: '3rem',
            textAlign: 'left',
            color: '#0f172a',
            pointerEvents: 'none',
            fontFamily: 'var(--font-heading)'
          }}
        >
          <h3 style={{ 
            fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.5rem', 
            textTransform: 'uppercase', letterSpacing: '0.05em',
            lineHeight: 1.1,
            background: isActive ? 'linear-gradient(135deg, #FF3366, #3b16fe)' : 'none',
            WebkitBackgroundClip: isActive ? 'text' : 'none',
            WebkitTextFillColor: isActive ? 'transparent' : '#0f172a'
          }}>
            {item.title}
          </h3>
          <AnimatePresence>
            {isActive && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#4A4A4A', margin: 0 }}
              >
                {item.desc}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </Html>
    </group>
  );
};

const ConnectivityFilaments = ({ activeIdx, count }) => {
  return (
    <group>
      {Array.from({ length: count - 1 }).map((_, i) => (
        <Line 
          key={i}
          points={[[(i - activeIdx) * 6, 0, -2], [(i + 1 - activeIdx) * 6, 0, -2]]}
          color="#3b16fe"
          lineWidth={0.5}
          transparent
          opacity={0.1}
        />
      ))}
    </group>
  );
};

const InitiativesShowcase3D = () => {
  const [activeIdx, setActiveIdx] = useState(1);

  const items = [
    { title: 'Founders Workshops', desc: 'Deep-dive sessions with serial entrepreneurs focusing on zero-to-one product building and market entry strategies.' },
    { title: 'Innovation Labs', desc: 'A 12-week structured program where ideas are stress-tested, prototyped, and prepared for venture scaling.' },
    { title: 'Elite Mentorship', desc: 'Direct 1-on-1 access to a global network of industry leaders, engineers, and venture capital partners.' },
    { title: 'Builder Grants', desc: 'Non-dilutive funding for high-potential student projects that demonstrate technical excellence and market viability.' }
  ];

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % items.length);
  const handlePrev = () => setActiveIdx((prev) => (prev === 0 ? items.length - 1 : prev - 1));

  return (
    <section className="section gpu-accel" style={{ background: '#ffffff', padding: '40px 0', minHeight: '600px' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="section-header text-center" style={{ marginBottom: '40px', textAlign: 'center', width: '100%' }}>
          <span className="section-label" style={{ margin: '0 auto 1.5rem' }}>FUTURE-READY</span>
          <h2 className="text-radiant" style={{ fontSize: '3.5rem', fontWeight: 900, textAlign: 'center', width: '100%' }}>UGHAM INITIATIVES</h2>
        </div>

        <div style={{ height: '500px', width: '100vw', maxWidth: '1400px', position: 'relative', cursor: 'grab' }}>
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} />

            <ConnectivityFilaments activeIdx={activeIdx} count={items.length} />

            {items.map((item, i) => (
              <InitiativeMonolith 
                key={i} 
                item={item} 
                index={i} 
                activeIdx={activeIdx} 
                setActiveIdx={setActiveIdx} 
              />
            ))}

            <ContactShadows 
              position={[0, -6, 0]} 
              opacity={0.3} 
              scale={40} 
              blur={2.5} 
              far={10} 
              color="#000000" 
            />
          </Canvas>
        </div>

        {/* Navigation Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', marginTop: '2rem' }}>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {items.map((_, i) => (
              <div 
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  width: i === activeIdx ? '40px' : '10px',
                  height: '4px',
                  background: i === activeIdx ? 'var(--primary)' : 'rgba(0,0,0,0.1)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <motion.button 
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="btn btn-outline"
              style={{ padding: '0.75rem 2.5rem', borderRadius: '4px', fontSize: '0.875rem' }}
            >
              PREVIOUS
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="btn btn-outline"
              style={{ padding: '0.75rem 2.5rem', borderRadius: '4px', fontSize: '0.875rem' }}
            >
              NEXT
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InitiativesShowcase3D;
