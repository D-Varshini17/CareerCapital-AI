import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useThemeStore, useAuthStore } from './store'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import EMICalculator from './pages/EMICalculator'
import CareerDiscovery from './pages/CareerDiscovery'
import ProgressTracker from './pages/ProgressTracker'
import VisaPredictor from './pages/VisaPredictor'
import MentorshipMarketplace from './pages/MentorshipMarketplace'
import SmartLivingAssistant from './pages/SmartLivingAssistant'
import ProfileEnhancer from './pages/ProfileEnhancer'
import CollegeFinder from './pages/CollegeFinder'

export default function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <Router>
      <div className="mesh-bg min-h-screen text-slate-900 dark:text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/career-discovery" element={<CareerDiscovery />} />
            <Route path="/college-finder" element={<CollegeFinder />} />
            <Route path="/progress" element={<ProgressTracker />} />
            <Route path="/visa-predictor" element={<VisaPredictor />} />
            <Route path="/mentorship" element={<MentorshipMarketplace />} />
            <Route path="/living-assistant" element={<SmartLivingAssistant />} />
            <Route path="/profile-enhancer" element={<ProfileEnhancer />} />
          </Routes>
        </main>
        <ChatBot />
        <Footer />
      </div>
    </Router>
  )
}
