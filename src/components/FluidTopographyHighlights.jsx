import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const TechnicalNode = ({ position, active }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial 
          wireframe 
          color={active ? "#ff3366" : "#3b16fe"} 
          emissive={active ? "#ff3366" : "#3b16fe"} 
          emissiveIntensity={active ? 1 : 0.2}
          transparent
          opacity={active ? 0.6 : 0.2}
        />
      </mesh>
    </Float>
  );
};

const FluidTopographyHighlights = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const highlights = [
    { 
      title: 'Innovation Programs', 
      desc: 'Exclusive competitions and product hackathons designed to challenge.',
      pos: [-4, 2, 0] 
    },
    { 
      title: 'Technical Masterclasses', 
      desc: 'Hands-on workshops led by industry leaders and technology pioneers.',
      pos: [4, 1.5, 0] 
    },
    { 
      title: 'Development Tracks', 
      desc: 'Curated mentorship-driven paths focused on real-world execution.',
      pos: [-4, -1.5, 0] 
    },
    { 
      title: 'Global Ecosystem', 
      desc: 'Direct connections between incubators, investors, and industrial partners.',
      pos: [4, -2, 0] 
    }
  ];

  return (
    <section className="section" style={{ position: 'relative', height: '1000px', background: '#ffffff', overflow: 'hidden' }}>
      {/* Background Mesh Floor (Very subtle) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.03 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <mesh rotation={[-Math.PI / 3, 0, 0]}>
            <planeGeometry args={[30, 30, 40, 40]} />
            <meshStandardMaterial wireframe color="#3b16fe" />
          </mesh>
        </Canvas>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-header text-center" style={{ marginBottom: '6rem' }}>
          <span className="section-label">THE CLUB</span>
          <h2 className="text-radiant" style={{ fontSize: '3.5rem', fontWeight: 900 }}>INNOVATION HIGHLIGHTS</h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '4rem',
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={{ y: -10 }}
              style={{ 
                padding: '3rem',
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: '32px',
                border: '1px solid var(--border)',
                boxShadow: hoveredIdx === i ? '0 30px 60px rgba(59, 22, 254, 0.08)' : '0 10px 30px rgba(0,0,0,0.02)',
                transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                textAlign: i % 2 === 0 ? 'left' : 'right'
              }}
            >
              <div style={{ 
                fontSize: '0.75rem', 
                fontWeight: 800, 
                color: 'var(--primary)', 
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}>
                0{i + 1}
              </div>
              <h3 style={{ 
                fontSize: '1.75rem', 
                fontWeight: 800, 
                margin: 0,
                color: 'var(--text)'
              }}>
                {item.title}
              </h3>
              <p style={{ 
                fontSize: '1rem', 
                color: 'var(--text-muted)', 
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '300px',
                marginLeft: i % 2 === 0 ? '0' : 'auto'
              }}>
                {item.desc}
              </p>
            </motion.div>
          ))}

          {/* Center 3D Visualization */}
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            pointerEvents: 'none',
            zIndex: -1
          }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={1} />
              <pointLight position={[5, 5, 5]} intensity={1} color="#3b16fe" />
              <TechnicalNode active={hoveredIdx !== null} />
            </Canvas>
          </div>
        </div>
      </div>

      {/* Decorative Accents */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59, 22, 254, 0.03) 0%, transparent 70%)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255, 51, 102, 0.03) 0%, transparent 70%)', borderRadius: '50%' }} />
    </section>
  );
};

export default FluidTopographyHighlights;
