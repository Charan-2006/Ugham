import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Calendar, Target, Rocket, Users, MapPin, Globe } from 'lucide-react';

const TechnicalIcon = ({ index }) => (
  <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {/* Concentric Circles Decor */}
    <div style={{ position: 'absolute', inset: 0, border: '1px dashed #e2e8f0', borderRadius: '50%', opacity: 0.5 }} />
    <div style={{ position: 'absolute', inset: '15px', border: '1px solid #e2e8f0', borderRadius: '50%', opacity: 0.3 }} />
    
    {/* Industrial Spinning Ring (Gradient) */}
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{ 
        position: 'absolute', inset: '-2px', 
        border: `1px solid transparent`,
        borderTop: '2px solid #FF3366',
        borderRight: '2px solid #3b16fe',
        borderRadius: '50%',
        opacity: 0.6
      }}
    />
    
    {/* Architectural Number (Gradient) */}
    <div style={{ 
      background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '1.5rem', 
      fontWeight: 900, 
      fontFamily: 'monospace', 
      zIndex: 2 
    }}>
      {String(index + 1).padStart(2, '0')}
    </div>
  </div>
);

const useMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const TimelineNode = ({ index, title, desc, isRight, isMobile }) => {
  const accentColor = index % 2 === 0 ? '#FF3366' : '#3b16fe';
  return (
    <div className="timeline-node-wrapper" style={{ 
      display: 'flex', 
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: isMobile ? 'flex-start' : (isRight ? 'flex-start' : 'flex-end'), 
      alignItems: isMobile ? 'flex-start' : 'center', 
      width: '100%', 
      marginBottom: isMobile ? '60px' : '120px',
      position: 'relative',
      boxSizing: 'border-box'
    }}>
      {/* numeric indicator - Above card on mobile */}
      {isMobile && (
        <div style={{ 
          marginBottom: '1rem',
          marginLeft: '0.5rem',
          transform: 'scale(0.8)',
          transformOrigin: 'left center'
        }}>
          <TechnicalIcon index={index} />
        </div>
      )}

      {/* Content Card */}
      <motion.div
        className="timeline-card"
        initial={{ opacity: 0, x: isMobile ? 20 : (isRight ? 50 : -50) }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ 
          width: isMobile ? '100%' : '42%', 
          marginLeft: '0',
          textAlign: 'left',
          padding: isMobile ? '1.5rem' : '2.5rem',
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
          borderLeft: `4px solid ${accentColor}`,
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 1
        }}
      >
        <h3 style={{ fontSize: isMobile ? '1.25rem' : '1.75rem', fontWeight: 900, marginBottom: '0.75rem', color: '#0f172a', whiteSpace: 'normal', wordBreak: 'break-word' }}>{title}</h3>
        <p style={{ color: '#4A4A4A', lineHeight: 1.6, margin: 0, fontSize: isMobile ? '0.95rem' : '1rem', whiteSpace: 'normal', wordBreak: 'break-word' }}>{desc}</p>
      </motion.div>

      {/* Center Station - Desktop Only */}
      {!isMobile && (
        <div style={{ 
          position: 'absolute', 
          left: '50%', 
          transform: 'translateX(-50%)',
          background: '#fff', 
          padding: '1rem', 
          zIndex: 10,
          borderRadius: '50%'
        }}>
          <TechnicalIcon index={index} />
        </div>
      )}
    </div>
  );
};

const EventStructureMotion = () => {
  const containerRef = useRef(null);
  const isMobile = useMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const nodes = [
    { 
      title: "Hybrid Deployment", 
      desc: "Architected for both digital and physical excellence. Alternate Saturday/Sunday cycles ensure maximum accessibility.",
      icon: <Globe size={32} />, 
      color: "#FF3366" 
    },
    { 
      title: "25-Team Bandwidth", 
      desc: "Limited allocation ensures high-intensity focus. Only the top 25 teams in each category proceed to the pitch stage.", 
      icon: <Target size={32} />, 
      color: "#3b16fe" 
    },
    { 
      title: "Audition Rounds", 
      desc: "Direct collaboration with leading institutions across India for localized audition and verification phases.", 
      icon: <MapPin size={32} />, 
      color: "#FF3366" 
    },
    { 
      title: "The Grand Climax", 
      desc: "The innovation journey culminates on Sept 19th. A national stage for the next generation of founders.", 
      icon: <Rocket size={32} />, 
      color: "#3b16fe" 
    },
    { 
      title: "Squad Protocols", 
      desc: "Teams only. We believe in collective intelligence. Cross-college and Pan-India squads are fully supported.", 
      icon: <Users size={32} />, 
      color: "#FF3366" 
    }
  ];

  const dates = [
    'May 9 & 10', 'May 23 & 24', 'June 6 & 7', 'June 20 & 21',
    'July 4 & 5', 'July 18 & 19', 'Aug 1 & 2', 'Aug 15 & 16',
    'Aug 29 & 30', 'Sept 12 & 13'
  ];

  return (
    <section ref={containerRef} className="section" style={{ background: '#ffffff', padding: isMobile ? '80px 0' : '150px 0', overflow: 'hidden' }}>
      <div className="container text-center" style={{ marginBottom: isMobile ? '60px' : '100px', padding: isMobile ? '0 1rem' : '0 2rem' }}>
        <h2 className="text-radiant" style={{ fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 900 }}>MOTION STRUCTURE</h2>
      </div>

      <div className="container" style={{ position: 'relative', padding: isMobile ? '0 1rem' : '0 2rem' }}>
        {/* The Growing Motion Line */}
        <div className="timeline-axis" style={{ 
          position: 'absolute', left: isMobile ? '20px' : '50%', top: 0, bottom: 0, 
          width: '4px', background: '#f1f5f9', transform: 'translateX(-50%)' 
        }} />
        <motion.div style={{ 
          position: 'absolute', left: isMobile ? '20px' : '50%', top: 0, 
          width: '4px', background: 'linear-gradient(to bottom, #FF3366, #3b16fe)',
          transform: 'translateX(-50%)',
          scaleY,
          originY: 0,
          boxShadow: '0 0 20px rgba(59, 22, 254, 0.2)'
        }} />

        {/* Timeline Items */}
        <div className="timeline-items" style={{ marginTop: '50px', position: 'relative' }}>
          {nodes.map((node, i) => (
            <TimelineNode key={i} index={i} {...node} isRight={i % 2 !== 0} isMobile={isMobile} />
          ))}
        </div>

        {/* Floating Schedule Reveal */}
        <div style={{ marginTop: '150px', textAlign: 'center' }}>
          <div className="date-chips" style={{ 
            display: 'inline-flex', flexWrap: 'wrap', gap: '1rem', 
            justifyContent: 'center', maxWidth: '1000px', margin: '0 auto' 
          }}>
            {dates.map((date, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(59, 22, 254, 0.1)' }}
                transition={{ delay: i * 0.05 }}
                style={{ 
                  padding: '1.5rem 2rem', 
                  background: '#fff', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '4px',
                  fontWeight: 800,
                  color: '#0f172a',
                  cursor: 'default'
                }}
              >
                {date}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventStructureMotion;
