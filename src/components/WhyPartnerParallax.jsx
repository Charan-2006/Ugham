import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const PartnerCard = ({ text, index }) => {
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.03)',
        borderRadius: '12px',
        padding: '3.5rem',
        height: '320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
      variants={{
        initial: { 
          y: 0, 
          boxShadow: '0 4px 30px rgba(0,0,0,0.02)',
          backgroundColor: '#ffffff'
        },
        hover: { 
          y: -12,
          boxShadow: '0 20px 40px rgba(255, 51, 102, 0.1), 0 10px 20px rgba(59, 22, 254, 0.05)',
          backgroundColor: 'rgba(255, 255, 255, 0.98)'
        }
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Premium Number Watermark in Brand Gradient */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        fontSize: '12rem',
        fontWeight: 900,
        opacity: 0.03,
        userSelect: 'none',
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontFamily: 'var(--font-heading)'
      }}>
        0{index + 1}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ 
          width: '40px', 
          height: '3px', 
          background: 'linear-gradient(90deg, #FF3366, #3b16fe)', 
          marginBottom: '2rem',
          borderRadius: '2px'
        }} />
        <p style={{ 
          fontSize: '1.25rem', 
          fontWeight: 800, 
          lineHeight: 1.4, 
          color: '#0f172a',
          margin: 0,
          letterSpacing: '-0.01em'
        }}>
          {text}
        </p>
      </div>

      {/* Radiant Glow Overlay (Subtle Gradient Tint) */}
      <motion.div
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 0.02 }
        }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* High-End Light Sweep Effect */}
      <motion.div
        variants={{
          hover: { x: ['100%', '-100%'] }
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          position: 'absolute', top: 0, bottom: 0, width: '50%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
          skewX: '-20deg',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Sharp Gradient Border Reveal */}
      <motion.div 
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        style={{
          position: 'absolute', inset: 0,
          border: '1.5px solid transparent',
          borderImage: 'linear-gradient(135deg, #FF3366, #3b16fe) 1',
          pointerEvents: 'none',
          zIndex: 3
        }}
      />
    </motion.div>
  );
};

const WhyPartnerParallax = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const reasons = [
    'Direct access to high-potential student innovators and ideas',
    'Opportunities for talent scouting and recruitment',
    'Brand visibility across national-level innovation platforms',
    'Early access to breakthrough products and startups',
    'Opportunities for long-term engagement and advisory roles',
    'Contribution to building the next generation of entrepreneurs'
  ];

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="section gpu-accel" style={{ background: '#ffffff', padding: '120px 0', overflow: 'hidden' }}>
      <div className="container">
        
        <div className="section-header" style={{ marginBottom: '80px', textAlign: 'left' }}>
          <span className="section-label">VALUE PROPOSITION</span>
          <h2 className="text-radiant" style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1 }}>
            WHY PARTNER<br />WITH UGHAM
          </h2>
          <p style={{ marginTop: '2rem', maxWidth: '500px', color: 'var(--text-muted)' }}>
            Partnering with Ugham gives you access to a fast-growing student innovation ecosystem designed for scale.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', position: 'relative' }}>
          {/* Column 1 */}
          <motion.div style={{ y: springY1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <PartnerCard text={reasons[0]} index={0} />
            <PartnerCard text={reasons[3]} index={3} />
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: springY2, display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '40px' }}>
            <PartnerCard text={reasons[1]} index={1} />
            <PartnerCard text={reasons[4]} index={4} />
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: springY3, display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '20px' }}>
            <PartnerCard text={reasons[2]} index={2} />
            <PartnerCard text={reasons[5]} index={5} />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WhyPartnerParallax;
