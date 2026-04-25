import { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Box, Cylinder } from '@react-three/drei';
import { assets } from '../utils/data';

function ConstructionScene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* Main tower */}
        <Box args={[1.5, 4, 1.5]} position={[0, 2, 0]}>
          <meshStandardMaterial color="#2D3748" metalness={0.3} roughness={0.7} />
        </Box>
        {/* Windows */}
        {[0, 1, 2, 3].map(row =>
          [-0.4, 0.4].map(col => (
            <Box key={`${row}-${col}`} args={[0.25, 0.35, 0.05]} position={[col, row * 0.8 + 0.5, 0.78]}>
              <meshStandardMaterial color="#4FC3F7" emissive="#4FC3F7" emissiveIntensity={0.3} />
            </Box>
          ))
        )}
        {/* Crane arm vertical */}
        <Box args={[0.08, 2.5, 0.08]} position={[0, 5, 0]}>
          <meshStandardMaterial color="#FF6B35" metalness={0.8} roughness={0.2} />
        </Box>
        {/* Crane arm horizontal */}
        <Box args={[3, 0.08, 0.08]} position={[0.5, 6.2, 0]}>
          <meshStandardMaterial color="#FF6B35" metalness={0.8} roughness={0.2} />
        </Box>
        {/* Hook */}
        <Cylinder args={[0.05, 0.05, 0.5]} position={[1.5, 5.7, 0]}>
          <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.1} />
        </Cylinder>
        {/* Ground */}
        <Box args={[5, 0.1, 5]} position={[0, -0.05, 0]}>
          <meshStandardMaterial color="#4A5568" roughness={0.9} />
        </Box>
        {/* Small buildings */}
        <Box args={[0.8, 1.5, 0.8]} position={[-2, 0.75, -1]}>
          <meshStandardMaterial color="#3D4A5C" metalness={0.2} roughness={0.8} />
        </Box>
        <Box args={[0.6, 1, 0.6]} position={[2, 0.5, -1]}>
          <meshStandardMaterial color="#3D4A5C" metalness={0.2} roughness={0.8} />
        </Box>
      </Float>
    </group>
  );
}

export default function Assets3D() {
  return (
    <section id="assets" className="section-padding bg-white dark:bg-steel-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">3D Showcase</span>
          <h2 className="text-4xl md:text-5xl font-black text-steel-800 dark:text-white font-heading mt-2">
            Our <span className="text-gradient">Assets & Equipment</span>
          </h2>
          <p className="text-steel-600 dark:text-concrete/60 mt-4 max-w-2xl mx-auto">
            Equipped with modern machinery and a fleet of heavy equipment for any scale of construction.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-steel-800 to-steel-900 border border-steel-700/50"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <Suspense fallback={null}>
                <ConstructionScene />
                <Environment preset="city" />
              </Suspense>
              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={4}
                maxDistance={12}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
              <span className="text-concrete/40 text-xs bg-steel-900/50 px-3 py-1 rounded-full">
                🖱️ Drag to rotate · Scroll to zoom
              </span>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {assets.map((asset, i) => (
              <motion.div
                key={asset.name}
                className="bg-steel-50 dark:bg-steel-800 rounded-xl overflow-hidden border border-steel-200 dark:border-steel-700/50 hover:border-orange-500/50 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="relative h-32 overflow-hidden">
                  <motion.img
                    src={asset.image}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-steel-900/60 to-transparent"></div>
                </div>
                <div className="p-4">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform inline-block">
                    {asset.icon}
                  </div>
                  <h3 className="font-bold text-steel-800 dark:text-white text-sm">{asset.name}</h3>
                  <p className="text-concrete/50 text-xs mt-0.5">{asset.type}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-orange-500 font-bold text-lg">{asset.count} Units</span>
                    <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">
                      {asset.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
