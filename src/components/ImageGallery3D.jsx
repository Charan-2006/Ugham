import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, Float, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const ImagePlane = ({ url, position, rotation, label, color }) => {
  const texture = useTexture(url);
  
  return (
    <group position={position} rotation={rotation}>
      {/* The Image Plane */}
      <mesh>
        <planeGeometry args={[2.4, 3.2]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      
      {/* HTML Overlay Label */}
      <Html transform position={[0, -1.8, 0.05]} distanceFactor={3.5} zIndexRange={[100, 0]}>
        <div style={{
          background: 'rgba(10, 15, 29, 0.85)',
          backdropFilter: 'blur(10px)',
          padding: '0.75rem 1.5rem',
          borderRadius: '12px',
          color: 'white',
          borderTop: `3px solid ${color}`,
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          userSelect: 'none',
          pointerEvents: 'none'
        }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em' }}>{label}</h3>
        </div>
      </Html>
    </group>
  );
};

const ImageGallery3D = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1} />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 300 }}
          rotation={[0, 0, 0]}
          polar={[-0.1, 0.1]} // Vertical rotation limits
          azimuth={[-0.4, 0.4]} // Horizontal rotation limits
        >
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Suspense fallback={null}>
              {/* Left Image: Ideation */}
              <ImagePlane 
                url="/assets/img/ideation.png" 
                position={[-2.6, 0, -1]} 
                rotation={[0, 0.4, 0]} 
                label="1. IDEATION" 
                color="#FF3366" 
              />
              
              {/* Center Image: Building */}
              <ImagePlane 
                url="/assets/img/building.png" 
                position={[0, 0, 0.5]} 
                rotation={[0, 0, 0]} 
                label="2. BUILDING" 
                color="#00C2FF" 
              />
              
              {/* Right Image: Scaling */}
              <ImagePlane 
                url="/assets/img/scope.png" 
                position={[2.6, 0, -1]} 
                rotation={[0, -0.4, 0]} 
                label="3. SCALING" 
                color="#3b16fe" 
              />
            </Suspense>
          </Float>
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export default ImageGallery3D;
