import "./Tools.css";
import { useState, useEffect } from "react";

// ✅ Tools components imports (yahin lagte hain)
import GSTCalculator from "../../components/ToolCard/GSTCalculator";
import ProfitLossCalculator from "../../components/ToolCard/ProfitLossCalculator";
import CompoundInterestCalculator from "../../components/ToolCard/CompoundInterestCalculator";
import WordCounter from "../../components/ToolCard/WordCounter";
import ImageCompressor from "../../components/ToolCard/ImageCompressor";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";

const Tools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [tools, setTools] = useState([
    {
      id: 1,
      name: "GST Calculator",
      component: GSTCalculator,
      category: "finance",
      usage: 1254,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Profit/Loss Calculator",
      component: ProfitLossCalculator,
      category: "finance",
      usage: 987,
      rating: 4.6,
    },
    {
      id: 3,
      name: "Compound Interest Calculator",
      component: CompoundInterestCalculator,
      category: "finance",
      usage: 1420,
      rating: 4.9,
    },
    {
      id: 4,
      name: "Word Counter",
      component: WordCounter,
      category: "text",
      usage: 2531,
      rating: 4.7,
    },
    {
      id: 5,
      name: "Image Compressor",
      component: ImageCompressor,
      category: "media",
      usage: 1789,
      rating: 4.5,
    },
  ]);

  const [filteredTools, setFilteredTools] = useState(tools);
  const [showStats, setShowStats] = useState(true);

  const categories = [
    { id: "all", name: "All Tools", icon: "🛠️", count: tools.length },
    {
      id: "finance",
      name: "Finance",
      icon: "💰",
      count: tools.filter((t) => t.category === "finance").length,
    },
    {
      id: "text",
      name: "Text Tools",
      icon: "📝",
      count: tools.filter((t) => t.category === "text").length,
    },
    {
      id: "media",
      name: "Media Tools",
      icon: "🖼️",
      count: tools.filter((t) => t.category === "media").length,
    },
  ];

  // Filter tools based on search and category
  useEffect(() => {
    let filtered = tools;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTools(filtered);
  }, [searchQuery, selectedCategory, tools]);

  const totalUsage = tools.reduce((sum, tool) => sum + tool.usage, 0);
  const averageRating = (
    tools.reduce((sum, tool) => sum + tool.rating, 0) / tools.length
  ).toFixed(1);

  return (
    <div className="tools">
      {/* Hero Section */}
      <section className="tools-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Utility Tools</span> Collection
          </h1>
          <p className="hero-subtitle">
            A curated collection of powerful, easy-to-use tools for your daily
            needs. From financial calculations to text and media utilities.
          </p>
        </div>

        {/* Stats Overview */}
        {showStats && (
          <div className="stats-overview">
            <div className="stat-card">
              <div className="stat-icon">
                <FiTrendingUp />
              </div>
              <div className="stat-info">
                <h3>{totalUsage.toLocaleString()}</h3>
                <p>Total Uses</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FiStar />
              </div>
              <div className="stat-info">
                <h3>{averageRating}</h3>
                <p>Avg Rating</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FiDownload />
              </div>
              <div className="stat-info">
                <h3>{tools.length}</h3>
                <p>Total Tools</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Controls Section */}
      <div className="tools-controls">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search tools..."
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

        <div className="controls-right">
          <div className="filter-container">
            <FiFilter className="filter-icon" />
            <select
              className="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name} ({cat.count})
                </option>
              ))}
            </select>
          </div>

          <button
            className="stats-toggle"
            onClick={() => setShowStats(!showStats)}
          >
            {showStats ? "Hide Stats" : "Show Stats"}
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-tab ${
              selectedCategory === cat.id ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span className="tab-icon">{cat.icon}</span>
            <span className="tab-name">{cat.name}</span>
            <span className="tab-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <>
          <div className="tools-grid-info">
            <p>
              Showing <strong>{filteredTools.length}</strong> of {tools.length}{" "}
              tools
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== "all" &&
                ` in ${
                  categories.find((c) => c.id === selectedCategory)?.name
                }`}
            </p>
          </div>

          <div className="tools-grid">
            {filteredTools.map((tool, index) => (
              <div
                key={tool.id}
                className="tool-card-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="tool-card-header">
                  <div className="tool-badge">{tool.category}</div>
                  <div className="tool-rating">
                    <FiStar /> {tool.rating}
                  </div>
                </div>
                <div className="tool-card-content">
                  <tool.component />
                </div>
                <div className="tool-card-footer">
                  <span className="tool-name">{tool.name}</span>
                  <span className="tool-usage">
                    <FiTrendingUp /> {tool.usage.toLocaleString()} uses
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No tools found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button
            className="reset-filters"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3 className="actions-title">Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn">
            <FiDownload /> Export All Tools
          </button>
          <button className="action-btn">
            <FiStar /> Mark as Favorite
          </button>
          <button className="action-btn">
            <span role="img" aria-label="suggest">
              💡
            </span>{" "}
            Suggest New Tool
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <div className="tools-footer">
        <p className="footer-note">
          <strong>Note:</strong> All calculations are performed locally in your
          browser. Your data is never sent to any server.
        </p>
        <p className="footer-update">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default Tools;
