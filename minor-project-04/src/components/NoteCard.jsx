function NoteCard({ note, onDelete }) {
  return (
    <div className="note-card">
      <div className="note-header">
        <h3>{note.title}</h3>

        <button
          className="delete-btn"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>

      <p>{note.content}</p>
    </div>
  );
}

export default NoteCard;