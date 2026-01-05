import "./About.css";
import React from "react";

const About = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Me</h1>
        <p className="hero-tagline">
          MCA Student | Full Stack Developer | Passionate about creating
          impactful web solutions
        </p>
      </section>

      {/* Main Content */}
      <div className="about-content">
        {/* Introduction */}
        <div className="intro-section">
          <h2>Hello, I'm Shivam</h2>
          <p className="intro-text">
            I am <strong>Shivam Kumar Singh</strong>, an MCA student
            specializing in Web Development with a passion for building
            user-friendly, scalable, and efficient web applications using modern
            technologies.
          </p>
          <p className="intro-text">
            My journey in computer science began during my BCA, where I
            discovered my love for problem-solving and coding. Currently
            pursuing MCA at Galgotias University, I'm constantly expanding my
            skill set and working on projects that challenge me to grow.
          </p>
          <p className="intro-text">
            I believe in writing clean, maintainable code and creating
            experiences that make a difference. When I'm not coding, you can
            find me exploring new technologies, contributing to open-source
            projects, or learning about UI/UX design principles.
          </p>
        </div>

        {/* Contact Information */}
        <div className="contact-card">
          <h2>
            <i className="fas fa-address-card"></i> Contact Details
          </h2>
          <ul className="contact-list">
            <li>
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-text">
                <strong>Location</strong>
                <div className="contact-value">
                  Greater Noida, Uttar Pradesh
                </div>
              </div>
            </li>
            <li>
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-text">
                <strong>Email</strong>
                <div className="contact-value">
                  <a href="mailto:shivamkumarsingh63724@gmail.com">
                    shivamkumarsingh63724@gmail.com
                  </a>
                </div>
              </div>
            </li>
            <li>
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-text">
                <strong>Phone</strong>
                <div className="contact-value">
                  <a href="tel:+919304581078">+91 9304581078</a>
                </div>
              </div>
            </li>
            <li>
              <div className="contact-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="contact-text">
                <strong>Education</strong>
                <div className="contact-value">
                  MCA (Expected 2026) | CGPA: 7.35
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Skills Section */}
      <section className="skills-section">
        <h2 className="section-title">
          <i className="fas fa-code"></i> Technical Skills
        </h2>
        <div className="skills-grid">
          <div className="skill-category">
            <div className="category-header">
              <div className="category-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3 className="category-title">Frontend</h3>
            </div>
            <div className="skill-tags">
              <span className="skill-tag">HTML5</span>
              <span className="skill-tag">CSS3</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">React.js</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">Bootstrap</span>
              <span className="skill-tag">Material-UI</span>
            </div>
          </div>

          <div className="skill-category">
            <div className="category-header">
              <div className="category-icon">
                <i className="fas fa-server"></i>
              </div>
              <h3 className="category-title">Backend</h3>
            </div>
            <div className="skill-tags">
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Express.js</span>
              <span className="skill-tag">Java</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">Spring Boot</span>
              <span className="skill-tag">REST APIs</span>
              <span className="skill-tag">Authentication</span>
            </div>
          </div>

          <div className="skill-category">
            <div className="category-header">
              <div className="category-icon">
                <i className="fas fa-database"></i>
              </div>
              <h3 className="category-title">Database & Tools</h3>
            </div>
            <div className="skill-tags">
              <span className="skill-tag">MongoDB</span>
              <span className="skill-tag">MySQL</span>
              <span className="skill-tag">Git</span>
              <span className="skill-tag">GitHub</span>
              <span className="skill-tag">VS Code</span>
              <span className="skill-tag">Postman</span>
              <span className="skill-tag">Docker</span>
            </div>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="timeline-section">
        <h2 className="section-title">
          <i className="fas fa-graduation-cap"></i> Education Timeline
        </h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-content">
              <div className="timeline-year">
                <i className="fas fa-calendar"></i> 2024 - 2026
              </div>
              <h3 className="timeline-title">
                Master of Computer Applications (MCA)
              </h3>
              <p className="timeline-description">
                Galgotias University, Greater Noida
                <br />
                Specializing in Web Development and Software Engineering
                <br />
                Current CGPA: 7.35
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-content">
              <div className="timeline-year">
                <i className="fas fa-calendar"></i> 2021 - 2024
              </div>
              <h3 className="timeline-title">
                Bachelor of Computer Applications (BCA)
              </h3>
              <p className="timeline-description">
                Purnea College, Purnea University
                <br />
                Percentage: 81.7%
                <br />
                Focus on Programming Fundamentals and Database Management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2 className="cta-title">Let's Build Something Amazing Together</h2>
        <p className="cta-description">
          Interested in collaborating on a project or just want to chat about
          technology and development? I'm always open to discussing new
          opportunities.
        </p>
        <div className="cta-buttons">
          <a
            href="mailto:shivamkumarsingh63724@gmail.com"
            className="cta-btn primary"
          >
            <i className="fas fa-envelope"></i> Get In Touch
          </a>
          <a
            href="/Shivam_Kumar_Singh_Resume.pdf"
            download
            className="cta-btn secondary"
          >
            <i className="fas fa-download"></i> Download Resume
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
