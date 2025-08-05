import React, { Suspense, useRef, useMemo } from 'react';
import { Html } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

// Reducir la cantidad de partículas para móviles
const Particles3D = () => {
  const meshRef = useRef();
  const count = 500; // Reducido de 1500 a 500
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15; // Reducido el rango
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      colors[i * 3] = Math.random() * 0.5 + 0.3;
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
      colors[i * 3 + 2] = Math.random() * 0.3 + 0.7;
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.005; // Reducida la velocidad
    }
  });
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.005} // Tamaño reducido
        vertexColors
        transparent
        opacity={0.4} // Opacidad reducida
        sizeAttenuation={true}
      />
    </points>
  );
};

// Reducir la cantidad de esferas
const EnergyOrbs = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02; // Velocidad reducida
    }
  });
  
  return (
    <group ref={groupRef}>
      {[...Array(4)].map((_, i) => { // Reducido de 8 a 4
        const angle = (i / 4) * Math.PI * 2;
        const radius = 2 + Math.sin(i * 0.5) * 0.3; // Radio reducido
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, Math.sin(i * 0.3) * 1, Math.sin(angle) * radius]}
          >
            <sphereGeometry args={[0.02, 8, 8]} /> {/* Resolución reducida */}
            <meshStandardMaterial
              color={`hsl(${220 + i * 40}, 70%, 60%)`}
              transparent
              opacity={0.5}
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Optimizar el modelo
const Model = () => {
  const gltf = useGLTF('/model.glb');
  const modelRef = useRef();
  
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.03; // Movimiento más suave
      modelRef.current.rotation.y += 0.002; // Rotación más lenta
    }
  });
  
  React.useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false; // Desactivar sombras para móviles
          child.receiveShadow = false;
          if (child.material) {
            child.material.metalness = 0.5; // Valores más ligeros
            child.material.roughness = 0.4;
          }
        }
      });
    }
  }, [gltf]);

  return (
    <primitive ref={modelRef} object={gltf.scene} scale={1.5} /> // Escala reducida
  );
};

const ModelViewer = () => {
  return (
    <Canvas
      shadows={false} // Desactivar sombras para mejorar rendimiento
      camera={{ position: [0, 0, 2.5], fov: 60 }} // Cámara más cerca y FOV más amplio
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }} // Optimizar para móviles
    >
      <Suspense fallback={
        <Html center>
          <div className="text-white text-lg font-light tracking-wide">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Cargando...</span>
            </div>
          </div>
        </Html>
      }>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 3]} intensity={1.5} /> {/* Luz simplificada */}
        
        <Model />
        <Particles3D />
        <EnergyOrbs />
        
        <OrbitControls
          enableRotate={false}
          enableZoom={false}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.03}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          autoRotate={false}
          mouseButtons={undefined}
          touches={undefined}
        />
        
        <Environment preset="night" background={false} intensity={0.2} />
        
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} visible={false}>
          <planeGeometry args={[20, 20]} /> {/* Tamaño reducido */}
          <shadowMaterial transparent opacity={0.1} />
        </mesh>
      </Suspense>
    </Canvas>
  );
};

export default ModelViewer;