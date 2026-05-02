import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react'
import { Button, InputField } from '../components'
import { useAuthStore } from '../store'
import { isValidEmail, isStrongPassword } from '../utils/auth'

export default function SignupPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email address'
    return newErrors
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.password) newErrors.password = 'Password is required'
    else if (!isStrongPassword(formData.password))
      newErrors.password = 'Password must have 8+ chars, uppercase, lowercase, number, special char'
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'
    return newErrors
  }

  const handleNextStep = () => {
    if (step === 1) {
      const newErrors = validateStep1()
      if (Object.keys(newErrors).length === 0) {
        setStep(2)
      } else {
        setErrors(newErrors)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateStep2()
    if (Object.keys(newErrors).length === 0) {
      setLoading(true)
      // Mock signup
      setTimeout(() => {
        const userData = {
          id: '1',
          name: formData.name,
          email: formData.email,
        }
        const mockToken = 'mock-jwt-token-' + Date.now()
        login(userData, mockToken)
        navigate('/dashboard')
      }, 1000)
    } else {
      setErrors(newErrors)
    }
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
          <h1 className="text-5xl font-bold mb-6">Join Thousands</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Start your journey to smarter financial planning and career success today.
          </p>

          <div className="space-y-4">
            {[
              'Access AI-powered career recommendations',
              'Plan education loans with confidence',
              'Optimize your repayment strategy',
              'Get personalized mentorship',
              'Track your 10-stage journey',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-200 dark:border-sky-800">
            <p className="text-sm text-sky-900 dark:text-sky-200">
              <strong>Limited Time:</strong> Get 3 months free AI mentorship with your first signup!
            </p>
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
              <h2 className="text-3xl font-bold mb-2">Create Account</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Step {step} of 2 - {step === 1 ? 'Basic Info' : 'Security'}
              </p>
              <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: step === 1 ? '50%' : '100%' }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"
                />
              </div>
            </div>

            <form onSubmit={step === 2 ? handleSubmit : undefined} className="space-y-6">
              {step === 1 ? (
                <>
                  <InputField
                    label="Full Name"
                    type="text"
                    placeholder="Your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    icon={User}
                    error={errors.name}
                  />

                  <InputField
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={Mail}
                    error={errors.email}
                  />

                  <Button
                    type="button"
                    size="lg"
                    className="w-full gap-2"
                    onClick={handleNextStep}
                  >
                    Next Step <ArrowRight className="w-5 h-5" />
                  </Button>
                </>
              ) : (
                <>
                  <InputField
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    icon={Lock}
                    error={errors.password}
                  />

                  <InputField
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    icon={Lock}
                    error={errors.confirmPassword}
                  />

                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-sm text-slate-600 dark:text-slate-400">
                    <p className="font-semibold mb-2">Password Requirements:</p>
                    <ul className="space-y-1 text-xs">
                      <li>✓ At least 8 characters</li>
                      <li>✓ One uppercase letter</li>
                      <li>✓ One lowercase letter</li>
                      <li>✓ One number</li>
                      <li>✓ One special character (!@#$%)</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      className="flex-1 gap-2"
                      disabled={loading}
                    >
                      {loading ? 'Creating...' : (
                        <>
                          Create Account <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Already have an account?
              </p>
              <Link to="/login" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">
                Sign in here
              </Link>
            </div>

            <div className="mt-6 text-xs text-slate-500 dark:text-slate-400 text-center">
              <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
