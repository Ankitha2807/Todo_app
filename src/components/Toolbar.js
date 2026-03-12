// ============================================================
// Toolbar.jsx — Status filters + sort controls + theme toggle
// ============================================================

function Toolbar({ filter, setFilter, sortBy, setSortBy, stats, onClearCompleted, theme, toggleTheme }) {
  const filters = [
    { key: "all",       label: "All",       count: stats.total },
    { key: "active",    label: "Active",    count: stats.active },
    { key: "completed", label: "Completed", count: stats.completed },
  ];

  return (
    <div className="toolbar">
      {/* Status filter tabs */}
      <div className="filter-tabs">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`filter-tab ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className="tab-count">{f.count}</span>
          </button>
        ))}
      </div>

      {/* Right side controls */}
      <div className="toolbar-right">
        {/* Sort dropdown */}
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          title="Sort tasks"
        >
          <option value="created">Latest first</option>
          <option value="priority">By priority</option>
          <option value="dueDate">By due date</option>
        </select>

        {/* Clear completed */}
        {stats.completed > 0 && (
          <button className="clear-btn" onClick={onClearCompleted}>
            Clear done
          </button>
        )}

        {/* Theme toggle */}
        <button
          className="theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}

export default Toolbar;