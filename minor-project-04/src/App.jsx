import { useState } from "react";
import TodoApp from "./components/TodoApp";
import NotesApp from "./components/NotesApp";

function App() {
  const [page, setPage] = useState("todo");

  return (
    <div>
      <header>
        <h1>PRODUCTIVITY HUB</h1>
        <p>Manage your tasks and notes easily</p>
      </header>

      <nav>
        <button
          className={page === "todo" ? "active" : ""}
          onClick={() => setPage("todo")}
        >
          To-Do App
        </button>

        <button
          className={page === "notes" ? "active" : ""}
          onClick={() => setPage("notes")}
        >
          Notes App
        </button>
      </nav>

      {page === "todo" ? <TodoApp /> : <NotesApp />}
    </div>
  );
}

export default App;