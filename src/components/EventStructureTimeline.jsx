import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, MapPin, Users, Target, Rocket } from 'lucide-react';

const EventStructureTimeline = () => {
  const structurePoints = [
    { 
      title: "Hybrid Delivery", 
      desc: "Conducted on every alternate Saturday & Sunday online with offline audition rounds in select colleges.", 
      icon: <MapPin size={20} />,
      isHighlight: true
    },
    { 
      title: "First-Come Allocation", 
      desc: "Only the first 25 teams in each category will be granted pitching slots. Speed is an advantage.", 
      icon: <Target size={20} />
    },
    { 
      title: "Program Duration", 
      desc: "An intensive innovation cycle running from May through the second week of September.", 
      icon: <Calendar size={20} />
    },
    { 
      title: "Grand Finale", 
      desc: "The ultimate showdown of student founders on 19th of September. National recognition awaits.", 
      icon: <Rocket size={20} />,
      isHighlight: true
    },
    { 
      title: "Collaboration Model", 
      desc: "Individual participation is not permitted. We believe in the power of teams. Pan-India cross-college squads allowed.", 
      icon: <Users size={20} />
    }
  ];

  const dates = [
    'May 9 & 10', 'May 23 & 24', 'June 6 & 7', 'June 20 & 21',
    'July 4 & 5', 'July 18 & 19', 'Aug 1 & 2', 'Aug 15 & 16',
    'Aug 29 & 30', 'Sept 12 & 13'
  ];

  return (
    <section className="section" style={{ background: '#ffffff', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background Subtle Grid */}
      <div style={{ 
        position: 'absolute', inset: 0, 
        backgroundImage: 'radial-gradient(#00000005 1px, transparent 1px)', 
        backgroundSize: '40px 40px',
        opacity: 0.5 
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem' }}>
          
          {/* Left: The Innovation Timeline (Cols 1-7) */}
          <div style={{ gridColumn: 'span 7' }}>
            <span className="section-label" style={{ marginBottom: '1.5rem', display: 'block' }}>ARCHITECTURAL_FLOW</span>
            <h2 className="text-radiant" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '4rem', lineHeight: 1.1 }}>
              EVENT<br />STRUCTURE
            </h2>

            <div style={{ position: 'relative', paddingLeft: '3rem' }}>
              {/* Vertical Progress Line */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ 
                  position: 'absolute', left: '10px', top: 0, 
                  width: '2px', background: 'linear-gradient(to bottom, #FF3366, #3b16fe)',
                  opacity: 0.2
                }} 
              />

              {structurePoints.map((point, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ 
                    marginBottom: '3rem', 
                    position: 'relative',
                    padding: point.isHighlight ? '2rem' : '0',
                    background: point.isHighlight ? 'rgba(255, 51, 102, 0.03)' : 'transparent',
                    borderRadius: '8px',
                    borderLeft: point.isHighlight ? '3px solid #FF3366' : 'none'
                  }}
                >
                  {/* Point Marker */}
                  <div style={{ 
                    position: 'absolute', left: '-3.4rem', top: '0.2rem',
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: point.isHighlight ? '#FF3366' : '#E2E8F0',
                    border: '2px solid #fff',
                    boxShadow: point.isHighlight ? '0 0 10px #FF336655' : 'none',
                    zIndex: 2
                  }} />

                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ 
                      color: point.isHighlight ? '#FF3366' : '#3b16fe',
                      marginTop: '0.2rem'
                    }}>
                      {point.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                        {point.title}
                      </h3>
                      <p style={{ color: '#4A4A4A', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
                        {point.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: The Schedule Grid (Cols 8-12) */}
          <div style={{ gridColumn: 'span 5' }}>
            <div className="glass-card" style={{ 
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.05)',
              padding: '3rem',
              borderRadius: '4px',
              position: 'sticky',
              top: '120px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '4px', 
                  background: 'linear-gradient(135deg, #FF3366, #3b16fe)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                }}>
                  <Calendar size={20} />
                </div>
                <h3 style={{ margin: 0, fontWeight: 900, letterSpacing: '0.1em' }}>CRITICAL DATES</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                {dates.map((date, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10, background: 'rgba(59, 22, 254, 0.03)' }}
                    style={{ 
                      padding: '1rem 1.5rem', 
                      background: 'rgba(0,0,0,0.01)',
                      borderRadius: '4px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderLeft: '2px solid transparent',
                      transition: 'all 0.3s ease',
                      cursor: 'default'
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{date}</span>
                    <CheckCircle2 size={16} color="#3b16fe" style={{ opacity: 0.3 }} />
                  </motion.div>
                ))}
              </div>

              <div style={{ 
                marginTop: '3rem', 
                paddingTop: '2rem', 
                borderTop: '1px dashed #E2E8F0',
                fontSize: '0.875rem',
                color: '#64748b'
              }}>
                <p style={{ margin: 0 }}>* Audition slots are dynamic and allocated upon registration verification.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EventStructureTimeline;
