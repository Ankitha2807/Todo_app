# ✦ TaskFlow — React Todo App

A production-quality task manager built with React. Designed with a full dark/light theme, category management, priority levels, and a fully responsive mobile experience.

🔗 **Live Demo:** [ankitha2807.github.io/Todo_app](https://ankitha2807.github.io/Todo_app)

---
---

## ✨ Features

- 🔴🟡🟢 **Priority levels** — High / Medium / Low with color-coded left border on every task
- 🗂 **Categories** — Work, Personal, Health, Learning, Other with per-category task counts
- 📅 **Due dates** — Overdue tasks highlighted in red, due-today tasks highlighted in blue
- 🌙☀️ **Dark / Light theme** — Persists across sessions, auto-detects system preference
- 📊 **Progress bar** — Live completion percentage tracking
- 🔍 **Smart filtering** — Filter by All / Active / Completed, sort by date, priority, or due date
- 💾 **Persists on refresh** — All tasks saved in localStorage, never lost on page reload
- ✏️ **Inline editing** — Double-click any task to edit it in place
- 📱 **Fully responsive** — Bottom navigation bar + slide-up category drawer on mobile

---

## 📱 Mobile Experience

On mobile screens the layout transforms completely:
- Sidebar replaced by a **bottom navigation bar**
- Categories open in a **slide-up drawer sheet**
- Progress bar moves to the **top of the screen**
- All buttons have **large touch targets** (48px minimum)

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/Ankitha2807/Todo_app.git

# Go into the folder
cd Todo_app

# Install dependencies
npm install

# Start the dev server
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── TodoInput.jsx    → Add task form (text, priority, category, due date)
│   ├── TodoItem.jsx     → Single task card with inline editing
│   ├── Sidebar.jsx      → Category navigation + progress bar (desktop)
│   └── Toolbar.jsx      → Status filters + sort controls
├── hooks/
│   └── useTodos.js      → All state and business logic (custom hook)
├── App.jsx              → Root layout + mobile bottom nav + category drawer
├── App.css              → Complete design system (dark + light + responsive)
└── index.js             → React 19 entry point
```

---

## 🧠 React Concepts Used

| Concept | Where it's used |
|---|---|
| `useState` | Form fields, UI toggles, mobile drawer open/close |
| `useEffect` | Sync todos to localStorage, apply theme to `<html>` |
| `useCallback` | Memoized action functions to avoid unnecessary re-renders |
| Custom Hook (`useTodos`) | Separates all business logic from UI components |
| Props & callbacks | Parent → child data flow, child → parent event handling |
| Controlled inputs | Every form field (text, select, date) |
| Derived state | Filtered + sorted todo list computed from raw state |
| Conditional rendering | Empty states, overdue banners, mobile drawer |
| CSS Custom Properties | Complete dark + light theme without any library |
| `data-theme` attribute | Applied to `<html>` so CSS variables work globally |

---

## 🎨 Design System

The entire theme is built with CSS custom properties — no external UI library used.

```css
/* Two complete themes defined in App.css */
[data-theme="dark"]  { --bg: #0c0e14; --accent: #6366f1; ... }
[data-theme="light"] { --bg: #f4f5f7; --accent: #6366f1; ... }
```

Switching themes is as simple as:
```js
document.documentElement.setAttribute("data-theme", "dark");
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI library |
| Vanilla CSS + Custom Properties | Styling + theming |
| localStorage | Client-side data persistence |
| GitHub Pages + gh-pages | Free hosting + deployment |

No Redux. No UI library. No CSS framework. Just clean React + CSS.

---

## 🌱 What I Learned

This was my first React project as a fresher. Key learnings:

- How React's **one-way data flow** works (props down, callbacks up)
- Why you should **never mutate state directly** — always use `setState` with a new object/array
- How **custom hooks** keep components clean by separating logic from UI
- How **CSS custom properties** enable a full theme system without any library
- How to **deploy** a React app to GitHub Pages

---

_Built while learning React — open to feedback and suggestions!_ 🙏
