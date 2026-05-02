import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Brain, Calculator, Lock, Mail } from 'lucide-react'
import { Button, InputField } from '../components'
import { useAuthStore } from '../store'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (formData.email && formData.password) {
        login({ id: '1', name: formData.email.split('@')[0], email: formData.email }, 'mock-jwt-token-' + Date.now())
        navigate('/dashboard')
      } else {
        setError('Please fill in all fields')
        setLoading(false)
      }
    }, 700)
  }

  const benefits = [
    { icon: BarChart3, title: 'Smart dashboards', desc: 'Track progress and finances.' },
    { icon: Brain, title: 'AI recommendations', desc: 'Get personalized guidance.' },
    { icon: Calculator, title: 'Financial tools', desc: 'Plan EMI and loan strategy.' },
  ]

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-5xl gap-12 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="hidden flex-col justify-center md:flex">
          <h1 className="mb-6 text-4xl font-bold tracking-tight">Welcome back</h1>
          <p className="mb-8 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Sign in to access your personalized planning dashboard and continue from your latest progress.
          </p>
          <div className="space-y-5">
            {benefits.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex gap-4">
                  <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                    <Icon className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold">Sign in</h2>
              <p className="text-slate-600 dark:text-slate-400">Enter your credentials to access your dashboard.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField label="Email address" type="email" placeholder="you@example.com" name="email" value={formData.email} onChange={handleChange} icon={Mail} error={error && !formData.email ? 'Email is required' : ''} />
              <InputField label="Password" type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} icon={Lock} error={error && !formData.password ? 'Password is required' : ''} />
              {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">{error}</div>}
              <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>{loading ? 'Signing in...' : <>Sign in <ArrowRight className="h-5 w-5" /></>}</Button>
            </form>
            <div className="mt-6 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
              <p className="mb-3 text-slate-600 dark:text-slate-400">Do not have an account?</p>
              <Link to="/signup" className="font-semibold text-sky-600 hover:underline">Create a free account</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
