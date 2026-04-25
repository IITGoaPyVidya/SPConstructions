import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../utils/data';

const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Industrial'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-white dark:bg-steel-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Our Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-black text-steel-800 dark:text-white font-heading mt-2">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-steel-600 dark:text-concrete/60 mt-4 max-w-2xl mx-auto">
            Delivering excellence across residential, commercial, and hospitality sectors with 250+ completed projects.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-steel-100 dark:bg-steel-700/50 text-steel-600 dark:text-concrete/60 hover:bg-orange-50 dark:hover:bg-steel-600/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden bg-steel-100 dark:bg-steel-800 border border-steel-200 dark:border-steel-700/50 shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all cursor-pointer"
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
                whileHover={{ y: -6 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-steel-900 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {project.category}
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {project.value}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-steel-800 dark:text-white font-heading group-hover:text-orange-500 transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-concrete/60 text-xs mb-3">
                    <span>📍 {project.location}</span>
                    <span>·</span>
                    <span>📅 {project.year}</span>
                  </div>
                  
                  <p className="text-steel-600 dark:text-concrete/60 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded-full border border-orange-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {hoveredId === project.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-orange-500/90 to-transparent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <button className="w-full bg-white text-orange-600 py-2 rounded-lg font-semibold text-sm hover:bg-orange-50 transition-colors">
                        View Details →
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All 250+ Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
