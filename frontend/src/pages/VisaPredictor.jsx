import React from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Card, Badge, ProgressBar, Button } from '../components'
import { TrendingUp, CheckCircle } from 'lucide-react'

export default function VisaPredictor() {
  const predictionData = [
    { factor: 'GPA', score: 95 },
    { factor: 'TOEFL', score: 110 },
    { factor: 'Work Exp', score: 75 },
    { factor: 'LOR Quality', score: 85 },
    { factor: 'SOP', score: 90 },
    { factor: 'Financial', score: 88 },
  ]

  const successData = [
    { month: 'Month 1', probability: 60, confidence: 75 },
    { month: 'Month 2', probability: 68, confidence: 80 },
    { month: 'Month 3', probability: 76, confidence: 85 },
    { month: 'Month 4', probability: 82, confidence: 88 },
    { month: 'Month 5', probability: 87, confidence: 90 },
    { month: 'Month 6', probability: 92, confidence: 92 },
  ]

  const factors = [
    { title: 'Strong Academic Profile', check: true },
    { title: 'Good English Proficiency', check: true },
    { title: 'Clear Career Goals', check: true },
    { title: 'Demonstrated Financial Capacity', check: true },
    { title: 'Strong Letters of Recommendation', check: false },
    { title: 'Unique SOP', check: false },
  ]

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">🛂 Visa & Risk Predictor</h1>
          <p className="text-slate-600 dark:text-slate-400">
            AI-powered visa success probability and risk assessment
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Main Prediction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Your Visa Success Probability</h2>
                  <p className="text-slate-600 dark:text-slate-400">Updated: Today</p>
                </div>
                <Badge variant="success">Predicted in 6 months</Badge>
              </div>

              <div className="text-center mb-8">
                <div className="inline-block p-8 bg-white dark:bg-slate-800 rounded-full border-4 border-sky-500">
                  <p className="text-5xl font-bold text-sky-600 dark:text-sky-400">87%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Success Probability</p>
                </div>
              </div>

              <ProgressBar label="Current Progress" value={87} max={100} animated={false} />

              <div className="mt-8 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800 rounded-lg">
                <p className="font-semibold text-green-900 dark:text-green-200">
                  ✓ Good chances! Focus on strengthening your SOP and LORs
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Risk Assessment */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <h3 className="text-xl font-bold mb-4">Risk Assessment</h3>

              <div className="space-y-3">
                {[
                  { risk: 'Financial', level: 'Low', color: 'text-green-600' },
                  { risk: 'Academic', level: 'Low', color: 'text-green-600' },
                  { risk: 'Language', level: 'Low', color: 'text-green-600' },
                  { risk: 'Experience', level: 'Medium', color: 'text-yellow-600' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                    <span className="text-sm font-medium">{item.risk}</span>
                    <span className={`text-sm font-bold ${item.color}`}>{item.level}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-4">Get Detailed Report</Button>
            </Card>
          </motion.div>
        </div>

        {/* Factor Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          <Card>
            <h3 className="text-xl font-bold mb-6">Profile Factors</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="factor" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="text-xl font-bold mb-6">Success Probability Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={successData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="probability" stroke="#0ea5e9" name="Success %" />
                <Line type="monotone" dataKey="confidence" stroke="#06b6d4" name="Confidence %" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card>
            <h3 className="text-xl font-bold mb-6">Success Factors Checklist</h3>
            <div className="space-y-3">
              {factors.map((factor, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  {factor.check ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-slate-400 rounded-full flex-shrink-0" />
                  )}
                  <span className={factor.check ? 'text-green-700 dark:text-green-300' : 'text-slate-600 dark:text-slate-400'}>
                    {factor.title}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
