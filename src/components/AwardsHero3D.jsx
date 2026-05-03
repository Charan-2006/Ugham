import React from 'react';
import { motion } from 'framer-motion';

const PitchPedestal = ({ title, fee, index, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
      style={{
        background: '#ffffff',
        border: '1px solid #f1f5f9',
        borderRadius: '4px',
        padding: '2.5rem',
        width: '100%',
        position: 'relative',
        boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
      }}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ 
          width: '30px', height: '3px', 
          background: `linear-gradient(90deg, ${color}, #3b16fe)`, 
          marginBottom: '1rem',
          borderRadius: '2px'
        }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.5rem', color: '#0f172a' }}>
          {title}
        </h3>
        <p style={{ color, fontWeight: 800, margin: 0, fontSize: '0.75rem', textTransform: 'uppercase' }}>
          {fee}
        </p>
      </div>
    </motion.div>
  );
};

const AwardsHero3D = () => {
  return (
    <section className="section" style={{ background: '#ffffff', padding: '150px 0 80px', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="awards-hero-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          alignItems: 'center', 
          gap: '4rem',
          position: 'relative'
        }}>
          
          {/* Left Content */}
          <div className="awards-hero-left" style={{ gridColumn: 'span 6' }}>
            <h1 className="text-radiant" style={{ 
              fontSize: 'clamp(3rem, 7.5vw, 5rem)', 
              fontWeight: 900, 
              lineHeight: 1.1,
              marginBottom: '2rem'
            }}>
              UGHAM<br />AWARDS
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: '#4A4A4A', maxWidth: '500px', margin: 0, lineHeight: 1.6 }}>
              The definitive benchmark for student innovation. Redefining potential through engineering excellence.
            </p>
          </div>

          {/* Right Content */}
          <div className="awards-hero-right" style={{ 
            gridColumn: 'span 6', 
            display: 'flex', 
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <PitchPedestal 
              title="Idea Pitch (Idea Stage)" 
              fee="249 Rs reg fee per member" 
              index={0} 
              color="#FF3366" 
            />
            <PitchPedestal 
              title="Prototype Pitch" 
              fee="299 Rs reg fee per member" 
              index={1} 
              color="#3b16fe" 
              />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AwardsHero3D;
