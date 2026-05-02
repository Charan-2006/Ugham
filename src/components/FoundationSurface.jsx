import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const PlaneSurface = ({ activeZone, onHoverZone }) => {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  // Create a grid of points for the surface
  const segments = 60;
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        pos.push((i / segments - 0.5) * 10);
        pos.push(0);
        pos.push((j / segments - 0.5) * 10);
      }
    }
    return new Float32Array(pos);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i];
      const z = pos[i + 2];
      
      // Base wave
      let h = Math.sin(x * 0.5 + time * 0.4) * Math.cos(z * 0.5 + time * 0.3) * 0.2;
      
      // Hover deformation
      if (activeZone !== null) {
        // Map zone index to coordinates
        // 0: BL, 1: TL, 2: TR, 3: BR
        const targetX = activeZone === 1 || activeZone === 2 ? 2 : -2;
        const targetZ = activeZone === 2 || activeZone === 3 ? 2 : -2;
        
        const dist = Math.sqrt(Math.pow(x - targetX, 2) + Math.pow(z - targetZ, 2));
        const influence = Math.max(0, 1 - dist / 3);
        h += influence * 0.8;
      }
      
      pos[i + 1] = THREE.MathUtils.lerp(pos[i + 1], h, 0.1);
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[12, 12, segments, segments]} />
      <meshStandardMaterial 
        color="#ffffff" 
        wireframe 
        transparent 
        opacity={0.15} 
        emissive="#3b16fe"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const FoundationSurface = () => {
  const [activeZone, setActiveZone] = useState(null);

  const expertise = [
    { 
      title: 'Education Empowerment', 
      desc: 'Developing problem-solving and innovation mindset.',
      pos: { top: '70%', left: '25%' }
    },
    { 
      title: 'Innovation Enabling', 
      desc: 'Supporting idea validation and execution.',
      pos: { top: '30%', left: '25%' }
    },
    { 
      title: 'Product Building', 
      desc: 'Turning concepts into functional solutions.',
      pos: { top: '30%', left: '75%' }
    },
    { 
      title: 'Venture Creation', 
      desc: 'Helping ideas grow into scalable ventures.',
      pos: { top: '70%', left: '75%' }
    }
  ];

  return (
    <div style={{ position: 'relative', height: '800px', width: '100%', overflow: 'hidden', background: '#ffffff' }}>
      {/* 3D Canvas */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#3b16fe" />
          <PlaneSurface activeZone={activeZone} />
        </Canvas>
      </div>

      {/* Interaction Zones & Labels */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
        {expertise.map((item, idx) => (
          <div 
            key={idx}
            onMouseEnter={() => setActiveZone(idx)}
            onMouseLeave={() => setActiveZone(null)}
            style={{
              position: 'absolute',
              top: item.pos.top,
              left: item.pos.left,
              transform: 'translate(-50%, -50%)',
              width: '300px',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <AnimatePresence>
              {activeZone === idx ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-radiant" style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 800 }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '240px', margin: '0 auto' }}>{item.desc}</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}
                >
                  {item.title}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      {/* Background Gradients */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59, 22, 254, 0.05) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0, 194, 255, 0.05) 0%, transparent 70%)' }} />
      </div>
    </div>
  );
};

export default FoundationSurface;
