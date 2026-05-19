"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function HolographicDeveloper() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current && headRef.current) {
      // 1. Slow, continuous floating rotation for the whole body
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

      // 2. Make the head track the user's mouse!
      const targetX = (state.mouse.x * Math.PI) / 4;
      const targetY = (state.mouse.y * Math.PI) / 4;
      
      // Smoothly interpolate the head looking at the cursor
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.8, 0]}>
      <Float speed={2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
        
        {/* ==================================
            THE HEAD (Cybernetic Wireframe)
            ================================== */}
        <mesh ref={headRef} position={[0, 1.8, 0]}>
          {/* A faceted geometric head shape */}
          <icosahedronGeometry args={[0.6, 1]} />
          
          {/* Premium Gold Wireframe Material */}
          <meshStandardMaterial
            color="#d4af37"
            wireframe={true}
            transparent={true}
            opacity={0.8}
          />
          
          {/* Inner Glowing "AI Brain/Core" */}
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#fde08b" transparent opacity={0.6} />
          </mesh>

          {/* Orbiting Data Ring (Horizontal) */}
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[1.0, 0.015, 16, 100]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
          
          {/* Orbiting Data Ring (Diagonal) */}
          <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[1.2, 0.015, 16, 100]} />
            <meshBasicMaterial color="#0044ff" transparent opacity={0.5} />
          </mesh>
        </mesh>

        {/* ==================================
            THE BODY / SHOULDERS (Glass Effect)
            ================================== */}
        <mesh position={[0, 0.2, 0]}>
          {/* Stylized upper torso/shoulders */}
          <cylinderGeometry args={[1.0, 1.5, 1.8, 6]} />
          
          {/* Advanced Glass/Hologram Material */}
          <meshPhysicalMaterial
            color="#001133" // Deep space blue
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.4}
            transmission={0.9} // This makes it look like real glass!
            thickness={0.5}
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Neck connector */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.2, 0.3, 0.4, 8]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
        </mesh>

      </Float>
    </group>
  );
}

export default function AboutScene() {
  return (
    // Height container is crucial so the 3D canvas has room to render
    <div className="w-full h-[400px] md:h-[500px] relative">
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        
        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.4} />
        
        {/* Golden spotlight hitting the face */}
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.2} 
          penumbra={1} 
          intensity={3} 
          color="#fde08b" 
        />
        
        {/* Blue rim-light from behind/bottom */}
        <pointLight 
          position={[-5, -5, -5]} 
          intensity={2} 
          color="#0044ff" 
        />

        {/* The Holographic Man */}
        <HolographicDeveloper />

        {/* Gives the glass and metal materials something to reflect */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}