import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={`section ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
