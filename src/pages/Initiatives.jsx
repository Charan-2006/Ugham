import React from 'react';
import { motion } from 'framer-motion';
import InitiativesShowcase3D from '../components/InitiativesShowcase3D';

const Initiatives = () => {
  const headerText = "PHASE 02";

  return (
    <div style={{ paddingTop: '100px', background: '#ffffff' }}>
      {/* Hero Section: Premium Kinetic Reveal */}
      <section className="section gpu-accel" style={{ paddingBottom: '40px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">INITIATIVES</span>
            <h1 className="text-radiant" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <span>OUR INITIATIVES</span>
              <span style={{ opacity: 0.3 }}>—</span>
              <div style={{ display: 'flex' }}>
                {headerText.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: '650px', marginTop: '2rem' }}
          >
            We are building a multi-layered ecosystem designed to support builders at every stage. From foundational skill-acquisition to high-stakes venture scaling, our initiatives are engineered for maximum real-world impact.
          </motion.p>
        </div>
      </section>

      {/* 3D Monolithic Showcase */}
      <InitiativesShowcase3D />

      {/* Call to Action: Minimalist & Clean */}
      <section className="section--bg-light" style={{ padding: '120px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ maxWidth: '800px', margin: '0 auto 2rem', textAlign: 'center' }}>
            READY TO JOIN THE <span className="text-radiant">NEXT COHORT?</span>
          </h2>
          <p style={{ margin: '0 auto 3rem', textAlign: 'center', maxWidth: '600px' }}>
            Our selection process is rigorous, focusing on technical potential, problem-solving depth, and the drive to build something that lasts.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
            style={{ margin: '0 auto' }}
          >
            APPLY FOR ADMISSION
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Initiatives;
