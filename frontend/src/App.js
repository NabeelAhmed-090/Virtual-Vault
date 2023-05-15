import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./screens/Home/";
import Footer from "./components/Footer";
import Login from "./screens/Login";
import Map from "./components/Maps";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Blogs from "./screens/Blogs";
import Blog from "./screens/Blog";
import CreateBlog from "./screens/BlogCreation";
import Search from "./screens/Search";
import Certificate from "./screens/Certificate";
import Game from "./screens/Game";
import Cart from "./screens/Cart";
import Admin from "./screens/Admin";
import PurchaseSuccessful from "./screens/PurchaseSuccessful";
import DeliveryInfo from "./screens/DeliveryInfo";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={isOpen ? "content-body" : ""}>
        <Router>
          <Map />
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          <Routes>
            <Route path="/" element={<Login />} exact />
            <Route path="/home" element={<Home />} exact />
            <Route path="/profile" element={<Profile />} exact />
            <Route path="/profile/edit" element={<EditProfile />} exact />
            <Route path="/blogs" element={<Blogs />} exact />
            <Route path="/blogs/:id" element={<Blog />} exact />
            <Route path="/blogs/create" element={<CreateBlog />} exact />
            <Route path="/search" element={<Search />} exact />
            <Route path="/search/game/:id" element={<Game />} exact />
            <Route path="/certificate/:id" element={<Certificate />} exact />
            <Route path="/admin" element={<Admin />} exact />
            <Route path="/cart/:id?" element={<Cart />} exact />
            <Route
              path="/checkout/address/:total"
              element={<DeliveryInfo />}
              exact
            />
            <Route path="/success" element={<PurchaseSuccessful />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
