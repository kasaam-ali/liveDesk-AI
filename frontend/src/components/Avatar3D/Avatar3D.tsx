'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type AvatarState = 'idle' | 'speaking' | 'listening' | 'thinking';

interface Avatar3DProps {
  state?: AvatarState;
}

function AvatarModel({ state }: { state: AvatarState }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const leftEarGlow = useRef<THREE.Mesh>(null);
  const rightEarGlow = useRef<THREE.Mesh>(null);
  const thinkingDotRefs = useRef<THREE.Mesh[]>([]);
  const time = useRef(0);

  const faceColor = '#e94560';
  const accentColor = '#4a9eff';
  const glowColor = '#00d4aa';

  const thinkingDots = useMemo(() => {
    const dots: { x: number; y: number }[] = [];
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
      dots.push({ x: Math.cos(angle) * 1.5, y: Math.sin(angle) * 1.5 + 1.2 });
    }
    return dots;
  }, []);

  useFrame((_, delta) => {
    time.current += delta;

    if (!groupRef.current) return;

    const t = time.current;

    switch (state) {
      case 'idle':
        groupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
        groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
        groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.01;
        if (mouthRef.current) {
          mouthRef.current.scale.y = 0.1 + Math.sin(t * 2) * 0.05;
        }
        break;

      case 'speaking': {
        groupRef.current.position.y = Math.sin(t * 1.2) * 0.03;
        groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.01;
        const mouthSpeed = 8;
        const mouthOpen = 0.3 + Math.abs(Math.sin(t * mouthSpeed)) * 0.5;
        if (mouthRef.current) {
          mouthRef.current.scale.y = Math.max(0.1, mouthOpen);
        }
        break;
      }

      case 'listening':
        groupRef.current.position.y = Math.sin(t * 0.6) * 0.02;
        const glowIntensity = 0.5 + Math.sin(t * 3) * 0.3;
        if (leftEarGlow.current) {
          (leftEarGlow.current.material as THREE.MeshStandardMaterial).opacity = glowIntensity;
        }
        if (rightEarGlow.current) {
          (rightEarGlow.current.material as THREE.MeshStandardMaterial).opacity = glowIntensity;
        }
        if (mouthRef.current) {
          mouthRef.current.scale.y = 0.1;
        }
        break;

      case 'thinking':
        groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.08;
        groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
        if (mouthRef.current) {
          mouthRef.current.scale.y = 0.1;
        }
        break;
    }

    thinkingDotRefs.current.forEach((dot, i) => {
      if (dot) {
        const delay = i * 0.3;
        const scale = 0.3 + Math.sin(t * 3 + delay) * 0.15;
        dot.scale.setScalar(scale);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Neck */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.4, 12]} />
        <meshStandardMaterial color="#2a2f5a" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color={faceColor} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.35, 0.2, 0.85]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.35, 0.2, 0.85]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Pupils */}
      <mesh position={[-0.35, 0.18, 0.95]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#111438" />
      </mesh>
      <mesh position={[0.35, 0.18, 0.95]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#111438" />
      </mesh>

      {/* Mouth */}
      <mesh ref={mouthRef} position={[0, -0.15, 0.92]}>
        <sphereGeometry args={[0.15, 16, 8, 0, Math.PI * 2, 0, Math.PI]} />
        <meshStandardMaterial color="#111438" side={THREE.DoubleSide} />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.9, 0, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#d63850" />
      </mesh>
      <mesh position={[0.9, 0, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#d63850" />
      </mesh>

      {/* Ear glows (listening) */}
      <mesh ref={leftEarGlow} position={[-0.9, 0, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color={glowColor} transparent opacity={0} />
      </mesh>
      <mesh ref={rightEarGlow} position={[0.9, 0, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color={glowColor} transparent opacity={0} />
      </mesh>

      {/* Thinking dots */}
      {thinkingDots.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) thinkingDotRefs.current[i] = el; }}
          position={[pos.x, pos.y, 0.5]}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color={accentColor} />
        </mesh>
      ))}
    </group>
  );
}

const stateStyles: Record<AvatarState, { label: string }> = {
  idle: { label: 'How can I help you today?' },
  speaking: { label: 'Speaking...' },
  listening: { label: 'Listening...' },
  thinking: { label: 'Thinking...' },
};

export default function Avatar3D({ state = 'idle' }: Avatar3DProps) {
  const s = stateStyles[state];

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div
        className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden"
        style={{
          boxShadow: `0 0 40px ${
            state === 'speaking' ? '#00d4aa33' :
            state === 'listening' ? '#4a9eff33' :
            state === 'thinking' ? '#e9456033' :
            '#4a9eff22'
          }`,
          border: `2px solid ${
            state === 'speaking' ? '#00d4aa' :
            state === 'listening' ? '#4a9eff' :
            state === 'thinking' ? '#e94560' :
            '#4a9eff'
          }`,
        }}
      >
        <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 3, 4]} intensity={0.8} />
          <pointLight position={[-2, 1, 2]} intensity={0.4} color="#4a9eff" />
          <AvatarModel state={state} />
        </Canvas>
      </div>

      <p className="mt-4 text-lg md:text-xl font-medium text-center transition-all duration-300" style={{ color: '#8892b0' }}>
        {s.label}
      </p>
    </div>
  );
}
