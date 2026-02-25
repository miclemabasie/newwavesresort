// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'; 

import "./App.css/"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    
    </Routes>
  );
}

export default App;

// 12electron@3#T