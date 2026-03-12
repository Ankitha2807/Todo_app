// ============================================================
// App.jsx — Root component (fully responsive)
// ============================================================
// Layout:
//   Desktop (>700px): Sidebar on left + Main panel on right
//   Mobile  (≤700px): Full screen main + Bottom navigation bar
//
// NEW: useState for mobileDrawerOpen controls the slide-up
// category drawer on mobile when user taps "Categories"
// ============================================================

import { useState } from "react";
import "./App.css";
import { useTodos, CATEGORIES } from "./hooks/useTodos";
import TodoInput  from "./components/TodoInput";
import TodoItem   from "./components/TodoItem";
import Sidebar    from "./components/Sidebar";
import Toolbar    from "./components/Toolbar";

function App() {
  const {
    filteredTodos, stats, categoryCounts,
    theme, filter, activeCategory, sortBy,
    toggleTheme, setFilter, setActiveCategory, setSortBy,
    addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted,
  } = useTodos();

  // Controls the mobile category drawer (slide up sheet)
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeCatInfo = CATEGORIES.find((c) => c.id === activeCategory);

  // When user picks a category from mobile drawer, close drawer too
  const handleMobileCategorySelect = (catId) => {
    setActiveCategory(catId);
    setDrawerOpen(false);
  };

  return (
    <div className="app-root">
      {/* ---- Desktop Sidebar (hidden on mobile via CSS) ---- */}
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categoryCounts={categoryCounts}
        stats={stats}
      />

      <main className="main-panel">
        {/* Header */}
        <header className="main-header">
          <div className="header-left">
            <h1 className="app-title">
              <span className="title-icon">{activeCatInfo?.icon}</span>
              {activeCatInfo?.label}
            </h1>
            <p className="app-date">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long", day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          </div>
          <button className="theme-btn-header" onClick={toggleTheme} title="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </header>

        {/* Mobile progress bar (only shown on mobile) */}
        <div className="mobile-progress">
          <div className="mobile-progress-row">
            <span className="mobile-progress-label">{stats.progress}% complete</span>
            <span className="mobile-progress-sub">{stats.active} remaining</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${stats.progress}%` }} />
          </div>
        </div>

        {/* Add task form */}
        <TodoInput onAdd={addTodo} />

        {/* Filter + sort toolbar */}
        <Toolbar
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          stats={stats}
          onClearCompleted={clearCompleted}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* Task list */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                {filter === "completed" ? "🎉" : "📋"}
              </div>
              <p className="empty-title">
                {filter === "completed"
                  ? "No completed tasks yet"
                  : filter === "active"
                  ? "All caught up!"
                  : "No tasks here yet"}
              </p>
              <p className="empty-sub">
                {filter === "all" && "Add your first task above"}
                {filter === "active" && "Add a new task to get started"}
                {filter === "completed" && "Complete some tasks to see them here"}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        {/* Footer — desktop only */}
        {stats.total > 0 && (
          <footer className="main-footer">
            <span>{stats.active} task{stats.active !== 1 ? "s" : ""} remaining</span>
            <span className="footer-hint">Double-click any task to edit</span>
          </footer>
        )}
      </main>

      {/* ============================================================
          MOBILE BOTTOM NAV BAR
          Only visible on mobile (≤700px) via CSS display:none/flex
          ============================================================ */}
      <nav className="mobile-bottom-nav">
        {/* Tasks tab */}
        <button
          className={`mobile-nav-btn ${filter !== "completed" && !drawerOpen ? "active" : ""}`}
          onClick={() => { setFilter("all"); setDrawerOpen(false); }}
        >
          <span className="mobile-nav-icon">📋</span>
          <span className="mobile-nav-label">Tasks</span>
        </button>

        {/* Active tab */}
        <button
          className={`mobile-nav-btn ${filter === "active" && !drawerOpen ? "active" : ""}`}
          onClick={() => { setFilter("active"); setDrawerOpen(false); }}
        >
          <span className="mobile-nav-icon">⚡</span>
          <span className="mobile-nav-label">Active</span>
          {stats.active > 0 && <span className="mobile-nav-badge">{stats.active}</span>}
        </button>

        {/* Categories tab — opens drawer */}
        <button
          className={`mobile-nav-btn ${drawerOpen ? "active" : ""}`}
          onClick={() => setDrawerOpen((p) => !p)}
        >
          <span className="mobile-nav-icon">🗂</span>
          <span className="mobile-nav-label">Categories</span>
        </button>

        {/* Done tab */}
        <button
          className={`mobile-nav-btn ${filter === "completed" && !drawerOpen ? "active" : ""}`}
          onClick={() => { setFilter("completed"); setDrawerOpen(false); }}
        >
          <span className="mobile-nav-icon">✅</span>
          <span className="mobile-nav-label">Done</span>
        </button>
      </nav>

      {/* ============================================================
          MOBILE CATEGORY DRAWER (slide up sheet)
          Appears when user taps "Categories" in bottom nav
          ============================================================ */}
      {drawerOpen && (
        // Backdrop — tap outside to close
        <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)}>
          <div
            className="category-drawer"
            // Stop click from bubbling to backdrop
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-handle" />
            <p className="drawer-title">Categories</p>

            {/* Progress inside drawer */}
            <div className="drawer-progress">
              <div className="mobile-progress-row">
                <span className="mobile-progress-label">{stats.progress}% complete</span>
                <span className="mobile-progress-sub">{stats.completed} of {stats.total} done</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${stats.progress}%` }} />
              </div>
            </div>

            {/* Overdue warning */}
            {stats.overdue > 0 && (
              <div className="overdue-banner">
                ⚠ {stats.overdue} task{stats.overdue > 1 ? "s" : ""} overdue
              </div>
            )}

            {/* Category grid */}
            <div className="drawer-categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`drawer-cat-btn ${activeCategory === cat.id ? "active" : ""}`}
                  onClick={() => handleMobileCategorySelect(cat.id)}
                >
                  <span className="drawer-cat-icon">{cat.icon}</span>
                  <span className="drawer-cat-label">{cat.label}</span>
                  <span className="drawer-cat-count">{categoryCounts[cat.id] || 0}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;