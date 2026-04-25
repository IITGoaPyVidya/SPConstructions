import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { teamMembers } from '../utils/data';

export default function Team() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="team" className="section-padding bg-steel-50 dark:bg-steel-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Our People</span>
          <h2 className="text-4xl md:text-5xl font-black text-steel-800 dark:text-white font-heading mt-2">
            Meet Our <span className="text-gradient">Expert Team</span>
          </h2>
          <p className="text-steel-600 dark:text-concrete/60 mt-4 max-w-2xl mx-auto">
            52+ construction professionals bringing decades of expertise to every project.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              className="relative rounded-2xl overflow-hidden bg-white dark:bg-steel-900 border border-steel-200 dark:border-steel-700/50 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setExpandedId(expandedId === member.id ? null : member.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-900/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-sm font-heading">{member.name}</h3>
                  <p className="text-orange-400 text-xs">{member.role}</p>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === member.id && (
                  <motion.div
                    className="p-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-concrete/50">{member.exp} experience</span>
                      <a
                        href={member.linkedin}
                        className="text-blue-400 hover:text-blue-300 text-xs"
                        onClick={e => e.stopPropagation()}
                      >
                        LinkedIn →
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map(skill => (
                        <span
                          key={skill}
                          className="text-xs bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2 py-0.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute top-3 right-3">
                <motion.div
                  className="w-6 h-6 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xs"
                  animate={{ rotate: expandedId === member.id ? 45 : 0 }}
                >
                  +
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/30 rounded-full px-6 py-3">
            <div className="flex -space-x-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-steel-700 border-2 border-steel-800 flex items-center justify-center text-xs text-concrete">
                  👷
                </div>
              ))}
            </div>
            <span className="text-orange-500 font-semibold text-sm">+44 more experts on our team</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
