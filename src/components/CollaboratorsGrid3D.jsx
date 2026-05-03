import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, ContactShadows, Html, Box, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const CollaboratorTile = ({ label, index, activeIdx, setActiveIdx }) => {
  const meshRef = useRef();
  const isActive = activeIdx === index;
  
  // Grid layout coordinates (3x2 grid)
  const x = (index % 3 - 1) * 5;
  const y = (index < 3 ? 1 : -1) * 3.5;

  useFrame((state) => {
    if (meshRef.current) {
      // Magnetic Hover Lift
      const targetZ = isActive ? 2 : 0;
      const targetRotX = isActive ? -0.2 : 0;
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.1);
      
      // Gentle floating
      meshRef.current.position.y = y + Math.sin(state.clock.getElapsedTime() + index) * 0.1;
    }
  });

  return (
    <group position={[x, y, 0]} ref={meshRef}>
      <Box 
        args={[4, 2.5, 0.4]} 
        onPointerOver={() => setActiveIdx(index)} 
        onPointerOut={() => setActiveIdx(null)}
      >
        <meshPhysicalMaterial 
          color="#ffffff"
          transparent
          opacity={0.15}
          transmission={1}
          thickness={0.5}
          roughness={0.05}
          clearcoat={1}
          emissive={isActive ? "#3b16fe" : "#ffffff"}
          emissiveIntensity={isActive ? 0.2 : 0}
        />
      </Box>

      {/* Internal Accent Bar */}
      <Box args={[3.8, 0.05, 0.05]} position={[0, -1, 0.21]}>
        <meshStandardMaterial color={isActive ? "#ff3366" : "#3b16fe"} emissive={isActive ? "#ff3366" : "#3b16fe"} emissiveIntensity={isActive ? 2 : 0.5} />
      </Box>

      <Html position={[0, 0, 0.25]} center transform distanceFactor={10}>
        <div style={{
          width: '300px',
          textAlign: 'center',
          pointerEvents: 'none',
          color: isActive ? 'var(--primary)' : '#0f172a',
          transition: 'all 0.4s ease'
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            margin: 0
          }}>
            {label}
          </h3>
        </div>
      </Html>
    </group>
  );
};

const useMobile = () => {
  const [isMobile, React_useState] = useState(false);
  React.useEffect(() => {
    const checkMobile = () => React_useState(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const CollaboratorsGrid3D = () => {
  const [activeIdx, setActiveIdx] = useState(null);
  const isMobile = useMobile();

  const partners = [
    'Educational Institutions',
    'Industry Partners',
    'Incubation Centers',
    'Government Bodies',
    'Investors',
    'Mentors'
  ];

  return (
    <section className="section gpu-accel" style={{ background: '#ffffff', padding: isMobile ? '80px 0' : '120px 0', minHeight: isMobile ? 'auto' : '800px' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div className="section-header text-center" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
          <span className="section-label">PARTNERSHIP NETWORK</span>
          <h2 className="text-radiant" style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900 }}>WHO CAN COLLABORATE</h2>
        </div>

        {isMobile ? (
          <div className="collaborators-mobile-list">
            {partners.map((label, i) => (
              <motion.div 
                key={i} 
                className="collaborators-mobile-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="collaborators-mobile-label">PARTNER_0{i + 1}</span>
                <h3 className="collaborators-mobile-title">{label}</h3>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ height: '600px', width: '100vw', maxWidth: '1400px', position: 'relative' }}>
            <Canvas dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={2} />
              
              <group position-y={0.5}>
                {partners.map((label, i) => (
                  <CollaboratorTile 
                    key={i} 
                    index={i} 
                    label={label} 
                    activeIdx={activeIdx} 
                    setActiveIdx={setActiveIdx} 
                  />
                ))}
              </group>

              <ContactShadows 
                position={[0, -6, 0]} 
                opacity={0.3} 
                scale={40} 
                blur={2.5} 
                far={15} 
                color="#000000" 
              />
            </Canvas>
          </div>
        )}

        <p style={{ marginTop: isMobile ? '3rem' : '4rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '600px', padding: isMobile ? '0 1rem' : 0 }}>
          We collaborate with a diverse range of organizations to provide students with the best possible resources, mentorship, and opportunities.
        </p>

      </div>
    </section>
  );
};

export default CollaboratorsGrid3D;
