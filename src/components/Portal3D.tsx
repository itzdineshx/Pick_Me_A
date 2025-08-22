import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Ring, Text, Float, Trail } from '@react-three/drei';
import * as THREE from 'three';

interface Portal3DProps {
  theme: 'anime' | 'cinema' | 'music';
  isHovered: boolean;
  isActive: boolean;
  cursorPosition?: { x: number; y: number };
}

// Custom shader materials for each theme
const AnimeShaderMaterial = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      pos.z += sin(uTime * 2.0 + position.x * 4.0) * 0.1;
      pos.y += cos(uTime * 1.5 + position.z * 3.0) * 0.05;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec2 center = vec2(0.5);
      float dist = distance(vUv, center);
      
      float pulse = sin(uTime * 3.0 - dist * 8.0) * 0.5 + 0.5;
      vec3 color = mix(
        vec3(0.8, 0.1, 0.3),
        vec3(1.0, 0.3, 0.5),
        pulse
      );
      
      float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
      alpha *= (pulse * 0.3 + 0.7);
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        uTime: { value: 0 }
      }}
      transparent
      side={THREE.DoubleSide}
    />
  );
};

const CinemaShaderMaterial = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.x += sin(uTime + position.y * 2.0) * 0.02;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    
    void main() {
      vec2 center = vec2(0.5);
      float dist = distance(vUv, center);
      
      float flicker = sin(uTime * 12.0) * 0.1 + 0.9;
      float lens = 1.0 - dist * 2.0;
      lens = clamp(lens, 0.0, 1.0);
      
      vec3 gold = vec3(1.0, 0.8, 0.2);
      vec3 darkGold = vec3(0.6, 0.4, 0.1);
      
      vec3 color = mix(darkGold, gold, lens * flicker);
      float alpha = lens * 0.8;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        uTime: { value: 0 }
      }}
      transparent
      side={THREE.DoubleSide}
    />
  );
};

const MusicShaderMaterial = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      float wave = sin(uTime * 4.0 + position.x * 6.0 + position.y * 4.0) * 0.05;
      pos.z += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec2 center = vec2(0.5);
      float dist = distance(vUv, center);
      
      float wave1 = sin(uTime * 5.0 - dist * 12.0);
      float wave2 = cos(uTime * 3.0 - vUv.x * 8.0);
      float combined = (wave1 + wave2) * 0.5;
      
      vec3 neonGreen = vec3(0.2, 1.0, 0.4);
      vec3 darkGreen = vec3(0.1, 0.4, 0.2);
      
      vec3 color = mix(darkGreen, neonGreen, combined * 0.5 + 0.5);
      float alpha = (1.0 - dist) * 0.7;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        uTime: { value: 0 }
      }}
      transparent
      side={THREE.DoubleSide}
    />
  );
};

// 3D Portal Ring Component
const PortalRing: React.FC<Portal3DProps> = ({ theme, isHovered, isActive }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    const colors = new Float32Array(200 * 3);
    
    for (let i = 0; i < 200; i++) {
      const angle = (i / 200) * Math.PI * 2;
      const radius = 1.2 + Math.random() * 0.8;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      
      // Theme-specific colors
      if (theme === 'anime') {
        colors[i * 3] = 1.0; // R
        colors[i * 3 + 1] = 0.2; // G
        colors[i * 3 + 2] = 0.4; // B
      } else if (theme === 'cinema') {
        colors[i * 3] = 1.0; // R
        colors[i * 3 + 1] = 0.8; // G
        colors[i * 3 + 2] = 0.2; // B
      } else {
        colors[i * 3] = 0.2; // R
        colors[i * 3 + 1] = 1.0; // G
        colors[i * 3 + 2] = 0.4; // B
      }
    }
    
    return { positions, colors };
  }, [theme]);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += isHovered ? 0.02 : 0.01;
      ringRef.current.scale.setScalar(isHovered ? 1.1 : 1.0);
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.z -= 0.005;
      particlesRef.current.rotation.y += 0.002;
    }
  });

  const ShaderMaterial = theme === 'anime' ? AnimeShaderMaterial : 
                        theme === 'cinema' ? CinemaShaderMaterial : 
                        MusicShaderMaterial;

  return (
    <group>
      {/* Main Portal Ring */}
      <Ring ref={ringRef} args={[1, 1.3, 32]}>
        <ShaderMaterial />
      </Ring>
      
      {/* Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={particles.positions}
            count={200}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={particles.colors}
            count={200}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

// Cursor-Following 3D Particles
const CursorParticles: React.FC<{ cursorPosition?: { x: number; y: number }; theme: string }> = ({ 
  cursorPosition, 
  theme 
}) => {
  const particlesRef = useRef<THREE.Points>(null);
  const targetPosition = useRef(new THREE.Vector3());
  
  useEffect(() => {
    if (cursorPosition) {
      // Convert screen coordinates to 3D space
      targetPosition.current.set(
        (cursorPosition.x / window.innerWidth) * 4 - 2,
        -(cursorPosition.y / window.innerHeight) * 4 + 2,
        0
      );
    }
  }, [cursorPosition]);
  
  useFrame(() => {
    if (particlesRef.current && targetPosition.current) {
      particlesRef.current.position.lerp(targetPosition.current, 0.1);
      particlesRef.current.rotation.z += 0.01;
    }
  });

  const trailParticles = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }
    return positions;
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={trailParticles}
          count={50}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color={theme === 'anime' ? '#ff2040' : theme === 'cinema' ? '#ffd700' : '#40ff80'}
        transparent
        opacity={0.6}
      />
    </points>
  );
};

// Main Portal 3D Component
const Portal3D: React.FC<Portal3DProps> = ({ theme, isHovered, isActive, cursorPosition }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight 
          position={[0, 0, 2]} 
          intensity={1} 
          color={theme === 'anime' ? '#ff2040' : theme === 'cinema' ? '#ffd700' : '#40ff80'}
        />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={0.5}
          intensity={0.5}
          castShadow
        />
        
        {/* Portal Ring with Theme-specific Shaders */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
          <PortalRing theme={theme} isHovered={isHovered} isActive={isActive} />
        </Float>
        
        {/* Cursor-following particles */}
        <CursorParticles cursorPosition={cursorPosition} theme={theme} />
        
        {/* Subtle orbit controls for depth */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate={isHovered}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Portal3D;