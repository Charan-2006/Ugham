import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import WhatWeDo from './pages/WhatWeDo';
import Initiatives from './pages/Initiatives';
import Collaboration from './pages/Collaboration';
import Awards from './pages/Awards';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="what-we-do" element={<WhatWeDo />} />
          <Route path="initiatives" element={<Initiatives />} />
          <Route path="collaboration" element={<Collaboration />} />
          <Route path="innovation-awards" element={<Awards />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
