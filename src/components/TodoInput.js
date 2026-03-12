// ============================================================
// TodoInput.jsx — Advanced input form
// ============================================================
// This component manages its own "form state" locally.
// When submitted, it passes the full data object UP to parent
// via the onAdd prop. The parent (App) never sees draft state.
//
// Concepts shown:
//   • Multiple useState for one form
//   • Controlled inputs for every field
//   • Conditional rendering (show/hide advanced options)
// ============================================================

import { useState } from "react";
import { PRIORITIES, CATEGORIES } from "../hooks/useTodos";

function TodoInput({ onAdd }) {
  const [text, setText]           = useState("");
  const [priority, setPriority]   = useState("medium");
  const [category, setCategory]   = useState("other");
  const [dueDate, setDueDate]     = useState("");
  const [expanded, setExpanded]   = useState(false); // show/hide options

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ text, priority, category, dueDate: dueDate || null });
    // Reset form
    setText("");
    setPriority("medium");
    setCategory("other");
    setDueDate("");
    setExpanded(false);
  };

  // Today's date in YYYY-MM-DD format — used as min for date picker
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      {/* Main text row */}
      <div className="input-row">
        <input
          className="main-input"
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          // When user starts typing, auto-expand options
          onFocus={() => setExpanded(true)}
        />
        <button
          type="button"
          className="options-toggle"
          onClick={() => setExpanded((p) => !p)}
          title="More options"
        >
          {expanded ? "−" : "+"}
        </button>
        <button type="submit" className="add-btn" disabled={!text.trim()}>
          Add Task
        </button>
      </div>

      {/* Expanded options — conditionally rendered */}
      {expanded && (
        <div className="input-options">
          {/* Priority Selector */}
          <div className="option-group">
            <label className="option-label">Priority</label>
            <div className="priority-pills">
              {Object.entries(PRIORITIES).map(([key, val]) => (
                <button
                  key={key}
                  type="button"
                  className={`priority-pill ${priority === key ? "selected" : ""}`}
                  style={{
                    "--pill-color": val.color,
                    borderColor: priority === key ? val.color : "transparent",
                    background:  priority === key ? val.color + "22" : "transparent",
                    color:       priority === key ? val.color : "var(--text-muted)",
                  }}
                  onClick={() => setPriority(key)}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div className="option-group">
            <label className="option-label">Category</label>
            <select
              className="option-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {/* Skip "all" — that's only for filtering */}
              {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div className="option-group">
            <label className="option-label">Due Date</label>
            <input
              type="date"
              className="option-select"
              value={dueDate}
              min={todayStr}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
      )}
    </form>
  );
}

export default TodoInput;