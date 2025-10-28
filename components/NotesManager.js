// components/NotesManager.js
import React, { useState } from "react";

const NotesManager = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        content: newNote,
        createdAt: new Date().toISOString(),
        tags: extractTags(newNote),
      };
      setNotes([...notes, note]);
      setNewNote("");
    }
  };

  const extractTags = (content) => {
    const tagRegex = /#(\w+)/g;
    const tags = [];
    let match;
    while ((match = tagRegex.exec(content)) !== null) {
      tags.push(match[1]);
    }
    return tags;
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="notes-manager">
      <div className="notes-input">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here... Use #tags to categorize"
          rows="4"
        />
        <button onClick={addNote}>Add Note</button>
      </div>

      <div className="notes-search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search notes or tags..."
        />
      </div>

      <div className="notes-grid">
        {filteredNotes.map((note) => (
          <div key={note.id} className="note-card">
            <div className="note-content">
              {note.content.split(/(#\w+)/).map((part, index) =>
                part.startsWith("#") ? (
                  <span key={index} className="note-tag">
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </div>
            <div className="note-footer">
              <span className="note-date">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
              <button
                className="delete-btn"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesManager;
