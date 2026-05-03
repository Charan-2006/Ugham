import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, MeshDistortMaterial, MeshWobbleMaterial, Float, Html, Line } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

/* ── Simple hook: returns true when window width ≤ 768px ── */
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
};

/* ── Desktop 3D components (unchanged) ── */
const Foundation = ({ activeIdx }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      if (activeIdx !== null) {
        const angle = (activeIdx * Math.PI * 2) / 6;
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, Math.sin(angle) * 0.2, 0.05);
      } else {
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, 0.05);
      }
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[2.2, 0]} />
          <MeshDistortMaterial
            color="#3b16fe"
            emissive="#ff3366"
            emissiveIntensity={0.5}
            transparent opacity={0.3} roughness={0}
            distort={0.3} speed={2}
          />
          <mesh>
            <sphereGeometry args={[0.8, 32, 32]} />
            <MeshWobbleMaterial color="#ff3366" factor={0.6} speed={3} transparent opacity={0.7} />
          </mesh>
        </mesh>
        <Html center>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ pointerEvents: 'none', textAlign: 'center', width: '200px' }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.3em', display: 'block', marginBottom: '0.5rem' }}>OUR</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text)', letterSpacing: '0.1em' }}>FOUNDATION</span>
          </motion.div>
        </Html>
      </group>
    </Float>
  );
};

const ValueCard3D = ({ value, index, activeIdx, setActiveIdx }) => {
  const isActive = activeIdx === index;
  const angle = (index * Math.PI * 2) / 6;
  const radius = 5.8;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return (
    <group position={[x, y, 0]}>
      {isActive && (
        <Line points={[[0, 0, 0], [-x, -y, 0]]} color="#3b16fe" lineWidth={1.5} transparent opacity={0.6} />
      )}
      <Html center style={{ pointerEvents: 'auto' }}>
        <motion.div
          onMouseEnter={() => setActiveIdx(index)}
          onMouseLeave={() => setActiveIdx(null)}
          animate={{ z: isActive ? 60 : 0, scale: isActive ? 1.1 : 1, opacity: activeIdx !== null && !isActive ? 0.4 : 1 }}
          style={{
            width: '320px', padding: '2.5rem',
            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
            borderRadius: '0px', cursor: 'pointer', textAlign: 'center',
            transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1)',
            boxShadow: isActive ? '0 30px 60px rgba(0,0,0,0.08)' : 'none',
            border: isActive ? '1px solid rgba(59,22,254,0.1)' : '1px solid transparent'
          }}
        >
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 1.25rem 0', background: 'linear-gradient(135deg,#FF3366,#3b16fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {value.title}
          </h3>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0, fontWeight: 400 }}>
            {value.desc}
          </p>
        </motion.div>
      </Html>
    </group>
  );
};

/* ── Mobile-only flat card ── */
const MobileValueCard = ({ value, index }) => (
  <motion.div
    className="core-value-mobile-card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
  >
    <span className="core-value-mobile-index">0{index + 1}</span>
    <div className="core-value-mobile-body">
      <h3 className="core-value-mobile-title">{value.title}</h3>
      <p className="core-value-mobile-desc">{value.desc}</p>
    </div>
  </motion.div>
);

/* ── Main export ── */
const CoreValuesEcosystem = () => {
  const [activeIdx, setActiveIdx] = useState(null);
  const isMobile = useMobile();

  const values = [
    { title: 'Think Bold',      desc: 'Encouraging innovative thinking and breakthrough ideas.' },
    { title: 'Market Research', desc: 'Understanding user needs, trends, and real-world problems.' },
    { title: 'Idea Validation', desc: 'Shaping ideas based on market demand and feasibility.' },
    { title: 'Team Formation',  desc: 'Building strong teams through collaboration and vision.' },
    { title: 'Product Dev',     desc: 'Transforming ideas into functional and scalable products.' },
    { title: 'Scale & Grow',    desc: 'Expanding solutions to create wider impact.' },
  ];

  /* ── MOBILE layout ── */
  if (isMobile) {
    return (
      <section className="core-values-mobile-section">
        <div className="container">
          <div className="core-values-mobile-header">
            <span className="section-label">PRINCIPLES</span>
            <h2 className="text-radiant core-values-mobile-heading">CORE VALUES</h2>
          </div>
          <div className="core-values-mobile-list">
            {values.map((val, i) => (
              <MobileValueCard key={i} value={val} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── DESKTOP layout (completely unchanged) ── */
  return (
    <section className="section gpu-accel" style={{ background: '#ffffff', minHeight: '1600px', position: 'relative', overflow: 'visible', padding: '15rem 0' }}>
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '6rem' }}>
          <span className="section-label">PRINCIPLES</span>
          <h2 className="text-radiant" style={{ fontSize: '3.5rem', fontWeight: 900 }}>CORE VALUES</h2>
        </div>
        <div style={{ height: '1200px', width: '100%', position: 'relative' }}>
          <Canvas dpr={[1, 2]} style={{ overflow: 'visible' }}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Foundation activeIdx={activeIdx} />
            {values.map((val, i) => (
              <ValueCard3D key={i} index={i} value={val} activeIdx={activeIdx} setActiveIdx={setActiveIdx} />
            ))}
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesEcosystem;
