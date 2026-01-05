import { useEffect, useState } from "react";
import API from "../../utils/api";
import FriendCard from "../../components/FriendCard/FriendCard";
import "./Friends.css";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProfession, setFilterProfession] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Mock data for fallback if API fails
  const mockFriends = [
    {
      _id: 1,
      name: "John Doe",
      profession: "Frontend Developer",
      message: "Great collaborator and excellent problem solver!",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      skills: ["React", "TypeScript", "UI/UX", "JavaScript"],
    },
    {
      _id: 2,
      name: "Jane Smith",
      profession: "Backend Engineer",
      message: "Always delivers clean and efficient code.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      skills: ["Node.js", "Python", "AWS", "Docker"],
    },
    {
      _id: 3,
      name: "Mike Johnson",
      profession: "Full Stack Developer",
      message: "Great mentor and team player.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/mikejohnson",
      linkedin: "https://linkedin.com/in/mikejohnson",
      skills: ["React", "Node.js", "MongoDB", "GraphQL"],
    },
    {
      _id: 4,
      name: "Sarah Williams",
      profession: "UI/UX Designer",
      message: "Creates beautiful and intuitive user interfaces.",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/sarahwilliams",
      linkedin: "https://linkedin.com/in/sarahwilliams",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    },
    {
      _id: 5,
      name: "David Brown",
      profession: "DevOps Engineer",
      message: "Expert in cloud infrastructure and CI/CD pipelines.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/davidbrown",
      linkedin: "https://linkedin.com/in/davidbrown",
      skills: ["AWS", "Kubernetes", "Terraform", "Jenkins"],
    },
    {
      _id: 6,
      name: "Emily Davis",
      profession: "Mobile Developer",
      message: "Passionate about building amazing mobile experiences.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/emilydavis",
      linkedin: "https://linkedin.com/in/emilydavis",
      skills: ["React Native", "Flutter", "iOS", "Android"],
    },
  ];

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from API
        const res = await API.get("/friends");

        // Process images to ensure they have proper URLs
        const processedFriends = res.data.map((friend) => ({
          ...friend,
          image: processImageUrl(friend.image),
        }));

        setFriends(processedFriends);
      } catch (err) {
        console.error(
          "Failed to fetch friends from API, using mock data:",
          err
        );
        setError("Could not load friends from server. Showing demo data.");
        setFriends(mockFriends); // Use mock data as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  // Helper function to process image URLs
  const processImageUrl = (imageUrl) => {
    if (!imageUrl) {
      // Generate a placeholder image based on name
      return `https://ui-avatars.com/api/?name=Friend&background=random&color=fff&size=400`;
    }

    // If it's already a full URL, return as is
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }

    // If it's a relative path, convert to absolute
    if (imageUrl.startsWith("/")) {
      return `${window.location.origin}${imageUrl}`;
    }

    // If it's just a filename, assume it's in public/images
    return `/images/${imageUrl}`;
  };

  // Filter and sort friends
  const filteredAndSortedFriends = friends
    .filter((friend) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.message.toLowerCase().includes(searchQuery.toLowerCase());

      // Profession filter
      const matchesProfession =
        filterProfession === "all" ||
        friend.profession
          .toLowerCase()
          .includes(filterProfession.toLowerCase());

      return matchesSearch && matchesProfession;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "profession":
          return a.profession.localeCompare(b.profession);
        case "newest":
          return b._id - a._id;
        default:
          return 0;
      }
    });

  // Get unique professions for filter
  const professions = ["all", ...new Set(friends.map((f) => f.profession))];

  // Add a friend (for demo purposes)
  const handleAddDemoFriend = () => {
    const newFriend = {
      _id: friends.length + 1,
      name: "Demo Friend",
      profession: "Software Developer",
      message: "Added for demonstration purposes!",
      image: `https://ui-avatars.com/api/?name=Demo+Friend&background=${getRandomColor()}&color=fff&size=400`,
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      skills: ["JavaScript", "React", "Node.js"],
    };

    setFriends((prev) => [newFriend, ...prev]);
  };

  const getRandomColor = () => {
    const colors = ["4361ee", "4cc9f0", "7209b7", "2ecc71", "f39c12"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="friends-page">
      {/* Hero Section */}
      <section className="friends-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Friends</span> & Colleagues
          </h1>
          <p className="hero-subtitle">
            A collection of amazing people I've worked with and learned from
            throughout my journey.
          </p>
        </div>

        {/* Stats */}
        <div className="friends-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{friends.length}</h3>
              <p>Total Friends</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💼</div>
            <div className="stat-info">
              <h3>{new Set(friends.map((f) => f.profession)).size}</h3>
              <p>Professions</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌟</div>
            <div className="stat-info">
              <h3>100%</h3>
              <p>Awesome People</p>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className="friends-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search friends by name, profession, or message..."
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

        <div className="filter-controls">
          <div className="filter-group">
            <label className="filter-label">
              <span className="filter-icon">💼</span> Filter by Profession
            </label>
            <select
              className="profession-select"
              value={filterProfession}
              onChange={(e) => setFilterProfession(e.target.value)}
            >
              {professions.map((profession) => (
                <option key={profession} value={profession}>
                  {profession === "all" ? "All Professions" : profession}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <span className="filter-icon">🔤</span> Sort by
            </label>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name (A-Z)</option>
              <option value="profession">Profession</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          <button className="demo-button" onClick={handleAddDemoFriend}>
            <span>➕</span> Add Demo Friend
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-alert">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading friends...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Results Info */}
          <div className="results-info">
            <p>
              Showing <strong>{filteredAndSortedFriends.length}</strong> of{" "}
              {friends.length} friends
              {searchQuery && ` for "${searchQuery}"`}
              {filterProfession !== "all" && ` in ${filterProfession}`}
            </p>
          </div>

          {/* Friends Grid */}
          <div className="friends-grid">
            {filteredAndSortedFriends.length > 0 ? (
              filteredAndSortedFriends.map((friend) => (
                <FriendCard
                  key={friend._id}
                  name={friend.name}
                  profession={friend.profession}
                  message={friend.message}
                  image={friend.image}
                  github={friend.github}
                  linkedin={friend.linkedin}
                  skills={friend.skills}
                />
              ))
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No friends found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <button
                  className="reset-filters"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterProfession("all");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Footer Note */}
      <div className="friends-footer">
        <div className="footer-note">
          <span className="note-icon">💡</span>
          <p>
            <strong>Note:</strong> Friend images are loaded from Unsplash. In a
            real application, these would be actual photos of colleagues and
            friends.
          </p>
        </div>
        <div className="footer-tip">
          <span className="tip-icon">👆</span>
          <p>Click on any friend card to flip it and see more details!</p>
        </div>
      </div>
    </div>
  );
};

export default Friends;
