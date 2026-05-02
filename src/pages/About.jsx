import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const About = () => {
  const values = [
    { title: 'Think Bold', desc: 'Encouraging innovative thinking and breakthrough ideas.', pos: { top: '5%', left: '10%' } },
    { title: 'Market Research', desc: 'Understanding user needs, trends, and real-world problems.', pos: { top: '10%', right: '5%' } },
    { title: 'Idea Validation', desc: 'Shaping ideas based on market demand and feasibility.', pos: { bottom: '40%', left: '0%' } },
    { title: 'Team Formation', desc: 'Building strong teams through collaboration and shared vision.', pos: { bottom: '40%', right: '0%' } },
    { title: 'Product Dev', desc: 'Transforming ideas into functional and scalable products.', pos: { bottom: '5%', left: '10%' } },
    { title: 'Scale & Grow', desc: 'Expanding solutions to create wider impact.', pos: { bottom: '10%', right: '5%' } }
  ];

  const whatWeDo = [
    { title: 'Education Empowerment', desc: 'Developing an innovation and problem-solving skills' },
    { title: 'Innovation Enabling', desc: 'Supporting idea validation and structured development' },
    { title: 'Product Building', desc: 'Transforming ideas into working prototypes and solutions' },
    { title: 'Venture Creation', desc: 'Helping innovations evolve into scalable startups' }
  ];

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* 1. Who We Are */}
      <section className="section text-center">
        <div className="container">
          <p className="section-label">WHO WE ARE</p>
          <h1 className="text-radiant" style={{ maxWidth: '900px', margin: '0 auto 1.5rem' }}>
            EMPOWERING STUDENTS TO TURN IDEAS INTO REAL-WORLD SOLUTIONS
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.25rem', color: 'var(--text-muted)' }}>
            Ugham is an innovation studio dedicated to empowering students. We are a platform where creativity meets execution by helping young innovators move beyond concepts and build impactful, scalable innovations.
          </p>
        </div>
      </section>

      {/* 2. What We Do (Glass Cards) */}
      <AnimatedSection className="section--bg-light">
        <div className="container">
          <div className="section-header text-center" style={{ margin: '0 auto 4rem' }}>
            <span className="section-label">WHAT WE DO</span>
            <h2 className="text-radiant">THE INTERSECTION OF LEARNING & BUILDING</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {whatWeDo.map((item, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="glass-card" style={{ textAlign: 'center' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 3. Vision & Mission (Big Typography Reveal) */}
      <AnimatedSection className="section">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
            <div style={{ flex: '1 1 400px' }}>
              <span className="section-label">OUR VISION</span>
              <h2 style={{ fontSize: '2.5rem', lineHeight: 1.2 }}>
                To build a generation of innovators who create meaningful, scalable solutions for real-world challenges.
              </h2>
            </div>
            <div style={{ flex: '1 1 400px', borderLeft: '4px solid var(--primary)', paddingLeft: '2rem' }}>
              <span className="section-label">OUR MISSION</span>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Create 100 student-led innovations by 2030 and scale them into impactful ventures by enabling students to learn, build, and grow through the right ecosystem, mentorship, and opportunities.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. Why Choose Us & What Makes Us Different */}
      <AnimatedSection className="section--bg-light">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          <div style={{ flex: '1 1 400px', background: 'var(--white)', padding: '3rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <h2 className="text-radiant" style={{ marginBottom: '1rem' }}>WHY CHOOSE UGHAM</h2>
            <p style={{ marginBottom: '2rem' }}>Ugham is not just a learning platform, it’s a building ecosystem.</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Hands-on innovation building', 'Real-world problem solving', 'Access to mentors & industry experts', 'Structured pathway from idea to execution', 'Focus on scalability and impact'].map((point, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 500 }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }} /> {point}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ flex: '1 1 400px', padding: '3rem' }}>
            <h2 className="text-radiant" style={{ marginBottom: '1rem' }}>WHAT MAKES US DIFFERENT</h2>
            <p style={{ marginBottom: '2rem', fontSize: '1.25rem' }}>Most platforms focus on learning, but Ugham focuses on building.</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.125rem' }}>
              <li><strong>We build alongside you</strong> – Not just passive guidance.</li>
              <li><strong>Execution over theory</strong> – Action-biased methodology.</li>
              <li><strong>Real opportunities</strong> – Mentors, investors, and incubation.</li>
              <li><strong>The full journey</strong> – Support from idea all the way to venture.</li>
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. Core Values (Orbiting Nodes) */}
      <AnimatedSection className="section">
        <div className="container">
          <div className="section-header text-center" style={{ margin: '0 auto 4rem' }}>
            <span className="section-label">PRINCIPLES</span>
            <h2 className="text-radiant">CORE VALUES</h2>
          </div>

          <div style={{ position: 'relative', height: '700px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 30px rgba(59,22,254,0.2)", "0 0 70px rgba(255,51,102,0.4)", "0 0 30px rgba(59,22,254,0.2)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: '180px', height: '180px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '1.25rem', fontWeight: 700, zIndex: 10, textAlign: 'center'
              }}
            >
              OUR FOUNDATION
            </motion.div>

            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, zIndex: 20 }} transition={{ delay: i * 0.1, type: 'spring' }}
                style={{
                  position: 'absolute', width: '220px', padding: '1.5rem',
                  background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
                  borderRadius: '15px', border: '1px solid var(--border)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)', ...val.pos
                }}
              >
                <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.125rem' }}>{val.title}</h3>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 6. Leadership / Team (3D Tilt Cards) */}
      <AnimatedSection className="section--bg-light">
        <div className="container text-center">
          <span className="section-label">LEADERSHIP</span>
          <h2 className="text-radiant" style={{ marginBottom: '4rem' }}>MEET THE TEAM</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            {[1, 2, 3].map((member, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} style={{ background: 'var(--white)', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'var(--bg-secondary)', margin: '0 auto 1.5rem', overflow: 'hidden' }}>
                  <img src={`/assets/img/team/team-${member}.jpg`} alt="Team Member" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display='none'} />
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>Leader Name {member}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: 600 }}>Designation</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default About;
