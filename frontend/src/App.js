import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './screens/Home/index';
import Footer from './components/Footer';
import Login from './screens/Login';
import Map from './components/Maps';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Map />
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={isOpen ? 'content-body' : ''}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} exact />
            <Route path="/home" element={<Home />} exact />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
