import React, { useState, useEffect } from "react";
import '../styles.css'
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Crousel from "../Crousel";

function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the loader has been shown before in this session
    const hasLoadedBefore = sessionStorage.getItem("hasLoadedBefore");

    if (hasLoadedBefore) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        // Set flag in sessionStorage
        sessionStorage.setItem("hasLoadedBefore", true);
      }, 5000); // Adjust the delay as needed (in milliseconds)

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <img src='./loading.gif' alt="Loading..." />
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
