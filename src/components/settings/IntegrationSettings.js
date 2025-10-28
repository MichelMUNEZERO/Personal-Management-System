import React, { useState, useEffect } from "react";
import { useGoogleAuth } from "../../context/GoogleAuthContext";
import { useAuth } from "../../context/AuthContext";

function IntegrationSettings() {
  const { googleAuth, initGoogleAuth } = useGoogleAuth();
  const { user } = useAuth();
  const [emailAddress, setEmailAddress] = useState("");

  useEffect(() => {
    if (!emailAddress && user) {
      setEmailAddress(`${user.id}@inbox.aegis-system.com`);
    }
  }, [user]);

  return (
    <div className="integration-settings">
      <section className="integration-section">
        <h3>Calendar Integration</h3>
        <button
          onClick={() => googleAuth?.requestAccessToken()}
          className="connect-btn"
        >
          Connect Google Calendar
        </button>
      </section>

      <section className="integration-section">
        <h3>Email Integration</h3>
        <div className="email-inbox">
          <p>Forward emails to:</p>
          <code>{emailAddress}</code>
          <p className="help-text">
            Emails sent to this address will appear in your inbox
          </p>
        </div>
      </section>
    </div>
  );
}

export default IntegrationSettings;
