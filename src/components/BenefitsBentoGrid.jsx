import React from 'react';
import { motion } from 'framer-motion';

const BenefitCard = ({ title, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      style={{ height: '100%' }}
    >
      <div style={{
        background: '#ffffff',
        border: '1px solid #f1f5f9',
        padding: '2.5rem',
        height: '100%',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.02)',
      }}>
        {/* Floating Background Orb */}
        <div style={{ 
          position: 'absolute', top: '-20%', right: '-20%',
          width: '150px', height: '150px',
          background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
          filter: 'blur(60px)',
          opacity: 0.05,
          borderRadius: '50%',
          zIndex: 0
        }} />

        <div style={{ zIndex: 1 }}>
          <div style={{ 
            fontSize: '3rem', fontWeight: 900, fontFamily: 'monospace',
            background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            opacity: 0.1,
            marginBottom: '1rem'
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <p style={{ 
            fontSize: '1.25rem', fontWeight: 800, color: '#0f172a',
            lineHeight: 1.4, margin: 0 
          }}>
            {title}
          </p>
        </div>

        <div style={{ 
          width: '40px', height: '4px', 
          background: 'linear-gradient(90deg, #FF3366, #3b16fe)',
          marginTop: '2rem', zIndex: 1
        }} />
      </div>
    </motion.div>
  );
};

const BenefitsBentoGrid = ({ benefits }) => {
  if (!benefits || benefits.length < 8) return null;

  return (
    <section className="section--bg-light" style={{ padding: '150px 0' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '80px' }}>
          <h2 className="text-radiant" style={{ fontSize: '3.5rem', fontWeight: 900 }}>PARTICIPANT BENEFITS</h2>
        </div>

        <div className="bento-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: 'minmax(280px, auto)',
          gap: '1.5rem'
        }}>
          {/* Custom Bento Layout */}
          <div className="bento-cell" style={{ gridColumn: 'span 4' }}>
            <BenefitCard title={benefits[0]} index={0} />
          </div>
          <div className="bento-cell" style={{ gridColumn: 'span 8' }}>
            <BenefitCard title={benefits[1]} index={1} />
          </div>
          <div className="bento-cell" style={{ gridColumn: 'span 7' }}>
            <BenefitCard title={benefits[2]} index={2} />
          </div>
          <div className="bento-cell" style={{ gridColumn: 'span 5' }}>
            <BenefitCard title={benefits[3]} index={3} />
          </div>
          <div className="bento-cell" style={{ gridColumn: 'span 6' }}>
            <BenefitCard title={benefits[4]} index={4} />
          </div>
          <div className="bento-cell" style={{ gridColumn: 'span 6' }}>
            <BenefitCard title={benefits[5]} index={5} />
          </div>
          <div className="bento-cell" style={{ gridColumn: 'span 8' }}>
            <BenefitCard title={benefits[6]} index={6} />
          </div>
          <div className="bento-cell" style={{ gridColumn: 'span 4' }}>
            <BenefitCard title={benefits[7]} index={7} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsBentoGrid;
