import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const WhatWeDo = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const services = [
    { title: 'Education Empowerment', desc: 'We equip students with the right mindset, skills, and tools to think creatively and solve real-world problems.' },
    { title: 'Innovation Enabling', desc: 'We create an ecosystem that nurtures experimentation, critical thinking, and breakthrough ideas.' },
    { title: 'Product Building', desc: 'We help transform ideas into tangible products through structured guidance, mentorship, and hands-on support.' },
    { title: 'Venture Creation', desc: 'We support students in shaping their innovations into scalable startups and sustainable ventures.' }
  ];

  const steps = [
    { num: '1', title: 'LEARN', desc: 'Develop foundational knowledge, explore ideas, and understand real-world challenges.' },
    { num: '2', title: 'BUILD', desc: 'Turn ideas into prototypes and products through guided execution and iteration.' },
    { num: '3', title: 'GROW', desc: 'Scale innovations into impactful solutions, startups, or long-term ventures.' }
  ];

  const whoWeServe = [
    'Students with ideas and curiosity',
    'Aspiring innovators and problem-solvers',
    'Early-stage builders looking for direction',
    'Young entrepreneurs aiming to create impact'
  ];

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Hero */}
      <section className="section text-center">
        <div className="container">
          <p className="section-label">WHAT WE DO</p>
          <h1 className="text-radiant" style={{ maxWidth: '800px', margin: '0 auto 1.5rem' }}>
            TURNING IDEAS INTO REALITY
          </h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', color: 'var(--text-muted)' }}>
            At Ugham, we turn ideas into reality. As an innovation studio, we work closely with students to help them learn, build, and grow into creators of meaningful solutions. From the earliest spark of an idea to building scalable ventures, we guide every step of the journey.
          </p>
        </div>
      </section>

      {/* Services / Core Offering (Bento Grid 2.0) */}
      <AnimatedSection className="section--bg-light">
        <div className="container">
          <div className="section-header text-center" style={{ margin: '0 auto 4rem' }}>
            <span className="section-label">SERVICES</span>
            <h2 className="text-radiant">CORE OFFERINGS</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {services.map((srv, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>{srv.title}</h3>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Roadmap (SVG Timeline) */}
      <AnimatedSection className="section">
        <div className="container" ref={containerRef} style={{ position: 'relative', padding: '4rem 0' }}>
          <div className="section-header text-center" style={{ margin: '0 auto 4rem' }}>
            <span className="section-label">THE UGHAM ROADMAP</span>
            <h2 className="text-radiant">LEARN → BUILD → GROW</h2>
          </div>

          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* SVG Path */}
            <div style={{ position: 'absolute', left: '40px', top: 0, bottom: 0, width: '4px', background: 'var(--border)' }}>
              <motion.div 
                style={{ width: '100%', background: 'linear-gradient(to bottom, #FF3366, #3b16fe)', transformOrigin: 'top', scaleY: scrollYProgress }} 
              />
            </div>

            {/* Steps */}
            {steps.map((step, index) => (
              <motion.div 
                key={index} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ margin: "-100px" }} transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '6rem', position: 'relative', zIndex: 2 }}
              >
                <motion.div 
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: index * 0.2 + 0.3 }}
                  style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', boxShadow: '0 10px 30px rgba(59,22,254,0.15)', border: '4px solid var(--white)', flexShrink: 0 }}
                >
                  {step.num}
                </motion.div>
                <div className="glass-card" style={{ marginLeft: '3rem', flex: 1 }}>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{step.title}</h3>
                  <p style={{ margin: 0, fontSize: '1.125rem' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Who We Serve (Stacking Cards) */}
      <AnimatedSection className="section--bg-light">
        <div className="container text-center">
          <span className="section-label">TARGET AUDIENCE</span>
          <h2 className="text-radiant" style={{ marginBottom: '4rem' }}>WHO WE SERVE</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
            {whoWeServe.map((serve, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                style={{ background: 'var(--primary)', color: 'white', padding: '2rem', borderRadius: '20px', width: '300px', fontSize: '1.25rem', fontWeight: 600 }}
              >
                {serve}
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default WhatWeDo;
