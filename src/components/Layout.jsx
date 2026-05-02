import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'WHAT WE DO', path: '/what-we-do' },
    { name: 'INITIATIVES', path: '/initiatives' },
    { name: 'COLLABORATION', path: '/collaboration' },
    { name: 'AWARDS', path: '/innovation-awards' },
    { name: 'CONTACT', path: '/contact' }
  ];

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
        padding: isScrolled ? '1rem 0' : '1.5rem 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'block' }}>
            <img src="/assets/img/logo-ugham.png" alt="Ugham" style={{ height: '40px' }} />
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
            <ul style={{ display: 'flex', gap: '2rem' }}>
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 600, 
                      color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-muted)',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}>
              LET'S TALK
            </Link>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="mobile-toggle" 
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'none' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} color="var(--text)" /> : <Menu size={28} color="var(--text)" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 999,
          display: 'flex', flexDirection: 'column', padding: '6rem 2rem 2rem'
        }}>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center' }}>
            {navLinks.map(link => (
              <li key={link.name}>
                <Link to={link.path} style={{ fontSize: '1.25rem', fontWeight: 600 }}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>

      <footer style={{ background: '#0a0f1d', color: 'white', padding: '6rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <img src="/assets/img/logo-ugham.png" alt="Ugham" style={{ height: '40px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>An innovation studio empowering the next generation of builders through mentorship, structured guidance, and execution support.</p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>NAVIGATION</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {navLinks.map(link => (
                  <li key={link.name}><Link to={link.path} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>{link.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>CONTACT</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>info@ugham.com</li>
                <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>+91 86678 39838</li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
            <p>&copy; 2026 Ugham Website. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
