import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Html, Line } from '@react-three/drei';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

const ParticleCloud = ({ hoveredPos }) => {
  const pointsRef = useRef();
  const count = 10000;
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      // Basic drift
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      // Screen wrap
      if (Math.abs(pos[i * 3]) > 10) pos[i * 3] *= -0.9;
      if (Math.abs(pos[i * 3 + 1]) > 8) pos[i * 3 + 1] *= -0.9;

      // Gravitate toward hovered position
      if (hoveredPos) {
        const dx = hoveredPos[0] - pos[i * 3];
        const dy = hoveredPos[1] - pos[i * 3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 3) {
          pos[i * 3] += dx * 0.01;
          pos[i * 3 + 1] += dy * 0.01;
        }
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef}>
      <PointMaterial
        transparent
        color="#cbd5e1"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
    </Points>
  );
};

const AtmosphericInterface = () => {
  const [hoveredPos, setHoveredPos] = useState(null);
  const [mouseSide, setMouseSide] = useState(null); // 'left' or 'right'
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });

  const steps = [
    { text: 'Start Ugham Innovation Club in your College', pos: [-6, 2, 0] },
    { text: 'Share your idea or interest in club activities', pos: [-5, 0, 1] },
    { text: 'Collaborate with mentors and peers', pos: [-6.5, -2, -1] },
    { text: 'Start building and refining your innovation', pos: [-4.5, -4, 0] }
  ];

  const partners = [
    { text: 'Institution Partner', pos: [4, 3, 0] },
    { text: 'Industry Partner', pos: [7, 1.5, 1] },
    { text: 'Incubation Partner', pos: [3.5, 0, -1] },
    { text: 'Ecosystem Partner', pos: [6.5, -1.5, 0] },
    { text: 'Investment Partner', pos: [4, -3, 1] },
    { text: 'Mentor Partner', pos: [7.5, -4.5, -1] }
  ];

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMouseSide(x < 0 ? 'left' : 'right');
    setMouseCoord({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      className="section" 
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', height: '1100px', background: '#ffffff', overflow: 'hidden' }}
    >
      {/* 2% Opacity Isometric Floor */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
        transform: 'perspective(1000px) rotateX(60deg) translateY(200px)',
        zIndex: 0
      }} />

      {/* R3F Environmental Cloud */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ParticleCloud hoveredPos={hoveredPos} />
          <ambientLight intensity={1} />
        </Canvas>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%' }}>
        {/* Headings */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', paddingTop: '6rem' }}>
          <motion.div 
            style={{ gridColumn: '2 / span 5', filter: mouseSide === 'right' ? 'blur(2px)' : 'none', transition: 'filter 0.8s ease' }}
          >
            <span className="section-label">GET STARTED</span>
            <h2 className="text-radiant" style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1, textTransform: 'uppercase' }}>
              HOW YOU CAN<br />GET STARTED
            </h2>
          </motion.div>

          <motion.div 
            style={{ gridColumn: '8 / span 5', textAlign: 'right', filter: mouseSide === 'left' ? 'blur(2px)' : 'none', transition: 'filter 0.8s ease' }}
          >
            <span className="section-label">COLLABORATE</span>
            <h2 style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1, textTransform: 'uppercase', color: 'var(--text)' }}>
              PARTNER<br />WITH US
            </h2>
          </motion.div>
        </div>

        {/* Floating Steps (Left) */}
        <div style={{ position: 'absolute', left: '8.33%', top: '40%', width: '40%', filter: mouseSide === 'right' ? 'blur(4px)' : 'none', transition: 'filter 0.8s ease' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                onMouseEnter={() => setHoveredPos(step.pos)}
                onMouseLeave={() => setHoveredPos(null)}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ 
                  maxWidth: '300px', 
                  fontSize: '1.25rem', 
                  fontWeight: 600, 
                  color: 'var(--text)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', left: '-2.5rem', top: '0.2rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', opacity: 0.4 }}>
                  0{i + 1}
                </div>
                {step.text}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Partner Tags (Right) */}
        <div style={{ position: 'absolute', right: '8.33%', top: '35%', width: '40%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '2rem', filter: mouseSide === 'left' ? 'blur(4px)' : 'none', transition: 'filter 0.8s ease' }}>
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredPos(partner.pos)}
              onMouseLeave={() => setHoveredPos(null)}
              style={{ 
                padding: '1rem 2rem', 
                fontFamily: 'monospace', 
                fontSize: '0.875rem', 
                textTransform: 'uppercase', 
                letterSpacing: '2px',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.4s ease'
              }}
              whileHover={{ borderColor: 'var(--primary)', color: 'var(--text)', background: 'rgba(59, 22, 254, 0.02)' }}
            >
              {partner.text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Magnetic Light String (Cursor to Partner Ecosystem) */}
      <div style={{ 
        position: 'fixed', 
        top: mouseCoord.y, 
        left: mouseCoord.x, 
        width: '1px', 
        height: '1px', 
        zIndex: 100, 
        pointerEvents: 'none' 
      }}>
        <div style={{ 
          position: 'absolute', 
          width: '400px', 
          height: '1px', 
          background: 'linear-gradient(90deg, var(--primary), transparent)', 
          opacity: 0.2,
          transform: 'rotate(15deg)',
          display: mouseSide === 'left' ? 'block' : 'none'
        }} />
      </div>

      {/* Interaction Ripple Effect (CSS) */}
      <style>{`
        .refractive-reveal {
          animation: refractiveReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes refractiveReveal {
          0% { filter: blur(20px) contrast(2); transform: scale(1.1); opacity: 0; }
          100% { filter: blur(0) contrast(1); transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default AtmosphericInterface;
