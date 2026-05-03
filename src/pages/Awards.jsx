import React from 'react';
import AwardsHero3D from '../components/AwardsHero3D';
import EventStructureMotion from '../components/EventStructureMotion';
import RulesArchitecturalStack from '../components/RulesArchitecturalStack';
import BenefitsBentoGrid from '../components/BenefitsBentoGrid';
import DeconstructedHighlights from '../components/DeconstructedHighlights';
import AnimatedSection from '../components/AnimatedSection';

const Awards = () => {
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
    { title: 'Final Pitching', items: ['Idea pitch', 'Prototype Pitch'] },
    { title: 'Panel Discussions', items: ['Investor Panel', 'Student Founder Panel', 'Women Entrepreneur Panel', 'Government Startup Opportunity Sessions'] },
    { title: 'Networking & Expo', items: ['Networking Hall with Incubation Managers, Investors', 'Startup & Company Product Expo'] }
  ];

  return (
    <div style={{ background: '#ffffff' }}>
      <AwardsHero3D />
      <EventStructureMotion />
      <RulesArchitecturalStack rules={rules} />
      <BenefitsBentoGrid benefits={benefits} />
      <DeconstructedHighlights highlights={highlights} />
    </div>
  );
};

export default Awards;
