import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, PerspectiveCamera, ContactShadows, Line, Octahedron, MeshDistortMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const GlassNode = ({ pos, index, label, activeIdx, setActiveIdx }) => {
  const meshRef = useRef();
  const isActive = activeIdx === index;
  
  useFrame((state) => {
    if (meshRef.current) {
      // Bobbing Motion
      meshRef.current.position.y = pos[1] + Math.sin(state.clock.getElapsedTime() + index) * 0.2;
      
      // Haptic Drift & Rotate
      if (isActive) {
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 2, 0.1);
        meshRef.current.rotation.y += 0.02;
      } else {
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0, 0.1);
        meshRef.current.rotation.y += 0.005;
      }
    }
  });

  return (
    <group position={pos} ref={meshRef}>
      <Octahedron args={[1, 0]} onPointerOver={() => setActiveIdx(index)} onPointerOut={() => setActiveIdx(null)}>
        <meshPhysicalMaterial 
          color="#ffffff"
          transparent
          opacity={0.3}
          transmission={0.9}
          thickness={0.5}
          roughness={0.1}
          clearcoat={1}
          emissive={isActive ? "#3b16fe" : "#ffffff"}
          emissiveIntensity={isActive ? 0.5 : 0}
        />
      </Octahedron>
      
      {/* Internal Core */}
      <mesh scale={0.3}>
        <sphereGeometry />
        <meshStandardMaterial color={isActive ? "#ff3366" : "#3b16fe"} emissive={isActive ? "#ff3366" : "#3b16fe"} emissiveIntensity={2} />
      </mesh>

      <Html position={[1.5, 0, 0]} style={{ pointerEvents: 'none', width: '200px' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          opacity: isActive ? 1 : 0.6,
          transition: 'all 0.4s ease'
        }}>
          <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--primary)', letterSpacing: '0.1em' }}>
            NODE_0{index + 1}
          </span>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#4A4A4A', textTransform: 'uppercase' }}>
            {label}
          </span>
        </div>
      </Html>
    </group>
  );
};

const Filament = ({ start, end, active }) => {
  return (
    <group visible={active}>
      <Line 
        points={[start, end]} 
        color="#3b16fe" 
        lineWidth={0.5} 
        transparent 
        opacity={active ? 0.4 : 0}
      />
    </group>
  );
};

const PrismaticNeuralNetwork = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  const partners = [
    'Educational Institutions',
    'Industry Partners',
    'Incubation Centers',
    'Government Bodies',
    'Investors',
    'Mentors'
  ];

  const positions = [
    [4, 4, 0], [7, 2, 0],
    [7, -2, 0], [4, -4, 0],
    [1, -2, 0], [1, 2, 0]
  ];

  return (
    <section className="section gpu-accel" style={{ background: '#ffffff', padding: '120px 0', minHeight: '900px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', alignItems: 'center' }}>
        
        {/* Left: Hero Header (Cols 1-5) */}
        <div style={{ gridColumn: 'span 5' }}>
          <span className="section-label">NETWORK ARCHITECTURE</span>
          <h2 className="text-radiant" style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1.1 }}>
            WHO CAN<br />COLLABORATE<br />WITH US
          </h2>
          <p style={{ marginTop: '2rem', maxWidth: '400px' }}>
            We are building a hyper-connected innovation framework where every node adds distinct value to the student journey.
          </p>
        </div>

        {/* Right: 3D Cluster (Cols 7-12) */}
        <div style={{ gridColumn: 'span 6', gridColumnStart: 7, height: '700px', position: 'relative' }}>
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[5, 0, 15]} fov={45} />
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />

            {partners.map((label, i) => (
              <React.Fragment key={i}>
                <Filament start={[-8, 0, 0]} end={positions[i]} active={activeIdx === i} />
                <GlassNode 
                  pos={positions[i]} 
                  index={i} 
                  label={label} 
                  activeIdx={activeIdx} 
                  setActiveIdx={setActiveIdx} 
                />
              </React.Fragment>
            ))}

            <ContactShadows 
              position={[5, -8, 0]} 
              opacity={0.3} 
              scale={30} 
              blur={2} 
              far={15} 
              color="#000000" 
            />
          </Canvas>
        </div>

      </div>
    </section>
  );
};

export default PrismaticNeuralNetwork;
