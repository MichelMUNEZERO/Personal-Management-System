import React from "react";
import { useLinks } from "../../context/LinkContext";

function LinkedReferences({ pageId }) {
  const { links } = useLinks();
  const references = links[pageId] || [];

  if (references.length === 0) return null;

  return (
    <div className="linked-references">
      <h3>Linked References</h3>
      <div className="references-list">
        {references.map((ref, index) => (
          <div key={index} className="reference-item">
            <span className="reference-type">{ref.sourceType}</span>
            <span className="reference-id">{ref.sourceId}</span>
            <span className="reference-date">
              {new Date(ref.timestamp).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinkedReferences;
