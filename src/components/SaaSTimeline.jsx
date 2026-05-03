import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const SaaSTimeline = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scaleX = useSpring(useTransform(scrollYProgress, [0.2, 0.45], [0, 1]), {
    stiffness: 80,
    damping: 25
  });

  const steps = [
    { title: 'LEARN', desc: 'Develop foundational knowledge, explore ideas, and understand real-world challenges through deep research and insight gathering.' },
    { title: 'BUILD', desc: 'Turn ideas into prototypes and products through guided execution, iteration, and hands-on building with expert mentorship.' },
    { title: 'GROW', desc: 'Scale innovations into impactful solutions, startups, or long-term ventures with strategic support and ecosystem growth.' }
  ];

  return (
    <section 
      ref={sectionRef}
      className="section gpu-accel hm-timeline-section" 
      style={{ 
        background: '#ffffff', 
        padding: '100px 0', 
        position: 'relative', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Subtle Background Radial Accent */}
      <div style={{ 
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '100%', height: '100%', 
        background: 'radial-gradient(circle at 50% 50%, rgba(120, 80, 255, 0.02) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="section-header text-center hm-timeline-header" style={{ marginBottom: '280px', textAlign: 'center' }}>
          <span className="section-label" style={{ margin: '0 auto 1.5rem' }}>THE UGHAM ROADMAP</span>
          <h2 className="text-radiant hm-timeline-title" style={{ fontSize: '4rem', fontWeight: 900, textAlign: 'center', width: '100%' }}>A JOURNEY OF IMPACT</h2>
        </div>

        <div className="hm-timeline-container" style={{ position: 'relative', width: '100%', maxWidth: '1200px', height: '550px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <div className="hm-timeline-wrapper" style={{ 
            display: 'flex', width: '100%', justifyContent: 'space-between', 
            position: 'relative', zIndex: 10 
          }}>
            {/* Main Axis Line */}
            <div className="hm-timeline-line-bg" style={{ 
              position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', 
              background: 'rgba(0,0,0,0.03)', zIndex: 0 
            }} />
            
            <motion.div className="hm-timeline-line-progress" style={{ 
              position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', 
              background: 'linear-gradient(90deg, #FF3366, #3b16fe)', 
              scaleX, transformOrigin: 'left',
              boxShadow: '0 0 15px rgba(59, 22, 254, 0.15)',
              zIndex: 1 
            }} />

            {/* Continuous Light Pulse */}
            <motion.div
              className="hm-timeline-line-progress"
              animate={{ x: ['-600px', '600px'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', top: '50%', width: '200px', height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
                zIndex: 2,
                filter: 'blur(2px)'
              }}
            />

            {/* Steps Container */}
            {steps.map((step, i) => (
              <TimelineItem key={i} step={step} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ step, index, scrollYProgress }) => {
  const [hovered, setHovered] = useState(false);
  const threshold = 0.2 + (index * 0.12);
  
  // Opacity for inactive nodes
  const nodeOpacity = useTransform(scrollYProgress, [threshold - 0.05, threshold], [0.5, 1]);
  const nodeScale = useTransform(scrollYProgress, [threshold - 0.05, threshold], [0.9, 1.1]);
  
  const springOpacity = useSpring(nodeOpacity, { stiffness: 100, damping: 30 });
  const springScale = useSpring(nodeScale, { stiffness: 100, damping: 30 });

  return (
    <div className="hm-timeline-item" style={{ 
      width: '30%', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', position: 'relative' 
    }}>
      
      {/* Premium Glass Card */}
      <motion.div
        className="hm-timeline-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 + (index * 0.2), ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ 
          y: -12, 
          scale: 1.03,
          boxShadow: '0 30px 70px rgba(0,0,0,0.08)',
          borderColor: 'rgba(59, 22, 254, 0.2)'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'absolute', bottom: '140px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '3rem',
          borderRadius: '24px',
          border: '1px solid rgba(0,0,0,0.04)',
          boxShadow: '0 15px 45px rgba(0,0,0,0.03)',
          textAlign: 'left',
          width: '380px',
          cursor: 'pointer',
          willChange: 'transform, opacity'
        }}
      >
        <h3 className="hm-timeline-card-title" style={{ 
          fontSize: '1.5rem', fontWeight: 900, 
          background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '1.25rem', letterSpacing: '0.05em' 
        }}>
          {step.title}
        </h3>
        <p className="hm-timeline-card-desc" style={{ 
          fontSize: '1.1rem', color: '#64748b', 
          lineHeight: 1.7, margin: 0, fontWeight: 400
        }}>
          {step.desc}
        </p>
      </motion.div>

      {/* Neumorphic Node */}
      <motion.div
        className="hm-timeline-dot"
        style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: '#ffffff',
          boxShadow: hovered 
            ? '0 0 35px rgba(59, 22, 254, 0.5), inset 0 2px 4px rgba(255,255,255,0.8), 0 6px 15px rgba(0,0,0,0.12)'
            : 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 10px rgba(0,0,0,0.05)',
          scale: hovered ? 1.3 : springScale,
          opacity: springOpacity,
          border: '1px solid rgba(0,0,0,0.03)',
          zIndex: 20,
          willChange: 'transform, opacity'
        }}
      />
      
    </div>
  );
};

export default SaaSTimeline;
