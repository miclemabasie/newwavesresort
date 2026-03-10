// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'; 
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/Contact';
import ComingSoon from './pages/ComingSoon';
import OurStory from './pages/OurStory';
import Services from './pages/Section';
import Dining from './pages/Dining';
import Accommodations from './pages/Accomodations';
import IntellectualTalks from './pages/services/IntellectualTalk';
import AtlanticGastronomy from './pages/services/AtlanticGastronomy';
import DiplomaticTransfers from './pages/services/DiplomaticTransfers';
import VolcanicExpeditions from './pages/services/VolcanicExpeditions';
import PremiumFleet from './pages/services/PremiumFleet';
import FisiyLibrary from './pages/services/FisiyLibrary';


function App() {
  return (
    <Routes>`1`
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="story" element={<OurStory />} />
      <Route path="rooms" element={<Accommodations />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="dialogues" element={<ComingSoon />} />
      <Route path="foundation" element={<ComingSoon />} />
      <Route path="experiences" element={<Services />} />
      <Route path="services/dining" element={<Dining />} />

      <Route path="/services/intellectual-talks" element={<IntellectualTalks />} />
      <Route path="/services/culinary" element={<AtlanticGastronomy />} />
      <Route path="/services/transfers" element={<DiplomaticTransfers />} />
      <Route path="/services/expeditions" element={<VolcanicExpeditions />} />
      <Route path="/services/fleet" element={<PremiumFleet />} />
      <Route path="/services/library" element={<FisiyLibrary />} />
    </Routes>
  );
}

export default App;

// 12electron@3#T