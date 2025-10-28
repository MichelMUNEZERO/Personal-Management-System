import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const LinkContext = createContext(null);

export const LinkProvider = ({ children }) => {
  const [links, setLinks] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const savedLinks = localStorage.getItem(`links_${user?.id}`);
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    }
  }, [user]);

  const parseLinks = (content) => {
    const linkRegex = /\[\[(.*?)\]\]/g;
    const matches = [...content.matchAll(linkRegex)];
    return matches.map(match => match[1]);
  };

  const addLinks = (sourceId, content, sourceType) => {
    const foundLinks = parseLinks(content);
    const newLinks = { ...links };

    foundLinks.forEach(target => {
      if (!newLinks[target]) {
        newLinks[target] = [];
      }
      if (!newLinks[target].some(link => link.sourceId === sourceId)) {
        newLinks[target].push({
          sourceId,
          sourceType,
          timestamp: new Date().toISOString()
        });
      }
    });

    setLinks(newLinks);
    localStorage.setItem(`links_${user?.id}`, JSON.stringify(newLinks));
    return foundLinks;
  };

  return (
    <LinkContext.Provider value={{ links, addLinks, parseLinks }}>
      {children}
    </LinkContext.Provider>
  );
};

export const useLinks = () => useContext(LinkContext);
