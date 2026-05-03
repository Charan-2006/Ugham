import React from 'react';
import { motion } from 'framer-motion';

const useMobile = () => {
  const [isMobile, React_useState] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => React_useState(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const InnovationClubBanner = () => {
  const isMobile = useMobile();

  return (
    <section className="section gpu-accel" style={{ padding: isMobile ? '60px 0' : '120px 0', background: '#ffffff', overflow: 'hidden' }}>
      <div className="container" style={{ padding: isMobile ? '0 1rem' : '0 2rem' }}>
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 30 : 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(0, 0, 0, 0.03)',
            borderRadius: '16px',
            padding: isMobile ? '2rem 1.5rem' : '5rem',
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)',
            alignItems: 'center',
            boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
            boxSizing: 'border-box',
            width: '100%'
          }}
        >
          {/* Large Architectural Watermark */}
          <div style={{
            position: 'absolute', right: isMobile ? '-10%' : '-5%', top: isMobile ? '10%' : '50%', transform: isMobile ? 'none' : 'translateY(-50%)',
            width: isMobile ? '200px' : '400px', height: isMobile ? '200px' : '400px',
            background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            opacity: 0.08,
            pointerEvents: 'none'
          }} />

          {/* Left Content */}
          <div style={{ gridColumn: 'span 12', position: 'relative', zIndex: 2, textAlign: 'left', boxSizing: 'border-box' }}>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 800, 
              color: '#3b16fe', 
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem'
            }}>
              INSTITUTIONAL NETWORK
            </span>
            
            <h2 className="text-radiant" style={{ 
              fontSize: isMobile ? '2.25rem' : '3.5rem', 
              fontWeight: 900, 
              lineHeight: 1.1,
              marginBottom: isMobile ? '1.5rem' : '2rem',
              maxWidth: '800px',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              wordBreak: 'break-word'
            }}>
              START AN UGHAM<br />INNOVATION CLUB
            </h2>

            <p style={{ 
              color: '#4A4A4A', 
              fontSize: isMobile ? '1rem' : '1.125rem', 
              maxWidth: '600px', 
              marginBottom: isMobile ? '2rem' : '3rem',
              lineHeight: 1.6
            }}>
              Empower your students by bringing the Ugham innovation ecosystem to your campus. Join a global network of builders and visionaries.
            </p>

            <motion.button
              whileHover={{ scale: isMobile ? 1 : 1.05, boxShadow: '0 0 30px rgba(255, 51, 102, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
                color: '#ffffff',
                border: 'none',
                padding: '1.25rem 3rem',
                fontSize: '0.875rem',
                fontWeight: 800,
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                cursor: 'pointer',
                width: isMobile ? '100%' : 'auto',
                boxSizing: 'border-box',
                display: 'inline-block'
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
