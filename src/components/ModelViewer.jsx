import React, { Suspense, useRef, useMemo } from 'react';
import { Html } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Stars } from '@react-three/drei';

// Componente de partículas 3D animadas (reducido para mejor rendimiento)
const Particles3D = () => {
  const meshRef = useRef();
  const count = 1500;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      // Colores en tonos azules y morados
      colors[i * 3] = Math.random() * 0.5 + 0.3; // R
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5; // G
      colors[i * 3 + 2] = Math.random() * 0.3 + 0.7; // B
    }
    
    return { positions, colors };
  }, [count]); // Añadir count a las dependencias de useMemo
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.02;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={2} // THREE.AdditiveBlending
      />
    </points>
  );
};

// Esferas flotantes de energía (reducido)
const EnergyOrbs = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });
  
  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3 + Math.sin(i * 0.5) * 0.5;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(i * 0.3) * 1.5,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial
              color={`hsl(${220 + i * 20}, 80%, 70%)`}
              transparent
              opacity={0.7}
              emissive={`hsl(${220 + i * 20}, 60%, 30%)`}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Tu modelo principal con rotación automática y sin interacción del usuario
const Model = () => {
  const gltf = useGLTF('/model.glb'); // Mantén tu ruta original
  const modelRef = useRef();
  
  useFrame((state) => {
    if (modelRef.current) {
      // Suave flotación del modelo
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      // Rotación leve y continua en el eje Y
      modelRef.current.rotation.y += 0.005; // Ajusta este valor para una rotación más rápida o lenta
    }
  });
  
  // Aplicar mejores materiales al modelo si es necesario
  React.useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // Mejorar propiedades del material para mejor iluminación
          if (child.material) {
            child.material.metalness = Math.min(child.material.metalness || 0, 0.8);
            child.material.roughness = Math.max(child.material.roughness || 0.5, 0.2);
          }
        }
      });
    }
  }, [gltf]);
  
  return (
    <primitive 
      ref={modelRef}
      object={gltf.scene} 
      scale={2}
      castShadow
      receiveShadow
    />
  );
};

const ModelViewer = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 3], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      }}
    >
      <Suspense fallback={
        <Html center>
          <div className="text-white text-lg sm:text-xl font-light tracking-wide">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Cargando celebración...</span>
            </div>
          </div>
        </Html>
      }>
        {/* Sistema de iluminación optimizado para mejor visibilidad del modelo */}
        
        {/* Luz ambiente más intensa */}
        <ambientLight intensity={0.6} color="#ffffff" />
        
        {/* Luz direccional principal - más intensa */}
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={2.5} 
          castShadow 
          color="#ffffff"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Luz de relleno desde el frente */}
        <directionalLight 
          position={[0, 2, 8]} 
          intensity={1.8} 
          color="#f0f8ff"
        />
        
        {/* Luces puntuales de colores para ambiente */}
        <pointLight position={[-8, 4, -5]} intensity={0.8} color="#3b82f6" distance={20} />
        <pointLight position={[8, -4, 5]} intensity={0.6} color="#8b5cf6" distance={20} />
        <pointLight position={[0, -8, 0]} intensity={0.4} color="#ec4899" distance={15} />
        
        {/* Luz spot desde arriba para destacar el modelo */}
        <spotLight
          position={[0, 12, 0]}
          angle={0.4}
          penumbra={0.8}
          intensity={1.2}
          color="#ffffff"
          castShadow
          target-position={[0, 0, 0]}
        />
        
        {/* Luz de contorno desde atrás */}
        <directionalLight 
          position={[-5, 2, -8]} 
          intensity={1.0} 
          color="#a855f7"
        />
        
        {/* Campo de estrellas de fondo (reducido) */}
        <Stars
          radius={80}
          depth={40}
          count={3000}
          factor={3}
          saturation={0}
          fade
          speed={0.3}
        />
        
        {/* Elementos 3D de fondo */}
        <Particles3D />
        <EnergyOrbs />
        
        {/* Tu modelo principal */}
        <Model />
        
        {/* Controles de cámara: Deshabilitados para interacción del usuario */}
        <OrbitControls
          enableRotate={false} // Deshabilita la rotación con el ratón/tacto
          enableZoom={false}   // Deshabilita el zoom con la rueda del ratón/pellizco
          enablePan={false}    // Deshabilita el paneo (movimiento lateral)
          enableDamping={true}
          dampingFactor={0.03}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
          autoRotate={false} // Mantén esto en false, la rotación la maneja el modelo directamente
          maxDistance={6}
          minDistance={1.5}
          target={[0, 0, 0]}
          // Eliminar o establecer a undefined los mouseButtons y touches para asegurar que no haya interacción
          mouseButtons={undefined} 
          touches={undefined}
        />
        
        {/* Ambiente y post-procesado */}
        <Environment 
          preset="night" 
          background={false}
          intensity={0.4}
        />
        
        {/* Plano invisible para recibir sombras */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -2, 0]} 
          receiveShadow
          visible={false}
        >
          <planeGeometry args={[50, 50]} />
          <shadowMaterial transparent opacity={0.3} />
        </mesh>
      </Suspense>
    </Canvas>
  );
};

export default ModelViewer;
