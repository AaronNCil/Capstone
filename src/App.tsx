import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import About from './components/about';
import Login from  './components/login';
import Contact from './components/contact'

function App() {
  return (
    <>
    <Router >
    <Header />
     <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/login" element={<Login />} />
     </Routes>
   <Footer />
   </Router>
    </>
  );
}

export default App;
