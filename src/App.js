import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import About from './About';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" />
          <Route path="/resources" />
          <Route path="/languages" />
          <Route path="/about" element={<About></About>}/>
          <Route path="/contact" />
          <Route path="/link" />
          <Route path="/login" />
          <Route path="/register" />
          <Route path="/something" />
        </Routes>

       
      </div>
    </Router>
  );
}

export default App;
