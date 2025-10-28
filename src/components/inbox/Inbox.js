import React from "react";
import { useInbox } from "../../context/InboxContext";

function Inbox() {
  const { inboxItems, processItem } = useInbox();

  const handleProcess = (id, type) => {
    processItem(id, type);
  };

  return (
    <div className="inbox-container">
      <h2>Inbox ({inboxItems.filter((item) => !item.processed).length})</h2>
      <div className="inbox-list">
        {inboxItems
          .filter((item) => !item.processed)
          .map((item) => (
            <div key={item.id} className="inbox-item">
              <div className="inbox-content">{item.content}</div>
              <div className="inbox-actions">
                <button onClick={() => handleProcess(item.id, "task")}>
                  Convert to Task
                </button>
                <button onClick={() => handleProcess(item.id, "note")}>
                  Convert to Note
                </button>
                <button onClick={() => handleProcess(item.id, "goal")}>
                  Convert to Goal
                </button>
              </div>
              <div className="inbox-timestamp">
                {new Date(item.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Inbox;
