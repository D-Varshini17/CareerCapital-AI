import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Globe, TrendingUp, Star, Check } from 'lucide-react'
import { Card, Button, Badge, InputField } from '../components'

export default function CareerDiscovery() {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    gpa: 3.8,
    skills: 'Python, Java, Machine Learning',
    budget: 40,
  })

  const universities = [
    {
      rank: 1,
      name: 'Stanford University',
      country: '🇺🇸 USA',
      program: 'MS Computer Science',
      costYear: 75000,
      roi: 9.2,
      match: 95,
      placement: 98,
    },
    {
      rank: 2,
      name: 'UC Berkeley',
      country: '🇺🇸 USA',
      program: 'MS EECS',
      costYear: 68000,
      roi: 9.0,
      match: 92,
      placement: 97,
    },
    {
      rank: 3,
      name: 'University of Toronto',
      country: '🇨🇦 Canada',
      program: 'MASc Computer Engineering',
      costYear: 32000,
      roi: 8.8,
      match: 89,
      placement: 95,
    },
    {
      rank: 4,
      name: 'ETH Zurich',
      country: '🇨🇭 Switzerland',
      program: 'MSc Computer Science',
      costYear: 20000,
      roi: 8.9,
      match: 87,
      placement: 96,
    },
  ]

  const careers = [
    { title: 'Software Engineer', match: 96, salary: '$150K-200K', icon: '💻' },
    { title: 'Data Scientist', match: 94, salary: '$130K-180K', icon: '📊' },
    { title: 'ML Engineer', match: 93, salary: '$140K-210K', icon: '🤖' },
    { title: 'Product Manager', match: 85, salary: '$120K-160K', icon: '🎯' },
  ]

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: isNaN(value) ? value : parseFloat(value) }))
  }

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">🎯 AI Career Discovery</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Find your perfect career path and university based on your profile
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card>
              <h2 className="text-xl font-bold mb-6">Your Profile</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">GPA</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="range"
                      name="gpa"
                      value={profile.gpa}
                      onChange={handleProfileChange}
                      min="2.0"
                      max="4.0"
                      step="0.1"
                      className="flex-1 cursor-pointer"
                    />
                    <span className="font-bold text-lg">{profile.gpa}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Budget (Lakhs ₹)</label>
                  <input
                    type="number"
                    name="budget"
                    value={profile.budget}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Key Skills</label>
                  <textarea
                    name="skills"
                    value={profile.skills}
                    onChange={handleProfileChange}
                    rows="3"
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>

                <Button className="w-full">Analyze Profile</Button>
              </div>

              {/* Strengths */}
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <h3 className="font-bold mb-4">Your Strengths</h3>
                <ul className="space-y-2">
                  {['High GPA', 'Diverse Skills', 'Tech Focus'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Career Recommendations */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">💼 Career Matches</h2>
                <Badge variant="success">Top Picks</Badge>
              </div>

              <div className="space-y-4">
                {careers.map((career, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-500 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{career.icon}</span>
                        <div>
                          <h3 className="font-bold">{career.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Average salary: {career.salary}
                          </p>
                        </div>
                      </div>
                      <Badge variant="primary">{career.match}% Match</Badge>
                    </div>

                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${career.match}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* University Recommendations */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">🏫 Top Universities for You</h2>
                <Globe className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>

              <div className="space-y-4">
                {universities.map((uni, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold text-sky-600 dark:text-sky-400">#{uni.rank}</span>
                          <h3 className="font-bold">{uni.name}</h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {uni.country} • {uni.program}
                        </p>
                      </div>
                      <Badge variant="success">{uni.match}% Fit</Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-3 text-center text-sm">
                      <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
                        <p className="text-xs text-slate-600 dark:text-slate-400">Cost/Year</p>
                        <p className="font-bold">${uni.costYear / 1000}K</p>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
                        <p className="text-xs text-slate-600 dark:text-slate-400">ROI Score</p>
                        <p className="font-bold">{uni.roi}/10</p>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
                        <p className="text-xs text-slate-600 dark:text-slate-400">Placement</p>
                        <p className="font-bold">{uni.placement}%</p>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
                        <p className="text-xs text-slate-600 dark:text-slate-400">Rating</p>
                        <p className="font-bold text-yellow-600">★{uni.roi}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <h2 className="text-xl font-bold mb-4">💡 AI Recommendations</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Zap className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <span>Focus on project portfolio for tech roles</span>
                </li>
                <li className="flex gap-2">
                  <Zap className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <span>Consider Canada programs for better ROI & work permits</span>
                </li>
                <li className="flex gap-2">
                  <Zap className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <span>Plan for ₹35-40L total education + living costs</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
