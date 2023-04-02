import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './screens/Home/';
import Profile from './screens/Profile';
import Footer from './components/Footer';
import Login from './screens/Login';
import Map from './components/Maps';
import Blogs from './screens/Blogs';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={isOpen ? 'content-body' : ''}>
        <Router>
          <Map />
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          <Routes>
            <Route path="/" element={<Login />} exact />
            <Route path="/home" element={<Home />} exact />
            <Route path="/profile" element={<Profile />} exact />
            <Route path="/blogs" element={<Blogs />} exact />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
