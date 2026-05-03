import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const HorizontalMotionTimeline = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Timeline scaleX animation
  const scaleX = useSpring(useTransform(scrollYProgress, [0.2, 0.5], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const steps = [
    { title: 'LEARN', desc: 'Develop foundational knowledge, explore ideas, and understand real-world challenges through deep research and insight gathering.' },
    { title: 'BUILD', desc: 'Turn ideas into prototypes and products through guided execution, iteration, and hands-on building with expert mentorship.' },
    { title: 'GROW', desc: 'Scale innovations into impactful solutions, startups, or long-term ventures with strategic support and ecosystem growth.' }
  ];

  return (
    <section 
      ref={sectionRef}
      className="section gpu-accel" 
      style={{ 
        background: '#ffffff', 
        padding: '6rem 0', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      {/* Subtle Background Accent */}
      <div style={{ 
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '800px', height: '400px', 
        background: 'radial-gradient(circle, rgba(120, 80, 255, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '8rem' }}>
          <span className="section-label">THE UGHAM ROADMAP</span>
          <h2 className="text-radiant" style={{ fontSize: '3rem', fontWeight: 900 }}>A JOURNEY OF IMPACT</h2>
        </div>

        <div style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center' }}>
          
          {/* Main Horizontal Line */}
          <div style={{ 
            position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', 
            background: 'rgba(0,0,0,0.05)', zIndex: 0 
          }} />
          <motion.div style={{ 
            position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', 
            background: 'linear-gradient(90deg, #FF3366, #3b16fe)', 
            scaleX, transformOrigin: 'left',
            boxShadow: '0 0 20px rgba(59, 22, 254, 0.3)',
            zIndex: 1 
          }} />

          {/* Nodes & Cards */}
          <div style={{ 
            display: 'flex', width: '100%', justifyContent: 'space-between', 
            position: 'relative', zIndex: 10 
          }}>
            {steps.map((step, i) => (
              <TimelineItem key={i} step={step} index={i} total={steps.length} scrollYProgress={scrollYProgress} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ step, index, total, scrollYProgress }) => {
  const threshold = 0.2 + (index * 0.1);
  const isActive = useTransform(scrollYProgress, [threshold, threshold + 0.1], [0, 1]);
  const activeSpring = useSpring(isActive, { stiffness: 100, damping: 30 });

  return (
    <div style={{ 
      width: '30%', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', position: 'relative' 
    }}>
      
      {/* Floating Card ABOVE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 + (index * 0.2), ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
        style={{
          position: 'absolute', bottom: '60px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          padding: '2.5rem',
          borderRadius: '20px',
          border: '1px solid rgba(0,0,0,0.04)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
          textAlign: 'left',
          width: '100%',
          cursor: 'default'
        }}
      >
        <h3 style={{ 
          fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', 
          marginBottom: '1rem', letterSpacing: '0.05em' 
        }}>
          {step.title}
        </h3>
        <p style={{ 
          fontSize: '0.95rem', color: 'var(--text-muted)', 
          lineHeight: 1.6, margin: 0 
        }}>
          {step.desc}
        </p>
      </motion.div>

      {/* Node on Axis */}
      <motion.div
        style={{
          width: '24px', height: '24px', borderRadius: '50%',
          background: 'white',
          border: '2px solid var(--border)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          scale: useTransform(activeSpring, [0, 1], [0.8, 1.2]),
          borderColor: useTransform(activeSpring, [0, 1], ['rgba(0,0,0,0.1)', '#3b16fe']),
          zIndex: 20
        }}
        whileHover={{ scale: 1.4, boxShadow: '0 0 20px rgba(59, 22, 254, 0.4)' }}
      />
      
    </div>
  );
};

export default HorizontalMotionTimeline;
