import React, { useState } from "react";

const NotesManager = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [searchText, setSearchText] = useState("");

  const addNote = () => {
    if (!noteText.trim()) return;

    setNotes([
      ...notes,
      {
        id: Date.now(),
        text: noteText,
        date: new Date().toLocaleDateString(),
        tags: noteText.match(/#\w+/g) || [],
      },
    ]);
    setNoteText("");
  };

  return (
    <div className="notes-manager">
      <div className="notes-input">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write your note here..."
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <div className="notes-search">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="notes-grid">
        {notes
          .filter((note) =>
            note.text.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((note) => (
            <div key={note.id} className="note-card">
              <p>{note.text}</p>
              <div className="note-footer">
                <span>{note.date}</span>
                {note.tags.map((tag, index) => (
                  <span key={index} className="note-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NotesManager;
