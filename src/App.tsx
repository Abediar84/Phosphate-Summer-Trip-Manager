import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ResultsPage } from './pages/ResultsPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  const { i18n } = useTranslation();

  return (
    <Router>
      <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <Layout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;