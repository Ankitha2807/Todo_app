// ============================================================
// Sidebar.jsx — Category navigation + stats
// ============================================================
// Concepts shown:
//   • Iterating over a config array with .map()
//   • Active state styling via className conditionals
//   • Props for data + callbacks
// ============================================================
 
import { CATEGORIES } from "../hooks/useTodos";
 
function Sidebar({ activeCategory, setActiveCategory, categoryCounts, stats }) {
  return (
    <aside className="sidebar">
      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Overall Progress</span>
          <span className="progress-pct">{stats.progress}%</span>
        </div>
        {/* The progress bar width is driven by CSS custom property */}
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
        <div className="progress-sub">
          {stats.completed} of {stats.total} tasks done
        </div>
      </div>
 
      {/* Overdue Warning */}
      {stats.overdue > 0 && (
        <div className="overdue-banner">
          ⚠ {stats.overdue} task{stats.overdue > 1 ? "s" : ""} overdue
        </div>
      )}
 
      {/* Category List */}
      <nav className="category-nav">
        <p className="nav-heading">Categories</p>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`cat-btn ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-label">{cat.label}</span>
            <span className="cat-count">{categoryCounts[cat.id] || 0}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
 
export default Sidebar;