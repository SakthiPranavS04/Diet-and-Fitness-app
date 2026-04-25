import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Onboarding from './pages/Onboarding';
import Layout from './components/Layout';
import Training from './pages/Training';
import Discover from './pages/Discover';
import Diet from './pages/Diet';
import Report from './pages/Report';
import Settings from './pages/Settings';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data from localStorage
    const savedData = localStorage.getItem('fitAppUserData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  const handleOnboardingComplete = (data) => {
    setUserData(data);
    localStorage.setItem('fitAppUserData', JSON.stringify(data));
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem('fitAppUserData');
  };

  if (!userData) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Router>
      <Layout userData={userData} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/training" replace />} />
          <Route path="/training" element={<Training userData={userData} />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/diet" element={<Diet userData={userData} />} />
          <Route path="/report" element={<Report userData={userData} />} />
          <Route path="/settings" element={<Settings userData={userData} onLogout={handleLogout} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
