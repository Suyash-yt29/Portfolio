"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function LiquidScattering() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const drop1Ref = useRef<THREE.Mesh>(null!);
  const drop2Ref = useRef<THREE.Mesh>(null!);
  const drop3Ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    // 1. Get mouse position in 3D space
    const mx = state.mouse.x * 7;
    const my = state.mouse.y * 7;
    const mousePos = new THREE.Vector3(mx, my, 0);

    // 2. Physics Engine: Push away if close, snap back if far
    const applyPhysics = (mesh: THREE.Mesh, homeX: number, homeY: number, floatOffset: number) => {
      if (!mesh) return;

      // Continuous zero-gravity floating motion
      const time = state.clock.elapsedTime;
      const dynamicHomeX = homeX + Math.sin(time + floatOffset) * 0.4;
      const dynamicHomeY = homeY + Math.cos(time + floatOffset) * 0.4;
      const targetPos = new THREE.Vector3(dynamicHomeX, dynamicHomeY, 0);

      // Check distance to mouse
      const distance = mesh.position.distanceTo(mousePos);
      const REPULSION_RADIUS = 3.5;

      if (distance < REPULSION_RADIUS) {
        // Mouse is close! Calculate push direction
        const pushVector = mesh.position.clone().sub(mousePos).normalize();
        // The closer the mouse, the harder it pushes
        const pushStrength = (REPULSION_RADIUS - distance) * 1.5;
        targetPos.add(pushVector.multiplyScalar(pushStrength));
      }

      // Smoothly animate the blob to its target position
      mesh.position.lerp(targetPos, 0.08);
    };

    // Apply the math to all our liquid drops
    applyPhysics(coreRef.current, 0, 0, 0);
    applyPhysics(drop1Ref.current, 1.2, 1.0, 1);
    applyPhysics(drop2Ref.current, -1.3, -0.8, 2);
    applyPhysics(drop3Ref.current, 0.8, -1.2, 3);
  });

  // The true metallic liquid gold material
  const liquidMaterial = (
    <MeshDistortMaterial
      color="#d4af37" // Premium Gold
      envMapIntensity={3} // Deep reflections
      clearcoat={1} // Glossy outer layer
      clearcoatRoughness={0.1}
      metalness={1.0} // 100% Metal
      roughness={0.15}
      distort={0.4} // Boiling water effect
      speed={2}
    />
  );

  return (
    <group>
      {/* Center Core */}
      <mesh ref={coreRef} scale={1.6}>
        <sphereGeometry args={[1, 64, 64]} />
        {liquidMaterial}
      </mesh>

      {/* Breakaway Satellite Drops */}
      <mesh ref={drop1Ref} scale={0.7}>
        <sphereGeometry args={[1, 32, 32]} />
        {liquidMaterial}
      </mesh>
      <mesh ref={drop2Ref} scale={0.5}>
        <sphereGeometry args={[1, 32, 32]} />
        {liquidMaterial}
      </mesh>
      <mesh ref={drop3Ref} scale={0.6}>
        <sphereGeometry args={[1, 32, 32]} />
        {liquidMaterial}
      </mesh>
    </group>
  );
}

export default function ZeroGravityLiquid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0 bg-[#050505] z-0" />;

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505] z-0">
      <Canvas camera={{ position: [0, 0, 7] }}>
        
        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.3} color="#ffffff" />
        {/* Bright Gold Highlight */}
        <directionalLight position={[5, 5, 5]} intensity={4} color="#fde08b" />
        {/* Deep Blue Space Refraction (from the bottom left) */}
        <directionalLight position={[-5, -5, -5]} intensity={3} color="#0044ff" />
        
        {/* The 3D Physics Object */}
        <LiquidScattering />

        {/* Real-time reflection mapping */}
        <Environment preset="city" />
      </Canvas>
      
      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
}