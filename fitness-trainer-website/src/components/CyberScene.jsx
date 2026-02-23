import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

const AnimatedSphere = () => {
  const meshRef = useRef();
  
  // Rotate the sphere slowly
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial
          color="#10b981" // Emerald 500
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          wireframe
        />
      </Sphere>
    </Float>
  );
};

const CyberScene = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 lg:opacity-60">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#10b981" />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
};

export default CyberScene;