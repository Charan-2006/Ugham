import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import ArchitecturalFloatingPanels from '../components/ArchitecturalFloatingPanels';
import WhyPartnerParallax from '../components/WhyPartnerParallax';
import PartnerHoneycombGrid from '../components/PartnerHoneycombGrid';
import InnovationClubBanner from '../components/InnovationClubBanner';

const Collaboration = () => {
  const whoCanCollab = [
    'Educational Institutions (Colleges & Universities)',
    'Industry Partners (Product & Service-Based Companies)',
    'Incubation Centers & Accelerators',
    'Government & Startup Ecosystem Bodies',
    'Investors (VCs, Angel Networks, Investor Forums)',
    'Mentors (Industry Experts, Founders, Academicians, Professionals)'
  ];

  const whyPartner = [
    'Direct access to high-potential student innovators and ideas',
    'Opportunities for talent scouting and recruitment',
    'Brand visibility across national-level innovation platforms',
    'Early access to breakthrough products and startups',
    'Opportunities for long-term engagement, advisory roles, and collaborations',
    'Contribution to building the next generation of entrepreneurs and innovators'
  ];

  const partners = [
    { title: 'Industry Partners', desc: 'Support innovation through technology, mentorship, and internships while gaining access to emerging talent and ideas.' },
    { title: 'Incubation Partners', desc: 'Provide incubation, mentorship, and scaling support for promising student startups.' },
    { title: 'Ecosystem Partners', desc: 'Enable awareness, policy guidance, and support through government and startup ecosystem initiatives.' },
    { title: 'Investment Partners', desc: 'Discover and invest in high-potential early-stage innovations and student-led startups.' },
    { title: 'Mentor / Knowledge Partners', desc: 'Guide, mentor, and shape the next generation of innovators through expertise and experience.' }
  ];

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Hero: Innovation Grows Through Collaboration */}
      <section className="section gpu-accel" style={{ 
        padding: '120px 0', 
        background: 'radial-gradient(circle at 10% 20%, rgba(120, 80, 255, 0.05), transparent 50%)'
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">COLLABORATION OPPORTUNITIES</span>
            <h1 className="text-radiant" style={{ 
              maxWidth: '900px', 
              textAlign: 'left', 
              margin: '0 0 32px 0',
              lineHeight: 1.1 
            }}>
              INNOVATION GROWS<br />THROUGH COLLABORATION
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              maxWidth: '620px', 
              textAlign: 'left', 
              fontSize: '1.125rem', 
              color: 'var(--text-muted)', 
              lineHeight: 1.7,
              margin: 0
            }}
          >
            We partner with institutions, industry leaders, incubators, investors, and experts to empower students to learn, build, and grow into impactful innovators.
          </motion.p>
        </div>
      </section>

      {/* Who Can Collaborate (Architectural Floating Panels) */}
      <ArchitecturalFloatingPanels />

      {/* Why Partner (Parallax Grid) */}
      <WhyPartnerParallax />

      {/* Our Partners (Refined Honeycomb Grid) */}
      <PartnerHoneycombGrid />

      {/* Innovation Club (Premium Banner) */}
      <InnovationClubBanner />
    </div>
  );
};

export default Collaboration;
