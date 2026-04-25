import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesReady(true);
    });
  }, []);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    });
  };

  const particlesOptions = {
    particles: {
      number: { value: 30, density: { enable: true } },
      color: { value: ['#FF6B35', '#E2E8F0', '#4A5568'] },
      opacity: { value: { min: 0.1, max: 0.4 } },
      size: { value: { min: 1, max: 4 } },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'top',
        random: true,
        straight: false,
        outModes: { default: 'out' },
      },
    },
    detectRetina: true,
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-steel-900"
      onMouseMove={handleMouseMove}
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&auto=format&fit=crop)`,
          y
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-steel-900/95 via-steel-900/80 to-steel-900/60" />

      {/* Particles */}
      {particlesReady && (
        <Particles
          id="hero-particles"
          className="absolute inset-0"
          options={particlesOptions}
        />
      )}

      {/* Mouse parallax floating elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: mousePos.x * -30,
          y: mousePos.y * -30,
        }}
      >
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-orange-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-orange-400/10 blur-2xl" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16"
        style={{ opacity }}
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-400 text-sm font-medium">15+ Projects Delivered Across India</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white font-heading leading-tight mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Building{' '}
            <span className="text-gradient">
              <TypeAnimation
                sequence={['Dreams', 2000, 'Landmarks', 2000, 'Legacies', 2000, 'Futures', 2000]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
            <br />
            <span className="text-concrete/90">That Last Forever</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-concrete/70 text-lg md:text-xl mb-8 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            15+ years of excellence in residential, commercial, and hospitality construction across India. 
            50+ projects delivered with precision and pride.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[['50+', 'Projects'], ['15+', 'Years'], ['52', 'Experts'], ['98%', 'Satisfaction']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-orange-400 font-heading">{num}</div>
                <div className="text-concrete/50 text-xs">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-xl shadow-orange-500/30 flex items-center gap-2 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="border border-concrete/30 hover:border-orange-500/50 text-concrete hover:text-orange-400 px-8 py-4 rounded-xl font-semibold transition-all backdrop-blur-sm flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Quote
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-concrete/40 text-xs">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-concrete/20 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-orange-500 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Orange accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
    </section>
  );
}
