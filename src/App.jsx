import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { useTheme } from './hooks/useTheme';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Assets3D from './components/Assets3D';
import Team from './components/Team';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const lenisRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loading]);

  // Handle initial hash navigation on page load
  useEffect(() => {
    if (loading) return;
    
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [loading]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main>
            <Hero />
            <Stats />
            <Projects />
            <Gallery />
            <Assets3D />
            <Team />
            <Services />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </>
      )}
    </div>
  );
}

export default App;
