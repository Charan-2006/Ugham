import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html, Text, Points, PointMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const ParticleField = () => {
  const pointsRef = useRef();
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.position.y = Math.sin(time * 0.2) * 0.5;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b16fe"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.1}
      />
    </Points>
  );
};

const ExpertiseNode = ({ data, index, activeNode, setActiveNode }) => {
  const isActive = activeNode === index;
  const meshRef = useRef();

  // Orbital positions
  const orbitRadius = 4;
  const angle = (index / 4) * Math.PI * 2;
  const targetX = isActive ? 0 : Math.cos(angle) * orbitRadius;
  const targetY = isActive ? 0 : Math.sin(angle) * orbitRadius;
  const targetZ = isActive ? 2 : -2;

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Smooth gliding to target position
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.05);
    
    // Subtle bobbing
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y += Math.sin(time + index) * 0.005;
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh 
          onClick={() => setActiveNode(isActive ? null : index)}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial 
            transparent 
            opacity={0.1} 
            color={isActive ? "#3b16fe" : "#ffffff"} 
            roughness={0} 
            metalness={1}
          />
          {isActive && (
            <pointLight intensity={1} distance={5} color="#3b16fe" />
          )}
        </mesh>
      </Float>

      <Html
        position={[0, 0, 0]}
        center
        distanceFactor={10}
        style={{
          pointerEvents: 'none',
          transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: isActive ? 1 : 0.4,
          transform: `scale(${isActive ? 1.2 : 0.8})`
        }}
      >
        <div 
          onClick={(e) => { e.stopPropagation(); setActiveNode(index); }}
          style={{
            width: '280px',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isActive ? 'rgba(59, 22, 254, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`,
            borderRadius: '24px',
            boxShadow: isActive ? '0 0 40px rgba(59, 22, 254, 0.2)' : '0 10px 30px rgba(0,0,0,0.05)',
            textAlign: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
        >
          <span style={{ 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
            letterSpacing: '0.2em',
            display: 'block',
            marginBottom: '0.5rem'
          }}>
            0{index + 1}
          </span>
          <h3 style={{ 
            fontSize: '1.25rem', 
            margin: 0, 
            color: 'var(--text)', 
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {data.title}
          </h3>
          <AnimatePresence>
            {isActive && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 0.7 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ fontSize: '0.875rem', marginTop: '1rem', overflow: 'hidden', margin: '1rem 0 0' }}
              >
                {data.desc}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </Html>
    </group>
  );
};

const AntigravityExpertise = () => {
  const [activeNode, setActiveNode] = useState(null);

  const expertise = [
    { title: 'Education Empowerment', desc: 'Developing problem-solving and innovation mindset through structured paths.' },
    { title: 'Innovation Enabling', desc: 'Supporting idea validation and execution with the right mentors and tools.' },
    { title: 'Product Building', desc: 'Turning concepts into high-quality solutions with engineering precision.' },
    { title: 'Venture Creation', desc: 'Helping ideas grow into scalable ventures that drive systemic impact.' }
  ];

  return (
    <section className="section" style={{ position: 'relative', height: '900px', background: '#ffffff', overflow: 'hidden' }}>
      {/* Heading - Top Left */}
      <div className="container" style={{ position: 'absolute', top: '4rem', left: '0', right: '0', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ textAlign: 'left' }}>
          <span className="section-label" style={{ marginBottom: '0.5rem' }}>Our Core Expertise</span>
          <h2 className="text-radiant" style={{ 
            fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
            maxWidth: '600px', 
            lineHeight: 1.1,
            textTransform: 'uppercase'
          }}>
            Strong Foundations For Innovation
          </h2>
        </div>
      </div>

      {/* R3F Canvas */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <ParticleField />
          {expertise.map((data, i) => (
            <ExpertiseNode 
              key={i} 
              data={data} 
              index={i} 
              activeNode={activeNode} 
              setActiveNode={setActiveNode} 
            />
          ))}
        </Canvas>
      </div>

      {/* Interactive Guide */}
      <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, opacity: 0.5 }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Scroll or Click to Explore Nodes
        </p>
      </div>
    </section>
  );
};

export default AntigravityExpertise;
