import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const InboxContext = createContext(null);

export const InboxProvider = ({ children }) => {
  const [inboxItems, setInboxItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const savedItems = localStorage.getItem(`inbox_${user?.id}`);
    if (savedItems) {
      setInboxItems(JSON.parse(savedItems));
    }
  }, [user]);

  const addToInbox = (content, type = "text") => {
    const newItem = {
      id: Date.now(),
      content,
      type,
      timestamp: new Date().toISOString(),
      processed: false,
    };
    setInboxItems((prev) => {
      const updated = [...prev, newItem];
      localStorage.setItem(`inbox_${user?.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const processItem = (id, destination) => {
    setInboxItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, processed: true, destination } : item
      );
      localStorage.setItem(`inbox_${user?.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <InboxContext.Provider value={{ inboxItems, addToInbox, processItem }}>
      {children}
    </InboxContext.Provider>
  );
};

export const useInbox = () => useContext(InboxContext);
