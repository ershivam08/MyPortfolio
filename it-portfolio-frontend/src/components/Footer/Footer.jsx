import React from "react";
import "./Footer.css";
import { useEffect, useState } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Update year on mount
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-content footer-brand">
          <div className="brand-logo">Er. Shivam08</div>
          <p className="brand-tagline">
            Modern web applications built with MERN stack. Specializing in
            responsive design, performance optimization, and user-friendly
            interfaces.
          </p>

          {/* Social Links */}
          <div className="footer-social">
            <h4 className="social-title">Connect With Me</h4>
            <div className="social-links">
              <a
                href="https://github.com"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://twitter.com"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a href="mailto:shivam@example.com" className="social-link">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-content footer-links">
          <h3>Quick Links</h3>
          <div className="links-grid">
            <a href="/" className="link-item">
              Home
            </a>
            <a href="/about" className="link-item">
              About Me
            </a>
            <a href="/skills" className="link-item">
              Skills
            </a>
            <a href="/projects" className="link-item">
              Projects
            </a>
            <a href="/tools" className="link-item">
              Tools & Tech
            </a>
            <a href="/friends" className="link-item">
              Friends
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-content footer-contact">
          <h3>Contact Info</h3>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span className="contact-text">
                Greater Noida, Uttar Pradesh, India
              </span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span className="contact-text">
                <a href="mailto:shivam@example.com">
                  shivamkumarsingh63724@gmail.com
                </a>
              </span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <span className="contact-text">
                <a href="tel:+911234567890">+91 9304581078</a>
              </span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕒</span>
              <span className="contact-text">Available for freelance work</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p className="copyright">
          © {currentYear} Shivam Kumar Singh | All rights reserved.
        </p>
        <div className="legal-links">
          <a href="/privacy" className="legal-link">
            Privacy Policy
          </a>
          <a href="/terms" className="legal-link">
            Terms of Service
          </a>
          <a href="/sitemap" className="legal-link">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
