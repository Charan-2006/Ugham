import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Globe, Share2, ArrowUpRight, ArrowRight } from 'lucide-react';

const ContactCard = ({ title, value, icon: Icon, delay, type = 'default' }) => {
  const isAction = type === 'action';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      whileHover={{ y: -10 }}
      style={{
        background: isAction ? 'linear-gradient(135deg, #FF3366, #3b16fe)' : '#ffffff',
        padding: '3rem',
        borderRadius: '4px',
        border: '1px solid #f1f5f9',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxShadow: '0 20px 40px rgba(0,0,0,0.02)'
      }}
    >
      <div>
        <div style={{ 
          width: '50px', height: '50px', 
          borderRadius: '4px', 
          background: isAction ? 'rgba(255,255,255,0.1)' : 'rgba(59,22,254,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isAction ? '#ffffff' : '#3b16fe',
          marginBottom: '2rem'
        }}>
          <Icon size={24} />
        </div>
        <h4 style={{ 
          fontSize: '0.75rem', fontWeight: 900, 
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: isAction ? 'rgba(255,255,255,0.6)' : '#94a3b8',
          marginBottom: '0.5rem'
        }}>
          {title}
        </h4>
        <p style={{ 
          fontSize: '1.25rem', fontWeight: 800, 
          color: isAction ? '#ffffff' : '#0f172a',
          margin: 0
        }}>
          {value}
        </p>
      </div>
      <ArrowUpRight size={20} color={isAction ? 'rgba(255,255,255,0.4)' : '#e2e8f0'} />
    </motion.div>
  );
};

const Contact = () => {
  const collabs = [
    'Institutional Partnerships',
    'Industry Collaborations',
    'Mentorship Workshops',
    'Startup Incubation'
  ];

  return (
    <div style={{ background: '#ffffff' }}>
      {/* 1. Hero */}
      <section className="section" style={{ padding: '150px 0 100px' }}>
        <div className="container">
          <div style={{ maxWidth: '900px' }}>
            <p className="section-label" style={{ marginBottom: '2rem' }}>CONTACT US</p>
            <h1 className="text-radiant" style={{ 
              fontSize: 'clamp(3rem, 8vw, 5.5rem)', 
              fontWeight: 900, 
              lineHeight: 1,
              marginBottom: '2rem',
              letterSpacing: '-0.03em'
            }}>
              WHERE<br />EVOLUTION<br />STARTS
            </h1>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2.5rem', color: '#0f172a', letterSpacing: '-0.02em' }}>
              LEARN. BUILD. GROW.
            </h2>
            <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #FF3366, #3b16fe)', marginBottom: '2.5rem' }} />
            <p style={{ maxWidth: '650px', fontSize: '1.4rem', color: '#4A4A4A', lineHeight: 1.6, fontWeight: 500 }}>
              We’d love to hear from you. Whether you’re a student, institution, partner, or innovator, connect with us to start your journey with Ugham.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Innovative Architectural Grid */}
      <section className="section--bg-light" style={{ padding: '120px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(12, 1fr)', 
            gap: '1.5rem',
            gridAutoRows: 'minmax(320px, auto)'
          }}>
            
            {/* Title Section */}
            <div style={{ gridColumn: 'span 8' }}>
              <div style={{ padding: '2rem 0' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: '2.5rem' }}>
                  REACH OUT AND LET’S BUILD <br />
                  SOMETHING IMPACTFUL <br />
                  <span className="text-radiant">TOGETHER.</span>
                </h2>
                <div style={{ background: '#ffffff', padding: '3rem', borderRadius: '4px', border: '1px solid #f1f5f9' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1.5rem' }}>FOR COLLABORATIONS</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {collabs.map((c, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '6px', height: '6px', background: '#3b16fe', borderRadius: '50%' }} />
                        <span style={{ fontWeight: 600, color: '#4A4A4A', fontSize: '0.95rem' }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Method Decks */}
            <div style={{ gridColumn: 'span 4' }}>
              <ContactCard title="Email" value="info@ugham.com" icon={Mail} delay={0.1} type="action" />
            </div>
            
            <div style={{ gridColumn: 'span 4' }}>
              <ContactCard title="LinkedIn" value="Ugham Network" icon={Globe} delay={0.2} />
            </div>
            <div style={{ gridColumn: 'span 4' }}>
              <ContactCard title="Instagram" value="@ugham_official" icon={Share2} delay={0.3} />
            </div>
            <div style={{ gridColumn: 'span 4' }}>
              <ContactCard title="Phone" value="+91 86678 39838" icon={Phone} delay={0.4} />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Start Your Journey CTA */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #FF3366, #3b16fe)', color: 'white', textAlign: 'center', padding: '120px 0' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>START YOUR JOURNEY</h2>
          <p style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto 3rem', color: 'rgba(255,255,255,0.9)' }}>
            At Ugham, we help you turn ideas into innovations and innovations into ventures. Let’s learn, build, and grow together.
          </p>
          <a href="/" className="btn" style={{ background: 'white', color: '#3b16fe', padding: '1.25rem 3.5rem', fontSize: '1.25rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            Explore Ugham <ArrowRight size={24} style={{ marginLeft: '1rem' }} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
