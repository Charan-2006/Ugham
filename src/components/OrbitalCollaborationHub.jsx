import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Globe, Linkedin, Instagram, Share2 } from 'lucide-react';

const OrbitalNode = ({ icon: Icon, label, index, total, activeIndex, setActiveIndex }) => {
  const angle = (index / total) * Math.PI * 2;
  const radius = 220;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const isActive = activeIndex === index;

  return (
    <div style={{ 
      position: 'absolute', 
      left: '50%', 
      top: '50%', 
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      zIndex: 10
    }}>
      <motion.div
        onMouseEnter={() => setActiveIndex(index)}
        animate={{ 
          scale: isActive ? 1.2 : 1,
          backgroundColor: isActive ? '#3b16fe' : '#ffffff',
          color: isActive ? '#ffffff' : '#3b16fe'
        }}
        style={{
          width: '60px', 
          height: '60px',
          border: '1px solid #f1f5f9',
          borderRadius: '50%',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          cursor: 'pointer'
        }}
      >
        <Icon size={22} />
      </motion.div>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'absolute', 
              top: '70px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              background: '#0f172a',
              color: '#ffffff',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              fontSize: '0.65rem',
              fontWeight: 900,
              letterSpacing: '0.1em'
            }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const OrbitalCollaborationHub = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nodes = [
    { icon: Mail, label: 'EMAIL', value: 'info@ugham.com' },
    { icon: Phone, label: 'PHONE', value: '+91 86678 39838' },
    { icon: Linkedin, label: 'LINKEDIN', value: 'Ugham Network' },
    { icon: Instagram, label: 'INSTAGRAM', value: '@ugham_official' },
    { icon: Globe, label: 'WEBSITE', value: 'www.ugham.com' },
    { icon: Share2, label: 'SOCIAL', value: 'Connect Now' }
  ];

  const collabs = [
    'Institutional Partnerships',
    'Industry Collaborations',
    'Mentorship Workshops',
    'Startup Incubation'
  ];

  return (
    <section className="section--bg-light" style={{ padding: '150px 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left: Info Panel */}
          <div>
            <h2 className="text-radiant" style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '2.5rem' }}>
              ORBITAL <br />
              CONNECTIVITY.
            </h2>
            
            <div style={{ background: '#ffffff', padding: '3.5rem', borderRadius: '4px', border: '1px solid #f1f5f9', boxShadow: '0 20px 60px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '2rem', color: '#0f172a' }}>PARTNERSHIP CHANNELS</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                {collabs.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '6px', height: '6px', background: 'linear-gradient(135deg, #FF3366, #3b16fe)', borderRadius: '50%' }} />
                    <span style={{ fontWeight: 600, color: '#4A4A4A', fontSize: '0.9rem' }}>{c}</span>
                  </div>
                ))}
              </div>
              <div style={{ height: '1px', width: '100%', background: '#f1f5f9', marginBottom: '2.5rem' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94a3b8', letterSpacing: '0.1em' }}>ACTIVE CONTACT CHANNEL</span>
                <p style={{ margin: 0, color: '#3b16fe', fontWeight: 900, fontSize: '1.25rem' }}>
                  {nodes[activeIndex].value}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Orbital Switchboard */}
          <div style={{ position: 'relative', height: '550px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Background Decor */}
            <div style={{ position: 'absolute', width: '440px', height: '440px', border: '1px dashed #e2e8f0', borderRadius: '50%', opacity: 0.5 }} />
            
            {/* Central Brand Hub */}
            <motion.div
              animate={{ boxShadow: ['0 0 20px rgba(59, 22, 254, 0.1)', '0 0 40px rgba(59, 22, 254, 0.2)', '0 0 20px rgba(59, 22, 254, 0.1)'] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                width: '160px', height: '160px',
                background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 5,
                color: '#ffffff'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.2em', opacity: 0.8, marginBottom: '0.2rem' }}>CORE</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>UGHAM</div>
              </div>
            </motion.div>

            {/* Orbital Nodes */}
            {nodes.map((node, i) => (
              <OrbitalNode 
                key={i}
                index={i}
                total={nodes.length}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                {...node}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default OrbitalCollaborationHub;
