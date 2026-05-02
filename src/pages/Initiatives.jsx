import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const Initiatives = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const items = [
    { title: 'WORKSHOPS', desc: 'Skill-building sessions led by industry experts and founders.' },
    { title: 'INNOVATION PROGRAMS', desc: 'Structured challenges to test and refine your ideas against the best.' },
    { title: 'MENTORSHIP', desc: 'Personalized guidance to navigate the complexities of building a product.' }
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));

  return (
    <div style={{ paddingTop: '100px' }}>
      <section className="section text-center">
        <div className="container">
          <p className="section-label">INITIATIVES</p>
          <h1 className="text-radiant">OUR INITIATIVES — PHASE 2</h1>
        </div>
      </section>

      <AnimatedSection className="section--bg-light">
        <div className="container text-center">
          <div className="section-header" style={{ margin: '0 auto 4rem' }}>
            <span className="section-label">COMING SOON</span>
            <h2 className="text-radiant">WHAT'S IN STORE</h2>
          </div>

          <div style={{ position: 'relative', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1200px' }}>
            <AnimatePresence initial={false}>
              {items.map((item, index) => {
                const offset = index - currentIndex;
                const isCenter = offset === 0;
                
                // Determine positions for Coverflow
                let x = 0;
                let rotateY = 0;
                let z = 0;
                let opacity = 0;

                if (isCenter) {
                  x = 0; rotateY = 0; z = 0; opacity = 1;
                } else if (offset === 1 || (currentIndex === items.length - 1 && index === 0)) {
                  // Right item
                  x = 200; rotateY = -35; z = -200; opacity = 0.6;
                } else if (offset === -1 || (currentIndex === 0 && index === items.length - 1)) {
                  // Left item
                  x = -200; rotateY = 35; z = -200; opacity = 0.6;
                }

                if (Math.abs(offset) > 1 && !(currentIndex === 0 && index === items.length - 1) && !(currentIndex === items.length - 1 && index === 0)) {
                   return null;
                }

                return (
                  <motion.div
                    key={index}
                    animate={{ x, rotateY, z, opacity, scale: isCenter ? 1.1 : 0.9 }}
                    transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                    style={{
                      position: 'absolute', width: '350px', background: 'var(--white)',
                      borderRadius: '20px', padding: '2.5rem', textAlign: 'center',
                      boxShadow: isCenter ? '0 20px 40px rgba(59,22,254,0.15)' : '0 10px 30px rgba(0,0,0,0.05)',
                      border: isCenter ? '2px solid var(--primary)' : '1px solid var(--border)',
                      zIndex: isCenter ? 10 : 1, cursor: 'pointer'
                    }}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="btn btn-outline" onClick={handlePrev}>PREV</button>
            <button className="btn btn-outline" onClick={handleNext}>NEXT</button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Initiatives;
