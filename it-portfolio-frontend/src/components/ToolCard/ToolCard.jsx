import { useState, useEffect } from "react";
import "./ToolCard.css";

const ToolCard = ({
  title,
  children,
  icon = "🛠️",
  description,
  stats = {},
  interactive = true,
  loading = false,
  error = null,
  onExpand,
  expanded = false,
  className = "",
  style = {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [localLoading, setLocalLoading] = useState(false);

  // Handle expand/collapse
  const handleExpandToggle = () => {
    if (onExpand) {
      onExpand(!isExpanded);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  // Handle click events
  const handleClick = (e) => {
    if (interactive) {
      handleExpandToggle();
    }
  };

  // Sync with parent expanded state
  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  // Simulate loading state
  useEffect(() => {
    if (loading) {
      setLocalLoading(true);
      const timer = setTimeout(() => {
        setLocalLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Determine card classes
  const cardClasses = [
    "tool-card",
    interactive ? "interactive" : "",
    isHovered ? "hovered" : "",
    isExpanded ? "expanded" : "",
    loading || localLoading ? "loading" : "",
    error ? "error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Get stat items
  const statItems = [
    { key: "usage", icon: "📊", label: "Uses" },
    { key: "rating", icon: "⭐", label: "Rating" },
    { key: "speed", icon: "⚡", label: "Speed" },
  ].filter((stat) => stats[stat.key] !== undefined);

  return (
    <div
      className={cardClasses}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role={interactive ? "button" : "article"}
      tabIndex={interactive ? 0 : -1}
      aria-expanded={interactive ? isExpanded : undefined}
    >
      {/* Loading Overlay */}
      {(loading || localLoading) && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner-circle"></div>
            <span>Loading...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-overlay">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <span className="error-message">{error}</span>
          </div>
        </div>
      )}

      {/* Card Header */}
      <div className="card-header">
        <div className="header-left">
          <div className="card-icon">{icon}</div>
          <div className="header-content">
            {title && <h3 className="tool-title">{title}</h3>}
            {description && <p className="tool-description">{description}</p>}
          </div>
        </div>

        {interactive && (
          <button
            className="expand-button"
            onClick={(e) => {
              e.stopPropagation();
              handleExpandToggle();
            }}
            aria-label={isExpanded ? "Collapse card" : "Expand card"}
          >
            <span className="expand-icon">{isExpanded ? "➖" : "➕"}</span>
          </button>
        )}
      </div>

      {/* Stats Bar */}
      {statItems.length > 0 && (
        <div className="stats-bar">
          {statItems.map((stat) => (
            <div key={stat.key} className="stat-item">
              <span className="stat-icon">{stat.icon}</span>
              <div className="stat-info">
                <span className="stat-value">{stats[stat.key]}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Card Content */}
      <div className={`card-content ${isExpanded ? "expanded" : "collapsed"}`}>
        {isExpanded && <div className="expanded-content">{children}</div>}

        {!isExpanded && (
          <div className="preview-content">
            {React.Children.map(children, (child, index) => {
              // Show limited preview when collapsed
              if (index < 2) {
                return React.cloneElement(child, {
                  className: `${child.props.className || ""} preview`,
                });
              }
              return null;
            })}
            {interactive && (
              <div className="preview-overlay">
                <span className="preview-text">
                  Click to expand and use this tool
                </span>
                <span className="preview-icon">👇</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Footer */}
      {interactive && (
        <div className="card-footer">
          <div className="footer-actions">
            <button
              className="action-button favorite"
              onClick={(e) => {
                e.stopPropagation();
                // Handle favorite action
              }}
              aria-label="Add to favorites"
            >
              <span className="action-icon">❤️</span>
              <span className="action-text">Favorite</span>
            </button>

            <button
              className="action-button share"
              onClick={(e) => {
                e.stopPropagation();
                // Handle share action
              }}
              aria-label="Share tool"
            >
              <span className="action-icon">📤</span>
              <span className="action-text">Share</span>
            </button>
          </div>

          <div className="footer-info">
            <span className="info-item">
              <span className="info-icon">🕒</span>
              <span>Real-time calculation</span>
            </span>
            <span className="info-item">
              <span className="info-icon">🔒</span>
              <span>Secure & private</span>
            </span>
          </div>
        </div>
      )}

      {/* Hover Effects */}
      {interactive && (
        <>
          <div className="hover-effect effect-1"></div>
          <div className="hover-effect effect-2"></div>
          <div className="hover-effect effect-3"></div>
        </>
      )}
    </div>
  );
};

export default ToolCard;
