import "./Skills.css";
import React from "react";

import { useState } from "react";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const skillCategories = [
    {
      id: "programming",
      title: "Programming Languages",
      icon: "💻",
      skills: [
        { name: "C", level: 85, experience: "3 years" },
        { name: "C++", level: 80, experience: "3 years" },
        { name: "Java", level: 75, experience: "2 years" },
        { name: "Python", level: 70, experience: "2 years" },
        { name: "JavaScript", level: 85, experience: "2 years" },
        { name: "TypeScript", level: 65, experience: "1 year" },
      ],
    },
    {
      id: "frontend",
      title: "Frontend Development",
      icon: "🎨",
      skills: [
        { name: "HTML5", level: 95, experience: "3 years" },
        { name: "CSS3", level: 90, experience: "3 years" },
        { name: "React.js", level: 85, experience: "2 years" },
        { name: "Next.js", level: 70, experience: "1 year" },
        { name: "Bootstrap", level: 80, experience: "2 years" },
        { name: "Material-UI", level: 75, experience: "1 year" },
        { name: "Tailwind CSS", level: 70, experience: "1 year" },
      ],
    },
    {
      id: "backend",
      title: "Backend Development",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 80, experience: "2 years" },
        { name: "Express.js", level: 75, experience: "2 years" },
        { name: "Spring Boot", level: 70, experience: "1 year" },
        { name: "REST APIs", level: 85, experience: "2 years" },
        { name: "Authentication", level: 80, experience: "2 years" },
        { name: "WebSockets", level: 65, experience: "1 year" },
      ],
    },
    {
      id: "database",
      title: "Databases",
      icon: "🗄️",
      skills: [
        { name: "MongoDB", level: 80, experience: "2 years" },
        { name: "MySQL", level: 75, experience: "2 years" },
        { name: "PostgreSQL", level: 65, experience: "1 year" },
        { name: "Mongoose", level: 75, experience: "2 years" },
        { name: "Redis", level: 60, experience: "1 year" },
      ],
    },
    {
      id: "tools",
      title: "Tools & Platforms",
      icon: "🛠️",
      skills: [
        { name: "Git", level: 85, experience: "3 years" },
        { name: "GitHub", level: 90, experience: "3 years" },
        { name: "VS Code", level: 95, experience: "3 years" },
        { name: "Postman", level: 80, experience: "2 years" },
        { name: "Docker", level: 65, experience: "1 year" },
        { name: "Figma", level: 70, experience: "1 year" },
        { name: "WordPress", level: 75, experience: "2 years" },
        { name: "MS Excel", level: 85, experience: "3 years" },
      ],
    },
    {
      id: "cs",
      title: "CS Fundamentals",
      icon: "📚",
      skills: [
        { name: "Data Structures", level: 80, experience: "2 years" },
        { name: "Algorithms", level: 75, experience: "2 years" },
        { name: "DBMS", level: 85, experience: "3 years" },
        { name: "OOP Concepts", level: 90, experience: "3 years" },
        { name: "SDLC", level: 80, experience: "2 years" },
        { name: "System Design", level: 70, experience: "1 year" },
      ],
    },
    {
      id: "soft",
      title: "Soft Skills",
      icon: "🌟",
      skills: [
        { name: "Problem Solving", level: 85, experience: "" },
        { name: "Team Collaboration", level: 90, experience: "" },
        { name: "Communication", level: 85, experience: "" },
        { name: "Time Management", level: 80, experience: "" },
        { name: "Peer Mentoring", level: 75, experience: "" },
        { name: "Adaptability", level: 90, experience: "" },
      ],
    },
  ];

  // Get all skills for search
  const allSkills = skillCategories.flatMap((category) =>
    category.skills.map((skill) => ({
      ...skill,
      category: category.title,
    }))
  );

  // Filter skills based on search and category
  const filteredSkills = allSkills.filter((skill) => {
    const matchesSearch =
      searchQuery === "" ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      skillCategories
        .find((cat) => cat.id === activeCategory)
        ?.skills.includes(skill);

    return matchesSearch && matchesCategory;
  });

  const getSkillLevelColor = (level) => {
    if (level >= 85) return "#2ecc71"; // Green
    if (level >= 75) return "#3498db"; // Blue
    if (level >= 65) return "#f39c12"; // Orange
    return "#e74c3c"; // Red
  };

  const getSkillLevelText = (level) => {
    if (level >= 85) return "Expert";
    if (level >= 75) return "Advanced";
    if (level >= 65) return "Intermediate";
    return "Beginner";
  };

  const getTotalSkillsCount = () => {
    return skillCategories.reduce(
      (total, category) => total + category.skills.length,
      0
    );
  };

  const getAverageSkillLevel = () => {
    const allSkillLevels = allSkills.map((skill) => skill.level);
    const average =
      allSkillLevels.reduce((sum, level) => sum + level, 0) /
      allSkillLevels.length;
    return average.toFixed(1);
  };

  return (
    <div className="skills">
      {/* Hero Section */}
      <section className="skills-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Technical <span className="highlight">Skills</span> & Expertise
          </h1>
          <p className="hero-subtitle">
            A comprehensive showcase of my technical abilities and professional
            competencies gained through academic projects and self-learning.
          </p>
        </div>

        <div className="skills-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{getTotalSkillsCount()}+</h3>
              <p>Total Skills</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>{getAverageSkillLevel()}</h3>
              <p>Avg Skill Level</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <h3>{skillCategories.length}</h3>
              <p>Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <div className="skills-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search skills..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery("")}>
              Clear
            </button>
          )}
        </div>

        <div className="category-tabs">
          <button
            className={`category-tab ${
              activeCategory === "all" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("all")}
          >
            🌟 All Skills
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.id}
              className={`category-tab ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon} {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid View */}
      {activeCategory === "all" ? (
        <div className="skills-grid">
          {skillCategories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-title">{category.title}</h3>
                <span className="skill-count">
                  {category.skills.length} skills
                </span>
              </div>
              <div className="category-skills">
                {category.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      {skill.experience && (
                        <span className="skill-experience">
                          {skill.experience}
                        </span>
                      )}
                    </div>
                    <div className="skill-level-bar">
                      <div
                        className="skill-level-fill"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: getSkillLevelColor(skill.level),
                        }}
                      />
                      <span className="skill-level-text">
                        {skill.level}% • {getSkillLevelText(skill.level)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="category-detail">
          {skillCategories
            .filter((category) => category.id === activeCategory)
            .map((category) => (
              <div key={category.id} className="detail-card">
                <div className="detail-header">
                  <div className="detail-icon">{category.icon}</div>
                  <div>
                    <h2 className="detail-title">{category.title}</h2>
                    <p className="detail-description">
                      {category.skills.length} skills in this category
                    </p>
                  </div>
                </div>
                <div className="detail-skills">
                  {category.skills.map((skill, index) => (
                    <div key={index} className="detail-skill-card">
                      <div className="detail-skill-header">
                        <h4 className="detail-skill-name">{skill.name}</h4>
                        <div className="skill-level-badge">
                          {getSkillLevelText(skill.level)}
                        </div>
                      </div>
                      <div className="skill-progress-section">
                        <div className="skill-progress-bar">
                          <div
                            className="skill-progress-fill"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: getSkillLevelColor(skill.level),
                            }}
                          />
                        </div>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      {skill.experience && (
                        <div className="skill-experience-info">
                          <span className="experience-icon">⏱️</span>
                          <span>{skill.experience} experience</span>
                        </div>
                      )}
                      <div className="skill-description">
                        {getSkillDescription(skill.name)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Search Results View */}
      {searchQuery && (
        <div className="search-results">
          <h3 className="results-title">
            🔍 Search Results for "{searchQuery}"
            <span className="results-count">
              {" "}
              ({filteredSkills.length} found)
            </span>
          </h3>
          <div className="results-grid">
            {filteredSkills.map((skill, index) => (
              <div key={index} className="result-card">
                <div className="result-skill-info">
                  <h4 className="result-skill-name">{skill.name}</h4>
                  <span className="result-skill-category">
                    {skill.category}
                  </span>
                </div>
                <div className="result-skill-level">
                  <div className="result-level-bar">
                    <div
                      className="result-level-fill"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: getSkillLevelColor(skill.level),
                      }}
                    />
                  </div>
                  <span className="result-level-text">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Summary */}
      <div className="skills-summary">
        <h3 className="summary-title">📋 Skills Summary</h3>
        <div className="summary-content">
          <div className="summary-card">
            <h4>Technical Expertise</h4>
            <p>
              Proficient in full-stack web development with hands-on experience
              in building scalable applications using modern technologies.
              Strong foundation in computer science principles and software
              engineering practices.
            </p>
          </div>
          <div className="summary-card">
            <h4>Learning Approach</h4>
            <p>
              Continuously updating skills through online courses, project
              development, and staying current with industry trends. Focus on
              practical implementation and real-world problem-solving.
            </p>
          </div>
          <div className="summary-card">
            <h4>Professional Development</h4>
            <p>
              Actively participating in coding communities, contributing to
              open-source projects, and engaging in peer learning to enhance
              technical capabilities and soft skills.
            </p>
          </div>
        </div>
      </div>

      {/* Skills Legend */}
      <div className="skills-legend">
        <h4>Skill Level Legend</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: "#2ecc71" }}
            ></div>
            <span>Expert (85-100%)</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: "#3498db" }}
            ></div>
            <span>Advanced (75-84%)</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: "#f39c12" }}
            ></div>
            <span>Intermediate (65-74%)</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: "#e74c3c" }}
            ></div>
            <span>Beginner (below 65%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for skill descriptions
const getSkillDescription = (skillName) => {
  const descriptions = {
    "React.js":
      "Building interactive user interfaces with component-based architecture",
    "Node.js": "Creating scalable server-side applications and APIs",
    MongoDB: "Working with NoSQL databases and data modeling",
    Git: "Version control and collaborative development workflows",
    JavaScript: "Modern ES6+ features and asynchronous programming",
    Java: "Object-oriented programming and enterprise applications",
    Python: "Scripting, data analysis, and backend development",
  };

  return (
    descriptions[skillName] ||
    "Practical experience gained through projects and coursework"
  );
};

export default Skills;
