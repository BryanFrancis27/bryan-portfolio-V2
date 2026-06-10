"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type DigitalCore3DProps = {
  entering?: boolean;
  reduceMotion?: boolean;
  activated?: boolean;
};

function createPanelGeometry(points: Array<[number, number]>) {
  const shape = new THREE.Shape(points.map(([x, y]) => new THREE.Vector2(x, y)));
  const geometry = new THREE.ShapeGeometry(shape);
  geometry.computeVertexNormals();
  return geometry;
}

function EnergyField({ reduceMotion, entering, activated = false }: DigitalCore3DProps) {
  const glow = useRef<THREE.Mesh>(null);
  const energyBurst = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const coreLight = useRef<THREE.PointLight>(null);
  const activationLevel = useRef(0);

  useFrame(({ clock }, delta) => {
    const activationTarget = activated ? 1 : 0;
    activationLevel.current = reduceMotion
      ? activationTarget * 0.42
      : THREE.MathUtils.damp(activationLevel.current, activationTarget, activated ? 9 : 3.6, delta);
    const activation = activationLevel.current;
    const activationPulse = activation * 0.95;

    const pulse = 1 + Math.sin(clock.elapsedTime * 0.95) * 0.04;
    if (glow.current) {
      glow.current.scale.setScalar(reduceMotion ? 1 + activation * 0.12 : pulse + activationPulse * 0.22);
      const material = glow.current.material as THREE.MeshBasicMaterial;
      material.opacity = reduceMotion
        ? 0.05 + activation * 0.08
        : 0.055 + Math.sin(clock.elapsedTime * 0.95) * 0.018 + activationPulse * 0.16;
    }

    if (energyBurst.current) {
      energyBurst.current.scale.setScalar((entering ? 1.18 : 1) * (0.82 + activationPulse * 0.52));
      const material = energyBurst.current.material as THREE.MeshBasicMaterial;
      material.opacity = reduceMotion ? activation * 0.08 : activationPulse * 0.18;
    }

    if (core.current) {
      core.current.scale.setScalar(
        reduceMotion ? 0.58 + activation * 0.05 : 0.58 + Math.sin(clock.elapsedTime * 1.12) * 0.025 + activationPulse * 0.075,
      );
      const material = core.current.material as THREE.MeshBasicMaterial;
      material.opacity = reduceMotion ? 0.055 + activation * 0.05 : 0.09 + activationPulse * 0.09;
    }

    if (coreLight.current) {
      coreLight.current.intensity = reduceMotion ? 0.35 + activation * 0.55 : 0.42 + activationPulse * 1.1;
    }
  });

  return (
    <group position={[0, 0.02, -0.78]}>
      <pointLight ref={coreLight} position={[0, 0, 0.46]} intensity={0.38} color="#fafafa" distance={2.8} decay={2} />
      <mesh ref={glow} scale={entering ? 1.25 : 1}>
        <sphereGeometry args={[0.94, 28, 14]} />
        <meshBasicMaterial color="#f4f4f5" transparent opacity={reduceMotion ? 0.05 : 0.065} depthWrite={false} />
      </mesh>
      <mesh ref={energyBurst}>
        <sphereGeometry args={[1.08, 28, 14]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={core}>
        <sphereGeometry args={[0.58, 20, 10]} />
        <meshBasicMaterial color="#a1a1aa" wireframe transparent opacity={reduceMotion ? 0.055 : 0.09} depthWrite={false} />
      </mesh>
    </group>
  );
}

function PulseRing({
  ringRef,
  radius,
  tube,
  segments,
  rotation,
  color,
  opacity,
  direction,
  activated = false,
  reduceMotion = false,
}: {
  ringRef: RefObject<THREE.Mesh | null>;
  radius: number;
  tube: number;
  segments: number;
  rotation: [number, number, number];
  color: string;
  opacity: number;
  direction: 1 | -1;
  activated?: boolean;
  reduceMotion?: boolean;
}) {
  const activationLevel = useRef(0);

  useFrame(({ clock }, delta) => {
    if (!ringRef.current) return;

    const activationTarget = activated ? 1 : 0;
    activationLevel.current = reduceMotion
      ? activationTarget * 0.45
      : THREE.MathUtils.damp(activationLevel.current, activationTarget, activated ? 10 : 3.5, delta);
    const activation = activationLevel.current;
    const material = ringRef.current.material as THREE.MeshBasicMaterial;

    if (!reduceMotion) {
      ringRef.current.rotation.z += delta * direction * 0.052;
    }

    const wave = reduceMotion ? 0.5 : (Math.sin(clock.elapsedTime * 1.15 + radius) + 1) / 2;
    ringRef.current.scale.setScalar(1 + wave * 0.055 + activation * 0.085);
    material.opacity = opacity + wave * 0.02 + activation * 0.075;
  });

  return (
    <mesh ref={ringRef} rotation={rotation}>
      <torusGeometry args={[radius, tube, 8, segments]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function OrbitRings({ reduceMotion, activated = false }: { reduceMotion?: boolean; activated?: boolean }) {
  const ringOne = useRef<THREE.Mesh>(null);
  const ringTwo = useRef<THREE.Mesh>(null);
  const ringThree = useRef<THREE.Mesh>(null);

  return (
    <group position={[0, 0, -0.92]} scale={0.96}>
      <PulseRing
        ringRef={ringOne}
        radius={1.78}
        tube={0.0045}
        segments={128}
        rotation={[0.72, 0.18, 0.15]}
        color="#fafafa"
        opacity={0.08}
        direction={1}
        activated={activated}
        reduceMotion={reduceMotion}
      />
      <PulseRing
        ringRef={ringTwo}
        radius={1.54}
        tube={0.0038}
        segments={112}
        rotation={[1.05, -0.42, -0.28]}
        color="#d4d4d8"
        opacity={0.065}
        direction={-1}
        activated={activated}
        reduceMotion={reduceMotion}
      />
      <PulseRing
        ringRef={ringThree}
        radius={2.03}
        tube={0.0035}
        segments={128}
        rotation={[0.28, 0.84, 0.62]}
        color="#ffffff"
        opacity={0.045}
        direction={1}
        activated={activated}
        reduceMotion={reduceMotion}
      />
    </group>
  );
}

function FacetedMask() {
  const maskPanels = useMemo(
    () => [
      {
        points: [[0, 1.72], [-1.03, 1.32], [-0.64, 0.58], [-0.05, 0.86]] as Array<[number, number]>,
        color: "#151518",
        opacity: 0.82,
        z: 0.19,
        rotation: [0.04, -0.11, 0] as [number, number, number],
      },
      {
        points: [[0, 1.72], [1.03, 1.32], [0.64, 0.58], [0.05, 0.86]] as Array<[number, number]>,
        color: "#08080a",
        opacity: 0.88,
        z: 0.21,
        rotation: [0.04, 0.11, 0] as [number, number, number],
      },
      {
        points: [[-1.03, 1.32], [-1.34, 0.32], [-0.7, 0.02], [-0.64, 0.58]] as Array<[number, number]>,
        color: "#09090b",
        opacity: 0.78,
        z: 0.14,
        rotation: [-0.03, -0.16, 0] as [number, number, number],
      },
      {
        points: [[1.03, 1.32], [1.34, 0.32], [0.7, 0.02], [0.64, 0.58]] as Array<[number, number]>,
        color: "#18181b",
        opacity: 0.74,
        z: 0.16,
        rotation: [-0.03, 0.16, 0] as [number, number, number],
      },
      {
        points: [[-0.64, 0.58], [-0.7, 0.02], [-0.14, -0.08], [-0.05, 0.86]] as Array<[number, number]>,
        color: "#1d1d20",
        opacity: 0.66,
        z: 0.24,
        rotation: [0.02, -0.06, 0] as [number, number, number],
      },
      {
        points: [[0.64, 0.58], [0.7, 0.02], [0.14, -0.08], [0.05, 0.86]] as Array<[number, number]>,
        color: "#050506",
        opacity: 0.82,
        z: 0.26,
        rotation: [0.02, 0.06, 0] as [number, number, number],
      },
      {
        points: [[-1.34, 0.32], [-1.02, -1.18], [-0.36, -0.58], [-0.7, 0.02]] as Array<[number, number]>,
        color: "#0d0d0f",
        opacity: 0.76,
        z: 0.1,
        rotation: [0.02, -0.18, 0] as [number, number, number],
      },
      {
        points: [[1.34, 0.32], [1.02, -1.18], [0.36, -0.58], [0.7, 0.02]] as Array<[number, number]>,
        color: "#131316",
        opacity: 0.72,
        z: 0.12,
        rotation: [0.02, 0.18, 0] as [number, number, number],
      },
      {
        points: [[-0.7, 0.02], [-0.36, -0.58], [0, -1.46], [-0.14, -0.08]] as Array<[number, number]>,
        color: "#060607",
        opacity: 0.86,
        z: 0.23,
        rotation: [-0.04, -0.08, 0] as [number, number, number],
      },
      {
        points: [[0.7, 0.02], [0.36, -0.58], [0, -1.46], [0.14, -0.08]] as Array<[number, number]>,
        color: "#1a1a1d",
        opacity: 0.64,
        z: 0.2,
        rotation: [-0.04, 0.08, 0] as [number, number, number],
      },
      {
        points: [[-0.36, -0.58], [-1.02, -1.18], [-0.28, -1.6], [0, -1.46]] as Array<[number, number]>,
        color: "#111114",
        opacity: 0.74,
        z: 0.13,
        rotation: [-0.02, -0.14, 0] as [number, number, number],
      },
      {
        points: [[0.36, -0.58], [1.02, -1.18], [0.28, -1.6], [0, -1.46]] as Array<[number, number]>,
        color: "#070708",
        opacity: 0.8,
        z: 0.15,
        rotation: [-0.02, 0.14, 0] as [number, number, number],
      },
    ],
    [],
  );

  const maskGeometry = useMemo(() => {
    const shape = new THREE.Shape([
      new THREE.Vector2(0, 1.76),
      new THREE.Vector2(0.98, 1.36),
      new THREE.Vector2(1.28, 0.34),
      new THREE.Vector2(1.0, -1.23),
      new THREE.Vector2(0.3, -1.6),
      new THREE.Vector2(0, -1.72),
      new THREE.Vector2(-0.3, -1.6),
      new THREE.Vector2(-1.0, -1.23),
      new THREE.Vector2(-1.28, 0.34),
      new THREE.Vector2(-0.98, 1.36),
    ]);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelSize: 0.035,
      bevelThickness: 0.025,
    });
  }, []);

  const panelGeometries = useMemo(
    () =>
      maskPanels.map((panel) => {
        const geometry = createPanelGeometry(panel.points);
        return {
          ...panel,
          geometry,
          edgeGeometry: new THREE.EdgesGeometry(geometry, 1),
        };
      }),
    [maskPanels],
  );

  return (
    <group rotation={[0, 0, 0]} position={[0, -0.02, 0]} scale={[1.08, 1, 1]}>
      <mesh geometry={maskGeometry}>
        <meshStandardMaterial
          color="#050506"
          metalness={0.54}
          roughness={0.62}
          flatShading
          transparent
          opacity={0.76}
          depthWrite
        />
      </mesh>
      {panelGeometries.map((panel, index) => (
        <group key={index} position={[0, 0, panel.z]} rotation={panel.rotation}>
          <mesh geometry={panel.geometry}>
            <meshStandardMaterial
              color={panel.color}
              metalness={0.5}
              roughness={0.48}
              transparent
              opacity={panel.opacity}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <lineSegments geometry={panel.edgeGeometry}>
            <lineBasicMaterial color="#f5f5f5" transparent opacity={index % 3 === 0 ? 0.34 : 0.22} depthWrite={false} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

function ConsciousnessScene({ entering = false, reduceMotion = false, activated = false }: DigitalCore3DProps) {
  const scene = useRef<THREE.Group>(null);
  const activationLevel = useRef(0);

  useFrame(({ pointer }, delta) => {
    if (!scene.current) return;

    activationLevel.current = reduceMotion
      ? (activated ? 0.24 : 0)
      : THREE.MathUtils.damp(activationLevel.current, activated ? 1 : 0, activated ? 8 : 3.3, delta);
    const targetY = reduceMotion ? 0 : pointer.x * 0.1;
    const targetX = reduceMotion ? 0 : -pointer.y * 0.07;
    scene.current.rotation.y = THREE.MathUtils.damp(scene.current.rotation.y, targetY, 2.4, delta);
    scene.current.rotation.x = THREE.MathUtils.damp(scene.current.rotation.x, targetX, 2.4, delta);
    scene.current.scale.setScalar((entering ? 1.08 : 1) * (1 + activationLevel.current * 0.025));

    if (!reduceMotion) {
      scene.current.rotation.z = Math.sin(performance.now() * 0.00022) * 0.018;
    }
  });

  return (
    <group ref={scene} scale={entering ? 1.08 : 1}>
      <EnergyField entering={entering} reduceMotion={reduceMotion} activated={activated} />
      <OrbitRings reduceMotion={reduceMotion} activated={activated} />
      <FacetedMask />
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
    }, 760);
  }

  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        aria-hidden="true"
        className="pointer-events-none"
        camera={{ position: [0, 0, 6], fov: 34 }}
        dpr={[1, 1.5]}
        frameloop={reduceMotion ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.74} />
        <directionalLight position={[-2.2, 2.4, 4]} intensity={1.25} color="#ffffff" />
        <directionalLight position={[2.6, -1.4, 2.8]} intensity={0.52} color="#a1a1aa" />
        <ConsciousnessScene entering={entering} reduceMotion={reduceMotion} activated={activated} />
        <Preload all />
      </Canvas>
      <button
        type="button"
        aria-label="Activate digital consciousness core"
        className="pointer-events-auto absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation rounded-full border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/35"
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
