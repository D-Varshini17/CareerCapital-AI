import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { Button, InputField } from '../components'
import { useAuthStore } from '../store'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Mock login - in production, call API
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Mock user data
        const userData = {
          id: '1',
          name: formData.email.split('@')[0],
          email: formData.email,
        }
        const mockToken = 'mock-jwt-token-' + Date.now()
        login(userData, mockToken)
        navigate('/dashboard')
      } else {
        setError('Please fill in all fields')
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 w-full max-w-5xl">
        {/* Left Side - Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex flex-col justify-center"
        >
          <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Sign in to access your personalized financial planning dashboard and AI-driven insights.
          </p>
          
          <div className="space-y-6">
            {[
              { emoji: '📊', title: 'Smart Dashboards', desc: 'Track your progress and finances' },
              { emoji: '🤖', title: 'AI Recommendations', desc: 'Get personalized guidance' },
              { emoji: '💡', title: 'Financial Tools', desc: 'EMI calculator, loan optimizer' },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Sign In</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Enter your credentials to access your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
                error={error && formData.email === '' ? 'Email is required' : ''}
              />

              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
                icon={Lock}
                error={error && formData.password === '' ? 'Password is required' : ''}
              />

              {error && !formData.email && !formData.password && (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="text-sky-600 dark:text-sky-400 hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={loading}
              >
                {loading ? 'Signing in...' : (
                  <>
                    Sign In <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Don't have an account?
              </p>
              <Link to="/signup" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">
                Create a free account
              </Link>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg">
              <p className="text-xs font-semibold text-sky-900 dark:text-sky-200 mb-2">Demo Credentials:</p>
              <p className="text-xs text-sky-700 dark:text-sky-300">Email: demo@careercapital.ai</p>
              <p className="text-xs text-sky-700 dark:text-sky-300">Password: Demo@123</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
