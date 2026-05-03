import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Globe, Share2, ArrowUpRight, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.12 } }
};

const useMobile = () => {
  const [isMobile, React_useState] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => React_useState(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const ContactCard = ({ title, value, icon: Icon, type = 'default', isMobile }) => {
  const isAction = type === 'action';
  
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-60px' }}
      whileHover={isMobile ? "initial" : { y: -10, boxShadow: '0 30px 60px rgba(59,22,254,0.08)' }}
      style={{
        background: isAction ? 'linear-gradient(135deg, #FF3366, #3b16fe)' : '#ffffff',
        padding: isMobile ? '2rem' : '3rem',
        borderRadius: '12px',
        border: '1px solid #f1f5f9',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxShadow: '0 20px 40px rgba(0,0,0,0.02)',
        boxSizing: 'border-box'
      }}
    >
      <div>
        <div style={{ 
          width: '50px', height: '50px', 
          borderRadius: '8px', 
          background: isAction ? 'rgba(255,255,255,0.1)' : 'rgba(59,22,254,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isAction ? '#ffffff' : '#3b16fe',
          marginBottom: isMobile ? '1.5rem' : '2rem'
        }}>
          <Icon size={24} />
        </div>
        <h4 style={{ 
          fontSize: '0.7rem', fontWeight: 900, 
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: isAction ? 'rgba(255,255,255,0.6)' : '#94a3b8',
          marginBottom: '0.5rem'
        }}>
          {title}
        </h4>
        <p style={{ 
          fontSize: isMobile ? '1.1rem' : '1.25rem', fontWeight: 800, 
          color: isAction ? '#ffffff' : '#0f172a',
          margin: 0,
          wordBreak: 'break-word'
        }}>
          {value}
        </p>
      </div>
      {!isMobile && <ArrowUpRight size={20} color={isAction ? 'rgba(255,255,255,0.4)' : '#e2e8f0'} />}
    </motion.div>
  );
};

const Contact = () => {
  const isMobile = useMobile();
  const collabs = [
    'Institutional Partnerships',
    'Industry Collaborations',
    'Mentorship Workshops',
    'Startup Incubation'
  ];

  return (
    <div style={{ background: '#ffffff', overflowX: 'hidden' }}>
      {/* 1. Hero */}
      <section className="section" style={{ padding: isMobile ? '100px 0 60px' : '150px 0 100px', marginTop: isMobile ? '120px' : '0' }}>
        <div className="container" style={{ padding: isMobile ? '0 1.5rem' : '0 2rem' }}>
          <motion.div
            style={{ maxWidth: '900px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: isMobile ? '1rem' : '2rem' }}>
              CONTACT US
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-radiant"
              style={{ 
                fontSize: isMobile ? '3.5rem' : 'clamp(3rem, 8vw, 5.5rem)', 
                fontWeight: 900, 
                lineHeight: 1,
                marginBottom: isMobile ? '1.5rem' : '2rem',
                letterSpacing: '-0.03em'
              }}
            >
              WHERE<br />EVOLUTION<br />STARTS
            </motion.h1>
            <motion.h2
              variants={fadeUp}
              style={{ fontSize: isMobile ? '1.5rem' : '2.5rem', fontWeight: 800, marginBottom: isMobile ? '1.5rem' : '2.5rem', color: '#0f172a', letterSpacing: '-0.02em' }}
            >
              LEARN. BUILD. GROW.
            </motion.h2>
            <motion.div
              variants={fadeIn}
              style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #FF3366, #3b16fe)', marginBottom: isMobile ? '1.5rem' : '2.5rem' }}
            />
            <motion.p
              variants={fadeUp}
              style={{ maxWidth: '650px', fontSize: isMobile ? '1.1rem' : '1.4rem', color: '#4A4A4A', lineHeight: 1.6, fontWeight: 500 }}
            >
              We'd love to hear from you. Whether you're a student, institution, partner, or innovator, connect with us to start your journey with Ugham.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. Architectural Grid */}
      <section className="section--bg-light" style={{ padding: isMobile ? '60px 0' : '120px 0' }}>
        <div className="container" style={{ padding: isMobile ? '0 1.5rem' : '0 2rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(12, 1fr)', 
            gap: isMobile ? '1rem' : '1.5rem',
            gridAutoRows: isMobile ? 'auto' : 'minmax(320px, auto)'
          }}>
            
            {/* Title + Collab */}
            <div style={{ gridColumn: isMobile ? 'span 12' : 'span 8' }}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-80px' }}
                variants={staggerContainer}
                style={{ padding: isMobile ? '1rem 0' : '2rem 0' }}
              >
                <motion.h2
                  variants={fadeUp}
                  style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: isMobile ? '1.5rem' : '2.5rem' }}
                >
                  REACH OUT AND LET'S BUILD <br />
                  SOMETHING IMPACTFUL <br />
                  <span className="text-radiant">TOGETHER.</span>
                </motion.h2>

                <motion.div
                  variants={fadeUp}
                  style={{ background: '#ffffff', padding: isMobile ? '1.5rem' : '3rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}
                >
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1.5rem' }}>FOR COLLABORATIONS</h3>
                  <motion.div
                    variants={staggerContainer}
                    style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '1rem' : '1.5rem' }}
                  >
                    {collabs.map((c, i) => (
                      <motion.div key={i} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '6px', height: '6px', background: '#3b16fe', borderRadius: '50%' }} />
                        <span style={{ fontWeight: 600, color: '#4A4A4A', fontSize: '0.9rem' }}>{c}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Email Card */}
            <div style={{ gridColumn: isMobile ? 'span 12' : 'span 4' }}>
              <ContactCard title="Email" value="info@ugham.com" icon={Mail} type="action" isMobile={isMobile} />
            </div>
            
            {/* Secondary Cards */}
            <div style={{ gridColumn: isMobile ? 'span 12' : 'span 4' }}>
              <ContactCard title="LinkedIn" value="Ugham Network" icon={Globe} isMobile={isMobile} />
            </div>
            <div style={{ gridColumn: isMobile ? 'span 12' : 'span 4' }}>
              <ContactCard title="Instagram" value="@ugham_official" icon={Share2} isMobile={isMobile} />
            </div>
            <div style={{ gridColumn: isMobile ? 'span 12' : 'span 4' }}>
              <ContactCard title="Phone" value="+91 86678 39838" icon={Phone} isMobile={isMobile} />
            </div>

          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <motion.section
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ background: 'linear-gradient(135deg, #FF3366, #3b16fe)', color: 'white', textAlign: 'center', padding: isMobile ? '80px 0' : '120px 0' }}
      >
        <div className="container" style={{ padding: isMobile ? '0 1.5rem' : '0 2rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ color: 'white', fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, marginBottom: '2rem', lineHeight: 1 }}
          >
            START YOUR JOURNEY
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', maxWidth: '800px', margin: '0 auto 3rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.4 }}
          >
            At Ugham, we help you turn ideas into innovations and innovations into ventures. Let's learn, build, and grow together.
          </motion.p>
          <motion.a
            href="/"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="btn"
            style={{ 
              background: 'white', 
              color: '#3b16fe', 
              padding: isMobile ? '1rem 2rem' : '1.25rem 3.5rem', 
              fontSize: isMobile ? '1.1rem' : '1.25rem', 
              fontWeight: 800, 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: isMobile ? '100%' : 'auto',
              boxSizing: 'border-box'
            }}
          >
            Explore Ugham <ArrowRight size={24} style={{ marginLeft: '1rem' }} />
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
