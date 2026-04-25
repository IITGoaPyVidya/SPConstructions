import { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { galleryImages } from '../utils/data';

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = galleryImages.map(src => ({ src }));

  return (
    <section id="gallery" className="section-padding bg-steel-50 dark:bg-steel-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Our Equipment</span>
          <h2 className="text-4xl md:text-5xl font-black text-steel-800 dark:text-white font-heading mt-2">
            Heavy Vehicles <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-steel-600 dark:text-concrete/60 mt-4 max-w-2xl mx-auto">
            Our fleet of heavy equipment - JCB, Hyva, Poclain, Trucks, and Tippers ready for rent.
          </p>
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (i % 4) * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => { setIndex(i); setOpen(true); }}
            >
              <motion.img
                src={img}
                alt={`Equipment ${i + 1}`}
                className="w-full rounded-xl"
                loading="lazy"
                whileHover={{ scale: 1.15, rotate: 2 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-steel-900/0 group-hover:bg-steel-900/30 transition-all duration-300 rounded-xl flex items-center justify-center">
                <motion.div
                  className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.2 }}
                >
                  🔍
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={index}
        />
      </div>
    </section>
  );
}
