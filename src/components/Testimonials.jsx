import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../utils/data';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding bg-steel-800 dark:bg-steel-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/5 blur-3xl rounded-full" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Client Reviews</span>
          <h2 className="text-4xl md:text-5xl font-black text-white font-heading mt-2">
            What Clients <span className="text-gradient">Say</span>
          </h2>
        </motion.div>

        <div className="relative h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="absolute inset-0 bg-steel-700/50 dark:bg-steel-800/50 rounded-2xl p-8 border border-steel-600/30"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-orange-500/20 text-8xl font-serif absolute top-2 left-6">"</div>
              
              <p className="text-concrete/80 text-base md:text-lg italic mb-6 relative z-10 line-clamp-3">
                {testimonials[current].text}
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonials[current].avatar}
                  alt={testimonials[current].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/30"
                />
                <div>
                  <div className="text-white font-bold">{testimonials[current].name}</div>
                  <div className="text-orange-400 text-sm">{testimonials[current].role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${i === current ? 'bg-orange-500 w-6' : 'bg-steel-600 w-2'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
