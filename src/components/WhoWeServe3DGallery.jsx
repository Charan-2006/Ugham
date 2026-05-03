import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, PerspectiveCamera, ContactShadows, Line, Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const GlassCube = ({ text, position, index, hoveredIdx, setHoveredIdx }) => {
  const meshRef = useRef();
  const coreRef = useRef();
  const isHovered = hoveredIdx === index;

  useFrame((state) => {
    if (meshRef.current) {
      // Ambient Float
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + index) * 0.2;
      
      // Haptic Tilt & Drift
      if (isHovered) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (state.mouse.x * Math.PI) / 6, 0.1);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, (-state.mouse.y * Math.PI) / 6, 0.1);
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 2, 0.1);
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.05);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.05);
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0, 0.05);
      }
    }
    
    // Core Breathing
    if (coreRef.current) {
      const s = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.02;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position} ref={meshRef}>
      {/* Crystal Shell (Glass) */}
      <Box args={[3.5, 3.5, 3.5]}>
        <meshPhysicalMaterial 
          color="#ffffff"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
          thickness={1}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </Box>

      {/* Pulsing Core */}
      <Box ref={coreRef} args={[1.5, 1.5, 1.5]}>
        <meshStandardMaterial 
          color="#3b16fe" 
          emissive="#3b16fe" 
          emissiveIntensity={isHovered ? 2 : 1} 
        />
      </Box>

      {/* Laser Etched Text */}
      <Html 
        position={[0, 0, 1.8]} 
        center 
        transform 
        distanceFactor={10}
        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          width: '240px',
          textAlign: 'center',
          color: '#0f172a',
          fontSize: '1rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          lineHeight: 1.4,
          fontFamily: 'var(--font-heading)'
        }}>
          {text}
        </div>
      </Html>
    </group>
  );
};

const DataFilaments = ({ hoveredIdx }) => {
  const points = useMemo(() => [
    [-5, 4, 0], [5, 4, 0],
    [5, -4, 0], [-5, -4, 0],
    [-5, 4, 0], [-5, -4, 0],
    [5, 4, 0], [5, -4, 0]
  ], []);

  return (
    <group visible={hoveredIdx !== null}>
      <Line 
        points={points} 
        color="#3b16fe" 
        lineWidth={0.5} 
        transparent 
        opacity={0.2} 
      />
    </group>
  );
};

const WhoWeServe3DGallery = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const targets = [
    'Students with ideas and curiosity',
    'Aspiring innovators and problem-solvers',
    'Early-stage builders looking for direction',
    'Young entrepreneurs aiming to create impact'
  ];

  const positions = [
    [-5, 4, 0], [5, 4, 0],
    [-5, -4, 0], [5, -4, 0]
  ];

  return (
    <section className="section gpu-accel" style={{ background: '#ffffff', padding: '10rem 0', minHeight: '1000px' }}>
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '6rem' }}>
          <span className="section-label">TARGET AUDIENCE</span>
          <h2 className="text-radiant" style={{ fontSize: '3.5rem', fontWeight: 900 }}>WHO WE SERVE</h2>
        </div>

        <div style={{ height: '800px', width: '100%', position: 'relative' }}>
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={45} />
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} />

            <DataFilaments hoveredIdx={hoveredIdx} />

            {targets.map((text, i) => (
              <GlassCube 
                key={i} 
                index={i} 
                text={text} 
                position={positions[i]}
                hoveredIdx={hoveredIdx}
                setHoveredIdx={setHoveredIdx}
              />
            ))}

            <ContactShadows 
              position={[0, -10, 0]} 
              opacity={0.4} 
              scale={30} 
              blur={2} 
              far={15} 
              resolution={256} 
              color="#000000" 
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe3DGallery;
