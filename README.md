✦ My Todo App
A clean, modern Todo app built with React. Features include:

✅ Add, edit (double-click), delete tasks
✅ Mark tasks as complete
✅ Filter by All / Active / Completed
✅ Data persists via localStorage (survives page refresh)
✅ Responsive design


📁 Project Structure
src/
├── components/
│   ├── TodoInput.jsx   → Input box to add todos
│   ├── TodoItem.jsx    → Single todo card
│   └── TodoFilter.jsx  → Filter tabs
├── hooks/
│   └── useTodos.js     → All todo logic (custom hook)
├── App.jsx             → Main app component
└── App.css             → Styles