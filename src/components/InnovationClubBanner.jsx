import React from 'react';
import { motion } from 'framer-motion';

const InnovationClubBanner = () => {
  return (
    <section className="section gpu-accel" style={{ padding: '120px 0', background: '#ffffff', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(0, 0, 0, 0.03)',
            borderRadius: '12px',
            padding: '5rem',
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            alignItems: 'center',
            boxShadow: '0 10px 40px rgba(0,0,0,0.02)'
          }}
        >
          {/* Large Architectural Watermark (Cols 8-12) */}
          <div style={{
            position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)',
            width: '400px', height: '400px',
            background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
            borderRadius: '50%',
            filter: 'blur(120px)',
            opacity: 0.08,
            pointerEvents: 'none'
          }} />

          {/* Left Content (Cols 1-12) */}
          <div style={{ gridColumn: 'span 12', position: 'relative', zIndex: 2, textAlign: 'left' }}>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 800, 
              color: '#3b16fe', 
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1.5rem'
            }}>
              INSTITUTIONAL NETWORK
            </span>
            
            <h2 className="text-radiant" style={{ 
              fontSize: '3.5rem', 
              fontWeight: 900, 
              lineHeight: 1.1,
              marginBottom: '2rem',
              maxWidth: '800px'
            }}>
              START AN UGHAM<br />INNOVATION CLUB
            </h2>

            <p style={{ 
              color: '#4A4A4A', 
              fontSize: '1.125rem', 
              maxWidth: '600px', 
              marginBottom: '3rem',
              lineHeight: 1.6
            }}>
              Empower your students by bringing the Ugham innovation ecosystem to your campus. Join a global network of builders and visionaries.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 51, 102, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
                color: '#ffffff',
                border: 'none',
                padding: '1.25rem 3rem',
                fontSize: '0.875rem',
                fontWeight: 800,
                borderRadius: '4px', // Professional Rectangular Shape
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                cursor: 'pointer'
              }}
            >
              Initialize Club
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InnovationClubBanner;
