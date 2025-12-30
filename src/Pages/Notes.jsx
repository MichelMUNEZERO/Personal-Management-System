import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaStickyNote,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaSearch,
  FaThumbtack,
  FaThLarge,
  FaList,
  FaTag,
  FaClock,
  FaLightbulb,
  FaBriefcase,
  FaBook,
  FaShoppingCart,
  FaHeart,
  FaCode,
} from "react-icons/fa";
import "./Notes.css";

export default function Notes() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "ideas",
    color: "#5a6945",
  });

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Project Ideas for 2025",
      content:
        "1. Build a productivity app with AI features\n2. Create a personal finance tracker\n3. Develop a habit tracking mobile app\n4. Launch a tech blog\n5. Contribute to open-source projects",
      category: "ideas",
      color: "#5a6945",
      pinned: true,
      createdAt: "2025-12-15T10:30:00",
      updatedAt: "2025-12-30T14:20:00",
    },
    {
      id: 2,
      title: "Meeting Notes - Team Sync",
      content:
        "Discussed Q1 2026 roadmap:\n- Launch new dashboard redesign\n- Implement user authentication\n- Add analytics features\n- Mobile app development\n\nAction items: Review mockups by Friday",
      category: "work",
      color: "#6b7a54",
      pinned: false,
      createdAt: "2025-12-29T09:00:00",
      updatedAt: "2025-12-29T09:00:00",
    },
    {
      id: 3,
      title: "Shopping List",
      content:
        "Groceries:\n- Fresh vegetables\n- Whole grain bread\n- Greek yogurt\n- Chicken breast\n- Brown rice\n- Fruits (apples, bananas)\n- Almond milk",
      category: "personal",
      color: "#8a9876",
      pinned: false,
      createdAt: "2025-12-30T08:15:00",
      updatedAt: "2025-12-30T08:15:00",
    },
    {
      id: 4,
      title: "React Best Practices",
      content:
        "Key learnings:\n- Use functional components with hooks\n- Implement proper error boundaries\n- Optimize with React.memo and useMemo\n- Keep components small and focused\n- Use Context API for global state\n- Write reusable custom hooks",
      category: "learning",
      color: "#a8b89c",
      pinned: true,
      createdAt: "2025-12-20T16:45:00",
      updatedAt: "2025-12-28T11:30:00",
    },
    {
      id: 5,
      title: "Book Recommendations",
      content:
        "Must read:\n- Atomic Habits by James Clear\n- Deep Work by Cal Newport\n- The Pragmatic Programmer\n- Clean Code by Robert Martin\n- Thinking, Fast and Slow",
      category: "learning",
      color: "#a8b89c",
      pinned: false,
      createdAt: "2025-12-18T14:00:00",
      updatedAt: "2025-12-18T14:00:00",
    },
    {
      id: 6,
      title: "Code Snippet - API Handler",
      content:
        "const handleAPICall = async (endpoint) => {\n  try {\n    const response = await fetch(endpoint);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('API Error:', error);\n  }\n}",
      category: "code",
      color: "#556342",
      pinned: false,
      createdAt: "2025-12-25T13:20:00",
      updatedAt: "2025-12-25T13:20:00",
    },
  ]);

  const categories = [
    { value: "all", label: "All Notes", icon: FaStickyNote, color: "#5a6945" },
    { value: "ideas", label: "Ideas", icon: FaLightbulb, color: "#5a6945" },
    { value: "work", label: "Work", icon: FaBriefcase, color: "#6b7a54" },
    { value: "personal", label: "Personal", icon: FaHeart, color: "#8a9876" },
    { value: "learning", label: "Learning", icon: FaBook, color: "#a8b89c" },
    { value: "code", label: "Code", icon: FaCode, color: "#556342" },
  ];

  const colorOptions = [
    { value: "#5a6945", label: "Green" },
    { value: "#6b7a54", label: "Sage" },
    { value: "#8a9876", label: "Olive" },
    { value: "#a8b89c", label: "Mint" },
    { value: "#556342", label: "Forest" },
    { value: "#f59e0b", label: "Amber" },
    { value: "#10b981", label: "Emerald" },
    { value: "#6366f1", label: "Indigo" },
  ];

  const getFilteredNotes = () => {
    let filtered = notes;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((note) => note.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  };

  const handleAddNote = () => {
    const note = {
      id: notes.length + 1,
      ...newNote,
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([note, ...notes]);
    setShowAddModal(false);
    setNewNote({
      title: "",
      content: "",
      category: "ideas",
      color: "#5a6945",
    });
  };

  const handleEditNote = () => {
    setNotes(
      notes.map((n) =>
        n.id === selectedNote.id
          ? { ...selectedNote, updatedAt: new Date().toISOString() }
          : n
      )
    );
    setShowEditModal(false);
    setSelectedNote(null);
  };

  const handleDeleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  const togglePin = (id) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const getStats = () => {
    return {
      total: notes.length,
      pinned: notes.filter((n) => n.pinned).length,
      recent: notes.filter((n) => {
        const created = new Date(n.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return created > weekAgo;
      }).length,
    };
  };

  const stats = getStats();
  const filteredNotes = getFilteredNotes();

  return (
    <div className="notes-page">
      <div className="notes-container">
        {/* Header */}
        <div className="notes-header">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft /> Back
          </button>
          <div className="header-content">
            <h1>
              <FaStickyNote /> My Notes
            </h1>
            <p>Capture your ideas and thoughts</p>
          </div>
          <button
            className="add-note-btn"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus /> New Note
          </button>
        </div>

        {/* Stats */}
        <div className="notes-stats">
          <div className="stat-item">
            <FaStickyNote />
            <span>
              <strong>{stats.total}</strong> Total
            </span>
          </div>
          <div className="stat-item">
            <FaThumbtack />
            <span>
              <strong>{stats.pinned}</strong> Pinned
            </span>
          </div>
          <div className="stat-item">
            <FaClock />
            <span>
              <strong>{stats.recent}</strong> This Week
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="notes-controls">
          <div className="search-filter-group">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="category-filter">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  className={selectedCategory === cat.value ? "active" : ""}
                  onClick={() => setSelectedCategory(cat.value)}
                  style={{
                    borderColor:
                      selectedCategory === cat.value ? cat.color : undefined,
                  }}
                >
                  <cat.icon />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div className="view-toggle">
            <button
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
            >
              <FaThLarge /> Grid
            </button>
            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
            >
              <FaList /> List
            </button>
          </div>
        </div>

        {/* Notes List */}
        <div className={`notes-list ${viewMode}`}>
          {filteredNotes.length === 0 ? (
            <div className="no-notes">
              <FaStickyNote />
              <p>No notes found</p>
              <span>
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your filters"
                  : "Start by creating your first note!"}
              </span>
            </div>
          ) : (
            filteredNotes.map((note) => {
              const category = categories.find(
                (c) => c.value === note.category
              );
              return (
                <div
                  key={note.id}
                  className="note-card"
                  style={{ borderTopColor: note.color }}
                >
                  {note.pinned && (
                    <div className="pin-badge">
                      <FaThumbtack />
                    </div>
                  )}
                  <div className="note-header">
                    <h3>{note.title}</h3>
                    <div className="note-actions">
                      <button
                        className={note.pinned ? "pinned" : ""}
                        onClick={() => togglePin(note.id)}
                        title={note.pinned ? "Unpin note" : "Pin note"}
                      >
                        <FaThumbtack />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedNote(note);
                          setShowEditModal(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteNote(note.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="note-content">
                    <p>{note.content}</p>
                  </div>
                  <div className="note-footer">
                    <span
                      className="note-category"
                      style={{ background: category.color }}
                    >
                      <category.icon />
                      {category.label}
                    </span>
                    <span className="note-date">
                      <FaClock />
                      {formatDate(note.updatedAt)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <FaPlus /> Create New Note
              </h2>
              <button onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  placeholder="Enter note title"
                  value={newNote.title}
                  onChange={(e) =>
                    setNewNote({ ...newNote, title: e.target.value })
                  }
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Content *</label>
                <textarea
                  placeholder="Write your note here..."
                  rows="10"
                  value={newNote.content}
                  onChange={(e) =>
                    setNewNote({ ...newNote, content: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newNote.category}
                    onChange={(e) =>
                      setNewNote({ ...newNote, category: e.target.value })
                    }
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <select
                    value={newNote.color}
                    onChange={(e) =>
                      setNewNote({ ...newNote, color: e.target.value })
                    }
                  >
                    {colorOptions.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-save"
                onClick={handleAddNote}
                disabled={!newNote.title || !newNote.content}
              >
                <FaSave /> Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {showEditModal && selectedNote && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <FaEdit /> Edit Note
              </h2>
              <button onClick={() => setShowEditModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={selectedNote.title}
                  onChange={(e) =>
                    setSelectedNote({ ...selectedNote, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Content *</label>
                <textarea
                  rows="10"
                  value={selectedNote.content}
                  onChange={(e) =>
                    setSelectedNote({
                      ...selectedNote,
                      content: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={selectedNote.category}
                    onChange={(e) =>
                      setSelectedNote({
                        ...selectedNote,
                        category: e.target.value,
                      })
                    }
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <select
                    value={selectedNote.color}
                    onChange={(e) =>
                      setSelectedNote({
                        ...selectedNote,
                        color: e.target.value,
                      })
                    }
                  >
                    {colorOptions.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button className="btn-save" onClick={handleEditNote}>
                <FaSave /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
