function TodoItem({ task, onComplete, onDelete }) {
  return (
    <div className={`todo-item ${task.completed ? "completed-task" : ""}`}>
      <div>
        <h3>{task.title}</h3>

        <span className="status">
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="todo-actions">
        <button onClick={() => onComplete(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;