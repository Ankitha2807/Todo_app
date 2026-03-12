// ============================================================
// useTodos.js — Custom Hook (The Brain of the App)
// ============================================================
// All state and logic lives here. Components stay "dumb" —
// they just display data and call functions from this hook.
//
// Features:
//   • Priority levels (high / medium / low)
//   • Due dates with overdue detection
//   • Categories (Work, Personal, Health, Learning, Other)
//   • Progress tracking
//   • Dark/light theme with system preference detection
// ============================================================
 
import { useState, useEffect, useCallback } from "react";
 
// ---- Constants ------------------------------------------------
// Defining as constants avoids typos and makes code self-documenting
 
export const PRIORITIES = {
  high:   { label: "High",   color: "#ef4444", bg: "#fef2f2", darkBg: "#2d1515" },
  medium: { label: "Medium", color: "#f59e0b", bg: "#fffbeb", darkBg: "#2d2510" },
  low:    { label: "Low",    color: "#22c55e", bg: "#f0fdf4", darkBg: "#122010" },
};
 
export const CATEGORIES = [
  { id: "all",      label: "All Tasks",  icon: "◈" },
  { id: "work",     label: "Work",       icon: "💼" },
  { id: "personal", label: "Personal",   icon: "🏠" },
  { id: "health",   label: "Health",     icon: "💪" },
  { id: "learning", label: "Learning",   icon: "📚" },
  { id: "other",    label: "Other",      icon: "✦"  },
];
 
// ---- Helpers --------------------------------------------------
export const isOverdue = (dueDate, completed) => {
  if (!dueDate || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
};
 
export const isDueToday = (dueDate, completed) => {
  if (!dueDate || completed) return false;
  return dueDate === new Date().toISOString().split("T")[0];
};
 
export const formatDueDate = (dueDate) => {
  if (!dueDate) return null;
  return new Date(dueDate + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
};
 
// ---- The Hook -------------------------------------------------
export function useTodos() {
 
  // THEME — detect system preference as default
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
 
  // Apply theme class to <html> so CSS variables work everywhere
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
 
  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));
 
  // TODOS — stored under "todos-v2" (new schema with priority/category/dueDate)
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos-v2");
    return saved ? JSON.parse(saved) : [];
  });
 
  useEffect(() => {
    localStorage.setItem("todos-v2", JSON.stringify(todos));
  }, [todos]);
 
  // UI filters
  const [filter, setFilter]                   = useState("all");
  const [activeCategory, setActiveCategory]   = useState("all");
  const [sortBy, setSortBy]                   = useState("created");
 
  // ADD
  const addTodo = useCallback((data) => {
    if (!data.text?.trim()) return;
    setTodos((prev) => [{
      id:          Date.now(),
      text:        data.text.trim(),
      completed:   false,
      priority:    data.priority  || "medium",
      category:    data.category  || "other",
      dueDate:     data.dueDate   || null,
      createdAt:   new Date().toISOString(),
      completedAt: null,
    }, ...prev]);
  }, []);
 
  // TOGGLE
  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : null }
          : t
      )
    );
  }, []);
 
  // DELETE
  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);
 
  // EDIT — accepts partial updates object e.g. { text: "new" } or { priority: "high" }
  const editTodo = useCallback((id, updates) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);
 
  // CLEAR COMPLETED
  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);
 
  // DERIVED DATA
  // 1. Category filter
  const byCat = activeCategory === "all" ? todos : todos.filter((t) => t.category === activeCategory);
 
  // 2. Status filter
  const byStatus = byCat.filter((t) => {
    if (filter === "active")    return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });
 
  // 3. Sort
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sorted = [...byStatus].sort((a, b) => {
    if (sortBy === "priority") return priorityOrder[a.priority] - priorityOrder[b.priority];
    if (sortBy === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return new Date(b.createdAt) - new Date(a.createdAt); // newest first
  });
 
  const stats = {
    total:     todos.length,
    completed: todos.filter((t) => t.completed).length,
    active:    todos.filter((t) => !t.completed).length,
    overdue:   todos.filter((t) => isOverdue(t.dueDate, t.completed)).length,
    progress:  todos.length === 0 ? 0 : Math.round((todos.filter((t) => t.completed).length / todos.length) * 100),
  };
 
  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = cat.id === "all" ? todos.length : todos.filter((t) => t.category === cat.id).length;
    return acc;
  }, {});
 
  return {
    filteredTodos: sorted, stats, categoryCounts,
    theme, filter, activeCategory, sortBy,
    toggleTheme, setFilter, setActiveCategory, setSortBy,
    addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted,
  };
}