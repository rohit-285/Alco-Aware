import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import StatsPage from './pages/StatsPage';
import { DrunkModeProvider } from './context/DrunkModeContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <DrunkModeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(12px)',
              }
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </DrunkModeProvider>
  );
}

export default App;
