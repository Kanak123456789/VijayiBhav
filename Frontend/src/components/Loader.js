import React, { useState, useEffect } from "react";
import '../styles.css'
import "bootstrap/dist/css/bootstrap.min.css";  
import Crousel from "../Crousel";

function Loader() {
  const [loading, setLoading] = useState(true);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const showGif = true;

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("hasLoadedBefore");

    if (hasLoadedBefore) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasLoadedBefore", true);
      }, 4400);

      const welcomeTimer = setTimeout(() => {
        setShowWelcomeMessage(true);
      }, 3000); // Show welcome message after 3000 ms

      return () => {
        clearTimeout(timer);
        clearTimeout(welcomeTimer);
      };
    }
  }, []);

  return (
    <div style={{marginBottom:"5%"}}>
      {loading ? (
        <div className="loading-container">
          {showGif && <img src='./gif.gif' alt="Loading..." />}
          <h2 style={{fontWeight:"bold"}}>Namaste</h2>
          {showWelcomeMessage && (
            <h2 className="welcome-message">Welcome to LinguaVid</h2>
          )}
        </div>
      ) : (
        <div className="content">
          <Crousel />
        </div>
      )}
    </div>
  );
}

export default Loader;
