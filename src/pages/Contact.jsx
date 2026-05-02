import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Contact = () => {
  return (
    <div style={{ paddingTop: '100px' }}>
      {/* 1. Hero */}
      <section className="section text-center">
        <div className="container">
          <p className="section-label">CONTACT US</p>
          <h1 className="text-radiant" style={{ maxWidth: '800px', margin: '0 auto 1.5rem' }}>
            WHERE EVOLUTION STARTS
          </h1>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text)' }}>LEARN. BUILD. GROW.</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.25rem', color: 'var(--text-muted)' }}>
            We’d love to hear from you. Whether you’re a student, institution, partner, or innovator, connect with us to start your journey with Ugham.
          </p>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <AnimatedSection className="section--bg-light">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          
          {/* Get In Touch */}
          <div style={{ flex: '1 1 400px' }}>
            <span className="section-label">GET IN TOUCH</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Reach out and let’s build something impactful together.</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
              Have an idea? Want to collaborate? Looking to partner with us?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(59,22,254,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.125rem' }}>Email</h4>
                  <a href="mailto:info@ugham.com" style={{ margin: 0, color: 'var(--text-muted)', textDecoration: 'none' }}>info@ugham.com</a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(59,22,254,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.125rem' }}>Phone</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>+91 86678 39838</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(59,22,254,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.125rem' }}>Website</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>www.ugham.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Collaborations & Connect */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div className="glass-card" style={{ borderLeft: '4px solid var(--accent)' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>FOR COLLABORATIONS</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Institutional Partnerships</li>
                <li>Industry & Startup Collaborations</li>
                <li>Mentorship & Workshops</li>
                <li>Investment & Incubation Opportunities</li>
              </ul>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontStyle: 'italic' }}>Write to us with your proposal, and our team will get back to you.</p>
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: '1.5rem' }}>VISIT / CONNECT WITH US</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Follow us to stay updated on programs, opportunities, and innovation stories.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" className="btn btn-outline">LinkedIn</a>
                <a href="#" className="btn btn-outline">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. Start Your Journey CTA */}
      <AnimatedSection className="section" style={{ background: 'linear-gradient(135deg, #FF3366, #3b16fe)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '2rem' }}>START YOUR JOURNEY</h2>
          <p style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto 3rem', color: 'rgba(255,255,255,0.9)' }}>
            At Ugham, we help you turn ideas into innovations and innovations into ventures. Let’s learn, build, and grow together.
          </p>
          <a href="/" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '1rem 3rem', fontSize: '1.25rem' }}>
            Explore Ugham <ArrowRight size={24} />
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Contact;
