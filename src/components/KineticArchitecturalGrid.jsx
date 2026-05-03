import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, PerspectiveCamera, Sparkles, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const VectorThreads = ({ activeIdx }) => {
  const points = useMemo(() => {
    // 4 modules, each has a connection to center [0,0,0]
    // Modules are roughly spread at x: -4.5, -1.5, 1.5, 4.5
    return [
      [new THREE.Vector3(-4.5, 0, 0), new THREE.Vector3(0, 0, 0)],
      [new THREE.Vector3(-1.5, 0, 0), new THREE.Vector3(0, 0, 0)],
      [new THREE.Vector3(1.5, 0, 0), new THREE.Vector3(0, 0, 0)],
      [new THREE.Vector3(4.5, 0, 0), new THREE.Vector3(0, 0, 0)]
    ];
  }, []);

  return (
    <group>
      {points.map((line, i) => (
        <Line 
          key={i}
          points={line}
          color={activeIdx === i ? "#3b16fe" : "#e2e8f0"}
          lineWidth={activeIdx === i ? 2 : 0.5}
          transparent
          opacity={activeIdx === i ? 0.6 : 0.1}
        />
      ))}
      {/* Central Node */}
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#3b16fe" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const BackgroundMesh = ({ activeIdx }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      // Subtle warping based on active selection
      const targetX = (activeIdx - 1.5) * 2;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <gridHelper 
      ref={meshRef}
      args={[40, 40, "#e2e8f0", "#f1f5f9"]} 
      rotation={[Math.PI / 2, 0, 0]} 
      position={[0, 0, -2]}
    />
  );
};

const useMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const KineticArchitecturalGrid = () => {
  const [hoverIdx, setHoverIdx] = useState(null);
  const isMobile = useMobile();

  const modules = [
    { title: 'Education Empowerment', desc: 'Developing an innovation and problem-solving skills through structured learning paths.' },
    { title: 'Innovation Enabling', desc: 'Supporting idea validation and structured development within a collaborative ecosystem.' },
    { title: 'Product Building', desc: 'Transforming ideas into working prototypes and solutions with precision engineering.' },
    { title: 'Venture Creation', desc: 'Helping innovations evolve into scalable startups by providing strategic growth frameworks.' }
  ];

  return (
    <section className="section gpu-accel" style={{ background: '#ffffff', minHeight: isMobile ? 'auto' : '800px', position: 'relative', overflow: isMobile ? 'visible' : 'hidden', padding: isMobile ? '4rem 0' : '10rem 0' }}>
      
      {/* 3D Kinetic Background - Desktop Only */}
      {!isMobile && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
            <ambientLight intensity={1} />
            <VectorThreads activeIdx={hoverIdx} />
            <BackgroundMesh activeIdx={hoverIdx} />
            <Sparkles count={40} scale={10} size={1} speed={0.2} color="#3b16fe" opacity={0.05} />
          </Canvas>
        </div>
      )}

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-header text-center" style={{ marginBottom: '6rem' }}>
          <span className="section-label">WHAT WE DO</span>
          <h2 className="text-radiant" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}>
            THE INTERSECTION OF LEARNING & BUILDING
          </h2>
        </div>

        <div className="architectural-grid">
          <style>{`
            .architectural-grid { display: grid; grid-template-columns: repeat(1, 1fr); width: 100%; position: relative; }
            .grid-module { padding: 3rem 2rem; position: relative; cursor: pointer; transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1); border-bottom: 1px solid rgba(0,0,0,0.05); }
            .grid-module h3 { font-size: 1.25rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem; text-transform: uppercase; transition: color 0.4s ease; }
            .grid-module p { font-size: 1rem; color: var(--text-muted); line-height: 1.6; margin: 0; transition: all 0.4s ease; }
            
            .grid-module:hover h3 { color: var(--primary); }
            .grid-module.dimmed { opacity: 0.7; filter: blur(2px); }
            .grid-module.active { transform: translateZ(50px) scale(1.05); z-index: 20; }

            @media (min-width: 1024px) {
              .architectural-grid { grid-template-columns: repeat(4, 1fr) !important; border-bottom: none !important; }
              .grid-module { border-bottom: none !important; border-right: 1px solid rgba(0,0,0,0.05); }
              .grid-module:last-child { border-right: none; }
              .grid-module.active { transform: translateZ(50px) translateY(-15px) !important; }
            }
          `}</style>

          {modules.map((item, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
              initial={{ opacity: 0, z: -100 }}
              whileInView={{ opacity: 1, z: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`grid-module ${hoverIdx !== null && hoverIdx !== i ? 'dimmed' : ''} ${hoverIdx === i ? 'active' : ''}`}
            >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KineticArchitecturalGrid;
