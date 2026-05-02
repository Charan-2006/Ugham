import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const CubeCluster = ({ activeIdx }) => {
  const cubesRef = useRef([]);
  const count = 27; // 3x3x3 grid base
  
  // Define formations for each state
  const formations = useMemo(() => [
    // 0: Monolith (Compact vertical block)
    Array.from({ length: count }, (_, i) => ({
      pos: [(i % 3 - 1) * 0.5, Math.floor(i / 9 - 1) * 1.5, (Math.floor(i / 3) % 3 - 1) * 0.5],
      rot: [0, 0, 0]
    })),
    // 1: Floating Grid (Wide horizontal spread)
    Array.from({ length: count }, (_, i) => ({
      pos: [(i % 6 - 2.5) * 1.2, (Math.floor(i / 6) - 2) * 1.2, 0],
      rot: [Math.PI / 4, Math.PI / 4, 0]
    })),
    // 2: Orbital Ring
    Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return {
        pos: [Math.cos(angle) * 3, Math.sin(angle) * 3, 0],
        rot: [0, 0, angle]
      };
    }),
    // 3: Kinetic Depth (Scattered along Z axis)
    Array.from({ length: count }, (_, i) => ({
      pos: [(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 6],
      rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0]
    }))
  ], []);

  useFrame((state, delta) => {
    const targetFormation = formations[activeIdx] || formations[0];
    cubesRef.current.forEach((cube, i) => {
      if (!cube) return;
      const target = targetFormation[i] || targetFormation[0];
      
      // Smooth interpolation with high inertia
      cube.position.lerp(new THREE.Vector3(...target.pos), 0.1);
      
      // Floating motion
      const time = state.clock.getElapsedTime();
      cube.position.y += Math.sin(time + i) * 0.002;
      
      // Rotation
      cube.rotation.x += delta * 0.2;
      cube.rotation.y += delta * 0.3;
    });
  });

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <mesh 
          key={i} 
          ref={el => cubesRef.current[i] = el}
          position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}
        >
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial 
            color="#3b16fe" 
            transparent 
            opacity={0.6} 
            metalness={0.8} 
            roughness={0.1}
          />
        </mesh>
      ))}
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b16fe" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00C2FF" />
    </group>
  );
};

const KineticGridExpertise = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const expertise = [
    { title: 'Education Empowerment', desc: 'Developing problem-solving and innovation mindset through structured learning paths and collaborative research environments.' },
    { title: 'Innovation Enabling', desc: 'Supporting idea validation and execution by providing a high-performance ecosystem, expert mentors, and resource stability.' },
    { title: 'Product Building', desc: 'Turning ambitious concepts into market-ready, functional solutions with precision engineering and agile development cycles.' },
    { title: 'Venture Creation', desc: 'Helping ideas grow into scalable ventures that drive systemic community change through strategic growth and investment readiness.' }
  ];

  return (
    <section className="section" style={{ position: 'relative', background: '#ffffff', minHeight: '800px', display: 'flex', overflow: 'hidden' }}>
      <div className="container" style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center' }}>
        
        {/* Left: 60% Canvas Area */}
        <div style={{ flex: '0 0 60%', height: '700px', position: 'relative' }}>
          <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
            <KineticGrid cubesRef={useRef([])} activeIdx={activeIdx} />
            <CubeCluster activeIdx={activeIdx} />
          </Canvas>
        </div>

        {/* Right: 40% Control Panel */}
        <div style={{ flex: '0 0 40%', paddingLeft: '4rem', position: 'relative' }}>
          
          {/* Section Heading */}
          <div style={{ marginBottom: '4rem' }}>
            <span className="section-label" style={{ marginBottom: '1rem' }}>Our Foundations</span>
            <h2 className="text-radiant" style={{ fontSize: '2.5rem', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1 }}>
              Strong Foundations<br />For Innovation
            </h2>
          </div>

          <div style={{ display: 'flex' }}>
            {/* Monospaced Sidebar */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '2rem', 
              paddingRight: '2rem', 
              borderRight: '1px solid var(--border)',
              fontFamily: 'monospace'
            }}>
              {expertise.map((_, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setActiveIdx(i)}
                  style={{ 
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    color: activeIdx === i ? 'var(--primary)' : 'var(--text-muted)',
                    transition: 'color 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <span>{`0${i + 1}`}</span>
                  {activeIdx === i && (
                    <motion.div layoutId="activeBar" style={{ width: '20px', height: '2px', background: 'var(--primary)' }} />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Content Panel */}
            <div style={{ paddingLeft: '3rem', flex: 1 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ minHeight: '300px' }}
                >
                  <div style={{
                    padding: '2.5rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '24px',
                    border: '1px solid rgba(0,0,0,0.05)',
                    position: 'relative'
                  }}>
                    {/* Staggered Line Reveal Heading */}
                    <div style={{ overflow: 'hidden' }}>
                      <motion.h3
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{ 
                          fontSize: '1.75rem', 
                          fontWeight: 800, 
                          color: 'var(--text)', 
                          marginBottom: '1.5rem',
                          textTransform: 'uppercase'
                        }}
                      >
                        {expertise[activeIdx].title}
                      </motion.h3>
                    </div>

                    {/* Description Reveal */}
                    <div style={{ overflow: 'hidden' }}>
                      <motion.p
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        style={{ 
                          fontSize: '1.125rem', 
                          color: 'var(--text-muted)', 
                          lineHeight: 1.6,
                          margin: 0
                        }}
                      >
                        {expertise[activeIdx].desc}
                      </motion.p>
                    </div>

                    {/* Gradient Accent */}
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '2rem', 
                      right: '2rem', 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: 'var(--primary)', 
                      opacity: 0.1 
                    }} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper for background grid if needed
const KineticGrid = ({ activeIdx }) => {
  return (
    <gridHelper args={[20, 20, '#000000', '#f0f0f0']} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -2]} opacity={0.1} transparent />
  );
};

export default KineticGridExpertise;
