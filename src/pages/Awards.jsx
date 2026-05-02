import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, CheckSquare, Award, Users, Mic, Briefcase } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Awards = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const dates = [
    'May 9 & 10', 'May 23 & 24', 'June 6 & 7', 'June 20 & 21',
    'July 4 & 5', 'July 18 & 19', 'Aug 1 & 2', 'Aug 15 & 16',
    'Aug 29 & 30', 'Sept 12 & 13'
  ];

  const rules = [
    'Participation allowed as Individual or Team (2–5 members)',
    'Each team can submit only one idea/project',
    'Idea must be original (no plagiarism)',
    'PPT submission is mandatory',
    'For project Pitch project demo mandatory (Idea pitch demo is not mandatory)',
    'Teams must be ready for online presentation',
    'Pitch time: 3–5 minutes + Q&A',
    'Follow event schedule strictly',
    'Judges’ decision will be final'
  ];

  const benefits = [
    'Cash prizes (Cash Pool of Rs 1,00,000)',
    'Participation Certificate',
    'Top-performing teams in each round receive internship opportunities',
    'Get Mentorship from Industry experts for further development',
    'Top Ideas & Projects Receive Funding for Patent Filing',
    'Exclusive Ugham Trophy of Excellence Award for top-performing innovators.',
    'Pitch in front of investors for funding for product development',
    'Get Incubated in Top Incubation for grants & further development opportunities'
  ];

  const highlights = [
    { title: 'Final Pitching', items: ['Idea pitch', 'Prototype Pitch'], icon: <Mic /> },
    { title: 'Panel Discussions', items: ['Investor Panel', 'Student Founder Panel', 'Women Entrepreneur Panel', 'Government Startup Opportunity Sessions'], icon: <Users /> },
    { title: 'Networking & Expo', items: ['Networking Hall with Incubation Managers, Investors', 'Startup & Company Product Expo'], icon: <Briefcase /> }
  ];

  return (
    <div>
      {/* 1. Dark Mode Hero */}
      <section style={{ padding: '150px 0 100px', background: 'linear-gradient(135deg, #0a0f1d, #1a1b4b)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, type: 'spring' }}>
            <Trophy size={80} color="#FF3366" style={{ margin: '0 auto 2rem' }} />
          </motion.div>
          <p className="section-label" style={{ color: 'var(--accent)' }}>NATIONAL AWARDS FOR STUDENT INNOVATION</p>
          <h1 style={{ color: 'white', fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            UGHAM INNOVATION AWARDS 2026
          </h1>
          <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.8)', maxWidth: '800px', margin: '0 auto' }}>
            Empowering the Next Generation of Innovators
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <h3 style={{ color: 'white', margin: 0 }}>Idea Pitch (Idea Stage)</h3>
              <p style={{ color: '#FF3366', margin: 0, fontWeight: 700 }}>249 Rs reg fee per member</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <h3 style={{ color: 'white', margin: 0 }}>Prototype Pitch (Working Model)</h3>
              <p style={{ color: '#00C2FF', margin: 0, fontWeight: 700 }}>299 Rs reg fee per member</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Event Structure & Important Dates */}
      <AnimatedSection className="section--bg-light">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          <div style={{ flex: '1 1 400px' }}>
            <span className="section-label">STRUCTURE</span>
            <h2 className="text-radiant" style={{ marginBottom: '2rem' }}>EVENT STRUCTURE & DATES</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.125rem' }}>
              <li><strong>Conducted on every alternate Saturday & Sunday online.</strong></li>
              <li>Offline audition rounds will be conducted in collaboration with colleges.</li>
              <li>Only first 25 teams will pitch in each category.</li>
              <li>Program runs till second week of September.</li>
              <li><strong>Grand Final on 19th of September.</strong></li>
              <li>Individual participation not allowed. Cross-college teams and Pan-India participation allowed.</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <div className="glass-card" style={{ height: '100%', overflowY: 'auto', maxHeight: '400px' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}><Calendar /> SCHEDULE</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {dates.map((date, i) => (
                  <div key={i} style={{ padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center', fontWeight: 600 }}>{date}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. Rules & Guidelines (Accordions) */}
      <AnimatedSection className="section">
        <div className="container">
          <div className="section-header text-center" style={{ margin: '0 auto 4rem' }}>
            <span className="section-label">REQUIREMENTS</span>
            <h2 className="text-radiant">RULES & GUIDELINES</h2>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {rules.map((rule, i) => (
              <div key={i} style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CheckSquare color="var(--primary)" />
                <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: 500 }}>{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 4. Participant Benefits */}
      <AnimatedSection className="section--bg-light">
        <div className="container text-center">
          <span className="section-label">REWARDS</span>
          <h2 className="text-radiant" style={{ marginBottom: '4rem' }}>PARTICIPANT BENEFITS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {benefits.map((benefit, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="glass-card" style={{ borderTop: '4px solid var(--accent)' }}>
                <Award color="var(--primary)" size={32} style={{ marginBottom: '1rem' }} />
                <p style={{ margin: 0, fontWeight: 600 }}>{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 5. Final Program Highlights */}
      <AnimatedSection className="section">
        <div className="container text-center">
          <span className="section-label">THE CLIMAX</span>
          <h2 className="text-radiant" style={{ marginBottom: '4rem' }}>GRAND FINALE HIGHLIGHTS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {highlights.map((hl, i) => (
              <div key={i} className="glass-card" style={{ textAlign: 'left' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{hl.icon}</div>
                <h3 style={{ marginBottom: '1rem' }}>{hl.title}</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.5rem' }}>
                  {hl.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Awards;
