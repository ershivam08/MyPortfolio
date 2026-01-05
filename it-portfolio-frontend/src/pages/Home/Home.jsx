import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Shivam Kumar Singh</h1>
        <h2>Full Stack MERN Developer | MCA Student</h2>

        <p>
          MCA student with a strong focus on Web Development, skilled in
          building scalable and user-friendly web applications using modern
          frontend and backend technologies.
        </p>

        <div className="hero-buttons">
          <a
            href="https://shivamkumarsingh.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="portfolio-btn"
          >
            <i className="fas fa-briefcase"></i> Portfolio
          </a>

          <a
            href="https://github.com/Shivamkumarsingh"
            target="_blank"
            rel="noreferrer"
            className="github-btn"
          >
            <i className="fab fa-github"></i> GitHub
          </a>

          <a
            href="https://linkedin.com/in/Shivamkumarsingh"
            target="_blank"
            rel="noreferrer"
            className="linkedin-btn"
          >
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>

          {/* Resume Download Button */}
          <a
            href="/Shivam_Kumar_Singh_Resume.pdf"
            download
            className="resume-btn"
          >
            <i className="fas fa-download"></i> Download Resume
          </a>
        </div>
      </section>

      {/* Education */}
      <section className="section">
        <h3>Education</h3>

        <div className="card">
          <h4>Master of Computer Applications (MCA)</h4>
          <p>
            <i className="fas fa-university"></i> Galgotias University, Greater
            Noida
          </p>
          <p>
            <i className="fas fa-calendar-alt"></i> Expected: 2026 | CGPA: 7.35
          </p>
        </div>

        <div className="card">
          <h4>Bachelor of Computer Applications (BCA)</h4>
          <p>
            <i className="fas fa-university"></i> Purnea College, Purnea
            University
          </p>
          <p>
            <i className="fas fa-calendar-alt"></i> Completed: 2024 |
            Percentage: 81.7%
          </p>
        </div>
      </section>

      {/* Skills Highlight */}
      <section className="section">
        <h3>Technical Skills</h3>
        <ul className="skills-list">
          <li>
            <i className="fas fa-code"></i> HTML, CSS, JavaScript, React.js
          </li>
          <li>
            <i className="fas fa-server"></i> Node.js, Express.js
          </li>
          <li>
            <i className="fas fa-database"></i> MongoDB, MySQL
          </li>
          <li>
            <i className="fas fa-laptop-code"></i> C, C++, Java, Python
          </li>
          <li>
            <i className="fas fa-tools"></i> Git, GitHub, VS Code
          </li>
        </ul>
      </section>

      {/* Projects Highlight */}
      <section className="section">
        <h3>Highlighted Projects</h3>

        <div className="card">
          <h4>
            <i className="fas fa-graduation-cap"></i> College Management System
          </h4>
          <p>
            Role-based web application for managing students, faculty, and
            courses.
          </p>
          <p>
            <strong>Tech:</strong> Java, Spring Boot, MySQL
          </p>
          <a href="#" className="project-link">
            View Details →
          </a>
        </div>

        <div className="card">
          <h4>
            <i className="fas fa-robot"></i> Gender Detection System
          </h4>
          <p>
            Machine learning-based system to classify gender using facial images
            in real time.
          </p>
          <p>
            <strong>Tech:</strong> Python, OpenCV, scikit-learn
          </p>
          <a href="#" className="project-link">
            View Details →
          </a>
        </div>
      </section>

      {/* Tools Preview */}
      <section className="section tools-preview">
        <h3>Utility Tools</h3>
        <p>
          <i className="fas fa-calculator"></i> This portfolio also provides
          real-world utility tools such as GST Calculator, Profit/Loss
          Calculator, Compound Interest Calculator, Word Counter, and Image
          Compressor.
        </p>
        <a href="/tools" className="tools-btn">
          <i className="fas fa-external-link-alt"></i> Explore All Tools
        </a>
      </section>

      {/* Contact Info */}
      <section className="contact">
        <h3>Get In Touch</h3>
        <p>
          📍 Greater Noida, Uttar Pradesh <br />
          📧 shivamkumarsingh63724@gmail.com <br />
          📞 +91 9304581078
        </p>
        <div className="contact-social">
          <a
            href="mailto:shivamkumarsingh63724@gmail.com"
            className="contact-btn"
          >
            <i className="fas fa-envelope"></i> Email Me
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
