"use client";

import { Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type DigitalCore3DProps = {
  entering?: boolean;
  reduceMotion?: boolean;
  activated?: boolean;
};

type PlaneSpec = {
  vertices: Array<[number, number, number]>;
  color: string;
  opacity: number;
  metalness: number;
  roughness: number;
};

const MASK_SURFACE_OPACITY = 0.94;
const INTRO_DURATION = 4.2;
const BURST_DURATION = 0.86;

function clamp01(value: number) {
  return THREE.MathUtils.clamp(value, 0, 1);
}

function easeOutCubic(value: number) {
  const clamped = clamp01(value);
  return 1 - (1 - clamped) ** 3;
}

function smoothStep(value: number) {
  const clamped = clamp01(value);
  return clamped * clamped * (3 - 2 * clamped);
}

function createPlaneGeometry(vertices: PlaneSpec["vertices"]) {
  const geometry = new THREE.BufferGeometry();
  const triangles: PlaneSpec["vertices"] = [];

  for (let index = 1; index < vertices.length - 1; index += 1) {
    triangles.push(vertices[0], vertices[index], vertices[index + 1]);
  }

  geometry.setAttribute("position", new THREE.Float32BufferAttribute(triangles.flat(), 3));
  geometry.computeVertexNormals();
  return geometry;
}

function ConsciousnessField({ entering = false, reduceMotion = false, activated = false }: DigitalCore3DProps) {
  const field = useRef<THREE.Group>(null);
  const aura = useRef<THREE.Mesh>(null);
  const energyBurst = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const lattice = useRef<THREE.Mesh>(null);
  const particles = useRef<THREE.Points>(null);
  const glitterDust = useRef<THREE.Points>(null);
  const coreLight = useRef<THREE.PointLight>(null);
  const activationLevel = useRef(0);
  const burstStart = useRef(-1);
  const wasActivated = useRef(false);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const points: number[] = [];

    for (let index = 0; index < 520; index += 1) {
      const radius = 1.22 + Math.random() * 0.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));

      points.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      );
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, []);

  const glitterDustGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const directions: number[] = [];
    const sizes: number[] = [];

    for (let index = 0; index < 72; index += 1) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(1.6));
      const radius = 0.62 + Math.random() * 0.18;
      const direction = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi) * 0.58,
      ).normalize();

      positions.push(direction.x * radius, direction.y * radius, direction.z * radius);
      directions.push(direction.x, direction.y, direction.z);
      sizes.push(0.62 + Math.random() * 0.38);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("sparkDirection", new THREE.Float32BufferAttribute(directions, 3));
    geometry.setAttribute("sparkSize", new THREE.Float32BufferAttribute(sizes, 1));
    return geometry;
  }, []);

  useFrame(({ clock }, delta) => {
    if (!field.current) return;

    const introProgress = reduceMotion ? 1 : easeOutCubic(clock.elapsedTime / INTRO_DURATION);
    const energyProgress = reduceMotion ? 1 : smoothStep((clock.elapsedTime - 0.15) / 1.45);
    const formationProgress = reduceMotion ? 1 : smoothStep((clock.elapsedTime - 0.9) / 1.7);
    const syncSurge = reduceMotion ? 0 : Math.sin(clamp01((clock.elapsedTime - 2.65) / 0.95) * Math.PI);
    if (activated && !wasActivated.current) {
      burstStart.current = clock.elapsedTime;
    }
    wasActivated.current = activated;

    const burstAge = burstStart.current < 0 ? BURST_DURATION : clock.elapsedTime - burstStart.current;
    const burstProgress = clamp01(burstAge / BURST_DURATION);
    const burstActive = burstAge < BURST_DURATION;
    const burstScatter = burstActive ? easeOutCubic(burstProgress) : 0;
    const dustGlow = burstActive ? Math.sin(clamp01(burstProgress / 0.72) * Math.PI) * (1 - smoothStep((burstProgress - 0.72) / 0.28)) : 0;
    const peakGlow = burstActive ? Math.sin(clamp01((burstProgress - 0.22) / 0.78) * Math.PI) : 0;
    const activationTarget = activated ? 1 : 0;
    activationLevel.current = reduceMotion
      ? activationTarget * 0.42
      : THREE.MathUtils.damp(activationLevel.current, activationTarget, activated ? 9 : 3.6, delta);
    const activation = activationLevel.current;
    const activationPulse = activation * 0.48 + peakGlow * 0.52;

    if (!reduceMotion) {
      field.current.rotation.y += delta * (0.018 + introProgress * 0.027);
      field.current.rotation.z = Math.sin(clock.elapsedTime * 0.22) * 0.035;
    }

    const livingPulse = reduceMotion
      ? 1
      : 1 + Math.sin(clock.elapsedTime * 0.82) * 0.045 + Math.sin(clock.elapsedTime * 1.37) * 0.018;
    const luminance = reduceMotion
      ? 0
      : Math.sin(clock.elapsedTime * 0.82) * 0.012 + Math.sin(clock.elapsedTime * 1.63) * 0.008;

    if (aura.current) {
      aura.current.scale.setScalar((entering ? 1.08 : 1) * (0.82 + energyProgress * 0.18) * livingPulse * (1 + peakGlow * 0.018));
      const material = aura.current.material as THREE.MeshBasicMaterial;
      material.opacity = reduceMotion
        ? 0.07 + activation * 0.08
        : (0.075 + luminance + syncSurge * 0.045 + activationPulse * 0.19) * energyProgress;
    }

    if (energyBurst.current) {
      energyBurst.current.scale.setScalar((entering ? 1.08 : 1) * (0.72 + formationProgress * 0.28 + peakGlow * 0.018));
      const material = energyBurst.current.material as THREE.MeshBasicMaterial;
      material.opacity = reduceMotion
        ? activation * 0.08
        : (dustGlow * 0.08 + peakGlow * 0.16) * formationProgress;
    }

    if (glow.current) {
      glow.current.scale.setScalar(
          (entering ? 1.14 : 1) *
          (0.78 + formationProgress * 0.22) *
          (1 + (livingPulse - 1) * 0.72 + peakGlow * 0.018),
      );
      const material = glow.current.material as THREE.MeshBasicMaterial;
      material.opacity = reduceMotion
        ? 0.09 + activation * 0.095
        : (0.1 + luminance * 1.35 + syncSurge * 0.055 + activationPulse * 0.2) * formationProgress;
    }

    if (core.current) {
      core.current.scale.setScalar(
        reduceMotion
          ? 1 + activation * 0.045
          : (0.68 + formationProgress * 0.32) * (1 + Math.sin(clock.elapsedTime * 1.14) * 0.024 + peakGlow * 0.014),
      );
      const material = core.current.material as THREE.MeshBasicMaterial;
      material.opacity = reduceMotion
        ? 0.14 + activation * 0.055
        : (0.145 + luminance * 1.8 + syncSurge * 0.06 + activationPulse * 0.085) * formationProgress;
    }

    if (coreLight.current) {
      coreLight.current.intensity = reduceMotion
        ? 0.62 + activation * 0.35
        : (0.68 + Math.abs(luminance) * 6 + syncSurge * 0.42 + dustGlow * 0.32 + peakGlow * 1.05) * energyProgress;
    }

    if (particles.current && !reduceMotion) {
      particles.current.rotation.y -= delta * 0.03;
      const material = particles.current.material as THREE.PointsMaterial;
      material.opacity =
        (0.24 + Math.sin(clock.elapsedTime * 0.9) * 0.045) *
        smoothStep((clock.elapsedTime - 0.45) / 1.35);
    }

    if (glitterDust.current) {
      const material = glitterDust.current.material as THREE.PointsMaterial;

      if (reduceMotion) {
        material.opacity = 0;
      } else {
        const scatter = burstScatter;
        const position = glitterDust.current.geometry.getAttribute("position") as THREE.BufferAttribute;
        const direction = glitterDust.current.geometry.getAttribute("sparkDirection") as THREE.BufferAttribute;
        const sparkSize = glitterDust.current.geometry.getAttribute("sparkSize") as THREE.BufferAttribute;

        for (let index = 0; index < position.count; index += 1) {
          const baseRadius = 0.6 + sparkSize.getX(index) * 0.16;
          const outward = scatter * (0.42 + sparkSize.getX(index) * 0.26);
          const drift = Math.sin(clock.elapsedTime * 2.6 + index * 0.47) * 0.012 * scatter;

          position.setXYZ(
            index,
            direction.getX(index) * (baseRadius + outward) + drift,
            direction.getY(index) * (baseRadius + outward) - drift * 0.4,
            direction.getZ(index) * (baseRadius * 0.82 + outward * 0.65),
          );
        }

        position.needsUpdate = true;
        glitterDust.current.rotation.y += delta * 0.08;
        material.opacity = dustGlow * 0.54;
      }
    }

    if (lattice.current) {
      const material = lattice.current.material as THREE.MeshBasicMaterial;
      material.opacity = reduceMotion
        ? 0.09
        : 0.09 * smoothStep((clock.elapsedTime - 1.25) / 1.2);
    }
  });

  return (
    <group ref={field} position={[0, -0.02, -0.78]}>
      <pointLight
        ref={coreLight}
        position={[0, 0, 0.48]}
        intensity={reduceMotion ? 0.68 : 0}
        color="#f8fafc"
        distance={3.2}
        decay={2}
      />
      <mesh ref={aura}>
        <sphereGeometry args={[1.58, 40, 20]} />
        <meshBasicMaterial
          color="#dbeafe"
          transparent
          opacity={reduceMotion ? 0.075 : 0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={energyBurst}>
        <sphereGeometry args={[1.42, 40, 20]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[1.34, 36, 18]} />
        <meshBasicMaterial
          color="#f8fafc"
          transparent
          opacity={reduceMotion ? 0.1 : 0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={core} scale={0.78}>
        <sphereGeometry args={[1.18, 32, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={reduceMotion ? 0.145 : 0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <points ref={particles} geometry={particleGeometry}>
        <pointsMaterial
          color="#f8fafc"
          size={0.013}
          transparent
          opacity={reduceMotion ? 0.24 : 0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points ref={glitterDust} geometry={glitterDustGeometry}>
        <pointsMaterial
          color="#ffffff"
          size={0.022}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh ref={lattice} scale={1.02}>
        <sphereGeometry args={[1.28, 28, 14]} />
        <meshBasicMaterial
          color="#e5e7eb"
          wireframe
          transparent
          opacity={reduceMotion ? 0.09 : 0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function PulseRing({
  radius,
  tube,
  segments,
  rotation,
  opacity,
  phase,
  speed,
  color,
  introDelay,
  reduceMotion = false,
}: {
  radius: number;
  tube: number;
  segments: number;
  rotation: [number, number, number];
  opacity: number;
  phase: number;
  speed: number;
  color: string;
  introDelay: number;
  reduceMotion?: boolean;
}) {
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ring.current) return;

    const material = ring.current.material as THREE.MeshBasicMaterial;
    if (reduceMotion) {
      ring.current.scale.setScalar(1);
      material.opacity = opacity;
      return;
    }

    const introProgress = smoothStep((clock.elapsedTime - introDelay) / 0.9);
    const wave = (Math.sin(clock.elapsedTime * speed + phase) + 1) / 2;
    const organicFlicker = Math.sin(clock.elapsedTime * (speed * 0.47) + phase * 1.7) * 0.012;
    ring.current.scale.setScalar((0.88 + introProgress * 0.06) + wave * 0.16 * introProgress);
    material.opacity = (opacity + wave * 0.055 + organicFlicker) * introProgress;
  });

  return (
    <mesh ref={ring} rotation={rotation}>
      <torusGeometry args={[radius, tube, 8, segments]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={reduceMotion ? opacity : 0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function OrbitRings({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const rings = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!rings.current || reduceMotion) return;
    rings.current.rotation.z += delta * 0.035;
    rings.current.rotation.y -= delta * 0.018;
  });

  return (
    <group ref={rings} position={[0, 0, -0.92]} scale={1.04}>
      <PulseRing
        radius={2.08}
        tube={0.0048}
        segments={160}
        rotation={[0.72, 0.12, 0.16]}
        opacity={0.105}
        phase={0.3}
        speed={0.78}
        color="#ffffff"
        introDelay={2.45}
        reduceMotion={reduceMotion}
      />
      <PulseRing
        radius={1.76}
        tube={0.0038}
        segments={144}
        rotation={[1.18, -0.46, -0.34]}
        opacity={0.078}
        phase={1.55}
        speed={0.92}
        color="#e5e7eb"
        introDelay={2.8}
        reduceMotion={reduceMotion}
      />
      <PulseRing
        radius={2.36}
        tube={0.0034}
        segments={160}
        rotation={[0.28, 0.9, 0.62]}
        opacity={0.062}
        phase={2.6}
        speed={0.66}
        color="#f8fafc"
        introDelay={3.15}
        reduceMotion={reduceMotion}
      />
    </group>
  );
}

function HighlightLine({
  geometry,
  opacity,
  revealDelay = 1.65,
  reduceMotion = false,
}: {
  geometry: THREE.BufferGeometry;
  opacity: number;
  revealDelay?: number;
  reduceMotion?: boolean;
}) {
  const line = useMemo(
    () =>
      new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color: "#ffffff",
          transparent: true,
          opacity: reduceMotion ? opacity : 0,
          depthWrite: false,
        }),
      ),
    [geometry, opacity, reduceMotion],
  );

  useFrame(({ clock }) => {
    const material = line.material as THREE.LineBasicMaterial;
    material.opacity = reduceMotion ? opacity : opacity * smoothStep((clock.elapsedTime - revealDelay) / 0.9);
  });

  return <primitive object={line} />;
}

function MaskHighlights({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const silhouette = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 1.72, 0.22),
      new THREE.Vector3(0.8, 1.43, 0.18),
      new THREE.Vector3(1.12, 0.42, 0.13),
      new THREE.Vector3(0.87, -1.1, 0.13),
      new THREE.Vector3(0.26, -1.58, 0.16),
      new THREE.Vector3(0, -1.74, 0.18),
      new THREE.Vector3(-0.26, -1.58, 0.16),
      new THREE.Vector3(-0.87, -1.1, 0.13),
      new THREE.Vector3(-1.12, 0.42, 0.13),
      new THREE.Vector3(-0.8, 1.43, 0.18),
      new THREE.Vector3(0, 1.72, 0.22),
    ];

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const ridge = useMemo(
    () =>
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 1.62, 0.31),
        new THREE.Vector3(0.03, 0.62, 0.39),
        new THREE.Vector3(0.02, -0.34, 0.34),
        new THREE.Vector3(0, -1.58, 0.22),
      ]),
    [],
  );

  const cheekGlints = useMemo(
    () => [
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.72, 0.35, 0.27),
        new THREE.Vector3(-0.36, -0.58, 0.29),
        new THREE.Vector3(-0.13, -1.42, 0.23),
      ]),
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0.72, 0.35, 0.27),
        new THREE.Vector3(0.36, -0.58, 0.29),
        new THREE.Vector3(0.13, -1.42, 0.23),
      ]),
    ],
    [],
  );

  return (
    <group>
      <HighlightLine geometry={silhouette} opacity={0.32} revealDelay={1.75} reduceMotion={reduceMotion} />
      <HighlightLine geometry={ridge} opacity={0.22} revealDelay={1.35} reduceMotion={reduceMotion} />
      {cheekGlints.map((geometry, index) => (
        <HighlightLine
          key={index}
          geometry={geometry}
          opacity={index === 0 ? 0.24 : 0.17}
          revealDelay={1.55 + index * 0.16}
          reduceMotion={reduceMotion}
        />
      ))}
    </group>
  );
}

function FacetedMask({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const maskGroup = useRef<THREE.Group>(null);
  const backplateMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const panelMaterials = useRef<Array<THREE.MeshStandardMaterial | null>>([]);
  const panelRevealDelays = useMemo(() => [0.64, 0.64, 0.76, 0.76, 0, 0, 0.22, 0.22, 0.1, 0.1, 0.42, 0.42], []);
  const planes = useMemo<PlaneSpec[]>(
    () => [
      {
        vertices: [
          [0, 1.72, 0.28],
          [-0.8, 1.43, 0.13],
          [-0.54, 0.62, 0.25],
          [0, 0.84, 0.38],
        ],
        color: "#1a1a1d",
        opacity: 0.86,
        metalness: 0.7,
        roughness: 0.24,
      },
      {
        vertices: [
          [0, 1.72, 0.28],
          [0, 0.84, 0.38],
          [0.54, 0.62, 0.23],
          [0.8, 1.43, 0.12],
        ],
        color: "#070708",
        opacity: 0.91,
        metalness: 0.72,
        roughness: 0.2,
      },
      {
        vertices: [
          [-0.8, 1.43, 0.13],
          [-1.12, 0.42, 0.06],
          [-0.62, 0.1, 0.22],
          [-0.54, 0.62, 0.25],
        ],
        color: "#0a0a0c",
        opacity: 0.84,
        metalness: 0.68,
        roughness: 0.28,
      },
      {
        vertices: [
          [0.8, 1.43, 0.12],
          [0.54, 0.62, 0.23],
          [0.62, 0.1, 0.2],
          [1.12, 0.42, 0.05],
        ],
        color: "#141417",
        opacity: 0.8,
        metalness: 0.66,
        roughness: 0.3,
      },
      {
        vertices: [
          [-0.54, 0.62, 0.25],
          [-0.62, 0.1, 0.22],
          [-0.14, -0.18, 0.42],
          [0, 0.84, 0.38],
        ],
        color: "#27272a",
        opacity: 0.72,
        metalness: 0.74,
        roughness: 0.22,
      },
      {
        vertices: [
          [0, 0.84, 0.38],
          [0.14, -0.18, 0.4],
          [0.62, 0.1, 0.2],
          [0.54, 0.62, 0.23],
        ],
        color: "#050506",
        opacity: 0.9,
        metalness: 0.76,
        roughness: 0.18,
      },
      {
        vertices: [
          [-1.12, 0.42, 0.06],
          [-0.87, -1.1, 0.08],
          [-0.34, -0.58, 0.28],
          [-0.62, 0.1, 0.22],
        ],
        color: "#101013",
        opacity: 0.82,
        metalness: 0.7,
        roughness: 0.26,
      },
      {
        vertices: [
          [1.12, 0.42, 0.05],
          [0.62, 0.1, 0.2],
          [0.34, -0.58, 0.25],
          [0.87, -1.1, 0.07],
        ],
        color: "#0b0b0d",
        opacity: 0.88,
        metalness: 0.72,
        roughness: 0.24,
      },
      {
        vertices: [
          [-0.62, 0.1, 0.22],
          [-0.34, -0.58, 0.28],
          [0, -1.5, 0.26],
          [-0.14, -0.18, 0.42],
        ],
        color: "#09090a",
        opacity: 0.92,
        metalness: 0.78,
        roughness: 0.19,
      },
      {
        vertices: [
          [0.62, 0.1, 0.2],
          [0.14, -0.18, 0.4],
          [0, -1.5, 0.26],
          [0.34, -0.58, 0.25],
        ],
        color: "#18181b",
        opacity: 0.74,
        metalness: 0.7,
        roughness: 0.25,
      },
      {
        vertices: [
          [-0.87, -1.1, 0.08],
          [-0.26, -1.58, 0.14],
          [0, -1.74, 0.18],
          [0, -1.5, 0.26],
          [-0.34, -0.58, 0.28],
        ],
        color: "#121215",
        opacity: 0.8,
        metalness: 0.66,
        roughness: 0.32,
      },
      {
        vertices: [
          [0.87, -1.1, 0.07],
          [0.34, -0.58, 0.25],
          [0, -1.5, 0.26],
          [0, -1.74, 0.18],
          [0.26, -1.58, 0.14],
        ],
        color: "#050505",
        opacity: 0.9,
        metalness: 0.72,
        roughness: 0.22,
      },
    ],
    [],
  );

  const geometries = useMemo(
    () => planes.map((plane) => ({ ...plane, geometry: createPlaneGeometry(plane.vertices) })),
    [planes],
  );

  const backplate = useMemo(() => {
    const shape = new THREE.Shape([
      new THREE.Vector2(0, 1.72),
      new THREE.Vector2(0.8, 1.43),
      new THREE.Vector2(1.12, 0.42),
      new THREE.Vector2(0.87, -1.1),
      new THREE.Vector2(0.26, -1.58),
      new THREE.Vector2(0, -1.74),
      new THREE.Vector2(-0.26, -1.58),
      new THREE.Vector2(-0.87, -1.1),
      new THREE.Vector2(-1.12, 0.42),
      new THREE.Vector2(-0.8, 1.43),
    ]);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelSize: 0.035,
      bevelThickness: 0.028,
    });
  }, []);

  useFrame(({ clock }) => {
    const formationProgress = reduceMotion ? 1 : smoothStep((clock.elapsedTime - 0.9) / 1.7);
    const surge = reduceMotion ? 0 : Math.sin(clamp01((clock.elapsedTime - 2.65) / 0.95) * Math.PI);

    if (maskGroup.current) {
      const revealScale = 0.82 + formationProgress * 0.18 + surge * 0.018;
      maskGroup.current.scale.set(0.9 * revealScale, 0.88 * revealScale, 0.9 * revealScale);
      maskGroup.current.position.z = -0.08 + formationProgress * 0.08;
    }

    if (backplateMaterial.current) {
      backplateMaterial.current.opacity = reduceMotion
        ? MASK_SURFACE_OPACITY
        : MASK_SURFACE_OPACITY * smoothStep((clock.elapsedTime - 1.0) / 1.45);
    }

    panelMaterials.current.forEach((material, index) => {
      if (!material) return;
      const panelProgress = reduceMotion ? 1 : smoothStep((clock.elapsedTime - 1.05 - panelRevealDelays[index]) / 1.15);
      material.opacity = MASK_SURFACE_OPACITY * panelProgress;
      material.emissiveIntensity =
        (index === 4 ? 0.045 : 0.012) +
        surge * (index === 4 || index === 5 ? 0.08 : 0.025);
    });
  });

  return (
    <group ref={maskGroup} scale={[0.9, 0.88, 0.9]} position={[0, 0.16, 0.06]}>
      <mesh geometry={backplate} position={[0, 0, -0.09]}>
        <meshStandardMaterial
          ref={backplateMaterial}
          color="#030304"
          metalness={0.64}
          roughness={0.38}
          flatShading
          transparent
          opacity={reduceMotion ? MASK_SURFACE_OPACITY : 0}
          depthWrite
        />
      </mesh>
      {geometries.map((plane, index) => (
        <mesh key={index} geometry={plane.geometry}>
          <meshStandardMaterial
            ref={(material) => {
              panelMaterials.current[index] = material;
            }}
            color={plane.color}
            metalness={plane.metalness}
            roughness={plane.roughness}
            emissive="#ffffff"
            emissiveIntensity={index === 4 ? 0.045 : 0.012}
            flatShading
            transparent
            opacity={reduceMotion ? MASK_SURFACE_OPACITY : 0}
            depthWrite
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      <MaskHighlights reduceMotion={reduceMotion} />
    </group>
  );
}

function ConsciousnessScene({ entering = false, reduceMotion = false, activated = false }: DigitalCore3DProps) {
  const scene = useRef<THREE.Group>(null);
  const mask = useRef<THREE.Group>(null);

  useFrame(({ pointer, clock }, delta) => {
    if (!scene.current || !mask.current) return;

    const introProgress = reduceMotion ? 1 : easeOutCubic(clock.elapsedTime / INTRO_DURATION);
    scene.current.scale.setScalar((entering ? 1.08 : 1) * (0.92 + introProgress * 0.08));

    const targetY = reduceMotion ? 0 : pointer.x * 0.09;
    const targetX = reduceMotion ? 0 : -pointer.y * 0.055;
    scene.current.rotation.y = THREE.MathUtils.damp(scene.current.rotation.y, targetY, 2.2, delta);
    scene.current.rotation.x = THREE.MathUtils.damp(scene.current.rotation.x, targetX, 2.2, delta);

    if (!reduceMotion) {
      mask.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.035;
      mask.current.rotation.z = Math.sin(clock.elapsedTime * 0.27) * 0.012;
    }
  });

  return (
    <group ref={scene} scale={(entering ? 1.08 : 1) * (reduceMotion ? 1 : 0.92)}>
      <ConsciousnessField entering={entering} reduceMotion={reduceMotion} activated={activated} />
      <OrbitRings reduceMotion={reduceMotion} />
      <group ref={mask}>
        <FacetedMask reduceMotion={reduceMotion} />
      </group>
    </group>
  );
}

export default function DigitalCore3D({ entering = false, reduceMotion = false }: DigitalCore3DProps) {
  const [activated, setActivated] = useState(false);
  const activationLocked = useRef(false);
  const activationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (activationTimeout.current) {
        clearTimeout(activationTimeout.current);
      }
    };
  }, []);

  function activateCore() {
    if (activationLocked.current) return;

    activationLocked.current = true;
    setActivated(true);
    activationTimeout.current = setTimeout(() => {
      setActivated(false);
      activationLocked.current = false;
      activationTimeout.current = null;
    }, 780);
  }

  return (
    <div className="pointer-events-none absolute -inset-[34%] sm:-inset-[38%]">
      <Canvas
        aria-hidden="true"
        className="pointer-events-none"
        camera={{ position: [0, 0, 7.25], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop={reduceMotion ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2.4, 2.8, 4.2]} intensity={1.55} color="#ffffff" />
        <directionalLight position={[2.1, -1.2, 3.2]} intensity={0.5} color="#d4d4d8" />
        <pointLight position={[0.2, 0.4, 2.2]} intensity={1.1} color="#ffffff" distance={4.2} />
        <ConsciousnessScene entering={entering} reduceMotion={reduceMotion} activated={activated} />
        <Preload all />
      </Canvas>
      <button
        type="button"
        aria-label="Activate digital consciousness core"
        className="pointer-events-auto absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation rounded-full border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/35"
        onClick={(event) => {
          event.stopPropagation();
          activateCore();
        }}
        onPointerDown={(event) => {
          event.stopPropagation();
          activateCore();
        }}
      />
    </div>
  );
}
