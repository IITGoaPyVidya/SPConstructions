import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '../utils/data';

// Custom counter hook
function useCounter(end, duration = 2500, delay = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + duration;

      const updateCount = () => {
        const now = Date.now();
        const remaining = endTime - now;
        
        if (remaining <= 0) {
          setCount(end);
        } else {
          const progress = 1 - remaining / duration;
          const easeOutQuad = progress * (2 - progress);
          setCount(Math.floor(easeOutQuad * end));
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    }, delay);

    return () => clearTimeout(timer);
  }, [started, end, duration, delay]);

  return [count, () => setStarted(true)];
}

// Counter component
function Counter({ end, duration, delay, suffix, inView }) {
  const [count, startCounter] = useCounter(end, duration, delay);
  
  useEffect(() => {
    if (inView) {
      startCounter();
    }
  }, [inView, startCounter]);

  return <>{count}{suffix}</>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-steel-800 dark:bg-steel-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B35' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Our Numbers</span>
          <h2 className="text-4xl md:text-5xl font-black text-white font-heading mt-2">
            Milestones That <span className="text-gradient">Define Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative bg-steel-700/50 dark:bg-steel-800/50 rounded-2xl p-6 text-center border border-steel-600/30 hover:border-orange-500/30 transition-all group overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              
              <motion.div
                className="text-4xl mb-3"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              >
                {stat.icon}
              </motion.div>
              
              <div className="text-4xl md:text-5xl font-black text-white font-heading">
                {inView ? (
                  <Counter
                    end={stat.value}
                    duration={2500}
                    delay={i * 200}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              
              <div className="text-concrete/60 text-sm mt-2 font-medium">{stat.label}</div>
              
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
