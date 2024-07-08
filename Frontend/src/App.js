import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import About from './About';
import Login from './Login';
import Register from './Register';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Logout from './Logout';
import Dashboard from './Dashboard';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';
import Footer from './Footer';
import Crousel from './Crousel';

function App() {
  return (

    <Router>
       
      <div className="App">
        <Header />
        
        <Routes>
          <Route path="/" element={<>
            <Crousel />
            <About />
          </>} />
          <Route path="/resources" />
          <Route path="/languages" />
          <Route path="/about" element={<About></About>}/>
          <Route path="/contact" />
          <Route path="/link" />
          <Route path="/login" element={<Login></Login>}/>
          <Route path="/register" element={<Register></Register>}/>
          <Route path="/logout" element={<Logout></Logout>}/>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}/>
          <Route path="/forgetpassword" element={<ForgetPassword/>}></Route>
          <Route path="/resetpassword" element={<ResetPassword/>}></Route>
        </Routes>
        <Footer/>
       
      </div>
    </Router>
  );
} 

export default App;
