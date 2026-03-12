// ============================================================
// TodoFilter.jsx — Filter tabs: All / Active / Completed
// ============================================================
 
function TodoFilter({ filter, setFilter, counts, onClearCompleted }) {
  // Define the tabs as an array so we can .map() over them
  // This is cleaner than writing 3 separate <button> elements
  const tabs = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];
 
  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        {tabs.map((tab) => (
          // The "key" prop is required when rendering lists in React.
          // React uses it to track which items changed, added, or removed.
          <button
            key={tab.key}
            className={`filter-tab ${filter === tab.key ? "active" : ""}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
            <span className="filter-count">{counts[tab.key]}</span>
          </button>
        ))}
      </div>
 
      {/* Only show "Clear Completed" button if there are completed todos */}
      {counts.completed > 0 && (
        <button className="clear-btn" onClick={onClearCompleted}>
          Clear Completed
        </button>
      )}
    </div>
  );
}
 
export default TodoFilter;