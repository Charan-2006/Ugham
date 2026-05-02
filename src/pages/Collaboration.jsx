import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

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
      {/* Hero */}
      <section className="section text-center">
        <div className="container">
          <p className="section-label">COLLABORATION OPPORTUNITIES</p>
          <h1 className="text-radiant" style={{ maxWidth: '900px', margin: '0 auto 1.5rem' }}>
            INNOVATION GROWS THROUGH COLLABORATION
          </h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', color: 'var(--text-muted)' }}>
            We partner with institutions, industry leaders, incubators, investors, and experts to empower students to learn, build, and grow into impactful innovators.
          </p>
        </div>
      </section>

      {/* Who Can Collaborate (List Layout) */}
      <AnimatedSection className="section--bg-light">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <span className="section-label">NETWORK</span>
            <h2 className="text-radiant" style={{ marginBottom: '2rem' }}>WHO CAN COLLABORATE WITH US</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {whoCanCollab.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.125rem', fontWeight: 500 }}>
                  <div style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '2px' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: '1 1 400px' }}>
             <img src="/assets/img/service/1.jpg" alt="Collaboration" style={{ borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} onError={(e) => e.target.style.display='none'} />
          </div>
        </div>
      </AnimatedSection>

      {/* Why Partner (Zig-Zag) */}
      <AnimatedSection className="section">
        <div className="container">
          <div className="section-header text-center" style={{ margin: '0 auto 4rem' }}>
            <span className="section-label">VALUE PROPOSITION</span>
            <h2 className="text-radiant">WHY PARTNER WITH UGHAM</h2>
            <p>Partnering with Ugham gives you access to a fast-growing student innovation ecosystem.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {whyPartner.map((reason, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="glass-card" style={{ borderTop: '4px solid var(--accent)' }}>
                <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Our Partners (Honeycomb Grid) */}
      <AnimatedSection className="section--bg-light">
        <div className="container text-center">
          <div className="section-header" style={{ margin: '0 auto 4rem' }}>
            <span className="section-label">CATEGORIES</span>
            <h2 className="text-radiant">OUR PARTNERS</h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '2rem' }}>
            {partners.map((partner, index) => (
              <motion.div
                key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'var(--primary)', color: 'white' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{
                  width: '280px', height: '300px',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: 'var(--white)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  textAlign: 'center', padding: '2rem', cursor: 'pointer', margin: '-30px 10px', position: 'relative'
                }}
                className="honeycomb-cell"
              >
                <div style={{ position: 'absolute', inset: '2px', zIndex: -1, background: 'var(--white)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                <h3 style={{ color: 'inherit', marginBottom: '1rem', transition: 'color 0.3s' }}>{partner.title}</h3>
                <p style={{ color: 'inherit', fontSize: '0.875rem', transition: 'color 0.3s' }}>{partner.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Institution Partners CTA */}
      <AnimatedSection className="section" style={{ background: 'linear-gradient(135deg, #0a0f1d, #1a1b4b)', color: 'white' }}>
        <div className="container text-center">
          <h2 style={{ color: 'white', marginBottom: '2rem', fontSize: '2.5rem' }}>INSTITUTION PARTNERS</h2>
          <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>(Ugham Innovation Club)</h3>
          <p style={{ maxWidth: '800px', margin: '0 auto 3rem', fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)' }}>
            We partner with institutions to establish the Ugham Innovation Club, creating an on-campus ecosystem where students learn, build, and grow by turning ideas into real-world innovations and ventures.
          </p>
          <a href="/contact" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>Start a Club at Your Institution</a>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Collaboration;
