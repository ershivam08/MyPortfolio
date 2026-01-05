import "./Projects.css";
import React from "react";

import { useState } from "react";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "College Management System",
      description:
        "A role-based web application designed to efficiently manage students, faculty, and course information with comprehensive administrative features.",
      longDescription:
        "Developed as BCA Final Year Project, this system streamlines college operations with modules for student enrollment, faculty management, course scheduling, attendance tracking, and result processing. Features secure role-based access control and automated notifications.",
      technologies: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "Bootstrap"],
      year: "2024",
      type: "web",
      github: "https://github.com/Shivamkumarsingh/college-management-system",
      status: "Completed",
      features: [
        "Role-based access control (Admin, Faculty, Student)",
        "Automated attendance and result management",
        "Course scheduling and timetable generation",
        "Student performance analytics dashboard",
        "Secure authentication and authorization",
      ],
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Gender Detection System",
      description:
        "A machine learning-based system that detects and classifies gender from facial images using real-time webcam input.",
      longDescription:
        "MCA First Semester project implementing computer vision and machine learning algorithms for gender classification. The system uses facial feature extraction and classification models with real-time processing capabilities.",
      technologies: [
        "Python",
        "OpenCV",
        "scikit-learn",
        "NumPy",
        "Pandas",
        "TensorFlow",
      ],
      year: "2025",
      type: "ai-ml",
      github: "https://github.com/Shivamkumarsingh/gender-detection-system",
      status: "Completed",
      features: [
        "Real-time webcam face detection",
        "Gender classification with 92% accuracy",
        "Multiple ML model comparison",
        "Live confidence score display",
        "Dataset preprocessing pipeline",
      ],
      image:
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?w-400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "LearnEase - Online Learning PWA",
      description:
        "Progressive Web Application for enhanced online learning with offline capabilities and interactive features.",
      longDescription:
        "MERN stack based learning platform implementing PWA features for offline access, course management, and progress tracking. Designed to work in low-bandwidth environments.",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "PWA",
        "Tailwind CSS",
      ],
      year: "2025",
      type: "web",
      github: "https://github.com/Shivamkumarsingh/learn-ease",
      status: "In Progress",
      features: [
        "Progressive Web App with offline support",
        "Course progress tracking",
        "Interactive quizzes and assignments",
        "Real-time notifications",
        "Responsive design for all devices",
      ],
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "Personal portfolio showcasing skills, projects, and professional journey with modern design.",
      longDescription:
        "Responsive portfolio website built with React featuring interactive skill visualizations, project showcase, and contact functionality. Implements modern UI/UX principles.",
      technologies: ["React", "CSS3", "JavaScript", "Netlify", "Git"],
      year: "2025",
      type: "web",
      github: "https://github.com/Shivamkumarsingh/portfolio",
      status: "Completed",
      features: [
        "Responsive design with mobile-first approach",
        "Interactive skill visualization",
        "Project showcase with filters",
        "Dark/light theme toggle",
        "Contact form with validation",
      ],
      liveDemo: "https://shivamkumarsingh.netlify.app/",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    },
  ];

  const filters = [
    { id: "all", label: "All Projects", count: projects.length },
    {
      id: "web",
      label: "Web Development",
      count: projects.filter((p) => p.type === "web").length,
    },
    {
      id: "ai-ml",
      label: "AI/ML",
      count: projects.filter((p) => p.type === "ai-ml").length,
    },
    {
      id: "completed",
      label: "Completed",
      count: projects.filter((p) => p.status === "Completed").length,
    },
    {
      id: "progress",
      label: "In Progress",
      count: projects.filter((p) => p.status === "In Progress").length,
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : activeFilter === "completed" || activeFilter === "progress"
      ? projects.filter(
          (p) =>
            p.status ===
            (activeFilter === "completed" ? "Completed" : "In Progress")
        )
      : projects.filter((p) => p.type === activeFilter);

  const getTechColor = (tech) => {
    const colors = {
      Java: "#007396",
      "Spring Boot": "#6DB33F",
      Python: "#3776AB",
      OpenCV: "#5C3EE8",
      React: "#61DAFB",
      "Node.js": "#339933",
      MongoDB: "#47A248",
      Express: "#000000",
      MySQL: "#4479A1",
      TensorFlow: "#FF6F00",
      "scikit-learn": "#F7931E",
      PWA: "#5A0FC8",
      "Tailwind CSS": "#38B2AC",
      Git: "#F05032",
    };
    return colors[tech] || "#4F46E5";
  };

  return (
    <div className="projects">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Projects</span> Portfolio
          </h1>
          <p className="hero-subtitle">
            Showcasing practical implementation of technical skills through
            real-world applications and academic projects.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <h3>{projects.length}+</h3>
              <p>Projects</p>
            </div>
            <div className="stat">
              <h3>4+</h3>
              <p>Technologies</p>
            </div>
            <div className="stat">
              <h3>2023-2025</h3>
              <p>Timeline</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="projects-filters">
        <div className="filter-tabs">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-tab ${
                activeFilter === filter.id ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span>{filter.label}</span>
              <span className="filter-count">{filter.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`project-card ${
              hoveredProject === project.id ? "hovered" : ""
            }`}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="project-header">
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-status">
                  <span
                    className={`status-badge ${project.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="project-meta">
                <div className="project-year">
                  <span className="year-icon">📅</span>
                  {project.year}
                </div>
                <div className="project-type">
                  <span className="type-icon">
                    {project.type === "web" ? "🌐" : "🤖"}
                  </span>
                  {project.type === "web" ? "Web App" : "AI/ML"}
                </div>
              </div>
            </div>

            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="technologies">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="tech-tag"
                    style={{
                      backgroundColor: `${getTechColor(tech)}20`,
                      borderColor: getTechColor(tech),
                      color: getTechColor(tech),
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-features">
                <h4>Key Features:</h4>
                <ul>
                  {project.features.slice(0, 3).map((feature, index) => (
                    <li key={index}>✅ {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  <span>🔗 GitHub</span>
                </a>
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="demo-link"
                  >
                    <span>🚀 Live Demo</span>
                  </a>
                )}
                <button
                  className="details-link"
                  onClick={() => alert(`Detailed view for ${project.title}`)}
                >
                  <span>📖 Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* All Projects Summary */}
      <div className="projects-summary">
        <h3>📊 Projects Overview</h3>
        <div className="summary-content">
          <div className="summary-card">
            <h4>Technologies Used</h4>
            <div className="tech-stack">
              {Array.from(new Set(projects.flatMap((p) => p.technologies))).map(
                (tech) => (
                  <div key={tech} className="stack-item">
                    <div
                      className="stack-color"
                      style={{ backgroundColor: getTechColor(tech) }}
                    />
                    <span>{tech}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="summary-card">
            <h4>Project Timeline</h4>
            <div className="timeline">
              {projects.map((project) => (
                <div key={project.id} className="timeline-item">
                  <div className="timeline-year">{project.year}</div>
                  <div className="timeline-content">
                    <div className="timeline-title">{project.title}</div>
                    <div className="timeline-tech">
                      {project.technologies.slice(0, 2).join(", ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="summary-card">
            <h4>Skills Demonstrated</h4>
            <ul className="skills-list">
              <li>✅ Full-stack development</li>
              <li>✅ Machine Learning implementation</li>
              <li>✅ Database design & management</li>
              <li>✅ Responsive UI/UX design</li>
              <li>✅ Version control with Git</li>
              <li>✅ Agile project methodology</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="project-cta">
        <h3>Interested in collaboration?</h3>
        <p>Let's build something amazing together!</p>
        <div className="cta-buttons">
          <a
            href="https://github.com/Shivamkumarsingh"
            target="_blank"
            rel="noopener noreferrer"
            className="github-cta"
          >
            View All Projects on GitHub
          </a>
          <a
            href="mailto:shivamkumarsingh63724@gmail.com"
            className="contact-cta"
          >
            Contact for Collaboration
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
