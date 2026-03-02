import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export default function HologramCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  useEffect(() => {
    // Initial entrance animation
    if (meshRef.current) {
      gsap.fromTo(
        meshRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 2, ease: 'elastic.out(1, 0.5)', delay: 1 }
      );
    }
  }, []);

  return (
    <group position={[3, 0, 0]}>
      {/* Outer Wireframe Glow */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshPhysicalMaterial
          ref={materialRef}
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={0.8}
          wireframe={true}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Inner Solid Core */}
      <mesh scale={0.8}>
        <icosahedronGeometry args={[2, 0]} />
        <meshPhysicalMaterial
          color="#8a2be2"
          emissive="#8a2be2"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}
