import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sphere, MeshDistortMaterial, Html, Points, PointMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const ParticleFlow = ({ count = 50 }) => {
  const points = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const side = Math.random() > 0.5 ? 1 : -1;
      temp.push({ t, side, speed: 0.002 + Math.random() * 0.005 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((p, i) => {
      p.t += p.speed;
      if (p.t > 1) p.t = 0;
      
      const x = p.side * p.t * 8;
      const y = Math.sin(p.t * Math.PI) * (p.side > 0 ? 2 : -2) + (Math.random() - 0.5) * 0.5;
      const z = (Math.random() - 0.5) * 0.5;
      
      const positions = points.current.geometry.attributes.position.array;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    });
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={points}>
      <PointMaterial transparent color="#ff3366" size={0.05} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={new Float32Array(count * 3)} itemSize={3} />
      </bufferGeometry>
    </Points>
  );
};

const NeuralMapIntegration = () => {
  const [activeSide, setActiveSide] = useState(null); // 'left' or 'right'
  const [hoveredNode, setHoveredNode] = useState(null);

  const getStartedSteps = [
    'Start Ugham Innovation Club in your College',
    'Share your idea or interest in club activities',
    'Collaborate with mentors and peers',
    'Start building and refining your innovation'
  ];

  const partners = [
    'Institution Partner', 'Industry Partner', 'Incubation Partner',
    'Ecosystem Partner', 'Investment Partner', 'Mentor Partner'
  ];

  return (
    <section className="section" style={{ position: 'relative', height: '1000px', background: '#ffffff', overflow: 'hidden' }}>
      {/* Background Mesh (5% opacity) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.05 }}>
        <Canvas camera={{ position: [0, 0, 10] }}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <planeGeometry args={[30, 30, 50, 50]} />
            <MeshDistortMaterial wireframe color="#3b16fe" speed={2} distort={0.2} />
          </mesh>
        </Canvas>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Headings */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', pointerEvents: 'none' }}>
          <div style={{ width: '400px' }}>
            <span className="section-label">GET STARTED</span>
            <h2 className="text-radiant" style={{ fontSize: '2.5rem', lineHeight: 1.1, marginTop: '1rem' }}>HOW YOU CAN<br />GET STARTED</h2>
          </div>
          <div style={{ width: '400px', textAlign: 'right' }}>
            <span className="section-label">COLLABORATE</span>
            <h2 className="text-radiant" style={{ fontSize: '2.5rem', lineHeight: 1.1, marginTop: '1rem' }}>PARTNER<br />WITH US</h2>
          </div>
        </div>

        {/* Central Map Area */}
        <div style={{ position: 'relative', height: '500px' }}>
          <Canvas camera={{ position: [0, 0, 12], fov: 40 }}>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            
            {/* Central Node */}
            <Sphere args={[0.5, 32, 32]}>
              <meshStandardMaterial color="#3b16fe" emissive="#3b16fe" emissiveIntensity={2} />
            </Sphere>

            {/* Neural Filaments */}
            {/* Left Branches */}
            {[1.5, 0.5, -0.5, -1.5].map((y, i) => (
              <Line
                key={`left-${i}`}
                points={[[0, 0, 0], [-4, y, 0], [-8, y, 0]]}
                color="#3b16fe"
                lineWidth={0.5}
                transparent
                opacity={0.1}
              />
            ))}
            {/* Right Branches (Arc) */}
            {partners.map((_, i) => {
              const angle = (i / (partners.length - 1) - 0.5) * Math.PI * 0.6;
              const x = Math.cos(angle) * 8;
              const y = Math.sin(angle) * 4;
              return (
                <Line
                  key={`right-${i}`}
                  points={[[0, 0, 0], [x * 0.5, y * 0.5, 0], [x, y, 0]]}
                  color="#ff3366"
                  lineWidth={0.5}
                  transparent
                  opacity={0.1}
                />
              );
            })}

            <ParticleFlow />

            {/* Interactive Steps (Left) */}
            {[1.5, 0.5, -0.5, -1.5].map((y, i) => (
              <Html key={i} position={[-8, y, 0]} center>
                <motion.div
                  onMouseEnter={() => { setHoveredNode(`step-${i}`); setActiveSide('left'); }}
                  onMouseLeave={() => { setHoveredNode(null); setActiveSide(null); }}
                  style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', background: 'white', 
                    border: '1px solid var(--border)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    zIndex: 20
                  }}
                  whileHover={{ scale: 1.2, borderColor: 'var(--primary)' }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                  <AnimatePresence>
                    {hoveredNode === `step-${i}` && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: -10 }}
                        exit={{ opacity: 0, x: -20 }}
                        style={{ 
                          position: 'absolute', right: '100%', whiteSpace: 'nowrap', 
                          marginRight: '1rem', padding: '1rem 1.5rem', 
                          background: 'white', borderRadius: '12px', border: '1px solid var(--border)',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontWeight: 600, color: 'var(--text)'
                        }}
                      >
                        {getStartedSteps[i]}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Html>
            ))}

            {/* Interactive Partners (Right) */}
            {partners.map((name, i) => {
              const angle = (i / (partners.length - 1) - 0.5) * Math.PI * 0.6;
              const x = Math.cos(angle) * 8;
              const y = Math.sin(angle) * 4;
              return (
                <Html key={i} position={[x, y, 0]} center>
                  <motion.div
                    onMouseEnter={() => { setHoveredNode(`partner-${i}`); setActiveSide('right'); }}
                    onMouseLeave={() => { setHoveredNode(null); setActiveSide(null); }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    style={{ 
                      padding: '0.75rem 1.5rem', background: 'white', border: '1px solid var(--border)',
                      borderRadius: '100px', cursor: 'pointer', whiteSpace: 'nowrap',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)', fontWeight: 700, color: 'var(--text)',
                      fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                      transition: 'all 0.3s ease',
                      background: hoveredNode === `partner-${i}` ? 'var(--primary)' : 'white',
                      color: hoveredNode === `partner-${i}` ? 'white' : 'var(--text)',
                      borderColor: hoveredNode === `partner-${i}` ? 'var(--primary)' : 'var(--border)'
                    }}
                  >
                    {name}
                  </motion.div>
                </Html>
              );
            })}
          </Canvas>
        </div>
      </div>

      {/* Subtle Guide */}
      <div style={{ position: 'absolute', bottom: '4rem', width: '100%', textAlign: 'center', opacity: 0.3 }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Interact with the neural nodes to explore the ecosystem
        </p>
      </div>
    </section>
  );
};

export default NeuralMapIntegration;
