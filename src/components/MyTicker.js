import React, { useEffect, useRef } from 'react';
import "./Ticker.css";

const MyTicker = () => {
  const tickerRef = useRef(null);

  useEffect(() => {
    const tickerElement = tickerRef.current;
    const clone = tickerElement.cloneNode(true);
    tickerElement.parentNode.appendChild(clone);
  }, []);

  return (
    <div className="ticker-wrapper">
      <div className="ticker" ref={tickerRef}>
        <div className="ticker__element">
          <h4>Welcome to Lingua Vid! We are currently seeking dedicated and passionate educators to join our team. If you are interested <a href="https://linguavid.org/contact" rel="noreferrer">click here</a>.</h4>
        </div>
      </div>
    </div>
  );
};

export default MyTicker;
