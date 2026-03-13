import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Dashboard from './Pages/Dashboard';
import Accounts from './Pages/Accounts';
import Profile from './Components/Profile';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Navbar />
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
