// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'; 
import GalleryPage from './pages/GalleryPage';


function App() {
  return (
    <Routes>`1`
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="story" element={<GalleryPage />} />
      <Route path="rooms" element={<GalleryPage />} />
      <Route path="contact" element={<GalleryPage />} />
      <Route path="dialogues" element={<GalleryPage />} />
      <Route path="foundation" element={<GalleryPage />} />
      <Route path="experiences" element={<GalleryPage />} />
      <Route path="dining" element={<GalleryPage />} />
    </Routes>
  );
}

export default App;

// 12electron@3#T