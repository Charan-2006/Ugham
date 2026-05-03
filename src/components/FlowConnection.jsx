import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const BackgroundElements = ({ color }) => {
  const signalRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (signalRef.current) {
      // C. Mid empty space: 1 floating signal dot (fade in -> slight upward move -> fade out)
      const cycle = 4; // 4 second cycle
      const t = (time % cycle) / cycle;
      const opacity = Math.sin(t * Math.PI) * 0.18;
      const yOffset = t * 0.5;
      signalRef.current.material.opacity = opacity;
      signalRef.current.position.y = 2.4 + yOffset;
    }
  });

  return (
    <group>
      {/* A. Top-right area: Cluster of 5 dots with 2 connecting lines */}
      <group position={[5.5, 3.2, -1]}>
        {[
          [0, 0, 0], [0.25, 0.15, 0], [-0.15, 0.25, 0], [0.1, -0.25, 0], [-0.2, -0.1, 0]
        ].map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.15} />
          </mesh>
        ))}
        <Line points={[[0, 0, 0], [0.25, 0.15, 0]]} color={color} lineWidth={0.5} transparent opacity={0.08} />
        <Line points={[[0, 0, 0], [-0.15, 0.25, 0]]} color={color} lineWidth={0.5} transparent opacity={0.08} />
      </group>

      {/* B. Bottom-left area: Cluster of 4 dots with 1 connecting line */}
      <group position={[-5.5, -1.2, -1]}>
        {[
          [0, 0, 0], [0.2, 0.2, 0], [-0.15, -0.1, 0], [0.25, -0.05, 0]
        ].map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.15} />
          </mesh>
        ))}
        <Line points={[[0, 0, 0], [0.2, 0.2, 0]]} color={color} lineWidth={0.5} transparent opacity={0.08} />
      </group>

      {/* C. Mid empty space signal dot */}
      <mesh ref={signalRef} position={[0, 2.4, -1]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0} />
      </mesh>
    </group>
  );
};

const Flow = ({ activeSide }) => {
  const pointsRef = useRef();
  const pulseRef = useRef();
  const nodeLeftRef = useRef();
  const nodeRightRef = useRef();
  const particleCount = 60;
  
  const curve = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-4.5, 0, 0),
      new THREE.Vector3(0, 3.2, 0),
      new THREE.Vector3(4.5, 0, 0)
    );
  }, []);

  const linePoints = useMemo(() => curve.getPoints(150), [curve]);

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map(() => ({
      t: Math.random(),
      speed: 0.0005 + Math.random() * 0.0008,
      offset: (Math.random() - 0.5) * 0.1
    }));
  }, []);

  const posArr = useMemo(() => new Float32Array(particleCount * 3), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // 1. Pulse logic
    if (pulseRef.current) {
      const pulseSpeed = activeSide === 'left' ? 0.8 : activeSide === 'right' ? 0.6 : 0.4;
      const pulseT = (time * pulseSpeed) % 1;
      const pulsePos = curve.getPoint(pulseT);
      pulseRef.current.position.copy(pulsePos);
      pulseRef.current.scale.setScalar(activeSide ? 1.5 : 1.0);
    }

    // 2. Node logic
    if (nodeLeftRef.current && nodeRightRef.current) {
      const breathe = Math.sin(time * 2) * 0.15 + 1;
      nodeLeftRef.current.scale.setScalar(breathe * (activeSide === 'left' ? 1.8 : 1.2));
      nodeRightRef.current.scale.setScalar(breathe * (activeSide === 'right' ? 1.8 : 1.2));
    }

    // 3. Particle logic
    particles.forEach((p, i) => {
      let speedFactor = 1;
      if (activeSide === 'left') speedFactor = 3.0;
      if (activeSide === 'right') speedFactor = 2.5;
      
      p.t += p.speed * speedFactor;
      if (p.t > 1) p.t = 0;

      const pos = curve.getPoint(p.t);
      posArr[i * 3] = pos.x + p.offset;
      posArr[i * 3 + 1] = pos.y + p.offset;
      posArr[i * 3 + 2] = pos.z;
    });
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const currentColor = useMemo(() => {
    if (activeSide === 'left') return '#3b16fe';
    if (activeSide === 'right') return '#ff3366'; // Changed to brand secondary for more contrast
    return '#6d4aff';
  }, [activeSide]);

  return (
    <group position={[0, 0.4, 0]}>
      <BackgroundElements color={currentColor} />

      {/* Anchor Nodes with Glow */}
      <mesh ref={nodeLeftRef} position={[-4.5, 0, 0]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshBasicMaterial color={currentColor} transparent opacity={0.8} />
      </mesh>
      <mesh ref={nodeRightRef} position={[4.5, 0, 0]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshBasicMaterial color={currentColor} transparent opacity={0.8} />
      </mesh>

      {/* Main Bridge System - Multi-layered glow */}
      <Line points={linePoints} color={currentColor} lineWidth={1.5} transparent opacity={0.4} />
      <Line points={linePoints} color={currentColor} lineWidth={8} transparent opacity={0.1} />
      <Line points={linePoints} color={currentColor} lineWidth={25} transparent opacity={0.02} />
      
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshBasicMaterial color={currentColor} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={posArr} itemSize={3} />
        </bufferGeometry>
        <PointMaterial transparent color={currentColor} size={0.12} sizeAttenuation={true} depthWrite={false} opacity={0.4} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
};

const FlowConnection = ({ activeSide }) => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 1.2, 8.5], fov: 32 }} dpr={[1, 2]}>
        <ambientLight intensity={1} />
        <Flow activeSide={activeSide} />
      </Canvas>
    </div>
  );
};

export default FlowConnection;
