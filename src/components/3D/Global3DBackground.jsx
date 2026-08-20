import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import styles from './Global3DBackground.module.css';

/**
 * Interactive 3D Particle Constellation / Nodes & Connections Canvas Network
 * Matches exact style of reference image with gold, cyan, and neon-lime node accents.
 * Transparent canvas layer preserving existing site background color.
 */
function ConstellationNetwork3D({ count = 115, maxDistance = 3.3 }) {
  const pointsRef = useRef();
  const linesRef = useRef();
  const { viewport } = useThree();

  const mousePos = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * viewport.width * 0.9;
      mousePos.current.y = -(e.clientY / window.innerHeight - 0.5) * viewport.height * 0.9;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport]);

  // Generate 3D particle positions, velocities, and multi-accent colors (Gold, Cyan, Lime)
  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorGold = new THREE.Color('#ffc83b');
    const colorCyan = new THREE.Color('#00f0ff');
    const colorLime = new THREE.Color('#ccff00');

    const palette = [colorGold, colorCyan, colorLime];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;

      const chosen = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return [pos, vel, col];
  }, [count]);

  const linePositions = useMemo(() => new Float32Array(count * count * 6), [count]);
  const lineColors = useMemo(() => new Float32Array(count * count * 6), [count]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.getElapsedTime();
    const pGeo = pointsRef.current.geometry;
    const lGeo = linesRef.current.geometry;
    const posArr = pGeo.attributes.position.array;
    let lineVertexCount = 0;

    const targetMX = mousePos.current.x;
    const targetMY = mousePos.current.y;

    // Update particle positions + subtle mouse magnetic attraction force
    for (let i = 0; i < count; i++) {
      const px = posArr[i * 3];
      const py = posArr[i * 3 + 1];

      const dx = targetMX - px;
      const dy = targetMY - py;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);

      if (distToMouse < 4.2 && distToMouse > 0.1) {
        const force = (1 - distToMouse / 4.2) * 0.0025;
        velocities[i * 3] += dx * force;
        velocities[i * 3 + 1] += dy * force;
      }

      velocities[i * 3] *= 0.988;
      velocities[i * 3 + 1] *= 0.988;
      velocities[i * 3 + 2] *= 0.988;

      posArr[i * 3] += velocities[i * 3];
      posArr[i * 3 + 1] += velocities[i * 3 + 1];
      posArr[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(posArr[i * 3]) > 11) velocities[i * 3] *= -1;
      if (Math.abs(posArr[i * 3 + 1]) > 9) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArr[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
    }
    pGeo.attributes.position.needsUpdate = true;

    // Constellation Line calculations
    const linePosArr = lGeo.attributes.position.array;
    const lineColArr = lGeo.attributes.color.array;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = posArr[i * 3] - posArr[j * 3];
        const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
        const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePosArr[lineVertexCount * 3] = posArr[i * 3];
          linePosArr[lineVertexCount * 3 + 1] = posArr[i * 3 + 1];
          linePosArr[lineVertexCount * 3 + 2] = posArr[i * 3 + 2];

          lineColArr[lineVertexCount * 3] = colors[i * 3];
          lineColArr[lineVertexCount * 3 + 1] = colors[i * 3 + 1];
          lineColArr[lineVertexCount * 3 + 2] = colors[i * 3 + 2];

          lineVertexCount++;

          linePosArr[lineVertexCount * 3] = posArr[j * 3];
          linePosArr[lineVertexCount * 3 + 1] = posArr[j * 3 + 1];
          linePosArr[lineVertexCount * 3 + 2] = posArr[j * 3 + 2];

          lineColArr[lineVertexCount * 3] = colors[j * 3];
          lineColArr[lineVertexCount * 3 + 1] = colors[j * 3 + 1];
          lineColArr[lineVertexCount * 3 + 2] = colors[j * 3 + 2];

          lineVertexCount++;
        }
      }
    }

    lGeo.setDrawRange(0, lineVertexCount);
    lGeo.attributes.position.needsUpdate = true;
    lGeo.attributes.color.needsUpdate = true;

    // Smooth rotation drift & parallax
    pointsRef.current.rotation.y = time * 0.02 + targetMX * 0.015;
    pointsRef.current.rotation.x = targetMY * 0.015;
    linesRef.current.rotation.y = time * 0.02 + targetMX * 0.015;
    linesRef.current.rotation.x = targetMY * 0.015;
  });

  return (
    <group>
      {/* 3D Particle Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>

      {/* Constellation Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          opacity={0.18}
          linewidth={1}
        />
      </lineSegments>

      {/* Ambient Sparkles */}
      <Sparkles
        count={50}
        scale={[16, 16, 16]}
        size={2.5}
        speed={0.3}
        color="#ffc83b"
        opacity={0.4}
      />
      <Sparkles
        count={35}
        scale={[14, 14, 14]}
        size={3}
        speed={0.25}
        color="#00f0ff"
        opacity={0.35}
      />
    </group>
  );
}

export function Global3DBackground() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={styles.globalBgContainer} />;
  }

  return (
    <div className={styles.globalBgContainer}>
      <Canvas
        className={styles.canvasElement}
        camera={{ position: [0, 0, 8.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffc83b" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#00f0ff" />

        <ConstellationNetwork3D count={115} maxDistance={3.3} />
      </Canvas>
    </div>
  );
}

export default Global3DBackground;
