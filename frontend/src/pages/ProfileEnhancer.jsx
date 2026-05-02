import React from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge } from '../components'
import { FileText, Upload, Lightbulb, CheckCircle } from 'lucide-react'

export default function ProfileEnhancer() {
  const suggestions = [
    {
      category: 'Statement of Purpose',
      score: 72,
      feedback: 'Your SOP is good, but lacks specific examples',
      tips: [
        'Add 2-3 concrete examples of your achievements',
        'Connect your past with your future goals',
        'Make it 250-300 words for maximum impact',
      ],
    },
    {
      category: 'Skills & Certifications',
      score: 65,
      feedback: 'Add more technical certifications',
      tips: [
        'Get AWS or Google Cloud certifications',
        'Complete 1-2 online courses in your field',
        'Highlight relevant GitHub projects',
      ],
    },
    {
      category: 'Work Experience',
      score: 80,
      feedback: 'Strong work background',
      tips: [
        'Quantify your achievements with numbers',
        'Describe impact, not just responsibilities',
        'Get strong letters from managers',
      ],
    },
  ]

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">💪 Profile Enhancer</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Get AI-powered suggestions to strengthen your application
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-dashed border-2 border-sky-400 bg-sky-50 dark:bg-sky-900/20">
            <div className="text-center py-8">
              <Upload className="w-12 h-12 text-sky-600 dark:text-sky-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Upload Your Documents</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Upload your SOP, CV, or any document for AI analysis
              </p>
              <Button>Choose Files</Button>
            </div>
          </Card>
        </motion.div>

        {/* Analysis Results */}
        <div className="space-y-6">
          {suggestions.map((suggestion, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{suggestion.category}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {suggestion.feedback}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-sky-600 dark:text-sky-400">
                      {suggestion.score}%
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Score</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${suggestion.score}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"
                  />
                </div>

                {/* Tips */}
                <div className="space-y-3">
                  <p className="font-semibold text-sm">💡 Improvement Tips:</p>
                  {suggestion.tips.map((tip, tipIdx) => (
                    <div key={tipIdx} className="flex gap-3 items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">{tip}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <h2 className="text-xl font-bold mb-4">📚 Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'SOP Writing Guide', desc: '10-step guide to craft perfect SOP' },
                { title: 'CV Templates', desc: 'Download ATS-friendly CV templates' },
                { title: 'Skill Development', desc: 'Recommended courses & certifications' },
                { title: 'Interview Prep', desc: 'Practice with AI mock interviewer' },
              ].map((resource, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <p className="font-semibold mb-1">{resource.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{resource.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Button size="lg" className="px-8">
            Get Full Analysis Report
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
