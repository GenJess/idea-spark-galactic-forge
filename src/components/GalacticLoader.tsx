import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random stars
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      // Random positions in a sphere
      const r = Math.random() * 100 + 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      
      // Star colors (blue to white)
      const intensity = Math.random();
      colors[i * 3] = 0.5 + intensity * 0.5; // R
      colors[i * 3 + 1] = 0.7 + intensity * 0.3; // G
      colors[i * 3 + 2] = 1; // B
    }
    
    return [positions, colors];
  }, []);
  
  useFrame((state) => {
    if (ref.current) {
      // Rotate the star field
      ref.current.rotation.y += 0.002;
      ref.current.rotation.x += 0.001;
      
      // Move stars toward camera (black hole effect)
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += 0.3; // Move Z forward
        
        // Reset star if it's too close
        if (positions[i + 2] > 10) {
          positions[i + 2] = -100;
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        size={0.8}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
      />
    </Points>
  );
}

function BlackHole() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z += 0.05;
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      ref.current.scale.setScalar(scale);
    }
  });
  
  return (
    <mesh ref={ref} position={[0, 0, -20]}>
      <ringGeometry args={[2, 4, 32]} />
      <meshBasicMaterial 
        color="#4f46e5" 
        transparent 
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Spaceship() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      // Gentle floating motion
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });
  
  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* Simple spaceship shape */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.3, 1.5, 8]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.6, 8]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
      {/* Engine glow */}
      <mesh position={[0, -0.8, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export function GalacticLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-background">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <StarField />
        <BlackHole />
        <Spaceship />
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#60a5fa" />
      </Canvas>
      
      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-6">
          <div className="relative">
            <h2 className="text-4xl font-bold gradient-text">
              Launching through the galaxy...
            </h2>
            <div className="absolute -inset-4 bg-gradient-cosmic opacity-20 blur-xl rounded-full"></div>
          </div>
          
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          
          <p className="text-muted-foreground text-lg">
            Navigating the cosmic void to manifest your idea...
          </p>
        </div>
      </div>
    </div>
  );
}