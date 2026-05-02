import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float, Line } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const LaserLines = ({ hoveredIdx, positions }) => {
  const lineRef = useRef();

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.material.dashOffset -= 0.01;
    }
  });

  return (
    <group>
      {positions.map((pos, i) => 
        positions.map((targetPos, j) => {
          if (i >= j) return null;
          const isRelated = hoveredIdx === i || hoveredIdx === j;
          return (
            <Line
              key={`${i}-${j}`}
              points={[pos, targetPos]}
              color={isRelated ? "#3b16fe" : "#e2e8f0"}
              lineWidth={1}
              transparent
              opacity={isRelated ? 0.3 : 0.05}
              dashed
              dashScale={20}
              dashSize={0.5}
            />
          );
        })
      )}
    </group>
  );
};

const HighlightModule = ({ data, index, pos, hoveredIdx, setHoveredIdx }) => {
  const isHovered = hoveredIdx === index;
  
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Html position={pos} center distanceFactor={10}>
        <motion.div
          onMouseEnter={() => setHoveredIdx(index)}
          onMouseLeave={() => setHoveredIdx(null)}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 100, 
            damping: 20, 
            delay: index * 0.1 
          }}
          style={{
            width: '280px',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(15px)',
            border: `1px solid ${isHovered ? 'rgba(59, 22, 254, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: '20px',
            boxShadow: isHovered ? '0 20px 40px rgba(59, 22, 254, 0.1)' : '0 10px 30px rgba(0,0,0,0.02)',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          {/* Icon Placeholder (Geometric SVG) */}
          <div style={{ marginBottom: '1.5rem', opacity: isHovered ? 1 : 0.6, transition: 'opacity 0.4s ease' }}>
            {data.icon}
          </div>

          <p style={{ 
            fontSize: '1rem', 
            fontWeight: 600, 
            color: isHovered ? 'var(--text)' : 'var(--text-muted)',
            lineHeight: 1.5,
            margin: 0
          }}>
            {data.text}
          </p>
        </motion.div>
      </Html>
    </Float>
  );
};

const DeconstructedHighlights = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const highlights = [
    { 
      text: 'Innovation programs and competitions', 
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="15" stroke="url(#grad)" strokeWidth="1.5" fill="none" />
          <path d="M20 10L23 20L33 20L25 27L28 37L20 30L12 37L15 27L7 20L17 20Z" fill="url(#grad)" opacity="0.3" />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b16fe" />
              <stop offset="100%" stopColor="#ff3366" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    { 
      text: 'Hands-on workshops and masterclasses', 
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="10" y="10" width="20" height="20" stroke="url(#grad)" strokeWidth="1.5" fill="none" rx="2" />
          <path d="M10 20H30M20 10V30" stroke="url(#grad)" strokeWidth="1" opacity="0.5" />
        </svg>
      )
    },
    { 
      text: 'Mentorship-driven development tracks', 
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path d="M20 5L35 30H5L20 5Z" stroke="url(#grad)" strokeWidth="1.5" fill="none" />
          <circle cx="20" cy="20" r="5" fill="url(#grad)" opacity="0.4" />
        </svg>
      )
    },
    { 
      text: 'Connect Incubation, Mentors, Investors and Industry', 
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="12" cy="12" r="4" stroke="url(#grad)" fill="none" />
          <circle cx="28" cy="12" r="4" stroke="url(#grad)" fill="none" />
          <circle cx="12" cy="28" r="4" stroke="url(#grad)" fill="none" />
          <circle cx="28" cy="28" r="4" stroke="url(#grad)" fill="none" />
          <path d="M12 12L28 28M28 12L12 28" stroke="url(#grad)" strokeWidth="1" opacity="0.4" />
        </svg>
      )
    }
  ];

  const positions = [
    [-4, 1.5, 0],
    [4, 2, -1],
    [-4, -2, -1],
    [4, -1.5, 1]
  ];

  return (
    <section className="section" style={{ position: 'relative', height: '900px', background: '#ffffff', overflow: 'hidden' }}>
      {/* Background Grid Pattern */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', 
        backgroundSize: '40px 40px',
        opacity: 0.15,
        zIndex: 0
      }} />

      {/* Heading */}
      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '4rem' }}>
        <h2 className="text-radiant" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', textTransform: 'uppercase', marginBottom: '2rem' }}>
          UGHAM INNOVATION CLUB HIGHLIGHTS
        </h2>
      </div>

      {/* R3F Canvas */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={1} />
          <LaserLines hoveredIdx={hoveredIdx} positions={positions} />
          {highlights.map((data, i) => (
            <HighlightModule 
              key={i} 
              data={data} 
              index={i} 
              pos={positions[i]} 
              hoveredIdx={hoveredIdx} 
              setHoveredIdx={setHoveredIdx} 
            />
          ))}
        </Canvas>
      </div>

      {/* Subtle Blueprint Lattice (Optional) */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, opacity: 0.03 }}>
        <pattern id="lattice" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#lattice)" />
      </svg>
    </section>
  );
};

export default DeconstructedHighlights;
