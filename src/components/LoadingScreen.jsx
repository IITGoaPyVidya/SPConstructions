import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-steel-900 flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Building animation */}
      <div className="relative mb-8">
        <motion.div
          className="flex items-end gap-1"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {[40, 60, 90, 70, 50, 80, 45].map((h, i) => (
            <motion.div
              key={i}
              className="w-8 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t"
              style={{ height: h }}
              variants={{
                hidden: { scaleY: 0, originY: 1 },
                visible: { scaleY: 1 }
              }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
        {/* Crane */}
        <motion.div
          className="absolute -top-8 right-0 text-3xl"
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          🏗️
        </motion.div>
      </div>

      <motion.h1
        className="text-3xl font-bold text-white font-heading mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        SP <span className="text-orange-500">Construction</span>
      </motion.h1>
      
      <motion.p
        className="text-concrete/60 text-sm mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Building Tomorrow's Landmarks Today
      </motion.p>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-steel-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
