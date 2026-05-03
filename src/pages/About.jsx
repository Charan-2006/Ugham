import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import KineticArchitecturalGrid from '../components/KineticArchitecturalGrid';
import VisionMissionArchitectural from '../components/VisionMissionArchitectural';
import StructuralAlignmentInterface from '../components/StructuralAlignmentInterface';
import CoreValuesEcosystem from '../components/CoreValuesEcosystem';

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const About = () => {
  const isMobile = useMobile();
  const values = [
    { title: 'Think Bold', desc: 'Encouraging innovative thinking and breakthrough ideas.', pos: { top: '5%', left: '10%' } },
    { title: 'Market Research', desc: 'Understanding user needs, trends, and real-world problems.', pos: { top: '10%', right: '5%' } },
    { title: 'Idea Validation', desc: 'Shaping ideas based on market demand and feasibility.', pos: { bottom: '40%', left: '0%' } },
    { title: 'Team Formation', desc: 'Building strong teams through collaboration and shared vision.', pos: { bottom: '40%', right: '0%' } },
    { title: 'Product Dev', desc: 'Transforming ideas into functional and scalable products.', pos: { bottom: '5%', left: '10%' } },
    { title: 'Scale & Grow', desc: 'Expanding solutions to create wider impact.', pos: { bottom: '10%', right: '5%' } }
  ];

  const whatWeDo = [
    { title: 'Education Empowerment', desc: 'Developing an innovation and problem-solving skills' },
    { title: 'Innovation Enabling', desc: 'Supporting idea validation and structured development' },
    { title: 'Product Building', desc: 'Transforming ideas into working prototypes and solutions' },
    { title: 'Venture Creation', desc: 'Helping innovations evolve into scalable startups' }
  ];

  return (
    <div style={{ paddingTop: isMobile ? '80px' : '100px', overflowX: 'hidden' }}>
      {/* 1. Who We Are */}
      <section className="section gpu-accel" style={{ position: 'relative', overflow: isMobile ? 'visible' : 'hidden', padding: isMobile ? '4rem 0 3rem' : '8rem 0 6rem' }}>
        {/* Subtle Background Accent - Desktop Only */}
        {!isMobile && (
          <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59, 22, 254, 0.03) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        )}
        
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'left' }}
          >
            <span className="section-label" style={{ marginBottom: isMobile ? '1rem' : '2rem', display: 'block' }}>WHO WE ARE</span>
            
            <h1 className="text-radiant" style={{ 
              maxWidth: '900px', 
              fontSize: isMobile ? '2.5rem' : 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              marginBottom: isMobile ? '2rem' : '3.5rem',
              textTransform: 'uppercase',
              whiteSpace: 'normal',
              wordBreak: 'break-word'
            }}>
              Empowering students<br />
              to turn ideas into<br />
              real-world solutions
            </h1>

            <p style={{ 
              maxWidth: '520px', 
              fontSize: isMobile ? '1rem' : '1.125rem', 
              color: 'var(--text-muted)', 
              lineHeight: 1.8,
              fontWeight: 400,
              opacity: 0.9,
              margin: 0
            }}>
              Ugham is an innovation studio dedicated to empowering students. We are a platform where creativity meets execution by helping young innovators move beyond concepts and build impactful, scalable innovations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. What We Do (Kinetic Architectural Grid) */}
      <KineticArchitecturalGrid />

      {/* 3. Vision & Mission (Split Monolith Architectural) */}
      <VisionMissionArchitectural />

      {/* 4. Why Choose & Difference (Structural Alignment Interface) */}
      <StructuralAlignmentInterface />

      {/* 5. Core Values (3D Interactive Ecosystem) */}
      <CoreValuesEcosystem />

      {/* 6. Leadership / Team (Premium Team Cards) */}
      <AnimatedSection className="section--bg-light" style={{ padding: isMobile ? '4rem 0' : '8rem 0' }}>
        <div className="container text-center">
          <span className="section-label">LEADERSHIP</span>
          <h2 className="text-radiant" style={{ marginBottom: isMobile ? '3rem' : '5rem', fontSize: isMobile ? '2rem' : '2.5rem' }}>MEET THE TEAM</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: isMobile ? '1.5rem' : '3rem', alignItems: 'stretch' }}>
            {[
              { name: 'Leader Name 1', role: 'CEO & Founder', img: '/assets/img/leader1.png' },
              { name: 'Leader Name 2', role: 'CTO', img: '/assets/img/leader2.png' },
              { name: 'Leader Name 3', role: 'COO', img: '/assets/img/leader3.png' }
            ].map((member, i) => (
              <motion.div 
                key={i} 
                whileHover={isMobile ? {} : { y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }} 
                style={{ 
                  background: 'var(--white)', 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ width: '100%', height: isMobile ? '200px' : '240px', overflow: 'hidden' }}>
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    onError={(e) => {
                      e.target.style.display='none';
                      e.target.parentElement.style.background='var(--bg-secondary)';
                    }} 
                  />
                </div>
                <div style={{ padding: '20px', flexGrow: 1 }}>
                  <h3 style={{ fontSize: isMobile ? '1.1rem' : '1.25rem', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                    {member.name}
                  </h3>
                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: 'var(--text-muted)', 
                    marginTop: '12px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: 0
                  }}>
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default About;
