import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import CoreOfferings3DGrid from '../components/CoreOfferings3DGrid';
import SaaSTimeline from '../components/SaaSTimeline';
import KineticLightPathInterface from '../components/KineticLightPathInterface';

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
      {/* Hero: Large-Scale Premium Editorial */}
      <section className="section gpu-accel" style={{ background: 'radial-gradient(circle at 20% 30%, rgba(120, 80, 255, 0.05), transparent 60%)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">WHAT WE DO</span>
            <h1 className="text-radiant">
              TURNING IDEAS<br />INTO REALITY
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            At Ugham, we turn ideas into reality. As an innovation studio, we work closely with students to help them learn, build, and grow into creators of meaningful solutions. From the earliest spark of an idea to building scalable ventures, we guide every step of the journey.
          </motion.p>
        </div>
      </section>

      {/* Services / Core Offering (3D Interactive Grid) */}
      <CoreOfferings3DGrid />

      {/* Roadmap (SaaS Premium Timeline) */}
      <SaaSTimeline />

      {/* Who We Serve (Kinetic Light-Path Interface) */}
      <KineticLightPathInterface />
    </div>
  );
};

export default WhatWeDo;
