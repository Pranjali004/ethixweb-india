import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import { pingHealth } from './services/api';

// Route Code-Splitting for optimal PageSpeed 90+ mobile scores
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Proactively ping backend to handle Render free-tier cold-starts
  useEffect(() => {
    pingHealth();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-ethix-black text-slate-100 selection:bg-ethix-red selection:text-white">
        <Navbar />

        <main className="flex-1">
          <Suspense
            fallback={
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-ethix-border border-t-ethix-red animate-spin" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* Fallback for undefined routes */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </BrowserRouter>
  );
}
