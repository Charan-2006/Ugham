import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Globe, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

const ContactCard = ({ title, value, icon: Icon, delay, type = 'default' }) => {
  const isAction = type === 'action';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, boxShadow: '0 30px 60px rgba(0,0,0,0.04)' }}
      style={{
        background: isAction ? 'linear-gradient(135deg, #FF3366, #3b16fe)' : '#ffffff',
        padding: '3rem',
        borderRadius: '4px',
        border: '1px solid #f1f5f9',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer'
      }}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
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
          margin: 0, wordBreak: 'break-all'
        }}>
          {value}
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 2, marginTop: '2rem' }}>
        <ArrowUpRight size={20} color={isAction ? 'rgba(255,255,255,0.4)' : '#e2e8f0'} />
      </div>

      {/* Abstract Background Decor */}
      {!isAction && (
        <div style={{ 
          position: 'absolute', bottom: '-10%', right: '-10%',
          fontSize: '8rem', fontWeight: 900, color: '#f8fafc',
          zIndex: 0, pointerEvents: 'none'
        }}>
          {title[0]}
        </div>
      )}
    </motion.div>
  );
};

const CollaborationStation = ({ title, items }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      style={{
        background: '#ffffff',
        border: '1px solid #f1f5f9',
        borderRadius: '4px',
        padding: '4rem',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        boxShadow: '0 20px 80px rgba(0,0,0,0.02)'
      }}
    >
      <div>
        <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '1.5rem' }}>{title}</h3>
        <div style={{ width: '40px', height: '4px', background: 'linear-gradient(90deg, #FF3366, #3b16fe)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b16fe' }} />
            <span style={{ fontWeight: 600, color: '#4A4A4A' }}>{item}</span>
          </div>
        ))}
      </div>

      <p style={{ margin: 0, color: '#94a3b8', fontStyle: 'italic', fontSize: '0.95rem' }}>
        “Write to us with your proposal, and our team will get back to you.”
      </p>
    </motion.div>
  );
};

const ArchitecturalContactGrid = () => {
  const collabs = [
    'Institutional Partnerships',
    'Industry Collaborations',
    'Mentorship Workshops',
    'Startup Incubation',
    'Investment Opportunities',
    'Global Research'
  ];

  return (
    <section className="section--bg-light" style={{ padding: '150px 0' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '1.5rem',
          gridAutoRows: 'minmax(350px, auto)'
        }}>
          
          {/* Main Title Station */}
          <div style={{ gridColumn: 'span 7' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ padding: '2rem 0' }}
            >
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: '2rem' }}>
                REACH OUT AND LET’S BUILD <br />
                SOMETHING IMPACTFUL <br />
                <span className="text-radiant">TOGETHER.</span>
              </h2>
              <p style={{ fontSize: '1.25rem', color: '#4A4A4A', maxWidth: '500px' }}>
                Have an idea? Want to collaborate? Looking to partner with us? Choose your channel.
              </p>
            </motion.div>
          </div>

          {/* Social Connects */}
          <div style={{ gridColumn: 'span 5', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <ContactCard title="LinkedIn" value="Ugham Network" icon={Linkedin} delay={0.1} />
            <ContactCard title="Instagram" value="@ugham_official" icon={Instagram} delay={0.2} />
          </div>

          {/* Collaboration Module */}
          <div style={{ gridColumn: 'span 8' }}>
            <CollaborationStation title="FOR COLLABORATIONS" items={collabs} />
          </div>

          {/* Core Contact Decks */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <ContactCard title="Email" value="info@ugham.com" icon={Mail} delay={0.3} type="action" />
            <ContactCard title="Phone" value="+91 86678 39838" icon={Phone} delay={0.4} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArchitecturalContactGrid;
