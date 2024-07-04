import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import About from './About';
import Login from './Login';
import Register from './Register';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

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
          <Route path="/login" element={<Login></Login>}/>
          <Route path="/register" element={<Register></Register>}/>
          <Route path="/something" />
        </Routes>

       
      </div>
    </Router>
  );
}

export default App;
