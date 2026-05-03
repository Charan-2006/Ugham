import React from 'react';
import { motion } from 'framer-motion';

const RulesArchitecturalStack = ({ rules }) => {
  return (
    <section className="section" style={{ background: '#ffffff', padding: '150px 0', overflow: 'hidden' }}>
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '100px' }}>
          <h2 className="text-radiant" style={{ fontSize: '4rem', fontWeight: 900 }}>RULES &<br />GUIDELINES</h2>
        </div>

        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Central Laser Axis */}
          <div style={{ 
            position: 'absolute', left: '50%', top: 0, bottom: 0, 
            width: '1px', background: 'linear-gradient(to bottom, transparent, #FF3366, #3b16fe, transparent)',
            transform: 'translateX(-50%)', opacity: 0.3
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {rules.map((rule, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div 
                  key={i}
                  className="rules-row"
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ 
                    display: 'flex', 
                    justifyContent: isEven ? 'flex-end' : 'flex-start',
                    width: '100%',
                    position: 'relative'
                  }}
                >
                  {/* Connection Filament */}
                  <motion.div 
                    className="rules-filament"
                    initial={{ width: 0 }}
                    whileInView={{ width: '50px' }}
                    transition={{ delay: 0.5, duration: 1 }}
                    style={{ 
                      position: 'absolute', 
                      left: isEven ? 'auto' : '50%', 
                      right: isEven ? '50%' : 'auto',
                      top: '50%',
                      height: '1px',
                      background: 'linear-gradient(to right, #FF3366, #3b16fe)',
                      opacity: 0.5
                    }} 
                  />

                  {/* The Rule Slat */}
                  <motion.div
                    className="rules-card"
                    whileHover={{ scale: 1.02, x: isEven ? -10 : 10 }}
                    style={{ 
                      width: '45%', 
                      background: '#fff', 
                      border: '1px solid #f1f5f9',
                      padding: '2.5rem',
                      borderRadius: '4px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
                      position: 'relative',
                      display: 'flex',
                      gap: '2rem',
                      alignItems: 'center',
                      cursor: 'default'
                    }}
                  >
                    {/* Architectural Number Block */}
                    <div style={{ 
                      flexShrink: 0,
                      width: '60px', height: '60px', 
                      background: 'linear-gradient(135deg, rgba(255, 51, 102, 0.05), rgba(59, 22, 254, 0.05))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '4px',
                      border: '1px solid #f1f5f9'
                    }}>
                      <span className="text-radiant" style={{ fontWeight: 900, fontFamily: 'monospace', fontSize: '1.25rem' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div>
                      <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>
                        {rule}
                      </p>
                      <div style={{ 
                        marginTop: '1rem', height: '2px', width: '30px', 
                        background: 'linear-gradient(90deg, #FF3366, #3b16fe)',
                        opacity: 0.3
                      }} />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesArchitecturalStack;
