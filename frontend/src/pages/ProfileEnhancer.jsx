import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, FileText, Lightbulb, Upload } from 'lucide-react'
import { Badge, Button, Card, PageHeader, ProgressBar } from '../components'

export default function ProfileEnhancer() {
  const suggestions = [
    { category: 'Statement of Purpose', score: 72, feedback: 'Good foundation, but it needs sharper examples.', tips: ['Add 2-3 concrete achievements.', 'Connect past work to future goals.', 'Tighten the structure for a clearer story.'] },
    { category: 'Skills and certifications', score: 65, feedback: 'More proof of technical depth will help.', tips: ['Add one cloud or data certification.', 'Complete focused courses in your target field.', 'Highlight relevant GitHub projects.'] },
    { category: 'Work experience', score: 80, feedback: 'Strong background with room for quantified impact.', tips: ['Use metrics wherever possible.', 'Describe outcomes, not only responsibilities.', 'Request targeted manager recommendations.'] },
  ]

  return (
    <div className="min-h-screen py-8 pb-20">
      <div className="page-shell max-w-4xl">
        <PageHeader
          eyebrow="Profile enhancer"
          title="Strengthen your application materials."
          description="Review SOP, CV, skills, and experience gaps with practical recommendations before submitting applications."
        />

        <Card hover={false} className="mb-8 border-dashed border-sky-300 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/30">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white p-3 ring-1 ring-sky-200 dark:bg-slate-950 dark:ring-sky-900">
                <Upload className="h-6 w-6 text-sky-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Upload documents for review</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">SOP, CV, transcripts, or portfolio notes.</p>
              </div>
            </div>
            <Button>Choose files</Button>
          </div>
        </Card>

        <div className="space-y-6">
          {suggestions.map((suggestion, idx) => (
            <motion.div key={suggestion.category} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}>
              <Card hover={false}>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{suggestion.category}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{suggestion.feedback}</p>
                  </div>
                  <Badge>{suggestion.score}% score</Badge>
                </div>
                <ProgressBar value={suggestion.score} max={100} animated={false} />
                <div className="mt-6 space-y-3">
                  <p className="flex items-center gap-2 text-sm font-semibold"><Lightbulb className="h-4 w-4 text-sky-600" /> Improvement plan</p>
                  {suggestion.tips.map((tip) => (
                    <div key={tip} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                      <p className="text-sm text-slate-600 dark:text-slate-300">{tip}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card hover={false} className="mt-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><FileText className="h-5 w-5 text-sky-600" /> Resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {['SOP writing guide', 'ATS-ready CV templates', 'Skill development roadmap', 'Interview preparation'].map((title) => (
              <div key={title} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Practical next steps for application readiness.</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
