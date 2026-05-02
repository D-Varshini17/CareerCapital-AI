import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Lock, Mail, User } from 'lucide-react'
import { Button, InputField, ProgressBar } from '../components'
import { useAuthStore } from '../store'
import { isStrongPassword, isValidEmail } from '../utils/auth'

export default function SignupPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const validateStep1 = () => {
    const next = {}
    if (!formData.name.trim()) next.name = 'Name is required'
    if (!formData.email.trim()) next.email = 'Email is required'
    else if (!isValidEmail(formData.email)) next.email = 'Invalid email address'
    return next
  }

  const validateStep2 = () => {
    const next = {}
    if (!formData.password) next.password = 'Password is required'
    else if (!isStrongPassword(formData.password)) next.password = 'Use 8+ chars with uppercase, lowercase, number, and special character'
    if (formData.password !== formData.confirmPassword) next.confirmPassword = 'Passwords do not match'
    return next
  }

  const handleNextStep = () => {
    const next = validateStep1()
    if (Object.keys(next).length) setErrors(next)
    else setStep(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validateStep2()
    if (Object.keys(next).length) return setErrors(next)
    setLoading(true)
    setTimeout(() => {
      login({ id: '1', name: formData.name, email: formData.email }, 'mock-jwt-token-' + Date.now())
      navigate('/dashboard')
    }, 700)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-5xl gap-12 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="hidden flex-col justify-center md:flex">
          <h1 className="mb-6 text-4xl font-bold tracking-tight">Create your planning workspace</h1>
          <p className="mb-8 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Start with a focused dashboard for career choices, loan planning, visa readiness, and progress tracking.
          </p>
          <div className="space-y-4">
            {['Career recommendations', 'Education loan planning', 'Repayment optimization', 'Mentorship access', '10-stage progress tracker'].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold">Create account</h2>
              <p className="text-slate-600 dark:text-slate-400">Step {step} of 2 - {step === 1 ? 'Basic info' : 'Security'}</p>
              <ProgressBar value={step === 1 ? 50 : 100} max={100} animated={false} className="mt-4" />
            </div>

            <form onSubmit={step === 2 ? handleSubmit : undefined} className="space-y-6">
              {step === 1 ? (
                <>
                  <InputField label="Full name" placeholder="Your name" name="name" value={formData.name} onChange={handleChange} icon={User} error={errors.name} />
                  <InputField label="Email address" type="email" placeholder="you@example.com" name="email" value={formData.email} onChange={handleChange} icon={Mail} error={errors.email} />
                  <Button type="button" size="lg" className="w-full gap-2" onClick={handleNextStep}>Next step <ArrowRight className="h-5 w-5" /></Button>
                </>
              ) : (
                <>
                  <InputField label="Password" type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} icon={Lock} error={errors.password} />
                  <InputField label="Confirm password" type="password" placeholder="Confirm password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} icon={Lock} error={errors.confirmPassword} />
                  <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <p className="mb-2 font-semibold">Password requirements</p>
                    <ul className="space-y-1 text-xs">
                      <li>At least 8 characters</li>
                      <li>One uppercase and one lowercase letter</li>
                      <li>One number and one special character</li>
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="secondary" size="lg" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                    <Button type="submit" size="lg" className="flex-1 gap-2" disabled={loading}>{loading ? 'Creating...' : <>Create account <ArrowRight className="h-5 w-5" /></>}</Button>
                  </div>
                </>
              )}
            </form>

            <div className="mt-6 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
              <p className="mb-3 text-slate-600 dark:text-slate-400">Already have an account?</p>
              <Link to="/login" className="font-semibold text-sky-600 hover:underline">Sign in</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
