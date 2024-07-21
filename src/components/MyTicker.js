// Ticker.js
import React from 'react';
import Ticker from 'react-ticker';
import "./Ticker.css"

const MyTicker = () => {
  return (
    <Ticker>
      {({ index }) => (
        <>
          <h4>Welcome to Lingua Vid! We are currently seeking dedicated and passionate educators to join our team. If you are interested<a href="https://linguavid.org/contact"   rel=" noreferrer">click here</a>.</h4>
          {/* <h2>Scroll Item {index}</h2> */}
           
        </>
      )}
    </Ticker>
  );
};

export default MyTicker;
