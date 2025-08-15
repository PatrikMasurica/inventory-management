import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JobSitesPage from './pages/JobSitesPage';
import InventoryPage from './pages/InventoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobSitesPage />} />
        <Route path="/inventory/:id" element={<InventoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
