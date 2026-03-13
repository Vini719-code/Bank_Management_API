import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import EnhancedNavbar from './Components/EnhancedNavbar';
import EnhancedSidebar from './Components/EnhancedSidebar';
import EnhancedDashboard from './Pages/EnhancedDashboard';
import EnhancedProfile from './Components/EnhancedProfile';
import EnhancedAccountForm from './Components/EnhancedAccountForm';

// Enhanced App Component with advanced features
function EnhancedApp() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="flex">
            <EnhancedSidebar />
            <div className="flex-1 flex flex-col">
              <EnhancedNavbar />
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<EnhancedDashboard />} />
                  <Route path="/accounts" element={<EnhancedDashboard />} />
                  <Route path="/transactions" element={<EnhancedDashboard />} />
                  <Route path="/reports" element={<EnhancedDashboard />} />
                  <Route path="/documents" element={<EnhancedDashboard />} />
                  <Route path="/profile" element={<EnhancedProfile />} />
                  <Route path="/settings" element={<EnhancedProfile />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default EnhancedApp;
