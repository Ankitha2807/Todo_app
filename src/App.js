// ============================================================
// App.jsx — Root component
// ============================================================
// This is the top of the component tree. It:
//   1. Calls useTodos() to get all state + actions
//   2. Passes data DOWN to children via props
//   3. Passes action functions DOWN so children can trigger updates
//
// Layout: two-column (Sidebar | Main)
// ============================================================

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

  // Get the active category info for the heading
  const activeCatInfo = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="app-root">
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

        {/* Footer */}
        {stats.total > 0 && (
          <footer className="main-footer">
            <span>{stats.active} task{stats.active !== 1 ? "s" : ""} remaining</span>
            <span className="footer-hint">Double-click any task to edit</span>
          </footer>
        )}
      </main>
    </div>
  );
}

export default App;