import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './screens/Home/index';
import Header from './components/Header/index'
import Footer from './components/Footer';
import Login from './screens/Login';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/home" element={<Home />} exact />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
