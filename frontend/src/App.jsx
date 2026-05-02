import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useThemeStore, useAuthStore } from './store'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import AppSidebar from './components/AppSidebar'

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
import AIEngine from './pages/AIEngine'
import AlertsPage from './pages/AlertsPage'

const workspaceRoutes = new Set([
  '/dashboard',
  '/ai-engine',
  '/alerts',
  '/emi-calculator',
  '/career-discovery',
  '/college-finder',
  '/progress',
  '/visa-predictor',
  '/mentorship',
  '/living-assistant',
  '/profile-enhancer',
])

export default function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <Router>
      <AppFrame />
    </Router>
  )
}

function AppFrame() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()
  const isWorkspace = isAuthenticated && workspaceRoutes.has(location.pathname)

  return (
    <div className="mesh-bg min-h-screen text-slate-900 dark:text-white">
      {isWorkspace ? (
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="min-w-0 flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-engine" element={<AIEngine />} />
              <Route path="/alerts" element={<AlertsPage />} />
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
        </div>
      ) : (
        <>
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-engine" element={<AIEngine />} />
              <Route path="/alerts" element={<AlertsPage />} />
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
          <Footer />
        </>
      )}
      <ChatBot />
    </div>
  )
}
