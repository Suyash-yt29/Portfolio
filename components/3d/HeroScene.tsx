"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";

function LiquidOrb() {
  return (
    // Float makes it hover up and down slowly
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} scale={1.8}>
        {/* MeshDistortMaterial creates that liquid, morphing effect */}
        <MeshDistortMaterial
          color="#a853ba" // Cyber-purple
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.2}
          distort={0.4} // How much it morphs
          speed={2}     // How fast it morphs
        />
      </Sphere>
    </Float>
  );
}

export default function HeroScene() {
  return (
    // absolute inset-0 pushes it to the background, pointer-events-none stops it from blocking clicks
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#2a8af6" />
        <directionalLight position={[-10, -10, -10]} intensity={2} color="#e92a67" />
        <LiquidOrb />
      </Canvas>
    </div>
  );
}