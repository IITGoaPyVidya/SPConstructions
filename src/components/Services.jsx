import { useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '../utils/data';

export default function Services() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" className="section-padding bg-white dark:bg-steel-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-black text-steel-800 dark:text-white font-heading mt-2">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-steel-600 dark:text-concrete/60 mt-4 max-w-2xl mx-auto">
            Comprehensive construction solutions from concept to completion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="relative p-6 rounded-2xl border border-steel-200 dark:border-steel-700/50 bg-steel-50 dark:bg-steel-800 overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-2xl"
                animate={{ opacity: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="text-5xl mb-4 inline-block"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {service.icon}
              </motion.div>

              <h3 className="text-xl font-bold text-steel-800 dark:text-white font-heading mb-2 group-hover:text-orange-500 transition-colors">
                {service.title}
              </h3>

              <p className="text-steel-600 dark:text-concrete/60 text-sm mb-4 leading-relaxed">
                {service.desc}
              </p>

              <ul className="space-y-1.5 mb-4">
                {service.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-steel-600 dark:text-concrete/70">
                    <span className="text-orange-500 text-xs">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <motion.div
                className="border-t border-steel-200 dark:border-steel-700/50 pt-4 mt-auto"
                animate={{ opacity: hovered === i ? 1 : 0.5 }}
              >
                <span className="text-orange-500 font-bold text-sm">{service.price}</span>
              </motion.div>

              <motion.button
                className="mt-3 w-full bg-orange-500 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors hover:bg-orange-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: hovered === i ? 1 : 0, y: hovered === i ? 0 : 10 }}
              >
                Get Quote →
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
