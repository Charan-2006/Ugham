import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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

const PartnerCard = ({ text, index, isMobile }) => {
  return (
    <motion.div
      whileHover={isMobile ? "initial" : "hover"}
      initial="initial"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.03)',
        borderRadius: '12px',
        padding: isMobile ? '2rem' : '3.5rem',
        height: isMobile ? 'auto' : '320px',
        minHeight: isMobile ? '240px' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        boxSizing: 'border-box',
        width: '100%'
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
        top: isMobile ? '0%' : '-10%',
        right: isMobile ? '-10%' : '-5%',
        fontSize: isMobile ? '8rem' : '12rem',
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
          marginBottom: isMobile ? '1.5rem' : '2rem',
          borderRadius: '2px'
        }} />
        <p style={{ 
          fontSize: isMobile ? '1.15rem' : '1.25rem', 
          fontWeight: 800, 
          lineHeight: 1.4, 
          color: '#0f172a',
          margin: 0,
          letterSpacing: '-0.01em',
          wordWrap: 'break-word',
          whiteSpace: 'normal'
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
      {!isMobile && (
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
      )}

      {/* Sharp Gradient Border Reveal */}
      {!isMobile && (
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
      )}
    </motion.div>
  );
};

const WhyPartnerParallax = () => {
  const containerRef = useRef(null);
  const isMobile = useMobile();
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
    <section ref={containerRef} className="section gpu-accel" style={{ background: '#ffffff', padding: isMobile ? '80px 0' : '120px 0', overflow: 'hidden' }}>
      <div className="container" style={{ padding: isMobile ? '0 1rem' : '0 2rem' }}>
        
        <div className="section-header" style={{ marginBottom: isMobile ? '40px' : '80px', textAlign: 'left' }}>
          <span className="section-label">VALUE PROPOSITION</span>
          <h2 className="text-radiant" style={{ fontSize: isMobile ? '3rem' : '3.5rem', fontWeight: 900, lineHeight: 1.1 }}>
            WHY PARTNER<br />WITH UGHAM
          </h2>
          <p style={{ marginTop: '2rem', maxWidth: '500px', color: 'var(--text-muted)' }}>
            Partnering with Ugham gives you access to a fast-growing student innovation ecosystem designed for scale.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '1rem' : '2rem', position: 'relative', boxSizing: 'border-box' }}>
          {/* Column 1 */}
          <motion.div style={{ y: isMobile ? 0 : springY1, display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '2rem' }}>
            <PartnerCard text={reasons[0]} index={0} isMobile={isMobile} />
            <PartnerCard text={reasons[3]} index={3} isMobile={isMobile} />
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: isMobile ? 0 : springY2, display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '2rem', paddingTop: isMobile ? '0' : '40px' }}>
            <PartnerCard text={reasons[1]} index={1} isMobile={isMobile} />
            <PartnerCard text={reasons[4]} index={4} isMobile={isMobile} />
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: isMobile ? 0 : springY3, display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '2rem', paddingTop: isMobile ? '0' : '20px' }}>
            <PartnerCard text={reasons[2]} index={2} isMobile={isMobile} />
            <PartnerCard text={reasons[5]} index={5} isMobile={isMobile} />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WhyPartnerParallax;
