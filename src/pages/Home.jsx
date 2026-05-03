import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Lightbulb, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import Scene3D from '../components/Scene3D';
import GlowCard from '../components/GlowCard';
import MorphingSurface from '../components/MorphingSurface';
import FlowConnection from '../components/FlowConnection';
import KineticGridExpertise from '../components/KineticGridExpertise';
import FluidTopographyHighlights from '../components/FluidTopographyHighlights';
import EditorialWorkspace from '../components/EditorialWorkspace';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 20 } }
};

const slideIn = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 60, damping: 20 } }
};

const Home = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [activeSide, setActiveSide] = useState(null);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const accordions = [
    { 
      title: 'Innovative Products', 
      desc: 'Turn your ideas into tangible, market-ready innovative products.',
      img: '/assets/img/innovativeproducts.png'
    },
    { 
      title: 'Tech-Driven Solutions', 
      desc: 'Leverage modern technology to solve complex problems.',
      img: '/assets/img/techdriven.png'
    },
    { 
      title: 'Scalable Innovation', 
      desc: 'Build solutions that can grow and adapt to massive audiences.',
      img: '/assets/img/scalableinnovation.png'
    },
    { 
      title: 'Real-World Impact', 
      desc: 'Create projects that drive systemic community change.',
      img: '/assets/img/realworld.png'
    }
  ];

  const expertise = [
    { title: 'Education Empowerment', desc: 'Developing problem-solving and innovation mindset.' },
    { title: 'Innovation Enabling', desc: 'Supporting idea validation and execution.' },
    { title: 'Product Building', desc: 'Turning concepts into functional solutions.' },
    { title: 'Venture Creation', desc: 'Helping ideas grow into scalable ventures.' }
  ];

  const impactStats = [
    { num: '100+', label: 'Innovations Planned by 2030' },
    { num: 'Real-World', label: 'Problem Solving' },
    { num: 'Idea to', label: 'Execution Support' },
    { num: 'Endless', label: 'Opportunities Created' }
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="home-hero-section" style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <Scene3D />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.4em', marginBottom: '2rem', textTransform: 'uppercase', fontSize: '1rem' }}
          >
            Where Evolution Starts
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-radiant home-hero-title"
            style={{ 
              fontSize: 'min(8vw, 6rem)', 
              fontWeight: 900, 
              lineHeight: 1.1, 
              letterSpacing: '-0.02em', 
              marginBottom: '3rem',
              whiteSpace: 'nowrap'
            }}
          >
            LEARN. BUILD. GROW.
          </motion.h1>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }} style={{ marginTop: '3rem' }}>
            <a href="#what-we-do" className="btn btn-primary home-hero-btn" style={{ padding: '1.5rem 4rem', fontSize: '1.5rem', borderRadius: '100px', fontWeight: 800 }}>
              Discover Ugham <ArrowRight size={28} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. What Ugham Does (High-End Interactive Motion Timeline) */}
      <motion.section 
        id="what-we-do"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{ 
          minHeight: '800px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          padding: '80px 0 0 0', 
          overflow: 'hidden', 
          position: 'relative',
          background: 'var(--bg-body)'
        }}
      >
        {/* Subtle Background Motion (Gradient) */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle at 50% 50%, rgba(59,22,254,0.03) 0%, transparent 50%)',
          animation: 'slowSpin 30s linear infinite',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        {/* Top Text Content */}
        <div className="container" style={{ paddingBottom: '3rem', position: 'relative', zIndex: 1 }}>
          <motion.span variants={fadeUp} className="section-label" style={{ marginBottom: '0.5rem' }}>WHAT UGHAM DOES</motion.span>
          <motion.h2 variants={fadeUp} className="text-radiant" style={{ marginBottom: '1rem', textTransform: 'uppercase', animationDuration: '8s' }}>
            TRANSFORM IDEAS INTO REAL-WORLD SOLUTIONS
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: '880px', lineHeight: 1.6 }}>
            Ugham is an innovation studio that transforms ideas into real-world solutions. We work closely with students to help them move from concept to creation by guiding them through ideation, development, and scaling.
          </motion.p>
        </div>

        {/* Bottom Horizontal Motion Timeline */}
        <div className="container" style={{ position: 'relative', width: '100%', paddingBottom: '4rem', display: 'flex', overflow: 'hidden', zIndex: 1 }}>
          {/* Background Track Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', top: '50%', left: '1rem', right: '1rem', height: '1px', background: 'var(--border)', zIndex: 0, transformOrigin: 'left center' }} 
          />
          
          <motion.div className="phase-cards-row" style={{ display: 'flex', gap: '3rem', width: '100%' }}>
            {/* Phase 1: Ideation */}
            <motion.div variants={slideIn} className="phase-card-item" style={{ flex: 1, zIndex: 1 }}>
              <GlowCard glowColor="rgba(255, 51, 102, 0.4)" style={{ height: '350px' }}>
                <img src="/assets/img/ideation.png" alt="Ideation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                  <span style={{ background: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', display: 'inline-block' }}>PHASE 01</span>
                  <h3 style={{ color: 'white', margin: 0, fontSize: '1.25rem' }}>Ideation</h3>
                </div>
              </GlowCard>
            </motion.div>

            {/* Phase 2: Building */}
            <motion.div variants={slideIn} className="phase-card-item" style={{ flex: 1, zIndex: 1 }}>
              <GlowCard glowColor="rgba(0, 194, 255, 0.4)" style={{ height: '350px' }}>
                <img src="/assets/img/building.png" alt="Building" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                  <span style={{ background: 'var(--accent)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', display: 'inline-block' }}>PHASE 02</span>
                  <h3 style={{ color: 'white', margin: 0, fontSize: '1.25rem' }}>Building</h3>
                </div>
              </GlowCard>
            </motion.div>

            {/* Phase 3: Scaling */}
            <motion.div variants={slideIn} className="phase-card-item" style={{ flex: 1, zIndex: 1 }}>
              <GlowCard glowColor="rgba(59, 22, 254, 0.4)" style={{ height: '350px' }}>
                <img src="/assets/img/scope.png" alt="Scaling" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                  <span style={{ background: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', display: 'inline-block' }}>PHASE 03</span>
                  <h3 style={{ color: 'white', margin: 0, fontSize: '1.25rem' }}>Scaling</h3>
                </div>
              </GlowCard>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 3. Why Us (Interactive 3D Bridge Section) */}
      <motion.section 
        className="section--bg-light"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{ padding: '5rem 0 3rem 0', position: 'relative', overflow: 'hidden' }}
      >
        {/* Subtle Section Grid */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none', backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container">
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <motion.span variants={fadeUp} className="section-label" style={{ marginBottom: '0.5rem' }}>WHY US</motion.span>
            <motion.h2 variants={fadeUp} className="text-radiant" style={{ maxWidth: '1000px', margin: '0 auto', textTransform: 'uppercase' }}>
              WE DON'T JUST GUIDE, WE BUILD ALONGSIDE YOU
            </motion.h2>
          </div>
          
          <div className="why-us-row" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '2rem', paddingTop: '2rem' }}>
            {/* Left Block */}
            <motion.div 
              variants={fadeUp}
              onMouseEnter={() => setActiveSide('left')}
              onMouseLeave={() => setActiveSide(null)}
              className="why-us-left"
              style={{ flex: 1, textAlign: 'right', cursor: 'default' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginBottom: '1rem' }}>
                <h3 style={{ 
                  color: activeSide === 'left' ? 'var(--primary)' : 'var(--text)', 
                  margin: 0, 
                  textTransform: 'uppercase', 
                  fontSize: '1.25rem',
                  transition: 'color 0.4s ease'
                }}>
                  Beyond Imagination
                </h3>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: activeSide === 'left' ? 'var(--primary)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s ease', color: activeSide === 'left' ? 'white' : 'var(--text-muted)' }}>
                  <Lightbulb size={20} />
                </div>
              </div>
              <p style={{ 
                fontSize: '1rem', 
                color: 'var(--text-muted)', 
                lineHeight: 1.6,
                maxWidth: '380px',
                marginLeft: 'auto'
              }}>
                Most ideas never move beyond imagination. Ugham bridges that gap by providing the right ecosystem.
              </p>
            </motion.div>

            {/* Center 3D Flow */}
            <motion.div variants={fadeUp} className="why-us-center" style={{ flex: 1.2 }}>
              <FlowConnection activeSide={activeSide} />
            </motion.div>

            {/* Right Block */}
            <motion.div 
              variants={fadeUp}
              onMouseEnter={() => setActiveSide('right')}
              onMouseLeave={() => setActiveSide(null)}
              className="why-us-right"
              style={{ flex: 1, textAlign: 'left', cursor: 'default' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: activeSide === 'right' ? 'var(--accent)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s ease', color: activeSide === 'right' ? 'white' : 'var(--text-muted)' }}>
                  <CheckCircle2 size={20} />
                </div>
                <h3 style={{ 
                  color: activeSide === 'right' ? 'var(--accent)' : 'var(--text)', 
                  margin: 0, 
                  textTransform: 'uppercase', 
                  fontSize: '1.25rem',
                  transition: 'color 0.4s ease'
                }}>
                  Ecosystem & Mentorship
                </h3>
              </div>
              <p style={{ 
                fontSize: '1rem', 
                color: 'var(--text-muted)', 
                lineHeight: 1.6,
                maxWidth: '380px'
              }}>
                We provide the resources, mentorship, and opportunities to turn ideas into impactful innovations.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 4. The Innovation Journey (Morphing Liquid Surface) */}
      <section id="how-it-works">
        <MorphingSurface />
      </section>

      {/* 5. What You Can Build (Accordion) */}
      <AnimatedSection className="section--bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-label">POSSIBILITIES</span>
            <h2 className="text-radiant">WHAT YOU CAN BUILD WITH US</h2>
          </div>
          
          <div className="build-accordion" style={{ 
            display: 'flex', 
            height: '580px', 
            gap: '1.25rem', 
            width: '100%',
            perspective: '1000px',
            contain: 'layout paint'
          }}>
            {accordions.map((item, index) => {
              const isActive = activeAccordion === index;
              return (
                <motion.div 
                  key={index}
                  className="build-accordion-item"
                  onMouseEnter={() => setActiveAccordion(index)}
                  layout
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.22, 1, 0.36, 1],
                    layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                  }}
                  style={{
                    position: 'relative', 
                    flex: isActive ? 5 : 1, 
                    borderRadius: '24px',
                    overflow: 'hidden', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    flexDirection: 'column',
                    background: 'var(--white)',
                    border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                    boxShadow: isActive ? '0 30px 60px -12px rgba(0, 0, 0, 0.15)' : 'none',
                    willChange: 'flex, transform, opacity',
                    zIndex: isActive ? 2 : 1,
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    contain: 'layout paint'
                  }}
                >
                  {/* Image Section - Stabilized Height */}
                  <div style={{ 
                    width: '100%', 
                    height: '350px', // Fixed height for consistency
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                    transition: 'opacity 0.6s ease',
                    opacity: isActive ? 1 : 0.12,
                    transform: 'translateZ(0)'
                  }}>
                    <motion.div
                      animate={{ scale: isActive ? 1.08 : 1 }}
                      transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                      style={{ width: '100%', height: '100%', transform: 'translateZ(0)' }}
                    >
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          backfaceVisibility: 'hidden'
                        }} 
                      />
                    </motion.div>
                    
                    {!isActive && (
                      <div style={{
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%) rotate(-90deg)',
                        whiteSpace: 'nowrap', 
                        fontSize: '1.25rem', 
                        fontWeight: 700, 
                        color: 'var(--text-muted)',
                        zIndex: 2,
                        letterSpacing: '0.1em',
                        pointerEvents: 'none',
                        backfaceVisibility: 'hidden'
                      }}>
                        {item.title}
                      </div>
                    )}
                  </div>

                  {/* Text Content Section - Non-layout triggering expansion */}
                  <div style={{ 
                    flexGrow: 1,
                    background: 'white',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}>
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div 
                          key="content"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ 
                            padding: '2rem 2.5rem', 
                            transform: 'translateZ(0)'
                          }}
                        >
                          <motion.h3 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary)', fontWeight: 800, letterSpacing: '-0.02em' }}
                          >
                            {item.title}
                          </motion.h3>
                          <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{ fontSize: '1.05rem', color: 'var(--text)', lineHeight: 1.5, margin: 0, opacity: 0.7 }}
                          >
                            {item.desc}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* 6. Core Expertise (Kinetic Grid 3D) */}
      <KineticGridExpertise />

      {/* 7. Club Highlights (Fluid Topography 3D) */}
      <FluidTopographyHighlights />


      {/* 7. Impact Counters */}
      <AnimatedSection className="section" style={{ background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(59, 22, 254, 0.03) 0%, transparent 50%)',
          zIndex: 0
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header text-center" style={{ marginBottom: '5rem' }}>
            <span className="section-label">OUR IMPACT</span>
            <h2 className="text-radiant" style={{ fontSize: '3rem', fontWeight: 900 }}>BUILDING A GENERATION OF CREATORS</h2>
          </div>

          <div className="home-impact-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '3rem',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {impactStats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0.8 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -4, 
                  opacity: 1 
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ 
                  textAlign: 'left',
                  cursor: 'default',
                  padding: '1rem',
                  borderLeft: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div className="text-radiant" style={{ 
                  fontSize: '3.5rem', 
                  fontWeight: 900, 
                  lineHeight: 1,
                  letterSpacing: '-0.02em'
                }}>
                  {stat.num}
                </div>
                <div>
                  <div style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 700, 
                    color: 'var(--text)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em'
                  }}>
                    {stat.label.split(' ')[0]} {stat.label.split(' ')[1]}
                  </div>
                  <div style={{ 
                    fontSize: '1rem', 
                    color: 'var(--text-muted)', 
                    lineHeight: 1.5,
                    maxWidth: '200px'
                  }}>
                    {stat.label.split(' ').slice(2).join(' ')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 8. Get Started & Partner (Editorial Workspace 3D-Sync) */}
      <EditorialWorkspace />

    </div>
  );
};

export default Home;
