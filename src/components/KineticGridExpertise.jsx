import React, { useRef, useState, useMemo, forwardRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows, 
  Sparkles,
  Edges
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const LogoCube = forwardRef(({ color }, ref) => {
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshPhysicalMaterial 
        color="#050505" 
        metalness={1} 
        roughness={0.05} 
        reflectivity={1}
        clearcoat={1}
      />
      <Edges 
        scale={1.05} 
        threshold={15} 
        color={color} 
      />
    </mesh>
  );
});

const KineticCluster = ({ activeIdx }) => {
  const cubesRef = useRef([]);
  const count = 27;
  const colors = ["#3b16fe", "#ff3366", "#00C2FF", "#6d4aff"];

  const formations = useMemo(() => [
    Array.from({ length: count }, (_, i) => ({ pos: [(i % 3 - 1) * 0.5, Math.floor(i / 9 - 1) * 1.5, (Math.floor(i / 3) % 3 - 1) * 0.5], rot: [0, 0, 0] })),
    Array.from({ length: count }, (_, i) => ({ pos: [(i % 6 - 2.5) * 1.2, (Math.floor(i / 6) - 2) * 1.2, 0], rot: [Math.PI / 4, Math.PI / 4, 0] })),
    Array.from({ length: count }, (_, i) => { const angle = (i / count) * Math.PI * 2; return { pos: [Math.cos(angle) * 3, Math.sin(angle) * 3, 0], rot: [0, 0, angle] }; }),
    Array.from({ length: count }, (_, i) => ({ pos: [(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6], rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0] }))
  ], []);

  useFrame((state) => {
    const targetFormation = formations[activeIdx] || formations[0];
    cubesRef.current.forEach((cube, i) => {
      if (!cube) return;
      const target = targetFormation[i];
      cube.position.lerp(new THREE.Vector3(...target.pos), 0.1);
      cube.rotation.x = THREE.MathUtils.lerp(cube.rotation.x, target.rot[0], 0.1);
      cube.rotation.y = THREE.MathUtils.lerp(cube.rotation.y, target.rot[1] + state.clock.getElapsedTime() * 0.2, 0.1);
    });
  });

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <LogoCube 
          key={i} 
          ref={el => cubesRef.current[i] = el}
          color={colors[activeIdx]}
        />
      ))}
      <Sparkles count={30} scale={10} size={1} speed={0.3} color={colors[activeIdx]} />
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

  const colors = ["#3b16fe", "#ff3366", "#00C2FF", "#6d4aff"];

  return (
    <section className="section gpu-accel" style={{ position: 'relative', minHeight: '800px', background: '#ffffff', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '4rem 0' }}>
      
      {/* Background Foundation */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 10] }}>
          <gridHelper args={[60, 40, "#000", "#000"]} rotation={[Math.PI / 2.2, 0, 0]} />
        </Canvas>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <style>{`
          .kinetic-grid-layout { display: flex; flex-direction: column; width: 100%; gap: 2rem; }
          .kinetic-canvas-box { width: 100%; height: 350px; position: relative; }
          .kinetic-ui-box { width: 100%; }
          .kinetic-nav { display: flex; flex-direction: row; gap: 2rem; overflow-x: auto; padding-bottom: 2rem; scrollbar-width: none; border-bottom: 1px solid rgba(0,0,0,0.05); }
          .kinetic-nav::-webkit-scrollbar { display: none; }
          .nav-item { min-width: 200px; cursor: pointer; transition: all 0.4s ease; }
          .nav-item h3 { font-size: 1rem; font-weight: 800; color: rgba(0,0,0,0.2); text-transform: uppercase; }
          .nav-item.active h3 { color: var(--text); transform: scale(1.05); }
          
          .kinetic-description-overlay { 
            margin-top: 4rem; 
            padding: 3rem; 
            border-left: 2px solid var(--border);
            position: relative;
            max-width: 800px;
          }
          .description-line { position: absolute; left: 0; top: 0; width: 100%; height: 1px; background: var(--border); opacity: 0.2; }
          .description-label { font-family: monospace; font-size: 0.7rem; color: var(--primary); letter-spacing: 0.3em; margin-bottom: 1.5rem; display: block; }
          .description-text { font-size: 1.5rem; font-weight: 300; color: var(--text); line-height: 1.4; opacity: 0.8; }

          @media (min-width: 1024px) {
            .kinetic-grid-layout { flex-direction: row !important; height: 800px; align-items: center !important; }
            .kinetic-canvas-box { flex: 0 0 60% !important; height: 100% !important; }
            .kinetic-ui-box { flex: 0 0 40% !important; padding-left: 4rem !important; }
            .kinetic-nav { flex-direction: column !important; border-bottom: none !important; border-right: 1px solid rgba(0,0,0,0.05) !important; padding-right: 4rem !important; padding-bottom: 0 !important; overflow-x: visible !important; width: auto !important; }
            .kinetic-description-overlay { margin-top: 2rem; padding: 2rem 0 0 3rem; max-width: 100%; }
            .nav-item.active h3 { transform: translateX(10px); }
          }
        `}</style>

        <div className="kinetic-grid-layout">
          {/* 3D Kinetic Space */}
          <div className="kinetic-canvas-box">
            <Canvas dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
              <ambientLight intensity={1} />
              <pointLight position={[10, 10, 10]} intensity={2} color={colors[activeIdx]} />
              <KineticCluster activeIdx={activeIdx} />
              <Environment preset="city" />
              <ContactShadows position={[0, -4, 0]} opacity={0.4} blur={2.5} scale={10} />
            </Canvas>
          </div>

          {/* UI Workspace */}
          <div className="kinetic-ui-box">
            <div style={{ marginBottom: '4rem' }}>
              <span className="section-label">UGHAM_SYSTEMS</span>
              <h2 className="text-radiant" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1 }}>
                CORE EXPERTISE
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="kinetic-nav">
                {expertise.map((item, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => setActiveIdx(i)}
                    className={`nav-item ${activeIdx === i ? 'active' : ''}`}
                  >
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: activeIdx === i ? colors[activeIdx] : 'rgba(0,0,0,0.1)', letterSpacing: '0.3em', marginBottom: '0.5rem', fontFamily: 'monospace' }}>
                      [ MOD_0{i + 1} ]
                    </div>
                    <h3>{item.title}</h3>
                  </div>
                ))}
              </div>

              <div className="kinetic-description-overlay">
                <div className="description-line" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="description-label" style={{ color: colors[activeIdx] }}>
                      TECHNICAL_READOUT // ANALYSIS_V1.0
                    </span>
                    <p className="description-text">
                      {expertise[activeIdx].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                <motion.div 
                  animate={{ scaleY: [1, 1.5, 1], backgroundColor: colors[activeIdx] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ position: 'absolute', left: '-2px', top: '2rem', width: '2px', height: '40px' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KineticGridExpertise;
