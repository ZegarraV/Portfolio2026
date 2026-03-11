import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext.jsx';
import { ThemeProvider } from '@/context/ThemeContext.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ExperiencePage from './pages/ExperiencePage.jsx';
import ContactPage from './pages/ContactPage.jsx';

function App() {
  return (
    <HelmetProvider>
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Toaster />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
