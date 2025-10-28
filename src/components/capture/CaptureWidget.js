import React, { useState } from "react";
import { useInbox } from "../../context/InboxContext";

function CaptureWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const { addToInbox } = useInbox();

  const handleCapture = () => {
    if (content.trim()) {
      addToInbox(content);
      setContent("");
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleCapture();
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className={`capture-widget ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <div className="capture-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type anything... (Ctrl+Enter to capture)"
            autoFocus
          />
          <div className="capture-actions">
            <button onClick={handleCapture}>Capture</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button
          className="capture-button"
          onClick={() => setIsOpen(true)}
          title="Quick Capture (Alt+C)"
        >
          +
        </button>
      )}
    </div>
  );
}

export default CaptureWidget;
