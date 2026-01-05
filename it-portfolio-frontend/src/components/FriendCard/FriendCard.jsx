import "./FriendCard.css";
import { useState } from "react";

const FriendCard = ({
  name,
  profession,
  message,
  image,
  github,
  linkedin,
  skills = [],
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`friend-card ${isFlipped ? "flipped" : ""} ${
        isHovered ? "hovered" : ""
      }`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-inner">
        {/* Front of Card */}
        <div className="card-front">
          <div className="image-container">
            <img src={image} alt={name} className="friend-img" />
            <div className="image-overlay">
              <span className="view-details">Click to View Details</span>
            </div>
          </div>

          <div className="friend-info">
            <h3 className="friend-name">{name}</h3>
            <p className="profession">
              <i className="fas fa-briefcase"></i> {profession}
            </p>
            <div className="message-container">
              <i className="fas fa-quote-left quote-icon"></i>
              <p className="message">"{message}"</p>
              <i className="fas fa-quote-right quote-icon"></i>
            </div>

            <div className="quick-stats">
              <div className="stat">
                <i className="fas fa-code"></i>
                <span>{skills.length} Skills</span>
              </div>
              <div className="stat">
                <i className="fas fa-star"></i>
                <span>5.0 Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="card-back">
          <div className="back-header">
            <h3 className="friend-name">{name}</h3>
            <p className="profession">{profession}</p>
          </div>

          <div className="skills-section">
            <h4>
              <i className="fas fa-tools"></i> Technical Skills
            </h4>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="contact-section">
            <h4>
              <i className="fas fa-network-wired"></i> Connect
            </h4>
            <div className="social-links">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn github"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fab fa-github"></i> GitHub
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn linkedin"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
              )}
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="flip-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              <i className="fas fa-undo"></i> Flip Back
            </button>
            <button
              className="message-btn"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Message ${name}: Coming Soon!`);
              }}
            >
              <i className="fas fa-envelope"></i> Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
