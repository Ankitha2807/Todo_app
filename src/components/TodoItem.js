// ============================================================
// TodoItem.jsx — Single task card
// ============================================================
// Shows: checkbox, text, priority badge, category, due date
// Supports: inline editing, delete
//
// Key concept: This component is "controlled" by its parent.
// It NEVER modifies data itself — it calls parent functions.
// ============================================================

import { useState } from "react";
import { PRIORITIES, CATEGORIES, isOverdue, isDueToday, formatDueDate } from "../hooks/useTodos";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText]   = useState(todo.text);

  const priority  = PRIORITIES[todo.priority];
  const catInfo   = CATEGORIES.find((c) => c.id === todo.category);
  const overdue   = isOverdue(todo.dueDate, todo.completed);
  const dueToday  = isDueToday(todo.dueDate, todo.completed);
  const formatted = formatDueDate(todo.dueDate);

  const saveEdit = () => {
    if (editText.trim()) onEdit(todo.id, { text: editText.trim() });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter")  saveEdit();
    if (e.key === "Escape") { setEditText(todo.text); setIsEditing(false); }
  };

  return (
    <div
      className={`todo-item ${todo.completed ? "is-completed" : ""} ${overdue ? "is-overdue" : ""}`}
      style={{ "--priority-color": priority.color }}
    >
      {/* Left: priority stripe */}
      <div className="priority-stripe" />

      {/* Checkbox */}
      <button
        className={`checkbox ${todo.completed ? "is-checked" : ""}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed && "✓"}
      </button>

      {/* Content */}
      <div className="item-content">
        {isEditing ? (
          <input
            className="inline-edit"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span
            className="item-text"
            onDoubleClick={() => !todo.completed && setIsEditing(true)}
            title={todo.completed ? "" : "Double-click to edit"}
          >
            {todo.text}
          </span>
        )}

        {/* Meta row: category + due date */}
        <div className="item-meta">
          {/* Category pill */}
          <span className="meta-tag">
            {catInfo?.icon} {catInfo?.label}
          </span>

          {/* Due date — color coded */}
          {formatted && (
            <span className={`meta-tag due-tag ${overdue ? "overdue" : dueToday ? "due-today" : ""}`}>
              {overdue ? "⚠ Overdue · " : dueToday ? "⏰ Today · " : "📅 "}
              {formatted}
            </span>
          )}
        </div>
      </div>

      {/* Right: priority badge + delete */}
      <div className="item-actions">
        {/* Inline priority changer */}
        <select
          className="priority-select"
          value={todo.priority}
          onChange={(e) => onEdit(todo.id, { priority: e.target.value })}
          style={{ color: priority.color }}
          title="Change priority"
        >
          {Object.entries(PRIORITIES).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>

        <button
          className="delete-btn"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default TodoItem;